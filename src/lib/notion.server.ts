const GATEWAY_URL = "https://connector-gateway.lovable.dev/notion";
const DATABASE_ID = "41ed9d9e-8d9f-46a7-95c6-13d6a5f7b084";

export type QuotePayload = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  service?: string;
  origin: string;
  destination: string;
  cargoType: string;
  quantity?: string;
  schedule?: string;
  notes?: string;
};

const text = (v?: string) => ({ rich_text: v ? [{ text: { content: v.slice(0, 1900) } }] : [] });

export async function createQuoteInNotion(p: QuotePayload) {
  const LOVABLE_API_KEY = process.env["LOVABLE_API_KEY"];
  const NOTION_API_KEY = process.env["NOTION_API_KEY"];
  if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
  if (!NOTION_API_KEY) throw new Error("NOTION_API_KEY is not configured");

  const details = [
    ["화물의 종류", p.cargoType],
    ["물량 / 중량", p.quantity],
    ["희망 일정", p.schedule],
    ["기타 요청사항", p.notes],
  ].filter(([, v]) => Boolean(v)) as [string, string][];

  const res = await fetch(`${GATEWAY_URL}/v1/pages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": NOTION_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: DATABASE_ID },
      properties: {
        요청명: {
          title: [
            {
              text: {
                content: `${p.company ? `[${p.company}] ` : ""}${p.name} — ${p.origin} → ${p.destination}`.slice(0, 200),
              },
            },
          ],
        },
        담당자명: text(p.name),
        회사명: text(p.company),
        이메일: { email: p.email },
        연락처: { phone_number: p.phone || null },
        "서비스(해상/항공/특송 등)": text(p.service),
        출발지: text(p.origin),
        도착지: text(p.destination),
        처리상태: { status: { name: "신규" } },
      },
      children: details.map(([label, value]) => ({
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            { text: { content: `${label}: ` }, annotations: { bold: true } },
            { text: { content: value.slice(0, 1900) } },
          ],
        },
      })),
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error(`Notion gateway request failed [${res.status}]: ${errorBody}`);
    throw new Error(`Notion request failed [${res.status}]: ${errorBody}`);
  }
  return { ok: true as const };
}
