export const CATEGORIES = ["포워딩", "특송", "무역·통관", "물류인사이트"] as const;

export type Category = (typeof CATEGORIES)[number];

export const DEFAULT_CATEGORY: Category = "물류인사이트";

const STYLES: Record<Category, string> = {
  포워딩: "bg-blue-50 text-blue-700 border-blue-200",
  특송: "bg-amber-50 text-amber-700 border-amber-200",
  "무역·통관": "bg-emerald-50 text-emerald-700 border-emerald-200",
  물류인사이트: "bg-indigo-50 text-indigo-700 border-indigo-200",
};

export function categoryClass(category?: string | null) {
  return STYLES[(category as Category) ?? DEFAULT_CATEGORY] ?? STYLES[DEFAULT_CATEGORY];
}

export function CategoryBadgeClass(category?: string | null) {
  return `inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium leading-5 whitespace-nowrap ${categoryClass(
    category
  )}`;
}
