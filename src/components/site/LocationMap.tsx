import { ExternalLink, Navigation } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/site/Reveal";

const ADDRESS_KO = "경기도 고양시 덕양구 청초로 10, A1-418";
const ADDRESS_EN = "10 Cheongcho-ro, Deogyang-gu, Goyang-si, Gyeonggi-do, Korea (A1-418)";

// 청초로 좌표 — 마커를 지도 중앙에 표시하기 위해 좌표 기반 임베드 사용
const LAT = 37.5793;
const LNG = 126.8644;

const embedSrc = `https://www.google.com/maps?q=${LAT},${LNG}&center=${LAT},${LNG}&z=16&hl=ko&output=embed`;
const viewUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_KO)}`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS_KO)}`;

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

        <Reveal className="reveal" delay={140}>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gold/60 px-6 py-2.5 text-[13px] text-gold hover:bg-gold hover:text-navy transition"
            >
              <ExternalLink className="h-4 w-4" aria-hidden />
              {ko ? "Google 지도에서 보기" : "View on Google Maps"}
            </a>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-navy/25 px-6 py-2.5 text-[13px] text-navy/80 hover:border-navy hover:text-navy transition"
            >
              <Navigation className="h-4 w-4" aria-hidden />
              {ko ? "길찾기" : "Get Directions"}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
