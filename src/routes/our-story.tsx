import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import containers from "@/assets/containers.jpg";
import warehouse from "@/assets/warehouse.jpg";
import air from "@/assets/air-freight.jpg";
import { Reveal } from "@/components/site/Reveal";

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

function Story() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title={<>We Move More <br /><span className="italic text-gold">Than Cargo.</span></>}
        sub="우리는 단순히 화물을 운송하지 않습니다. 새로운 시장과 기회, 사람과 비즈니스를 연결합니다."
        image={containers}
      />

      <section className="bg-background py-28 md:py-40">
        <div className="container-x grid gap-20 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <span className="eyebrow"><span className="hairline" />Philosophy</span>
            <h2 className="font-display mt-6 text-3xl md:text-5xl text-navy leading-tight">
              A partner for a more <span className="italic">connected world.</span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="space-y-7 text-foreground/75 text-[15px] leading-[1.9]">
            <p>글로벌 공급망이 더욱 복잡해지는 시대, 지구글로벌은 고객이 세계 어디서든 안정적으로 사업을 운영할 수 있도록 신뢰할 수 있는 파트너가 되고자 합니다.</p>
            <p>우리는 해상·항공·특수화물·국제특송, 그리고 글로벌 비즈니스 솔루션을 통합적으로 제공하며, 단순한 운송이 아닌 고객의 비즈니스 성장 그 자체를 함께 설계합니다.</p>
            <p>From Seoul to every continent — JIGU GLOBAL connects people, possibilities, and progress.</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist py-28 md:py-40">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <span className="eyebrow"><span className="hairline" /> Values</span>
            <h2 className="font-display mt-6 text-4xl md:text-5xl text-navy">What we stand for.</h2>
          </Reveal>
          <div className="mt-16 grid md:grid-cols-3 gap-px bg-border border border-border">
            {[
              ["01", "Trust",       "신뢰", "We earn trust by delivering — on time, in full, every shipment."],
              ["02", "Connection",  "연결", "We connect markets, networks, and people across continents."],
              ["03", "Innovation",  "혁신", "We modernize forwarding with technology, transparency, and care."],
            ].map(([n, t, ko, d], i) => (
              <Reveal key={t} delay={i * 80}>
                <div className="bg-background p-10 h-full">
                  <div className="font-display text-gold text-2xl">{n}</div>
                  <h3 className="mt-10 font-display text-3xl text-navy">{t}</h3>
                  <div className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mt-1">{ko}</div>
                  <p className="mt-6 text-sm text-foreground/70 leading-relaxed">{d}</p>
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
              To become Korea's <span className="italic text-gold">most trusted</span> global logistics brand.
            </h2>
            <p className="mt-8 text-white/70 leading-relaxed max-w-md">
              우리는 한국을 대표하는 글로벌 물류 브랜드로 성장하여, 세계 어느 곳에서도 우리의 고객이 안정적으로 비즈니스를 이어갈 수 있는 인프라가 되겠습니다.
            </p>
            <Link to="/contact" className="mt-10 inline-flex btn-gold">
              Partner with us <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      <ParallaxImage src={air} />
    </>
  );
}

function PageHero({ eyebrow, title, sub, image }: { eyebrow: string; title: React.ReactNode; sub: string; image: string }) {
  return (
    <section className="relative h-[80svh] min-h-[520px] w-full overflow-hidden bg-navy-deep">
      <img src={image} alt="" width={1920} height={1280} className="absolute inset-0 size-full object-cover opacity-55 animate-ken" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/40 to-navy-deep/95" />
      <div className="relative z-10 container-x h-full flex flex-col justify-end pb-24 pt-32 animate-fade-up">
        <div className="flex items-center gap-3 mb-6">
          <span className="hairline" />
          <span className="text-[11px] tracking-[0.32em] uppercase text-gold">{eyebrow}</span>
        </div>
        <h1 className="font-display text-white text-5xl md:text-7xl leading-[1.03] max-w-4xl">{title}</h1>
        <p className="mt-6 text-white/70 max-w-xl text-base md:text-lg leading-relaxed">{sub}</p>
      </div>
    </section>
  );
}

function ParallaxImage({ src }: { src: string }) {
  return (
    <section className="relative h-[60svh] overflow-hidden">
      <img src={src} alt="" width={1280} height={960} loading="lazy" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-navy/30" />
      <div className="relative container-x h-full flex items-center">
        <p className="font-display text-white text-3xl md:text-5xl max-w-2xl leading-tight">
          "We don't just ship cargo — <span className="italic text-gold">we deliver possibility.</span>"
        </p>
      </div>
    </section>
  );
}

export { PageHero };
