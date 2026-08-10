-- 1. Private articles should only be visible to admins
DROP POLICY IF EXISTS "Authenticated can read private articles" ON public.articles;

-- Admins already have "Admins can read all articles", which covers private articles.

-- 2. Lock down SECURITY DEFINER functions from direct API execution
REVOKE ALL ON FUNCTION public.set_updated_at() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.set_updated_at() FROM anon;
REVOKE ALL ON FUNCTION public.set_updated_at() FROM authenticated;

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
-- authenticated must keep EXECUTE: has_role() is evaluated inside RLS policies
-- as the querying role, so revoking it would break admin access entirely.
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;