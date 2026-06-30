# Cat Miner — Design System

> **Cat Miner** (catminer.com.br) is a Brazilian retailer of **ASIC cryptocurrency-mining hardware** — used / refurbished Bitmain Antminer and Whatsminer units, tested and revised, sold with a 30-day warranty and shipped across Brazil. The brand positions itself as *"a maior Fornecedora de máquinas ASICs usadas no Brasil"* (the largest supplier of used ASIC machines in Brazil), aimed at everyone from hobby miners to large operations.

Everything a design agent needs to produce on-brand Cat Miner interfaces and assets: voice, color, type, fonts, imagery, iconography, reusable components, and a UI-kit recreation of the marketing site.

---

## Sources

This system was reverse-engineered from the public brand. The reader is **not** assumed to have access — links are recorded for provenance.

| Source | URL / location | Notes |
|---|---|---|
| Marketing site | `https://catminer.com.br/` | Built on **Framer**. Home, Loja (`/#loja`), Asic (`/asic`), Notícias (`/blog`). |
| Instagram | `https://www.instagram.com/catminerr/` | `@catminerr` |
| Facebook | `https://web.facebook.com/profile.php?id=61577801548690` | |
| WhatsApp (primary CTA) | `https://wa.me/5545998370750` | Every "Comprar" / contact button deep-links to WhatsApp. |
| Contact email | `catminer@support.com.br` | |

**Real assets captured** into `assets/` (logo, hero, product photos, the 3D feature illustrations, the cat mascot, warehouse photo) directly from the live site's CDN (`framerusercontent.com`). See [`assets/`](assets/).

### ⚠️ Substitutions to confirm with the client
- **Fonts.** The site is Framer-built and the exact licensed fonts could not be extracted. The system bundles the nearest Google Fonts matches, self-hosted in `assets/fonts/`: **Space Grotesk** (display), **Manrope** (text/UI), **Space Mono** (data). Swap in the real brand fonts if available — drop files into `assets/fonts/` and repoint `tokens/fonts.css`.
- **UI icons.** The bespoke 3D feature icons are real (captured). For UI chrome (nav, specs, buttons) we standardize on **Lucide** (rounded line icons, via CDN) as the closest match to the brand's friendly-geometric feel. Confirm or replace.
- **Color values** were sampled from brand imagery, not a style guide — exact hexes may differ slightly from the client's master palette.

---

## Brand at a glance

Cat Miner sits at an unusual intersection: **crypto/mining tech** (technical, profit-driven, hashrate-and-watts precision) meets a **friendly, approachable consumer brand** (a smiling 3D cat mascot with bitcoin-orange eyes). The design language must hold both: confident and technical, but warm and trustworthy — never cold or intimidating to a first-time miner.

- **Primary color:** Bitcoin-adjacent **orange `#FC7800`**, often as an orange→gold gradient.
- **Secondary:** deep **midnight navy** (dark heroes, footers, panels).
- **Mascot:** a cheerful white cat with glowing orange eyes, holding an ASIC box — the heart of the brand's warmth.
- **Voice:** Brazilian Portuguese, confident, benefit-led, reassuring about buying *used* hardware.

---

## CONTENT FUNDAMENTALS

**Language.** Brazilian Portuguese (pt-BR) throughout. Any English design copy is placeholder — ship pt-BR. Keep accents correct (ã, õ, ç, é, ó…).

**Voice & tone.** Confident, direct, benefit-led, and reassuring. The brand sells *used* equipment, so the copy works to build **trust** (testado, revisado, garantia) and to make returns feel **lucrative and safe** (rentabilidade, transações seguras). Warm but professional — the playfulness lives in the mascot and visuals, not in jokey copy.

**Person.** Speaks as **"nós" (we)** about the company — *"Somos a maior fornecedora…"*, *"Oferecemos…"*, *"Nossa equipe…"*. Addresses the customer warmly and inclusively (*"seus lucros"*, *"sua mineração"*). Not slangy; not stiff.

**Casing.**
- **Headlines:** sentence case, occasionally with a key noun emphasized — *"Sua fonte de ASICs"*, *"Os melhores equipamentos para sua mineração"*.
- **Eyebrows / kickers:** SHORT ALL-CAPS, often repeated for rhythm — *"GRANDES OPORTUNIDADES"*.
- **The wordmark:** lowercase **"cat"** + uppercase orange **"MINER"**.
- **Buttons:** sentence case or single verb — *"Comprar"*, *"Fale Conosco"*, *"Rentabilidade"*.

**Punctuation & numbers.**
- Currency: **`R$ 7.499,00`** — Brazilian format (period thousands, comma decimals), space after `R$`.
- Earnings framed per period: **`R$ 32,83 /dia`**, **`R$ 984,77 /mês`** — the `/dia` `/mês` suffix is a recurring pattern; render it lighter/smaller than the figure.
- Specs are terse label→value pairs: `Consumo → 3.360 W`, `Tensão → 220v`, hashrate `120 TH`, `95 TH`.
- Trust line repeated near products: **"Garantia de 30 Dias"**.

