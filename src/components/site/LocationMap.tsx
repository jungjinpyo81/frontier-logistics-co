import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/site/Reveal";

// 청초로 10 지식산업센터 A타워(A1-418) 좌표 — 마커를 정확한 건물 위치에 표시
const LAT = 37.5807;
const LNG = 126.8572;

const embedSrc = `https://www.google.com/maps?q=${LAT},${LNG}&center=${LAT},${LNG}&z=16&hl=ko&output=embed`;

export function LocationMap() {
  const { lang } = useLang();
  const ko = lang === "ko";

  return (
    <section className="bg-mist border-t border-navy/10">
      <div className="container-x py-20">
        <Reveal className="reveal">
          <div className="flex items-center gap-3">
            <span className="hairline !bg-navy/30" />
            <span className="text-[11px] tracking-[0.25em] uppercase text-navy/50">Location</span>
          </div>
          <h2 className="mt-4 font-display text-3xl md:text-4xl text-navy">
            {ko ? "오시는 길" : "Visit Our Office"}
          </h2>
        </Reveal>

        <Reveal className="reveal" delay={80}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-navy/10 shadow-[0_18px_50px_-24px_rgba(11,31,58,0.45)]">
            <iframe
              title={ko ? "G9 GLOBAL 본사 위치 지도" : "G9 GLOBAL headquarters location map"}
              src={embedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[320px] w-full border-0 md:h-[460px]"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
