import { Link } from "@tanstack/react-router";
import logoLight from "../../assets/logo.png.asset.json";

export function Footer() {
  return (
    <footer className="bg-navy text-white/80">
      <div className="container-x py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="size-10 grid place-items-center bg-white/5 border border-white/15">
                <span className="font-display text-xl text-gold">地</span>
              </div>
              <div>
                <div className="font-display text-lg text-white">JIGU GLOBAL</div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-white/50">지구글로벌</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-sm text-white/60">
              Connecting business beyond borders. <br />
              Global logistics solutions across every continent.
            </p>
            <div className="mt-8 flex gap-3">
              <span className="hairline" />
              <span className="text-[11px] tracking-[0.25em] uppercase text-white/40">
                Est. Seoul · Korea
              </span>
            </div>
          </div>

          <FooterCol
            title="Services"
            links={[
              ["Ocean Freight", "/services"],
              ["Air Freight", "/services"],
              ["Express", "/services"],
              ["Inland", "/services"],
              ["Warehousing", "/services"],
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              ["Our Story", "/our-story"],
              ["Global Network", "/global-network"],
              ["Special Cargo", "/special-cargo"],
              ["Trade & Solutions", "/trade-solutions"],
              ["Insights", "/insights"],
            ]}
          />
          <FooterCol
            title="Contact"
            links={[
              ["Request a Quote", "/contact"],
              ["sales@jiguglobal.com", "/contact"],
              ["+82 2 0000 0000", "/contact"],
              ["KakaoTalk", "/contact"],
            ]}
          />
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-[12px] text-white/40">
          <div>© {new Date().getFullYear()} JIGU GLOBAL Co., Ltd. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold transition">Privacy</a>
            <a href="#" className="hover:text-gold transition">Terms</a>
            <a href="#" className="hover:text-gold transition">한국어 · EN</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="text-[11px] tracking-[0.25em] uppercase text-gold mb-5">{title}</h4>
      <ul className="space-y-3">
        {links.map(([label, to]) => (
          <li key={label}>
            <Link to={to} className="text-sm text-white/70 hover:text-gold transition">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
