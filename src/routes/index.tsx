import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroShip from "@/assets/hero-ship.jpg";

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

function Home() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-navy-deep flex flex-col">
      <img
        src={heroShip}
        alt="Container ship at sea"
        width={1920}
        height={1280}
        className="absolute inset-0 size-full object-cover opacity-70 animate-ken"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-navy-deep/40 to-navy-deep/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/70 via-transparent to-transparent" />

      <div className="relative z-10 container-x flex-1 flex flex-col justify-center pb-12 pt-36">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-2xl animate-fade-up">
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

          <div className="animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <span className="text-[11px] tracking-[0.25em] uppercase text-gold mb-4 block">
              Quick Links
            </span>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {CTA_CARDS.map(({ to, icon: Icon, label, ko, desc }) => (
                <Link
                  key={to}
                  to={to}
                  className="group flex flex-col gap-3 p-5 bg-white/5 border border-white/10 backdrop-blur-sm rounded-sm hover:bg-white/10 hover:border-gold/50 transition"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="size-6 text-gold" strokeWidth={1.5} />
                    <ArrowUpRight className="size-4 text-white/40 group-hover:text-gold transition" />
                  </div>
                  <div>
                    <div className="text-[15px] font-medium text-white group-hover:text-gold transition">
                      {label}
                    </div>
                    <div className="text-[11px] tracking-[0.18em] uppercase text-white/50">
                      {ko}
                    </div>
                  </div>
                  <div className="text-xs text-white/50 leading-relaxed">
                    {desc}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* metric strip */}
        <div className="mt-auto pt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 backdrop-blur-sm">
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
  );
}
