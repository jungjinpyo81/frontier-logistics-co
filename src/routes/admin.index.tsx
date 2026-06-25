import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/")({
  component: AdminList,
});

function AdminList() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("id, slug, title, status, tag, updated_at, published_at")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  async function remove(id: string) {
    if (!confirm("이 글을 삭제하시겠습니까?")) return;
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    qc.invalidateQueries({ queryKey: ["admin", "articles"] });
  }

  return (
    <div className="bg-white border border-border">
      <table className="w-full text-sm">
        <thead className="bg-mist border-b border-border text-left">
          <tr>
            <th className="px-5 py-3 font-medium text-xs uppercase tracking-wider text-muted-foreground">Title</th>
            <th className="px-5 py-3 font-medium text-xs uppercase tracking-wider text-muted-foreground">Tag</th>
            <th className="px-5 py-3 font-medium text-xs uppercase tracking-wider text-muted-foreground">Status</th>
            <th className="px-5 py-3 font-medium text-xs uppercase tracking-wider text-muted-foreground">Updated</th>
            <th className="px-5 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr><td colSpan={5} className="px-5 py-8 text-center text-muted-foreground">Loading...</td></tr>
          )}
          {data?.length === 0 && (
            <tr><td colSpan={5} className="px-5 py-12 text-center text-muted-foreground">
              아직 작성된 글이 없습니다. <Link to="/admin/new" className="text-gold underline">새 글 작성</Link>
            </td></tr>
          )}
          {data?.map((a) => (
            <tr key={a.id} className="border-b border-border/60 hover:bg-mist/40">
              <td className="px-5 py-4">
                <Link to="/admin/edit/$id" params={{ id: a.id }} className="text-navy font-medium hover:text-gold">
                  {a.title}
                </Link>
                <div className="text-[11px] text-muted-foreground mt-0.5">/{a.slug}</div>
              </td>
              <td className="px-5 py-4 text-muted-foreground">{a.tag || "—"}</td>
              <td className="px-5 py-4">
                <StatusBadge status={a.status} />
              </td>
              <td className="px-5 py-4 text-xs text-muted-foreground">
                {new Date(a.updated_at).toLocaleDateString()}
              </td>
              <td className="px-5 py-4 text-right">
                <Link to="/admin/edit/$id" params={{ id: a.id }} className="text-xs text-navy hover:text-gold mr-3">Edit</Link>
                <button onClick={() => remove(a.id)} className="text-xs text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    draft: "bg-muted text-muted-foreground",
    published: "bg-green-100 text-green-800",
    private: "bg-amber-100 text-amber-800",
  };
  return (
    <span className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider ${styles[status]}`}>
      {status}
    </span>
  );
}
