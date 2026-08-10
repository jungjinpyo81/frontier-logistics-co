import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Boxes, Globe2, TrendingUp, BookOpen, Newspaper, Mail } from "lucide-react";
import heroShip from "@/assets/hero-ship.jpg";
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
    ko: "인사이트",
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

const TIMELINE = [
  {
    y: "2011",
    ko: "서정물류\n평택 화물운송업 시작",
    en: "Seojeong Logistics founded — freight transport in Pyeongtaek",
  },
  { y: "2013", ko: "화물운송 \n및 중장비 사업", en: "Expanded into freight and heavy equipment" },
  { y: "2016", ko: "바닥청소차\n렌탈사업 확장", en: "Expanded into floor-sweeper rental business" },
  {
    y: "2021",
    ko: "주식회사 변환 및 \n자회사 ㈜지구글로벌 발족",
    en: "Incorporated; launched subsidiary JIGU GLOBAL Co., Ltd.",
  },
  { y: "2022", ko: "사세확장으로 인한\n㈜지구글로벌 분사", en: "JIGU GLOBAL spun off following business growth" },
];

function Home() {
  const { lang } = useLang();
  const ko = lang === "ko";
  return (
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
                        className="size-6 text-gold group-hover:scale-110 transition-transform duration-300"
                        strokeWidth={1.5}
                      />
                      <ArrowUpRight className="size-4 text-white/60 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                    </div>
                    <div>
                      <div className="text-[15px] font-medium text-white group-hover:text-gold transition">{label}</div>
                      <div className="text-[11px] tracking-[0.18em] uppercase text-white/50">{sub}</div>
                    </div>
                    <div className="text-xs text-white/50 leading-relaxed">{desc}</div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* company history */}
        <div className="mt-auto pt-12">
          <span className="text-[11px] tracking-[0.25em] uppercase text-gold mb-5 block">
            {ko ? "회사 연혁" : "Our History"}
          </span>
          <div className="border border-white/10 bg-navy-deep/50 backdrop-blur-sm px-6 py-7 md:px-8">
            <ol className="relative grid gap-6 md:grid-cols-5 md:gap-4">
              <span className="hidden md:block absolute left-0 right-0 top-[7px] h-px bg-white/15" />
              {TIMELINE.map((t) => (
                <li key={t.y} className="relative flex gap-3 md:block">
                  <span className="mt-1 md:mt-0 size-3.5 shrink-0 rounded-full border-2 border-gold bg-navy-deep md:mb-4 block" />
                  <div>
                    <div className="font-display text-2xl md:text-3xl text-white leading-none">{t.y}</div>
                    <div className="mt-2 text-xs md:text-[13px] text-white/60 leading-relaxed">{ko ? t.ko : t.en}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
