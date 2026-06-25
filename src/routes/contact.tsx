import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MessageCircle, MapPin, ArrowRight, Check } from "lucide-react";
import { z } from "zod";
import { Reveal } from "@/components/site/Reveal";

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
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const r = Schema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
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
            <span className="text-[11px] tracking-[0.32em] uppercase text-gold">Contact</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.03] max-w-4xl">
            Let's move your business <br />
            <span className="italic text-gold">forward — together.</span>
          </h1>
          <p className="mt-6 text-white/70 max-w-xl leading-relaxed">
            견적 요청, 파트너십 제안, 또는 단순한 문의 — 무엇이든 환영합니다.
          </p>
        </div>
      </section>

      <section className="bg-background py-24 md:py-28">
        <div className="container-x grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl text-navy">Request a Quote</h2>
            <p className="mt-3 text-foreground/70 text-sm">아래 양식을 작성해주시면 영업일 기준 24시간 내 연락드리겠습니다.</p>

            {sent ? (
              <div className="mt-10 border border-gold bg-gold/5 p-10 text-center">
                <Check className="mx-auto size-10 text-gold" />
                <h3 className="font-display text-2xl text-navy mt-4">Thank you.</h3>
                <p className="text-sm text-foreground/70 mt-2">문의가 접수되었습니다. 곧 회신드리겠습니다.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-10 grid gap-5" noValidate>
                <Field name="name" label="Name *" err={errors.name} />
                <div className="grid md:grid-cols-2 gap-5">
                  <Field name="company" label="Company" err={errors.company} />
                  <Field name="email" label="Email *" type="email" err={errors.email} />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <Field name="phone" label="Phone" err={errors.phone} />
                  <div>
                    <label className="block text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-2">Service</label>
                    <select name="service" className="w-full bg-mist border border-border px-4 py-3.5 text-sm focus:outline-none focus:border-navy">
                      <option>Ocean Freight</option>
                      <option>Air Freight</option>
                      <option>Express Service</option>
                      <option>Inland Transportation</option>
                      <option>Warehousing</option>
                      <option>Special Cargo</option>
                      <option>Trade & Solutions</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-2">Message *</label>
                  <textarea
                    name="message"
                    rows={6}
                    className="w-full bg-mist border border-border px-4 py-3.5 text-sm focus:outline-none focus:border-navy resize-none"
                    placeholder="Origin, destination, cargo type, volume, timing..."
                  />
                  {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                </div>
                <button type="submit" className="btn-primary self-start mt-2">
                  Send Inquiry <ArrowRight size={16} />
                </button>
              </form>
            )}
          </Reveal>

          <Reveal delay={120}>
            <div className="bg-navy text-white p-10 h-full">
              <h3 className="font-display text-2xl">Get in touch</h3>
              <div className="mt-2 h-px w-10 bg-gold" />
              <ul className="mt-10 space-y-8">
                <Info icon={Mail}          label="Email"     value="sales@jiguglobal.com" />
                <Info icon={Phone}         label="Phone"     value="+82 2 0000 0000" />
                <Info icon={MessageCircle} label="KakaoTalk" value="@jiguglobal" />
                <Info icon={MapPin}        label="HQ"        value={<>Seoul, Republic of Korea<br />지구글로벌 본사</>} />
              </ul>
              <div className="mt-12 pt-8 border-t border-white/15 text-[11px] tracking-[0.25em] uppercase text-white/50">
                Hours · Mon–Fri 09:00–18:00 KST
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist py-0">
        <div className="aspect-[16/6] w-full bg-navy-deep relative overflow-hidden">
          <iframe
            title="JIGU GLOBAL HQ"
            src="https://www.google.com/maps?q=Seoul,South+Korea&output=embed"
            className="absolute inset-0 size-full grayscale-[40%] opacity-90"
            loading="lazy"
          />
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
