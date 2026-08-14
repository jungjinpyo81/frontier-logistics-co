ALTER TABLE public.notices ADD COLUMN IF NOT EXISTS category text NOT NULL DEFAULT '물류인사이트';
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS category text NOT NULL DEFAULT '물류인사이트';