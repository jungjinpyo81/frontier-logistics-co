import { MapPin, ExternalLink, Navigation } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/site/Reveal";

const ADDRESS_KO = "경기도 고양시 덕양구 청초로 10, A1-418호";
const ADDRESS_EN = "10 Cheongcho-ro, Deogyang-gu, Goyang-si, Gyeonggi-do, Korea (A1-418)";
const QUERY = "경기도 고양시 덕양구 청초로 10";

const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(QUERY)}&hl=ko&z=16&output=embed`;
const viewUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(QUERY)}`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(QUERY)}`;

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

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr] items-stretch">
          <Reveal className="reveal" delay={80}>
            <div className="overflow-hidden rounded-2xl border border-navy/10 shadow-[0_18px_50px_-24px_rgba(11,31,58,0.45)]">
              <iframe
                title={ko ? "G9 GLOBAL 본사 위치 지도" : "G9 GLOBAL headquarters location map"}
                src={embedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[320px] w-full border-0 md:h-[420px]"
                allowFullScreen
              />
            </div>
          </Reveal>

          <Reveal className="reveal" delay={160}>
            <div className="h-full rounded-2xl bg-navy p-8 text-white/80 flex flex-col">
              <h3 className="font-display text-2xl text-white">(주)지구글로벌</h3>
              <p className="mt-1 text-[11px] tracking-[0.25em] uppercase text-gold">G9 Global Co., Ltd.</p>

              <div className="mt-8 space-y-5 text-sm leading-relaxed">
                <div className="flex gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-gold" aria-hidden />
                  <div>
                    <div className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-1">
                      {ko ? "주소" : "Address"}
                    </div>
                    <div className="text-white/80">{ko ? ADDRESS_KO : ADDRESS_EN}</div>
                  </div>
                </div>
                <div className="text-white/60">
                  <div className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-1">
                    {ko ? "연락처" : "Contact"}
                  </div>
                  <a href="tel:+823165144 73" className="block hover:text-gold transition">+82 31 651 4473</a>
                  <a href="mailto:sj.hwang@g9global.net" className="block hover:text-gold transition">
                    sj.hwang@g9global.net
                  </a>
                </div>
              </div>

              <div className="mt-auto pt-8 flex flex-wrap gap-3">
                <a
                  href={viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-gold/60 px-5 py-2.5 text-[13px] text-gold hover:bg-gold hover:text-navy transition"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  {ko ? "Google 지도에서 보기" : "View on Google Maps"}
                </a>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-[13px] text-white/80 hover:border-white hover:text-white transition"
                >
                  <Navigation className="h-4 w-4" aria-hidden />
                  {ko ? "길찾기" : "Get Directions"}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
