import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

type SubItem = { to: string; ko: string; en: string };
type NavItem = { to: string; ko: string; en: string; sub?: SubItem[] };

const NAV: NavItem[] = [
  {
    to: "/our-story",
    ko: "회사소개",
    en: "Our Story",
    sub: [
      { to: "/our-story", ko: "소개 및 연혁", en: "About & History" },
      { to: "/our-story", ko: "조직도", en: "Organization" },
    ],
  },
  {
    to: "/services",
    ko: "서비스",
    en: "Services",
    sub: [
      { to: "/services", ko: "해상 수출입 (FCL / LCL)", en: "Ocean (FCL / LCL)" },
      { to: "/services", ko: "항공 수출입", en: "Air Freight" },
      { to: "/services", ko: "국제특송", en: "Express" },
      { to: "/services", ko: "창고 (일반)", en: "Warehousing" },
      { to: "/special-cargo", ko: "창고 (특수)", en: "Special Cargo" },
    ],
  },
  { to: "/global-network", ko: "글로벌 네트워크", en: "Global Network" },
  {
    to: "/trade-solutions",
    ko: "무역 솔루션",
    en: "Trade Solutions",
    sub: [
      { to: "/trade-solutions", ko: "국내 중고차 수출", en: "Used Car Export" },
      { to: "/trade-solutions", ko: "장비 수출입", en: "Equipment Trading" },
      { to: "/trade-solutions", ko: "기계 수출입", en: "Machinery Trading" },
    ],
  },
  {
    to: "/contact",
    ko: "문의 / 공지",
    en: "Contact / News",
    sub: [
      { to: "/contact", ko: "온라인 문의", en: "Online Inquiry" },
      { to: "/insights", ko: "공지사항", en: "Notices" },
    ],
  },
];

export function Navbar({ overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { lang, setLang } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !overlay || scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-white/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex flex-col items-center pt-4 pb-2">
        {/* Top row: logo centered, utility links on right */}
        <div className="w-full flex items-center justify-between">
          <div className="hidden md:flex items-center gap-4 text-[11px] tracking-widest uppercase opacity-0 pointer-events-none">
            <span>placeholder</span>
          </div>

          <Link to="/" className="flex items-center group mx-auto md:mx-0 md:absolute md:left-1/2 md:-translate-x-1/2">
            <img
              src={solid ? "/logo-dark.png" : "/logo.png"}
              alt="G9 GLOBAL"
              className="h-10 md:h-12 w-auto object-contain transition-opacity duration-300 group-hover:opacity-90"
            />
          </Link>

          <div className={`hidden md:flex items-center gap-5 text-[11px] tracking-[0.18em] uppercase font-medium ${solid ? "text-foreground/70" : "text-white/80"}`}>
            <Link to="/" className="hover:text-gold transition-colors">HOME</Link>
            <span className={solid ? "text-foreground/30" : "text-white/30"}>|</span>
            <button
              type="button"
              onClick={() => setLang(lang === "ko" ? "en" : "ko")}
              className="hover:text-gold transition-colors"
              aria-label={lang === "ko" ? "Switch to English" : "한국어로 전환"}
            >
              {lang === "ko" ? "ENG" : "KOR"}
            </button>
            <span className={solid ? "text-foreground/30" : "text-white/30"}>|</span>
            <Link to="/contact" className="hover:text-gold transition-colors">
              {lang === "ko" ? "CONTACT US" : "CONTACT US"}
            </Link>
          </div>
        </div>

        {/* Bottom row: horizontal menu */}
        <nav className="w-full mt-3 md:mt-4" onMouseLeave={() => setOpenMenu(null)}>
          <ul className="flex items-center justify-center gap-6 md:gap-10 whitespace-nowrap px-2 pb-1">
            {NAV.map((n) => (
              <li
                key={n.to}
                className="relative"
                onMouseEnter={() => setOpenMenu(n.to)}
                onFocus={() => setOpenMenu(n.to)}
              >
                <Link
                  to={n.to}
                  className={`inline-block pb-2 text-[13px] md:text-[14px] font-semibold tracking-wide transition-colors hover:text-gold ${
                    solid ? "text-foreground/85" : "text-white/95"
                  }`}
                  activeProps={{ className: "!text-gold" }}
                >
                  {lang === "ko" ? n.ko : n.en}
                </Link>

                {n.sub && (
                  <div
                    className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-1 transition-all duration-300 ${
                      openMenu === n.to
                        ? "visible opacity-100 translate-y-0"
                        : "invisible opacity-0 -translate-y-1"
                    }`}
                  >
                    <ul className="min-w-[200px] rounded-md border border-white/15 bg-navy/80 py-2 shadow-xl backdrop-blur-md">
                      {n.sub.map((s) => (
                        <li key={`${s.to}-${s.en}`}>
                          <Link
                            to={s.to}
                            onClick={() => setOpenMenu(null)}
                            className="block px-5 py-2.5 text-[13px] font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-gold"
                          >
                            {lang === "ko" ? s.ko : s.en}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

      </div>
    </header>
  );
}
