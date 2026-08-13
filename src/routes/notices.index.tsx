import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/notices/")({
  head: () => ({
    meta: [
      { title: "공지사항 — JIGU GLOBAL" },
      { name: "description", content: "지구글로벌의 공지사항과 새소식을 확인하세요. 서비스 안내, 운영 일정, 회사 소식을 게시합니다." },
      { property: "og:title", content: "공지사항 — JIGU GLOBAL" },
      { property: "og:description", content: "지구글로벌의 공지사항과 새소식." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/notices" }],
  }),
  component: NoticeList,
});

const PER_PAGE = 10;

function NoticeList() {
  const { lang } = useLang();
  const ko = lang === "ko";
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["notices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notices")
        .select("id, no, title, author, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return data ?? [];
    return (data ?? []).filter((n) => n.title.toLowerCase().includes(term));
  }, [data, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const rows = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-navy pb-6">
          <div>
            <div className="text-[11px] tracking-[0.32em] uppercase text-gold">Notice</div>
            <h1 className="font-display text-3xl md:text-4xl text-navy mt-2">{ko ? "공지사항" : "Notices"}</h1>
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
                    {ko ? "등록된 공지사항이 없습니다." : "No notices yet."}
                  </td>
                </tr>
              )}
              {rows.map((n, i) => (
                <tr key={n.id} className="border-b border-border/70 hover:bg-mist/60 transition-colors">
                  <td className="px-4 py-4 text-center text-muted-foreground">
                    {filtered.length - ((current - 1) * PER_PAGE + i)}
                  </td>
                  <td className="px-4 py-4">
                    <Link
                      to="/notices/$id"
                      params={{ id: n.id }}
                      className="text-navy hover:text-gold break-keep"
                    >
                      {n.title}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-center text-muted-foreground">{n.author}</td>
                  <td className="px-4 py-4 text-center text-muted-foreground">
                    {new Date(n.created_at).toISOString().slice(0, 10)}
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
    </div>
  );
}
