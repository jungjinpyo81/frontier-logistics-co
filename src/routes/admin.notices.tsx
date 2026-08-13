import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/notices")({
  component: AdminNotices,
});

type Draft = { id?: string; title: string; author: string; content: string };

const empty: Draft = { title: "", author: "관리자", content: "" };

function AdminNotices() {
  const qc = useQueryClient();
  const [draft, setDraft] = useState<Draft>(empty);

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "notices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notices")
        .select("id, title, content, author, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const save = useMutation({
    mutationFn: async (d: Draft) => {
      const payload = {
        title: d.title.trim(),
        author: d.author.trim() || "관리자",
        content: d.content,
      };
      if (d.id) {
        const { error } = await supabase.from("notices").update(payload).eq("id", d.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("notices").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(draft.id ? "수정되었습니다" : "등록되었습니다");
      setDraft(empty);
      qc.invalidateQueries({ queryKey: ["admin", "notices"] });
      qc.invalidateQueries({ queryKey: ["notices"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("notices").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("삭제되었습니다");
      setDraft((d) => (d.id ? empty : d));
      qc.invalidateQueries({ queryKey: ["admin", "notices"] });
      qc.invalidateQueries({ queryKey: ["notices"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.title.trim()) return toast.error("제목을 입력하세요");
    save.mutate(draft);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
      <form onSubmit={submit} className="bg-white border border-border p-6 h-fit">
        <h2 className="font-display text-xl text-navy">
          {draft.id ? "공지 수정" : "새 공지 작성"}
        </h2>
        <div className="mt-5 space-y-4 text-sm">
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5" htmlFor="notice-title">제목</label>
            <input
              id="notice-title"
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              className="w-full border border-border px-3 py-2.5 outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5" htmlFor="notice-author">글쓴이</label>
            <input
              id="notice-author"
              value={draft.author}
              onChange={(e) => setDraft({ ...draft, author: e.target.value })}
              className="w-full border border-border px-3 py-2.5 outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5" htmlFor="notice-content">내용</label>
            <textarea
              id="notice-content"
              rows={12}
              value={draft.content}
              onChange={(e) => setDraft({ ...draft, content: e.target.value })}
              className="w-full border border-border px-3 py-2.5 outline-none focus:border-gold resize-y"
            />
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <button type="submit" disabled={save.isPending} className="btn-gold !py-2.5 !px-5 !text-[12px] disabled:opacity-50">
            {save.isPending ? "저장 중..." : draft.id ? "수정 저장" : "등록"}
          </button>
          {draft.id && (
            <button type="button" onClick={() => setDraft(empty)} className="text-xs text-muted-foreground hover:text-navy">
              취소
            </button>
          )}
        </div>
      </form>

      <div className="bg-white border border-border">
        <table className="w-full text-sm">
          <thead className="bg-mist border-b border-border text-left">
            <tr>
              <th className="px-5 py-3 text-xs uppercase tracking-wider font-medium text-muted-foreground">제목</th>
              <th className="px-5 py-3 text-xs uppercase tracking-wider font-medium text-muted-foreground">글쓴이</th>
              <th className="px-5 py-3 text-xs uppercase tracking-wider font-medium text-muted-foreground">날짜</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr><td colSpan={4} className="px-5 py-10 text-center text-muted-foreground">Loading...</td></tr>
            )}
            {!isLoading && data?.length === 0 && (
              <tr><td colSpan={4} className="px-5 py-12 text-center text-muted-foreground">등록된 공지사항이 없습니다.</td></tr>
            )}
            {data?.map((n) => (
              <tr key={n.id} className="border-b border-border/60 hover:bg-mist/40">
                <td className="px-5 py-4 text-navy break-keep">{n.title}</td>
                <td className="px-5 py-4 text-muted-foreground">{n.author}</td>
                <td className="px-5 py-4 text-xs text-muted-foreground">
                  {new Date(n.created_at).toISOString().slice(0, 10)}
                </td>
                <td className="px-5 py-4 text-right whitespace-nowrap">
                  <button
                    onClick={() => setDraft({ id: n.id, title: n.title, author: n.author, content: n.content ?? "" })}
                    className="text-xs text-navy hover:text-gold mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => { if (confirm("이 공지를 삭제하시겠습니까?")) remove.mutate(n.id); }}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
