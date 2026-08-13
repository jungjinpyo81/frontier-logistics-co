INSERT INTO public.user_roles (user_id, role)
SELECT '02401b86-427d-4903-a8f4-cf2a3f87f81c', 'admin'
WHERE NOT EXISTS (
  SELECT 1 FROM public.user_roles
  WHERE user_id = '02401b86-427d-4903-a8f4-cf2a3f87f81c' AND role = 'admin'
);