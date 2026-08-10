import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, Forklift, Brush, Building2, Globe2 } from "lucide-react";
import containers from "@/assets/containers.jpg";
import warehouse from "@/assets/warehouse.jpg";
import air from "@/assets/air-freight.jpg";
import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our Story — JIGU GLOBAL" },
      { name: "description", content: "We move more than cargo. JIGU GLOBAL은 글로벌 공급망 시대의 신뢰할 수 있는 파트너가 되고자 합니다." },
      { property: "og:title", content: "Our Story — JIGU GLOBAL" },
      { property: "og:description", content: "We move more than cargo." },
      { property: "og:url", content: "/our-story" },
    ],
    links: [{ rel: "canonical", href: "/our-story" }],
  }),
  component: Story,
});

const VALUES = [
  { n: "01", t: { ko: "신뢰", en: "Trust" }, ko: "Trust", d: { ko: "정시에 안전하게 배송", en: "We earn trust by delivering — on time, in full, every shipment." } },
  { n: "02", t: { ko: "연결", en: "Connection" }, ko: "Connection", d: { ko: "대륙을 넘어 시장과 네트워크, 사람을 연결합니다.", en: "We connect markets, networks, and people across continents." } },
  { n: "03", t: { ko: "혁신", en: "Innovation" }, ko: "Innovation", d: { ko: "기술과 투명성, 세심한 관리로 포워딩을 혁신합니다.", en: "We modernize forwarding with technology, transparency, and care." } },
];

const TIMELINE = [
  { y: "2011", icon: Truck, ko: "서정물류 평택 화물운송업 시작", en: "Seojeong Logistics founded — freight transport in Pyeongtaek" },
  { y: "2013", icon: Forklift, ko: "화물운송 및 중장비 사업", en: "Expanded into freight and heavy equipment" },
  { y: "2016", icon: Brush, ko: "바닥청소차 렌탈사업 확장", en: "Expanded into floor-sweeper rental business" },
  { y: "2021", icon: Building2, ko: "주식회사 변환 및 자회사 ㈜지구글로벌 발족", en: "Incorporated; launched subsidiary JIGU GLOBAL Co., Ltd." },
  { y: "2022", icon: Globe2, ko: "사세확장으로 인한 ㈜지구글로벌 분사", en: "JIGU GLOBAL spun off following business growth" },
];

