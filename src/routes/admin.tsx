import { createFileRoute, Outlet, useNavigate, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — JIGU GLOBAL" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  async function signOut() {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/auth" });
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  }
  if (!user) return null;

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mist px-4 pt-24">
        <div className="max-w-md text-center bg-white border border-border p-10">
          <h1 className="font-display text-2xl text-navy">관리자 권한이 필요합니다</h1>
          <p className="text-sm text-muted-foreground mt-3 break-all">
            {user.email}
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            이 계정에는 admin 권한이 없습니다. 데이터베이스의 <code>user_roles</code> 테이블에서
            사용자에게 'admin' 역할을 부여하세요.
          </p>
          <button onClick={signOut} className="mt-6 text-xs text-navy underline">Sign out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mist pt-24 pb-16">
      <div className="container-x">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-[11px] tracking-[0.32em] uppercase text-gold">Backoffice</div>
            <h1 className="font-display text-3xl text-navy mt-2">Insights Admin</h1>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link to="/admin" className="text-navy hover:text-gold">Articles</Link>
            <Link to="/admin/new" className="btn-gold !py-2 !px-4 !text-[12px]">New article</Link>
            <button onClick={signOut} className="text-muted-foreground hover:text-navy">Sign out</button>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