**Recurring phrases / vocabulary** (use verbatim where natural): *ASIC / ASICs, mineração, mineradores, criptomoedas, rentabilidade (líquida), rendimento diário, hashrate (TH), consumo (W), tensão, estoque, usada, revisada/testada, entrega para todo o Brasil, suporte especializado, atendimento personalizado, transações seguras*.

**Emoji.** **Not used** in marketing copy. Don't introduce them. Personality comes from the **cat mascot** and the **bitcoin ₿** motif, not emoji. (The mascot may appear playful on social, but product/marketing copy stays emoji-free.)

**Microcopy examples (real):**
- Hero: *"Sua fonte de ASICs"* / *"Equipamentos para mineração de criptomoedas com entrega para todo brasil"*
- Section: *"Por que escolher a Cat Miner"*, *"Confira Nossos Modelos"*
- Feature: *"Atendimento Personalizado — Nosso atendimento continua no pós-venda…"*
- About: *"Lembrando que as máquinas são usadas, porém em ótimo estado de conservação."* (honest, trust-building caveat)

---

## VISUAL FOUNDATIONS

**Color.** A two-pole brand: **bitcoin-orange** + **midnight navy**, on **white / warm-neutral** surfaces.
- Orange `#FC7800` is the workhorse — CTAs, the wordmark, accents, the 3D icons. It rarely appears as flat fill on large areas; it's used as a **diagonal orange→gold gradient** (`135deg, #FC7800 → #FFB020`) on tiles, buttons and highlights.
- Navy (`#0B0F22`–`#1B2249`) anchors **dark sections** (hero, footer, feature bands) where orange and white pop. The system ships a `.surface-dark` / `[data-theme="dark"]` scope for these.
- **Green `#16B879`** is reserved for **profit/earnings** figures (rentabilidade) — a deliberate, meaningful accent, used sparingly.
- Neutrals are a cool-warm gray ramp; page background is a soft off-white (`--gray-50`), not pure white.
- See `tokens/colors.css`.

**Type.** Display = **Space Grotesk** (geometric, techy, bold — echoes the heavy all-caps "MINER"). Text/UI = **Manrope** (friendly, legible geometric sans). Data = **Space Mono** (hashrate, watts, R$ prices, technical readouts — leans into the "mining instrument" feel). Big headings get tight tracking; eyebrows are uppercase with wide tracking. Body never below 16px; slide/marketing display scales fluidly. See `tokens/typography.css`.

**Spacing & layout.** 4px grid. Generous, breathable section padding (`--space-16`/`--space-20`). Centered containers up to ~1280px with a fluid `--gutter`. Card-and-grid product layouts (3-up on desktop). See `tokens/spacing.css`.

**Backgrounds.**
- **Light sections:** soft off-white, occasional `--gradient-ember` wash or subtle orange tint behind featured content.
- **Dark sections:** `--gradient-night` (radial navy) — sometimes with an orange radial bloom (`--gradient-night-orange`) in a corner, evoking the dark "tech / circuit" hero imagery. Real hero photography is dark with orange bitcoin coins and faint blue circuitry.
- **No** busy repeating patterns. Texture comes from photography and the glossy 3D illustrations, not from CSS noise.

**Imagery & illustration.**
- **3D feature icons** — the signature illustration motif: glossy **squircle / blob app-icons** filled with the orange→gold→white gradient, a white (or deep-navy) line glyph inside, a soft drop shadow, and a faint **lavender ambient glow** pooled beneath (`--glow-ambient`). Captured in `assets/feature-*.png`.
- **The mascot** — a Pixar-style 3D white cat with bright **orange eyes** and a blue t-shirt, holding a black "ASIC MINER" box (`assets/about-tall.png`). Use as a friendly brand spokes-character.
- **Product photography** — ASIC units (silver/black industrial hardware) shot on white/transparent backgrounds, clean and catalog-like.
- **Lifestyle/hero** — warm-toned warehouse/operation shots and dark techy hero plates with bitcoin coins.
- **Color grade:** warm overall; product shots neutral/clean; hero plates cool-dark with warm orange highlights.

**Corner radii.** Friendly and rounded. Cards `--radius-lg` (20px) to `--radius-xl` (28px); large panels/tiles up to `--radius-2xl` (36px, the squircle feel); buttons/chips/badges are **pill** (`--radius-pill`). Inputs `--radius-md`.

**Cards.** White surface, generous rounding (20–28px), **soft diffuse shadow** (`--shadow-md`/`--shadow-lg`) rather than hard borders; an optional hairline border (`--border`) on flat/dense cards. On dark surfaces, cards become navy (`--navy-700`/`800`) with a faint light border. Product cards lead with a large photo, then a label→value spec list, then price + profit, then a pill CTA.

**Borders.** Hairline `1px` `--border` for subtle separation; the brand prefers **shadow-based elevation over heavy outlines**. Dividers use a faded `--gradient-hairline`.

