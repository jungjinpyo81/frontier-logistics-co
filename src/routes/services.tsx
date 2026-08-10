import { createFileRoute, Link } from "@tanstack/react-router";
import { Ship, Plane, Package, Truck, Warehouse, ArrowRight, Check, Snowflake, Flame, HardHat, Sparkles } from "lucide-react";
import air from "@/assets/air-freight.jpg";
import oceanPort from "@/assets/ocean-freight-port.jpg.asset.json";
import airCargo from "@/assets/air-freight-cargo.jpg.asset.json";
import expressDelivery from "@/assets/express-delivery.jpg.asset.json";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "./our-story";
import { useLang } from "@/lib/i18n";

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
    image: oceanPort.url,
    desc: { ko: "FCL · LCL · 프로젝트 카고. 주요 글로벌 항로의 안정적인 선복 확보와 경쟁력 있는 운임을 제공합니다.", en: "FCL · LCL · Project Cargo. We secure reliable space and competitive rates across major global trade lanes." },
    items: { ko: ["FCL (풀 컨테이너)", "LCL (혼재 화물)", "프로젝트 & 벌크 화물", "글로벌 선적 솔루션"], en: ["FCL (Full Container Load)", "LCL (Less than Container Load)", "Project & Break-bulk Cargo", "Global Shipping Solutions"] },
  },
  {
    icon: Plane, en: "Air Freight", ko: "항공 운송",
    image: airCargo.url,
    desc: { ko: "긴급 화물과 고가 제품을 위한 글로벌 항공 네트워크 및 통합 솔루션.", en: "A global air network and integrated solutions built for urgent shipments and high-value goods." },
    items: { ko: ["일반 항공 화물", "긴급/시간제한 화물", "고가 제품", "국제특송 연계"], en: ["General Air Cargo", "Urgent / Time-critical", "High-value Products", "International Express Integration"] },
  },
  {
    icon: Package, en: "Express Service", ko: "국제특송",
    desc: { ko: "B2B 특송부터 이커머스 물류, 샘플 발송까지 — 빠르게 성장하는 국제특송 서비스.", en: "From B2B express to e-commerce logistics and sample shipping — our fast-growing international express service." },
    items: { ko: ["B2B 특송", "이커머스 물류", "샘플 발송", "긴급 배송"], en: ["B2B Express", "E-commerce Logistics", "Sample Shipping", "Urgent Delivery"] },
  },
  {
    icon: Truck, en: "Inland Transportation", ko: "내륙 운송",
    desc: { ko: "국내·해외 트럭킹, 철도, 라스트마일을 아우르는 내륙 운송 인프라.", en: "Domestic and overseas trucking, rail, and last-mile infrastructure covering every stage of inland transport." },
    items: { ko: ["국내 트럭킹", "철도 운송", "라스트마일 배송", "국내 유통"], en: ["Local Trucking", "Rail Transportation", "Last Mile Delivery", "Domestic Distribution"] },
  },
  {
    icon: Warehouse, en: "Warehousing Solutions", ko: "보관·풀필먼트",
    desc: { ko: "보관·리패킹·풀필먼트·디스트리뷰션을 통합 운영하는 글로벌 창고 네트워크.", en: "A global warehouse network integrating storage, repacking, fulfillment, and distribution." },
    items: { ko: ["보관", "리패킹", "풀필먼트", "물류센터 연계"], en: ["Storage", "Repacking", "Fulfillment", "Distribution Center Integration"] },
  },
];

const SPECIAL_ITEMS = [
  { icon: Flame, en: "Dangerous Goods", ko: "위험물", desc: { ko: "IMDG · IATA DGR 자격 보유. 전 클래스 운송 가능.", en: "IMDG- & IATA DGR-certified handling across every hazard class." } },
  { icon: Snowflake, en: "Cold Chain", ko: "콜드체인", desc: { ko: "온도 민감 화물·식품·바이오를 위한 정온 운송.", en: "Temperature-controlled transport for sensitive goods, food, and bio products." } },
  { icon: HardHat, en: "Project Cargo", ko: "프로젝트 화물", desc: { ko: "중량물·플랜트 설비를 위한 맞춤 솔루션.", en: "Tailored solutions for heavy-lift and plant equipment shipments." } },
  { icon: Sparkles, en: "High-Value Goods", ko: "고가품", desc: { ko: "보안 운송·풀 트래킹·전용 보험 옵션.", en: "Secure transport, full tracking, and dedicated insurance options." } },
];

