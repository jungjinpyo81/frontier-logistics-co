import { createFileRoute, Link } from "@tanstack/react-router";
import { Ship, Plane, Package, ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import air from "@/assets/air-freight.jpg";
import network from "@/assets/global-network.jpg";
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
      { name: "description", content: "Ocean, Air, Express, and our global network — end-to-end global logistics by JIGU GLOBAL." },
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
    keepBadge: true,
    desc: { ko: "FCL · LCL · 프로젝트 카고. 주요 글로벌 항로의 안정적인 선복 확보와 경쟁력 있는 운임을 제공합니다.", en: "FCL · LCL · Project Cargo. We secure reliable space and competitive rates across major global trade lanes." },
    items: { ko: ["FCL (풀 컨테이너)", "LCL (혼재 화물)", "프로젝트 & 벌크 화물", "글로벌 선적 솔루션"], en: ["FCL (Full Container Load)", "LCL (Less than Container Load)", "Project & Break-bulk Cargo", "Global Shipping Solutions"] },
  },
  {
    icon: Plane, en: "Air Freight", ko: "항공 운송",
    image: airCargo.url,
    keepBadge: true,
    desc: { ko: "긴급 화물과 고가 제품을 위한 글로벌 항공 네트워크 및 통합 솔루션.", en: "A global air network and integrated solutions built for urgent shipments and high-value goods." },
    items: { ko: ["일반 항공 화물", "긴급/시간제한 화물", "고가 제품", "국제특송 연계"], en: ["General Air Cargo", "Urgent / Time-critical", "High-value Products", "International Express Integration"] },
  },
  {
    icon: Package, en: "Express Service", ko: "국제특송",
    image: expressDelivery.url,
    keepBadge: true,
    desc: { ko: "B2B 특송부터 이커머스 물류, 샘플 발송까지 — 빠르게 성장하는 국제특송 서비스.", en: "From B2B express to e-commerce logistics and sample shipping — our fast-growing international express service." },
    items: { ko: ["B2B 특송", "이커머스 물류", "샘플 발송", "긴급 배송"], en: ["B2B Express", "E-commerce Logistics", "Sample Shipping", "Urgent Delivery"] },
  },
];

const REGIONS = {
  "Asia Pacific":  { ko: "아시아 태평양", hubs: ["Seoul", "Shanghai", "Tokyo", "Singapore", "Ho Chi Minh", "Sydney"], cap: { ko: "Korea를 중심으로 한 가장 강력한 인트라-아시아 네트워크. 주요 항만/공항 직접 운영.", en: "The strongest intra-Asia network centered on Korea, with direct operations at key ports and airports." } },
  "Europe":        { ko: "유럽",          hubs: ["Rotterdam", "Hamburg", "Antwerp", "Frankfurt", "London"], cap: { ko: "유럽 주요 게이트웨이 항만과 내륙 운송 네트워크 연결.", en: "Connecting Europe's major gateway ports with an extensive inland transport network." } },
  "Middle East":   { ko: "중동",          hubs: ["Dubai", "Jeddah", "Istanbul"], cap: { ko: "프로젝트 카고와 위험물 처리에 강점을 가진 중동 허브.", en: "A Middle East hub specializing in project cargo and dangerous goods handling." } },
  "Africa":        { ko: "아프리카",       hubs: ["Cairo", "Nairobi", "Lagos", "Cape Town"], cap: { ko: "신흥 시장 진입을 지원하는 신뢰할 수 있는 현지 파트너십.", en: "Trusted local partnerships that support entry into emerging markets." } },
  "North America": { ko: "북미",           hubs: ["Los Angeles", "New York", "Chicago", "Vancouver"], cap: { ko: "주요 항만/공항 풀필먼트 및 내륙 트럭킹 통합 솔루션.", en: "Integrated fulfillment and inland trucking solutions across major ports and airports." } },
  "Latin America": { ko: "중남미",          hubs: ["Mexico City", "São Paulo", "Buenos Aires", "Lima"], cap: { ko: "성장하는 중남미 시장을 위한 전문 포워딩 서비스.", en: "Specialized forwarding services for the fast-growing Latin American market." } },
};

