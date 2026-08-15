import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, Printer, MessageCircle, MapPin, ArrowRight, Check, ChevronDown, ShieldCheck } from "lucide-react";
import { z } from "zod";
import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — JIGU GLOBAL" },
      { name: "description", content: "Request a quote or get in touch with JIGU GLOBAL. 견적 요청 및 문의." },
      { property: "og:title", content: "Contact — JIGU GLOBAL" },
      { property: "og:description", content: "Request a quote or get in touch." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const Schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  company: z.string().trim().max(100).optional(),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().max(40).optional(),
  service: z.string().trim().max(80).optional(),
  message: z.string().trim().min(1, "Tell us about your shipment").max(2000),
  privacyConsent: z.literal("true", {
    errorMap: () => ({ message: "개인정보 수집 및 이용에 동의해주세요." }),
  }),
});

const SERVICES = [
  { ko: "해상 운송", en: "Ocean Freight" },
  { ko: "항공 운송", en: "Air Freight" },
  { ko: "특송 서비스", en: "Express Service" },
  { ko: "내륙 운송", en: "Inland Transportation" },
  { ko: "창고보관", en: "Warehousing" },
  { ko: "특수 화물", en: "Special Cargo" },
  { ko: "무역 & 솔루션", en: "Trade & Solutions" },
];

const PRIVACY_ITEMS = {
  purpose: {
    ko: "견적 문의 접수 및 상담 회신",
    en: "Receiving quote inquiries and responding to consultations",
  },
  items: {
    ko: "이름, 회사명, 이메일, 전화번호, 서비스 구분, 문의 내용",
    en: "Name, company name, email, phone number, service type, and inquiry details",
  },
  retention: {
    ko: "문의 처리 완료 후 관련 법령에 따라 최대 3년간 보관 후 파기",
    en: "Kept for up to 3 years after the inquiry is processed, then destroyed in accordance with applicable laws",
  },
  refusal: {
    ko: "이용자는 동의를 거부할 권리가 있으며, 동의 거부 시 견적 문의 접수가 제한됩니다.",
    en: "You have the right to refuse consent; however, quote inquiry submission will be restricted without consent.",
  },
};

