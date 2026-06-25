import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/our-story", label: "Our Story" },
  { to: "/services", label: "Services" },
  { to: "/global-network", label: "Global Network" },
  { to: "/special-cargo", label: "Special Cargo" },
  { to: "/trade-solutions", label: "Trade & Solutions" },
  { to: "/insights", label: "Insights" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar({ overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
      <div className="container-x flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className={`size-9 grid place-items-center transition-colors ${solid ? "bg-navy" : "bg-white/10 backdrop-blur-sm border border-white/30"}`}>
            <span className={`font-display text-lg ${solid ? "text-gold" : "text-gold"}`}>地</span>
          </div>
          <div className="leading-tight">
            <div className={`font-display text-base tracking-tight ${solid ? "text-navy" : "text-white"}`}>
              JIGU GLOBAL
            </div>
            <div className={`text-[10px] tracking-[0.25em] uppercase ${solid ? "text-muted-foreground" : "text-white/70"}`}>
              지구글로벌
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV.slice(1, -1).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`text-[13px] font-medium tracking-wide transition-colors hover:text-gold ${
                solid ? "text-foreground/80" : "text-white/90"
              }`}
              activeProps={{ className: "!text-gold" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/contact" className="btn-gold !py-2.5 !px-5 !text-[12px]">
            Request a Quote
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden p-2 ${solid ? "text-navy" : "text-white"}`}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-border">
          <div className="container-x py-4 flex flex-col">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-foreground border-b border-border/60 last:border-0"
                activeProps={{ className: "!text-gold" }}
              >
                {n.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-gold mt-4">
              Request a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
