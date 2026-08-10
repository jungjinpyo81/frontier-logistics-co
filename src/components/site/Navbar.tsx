import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

const NAV = [
  { to: "/our-story", ko: "회사소개", en: "Our Story" },
  { to: "/services", ko: "서비스", en: "Services" },
  { to: "/global-network", ko: "글로벌 네트워크", en: "Global Network" },
  { to: "/trade-solutions", ko: "트레이드 솔루션", en: "Trade Solutions" },
  { to: "/insights", ko: "인사이트", en: "Insights" },
  { to: "/contact", ko: "문의하기", en: "Contact" },
] as const;

export function Navbar({ overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
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
        <nav className="w-full mt-3 md:mt-4">
          <ul className="flex items-center justify-center gap-6 md:gap-10 overflow-x-auto whitespace-nowrap px-2 pb-1 scrollbar-none">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className={`text-[13px] md:text-[14px] font-semibold tracking-wide transition-colors hover:text-gold ${
                    solid ? "text-foreground/85" : "text-white/95"
                  }`}
                  activeProps={{ className: "!text-gold" }}
                >
                  {lang === "ko" ? n.ko : n.en}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