function Contact() {
  const { lang } = useLang();
  const ko = lang === "ko";
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPrivacy, setShowPrivacy] = useState(false);

  const errorMessages: Record<string, { ko: string; en: string }> = {
    "Name is required": { ko: "이름을 입력해주세요.", en: "Name is required" },
    "Valid email required": { ko: "유효한 이메일을 입력해주세요.", en: "Valid email required" },
    "Tell us about your shipment": { ko: "화물에 대해 알려주세요.", en: "Tell us about your shipment" },
    "개인정보 수집 및 이용에 동의해주세요.": {
      ko: "개인정보 수집 및 이용에 동의해주세요.",
      en: "Please agree to the collection and use of personal information.",
    },
  };
  const trErr = (msg: string) => (errorMessages[msg] ? (ko ? errorMessages[msg].ko : errorMessages[msg].en) : msg);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const r = Schema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => {
        errs[String(i.path[0])] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
  };

  return (
    <>
      <section className="relative bg-navy-deep text-white pt-40 pb-20 md:pt-48 md:pb-28">
        <div className="container-x animate-fade-up">
          <div className="flex items-center gap-3 mb-6">
            <span className="hairline" />
            <span className="text-[11px] tracking-[0.32em] uppercase text-gold">{ko ? "문의" : "Contact"}</span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl leading-[1.15] max-w-4xl break-keep">
            {ko ? (
              <>
                귀사의 비즈니스가 <br />
                한 단계 더 도약할 수 있도록&nbsp;함께합니다. <br />
              </>
            ) : (
              <>
                Let's move your business <br />
                <span className="italic text-gold">forward — together.</span>
              </>
            )}
          </h1>
          <p className="mt-6 text-white/70 max-w-xl leading-relaxed">
            {ko
              ? "견적 요청, 파트너십 제안, 또는 단순한 문의 — 무엇이든 환영합니다."
              : "Whether it's a quote request, a partnership proposal, or a simple question — we'd love to hear from you."}
          </p>
        </div>
      </section>

      <section className="bg-background py-24 md:py-28">
        <div className="container-x grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl text-navy">{ko ? "견적 요청" : "Request a Quote"}</h2>
            <p className="mt-3 text-foreground/70 text-sm whitespace-pre-line">
              {ko
                ? "아래 양식을 작성해주시면 영업일 기준 24시간 내\n연락드리겠습니다."
                : "Fill out the form below and we'll get back to you within 24 business hours."}
            </p>

            {sent ? (
              <div className="mt-10 border border-gold bg-gold/5 p-10 text-center">
                <Check className="mx-auto size-10 text-gold" />
                <h3 className="font-display text-2xl text-navy mt-4">{ko ? "감사합니다." : "Thank you."}</h3>
                <p className="text-sm text-foreground/70 mt-2">
                  {ko
                    ? "문의가 접수되었습니다. 곧 회신드리겠습니다."
                    : "Your inquiry has been received. We'll be in touch shortly."}
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-10 grid gap-5" noValidate>
                <Field name="name" label={ko ? "이름 *" : "Name *"} err={errors.name && trErr(errors.name)} />
                <div className="grid md:grid-cols-2 gap-5">
                  <Field
                    name="company"
                    label={ko ? "회사명" : "Company"}
                    err={errors.company && trErr(errors.company)}
                  />
                  <Field
                    name="email"
                    label={ko ? "이메일 *" : "Email *"}
                    type="email"
                    err={errors.email && trErr(errors.email)}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <Field name="phone" label={ko ? "전화번호" : "Phone"} err={errors.phone && trErr(errors.phone)} />
                  <div>
                    <label className="block text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                      {ko ? "서비스" : "Service"}
                    </label>
                    <select
                      name="service"
                      className="w-full bg-mist border border-border px-4 py-3.5 text-sm focus:outline-none focus:border-navy"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.en} value={s.en}>
                          {ko ? s.ko : s.en}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                    {ko ? "메시지 *" : "Message *"}
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    className="w-full bg-mist border border-border px-4 py-3.5 text-sm focus:outline-none focus:border-navy resize-none"
                    placeholder={
                      ko
                        ? "출발지, 도착지, 화물 종류, 물량, 일정 등을 알려주세요..."
                        : "Origin, destination, cargo type, volume, timing..."
                    }
                  />
                {errors.message && <p className="text-xs text-destructive mt-1">{trErr(errors.message)}</p>}
                </div>

                <div className="border border-border bg-mist/50">
                  <button
                    type="button"
                    onClick={() => setShowPrivacy((s) => !s)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-mist transition"
                  >
                    <span className="flex items-center gap-2 text-sm font-medium text-navy">
                      <ShieldCheck className="size-4 text-gold" strokeWidth={1.6} />
                      {ko ? "개인정보 수집 및 이용 동의" : "Personal Information Collection & Usage Consent"}
                    </span>
                    <ChevronDown
                      className={`size-4 text-muted-foreground transition-transform duration-300 ${showPrivacy ? "rotate-180" : ""}`}
                    />
                  </button>
                  {showPrivacy && (
                    <div className="px-5 pb-5 pt-1 text-sm text-foreground/80 space-y-3 border-t border-border bg-white/40">
                      <p>
                        <span className="font-semibold text-navy">{ko ? "수집 및 이용 목적" : "Purpose"}:</span>{" "}
                        {ko ? PRIVACY_ITEMS.purpose.ko : PRIVACY_ITEMS.purpose.en}
                      </p>
                      <p>
                        <span className="font-semibold text-navy">{ko ? "수집 항목" : "Collected Items"}:</span>{" "}
                        {ko ? PRIVACY_ITEMS.items.ko : PRIVACY_ITEMS.items.en}
                      </p>
                      <p>
                        <span className="font-semibold text-navy">
                          {ko ? "보유 및 이용 기간" : "Retention & Usage Period"}:
                        </span>{" "}
                        {ko ? PRIVACY_ITEMS.retention.ko : PRIVACY_ITEMS.retention.en}
                      </p>
                      <p>
                        <span className="font-semibold text-navy">{ko ? "동의 거부 안내" : "Right to Refuse"}:</span>{" "}
                        {ko ? PRIVACY_ITEMS.refusal.ko : PRIVACY_ITEMS.refusal.en}
                      </p>
                    </div>
                  )}
                </div>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="privacyConsent"
                    value="true"
                    className="mt-0.5 size-4 accent-navy border-border text-navy focus:ring-navy"
                  />
                  <span className="text-sm text-foreground/80 group-hover:text-foreground transition">
                    {ko ? "[필수] 개인정보 수집 및 이용에 동의합니다." : "[Required] I agree to the collection and use of personal information."}
                  </span>
                </label>
                {errors.privacyConsent && <p className="text-xs text-destructive -mt-3">{trErr(errors.privacyConsent)}</p>}

                <button type="submit" className="btn-primary self-start mt-2">
                  {ko ? "문의 보내기" : "Send Inquiry"} <ArrowRight size={16} />
                </button>
              </form>
            )}
          </Reveal>

          <Reveal delay={120}>
            <div className="bg-navy text-white p-10 h-full">
              <h3 className="font-display text-2xl">{ko ? "연락처" : "Get in touch"}</h3>
              <div className="mt-2 h-px w-10 bg-gold" />
              <ul className="mt-10 space-y-8">
                <Info icon={Mail} label={ko ? "이메일" : "Email"} value="sj.hwang@g9global.net" />
                <Info icon={Phone} label={ko ? "전화" : "Phone"} value="+82 31 651 4473" />
                <Info icon={Printer} label={ko ? "팩스" : "Fax"} value="+82 31 949 4471" />
                <Info icon={MessageCircle} label="KakaoTalk" value={ko ? "카카오톡 상담하기" : "@jiguglobal"} />
                <Info
                  icon={MapPin}
                  label={ko ? "본사" : "HQ"}
                  value={
                    <>
                      Seoul, Republic of Korea
                      <br />
                      지구글로벌 본사
                    </>
                  }
                />
              </ul>
              <div className="mt-12 pt-8 border-t border-white/15 text-[11px] tracking-[0.25em] uppercase text-white/50">
                {ko ? "운영시간 · 월–금 09:00–18:00 KST" : "Hours · Mon–Fri 09:00–18:00 KST"}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </>
  );
}

function Field({ name, label, type = "text", err }: { name: string; label: string; type?: string; err?: string }) {
  return (
    <div>
      <label className="block text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-2">{label}</label>
      <input
        name={name}
        type={type}
        className="w-full bg-mist border border-border px-4 py-3.5 text-sm focus:outline-none focus:border-navy"
      />
      {err && <p className="text-xs text-destructive mt-1">{err}</p>}
    </div>
  );
}

function Info({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <Icon className="size-5 text-gold mt-1 shrink-0" strokeWidth={1.4} />
      <div>
        <div className="text-[11px] tracking-[0.25em] uppercase text-white/50">{label}</div>
        <div className="mt-1 text-sm text-white">{value}</div>
      </div>
    </li>
  );
}
