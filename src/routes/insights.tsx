import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import network from "@/assets/global-network.jpg";
import containers from "@/assets/containers.jpg";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "./our-story";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — JIGU GLOBAL" },
      { name: "description", content: "International logistics trends, dangerous goods guide, cold chain, and trade insights." },
      { property: "og:title", content: "Insights — JIGU GLOBAL" },
      { property: "og:description", content: "Logistics knowledge from the JIGU GLOBAL team." },
      { property: "og:url", content: "/insights" },
    ],
    links: [{ rel: "canonical", href: "/insights" }],
  }),
  component: Insights,
});

function Insights() {
  const { lang } = useLang();
  const ko = lang === "ko";
  const { data: posts, isLoading } = useQuery({
    queryKey: ["public", "articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("id, slug, title, summary, cover_url, tag, status, published_at, created_at")
        .in("status", ["published", "private"])
        .order("published_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const featured = posts?.[0];
  const rest = posts?.slice(1) ?? [];

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={<>Logistics, <br /><span className="italic text-gold">decoded.</span></>}
        sub={ko ? "국제 물류, 위험물, 콜드체인, 그리고 무역 트렌드 — 지구글로벌이 전하는 인사이트." : "International logistics, dangerous goods, cold chain, and trade trends — insights from JIGU GLOBAL."}
        image={network}
      />

      {isLoading && (
        <section className="bg-background py-28">
          <div className="container-x text-center text-muted-foreground">{ko ? "게시글을 불러오는 중입니다..." : "Loading articles..."}</div>
        </section>
      )}

      {!isLoading && !featured && (
        <section className="bg-background py-28">
          <div className="container-x text-center">
            <p className="text-muted-foreground">{ko ? "아직 게시된 글이 없습니다." : "No articles have been published yet."}</p>
          </div>
        </section>
      )}

      {featured && (
        <section className="bg-background py-28 md:py-36">
          <div className="container-x">
            <Reveal>
              <Link to="/insights/$slug" params={{ slug: featured.slug }} className="group block">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="aspect-[5/4] overflow-hidden bg-mist">
                    <img
                      src={featured.cover_url || containers}
                      alt={featured.title}
                      className="size-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] tracking-[0.25em] uppercase text-gold">
                      {ko ? "추천" : "Featured"}{featured.tag ? ` · ${featured.tag}` : ""}
                      {featured.status === "private" ? (ko ? " · 비공개" : " · Private") : ""}
                    </span>
                    <h2 className="font-display text-3xl md:text-5xl text-navy mt-6 leading-tight group-hover:text-gold transition">
                      {featured.title}
                    </h2>
                    {featured.summary && <p className="mt-5 text-muted-foreground leading-relaxed">{featured.summary}</p>}
                    <div className="mt-6 text-sm text-muted-foreground">
                      {formatDate(featured.published_at ?? featured.created_at, ko)}
                    </div>
                    <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-navy border-b border-navy/30 pb-1 group-hover:text-gold group-hover:border-gold">
                      {ko ? "기사 읽기" : "Read article"} <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="bg-mist py-28">
          <div className="container-x">
            <div className="flex items-end justify-between mb-12">
              <h2 className="font-display text-3xl md:text-4xl text-navy">{ko ? "최신 기사" : "Latest articles"}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
              {rest.map((p, i) => (
                <Reveal key={p.id} delay={i * 60}>
                  <Link to="/insights/$slug" params={{ slug: p.slug }} className="block group bg-background h-full">
                    <div className="aspect-[4/3] overflow-hidden bg-mist">
                      <img
                        src={p.cover_url || containers}
                        alt={p.title}
                        loading="lazy"
                        className="size-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-7">
                      <span className="text-[11px] tracking-[0.25em] uppercase text-gold">
                        {p.tag || (ko ? "인사이트" : "Insight")}{p.status === "private" ? (ko ? " · 비공개" : " · Private") : ""}
                      </span>
                      <h3 className="font-display text-xl text-navy mt-4 leading-snug group-hover:text-gold transition">{p.title}</h3>
                      <div className="mt-5 text-xs text-muted-foreground">
                        {formatDate(p.published_at ?? p.created_at, ko)}
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function formatDate(d: string, ko: boolean) {
  return new Date(d).toLocaleDateString(ko ? "ko-KR" : "en-US", { year: "numeric", month: "short", day: "numeric" });
}
