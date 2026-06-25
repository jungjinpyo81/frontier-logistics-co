import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import containers from "@/assets/containers.jpg";
import warehouse from "@/assets/warehouse.jpg";
import air from "@/assets/air-freight.jpg";
import network from "@/assets/global-network.jpg";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "./our-story";

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

const POSTS = [
  { tag: "Trends",       title: "2026 글로벌 물류 트렌드 — 공급망의 재편", date: "May 12, 2026", img: containers },
  { tag: "Cold Chain",   title: "콜드체인 물류의 핵심 — 식품·바이오의 미래", date: "Apr 28, 2026", img: warehouse },
  { tag: "Dangerous Goods", title: "위험물 운송 가이드 — IMO & IATA 핵심 정리", date: "Apr 03, 2026", img: air },
  { tag: "Trade",        title: "국가별 무역 이슈 — 동남아 수출 입문",     date: "Mar 21, 2026", img: network },
  { tag: "Export Tips",  title: "수출입 실무 팁 — 통관 시간을 줄이는 5가지", date: "Mar 05, 2026", img: containers },
  { tag: "Insight",      title: "AEO 인증이 의미하는 것 — 신뢰의 글로벌 언어", date: "Feb 14, 2026", img: warehouse },
];

function Insights() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={<>Logistics, <br /><span className="italic text-gold">decoded.</span></>}
        sub="국제 물류, 위험물, 콜드체인, 그리고 무역 트렌드 — 지구글로벌이 전하는 인사이트."
        image={network}
      />

      <section className="bg-background py-28 md:py-36">
        <div className="container-x">
          <Reveal>
            <Link to="/insights" className="group block">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="aspect-[5/4] overflow-hidden">
                  <img src={POSTS[0].img} alt={POSTS[0].title} width={1280} height={960} loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div>
                  <span className="text-[11px] tracking-[0.25em] uppercase text-gold">Featured · {POSTS[0].tag}</span>
                  <h2 className="font-display text-3xl md:text-5xl text-navy mt-6 leading-tight group-hover:text-gold transition">
                    {POSTS[0].title}
                  </h2>
                  <div className="mt-6 text-sm text-muted-foreground">{POSTS[0].date} · 6 min read</div>
                  <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-navy border-b border-navy/30 pb-1 group-hover:text-gold group-hover:border-gold">
                    Read article <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist py-28">
        <div className="container-x">
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-navy">Latest articles</h2>
            <span className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground hidden md:block">All posts →</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {POSTS.slice(1).map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <Link to="/insights" className="block group bg-background h-full">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.img} alt={p.title} width={1280} height={960} loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-7">
                    <span className="text-[11px] tracking-[0.25em] uppercase text-gold">{p.tag}</span>
                    <h3 className="font-display text-xl text-navy mt-4 leading-snug group-hover:text-gold transition">{p.title}</h3>
                    <div className="mt-5 text-xs text-muted-foreground">{p.date}</div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
