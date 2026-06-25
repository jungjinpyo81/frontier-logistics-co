import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Ship, Plane, Truck, Package, Warehouse, Globe2 } from "lucide-react";
import heroShip from "@/assets/hero-ship.jpg";
import warehouseImg from "@/assets/warehouse.jpg";
import containersImg from "@/assets/containers.jpg";
import networkImg from "@/assets/global-network.jpg";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JIGU GLOBAL — Connecting Business Beyond Borders" },
      { name: "description", content: "Global logistics solutions across every continent. 해상·항공·특수화물·국제특송, 그리고 글로벌 비즈니스 솔루션." },
      { property: "og:title", content: "JIGU GLOBAL — Connecting Business Beyond Borders" },
      { property: "og:description", content: "Global logistics solutions across every continent." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const SERVICES = [
  { icon: Ship,      en: "Ocean Freight",        ko: "해상 운송",    desc: "FCL · LCL · Project Cargo across global trade lanes." },
  { icon: Plane,     en: "Air Freight",          ko: "항공 운송",    desc: "General, urgent, and high-value cargo with global integrators." },
  { icon: Package,   en: "Express Service",      ko: "국제특송",    desc: "B2B express, e-commerce logistics, sample shipping." },
  { icon: Truck,     en: "Inland Transportation",ko: "내륙 운송",    desc: "Local trucking, rail, last-mile distribution." },
  { icon: Warehouse, en: "Warehousing",          ko: "보관·풀필먼트", desc: "Storage, repacking, fulfillment, distribution centers." },
  { icon: Globe2,    en: "Trade & Solutions",    ko: "글로벌 트레이드", desc: "Cross-border commerce, trade agency, B2B matching." },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-navy-deep">
        <img
          src={heroShip}
          alt="Container ship at sea"
          width={1920}
          height={1280}
          className="absolute inset-0 size-full object-cover opacity-70 animate-ken"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-navy-deep/40 to-navy-deep/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/70 via-transparent to-transparent" />

        <div className="relative z-10 container-x h-full flex flex-col justify-start pb-24 pt-44">
          <div className="max-w-4xl animate-fade-up">
            <div className="flex items-center gap-3 mb-8">
              <span className="hairline" />
              <span className="text-[11px] tracking-[0.32em] uppercase text-gold">
                Global Logistics · Since Korea
              </span>
            </div>
            <h1 className="font-display text-white text-5xl md:text-7xl xl:text-[5.5rem] leading-[1.02]">
              Connecting Business<br />
              <span className="italic text-gold/90">Beyond Borders.</span>
            </h1>
            <p className="mt-8 text-white/75 text-base md:text-lg max-w-xl leading-relaxed">
              해상·항공·특수화물·국제특송, 그리고 글로벌 비즈니스 솔루션까지.<br />
              지구글로벌은 세계와 고객을 연결합니다.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-gold">
                Request a Quote <ArrowRight size={16} />
              </Link>
              <Link to="/services" className="btn-ghost-light">Explore Services</Link>
            </div>
          </div>

          {/* metric strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 backdrop-blur-sm">
            {[
              ["120+", "Countries Served"],
              ["6", "Continents"],
              ["24 / 7", "Global Operations"],
              ["AEO", "Certified Partner"],
            ].map(([k, v]) => (
              <div key={v} className="bg-navy-deep/60 px-6 py-6">
                <div className="font-display text-3xl md:text-4xl text-white">{k}</div>
                <div className="mt-1 text-[11px] tracking-[0.22em] uppercase text-white/55">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY teaser */}
      <section className="bg-background py-28 md:py-40">
        <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.1fr] items-center">
          <Reveal>
            <span className="eyebrow"><span className="hairline" /> Our Story</span>
            <h2 className="font-display mt-6 text-4xl md:text-6xl text-navy leading-[1.05]">
              We Move More <br /><span className="italic">Than Cargo.</span>
            </h2>
            <div className="mt-8 space-y-5 text-foreground/75 text-[15px] leading-[1.85] max-w-md">
              <p>우리는 단순히 화물을 운송하지 않습니다. 새로운 시장과 기회, 그리고 사람과 비즈니스를 연결합니다.</p>
              <p>글로벌 공급망이 더욱 복잡해지는 시대, 지구글로벌은 고객이 세계 어디서든 안정적으로 사업을 운영할 수 있도록 신뢰할 수 있는 파트너가 되고자 합니다.</p>
            </div>
            <Link to="/our-story" className="mt-10 inline-flex items-center gap-2 text-navy font-medium text-sm border-b border-navy/30 pb-1 hover:border-gold hover:text-gold transition">
              Read our story <ArrowRight size={14} />
            </Link>
          </Reveal>
          <Reveal delay={120} className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img src={containersImg} alt="Containers" width={1280} height={960} loading="lazy" className="size-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-navy text-white p-8 max-w-[260px] hidden md:block">
              <div className="font-display text-4xl text-gold">2025</div>
              <div className="mt-2 text-xs tracking-[0.2em] uppercase text-white/60">
                A new era of Korean<br /> global forwarding
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-mist py-28 md:py-40">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <span className="eyebrow"><span className="hairline" /> Services</span>
            <h2 className="font-display mt-6 text-4xl md:text-6xl text-navy leading-[1.05]">
              End-to-end logistics, <br /><span className="italic">orchestrated globally.</span>
            </h2>
            <p className="mt-6 text-foreground/70 text-[15px] leading-relaxed max-w-xl">
              해상부터 항공, 특송, 보관, 내륙 운송, 그리고 트레이드 솔루션까지 — 하나의 파트너와 모든 흐름을 연결하세요.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3 border border-border">
            {SERVICES.map(({ icon: Icon, en, ko, desc }, i) => (
              <Reveal key={en} delay={i * 60}>
                <div className="group bg-background p-10 h-full flex flex-col transition hover:bg-navy hover:text-white">
                  <Icon className="size-7 text-gold transition" strokeWidth={1.2} />
                  <div className="mt-12">
                    <div className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground group-hover:text-white/50">{ko}</div>
                    <h3 className="font-display text-2xl mt-2 text-navy group-hover:text-white">{en}</h3>
                    <p className="mt-4 text-sm text-foreground/70 group-hover:text-white/70 leading-relaxed">{desc}</p>
                  </div>
                  <Link to="/services" className="mt-8 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-navy group-hover:text-gold">
                    Learn more <ArrowRight size={12} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIAL CARGO dark */}
      <section className="relative bg-navy-deep text-white py-28 md:py-40 overflow-hidden">
        <img src={warehouseImg} alt="" width={1280} height={960} loading="lazy" className="absolute inset-0 size-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep via-navy-deep/90 to-navy-deep" />
        <div className="relative container-x">
          <Reveal className="max-w-3xl">
            <span className="eyebrow"><span className="hairline" /> Special Cargo</span>
            <h2 className="font-display mt-6 text-4xl md:text-6xl leading-[1.05]">
              For shipments that demand <br /><span className="italic text-gold">more than logistics.</span>
            </h2>
          </Reveal>
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {[
              ["Dangerous Goods", "IMO & IATA certified handling for hazardous shipments."],
              ["Cold Chain",      "Refrigerated & frozen logistics for food, pharma, bio."],
              ["Fine Art",        "Climate-controlled handling for artworks & luxury."],
              ["Project Cargo",   "Heavy machinery and oversized industrial equipment."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 80}>
                <div className="bg-navy-deep p-8 h-full">
                  <div className="font-display text-3xl text-white">{t}</div>
                  <div className="mt-2 size-6 border-t border-gold" />
                  <p className="mt-6 text-sm text-white/65 leading-relaxed">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-12">
            <Link to="/special-cargo" className="btn-gold">Explore Special Cargo <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* GLOBAL NETWORK */}
      <section className="bg-background py-28 md:py-40">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <span className="eyebrow"><span className="hairline" /> Global Network</span>
            <h2 className="font-display mt-6 text-4xl md:text-6xl text-navy leading-[1.05]">
              Six continents. <br /><span className="italic">One partner.</span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-16 relative overflow-hidden bg-navy-deep">
            <img src={networkImg} alt="Global network" width={1600} height={900} loading="lazy" className="w-full h-[420px] md:h-[560px] object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-tr from-navy-deep via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 grid md:grid-cols-3 gap-8 text-white">
              {[
                ["Asia Pacific", "Seoul · Shanghai · Tokyo · Singapore · HCMC"],
                ["Europe / MEA",  "Rotterdam · Hamburg · Dubai · Istanbul"],
                ["Americas",      "LA · NY · Mexico City · São Paulo"],
              ].map(([region, cities]) => (
                <div key={region}>
                  <div className="text-[11px] tracking-[0.25em] uppercase text-gold">{region}</div>
                  <div className="mt-2 text-sm text-white/80">{cities}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <div className="mt-10 text-right">
            <Link to="/global-network" className="inline-flex items-center gap-2 text-navy font-medium text-sm border-b border-navy/30 pb-1 hover:border-gold hover:text-gold transition">
              Explore the network <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-white py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1.4fr_1fr] items-center">
          <div>
            <span className="eyebrow"><span className="hairline" /> Let's Begin</span>
            <h2 className="font-display mt-4 text-4xl md:text-5xl">
              Ready to move your business <span className="italic text-gold">forward?</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link to="/contact" className="btn-gold">Request a Quote <ArrowRight size={16} /></Link>
            <Link to="/services" className="btn-ghost-light">View Services</Link>
          </div>
        </div>
      </section>
    </>
  );
}
