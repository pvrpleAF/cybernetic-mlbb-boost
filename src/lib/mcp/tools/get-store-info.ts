import { defineTool } from "@lovable.dev/mcp-js";

const info = {
  store_name: "Risqq Store",
  service: "Jasa Joki & Mabar VIP Mobile Legends (MLBB)",
  whatsapp: "+6287872694771",
  website: "https://risqqstore.com",
  categories: ["JOKI", "MABAR VIP"],
  payment_methods: ["DANA", "OVO", "GOPAY", "QRIS"],
  tiers_supported: "Warrior sampai Glory (harga sama). Immortal wajib Fast Track.",
  notes: [
    "Mainin akun / mabar — harga sama",
    "Nerima semua tier: Warrior sampai Glory, harga sama",
    "Immortal wajib Fast Track (7K per match), bawa 1-2 worker tergantung tier",
    "VIP mainin akun: transfer -> send email saja, login lewat verifikasi",
    "Pure mainin — 100% NO CHEAT",
    "NO REFUND — order yang sudah diproses tidak bisa dikembalikan",
  ],
  order_flow: [
    "Pilih paket + kategori, isi ID, klik ORDER via WhatsApp",
    "Transfer sesuai paket",
    "Worker langsung add / login via verif, joki dimulai",
  ],
};

export default defineTool({
  name: "get_store_info",
  title: "Get store info",
  description: "Return Risqq Store public info: WhatsApp, categories, payment methods, notes, and order flow.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
    structuredContent: info,
  }),
});