const STATS = [
  { k: "120+", v: { ko: "국가", en: "Countries" } },
  { k: "6", v: { ko: "대륙", en: "Continents" } },
  { k: "40+", v: { ko: "전략 허브", en: "Strategic Hubs" } },
  { k: "24/7", v: { ko: "운영", en: "Operations" } },
];

function Services() {
  const { lang } = useLang();
  const ko = lang === "ko";
  const [region, setRegion] = useState<keyof typeof REGIONS>("Asia Pacific");
  const data = REGIONS[region];

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
                    {(!("image" in rest && rest.image) || ("keepBadge" in rest && rest.keepBadge)) && (
                      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                        <div className={`font-display text-7xl md:text-8xl ${"image" in rest && rest.image ? "text-white/80 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]" : "text-navy/15"}`}>0{i + 1}</div>
                        <Icon className="size-10 text-gold drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]" strokeWidth={1.2} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Global Network section */}
      <section className="bg-mist py-28 md:py-36 border-t border-border">
        <div className="container-x">
          <Reveal className="grid gap-12 lg:grid-cols-[1fr_1.4fr] items-start">
            <div>
              <span className="eyebrow"><span className="hairline" /> {ko ? "글로벌 네트워크" : "Global Network"}</span>
              <h2 className="font-display mt-6 text-3xl md:text-4xl text-navy">
                {ko ? <>6대륙 120개국, <span className="italic text-gold">하나의 네트워크.</span></> : <>Six continents, <span className="italic text-gold">one network.</span></>}
              </h2>
              <p className="mt-4 text-foreground/60 leading-relaxed">
                {ko ? "지구글로벌은 6대륙 120개 이상의 국가와 연결된 물류 네트워크를 운영합니다." : "JIGU GLOBAL operates a logistics network connecting more than 120 countries across six continents."}
              </p>
              <ul className="mt-10 divide-y divide-border border-y border-border">
                {(Object.keys(REGIONS) as Array<keyof typeof REGIONS>).map((r) => (
                  <li key={r}>
                    <button
                      onClick={() => setRegion(r)}
                      className={`w-full py-5 flex items-center justify-between text-left group transition ${
                        region === r ? "text-navy" : "text-foreground/60 hover:text-navy"
                      }`}
                    >
                      <span className="flex items-center gap-4">
                        <span className={`size-1.5 rounded-full ${region === r ? "bg-gold" : "bg-border"}`} />
                        <span>
                          <span className="font-display text-xl block">{r}</span>
                          <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">{REGIONS[r].ko}</span>
                        </span>
                      </span>
                      <ArrowRight size={16} className={`transition ${region === r ? "text-gold translate-x-1" : ""}`} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-navy-deep text-white p-10 md:p-14 min-h-[520px] relative overflow-hidden">
              <img src={network} alt="" width={1600} height={900} loading="lazy" className="absolute inset-0 size-full object-cover opacity-25" />
              <div className="absolute inset-0 bg-gradient-to-tr from-navy-deep via-navy-deep/80 to-transparent" />
              <div className="relative" key={region}>
                <div className="animate-fade-up">
                  <div className="text-[11px] tracking-[0.25em] uppercase text-gold">{data.ko}</div>
                  <h3 className="font-display text-4xl md:text-6xl mt-3">{region}</h3>
                  <p className="mt-8 text-white/75 max-w-md leading-relaxed">{ko ? data.cap.ko : data.cap.en}</p>
                  <div className="mt-12">
                    <div className="text-[11px] tracking-[0.25em] uppercase text-white/50 mb-4">{ko ? "주요 허브" : "Key Hubs"}</div>
                    <div className="flex flex-wrap gap-2">
                      {data.hubs.map((h) => (
                        <span key={h} className="px-4 py-2 border border-white/20 text-sm">{h}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="container-x grid md:grid-cols-4 gap-px bg-border border border-border">
          {STATS.map((s) => (
            <div key={s.k} className="bg-background p-10 text-center">
              <div className="font-display text-5xl text-navy">{s.k}</div>
              <div className="mt-2 text-[11px] tracking-[0.25em] uppercase text-muted-foreground">{ko ? s.v.ko : s.v.en}</div>
            </div>
          ))}
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
