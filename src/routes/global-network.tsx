import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import network from "@/assets/global-network.jpg";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "./our-story";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/global-network")({
  head: () => ({
    meta: [
      { title: "Global Network — JIGU GLOBAL" },
      { name: "description", content: "Six continents, one partner. JIGU GLOBAL의 글로벌 네트워크를 만나보세요." },
      { property: "og:title", content: "Global Network — JIGU GLOBAL" },
      { property: "og:description", content: "Six continents, one partner." },
      { property: "og:url", content: "/global-network" },
    ],
    links: [{ rel: "canonical", href: "/global-network" }],
  }),
  component: GlobalNetwork,
});

const REGIONS = {
  "Asia Pacific":  { ko: "아시아 태평양", hubs: ["Seoul", "Shanghai", "Tokyo", "Singapore", "Ho Chi Minh", "Sydney"], cap: { ko: "Korea를 중심으로 한 가장 강력한 인트라-아시아 네트워크. 주요 항만/공항 직접 운영.", en: "The strongest intra-Asia network centered on Korea, with direct operations at key ports and airports." } },
  "Europe":        { ko: "유럽",          hubs: ["Rotterdam", "Hamburg", "Antwerp", "Frankfurt", "London"], cap: { ko: "유럽 주요 게이트웨이 항만과 내륙 운송 네트워크 연결.", en: "Connecting Europe's major gateway ports with an extensive inland transport network." } },
  "Middle East":   { ko: "중동",          hubs: ["Dubai", "Jeddah", "Istanbul"], cap: { ko: "프로젝트 카고와 위험물 처리에 강점을 가진 중동 허브.", en: "A Middle East hub specializing in project cargo and dangerous goods handling." } },
  "Africa":        { ko: "아프리카",       hubs: ["Cairo", "Nairobi", "Lagos", "Cape Town"], cap: { ko: "신흥 시장 진입을 지원하는 신뢰할 수 있는 현지 파트너십.", en: "Trusted local partnerships that support entry into emerging markets." } },
  "North America": { ko: "북미",           hubs: ["Los Angeles", "New York", "Chicago", "Vancouver"], cap: { ko: "주요 항만/공항 풀필먼트 및 내륙 트럭킹 통합 솔루션.", en: "Integrated fulfillment and inland trucking solutions across major ports and airports." } },
  "Latin America": { ko: "중남미",          hubs: ["Mexico City", "São Paulo", "Buenos Aires", "Lima"], cap: { ko: "성장하는 중남미 시장을 위한 전문 포워딩 서비스.", en: "Specialized forwarding services for the fast-growing Latin American market." } },
};

const STATS = [
  { k: "120+", v: { ko: "국가", en: "Countries" } },
  { k: "6", v: { ko: "대륙", en: "Continents" } },
  { k: "40+", v: { ko: "전략 허브", en: "Strategic Hubs" } },
  { k: "24/7", v: { ko: "운영", en: "Operations" } },
];

function GlobalNetwork() {
  const { lang } = useLang();
  const ko = lang === "ko";
  const [region, setRegion] = useState<keyof typeof REGIONS>("Asia Pacific");
  const data = REGIONS[region];

  return (
    <>
      <PageHero
        eyebrow="Global Network"
        title={<>Six continents. <br /><span className="italic text-gold">One partner.</span></>}
        sub={ko ? "지구글로벌은 6대륙 120개 이상의 국가와 연결된 물류 네트워크를 운영합니다." : "JIGU GLOBAL operates a logistics network connecting more than 120 countries across six continents."}
        image={network}
      />

      <section className="bg-background py-28 md:py-36">
        <div className="container-x">
          <Reveal className="grid gap-12 lg:grid-cols-[1fr_1.4fr] items-start">
            <div>
              <span className="eyebrow"><span className="hairline" /> {ko ? "지역" : "Regions"}</span>
              <h2 className="font-display mt-6 text-3xl md:text-4xl text-navy">{ko ? "지역별로 살펴보세요." : "Explore by region."}</h2>
              <ul className="mt-10 divide-y divide-border border-y border-border">
                {(Object.keys(REGIONS) as Array<keyof typeof REGIONS>).map((r) => (
                  <li key={r}>
                    <button
                      onClick={() => setRegion(r)}
                      className={`w-full py-5 flex items-center justify-between text-left group transition ${
                        region === r ? "text-navy" : "text-foreground/60 hover:text-navy"
                      }`}
                    >
                      <span className="flex items-center gap-4">
                        <span className={`size-1.5 rounded-full ${region === r ? "bg-gold" : "bg-border"}`} />
                        <span>
                          <span className="font-display text-xl block">{r}</span>
                          <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">{REGIONS[r].ko}</span>
                        </span>
                      </span>
                      <ArrowRight size={16} className={`transition ${region === r ? "text-gold translate-x-1" : ""}`} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-navy-deep text-white p-10 md:p-14 min-h-[520px] relative overflow-hidden">
              <img src={network} alt="" width={1600} height={900} loading="lazy" className="absolute inset-0 size-full object-cover opacity-25" />
              <div className="absolute inset-0 bg-gradient-to-tr from-navy-deep via-navy-deep/80 to-transparent" />
              <div className="relative" key={region}>
                <div className="animate-fade-up">
                  <div className="text-[11px] tracking-[0.25em] uppercase text-gold">{data.ko}</div>
                  <h3 className="font-display text-4xl md:text-6xl mt-3">{region}</h3>
                  <p className="mt-8 text-white/75 max-w-md leading-relaxed">{ko ? data.cap.ko : data.cap.en}</p>
                  <div className="mt-12">
                    <div className="text-[11px] tracking-[0.25em] uppercase text-white/50 mb-4">{ko ? "주요 허브" : "Key Hubs"}</div>
                    <div className="flex flex-wrap gap-2">
                      {data.hubs.map((h) => (
                        <span key={h} className="px-4 py-2 border border-white/20 text-sm">{h}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist py-24">
        <div className="container-x grid md:grid-cols-4 gap-px bg-border border border-border">
          {STATS.map((s) => (
            <div key={s.k} className="bg-background p-10 text-center">
              <div className="font-display text-5xl text-navy">{s.k}</div>
              <div className="mt-2 text-[11px] tracking-[0.25em] uppercase text-muted-foreground">{ko ? s.v.ko : s.v.en}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-navy text-white py-24">
        <div className="container-x flex flex-col md:flex-row gap-8 md:items-center md:justify-between">
          <h2 className="font-display text-3xl md:text-5xl max-w-2xl">
            {ko ? (
              <>사업이 향하는 곳이라면 어디든, <span className="italic text-gold">이미 저희가 있습니다.</span></>
            ) : (
              <>Wherever your business goes, <span className="italic text-gold">we're already there.</span></>
            )}
          </h2>
          <Link to="/contact" className="btn-gold self-start">{ko ? "문의하기" : "Talk to us"} <ArrowRight size={16} /></Link>
        </div>
      </section>
    </>
  );
}
