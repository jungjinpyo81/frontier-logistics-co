import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { RichTextEditor, firstImageUrl } from "./RichTextEditor";
import { CATEGORIES, DEFAULT_CATEGORY } from "@/lib/categories";


export type ArticleStatus = "draft" | "published" | "private";

export type ArticleInput = {
  id?: string;
  slug: string;
  title: string;
  content: string;
  category: string;
  status: ArticleStatus;
  published_at: string | null;
};

function slugify(s: string) {
  const base = s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9가-힣\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return base || `post-${Date.now()}`;
}

/** Legacy plain-text content is converted to simple HTML for the editor. */
function toHtml(content: string) {
  if (!content) return "";
  if (/<[a-z][\s\S]*>/i.test(content)) return content;
  return content
    .split(/\n{2,}/)
    .map((p) => `<p>${p.replace(/\n/g, "<br />")}</p>`)
    .join("");
}

type Draft = { title: string; category: string; content: string; savedAt: string };

function draftKey(id?: string) {
  return `g9:article-draft:${id ?? "new"}`;
}

export function ArticleForm({ initial }: { initial?: ArticleInput }) {
  const navigate = useNavigate();
  const base: ArticleInput = initial
    ? { ...initial, content: toHtml(initial.content) }
    : { slug: "", title: "", content: "", category: DEFAULT_CATEGORY, status: "draft", published_at: null };
  const [form, setForm] = useState<ArticleInput>(base);
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const formRef = useRef(form);
  formRef.current = form;

  const key = draftKey(initial?.id);

  // Restore prompt (runs once, before the editor mounts)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const draft = JSON.parse(raw) as Draft;
        const when = new Date(draft.savedAt).toLocaleString("ko-KR");
        if (
          (draft.title || draft.content) &&
          window.confirm(`작성 중이던 임시 저장 글이 있습니다. (${when})\n불러오시겠습니까?`)
        ) {
          setForm((f) => ({
            ...f,
            title: draft.title,
            category: draft.category || f.category,
            content: draft.content,
          }));
        } else {
          localStorage.removeItem(key);
        }
      }
    } catch {
      /* ignore corrupted draft */
    }
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function saveDraft(manual = false) {
    const f = formRef.current;
    if (!f.title && !f.content) return;
    const draft: Draft = {
      title: f.title,
      category: f.category,
      content: f.content,
      savedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(key, JSON.stringify(draft));
      setSavedAt(new Date().toLocaleTimeString("ko-KR"));
      if (manual) toast.success("임시 저장되었습니다");
    } catch {
      if (manual) toast.error("임시 저장 실패 (저장 공간 부족)");
    }
  }

  // Auto-save every 30s
  useEffect(() => {
    if (!ready) return;
    const t = setInterval(() => saveDraft(false), 30_000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  function patch<K extends keyof ArticleInput>(k: K, v: ArticleInput[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }


  async function save(publish?: ArticleStatus) {
    if (!form.title.trim()) return toast.error("제목을 입력하세요");
    const slug = form.slug.trim() || slugify(form.title);
    const status = publish ?? form.status;

    const payload = {
      slug,
      title: form.title.trim(),
      content: form.content,
      category: form.category,
      cover_url: firstImageUrl(form.content),
      status,
      published_at:
        status === "published"
          ? form.published_at ?? new Date().toISOString()
          : form.published_at,
    };

    setBusy(true);
    try {
      if (initial?.id) {
        const { error } = await supabase.from("articles").update(payload).eq("id", initial.id);
        if (error) throw error;
        setForm((f) => ({ ...f, slug, status }));
        toast.success("저장되었습니다");
      } else {
        const { data: u } = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from("articles")
          .insert({ ...payload, author_id: u.user?.id ?? null })
          .select("id")
          .single();
        if (error) throw error;
        localStorage.removeItem(key);
        toast.success(status === "published" ? "발행되었습니다" : "저장되었습니다");
        navigate({ to: "/admin/edit/$id", params: { id: data.id } });
        return;
      }
      localStorage.removeItem(key);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "저장 실패");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="bg-white border border-border p-8 space-y-8">
      <Field label="Title">
        <input
          value={form.title}
          onChange={(e) => patch("title", e.target.value)}
          placeholder="글 제목을 입력하세요"
          className="w-full border border-border px-3 py-2.5 text-base focus:outline-none focus:border-navy"
        />
      </Field>

      <Field label="Category" hint="목록에 말머리로 표시됩니다.">
        <select
          value={form.category}
          onChange={(e) => patch("category", e.target.value)}
          className="w-full sm:w-64 border border-border bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-navy"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Field>


      <Field label="Content" hint="이미지·링크·동영상 삽입, 색상/크기/정렬 지정이 가능합니다. 첫 이미지가 목록 썸네일로 사용됩니다.">
        {ready ? (
          <RichTextEditor value={form.content} onChange={(html) => patch("content", html)} />
        ) : (
          <div className="min-h-[420px] border border-border" />
        )}
      </Field>

      <div className="flex flex-wrap items-center justify-end gap-2 pt-4 border-t border-border">
        <span className="mr-auto text-[11px] text-muted-foreground">
          {savedAt ? `임시 저장됨 · ${savedAt}` : "30초마다 자동 임시 저장됩니다"}
        </span>
        <button
          onClick={() => saveDraft(true)}
          disabled={busy}
          className="btn-ghost-light !text-navy !border-navy/30 hover:!bg-navy hover:!text-white"
        >
          임시저장
        </button>
        <button
          onClick={() => save("draft")}
          disabled={busy}
          className="btn-ghost-light !text-navy !border-navy/30 hover:!bg-navy hover:!text-white"
        >
          Save as draft
        </button>
        <button onClick={() => save("published")} disabled={busy} className="btn-gold">
          Publish article
        </button>
      </div>

    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
        {hint && <span className="text-[10px] text-muted-foreground">{hint}</span>}
      </div>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
