import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShoppingBag, Globe, FileText, Handshake } from "lucide-react";
import warehouse from "@/assets/warehouse.jpg";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "./our-story";

export const Route = createFileRoute("/trade-solutions")({
  head: () => ({
    meta: [
      { title: "Trade & Solutions — JIGU GLOBAL" },
      { name: "description", content: "Equipment & food trading today, a cross-border commerce platform tomorrow." },
      { property: "og:title", content: "Trade & Solutions — JIGU GLOBAL" },
      { property: "og:description", content: "Beyond logistics — building cross-border commerce." },
      { property: "og:url", content: "/trade-solutions" },
    ],
    links: [{ rel: "canonical", href: "/trade-solutions" }],
  }),
  component: Trade,
});

function Trade() {
  return (
    <>
      <PageHero
        eyebrow="Trade & Solutions"
        title={<>Beyond logistics. <br /><span className="italic text-gold">Building commerce.</span></>}
        sub="물류를 넘어, 글로벌 비즈니스 그 자체를 함께 설계합니다. 지구글로벌의 트레이드 솔루션."
        image={warehouse}
      />

      <section className="bg-background py-28 md:py-36">
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow"><span className="hairline" /> Today</span>
            <h2 className="font-display mt-6 text-4xl md:text-5xl text-navy leading-tight">Current Services</h2>
            <div className="mt-10 space-y-px bg-border border border-border">
              {[
                [ShoppingBag, "Equipment Trading", "기계·장비 수출입 트레이딩 및 소싱 지원."],
                [ShoppingBag, "Food Products",     "식품류 수출입 및 글로벌 유통 파트너십."],
                [FileText,    "Trade Agency",      "수출입 대행 및 무역 행정 토탈 서비스."],
              ].map(([Icon, t, d]) => {
                const I = Icon as typeof ShoppingBag;
                return (
                  <div key={t as string} className="bg-background p-7 flex gap-5">
                    <I className="size-6 text-gold mt-1 shrink-0" strokeWidth={1.4} />
                    <div>
                      <div className="font-display text-xl text-navy">{t as string}</div>
                      <div className="text-sm text-foreground/70 mt-1">{d as string}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <span className="eyebrow"><span className="hairline" /> Tomorrow</span>
            <h2 className="font-display mt-6 text-4xl md:text-5xl text-navy leading-tight">Future Expansion</h2>
            <div className="mt-10 space-y-px bg-border border border-border">
              {[
                [Globe,    "Global Trading Platform",  "국가 간 무역을 위한 디지털 플랫폼 구축."],
                [Globe,    "Cross-border Commerce",    "글로벌 이커머스 운영 전과정 통합 지원."],
                [FileText, "Import & Export Consulting","국가별 통관·인증 전문 컨설팅 서비스."],
                [Handshake,"B2B Matching",             "검증된 글로벌 B2B 파트너 매칭."],
              ].map(([Icon, t, d]) => {
                const I = Icon as typeof Globe;
                return (
                  <div key={t as string} className="bg-background p-7 flex gap-5">
                    <I className="size-6 text-gold mt-1 shrink-0" strokeWidth={1.4} />
                    <div>
                      <div className="font-display text-xl text-navy">{t as string}</div>
                      <div className="text-sm text-foreground/70 mt-1">{d as string}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy text-white py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1.4fr_1fr] items-center">
          <h2 className="font-display text-3xl md:text-5xl">
            Let's build your next <span className="italic text-gold">market.</span>
          </h2>
          <div className="flex lg:justify-end">
            <Link to="/contact" className="btn-gold">Get in touch <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
