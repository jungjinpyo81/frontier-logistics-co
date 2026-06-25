import { createFileRoute, Link } from "@tanstack/react-router";
import { Ship, Plane, Package, Truck, Warehouse, ArrowRight, Check, Snowflake, Flame, HardHat, Sparkles } from "lucide-react";
import air from "@/assets/air-freight.jpg";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "./our-story";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — JIGU GLOBAL" },
      { name: "description", content: "Ocean, Air, Express, Inland, and Warehousing — end-to-end global logistics by JIGU GLOBAL." },
      { property: "og:title", content: "Services — JIGU GLOBAL" },
      { property: "og:description", content: "End-to-end global logistics solutions." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

const SERVICES = [
  {
    icon: Ship, en: "Ocean Freight", ko: "해상 운송",
    desc: "FCL · LCL · Project Cargo. 주요 글로벌 항로의 안정적인 선복 확보와 경쟁력 있는 운임을 제공합니다.",
    items: ["FCL (Full Container Load)", "LCL (Less than Container Load)", "Project & Break-bulk Cargo", "Global Shipping Solutions"],
  },
  {
    icon: Plane, en: "Air Freight", ko: "항공 운송",
    desc: "긴급 화물과 고가 제품을 위한 글로벌 항공 네트워크 및 통합 솔루션.",
    items: ["General Air Cargo", "Urgent / Time-critical", "High-value Products", "International Express Integration"],
  },
  {
    icon: Package, en: "Express Service", ko: "국제특송",
    desc: "B2B 특송부터 이커머스 물류, 샘플 발송까지 — 빠르게 성장하는 국제특송 서비스.",
    items: ["B2B Express", "E-commerce Logistics", "Sample Shipping", "Urgent Delivery"],
  },
  {
    icon: Truck, en: "Inland Transportation", ko: "내륙 운송",
    desc: "국내·해외 트럭킹, 철도, 라스트마일을 아우르는 내륙 운송 인프라.",
    items: ["Local Trucking", "Rail Transportation", "Last Mile Delivery", "Domestic Distribution"],
  },
  {
    icon: Warehouse, en: "Warehousing Solutions", ko: "보관·풀필먼트",
    desc: "보관·리패킹·풀필먼트·디스트리뷰션을 통합 운영하는 글로벌 창고 네트워크.",
    items: ["Storage", "Repacking", "Fulfillment", "Distribution Center Integration"],
  },
];

function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={<>End-to-end logistics, <br /><span className="italic text-gold">one partner.</span></>}
        sub="해상부터 항공, 특송, 보관, 내륙 운송까지 — 하나의 파트너와 모든 흐름을 연결하세요."
        image={air}
      />

      <section className="bg-background py-28 md:py-36">
        <div className="container-x space-y-28">
          {SERVICES.map(({ icon: Icon, en, ko, desc, items }, i) => (
            <Reveal key={en}>
              <div className={`grid gap-12 lg:grid-cols-12 items-center ${i % 2 ? "lg:[direction:rtl]" : ""}`}>
                <div className="lg:col-span-5 [direction:ltr]">
                  <div className="flex items-center gap-3">
                    <span className="hairline" />
                    <span className="text-[11px] tracking-[0.25em] uppercase text-gold">0{i + 1} · {ko}</span>
                  </div>
                  <h2 className="font-display text-4xl md:text-5xl text-navy mt-6 leading-tight">{en}</h2>
                  <p className="mt-6 text-foreground/70 leading-relaxed">{desc}</p>
                  <ul className="mt-8 space-y-3">
                    {items.map((it) => (
                      <li key={it} className="flex items-start gap-3 text-sm text-foreground/80">
                        <Check size={16} className="text-gold mt-0.5 shrink-0" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:col-span-7 [direction:ltr]">
                  <div className="relative aspect-[4/3] bg-mist overflow-hidden border border-border">
                    <div className="absolute inset-0 grid place-items-center">
                      <Icon className="size-32 md:size-44 text-navy/10" strokeWidth={0.8} />
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                      <div className="font-display text-7xl md:text-8xl text-navy/15">0{i + 1}</div>
                      <Icon className="size-10 text-gold" strokeWidth={1.2} />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-mist py-28 md:py-36 border-t border-border">
        <div className="container-x">
          <Reveal>
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="hairline" />
                <span className="text-[11px] tracking-[0.25em] uppercase text-gold">06 · 특수화물</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-navy mt-6 leading-tight">
                Special Cargo <span className="italic text-gold">capabilities.</span>
              </h2>
              <p className="mt-6 text-foreground/70 leading-relaxed">
                위험물, 콜드체인, 프로젝트 화물, 고가품 — 일반 화물 이상의 전문성을 요구하는 모든 화물을 안전하게 운송합니다.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {[
              { icon: Flame, en: "Dangerous Goods", ko: "위험물", desc: "IMDG · IATA DGR 자격 보유. 전 클래스 운송 가능." },
              { icon: Snowflake, en: "Cold Chain", ko: "콜드체인", desc: "온도 민감 화물·식품·바이오를 위한 정온 운송." },
              { icon: HardHat, en: "Project Cargo", ko: "프로젝트 화물", desc: "중량물·플랜트 설비를 위한 맞춤 솔루션." },
              { icon: Sparkles, en: "High-Value Goods", ko: "고가품", desc: "보안 운송·풀 트래킹·전용 보험 옵션." },
            ].map(({ icon: Ic, en, ko, desc }) => (
              <Reveal key={en}>
                <div className="bg-background p-7 h-full">
                  <Ic className="size-7 text-gold" strokeWidth={1.5} />
                  <div className="mt-6 text-[11px] tracking-[0.22em] uppercase text-muted-foreground">{ko}</div>
                  <div className="mt-1 font-display text-xl text-navy">{en}</div>
                  <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12">
            <Link to="/special-cargo" className="inline-flex items-center gap-2 text-sm font-medium text-navy border-b border-navy/30 pb-1 hover:text-gold hover:border-gold">
              View Special Cargo details <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-navy text-white py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1.4fr_1fr] items-center">
          <h2 className="font-display text-4xl md:text-5xl">
            Have a complex shipment? <span className="italic text-gold">Let's design it together.</span>
          </h2>
          <div className="flex lg:justify-end">
            <Link to="/contact" className="btn-gold">Request a Quote <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