function Story() {
  const { lang } = useLang();
  const ko = lang === "ko";
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title={ko ? <>화물,&nbsp;<br /><br /><span className="italic text-gold">그 이상의 가치를 움직입니다.</span></> : <>We Move More <br /><span className="italic text-gold">Than Cargo.</span></>}
        sub={ko ? <>물류를 넘어, 글로벌 비즈니스를 함께 설계합니다.&nbsp;<br />지구글로벌의 트레이드 솔루션.</> : "We don't just move freight. We connect new markets, opportunities, people, and businesses."}
        image={containers}
      />

      <section className="bg-background py-28 md:py-40">
        <div className="container-x">
          <Reveal className="max-w-2xl mb-16">
            <span className="eyebrow"><span className="hairline" /> History</span>
            <h2 className="font-display mt-6 text-4xl md:text-5xl text-navy">{ko ? "회사 연혁." : "Our History."}</h2>
          </Reveal>
          <Reveal>
            <ol className="relative grid gap-10 md:grid-cols-5 md:gap-4">
              <span className="hidden md:block absolute left-0 right-0 top-[22px] h-px bg-border" />
              {TIMELINE.map((t) => {
                const Icon = t.icon;
                return (
                  <li key={t.y} className="group relative flex gap-4 md:block">
                    <span className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-background text-gold transition duration-300 group-hover:border-gold group-hover:bg-gold/10 md:mb-4">
                      <Icon size={20} strokeWidth={1.5} />
                    </span>
                    <div>
                      <div className="font-display text-2xl md:text-3xl text-navy leading-none">{t.y}</div>
                      <div className="mt-2 text-xs md:text-[13px] text-foreground/60 leading-relaxed">
                        {ko ? t.ko : t.en}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="bg-background py-28 md:py-40">
        <div className="container-x grid gap-20 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <span className="eyebrow"><span className="hairline" />Philosophy</span>
            <h2 className="font-display mt-6 text-3xl md:text-5xl text-navy leading-tight">
              {ko ? <>더 넓은 시장을 위한 <span className="italic">파트너.</span></> : <>A partner for a more <span className="italic">connected world.</span></>}
            </h2>
          </Reveal>
          <Reveal delay={120} className="space-y-7 text-foreground/75 text-[15px] leading-[1.9]">
            {ko ? (
              <>
                <p>글로벌 물류 환경이 빠르게 변하고 복잡해지는 시대, 지구글로벌은 고객이 전세계 어디서든<br />안정적으로&nbsp;사업을 운영할 수 있도록 돕는 신뢰할 수 있는 물류 파트너가 되고자 합니다.</p>
                <p>우리는 해상·항공·특수화물·국제특송, 그리고 글로벌 비즈니스 솔루션을 통합적으로 제공하며, 단순한 운송이 아닌 고객의 비즈니스 성장을 함께 설계합니다.</p>
                <p>서울에서 전세계 어디든 — 지구글로벌은 사람과 가능성, 그리고 내일을 연결합니다.</p>
              </>
            ) : (
              <>
                <p>As global supply chains grow more complex, JIGU GLOBAL strives to be the trusted partner that keeps your business running smoothly anywhere in the world.</p>
                <p>We provide an integrated suite of ocean, air, special cargo, international express, and global business solutions — designing not just transport, but the growth of our clients' businesses.</p>
                <p>From Seoul to every continent — JIGU GLOBAL connects people, possibilities, and progress.</p>
              </>
            )}
          </Reveal>
        </div>
      </section>

      <section className="bg-mist py-28 md:py-40">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <span className="eyebrow"><span className="hairline" /> Values</span>
            <h2 className="font-display mt-6 text-4xl md:text-5xl text-navy">{ko ? "우리가 지키는 가치." : "What we stand for."}</h2>
          </Reveal>
          <div className="mt-16 grid md:grid-cols-3 gap-px bg-border border border-border">
            {VALUES.map((v, i) => (
              <Reveal key={v.ko} delay={i * 80}>
                <div className="bg-background p-10 h-full">
                  <div className="font-display text-gold text-2xl">{v.n}</div>
                  <h3 className="mt-10 font-display text-3xl text-navy">{v.t.en}</h3>
                  <div className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mt-1">{v.ko}</div>
                  <p className="mt-6 text-sm text-foreground/70 leading-relaxed whitespace-pre-line">{ko ? v.d.ko : v.d.en}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-deep text-white py-28 md:py-40 overflow-hidden">
        <div className="container-x grid gap-16 lg:grid-cols-2 items-center">
          <Reveal>
            <img src={warehouse} alt="Warehouse" width={1280} height={960} loading="lazy" className="w-full aspect-[4/3] object-cover" />
          </Reveal>
          <Reveal delay={120}>
            <span className="eyebrow"><span className="hairline" /> Vision</span>
            <h2 className="font-display mt-6 text-4xl md:text-5xl leading-tight">
              {ko ? <>대한민국을 대표하는 <br /><span className="italic text-gold">가장 신뢰받는</span> 글로벌 물류 브랜드.</> : <>To become Korea's <span className="italic text-gold">most trusted</span> global logistics brand.</>}
            </h2>
            <p className="mt-8 text-white/70 leading-relaxed max-w-md">
              {ko ? "우리는 한국을 대표하는 글로벌 물류 브랜드로 성장하여, 세계 어느 곳에서도 우리의 고객이 안정적으로 비즈니스를 이어갈 수 있는 인프라가 되겠습니다." : "We aim to grow into Korea's leading global logistics brand — the infrastructure that lets our clients run their business reliably, anywhere in the world."}
            </p>
            <Link to="/contact" className="mt-10 inline-flex btn-gold">
              {ko ? "함께하기" : "Partner with us"} <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      <ParallaxImage src={air} ko={ko} />
    </>
  );
}

function PageHero({ eyebrow, title, sub, image, imageClassName }: { eyebrow: string; title: React.ReactNode; sub: React.ReactNode; image: string; imageClassName?: string }) {
  return (
    <section className="relative h-[80svh] min-h-[520px] w-full overflow-hidden bg-navy-deep">
      <img src={image} alt="" width={1920} height={1280} className={imageClassName ?? "absolute inset-0 size-full object-cover opacity-55 animate-ken"} />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/40 to-navy-deep/95" />

      <div className="relative z-10 container-x h-full flex flex-col justify-end pb-24 pt-32 animate-fade-up">
        <div className="flex items-center gap-3 mb-6">
          <span className="hairline" />
          <span className="text-[11px] tracking-[0.32em] uppercase text-gold">{eyebrow}</span>
        </div>
        <h1 className="font-display text-white text-5xl md:text-7xl leading-[1.03] max-w-4xl">{title}</h1>
        <div className="mt-6 text-white/70 max-w-xl text-base md:text-lg leading-relaxed">{sub}</div>
      </div>
    </section>
  );
}

function ParallaxImage({ src, ko }: { src: string; ko: boolean }) {
  return (
    <section className="relative h-[60svh] overflow-hidden">
      <img src={src} alt="" width={1280} height={960} loading="lazy" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-navy/30" />
      <div className="relative container-x h-full flex items-center">
        <p className="font-display text-white text-3xl md:text-5xl max-w-2xl leading-tight whitespace-pre-line">
          {ko ? <>"우리는 화물이 아니라 <br /><span className="italic text-gold">가능성을 전달합니다.</span>"</> : <>"We don't just ship cargo — <span className="italic text-gold">we deliver possibility.</span>"</>}
        </p>
      </div>
    </section>
  );
}

export { PageHero };
