import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArticleForm, type ArticleInput } from "@/components/admin/ArticleForm";

export const Route = createFileRoute("/admin/edit/$id")({
  component: EditArticle,
});

function EditArticle() {
  const { id } = Route.useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "article", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div className="bg-white border border-border p-10 text-center text-muted-foreground">Loading...</div>;
  if (error || !data) return <div className="bg-white border border-border p-10 text-center text-red-600">Article not found</div>;

  const initial: ArticleInput = {
    id: data.id,
    slug: data.slug,
    title: data.title,
    content: data.content ?? "",
    category: data.category ?? "물류인사이트",
    status: data.status,
    published_at: data.published_at,
  };

  return <ArticleForm initial={initial} />;
}
