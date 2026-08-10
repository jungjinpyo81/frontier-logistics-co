import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShoppingBag, Globe, FileText, Handshake } from "lucide-react";
import warehouse from "@/assets/warehouse.jpg";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "./our-story";
import { useLang } from "@/lib/i18n";

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

const CURRENT = [
  { Icon: ShoppingBag, t: { ko: "장비 트레이딩", en: "Equipment Trading" }, d: { ko: "기계·장비 수출입 트레이딩 및 소싱 지원.", en: "Import/export trading and sourcing support for machinery and equipment." } },
  { Icon: ShoppingBag, t: { ko: "식품 트레이딩", en: "Food Products" }, d: { ko: "식품류 수출입 및 글로벌 유통 파트너십.", en: "Import/export of food products and global distribution partnerships." } },
  { Icon: FileText, t: { ko: "무역 대행", en: "Trade Agency" }, d: { ko: "수출입 대행 및 무역 행정 토탈 서비스.", en: "End-to-end import/export agency and trade administration services." } },
];

const FUTURE = [
  { Icon: Globe, t: { ko: "글로벌 트레이딩 플랫폼", en: "Global Trading Platform" }, d: { ko: "국가 간 무역을 위한 디지털 플랫폼 구축.", en: "Building a digital platform for cross-border trade." } },
  { Icon: Globe, t: { ko: "국경 간 커머스", en: "Cross-border Commerce" }, d: { ko: "글로벌 이커머스 운영 전과정 통합 지원.", en: "Integrated support across the entire global e-commerce operation." } },
  { Icon: FileText, t: { ko: "수출입 컨설팅", en: "Import & Export Consulting" }, d: { ko: "국가별 통관·인증 전문 컨설팅 서비스.", en: "Specialized customs and certification consulting by country." } },
  { Icon: Handshake, t: { ko: "B2B 매칭", en: "B2B Matching" }, d: { ko: "검증된 글로벌 B2B 파트너 매칭.", en: "Matching with vetted global B2B partners." } },
];

function Trade() {
  const { lang } = useLang();
  const ko = lang === "ko";

  return (
    <>
      <PageHero
        eyebrow="Trade & Solutions"
        title={<>Beyond logistics. <br /><span className="italic text-gold">Building commerce.</span></>}
        sub={ko ? "물류를 넘어, 글로벌 비즈니스 그 자체를 함께 설계합니다. 지구글로벌의 트레이드 솔루션." : "Beyond logistics, we design global business itself alongside you — JIGU GLOBAL's Trade Solutions."}
        image={warehouse}
      />

      <section className="bg-background py-28 md:py-36">
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow"><span className="hairline" /> {ko ? "현재" : "Today"}</span>
            <h2 className="font-display mt-6 text-4xl md:text-5xl text-navy leading-tight">{ko ? "현재 서비스" : "Current Services"}</h2>
            <div className="mt-10 space-y-px bg-border border border-border">
              {CURRENT.map(({ Icon, t, d }) => (
                <div key={t.en} className="bg-background p-7 flex gap-5">
                  <Icon className="size-6 text-gold mt-1 shrink-0" strokeWidth={1.4} />
                  <div>
                    <div className="font-display text-xl text-navy">{ko ? t.ko : t.en}</div>
                    <div className="text-sm text-foreground/70 mt-1">{ko ? d.ko : d.en}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <span className="eyebrow"><span className="hairline" /> {ko ? "미래" : "Tomorrow"}</span>
            <h2 className="font-display mt-6 text-4xl md:text-5xl text-navy leading-tight">{ko ? "향후 확장" : "Future Expansion"}</h2>
            <div className="mt-10 space-y-px bg-border border border-border">
              {FUTURE.map(({ Icon, t, d }) => (
                <div key={t.en} className="bg-background p-7 flex gap-5">
                  <Icon className="size-6 text-gold mt-1 shrink-0" strokeWidth={1.4} />
                  <div>
                    <div className="font-display text-xl text-navy">{ko ? t.ko : t.en}</div>
                    <div className="text-sm text-foreground/70 mt-1">{ko ? d.ko : d.en}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy text-white py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1.4fr_1fr] items-center">
          <h2 className="font-display text-3xl md:text-5xl">
            {ko ? (
              <>다음 <span className="italic text-gold">시장</span>을 함께 만들어가요.</>
            ) : (
              <>Let's build your next <span className="italic text-gold">market.</span></>
            )}
          </h2>
          <div className="flex lg:justify-end">
            <Link to="/contact" className="btn-gold">{ko ? "문의하기" : "Get in touch"} <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
