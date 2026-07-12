import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import heroImg from "@/assets/hero-cyberpunk.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const WA_NUMBER = "6287872694771";

type Pkg = {
  id: string;
  match: string;
  price: string;
  priceValue: number;
  bonus: string | null;
};

const priceList: Pkg[] = [
  { id: "1m", match: "1 MATCH", price: "2K", priceValue: 2000, bonus: null },
  { id: "3m", match: "3 MATCH", price: "5K", priceValue: 5000, bonus: null },
  { id: "5m", match: "5 MATCH", price: "10K", priceValue: 10000, bonus: null },
  { id: "7m", match: "7 MATCH", price: "15K", priceValue: 15000, bonus: "BONUS +1" },
  { id: "10m", match: "10 MATCH", price: "20K", priceValue: 20000, bonus: "BONUS +2" },
  { id: "ft", match: "FAST TRACK IMMORTAL / MATCH", price: "7K", priceValue: 7000, bonus: "IMMORTAL" },
];

const categories = [
  { id: "joki", label: "JOKI" },
  { id: "mabar", label: "MABAR" },
  { id: "vip", label: "VIP (mainin akun)" },
] as const;

const orderSteps = [
  { step: "01", title: "PILIH & ORDER", desc: "Pilih paket + kategori, isi ID, klik ORDER via WhatsApp." },
  { step: "02", title: "TRANSFER", desc: "Lakukan pembayaran sesuai paket yang dipilih." },
  { step: "03", title: "PROSES", desc: "Worker langsung add / login via verif, joki dimulai." },
];

const notes = [
  "Avail mainin akun / mabar — harga sama",
  "Nerima semua tier: Warrior sampai Glory, harga sama",
  "Immortal wajib Fast Track (7K per match), bawa 1–2 worker tergantung tier",
  "VIP mainin akun: transfer → send email saja, login lewat verifikasi",
  "Pure mainin — 100% NO CHEAT",
];

function formatRupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

