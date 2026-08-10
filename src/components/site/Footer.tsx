import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import kakaoAsset from "@/assets/kakaotalk.png.asset.json";

export function Footer() {
  const { lang, setLang } = useLang();
  const ko = lang === "ko";

  return (
    <footer className="bg-navy text-white/80">
      <div className="container-x py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <img src="/logo.png" alt="G9 GLOBAL" className="h-10 w-auto object-contain mb-6" />
            <p className="text-sm leading-relaxed max-w-sm text-white/60">
              {ko ? (
                <>
                  국경을 넘어 비즈니스를 연결합니다. <br />전 대륙을 아우르는 글로벌 물류 솔루션.
                </>
              ) : (
                <>
                  Connecting business beyond borders. <br />
                  Global logistics solutions across every continent.
                </>
              )}
            </p>
            <div className="mt-8 flex gap-3">
              <span className="hairline" />
              <span className="text-[11px] tracking-[0.25em] uppercase text-white/40">Est. Seoul · Korea</span>
            </div>
            <div className="mt-5 text-[13px] leading-relaxed text-white/40">
              (주)지구글로벌 / {ko ? "주소" : "Address"} : 경기도 고양시 덕양구 청초로 10, A1-418 / {ko ? "사업자등록번호" : "Business No."} : 425-86-02424
            </div>
          </div>

          <FooterCol
            title={ko ? "문의" : "Contact"}
            links={[
              [ko ? "견적 요청" : "Request a Quote", "/contact"],
              ["sj.hwang@g9global.net", "/contact"],
              ["+82 31 651 4473", "/contact"],
              [
                <img
                  src={kakaoAsset.url}
                  alt="KakaoTalk"
                  className="h-6 w-6 object-contain invert opacity-70 hover:opacity-100 transition"
                />,
                "/contact",
              ],

            ]}
          />
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-[12px] text-white/40">
          <div>© {new Date().getFullYear()}&nbsp;G9 GLOBAL Co., Ltd. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold transition">
              {ko ? "개인정보처리방침" : "Privacy"}
            </a>
            <a href="#" className="hover:text-gold transition">
              {ko ? "이용약관" : "Terms"}
            </a>
            <button type="button" onClick={() => setLang(ko ? "en" : "ko")} className="hover:text-gold transition">
              {ko ? "한국어 · EN" : "EN · 한국어"}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [React.ReactNode, string][] }) {
  return (
    <div>
      <h4 className="text-[11px] tracking-[0.25em] uppercase text-gold mb-5">{title}</h4>
      <ul className="space-y-3">
        {links.map(([label, to], i) => (
          <li key={i}>
            <Link to={to} className="text-sm text-white/70 hover:text-gold transition">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