**Shadows / elevation.** Soft and diffuse (low opacity, large blur). Primary CTAs carry a warm **`--glow-orange`** (an orange-tinted shadow) to feel energetic. The 3D tiles sit on a lavender ambient pool. No hard/black drop shadows on light surfaces.

**Transparency & blur.** Used only on dark hero overlays — glass panels (`--glass-light` + `--glass-border` + `--blur-md`) for floating stat chips or nav on imagery. Not used on light marketing sections.

**Motion.** Smooth, confident **ease-out** (`--ease-out`), ~140–340ms. Hover = subtle **lift** (`--hover-lift`, -2px) + shadow/glow increase + slight color shift. Press = compress to `--press-scale` (0.97). Section entrances = short fade + small translateY. A gentle **spring** (`--ease-spring`) is reserved for playful brand moments (mascot, badges) — never on dense UI chrome. All motion collapses under `prefers-reduced-motion`.

**Hover / press states (standardize):**
- *Primary button:* hover → darker orange (`--primary-hover`) + stronger glow + lift; press → `--primary-press` + scale 0.97.
- *Secondary/ghost:* hover → tinted background (`--primary-soft`) or border darken; press → scale 0.97.
- *Cards (interactive):* hover → lift + `--shadow-lg`; image may scale ~1.03 inside its clip.
- *Links:* hover → shift from `--info` to `--primary`.

---

## ICONOGRAPHY

Cat Miner has **three icon layers**:

1. **3D illustrated icons (signature).** Glossy orange-gradient squircle/blob tiles with a white or navy glyph and soft shadow — used for top-level value props ("Por que escolher"). These are **raster illustrations**, captured in `assets/feature-*.png`. Reuse the real files for hero/feature highlights; do **not** redraw them as flat SVG. To create new ones in the same style, brief an illustrator (glossy 3D, `--gradient-ember` fill, white glyph, lavender ambient glow) — don't fake it with CSS.

2. **UI line icons (substitution — confirm).** No extractable in-house icon set was found, so the system standardizes on **[Lucide](https://lucide.dev)** — rounded-cap line icons whose friendly-geometric stroke matches the brand. Load via CDN: `https://unpkg.com/lucide@latest`. Use for nav, spec rows, buttons, and chrome at ~1.75–2px stroke. Mapping for this domain: `zap`/`plug` = consumo (W), `gauge`/`activity` = hashrate (TH), `shield-check` = garantia / transações seguras, `headset`/`life-buoy` = suporte, `truck` = entrega, `sliders-horizontal` = atendimento personalizado, `package` = estoque, `bitcoin` = crypto/rentabilidade.

3. **The Bitcoin ₿ glyph (brand motif).** The logo uses two **₿** symbols as the cat's eyes. ₿ (U+20BF) recurs as a small accent in orange — on coins, near prices, as bullet/accent. Treat it as a brand mark, not a generic currency sign.

**Emoji / unicode as icons:** avoid emoji. The only "unicode as icon" sanctioned is **₿**. Everything else is Lucide or the 3D illustrations.

---

## INDEX / MANIFEST

> Updated as the system is built out.

**Root**
- [`styles.css`](styles.css) — global entry point (consumers link this). `@import` manifest only.
- [`readme.md`](readme.md) — this guide.
- [`SKILL.md`](SKILL.md) — Agent-Skill wrapper (Claude Code compatible).

**Tokens** — `tokens/`
- `colors.css`, `typography.css`, `fonts.css` (self-hosted @font-face), `spacing.css`, `effects.css`, `motion.css`, `base.css`.

**Assets** — `assets/`
- `logo.png` (white "cat" + orange "MINER", for dark bg), `og-hero.png`, product shots (`product-*.png/.jpg`), 3D feature icons (`feature-atendimento|transacoes|suporte.png`), mascot (`about-tall.png`), `warehouse.jpg`. Fonts in `assets/fonts/`.

**Foundations** — specimen cards (Design System tab): Colors, Type, Spacing, Brand groups.

**Components** — `components/` — reusable React primitives. Namespace: `window.CatMinerDesignSystem_26514a`. Load the bundle via `_ds_bundle.js` and destructure.
- **core/** — `Button` (primary/secondary/ghost/whatsapp), `IconButton`, `Badge` (profit/navy/gold/…), `Card`.
- **forms/** — `Input`, `Select`.
- **commerce/** — `ProductCard` (signature ASIC listing), `SpecList`, `PriceTag`, `Stat`.
- **marketing/** — `Navbar`, `Footer`, `SectionHeading`, `FeatureCard`.
- Each has `.jsx` + `.d.ts` + `.prompt.md`; each group folder has one `@dsCard` demo HTML. Starting points: `Button`, `ProductCard`, `Navbar`.

**UI Kits** — `ui_kits/` — full-screen recreations of the marketing site.
- **website/** — `index.html` (interactive click-through), composing the components above into the real Home / Loja / Asic views.
