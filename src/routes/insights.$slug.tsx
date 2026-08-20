import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

function coverIsFirstInlineImage(coverUrl: string | null, content: string | null) {
  if (!coverUrl || !content) return false;
  const match = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (!match) return false;
  return match[1].trim() === coverUrl.trim();
}

export const Route = createFileRoute("/insights/$slug")({
  component: ArticleDetail,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-mist pt-24">
      <div className="text-center">
        <h1 className="font-display text-4xl text-navy">Article not found</h1>
        <Link to="/insights" className="btn-primary mt-6 inline-flex">Back to Insights</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center bg-mist pt-24 px-4">
      <div className="text-center max-w-md">
        <h1 className="font-display text-2xl text-navy">Could not load article</h1>
        <p className="text-sm text-muted-foreground mt-3">{error.message}</p>
        <Link to="/insights" className="btn-primary mt-6 inline-flex">Back to Insights</Link>
      </div>
    </div>
  ),
});

function ArticleDetail() {
  const { slug } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["article", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .in("status", ["published", "private"])
        .maybeSingle();
      if (error) throw error;
      if (!data) throw notFound();
      return data;
    },
  });

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center pt-24 text-muted-foreground">Loading...</div>;
  }
  if (!data) return null;

  return (
    <article className="bg-background pt-32 pb-28">
      <div className="container-x max-w-3xl">
        <Link to="/insights" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-navy">
          <ArrowLeft size={14} /> Insights
        </Link>

        <div className="mt-8">
          <span className="text-[11px] tracking-[0.25em] uppercase text-gold">
            {data.tag || "Insight"}{data.status === "private" ? " · Private" : ""}
          </span>
          <h1 className="font-display text-4xl md:text-6xl text-navy mt-5 leading-[1.05]">{data.title}</h1>
          <div className="mt-5 text-sm text-muted-foreground">
            {new Date(data.published_at ?? data.created_at).toLocaleDateString("en-US", {
              year: "numeric", month: "long", day: "numeric"
            })}
          </div>
        </div>

        {data.cover_url && (
          <div className="mt-10 aspect-[16/9] overflow-hidden bg-mist">
            <img src={data.cover_url} alt={data.title} className="size-full object-cover" />
          </div>
        )}

        {data.summary && (
          <p className="mt-10 text-lg text-navy/80 leading-relaxed font-medium">{data.summary}</p>
        )}

        {/^\s*<[a-z]/i.test(data.content ?? "") ? (
          <div
            className="article-body mt-10 text-base text-foreground/90 leading-[1.85]"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        ) : (
          <div className="mt-10 text-base text-foreground/90 leading-[1.85] whitespace-pre-wrap">
            {data.content}
          </div>
        )}
      </div>
    </article>
  );
}
