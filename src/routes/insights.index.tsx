import { createFileRoute } from "@tanstack/react-router";
import network from "@/assets/global-network.jpg";
import { PageHero } from "./our-story";
import { useLang } from "@/lib/i18n";
import { NoticeBoard } from "@/components/site/NoticeBoard";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "소식 & 정보 — JIGU GLOBAL" },
      { name: "description", content: "지구글로벌의 공지사항과 물류·무역 인사이트를 한 곳에서 확인하세요. 국제 물류 트렌드, 위험물, 콜드체인 정보." },
      { property: "og:title", content: "소식 & 정보 — JIGU GLOBAL" },
      { property: "og:description", content: "지구글로벌의 공지사항과 물류·무역 인사이트." },
      { property: "og:url", content: "/insights" },
    ],
    links: [{ rel: "canonical", href: "/insights" }],
  }),
  component: Insights,
});

function Insights() {
  const { lang } = useLang();
  const ko = lang === "ko";

  return (
    <>
      <PageHero
        eyebrow="News & Insights"
        title={ko ? <>소식 &amp; <span className="italic text-gold">정보</span></> : <>News &amp; <span className="italic text-gold">Insights</span></>}
        sub={ko ? <>지구글로벌의 공지사항과 인사이트&nbsp;<br />국제 물류, 위험물, 콜드체인, 무역 트렌드를 한 곳에서.</> : "Notices and insights from JIGU GLOBAL — international logistics, dangerous goods, cold chain, and trade trends."}
        image={network}
      />

      <section id="notices" className="scroll-mt-28 bg-background py-24 md:py-28">
        <div className="container-x">
          <NoticeBoard />
        </div>
      </section>
    </>
  );
}