function Services() {
  const { lang } = useLang();
  const ko = lang === "ko";
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={ko ? <>모든 물류를, <br /><span className="italic text-gold">하나의 파트너로.</span></> : <>End-to-end logistics, <br /><span className="italic text-gold">one partner.</span></>}
        sub={ko ? "해상부터 항공, 특송, 보관, 내륙 운송까지 — 하나의 파트너와 모든 흐름을 연결하세요." : "From ocean to air, express, warehousing, and inland transport — connect every flow with one partner."}
        image={air}
      />

      <section className="bg-background py-28 md:py-36">
        <div className="container-x space-y-28">
          {SERVICES.map(({ icon: Icon, en, ko: koLabel, desc, items, ...rest }, i) => (
            <Reveal key={en}>
              <div className={`grid gap-12 lg:grid-cols-12 items-center ${i % 2 ? "lg:[direction:rtl]" : ""}`}>
                <div className="lg:col-span-5 [direction:ltr]">
                  <div className="flex items-center gap-3">
                    <span className="hairline" />
                    <span className="text-[11px] tracking-[0.25em] uppercase text-gold">0{i + 1} · {koLabel}</span>
                  </div>
                  <h2 className="font-display text-4xl md:text-5xl text-navy mt-6 leading-tight">{en}</h2>
                  <p className="mt-6 text-foreground/70 leading-relaxed">{ko ? desc.ko : desc.en}</p>
                  <ul className="mt-8 space-y-3">
                    {(ko ? items.ko : items.en).map((it) => (
                      <li key={it} className="flex items-start gap-3 text-sm text-foreground/80">
                        <Check size={16} className="text-gold mt-0.5 shrink-0" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:col-span-7 [direction:ltr]">
                  <div className="relative aspect-[4/3] bg-mist overflow-hidden border border-border">
                    {"image" in rest && rest.image ? (
                      <img
                        src={rest.image as string}
                        alt={ko ? `${koLabel} 서비스 이미지` : `${en} service image`}
                        loading="lazy"
                        className="absolute inset-0 size-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center">
                        <Icon className="size-32 md:size-44 text-navy/10" strokeWidth={0.8} />
                      </div>
                    )}
                    {!("image" in rest && rest.image) && (
                      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                        <div className="font-display text-7xl md:text-8xl text-navy/15">0{i + 1}</div>
                        <Icon className="size-10 text-gold" strokeWidth={1.2} />
                      </div>
                    )}
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
                <span className="text-[11px] tracking-[0.25em] uppercase text-gold">06 · {ko ? "특수화물" : "Special Cargo"}</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-navy mt-6 leading-tight">
                {ko ? <>특수화물 <span className="italic text-gold">전문 역량.</span></> : <>Special Cargo <span className="italic text-gold">capabilities.</span></>}
              </h2>
              <p className="mt-6 text-foreground/70 leading-relaxed">
                {ko ? "위험물, 콜드체인, 프로젝트 화물, 고가품 — 일반 화물 이상의 전문성을 요구하는 모든 화물을 안전하게 운송합니다." : "Dangerous goods, cold chain, project cargo, high-value goods — we safely handle every shipment that demands more than standard freight."}
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {SPECIAL_ITEMS.map(({ icon: Ic, en, ko: koLabel, desc }) => (
              <Reveal key={en}>
                <div className="bg-background p-7 h-full">
                  <Ic className="size-7 text-gold" strokeWidth={1.5} />
                  <div className="mt-6 text-[11px] tracking-[0.22em] uppercase text-muted-foreground">{koLabel}</div>
                  <div className="mt-1 font-display text-xl text-navy">{en}</div>
                  <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{ko ? desc.ko : desc.en}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12">
            <Link to="/special-cargo" className="inline-flex items-center gap-2 text-sm font-medium text-navy border-b border-navy/30 pb-1 hover:text-gold hover:border-gold">
              {ko ? "특수화물 자세히 보기" : "View Special Cargo details"} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-navy text-white py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1.4fr_1fr] items-center">
          <h2 className="font-display text-4xl md:text-5xl">
            {ko ? <>복잡한 화물이 있으신가요? <span className="italic text-gold">함께 설계해 드립니다.</span></> : <>Have a complex shipment? <span className="italic text-gold">Let's design it together.</span></>}
          </h2>
          <div className="flex lg:justify-end">
            <Link to="/contact" className="btn-gold">{ko ? "견적 요청하기" : "Request a Quote"} <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
