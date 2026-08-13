import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/lib/i18n";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

export const Route = createFileRoute("/notices/$id")({
  head: () => ({
    meta: [
      { title: "공지사항 상세 — JIGU GLOBAL" },
      { name: "description", content: "지구글로벌 공지사항 상세 내용입니다." },
      { property: "og:title", content: "공지사항 — JIGU GLOBAL" },
      { property: "og:description", content: "지구글로벌 공지사항 상세 내용." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NoticeDetail,
});

function NoticeDetail() {
  const { id } = Route.useParams();
  const router = useRouter();
  const { lang } = useLang();
  const ko = lang === "ko";

  const { data, isLoading, error } = useQuery({
    queryKey: ["notices", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notices")
        .select("id, title, content, author, created_at")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container-x max-w-3xl">
        <Breadcrumbs
          items={[
            { label: ko ? "홈" : "Home", to: "/" },
            { label: ko ? "소식 & 정보" : "News & Insights", to: "/insights" },
            { label: ko ? "상세보기" : "Detail" },
          ]}
        />
        <div className="text-[11px] tracking-[0.32em] uppercase text-gold">Notice</div>

        {isLoading && (
          <p className="mt-10 text-muted-foreground">{ko ? "불러오는 중입니다..." : "Loading..."}</p>
        )}

        {!isLoading && (error || !data) && (
          <div className="mt-10">
            <h1 className="font-display text-2xl text-navy">{ko ? "공지사항을 찾을 수 없습니다" : "Notice not found"}</h1>
            <p className="text-sm text-muted-foreground mt-3">
              {ko ? "삭제되었거나 잘못된 주소일 수 있습니다." : "It may have been removed or the link is incorrect."}
            </p>
          </div>
        )}

        {data && (
          <article className="mt-4">
            <h1 className="font-display text-2xl md:text-3xl text-navy break-keep leading-snug">{data.title}</h1>
            <div className="mt-4 flex items-center gap-4 border-b border-border pb-5 text-xs text-muted-foreground">
              <span>{data.author}</span>
              <span aria-hidden>·</span>
              <time dateTime={data.created_at}>{new Date(data.created_at).toISOString().slice(0, 10)}</time>
            </div>
            <div className="mt-8 whitespace-pre-line leading-relaxed text-[15px] text-foreground/90">
              {data.content}
            </div>
          </article>
        )}

        <div className="mt-14 flex flex-wrap items-center gap-3 border-t border-border pt-8">
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 border border-navy/25 px-4 py-2.5 text-sm text-navy transition-colors hover:border-gold hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            {ko ? "목록으로" : "Back to list"}
          </Link>
          <button
            type="button"
            onClick={() => router.history.back()}
            className="inline-flex items-center gap-2 px-2 py-2.5 text-sm text-muted-foreground transition-colors hover:text-navy"
          >
            {ko ? "이전 페이지로" : "Go back"}
          </button>
        </div>
      </div>
    </div>
  );
}
