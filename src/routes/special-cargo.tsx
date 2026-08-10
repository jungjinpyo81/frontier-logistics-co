import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, Snowflake, Palette, Wrench, ArrowRight } from "lucide-react";
import containers from "@/assets/containers.jpg";
import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/special-cargo")({
  head: () => ({
    meta: [
      { title: "Special Cargo — JIGU GLOBAL" },
      { name: "description", content: "Dangerous goods, cold chain, fine art, and project cargo — handled with certified expertise." },
      { property: "og:title", content: "Special Cargo — JIGU GLOBAL" },
      { property: "og:description", content: "For shipments that demand more than logistics." },
      { property: "og:url", content: "/special-cargo" },
    ],
    links: [{ rel: "canonical", href: "/special-cargo" }],
  }),
  component: Special,
});

const ITEMS = [
  {
    icon: AlertTriangle,
    en: "Dangerous Goods", ko: "위험물 운송",
    desc: { ko: "IMO & IATA 인증 핸들링. 화학물, 배터리, 인화성 물질 등 위험물 화물의 안전한 글로벌 운송.", en: "IMO & IATA certified handling. Safe global transport of chemicals, batteries, flammables, and other hazardous cargo." },
    tags: ["IMO Certified", "IATA DGR", "MSDS Support"],
  },
  {
    icon: Snowflake,
    en: "Cold Chain Logistics", ko: "콜드체인",
    desc: { ko: "식품·제약·바이오 제품을 위한 정온/냉장/냉동 통합 콜드체인 솔루션.", en: "Integrated chilled, refrigerated, and frozen cold chain solutions for food, pharmaceutical, and bio products." },
    tags: ["Food", "Pharmaceutical", "Bio Products"],
  },
  {
    icon: Palette,
    en: "Fine Art Logistics", ko: "예술품 운송",
    desc: { ko: "예술품과 럭셔리 제품을 위한 항온항습 환경 제어와 전용 보험 지원.", en: "Climate-controlled environments and dedicated insurance support for artworks and luxury goods." },
    tags: ["Artworks", "Luxury Goods", "Climate Control", "Insurance"],
  },
  {
    icon: Wrench,
    en: "Project Cargo", ko: "프로젝트 카고",
    desc: { ko: "산업 장비, 중장비, 초대형 화물에 대한 종합 운송 엔지니어링.", en: "Comprehensive transport engineering for industrial equipment, heavy machinery, and oversized cargo." },
    tags: ["Industrial Equipment", "Heavy Machinery", "Oversized Cargo"],
  },
];

function Special() {
  const { lang } = useLang();
  const ko = lang === "ko";
  return (
    <>
      {/* dark hero */}
      <section className="relative h-[80svh] min-h-[520px] w-full overflow-hidden bg-navy-deep">
        <img src={containers} alt="" width={1280} height={960} className="absolute inset-0 size-full object-cover opacity-40 animate-ken" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/80 via-navy-deep/70 to-navy-deep" />
        <div className="relative z-10 container-x h-full flex flex-col justify-end pb-24 pt-32 animate-fade-up">
          <div className="flex items-center gap-3 mb-6">
            <span className="hairline" />
            <span className="text-[11px] tracking-[0.32em] uppercase text-gold">Special Cargo</span>
          </div>
          <h1 className="font-display text-white text-5xl md:text-7xl leading-[1.03] max-w-4xl">
            {ko ? (
              <>물류 그 이상을 요구하는<br /><span className="italic text-gold">화물을 위해.</span></>
            ) : (
              <>For shipments that demand<br /><span className="italic text-gold">more than logistics.</span></>
            )}
          </h1>
          <p className="mt-6 text-white/70 max-w-xl leading-relaxed">
            {ko ? "위험물·콜드체인·예술품·프로젝트 카고까지 — 전문성을 요구하는 화물을 위한 지구글로벌의 특수 운송 서비스." : "Dangerous goods, cold chain, fine art, and project cargo — JIGU GLOBAL's special cargo services for shipments that demand expertise."}
          </p>
        </div>
      </section>

      <section className="bg-navy-deep text-white py-28 md:py-36">
        <div className="container-x grid gap-px md:grid-cols-2 bg-white/10">
          {ITEMS.map(({ icon: Icon, en, ko: koLabel, desc, tags }, i) => (
            <Reveal key={en} delay={i * 80}>
              <div className="bg-navy-deep p-10 md:p-14 h-full group hover:bg-navy transition">
                <Icon className="size-10 text-gold" strokeWidth={1.2} />
                <div className="mt-12">
                  <div className="text-[11px] tracking-[0.25em] uppercase text-white/50">{koLabel}</div>
                  <h3 className="font-display text-3xl md:text-4xl mt-2">{en}</h3>
                  <p className="mt-6 text-white/70 leading-relaxed max-w-md">{ko ? desc.ko : desc.en}</p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {tags.map((t) => (
                      <span key={t} className="px-3 py-1.5 border border-white/20 text-[12px] tracking-wide">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1.4fr_1fr] items-center">
          <h2 className="font-display text-3xl md:text-5xl text-navy">
            {ko ? <>목적을 가지고 다루는, <span className="italic">특수화물.</span></> : <>Special cargo, <span className="italic">handled with intent.</span></>}
          </h2>
          <div className="flex lg:justify-end">
            <Link to="/contact" className="btn-primary">{ko ? "견적 요청하기" : "Request a Quote"} <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
