import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createQuoteInNotion } from "./notion.server";

const QuoteSchema = z.object({
  name: z.string().trim().min(1).max(100),
  company: z.string().trim().max(100).optional(),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional(),
  service: z.string().trim().max(80).optional(),
  origin: z.string().trim().min(1).max(200),
  destination: z.string().trim().min(1).max(200),
  cargoType: z.string().trim().min(1).max(200),
  quantity: z.string().trim().max(200).optional(),
  schedule: z.string().trim().max(200).optional(),
  notes: z.string().trim().max(2000).optional(),
});

export const submitQuote = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => QuoteSchema.parse(data))
  .handler(async ({ data }) => createQuoteInNotion(data));
