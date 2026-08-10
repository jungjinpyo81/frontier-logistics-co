import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, Warehouse, ArrowRight, Check, AlertTriangle, Snowflake, Palette, Wrench } from "lucide-react";
import containers from "@/assets/containers.jpg";
import warehouseInterior from "@/assets/warehouse-interior.jpg.asset.json";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "./our-story";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/global-network")({
  head: () => ({
    meta: [
      { title: "Transport & Warehousing — JIGU GLOBAL" },
      { name: "description", content: "Inland transport, warehousing, and special cargo capabilities — JIGU GLOBAL." },
      { property: "og:title", content: "Transport & Warehousing — JIGU GLOBAL" },
      { property: "og:description", content: "Inland transport, warehousing, and special cargo." },
      { property: "og:url", content: "/global-network" },
    ],
    links: [{ rel: "canonical", href: "/global-network" }],
  }),
  component: TransportWarehouse,
});

const SERVICES = [
  {
    icon: Truck, en: "Inland Transportation", ko: "내륙 운송",
    desc: { ko: "국내·해외 트럭킹, 철도, 라스트마일을 아우르는 내륙 운송 인프라.", en: "Domestic and overseas trucking, rail, and last-mile infrastructure covering every stage of inland transport." },
    items: { ko: ["국내 트럭킹", "철도 운송", "라스트마일 배송", "국내 유통"], en: ["Local Trucking", "Rail Transportation", "Last Mile Delivery", "Domestic Distribution"] },
  },
  {
    icon: Warehouse, en: "Warehousing Solutions", ko: "창고 (일반/특수)",
    image: warehouseInterior.url,
    keepBadge: true,
    desc: { ko: "보관·리패킹·풀필먼트·디스트리뷰션을 통합 운영하는 글로벌 창고 네트워크.", en: "A global warehouse network integrating storage, repacking, fulfillment, and distribution." },
    items: { ko: ["보관", "리패킹", "풀필먼트", "물류센터 연계"], en: ["Storage", "Repacking", "Fulfillment", "Distribution Center Integration"] },
  },
];

const SPECIAL_ITEMS = [
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

function TransportWarehouse() {
  const { lang } = useLang();
  const ko = lang === "ko";
  return (
    <>
      <PageHero
        eyebrow="Transport & Warehousing"
        title={ko ? <>운송에서 창고까지, <br /><span className="italic text-gold">특수화물까지.</span></> : <>From transport to warehousing, <br /><span className="italic text-gold">to special cargo.</span></>}
        sub={ko ? "내륙 운송, 창고 관리, 그리고 특수화물까지 — 물류의 마지막 단계까지 책임집니다." : "Inland transport, warehousing, and special cargo — we own every last mile of your logistics."}
        image={containers}
      />

      <section className="bg-background py-28 md:py-36">
        <div className="container-x space-y-28">
          {SERVICES.map(({ icon: Icon, en, ko: koLabel, desc, items, ...rest }, i) => (
            <Reveal key={en}>
              <div className={`grid gap-12 lg:grid-cols-12 items-center ${i % 2 ? "lg:[direction:rtl]" : ""}`}>
                <div className="lg:col-span-5 [direction:ltr]">
                  <div className="flex items-center gap-3">
                    <span className="hairline" />
                    <span className="text-[11px] tracking-[0.25em] uppercase text-gold">0{i + 4} · {koLabel}</span>
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
                        <div className={`font-display text-7xl md:text-8xl ${"image" in rest && rest.image ? "text-white/80 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]" : "text-navy/15"}`}>0{i + 4}</div>
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

      {/* Special Cargo section */}
      <section className="bg-navy-deep text-white py-28 md:py-36">
        <div className="container-x">
          <Reveal>
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="hairline" />
                <span className="text-[11px] tracking-[0.25em] uppercase text-gold">06 · {ko ? "특수화물" : "Special Cargo"}</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-white mt-6 leading-tight">
                {ko ? <>물류 그 이상을 요구하는 <span className="italic text-gold">화물을 위해.</span></> : <>For shipments that demand <span className="italic text-gold">more than logistics.</span></>}
              </h2>
              <p className="mt-6 text-white/70 leading-relaxed">
                {ko ? "위험물·콜드체인·예술품·프로젝트 카고까지 — 전문성을 요구하는 화물을 위한 지구글로벌의 특수 운송 서비스." : "Dangerous goods, cold chain, fine art, and project cargo — JIGU GLOBAL's special cargo services for shipments that demand expertise."}
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-px md:grid-cols-2 bg-white/10">
            {SPECIAL_ITEMS.map(({ icon: Icon, en, ko: koLabel, desc, tags }, i) => (
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
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1.4fr_1fr] items-center">
          <h2 className="font-display text-3xl md:text-5xl text-navy">
            {ko ? <>목적을 가지고 다루는, <span className="italic">특수화물.</span></> : <>Special cargo, <span className="italic">handled with intent.</span></>}
          </h2>
          <div className="flex lg:justify-end">
            <Link to="/contact" className="btn-gold">{ko ? "견적 요청하기" : "Request a Quote"} <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
