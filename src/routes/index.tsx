import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Boxes, Globe2, TrendingUp, BookOpen, Newspaper, Mail, Ship, Plane, PackageCheck, Sparkles } from "lucide-react";
import heroShip from "@/assets/hero-ship.jpg";
import { LocationMap } from "@/components/site/LocationMap";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JIGU GLOBAL — Connecting Business Beyond Borders" },
      {
        name: "description",
        content:
          "Global logistics solutions across every continent. 해상·항공·특수화물·국제특송, 그리고 글로벌 비즈니스 솔루션.",
      },
      { property: "og:title", content: "JIGU GLOBAL — Connecting Business Beyond Borders" },
      { property: "og:description", content: "Global logistics solutions across every continent." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const CTA_CARDS = [
  {
    to: "/our-story",
    icon: BookOpen,
    en: "Our Story",
    ko: "회사소개",
    descEn: "Who we are and why",
    descKo: "우리는 누구이며 무엇을 지향하는가",
  },
  {
    to: "/services",
    icon: Boxes,
    en: "Services",
    ko: "서비스",
    descEn: "Ocean, air, express, special cargo",
    descKo: "해상·항공·특송·특수화물",
  },
  {
    to: "/global-network",
    icon: Globe2,
    en: "Global Network",
    ko: "글로벌 네트워크",
    descEn: "120+ countries, 6 continents",
    descKo: "120개국, 6대륙 네트워크",
  },
  {
    to: "/trade-solutions",
    icon: TrendingUp,
    en: "Trade Solutions",
    ko: "무역 솔루션",
    descEn: "Cross-border B2B commerce",
    descKo: "국경을 넘는 B2B 커머스",
  },
  {
    to: "/insights",
    icon: Newspaper,
    en: "Insights",
    ko: "인사이트/공지",
    descEn: "News & industry updates",
    descKo: "뉴스와 산업 동향",
  },
  {
    to: "/contact",
    icon: Mail,
    en: "Contact",
    ko: "문의하기",
    descEn: "Get a quote or talk",
    descKo: "견적 요청 및 상담",
  },
];

const WHAT_WE_DO = [
  { icon: Ship, ko: "해상운송", en: "Ocean Freight", koD: "FCL·LCL·Bulk", enD: "FCL · LCL · Bulk" },
  { icon: Plane, ko: "항공운송", en: "Air Freight", koD: "긴급·정기 화물", enD: "Urgent & scheduled cargo" },
  { icon: PackageCheck, ko: "국제특송", en: "Int'l Express", koD: "소화물·도어투도어", enD: "Parcel · door-to-door" },
  { icon: Sparkles, ko: "특수화물", en: "Special Cargo", koD: "위험물·콜드체인·프로젝트", enD: "DG · cold chain · project" },
  { icon: TrendingUp, ko: "무역 솔루션", en: "Trade Solutions", koD: "통관·수출입 대행", enD: "Customs & trade support" },
];




function Home() {
  const { lang } = useLang();
  const ko = lang === "ko";
  return (
    <>
    {/* Vimeo video banner */}
    <section className="relative w-full bg-navy pt-32 pb-8 md:pt-36">
      <div className="container-x">
        <div className="relative aspect-video w-full overflow-hidden border border-white/10 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.4)]">
          <iframe
            src="https://player.vimeo.com/video/1217004087?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&background=1"
            title="G9 GLOBAL"
            className="absolute inset-0 size-full"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </section>

    <section className="relative min-h-[100svh] w-full overflow-hidden bg-navy flex flex-col">
      <img
        src={heroShip}
        alt="Container ship at sea"
        width={1920}
        height={1280}
        className="absolute inset-0 size-full object-cover opacity-95 animate-ken"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/20 via-navy-deep/15 to-navy-deep/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/55 via-transparent to-transparent" />
      <div className="absolute inset-0 pointer-events-none animate-float-slow bg-[radial-gradient(circle_at_20%_30%,rgba(212,175,55,0.18),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.12),transparent_50%)]" />

      <div className="relative z-10 container-x flex-1 flex flex-col justify-center pb-12 pt-44">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-2xl animate-fade-up">
            <div className="flex items-center gap-3 mb-8">
              <span className="hairline" />
              <span className="text-[11px] tracking-[0.32em] uppercase text-gold">
                {ko ? "글로벌 물류 · From Korea" : "Global Logistics · Since Korea"}
              </span>
            </div>
            <h1 className="font-display text-white text-5xl md:text-7xl xl:text-[5.5rem] leading-[1.02]">
              Connecting Business
              <br />
              <span className="italic text-gold/90">Beyond Borders.</span>
            </h1>
            <p className="mt-8 text-white/75 text-base md:text-lg max-w-xl leading-relaxed">
              {ko ? (
                <>
                  복잡한 수출입 통관부터 해상·항공·국제특송 등 맞춤형 물류 솔루션.
                  <br />
                  지구글로벌은 단순한 운송을 넘어 성공적인 글로벌 비즈니스의 길을 엽니다.
                </>
              ) : (
                <>
                  Ocean, air, special cargo and international express — plus end-to-end global business solutions.
                  <br />
                  JIGU GLOBAL connects our clients to the world.
                </>
              )}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-gold">
                {ko ? "견적 요청" : "Request a Quote"} <ArrowRight size={16} />
              </Link>
              <Link to="/services" className="btn-ghost-light">
                {ko ? "서비스 살펴보기" : "Explore Services"}
              </Link>
            </div>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <span className="text-[11px] tracking-[0.25em] uppercase text-gold mb-4 block">
              {ko ? "바로가기" : "Quick Links"}
            </span>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {CTA_CARDS.map((card) => {
                const Icon = card.icon;
                const to = card.to;
                const label = ko ? card.ko : card.en;
                const sub = ko ? card.en : card.ko;
                const desc = ko ? card.descKo : card.descEn;
                return (
                  <Link
                    key={to}
                    to={to}
                    className="group flex flex-col gap-3 p-5 bg-white/10 border border-white/15 backdrop-blur-md rounded-sm hover:bg-white/20 hover:border-gold/60 hover:-translate-y-1 transition duration-300 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.4)]"
                  >
                    <div className="flex items-center justify-between">
                      <Icon
                        className="size-6 text-gold group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]"
                        strokeWidth={1.5}
                      />
                      <ArrowUpRight className="size-4 text-white/60 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]" />
                    </div>
                    <div>
                      <div className="text-[15px] font-medium text-white group-hover:text-gold transition drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">{label}</div>
                      <div className="text-[11px] tracking-[0.18em] uppercase text-white/50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">{sub}</div>
                    </div>
                    <div className="text-xs text-white/50 leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">{desc}</div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* what we do */}
        <div className="mt-auto pt-12">
          <span className="text-[11px] tracking-[0.25em] uppercase text-gold mb-5 block">
            {ko ? "우리가 하는 일" : "What We Do"}
          </span>
          <div className="border border-white/10 bg-navy-deep/50 backdrop-blur-sm px-6 py-7 md:px-8">
            <ol className="grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-4">
              {WHAT_WE_DO.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.en} className="group flex flex-col items-center text-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-full border border-gold/50 bg-navy-deep text-gold transition duration-300 group-hover:border-gold group-hover:bg-gold/10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                      <Icon size={20} strokeWidth={1.5} />
                    </span>
                    <div>
                      <div className="text-[14px] font-medium text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">{ko ? item.ko : item.en}</div>
                      <div className="mt-1 text-[11px] text-white/55 leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">{ko ? item.koD : item.enD}</div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>

    <LocationMap />
    </>
  );
}
