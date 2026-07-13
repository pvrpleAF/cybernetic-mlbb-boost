import { defineTool } from "@lovable.dev/mcp-js";

const priceList = [
  { id: "1m", match: "1 MATCH", price_idr: 2000, bonus: null },
  { id: "3m", match: "3 MATCH", price_idr: 5000, bonus: null },
  { id: "5m", match: "5 MATCH", price_idr: 10000, bonus: null },
  { id: "7m", match: "7 MATCH", price_idr: 15000, bonus: "BONUS +1" },
  { id: "10m", match: "10 MATCH", price_idr: 20000, bonus: "BONUS +2" },
  { id: "ft", match: "FAST TRACK IMMORTAL (per match)", price_idr: 7000, bonus: "IMMORTAL — 1-2 worker" },
];

export default defineTool({
  name: "get_pricelist",
  title: "Get price list",
  description: "Return Risqq Store MLBB joki price list (in IDR). All tiers Warrior-Glory same price; Immortal must Fast Track.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(priceList, null, 2) }],
    structuredContent: { packages: priceList, currency: "IDR" },
  }),
});
