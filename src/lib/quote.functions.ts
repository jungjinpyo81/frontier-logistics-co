import { createServerFn } from "@tanstack/react-start";
import { QuoteSchema } from "./quote.schema";
import { createQuoteInNotion } from "./notion.server";

export const submitQuote = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => QuoteSchema.parse(data))
  .handler(async ({ data }) => createQuoteInNotion(data));
