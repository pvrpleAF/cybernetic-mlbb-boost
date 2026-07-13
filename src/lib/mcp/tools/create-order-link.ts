import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const WA_NUMBER = "6287872694771";

const priceMap: Record<string, { label: string; price: number; bonus: string | null; isFastTrack: boolean }> = {
  "1m": { label: "1 MATCH", price: 2000, bonus: null, isFastTrack: false },
  "3m": { label: "3 MATCH", price: 5000, bonus: null, isFastTrack: false },
  "5m": { label: "5 MATCH", price: 10000, bonus: null, isFastTrack: false },
  "7m": { label: "7 MATCH", price: 15000, bonus: "BONUS +1", isFastTrack: false },
  "10m": { label: "10 MATCH", price: 20000, bonus: "BONUS +2", isFastTrack: false },
  "ft": { label: "Fast Track Immortal", price: 7000, bonus: "IMMORTAL", isFastTrack: true },
};

function formatRupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

export default defineTool({
  name: "create_order_link",
  title: "Create WhatsApp order link",
  description:
    "Build a prefilled WhatsApp order link for Risqq Store MLBB joki. Returns a wa.me URL that opens WhatsApp with the order message.",
  inputSchema: {
    package_id: z
      .enum(["1m", "3m", "5m", "7m", "10m", "ft"])
      .describe("Package id: 1m, 3m, 5m, 7m, 10m, or ft (fast track immortal, per match)."),
    category: z.enum(["JOKI", "MABAR VIP"]).describe("Order category."),
    buyer_id: z.string().min(1).describe("MLBB account ID (e.g. '123456789 (1234)'), or email for VIP mainin akun."),
    payment: z.enum(["DANA", "OVO", "GOPAY", "QRIS"]).describe("Payment method."),
    qty: z
      .number()
      .int()
      .min(1)
      .max(100)
      .optional()
      .describe("Number of matches — only used when package_id is 'ft' (fast track). Defaults to 1."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ package_id, category, buyer_id, payment, qty }) => {
    const pkg = priceMap[package_id];
    const q = pkg.isFastTrack ? qty ?? 1 : 1;
    const total = pkg.isFastTrack ? pkg.price * q : pkg.price;
    const paketLabel = pkg.isFastTrack
      ? `Fast Track Immortal x${q} match`
      : pkg.label + (pkg.bonus ? ` (${pkg.bonus})` : "");

    const msg =
      `*NEW JOKI ORDER ONLINE*\n` +
      `----------------------------------\n` +
      `• Paket: ${paketLabel}\n` +
      `• Kategori: ${category}\n` +
      `• ID: ${buyer_id}\n` +
      `• Pembayaran: ${payment}\n` +
      `----------------------------------\n` +
      `• Total Biaya: ${formatRupiah(total)}\n\n` +
      `_Halo Admin, saya sudah mengisi form order di website. Mohon instruksi kirim data login/konfirmasi add pertemuannya._`;

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

    return {
      content: [
        { type: "text", text: `Order link: ${url}\n\nTotal: ${formatRupiah(total)}\n\nMessage preview:\n${msg}` },
      ],
      structuredContent: {
        whatsapp_url: url,
        whatsapp_number: WA_NUMBER,
        total_idr: total,
        message: msg,
      },
    };
  },
});
