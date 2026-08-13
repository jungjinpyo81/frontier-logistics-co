import { useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type ArticleStatus = "draft" | "published" | "private";

export type ArticleInput = {
  id?: string;
  slug: string;
  title: string;
  content: string;
  cover_url: string;
  status: ArticleStatus;
  published_at: string | null;
};

const SIGNED_URL_TTL = 315_360_000; // ~10 years

function slugify(s: string) {
  const base = s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9가-힣\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return base || `post-${Date.now()}`;
}

export function ArticleForm({ initial }: { initial?: ArticleInput }) {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<ArticleInput>(
    initial ?? {
      slug: "",
      title: "",
      content: "",
      cover_url: "",
      status: "draft",
      published_at: null,
    }
  );
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  function patch<K extends keyof ArticleInput>(k: K, v: ArticleInput[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function uploadCover(file: File) {
    if (!file.type.startsWith("image/")) return toast.error("이미지 파일만 업로드할 수 있습니다");
    if (file.size > 10 * 1024 * 1024) return toast.error("10MB 이하 이미지를 올려주세요");

    setUploading(true);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("article-covers").upload(path, file, {
        cacheControl: "31536000",
        upsert: false,
      });
      if (error) throw error;
      const { data, error: signErr } = await supabase.storage
        .from("article-covers")
        .createSignedUrl(path, SIGNED_URL_TTL);
      if (signErr || !data) throw signErr ?? new Error("URL 생성 실패");
      patch("cover_url", data.signedUrl);
      toast.success("이미지가 업로드되었습니다");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "업로드 실패");
    } finally {
      setUploading(false);
    }
  }

  async function save(publish?: ArticleStatus) {
    if (!form.title.trim()) return toast.error("제목을 입력하세요");
    const slug = form.slug.trim() || slugify(form.title);
    const status = publish ?? form.status;

    const payload = {
      slug,
      title: form.title.trim(),
      content: form.content,
      cover_url: form.cover_url.trim() || null,
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

      <Field label="Cover image" hint="드래그 & 드롭 또는 클릭하여 업로드">
        {form.cover_url ? (
          <div className="relative group border border-border overflow-hidden">
            <img src={form.cover_url} alt="Cover preview" className="w-full h-56 object-cover" />
            <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="bg-white text-navy text-xs uppercase tracking-wider px-3 py-2"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={() => patch("cover_url", "")}
                className="bg-white text-red-600 text-xs uppercase tracking-wider px-3 py-2"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div
            role="button"
            tabIndex={0}
            onClick={() => fileRef.current?.click()}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && fileRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              const file = e.dataTransfer.files?.[0];
              if (file) void uploadCover(file);
            }}
            className={`flex h-40 cursor-pointer flex-col items-center justify-center gap-1 border border-dashed text-sm transition-colors ${
              dragOver ? "border-navy bg-mist" : "border-border hover:border-navy/50 hover:bg-mist/50"
            }`}
          >
            {uploading ? (
              <span className="text-muted-foreground">업로드 중...</span>
            ) : (
              <>
                <span className="text-navy font-medium">이미지를 드래그하거나 클릭하세요</span>
                <span className="text-xs text-muted-foreground">JPG, PNG, WEBP · 최대 10MB</span>
              </>
            )}
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void uploadCover(file);
            e.target.value = "";
          }}
        />
      </Field>

      <Field label="Content" hint="Markdown 또는 일반 텍스트. 줄바꿈이 보존됩니다.">
        <textarea
          value={form.content}
          onChange={(e) => patch("content", e.target.value)}
          rows={22}
          placeholder="본문을 입력하세요"
          className="w-full min-h-[420px] resize-y border border-border px-3 py-2 text-sm font-mono leading-relaxed focus:outline-none focus:border-navy"
        />
      </Field>

      <div className="flex flex-wrap items-center justify-end gap-2 pt-4 border-t border-border">
        <button
          onClick={() => save("draft")}
          disabled={busy || uploading}
          className="btn-ghost-light !text-navy !border-navy/30 hover:!bg-navy hover:!text-white"
        >
          Save as draft
        </button>
        <button onClick={() => save("published")} disabled={busy || uploading} className="btn-gold">
          Publish article
        </button>
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
