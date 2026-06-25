import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type ArticleStatus = "draft" | "published" | "private";

export type ArticleInput = {
  id?: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  cover_url: string;
  tag: string;
  status: ArticleStatus;
  published_at: string | null;
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9가-힣\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function ArticleForm({ initial }: { initial?: ArticleInput }) {
  const navigate = useNavigate();
  const [form, setForm] = useState<ArticleInput>(
    initial ?? {
      slug: "",
      title: "",
      summary: "",
      content: "",
      cover_url: "",
      tag: "",
      status: "draft",
      published_at: null,
    }
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
      summary: form.summary.trim() || null,
      content: form.content,
      cover_url: form.cover_url.trim() || null,
      tag: form.tag.trim() || null,
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
        toast.success("저장되었습니다");
      } else {
        const { data: u } = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from("articles")
          .insert({ ...payload, author_id: u.user?.id ?? null })
          .select("id")
          .single();
        if (error) throw error;
        toast.success("새 글이 생성되었습니다");
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
    <div className="bg-white border border-border p-8 space-y-6">
      <Field label="Title">
        <input
          value={form.title}
          onChange={(e) => patch("title", e.target.value)}
          className="w-full border border-border px-3 py-2 text-sm focus:outline-none focus:border-navy"
        />
      </Field>

      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Slug (URL)" hint="비워두면 제목으로 자동 생성">
          <input
            value={form.slug}
            onChange={(e) => patch("slug", e.target.value)}
            placeholder={slugify(form.title) || "my-article"}
            className="w-full border border-border px-3 py-2 text-sm focus:outline-none focus:border-navy font-mono"
          />
        </Field>
        <Field label="Tag">
          <input
            value={form.tag}
            onChange={(e) => patch("tag", e.target.value)}
            placeholder="Trends, Cold Chain, ..."
            className="w-full border border-border px-3 py-2 text-sm focus:outline-none focus:border-navy"
          />
        </Field>
      </div>

      <Field label="Cover image URL">
        <input
          value={form.cover_url}
          onChange={(e) => patch("cover_url", e.target.value)}
          placeholder="https://..."
          className="w-full border border-border px-3 py-2 text-sm focus:outline-none focus:border-navy"
        />
      </Field>

      <Field label="Summary" hint="목록 카드에 표시">
        <textarea
          value={form.summary}
          onChange={(e) => patch("summary", e.target.value)}
          rows={2}
          className="w-full border border-border px-3 py-2 text-sm focus:outline-none focus:border-navy"
        />
      </Field>

      <Field label="Content" hint="Markdown 또는 일반 텍스트. 줄바꿈이 보존됩니다.">
        <textarea
          value={form.content}
          onChange={(e) => patch("content", e.target.value)}
          rows={18}
          className="w-full border border-border px-3 py-2 text-sm font-mono focus:outline-none focus:border-navy"
        />
      </Field>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Status</span>
          <select
            value={form.status}
            onChange={(e) => patch("status", e.target.value as ArticleStatus)}
            className="border border-border px-2 py-1.5 text-sm"
          >
            <option value="draft">Draft (비공개 작업중)</option>
            <option value="published">Published (공개)</option>
            <option value="private">Private (로그인 사용자만)</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => save("draft")} disabled={busy} className="btn-ghost-light !text-navy !border-navy/30 hover:!bg-navy hover:!text-white">
            Save as draft
          </button>
          <button onClick={() => save("private")} disabled={busy} className="btn-ghost-light !text-navy !border-navy/30 hover:!bg-navy hover:!text-white">
            Save as private
          </button>
          <button onClick={() => save("published")} disabled={busy} className="btn-gold">
            {form.status === "published" ? "Update" : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
        {hint && <span className="text-[10px] text-muted-foreground">{hint}</span>}
      </div>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
