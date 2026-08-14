import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/lib/i18n";
import { CATEGORIES, CategoryBadgeClass, DEFAULT_CATEGORY } from "@/lib/categories";

const PER_PAGE = 10;

type Row = {
  key: string;
  kind: "notice" | "insight";
  title: string;
  author: string;
  date: string;
  category: string;
  id?: string;
  slug?: string;
};

export function NoticeBoard() {
  const { lang } = useLang();
  const ko = lang === "ko";
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [cat, setCat] = useState<string>("전체");

  const { data, isLoading } = useQuery({
    queryKey: ["news-and-insights"],
    queryFn: async (): Promise<Row[]> => {
      const [notices, articles] = await Promise.all([
        supabase.from("notices").select("id, title, author, category, created_at"),
        supabase
          .from("articles")
          .select("id, slug, title, status, category, published_at, created_at")
          .in("status", ["published", "private"]),
      ]);
      if (notices.error) throw notices.error;
      if (articles.error) throw articles.error;

      const rows: Row[] = [
        ...(notices.data ?? []).map((n) => ({
          key: `n-${n.id}`,
          kind: "notice" as const,
          title: n.title,
          author: n.author,
          date: n.created_at,
          category: n.category || DEFAULT_CATEGORY,
          id: n.id,
        })),
        ...(articles.data ?? []).map((a) => ({
          key: `a-${a.id}`,
          kind: "insight" as const,
          title: a.title,
          author: "지구글로벌",
          date: a.published_at ?? a.created_at,
          category: a.category || DEFAULT_CATEGORY,
          slug: a.slug,
        })),
      ];
      return rows.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    },
  });

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return (data ?? []).filter(
      (n) => (cat === "전체" || n.category === cat) && (!term || n.title.toLowerCase().includes(term))
    );
  }, [data, q, cat]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const rows = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-navy pb-6">
        <div>
          <div className="text-[11px] tracking-[0.32em] uppercase text-gold">News &amp; Insights</div>
          <h2 className="font-display text-3xl md:text-4xl text-navy mt-2">{ko ? "소식 & 정보" : "News & Insights"}</h2>
        </div>
        <div className="text-sm text-muted-foreground">
          {ko ? "전체" : "Total"} <span className="text-gold font-semibold">[ {filtered.length} ]</span>
          {ko ? "개" : ""}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            placeholder={ko ? "제목 검색" : "Search by title"}
            aria-label={ko ? "제목 검색" : "Search by title"}
            className="w-full border border-border bg-white pl-9 pr-3 py-2.5 text-sm outline-none focus:border-gold"
          />
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-y border-border bg-mist text-navy">
              <th className="w-16 px-4 py-3 text-center text-xs uppercase tracking-wider font-medium">No</th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wider font-medium">{ko ? "제목" : "Title"}</th>
              <th className="w-32 px-4 py-3 text-center text-xs uppercase tracking-wider font-medium">{ko ? "글쓴이" : "Author"}</th>
              <th className="w-32 px-4 py-3 text-center text-xs uppercase tracking-wider font-medium">{ko ? "날짜" : "Date"}</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={4} className="px-4 py-14 text-center text-muted-foreground">
                  {ko ? "불러오는 중입니다..." : "Loading..."}
                </td>
              </tr>
            )}
            {!isLoading && rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-14 text-center text-muted-foreground">
                  {ko ? "등록된 글이 없습니다." : "Nothing here yet."}
                </td>
              </tr>
            )}
            {rows.map((n, i) => (
              <tr key={n.key} className="border-b border-border/70 hover:bg-mist/60 transition-colors">
                <td className="px-4 py-4 text-center text-muted-foreground">
                  {filtered.length - ((current - 1) * PER_PAGE + i)}
                </td>
                <td className="px-4 py-4">
                  {n.kind === "notice" ? (
                    <Link to="/notices/$id" params={{ id: n.id! }} className="text-navy hover:text-gold break-keep">
                      {n.title}
                    </Link>
                  ) : (
                    <Link to="/insights/$slug" params={{ slug: n.slug! }} className="text-navy hover:text-gold break-keep">
                      {n.title}
                    </Link>
                  )}
                </td>
                <td className="px-4 py-4 text-center text-muted-foreground">{n.author}</td>
                <td className="px-4 py-4 text-center text-muted-foreground">
                  {new Date(n.date).toISOString().slice(0, 10)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <nav className="mt-10 flex items-center justify-center gap-1" aria-label="Pagination">
          <button
            onClick={() => setPage(Math.max(1, current - 1))}
            disabled={current === 1}
            className="px-3 py-2 text-xs text-navy disabled:opacity-30 hover:text-gold"
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              aria-current={p === current ? "page" : undefined}
              className={`min-w-9 px-3 py-2 text-xs border ${
                p === current
                  ? "border-navy bg-navy text-white"
                  : "border-border text-navy hover:border-gold hover:text-gold"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage(Math.min(totalPages, current + 1))}
            disabled={current === totalPages}
            className="px-3 py-2 text-xs text-navy disabled:opacity-30 hover:text-gold"
          >
            ›
          </button>
        </nav>
      )}
    </div>
  );
}