function Index() {
  const [pkgId, setPkgId] = useState<string>("3m");
  const [category, setCategory] = useState<string>("joki");
  const [buyerId, setBuyerId] = useState<string>("");
  const [qty, setQty] = useState<number>(1);

  const selectedPkg = useMemo(
    () => priceList.find((p) => p.id === pkgId) ?? priceList[0],
    [pkgId],
  );

  const isFastTrack = selectedPkg.id === "ft";
  const total = isFastTrack ? selectedPkg.priceValue * qty : selectedPkg.priceValue;

  const waHref = useMemo(() => {
    const catLabel = categories.find((c) => c.id === category)?.label ?? category;
    const paketLabel = isFastTrack
      ? `Fast Track Immortal x${qty} match`
      : selectedPkg.match + (selectedPkg.bonus ? ` (${selectedPkg.bonus})` : "");
    const msg =
      `*NEW JOKI ORDER ONLINE*\n` +
      `----------------------------------\n` +
      `• Paket: ${paketLabel}\n` +
      `• Kategori: ${catLabel}\n` +
      `• ID: ${buyerId || "(belum diisi)"}\n` +
      `----------------------------------\n` +
      `• Total Biaya: ${formatRupiah(total)}\n\n` +
      `_Halo Admin, saya sudah mengisi form order di website. Mohon instruksi kirim data login/konfirmasi add pertemuannya._`;
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [selectedPkg, category, buyerId, qty, isFastTrack, total]);

  const canOrder = buyerId.trim().length > 0;

  return (
    <div className="min-h-screen bg-background font-body">
      {/* HERO */}
      <header className="relative overflow-hidden">
        <img
          src={heroImg}
          alt="Kota cyberpunk dengan lampu neon cyan dan magenta"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="absolute inset-0 bg-grid-cyber" />

        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 pb-20 pt-24 text-center sm:pt-32">
          <p className="mb-4 border border-primary/50 px-4 py-1 text-xs font-semibold tracking-[0.35em] text-primary animate-neon-pulse">
            ⟨ JASA JOKI MLBB ⟩
          </p>
          <h1 className="font-display text-4xl font-black leading-tight sm:text-6xl">
            <span className="text-glow-cyan animate-flicker">NAIK RANK</span>
            <br />
            <span className="text-glow-magenta">TANPA RIBET</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-medium text-muted-foreground">
            Joki rank Mobile Legends semua tier — Warrior sampai Glory. Pure gameplay, no cheat, proses cepat & aman.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="#order" className="clip-corner inline-block bg-primary px-8 py-4 font-display text-sm font-bold tracking-widest text-primary-foreground transition-transform box-glow-cyan hover:scale-105">
              ORDER SEKARANG ▸
            </a>
            <a href="#pricelist" className="clip-corner inline-block border border-primary/60 px-8 py-4 font-display text-sm font-bold tracking-widest text-primary hover:bg-primary/10">
              PRICE LIST
            </a>
          </div>
        </div>
      </header>

      {/* PRICE LIST */}
      <section id="pricelist" className="relative mx-auto max-w-5xl px-4 py-20">
        <h2 className="text-center font-display text-3xl font-bold tracking-widest text-glow-cyan sm:text-4xl">
          ⟨ PRICE LIST ⟩
        </h2>
        <p className="mt-3 text-center text-muted-foreground">
          Semua tier harga sama · Warrior — Glory
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {priceList.slice(0, 5).map((p) => (
            <div
              key={p.match}
              className="clip-corner border-gradient-neon relative flex flex-col items-center gap-2 p-6 transition-transform hover:-translate-y-1 hover:box-glow-magenta"
            >
              {p.bonus && (
                <span className="absolute right-2 top-2 bg-accent px-2 py-0.5 font-display text-[10px] font-bold tracking-wider text-accent-foreground">
                  {p.bonus}
                </span>
              )}
              <span className="font-display text-sm font-bold tracking-widest text-muted-foreground">
                {p.match}
              </span>
              <span className="font-display text-4xl font-black text-glow-cyan">
                {p.price}
              </span>
              <span className="text-xs tracking-widest text-muted-foreground">RUPIAH</span>
            </div>
          ))}
        </div>

        {/* FAST TRACK */}
        <div className="clip-corner mt-10 border border-accent/60 bg-card p-6 box-glow-magenta sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-xl font-bold tracking-wider text-glow-magenta">
                ⚡ FAST TRACK — IMMORTAL
              </h3>
              <p className="mt-2 text-muted-foreground">
                Tier Immortal wajib Fast Track, dibawa 1–2 worker tergantung tier.
              </p>
            </div>
            <div className="text-center">
              <span className="font-display text-4xl font-black text-glow-magenta">7K</span>
              <p className="text-xs tracking-widest text-muted-foreground">PER MATCH</p>
            </div>
          </div>
        </div>
      </section>

      {/* ORDER FORM */}
      <section id="order" className="border-y border-border bg-card/40 bg-grid-cyber py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-center font-display text-3xl font-bold tracking-widest text-glow-magenta sm:text-4xl">
            ⟨ FORM ORDER ⟩
          </h2>
          <p className="mt-3 text-center text-muted-foreground">
            Pilih paket, isi data — order langsung terkirim ke WhatsApp admin.
          </p>

          <div className="clip-corner mt-10 border border-primary/40 bg-card p-6 sm:p-8">
            {/* Paket */}
            <label className="font-display text-xs font-bold tracking-widest text-primary">
              1. PILIH PAKET
            </label>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {priceList.map((p) => {
                const active = pkgId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPkgId(p.id)}
                    className={`clip-corner flex items-center justify-between border px-4 py-3 text-left transition-all ${
                      active
                        ? "border-primary bg-primary/10 box-glow-cyan"
                        : "border-border hover:border-primary/60"
                    }`}
                  >
                    <div>
                      <div className="font-display text-sm font-bold tracking-wider">
                        {p.match}
                      </div>
                      {p.bonus && (
                        <div className="text-[10px] tracking-widest text-accent">
                          {p.bonus}
                        </div>
                      )}
                    </div>
                    <div className="font-display text-lg font-black text-glow-cyan">
                      {p.price}
                    </div>
                  </button>
                );
              })}
            </div>

            {isFastTrack && (
              <div className="mt-4">
                <label className="font-display text-xs font-bold tracking-widest text-primary">
                  JUMLAH MATCH (Fast Track)
                </label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                  className="clip-corner mt-2 w-full border border-border bg-background px-4 py-3 font-display text-lg focus:border-primary focus:outline-none"
                />
              </div>
            )}

            {/* Kategori */}
            <label className="mt-6 block font-display text-xs font-bold tracking-widest text-primary">
              2. KATEGORI
            </label>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {categories.map((c) => {
                const active = category === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={`clip-corner border px-4 py-3 font-display text-sm font-bold tracking-wider transition-all ${
                      active
                        ? "border-accent bg-accent/15 text-accent box-glow-magenta"
                        : "border-border hover:border-accent/60"
                    }`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>

            {/* ID */}
            <label className="mt-6 block font-display text-xs font-bold tracking-widest text-primary">
              3. ID AKUN MLBB
            </label>
            <input
              type="text"
              value={buyerId}
              onChange={(e) => setBuyerId(e.target.value)}
              placeholder="Contoh: 123456789 (1234)"
              maxLength={64}
              className="clip-corner mt-2 w-full border border-border bg-background px-4 py-3 font-body text-base focus:border-primary focus:outline-none"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Untuk VIP mainin akun: isi email login (bukan password).
            </p>

            {/* Ringkasan */}
            <div className="clip-corner mt-6 border border-primary/40 bg-background/60 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Paket</span>
                <span className="font-semibold">
                  {isFastTrack ? `Fast Track x${qty}` : selectedPkg.match}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Kategori</span>
                <span className="font-semibold uppercase">
                  {categories.find((c) => c.id === category)?.label}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <span className="font-display text-sm tracking-widest text-muted-foreground">
                  TOTAL
                </span>
                <span className="font-display text-2xl font-black text-glow-cyan">
                  {formatRupiah(total)}
                </span>
              </div>
            </div>

            <a
              href={canOrder ? waHref : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!canOrder}
              onClick={(e) => {
                if (!canOrder) e.preventDefault();
              }}
              className={`clip-corner mt-6 flex w-full items-center justify-center gap-2 px-6 py-4 font-display text-sm font-bold tracking-widest transition-transform ${
                canOrder
                  ? "bg-accent text-accent-foreground box-glow-magenta hover:scale-[1.02]"
                  : "cursor-not-allowed border border-border bg-muted text-muted-foreground"
              }`}
            >
              ▸ ORDER VIA WHATSAPP
            </a>
            {!canOrder && (
              <p className="mt-2 text-center text-xs text-destructive">
                Isi ID akun dulu sebelum order.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* CARA ORDER */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <h2 className="text-center font-display text-3xl font-bold tracking-widest text-glow-cyan sm:text-4xl">
          ⟨ CARA ORDER ⟩
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {orderSteps.map((s) => (
            <div key={s.step} className="clip-corner border border-primary/40 bg-card p-6 text-center">
              <span className="font-display text-5xl font-black text-primary/30">{s.step}</span>
              <h3 className="mt-3 font-display text-lg font-bold tracking-wider text-primary">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NOTED */}
      <section className="mx-auto max-w-3xl px-4 pb-20">
        <h2 className="text-center font-display text-3xl font-bold tracking-widest text-glow-cyan sm:text-4xl">
          ⟨ NOTED! ⟩
        </h2>
        <ul className="mt-10 space-y-4">
          {notes.map((n) => (
            <li key={n} className="clip-corner flex items-start gap-3 border border-border bg-card px-5 py-4">
              <span className="mt-0.5 text-primary">▸</span>
              <span className="font-medium">{n}</span>
            </li>
          ))}
        </ul>

        <div className="mt-14 text-center">
          <p className="font-display text-xl font-bold tracking-widest text-glow-magenta animate-neon-pulse">
            100% PURE GAMEPLAY — NO CHEAT
          </p>
          <a
            href="#order"
            className="clip-corner mt-8 inline-block bg-accent px-10 py-4 font-display text-sm font-bold tracking-widest text-accent-foreground transition-transform box-glow-magenta hover:scale-105"
          >
            ORDER SEKARANG ▸
          </a>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-xs tracking-widest text-muted-foreground">
        © 2026 JOKI MLBB — TRUSTED · FAST · SAFE · WA +62 878-7269-4771
      </footer>
    </div>
  );
}
