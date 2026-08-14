import { useState } from "react";
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

export function ArticleForm({ initial }: { initial?: ArticleInput }) {
  const navigate = useNavigate();
  const [form, setForm] = useState<ArticleInput>(
    initial
      ? { ...initial, content: toHtml(initial.content) }
      : { slug: "", title: "", content: "", category: DEFAULT_CATEGORY, status: "draft", published_at: null }
  );
  const [busy, setBusy] = useState(false);

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
        toast.success(status === "published" ? "발행되었습니다" : "저장되었습니다");
        navigate({ to: "/admin/edit/$id", params: { id: data.id } });
        return;
      }
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


      <Field label="Content" hint="본문 어디에나 이미지를 삽입할 수 있습니다. 첫 이미지가 목록 썸네일로 사용됩니다.">
        <RichTextEditor value={form.content} onChange={(html) => patch("content", html)} />
      </Field>

      <div className="flex flex-wrap items-center justify-end gap-2 pt-4 border-t border-border">
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
