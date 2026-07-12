import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-cyberpunk.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const priceList = [
  { match: "1 MATCH", price: "2K", bonus: null },
  { match: "3 MATCH", price: "5K", bonus: null },
  { match: "5 MATCH", price: "10K", bonus: null },
  { match: "7 MATCH", price: "15K", bonus: "BONUS +1" },
  { match: "10 MATCH", price: "20K", bonus: "BONUS +2" },
];

const orderSteps = [
  {
    step: "01",
    title: "TRANSFER",
    desc: "Lakukan pembayaran sesuai paket match yang dipilih.",
  },
  {
    step: "02",
    title: "KIRIM ID AKUN",
    desc: "Send ID akun MLBB kamu setelah transfer.",
  },
  {
    step: "03",
    title: "LANGSUNG DI-ADD",
    desc: "Worker langsung add & proses joki dimulai.",
  },
];

const notes = [
  "Avail mainin akun / mabar — harga sama",
  "Nerima semua tier: Warrior sampai Glory, harga sama",
  "Immortal wajib Fast Track (7K per match), bawa 1–2 worker tergantung tier",
  "VIP mainin akun: transfer → send email saja, login lewat verifikasi",
  "Pure mainin — 100% NO CHEAT",
];

function Index() {
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
            Joki rank Mobile Legends semua tier — Warrior sampai Glory. Pure
            gameplay, no cheat, proses cepat & aman.
          </p>
          <a
            href="#pricelist"
            className="clip-corner mt-10 inline-block bg-primary px-10 py-4 font-display text-sm font-bold tracking-widest text-primary-foreground transition-transform box-glow-cyan hover:scale-105"
          >
            LIHAT PRICE LIST ▸
          </a>
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
          {priceList.map((p) => (
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
              <span className="text-xs tracking-widest text-muted-foreground">
                RUPIAH
              </span>
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
              <span className="font-display text-4xl font-black text-glow-magenta">
                7K
              </span>
              <p className="text-xs tracking-widest text-muted-foreground">
                PER MATCH
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CARA ORDER */}
      <section className="border-y border-border bg-card/40 bg-grid-cyber py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center font-display text-3xl font-bold tracking-widest text-glow-magenta sm:text-4xl">
            ⟨ CARA ORDER ⟩
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {orderSteps.map((s) => (
              <div
                key={s.step}
                className="clip-corner border border-primary/40 bg-card p-6 text-center"
              >
                <span className="font-display text-5xl font-black text-primary/30">
                  {s.step}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold tracking-wider text-primary">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            💎 <span className="font-semibold text-foreground">VIP mainin akun:</span>{" "}
            transfer → kirim email saja → login lewat verifikasi. Aman tanpa share
            password.
          </p>
        </div>
      </section>

      {/* NOTED */}
      <section className="mx-auto max-w-3xl px-4 py-20">
        <h2 className="text-center font-display text-3xl font-bold tracking-widest text-glow-cyan sm:text-4xl">
          ⟨ NOTED! ⟩
        </h2>
        <ul className="mt-10 space-y-4">
          {notes.map((n) => (
            <li
              key={n}
              className="clip-corner flex items-start gap-3 border border-border bg-card px-5 py-4"
            >
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
            href="#pricelist"
            className="clip-corner mt-8 inline-block bg-accent px-10 py-4 font-display text-sm font-bold tracking-widest text-accent-foreground transition-transform box-glow-magenta hover:scale-105"
          >
            ORDER SEKARANG ▸
          </a>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-xs tracking-widest text-muted-foreground">
        © 2026 JOKI MLBB — TRUSTED · FAST · SAFE
      </footer>
    </div>
  );
}
