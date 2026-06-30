/* @ds-bundle: {"format":3,"namespace":"CatMinerDesignSystem_26514a","components":[{"name":"PriceTag","sourcePath":"components/commerce/PriceTag.jsx"},{"name":"ProductCard","sourcePath":"components/commerce/ProductCard.jsx"},{"name":"SpecList","sourcePath":"components/commerce/SpecList.jsx"},{"name":"Stat","sourcePath":"components/commerce/Stat.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"FeatureCard","sourcePath":"components/marketing/FeatureCard.jsx"},{"name":"Footer","sourcePath":"components/marketing/Footer.jsx"},{"name":"Navbar","sourcePath":"components/marketing/Navbar.jsx"},{"name":"SectionHeading","sourcePath":"components/marketing/SectionHeading.jsx"}],"sourceHashes":{"components/commerce/PriceTag.jsx":"de37a719ea5b","components/commerce/ProductCard.jsx":"86cd52c4c3e0","components/commerce/SpecList.jsx":"d4581b6947bf","components/commerce/Stat.jsx":"38d1ef9b935f","components/core/Badge.jsx":"f3a8801ef447","components/core/Button.jsx":"dcb76a520af3","components/core/Card.jsx":"84254820a2d5","components/core/IconButton.jsx":"bfef8c5d144f","components/forms/Input.jsx":"6e6b1b343e7d","components/forms/Select.jsx":"54ec182f041f","components/marketing/FeatureCard.jsx":"a63a85f71563","components/marketing/Footer.jsx":"9224d0bd1f7e","components/marketing/Navbar.jsx":"4c37d240e8da","components/marketing/SectionHeading.jsx":"6d1d3662a445","ui_kits/website/App.jsx":"c53196a00d09","ui_kits/website/Asic.jsx":"1583f3491321","ui_kits/website/Home.jsx":"84a4fef43c0b","ui_kits/website/News.jsx":"62601da0e59b","ui_kits/website/Store.jsx":"859c62b668c3","ui_kits/website/data.js":"8c094834f494"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.CatMinerDesignSystem_26514a = window.CatMinerDesignSystem_26514a || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/commerce/PriceTag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const injectCSS = (id, css) => {
  if (typeof document === "undefined" || document.getElementById(id)) return;
  const el = document.createElement("style");
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
};
const CSS = `
.cm-price{display:flex;flex-direction:column;gap:1px;font-family:var(--font-mono)}
.cm-price__main{display:flex;align-items:baseline;gap:6px;color:var(--text-strong)}
.cm-price--profit .cm-price__main{color:var(--profit)}
.cm-price__cur{font-family:var(--font-sans);font-weight:var(--fw-bold);font-size:.62em;color:var(--text-muted)}
.cm-price--profit .cm-price__cur{color:var(--profit)}
.cm-price__val{font-family:var(--font-display);font-weight:var(--fw-bold);letter-spacing:-.02em;line-height:1;font-variant-numeric:tabular-nums}
.cm-price__period{font-family:var(--font-sans);font-weight:var(--fw-medium);font-size:.5em;color:var(--text-muted);align-self:flex-end;margin-bottom:.12em}
.cm-price__note{font-family:var(--font-sans);font-size:12px;color:var(--text-subtle);margin-top:2px}
.cm-price__strike{font-family:var(--font-sans);font-size:13px;color:var(--text-subtle);text-decoration:line-through}
.cm-price--sm{font-size:20px}
.cm-price--md{font-size:28px}
.cm-price--lg{font-size:38px}
`;
const fmt = v => typeof v === "number" ? v.toLocaleString("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}) : v;

/**
 * Brazilian-format price. `R$ 7.499,00`. Add `period` ("/dia","/mês")
 * for earnings, and tone="profit" to render the figure in green.
 */
function PriceTag({
  value,
  currency = "R$",
  period,
  note,
  was,
  size = "md",
  tone,
  className = "",
  ...rest
}) {
  injectCSS("cm-price-css", CSS);
  const cls = ["cm-price", `cm-price--${size}`, tone === "profit" ? "cm-price--profit" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "cm-price__main"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cm-price__cur"
  }, currency), /*#__PURE__*/React.createElement("span", {
    className: "cm-price__val"
  }, fmt(value)), period ? /*#__PURE__*/React.createElement("span", {
    className: "cm-price__period"
  }, period) : null), was ? /*#__PURE__*/React.createElement("span", {
    className: "cm-price__strike"
  }, currency, " ", fmt(was)) : null, note ? /*#__PURE__*/React.createElement("span", {
    className: "cm-price__note"
  }, note) : null);
}
Object.assign(__ds_scope, { PriceTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/PriceTag.jsx", error: String((e && e.message) || e) }); }

// components/commerce/SpecList.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const injectCSS = (id, css) => {
  if (typeof document === "undefined" || document.getElementById(id)) return;
  const el = document.createElement("style");
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
};
const CSS = `
.cm-specs{display:flex;flex-direction:column;font-family:var(--font-sans);width:100%}
.cm-specs__row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:9px 0;border-bottom:1px solid var(--border-subtle)}
.cm-specs__row:last-child{border-bottom:0}
.cm-specs--dense .cm-specs__row{padding:6px 0}
.cm-specs__k{display:flex;align-items:center;gap:8px;color:var(--text-muted);font-size:13px;font-weight:var(--fw-medium)}
.cm-specs__k svg{width:16px;height:16px;display:block;color:var(--text-subtle);flex:0 0 auto}
.cm-specs__v{font-family:var(--font-mono);font-weight:var(--fw-bold);font-size:14px;color:var(--text-strong);font-variant-numeric:tabular-nums;letter-spacing:-.01em;text-align:right;white-space:nowrap}
.cm-specs__v--profit{color:var(--profit)}
.cm-specs__v--muted{color:var(--text-muted);font-weight:var(--fw-regular)}
`;

/**
 * Label→value spec list — the brand's product/readout pattern.
 * Values render in Space Mono (tabular). Mark earnings with tone:"profit".
 */
function SpecList({
  items = [],
  dense = false,
  className = "",
  ...rest
}) {
  injectCSS("cm-specs-css", CSS);
  const cls = ["cm-specs", dense ? "cm-specs--dense" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("dl", _extends({
    className: cls
  }, rest), items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    className: "cm-specs__row",
    key: it.label + i
  }, /*#__PURE__*/React.createElement("dt", {
    className: "cm-specs__k"
  }, it.icon, it.label), /*#__PURE__*/React.createElement("dd", {
    className: "cm-specs__v" + (it.tone === "profit" ? " cm-specs__v--profit" : "") + (it.tone === "muted" ? " cm-specs__v--muted" : "")
  }, it.value))));
}
Object.assign(__ds_scope, { SpecList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/SpecList.jsx", error: String((e && e.message) || e) }); }

// components/commerce/Stat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const injectCSS = (id, css) => {
  if (typeof document === "undefined" || document.getElementById(id)) return;
  const el = document.createElement("style");
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
};
const CSS = `
.cm-stat{display:flex;flex-direction:column;gap:3px;font-family:var(--font-sans)}
.cm-stat--chip{padding:14px 16px;border-radius:var(--radius-lg);background:var(--surface);border:1px solid var(--border-subtle);box-shadow:var(--shadow-sm)}
.cm-stat--glass{padding:14px 16px;border-radius:var(--radius-lg);background:var(--glass-light);border:1px solid var(--glass-border);backdrop-filter:var(--blur-md);-webkit-backdrop-filter:var(--blur-md)}
.cm-stat__top{display:flex;align-items:center;gap:7px}
.cm-stat__ico{display:inline-flex;width:18px;height:18px;color:var(--primary)}
.cm-stat__ico svg{width:100%;height:100%;display:block}
.cm-stat__label{font-size:12px;font-weight:var(--fw-semibold);letter-spacing:.04em;text-transform:uppercase;color:var(--text-muted)}
.cm-stat__value{font-family:var(--font-display);font-weight:var(--fw-bold);font-size:26px;line-height:1.05;letter-spacing:-.02em;color:var(--text-strong);font-variant-numeric:tabular-nums}
.cm-stat__value small{font-family:var(--font-sans);font-size:.5em;font-weight:var(--fw-semibold);color:var(--text-muted)}
.cm-stat--profit .cm-stat__value{color:var(--profit)}
.cm-stat--brand .cm-stat__value{color:var(--primary)}
.cm-stat__sub{font-size:12px;color:var(--text-subtle)}
`;

/**
 * Compact metric — hashrate, daily profit, units sold. Use variant
 * "glass" over dark hero imagery; "chip" as a boxed card; "plain" inline.
 */
function Stat({
  label,
  value,
  unit,
  sub,
  icon,
  tone = "default",
  variant = "plain",
  className = "",
  ...rest
}) {
  injectCSS("cm-stat-css", CSS);
  const cls = ["cm-stat", variant !== "plain" ? `cm-stat--${variant}` : "", tone !== "default" ? `cm-stat--${tone}` : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "cm-stat__top"
  }, icon ? /*#__PURE__*/React.createElement("span", {
    className: "cm-stat__ico"
  }, icon) : null, label ? /*#__PURE__*/React.createElement("span", {
    className: "cm-stat__label"
  }, label) : null), /*#__PURE__*/React.createElement("div", {
    className: "cm-stat__value"
  }, value, unit ? /*#__PURE__*/React.createElement("small", null, " ", unit) : null), sub ? /*#__PURE__*/React.createElement("span", {
    className: "cm-stat__sub"
  }, sub) : null);
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/Stat.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const injectCSS = (id, css) => {
  if (typeof document === "undefined" || document.getElementById(id)) return;
  const el = document.createElement("style");
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
};
const CSS = `
.cm-badge{display:inline-flex;align-items:center;gap:.4em;font-family:var(--font-sans);font-weight:var(--fw-bold);font-size:12px;line-height:1;padding:5px 10px;border-radius:var(--radius-pill);letter-spacing:.01em;white-space:nowrap;--bdg:var(--gray-600);--bdg-soft:var(--gray-100);--bdg-strong:var(--gray-700)}
.cm-badge--orange{--bdg:var(--orange-500);--bdg-soft:var(--orange-50);--bdg-strong:var(--orange-700)}
.cm-badge--profit{--bdg:var(--profit);--bdg-soft:var(--profit-soft);--bdg-strong:var(--green-600)}
.cm-badge--navy{--bdg:var(--navy-800);--bdg-soft:color-mix(in srgb,var(--navy-800) 12%,transparent);--bdg-strong:var(--navy-700)}
.cm-badge--gold{--bdg:var(--gold-500);--bdg-soft:color-mix(in srgb,var(--gold-400) 22%,transparent);--bdg-strong:#9A6200}
.cm-badge--danger{--bdg:var(--danger);--bdg-soft:var(--danger-soft);--bdg-strong:var(--red-500)}
.cm-badge--info{--bdg:var(--info);--bdg-soft:var(--info-soft);--bdg-strong:var(--blue-500)}
.cm-badge--soft{background:var(--bdg-soft);color:var(--bdg-strong)}
.cm-badge--solid{background:var(--bdg);color:#fff}
.cm-badge--outline{background:transparent;color:var(--bdg-strong);box-shadow:inset 0 0 0 1.5px var(--bdg)}
.cm-badge__dot{width:6px;height:6px;border-radius:50%;background:currentColor}
.cm-badge svg{width:1.05em;height:1.05em;display:block}
`;

/**
 * Status pill. Tones map to brand meaning: profit (green) for
 * rentabilidade, orange for highlights, navy for neutral status,
 * gold for warranty. Use `dot` for live/stock indicators.
 */
function Badge({
  tone = "neutral",
  variant = "soft",
  dot = false,
  icon,
  className = "",
  children,
  ...rest
}) {
  injectCSS("cm-badge-css", CSS);
  const toneCls = tone === "neutral" ? "" : `cm-badge--${tone}`;
  const cls = ["cm-badge", toneCls, `cm-badge--${variant}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    className: "cm-badge__dot"
  }) : null, icon, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const injectCSS = (id, css) => {
  if (typeof document === "undefined" || document.getElementById(id)) return;
  const el = document.createElement("style");
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
};
const CSS = `
.cm-btn{display:inline-flex;align-items:center;justify-content:center;gap:.55em;font-family:var(--font-sans);font-weight:var(--fw-bold);border-radius:var(--radius-pill);border:1.5px solid transparent;cursor:pointer;text-decoration:none;white-space:nowrap;line-height:1;user-select:none;-webkit-tap-highlight-color:transparent;transition:transform var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out),background-color var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out)}
.cm-btn:focus-visible{outline:none;box-shadow:var(--focus-shadow)}
.cm-btn[disabled],.cm-btn[aria-disabled=true]{opacity:.5;pointer-events:none;box-shadow:none}
.cm-btn--sm{height:var(--control-sm);padding:0 16px;font-size:13px}
.cm-btn--md{height:var(--control-md);padding:0 22px;font-size:15px}
.cm-btn--lg{height:var(--control-lg);padding:0 30px;font-size:16px}
.cm-btn--block{width:100%}
.cm-btn--primary{background:var(--gradient-brand);color:#fff;box-shadow:var(--glow-orange-sm)}
.cm-btn--primary:hover{box-shadow:var(--glow-orange);transform:translateY(var(--hover-lift))}
.cm-btn--primary:active{transform:scale(var(--press-scale))}
.cm-btn--secondary{background:var(--secondary);color:var(--text-inverse);box-shadow:var(--shadow-sm)}
.cm-btn--secondary:hover{background:var(--secondary-hover);transform:translateY(var(--hover-lift))}
.cm-btn--secondary:active{transform:scale(var(--press-scale))}
.cm-btn--ghost{background:transparent;color:var(--primary);border-color:var(--border-strong)}
.cm-btn--ghost:hover{background:var(--primary-soft);border-color:var(--primary)}
.cm-btn--ghost:active{transform:scale(var(--press-scale))}
.cm-btn--whatsapp{background:#25D366;color:#fff}
.cm-btn--whatsapp:hover{background:#1FBA59;transform:translateY(var(--hover-lift));box-shadow:0 8px 22px -6px rgba(37,211,102,.6)}
.cm-btn--whatsapp:active{transform:scale(var(--press-scale))}
.cm-btn__ico{display:inline-flex;align-items:center;justify-content:center;width:1.2em;height:1.2em;flex:0 0 auto}
.cm-btn__ico svg{width:100%;height:100%;display:block}
`;

/**
 * Cat Miner primary button. Pill-shaped, Manrope-bold. The primary
 * variant carries the signature orange→gold gradient + warm glow.
 * Use the `whatsapp` variant for the brand's ubiquitous "Comprar" CTA.
 */
function Button({
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  block = false,
  href,
  as,
  className = "",
  children,
  ...rest
}) {
  injectCSS("cm-button-css", CSS);
  const Tag = as || (href ? "a" : "button");
  const cls = ["cm-btn", `cm-btn--${variant}`, `cm-btn--${size}`, block ? "cm-btn--block" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls,
    href: href
  }, rest), iconLeft ? /*#__PURE__*/React.createElement("span", {
    className: "cm-btn__ico"
  }, iconLeft) : null, children, iconRight ? /*#__PURE__*/React.createElement("span", {
    className: "cm-btn__ico"
  }, iconRight) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ProductCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const injectCSS = (id, css) => {
  if (typeof document === "undefined" || document.getElementById(id)) return;
  const el = document.createElement("style");
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
};
const CSS = `
.cm-product{display:flex;flex-direction:column;background:var(--surface);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);overflow:hidden;box-shadow:var(--shadow-md);transition:transform var(--dur-base) var(--ease-out),box-shadow var(--dur-base) var(--ease-out);font-family:var(--font-sans);width:100%}
.cm-product:hover{transform:translateY(-3px);box-shadow:var(--shadow-lg)}
.cm-product--featured{border-color:var(--orange-300);box-shadow:var(--glow-orange-sm)}
.cm-product__media{position:relative;aspect-ratio:4/3;background:radial-gradient(120% 120% at 50% 30%,#fff 0%,var(--gray-100) 100%);display:flex;align-items:center;justify-content:center;padding:18px}
.cm-product__media img{max-width:100%;max-height:100%;width:auto;object-fit:contain}
.cm-product__tags{position:absolute;top:12px;left:12px;display:flex;gap:6px;flex-wrap:wrap}
.cm-product__fav{position:absolute;top:10px;right:10px}
.cm-product__body{display:flex;flex-direction:column;gap:13px;padding:18px}
.cm-product__title{font-family:var(--font-display);font-weight:var(--fw-bold);font-size:18px;line-height:1.2;color:var(--text-strong);margin:0;letter-spacing:-.01em}
.cm-product__profit{display:flex;flex-direction:column;gap:6px;padding:11px 13px;background:var(--profit-soft);border-radius:var(--radius-md)}
.cm-product__prow{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:13px}
.cm-product__prow .k{display:flex;align-items:center;gap:6px;color:var(--green-600);font-weight:var(--fw-medium)}
.cm-product__prow .k svg{width:15px;height:15px;display:block}
.cm-product__prow .v{font-family:var(--font-mono);font-weight:var(--fw-bold);color:var(--profit);font-variant-numeric:tabular-nums}
.cm-product__foot{display:flex;align-items:flex-end;justify-content:space-between;gap:10px;margin-top:1px}
.cm-product__warr{display:flex;align-items:center;gap:5px;font-size:12px;font-weight:var(--fw-semibold);color:var(--text-muted)}
.cm-product__warr svg{width:15px;height:15px;display:block;color:var(--gold-500)}
`;
const IcoTrend = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("polyline", {
  points: "22 7 13.5 15.5 8.5 10.5 2 17"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "16 7 22 7 22 13"
}));
const IcoShield = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
}), /*#__PURE__*/React.createElement("path", {
  d: "m9 12 2 2 4-4"
}));
const IcoCart = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "8",
  cy: "21",
  r: "1"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "19",
  cy: "21",
  r: "1"
}), /*#__PURE__*/React.createElement("path", {
  d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
}));

/**
 * Signature ASIC product card: photo, status badges, key specs, the
 * green earnings block, price + warranty, and the WhatsApp "Comprar" CTA.
 * Composes Button, Badge, SpecList and PriceTag.
 */
function ProductCard({
  title,
  image,
  imageAlt,
  condition = "Usada",
  inStock = true,
  specs = [],
  price,
  priceNote = "à vista no Pix",
  profitDaily,
  profitMonthly,
  warranty = "Garantia de 30 dias",
  ctaLabel = "Comprar",
  ctaHref,
  onBuy,
  featured = false,
  className = "",
  ...rest
}) {
  injectCSS("cm-product-css", CSS);
  const cls = ["cm-product", featured ? "cm-product--featured" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("article", _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "cm-product__media"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cm-product__tags"
  }, inStock ? /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "profit",
    variant: "solid",
    dot: true
  }, "Em estoque") : /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "danger",
    variant: "solid"
  }, "Esgotado"), condition ? /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "navy",
    variant: "solid"
  }, condition) : null), image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: imageAlt || title
  }) : null), /*#__PURE__*/React.createElement("div", {
    className: "cm-product__body"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "cm-product__title"
  }, title), specs.length ? /*#__PURE__*/React.createElement(__ds_scope.SpecList, {
    items: specs,
    dense: true
  }) : null, (profitDaily || profitMonthly) && /*#__PURE__*/React.createElement("div", {
    className: "cm-product__profit"
  }, profitDaily ? /*#__PURE__*/React.createElement("div", {
    className: "cm-product__prow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, /*#__PURE__*/React.createElement(IcoTrend, null), "Rendimento di\xE1rio"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, profitDaily)) : null, profitMonthly ? /*#__PURE__*/React.createElement("div", {
    className: "cm-product__prow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "Rentabilidade l\xEDq."), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, profitMonthly)) : null), /*#__PURE__*/React.createElement("div", {
    className: "cm-product__foot"
  }, /*#__PURE__*/React.createElement(__ds_scope.PriceTag, {
    value: price,
    note: priceNote
  }), warranty ? /*#__PURE__*/React.createElement("span", {
    className: "cm-product__warr"
  }, /*#__PURE__*/React.createElement(IcoShield, null), warranty) : null), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "whatsapp",
    block: true,
    href: ctaHref,
    onClick: onBuy,
    iconLeft: /*#__PURE__*/React.createElement(IcoCart, null)
  }, ctaLabel)));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const injectCSS = (id, css) => {
  if (typeof document === "undefined" || document.getElementById(id)) return;
  const el = document.createElement("style");
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
};
const CSS = `
.cm-card{background:var(--surface);border-radius:var(--radius-lg);border:1px solid var(--border-subtle);color:var(--text);transition:transform var(--dur-base) var(--ease-out),box-shadow var(--dur-base) var(--ease-out),border-color var(--dur-base) var(--ease-out)}
.cm-card--flat{box-shadow:none}
.cm-card--sm{box-shadow:var(--shadow-sm)}
.cm-card--md{box-shadow:var(--shadow-md)}
.cm-card--lg{box-shadow:var(--shadow-lg)}
.cm-card--interactive{cursor:pointer}
.cm-card--interactive:hover{transform:translateY(var(--hover-lift));box-shadow:var(--shadow-lg);border-color:var(--border)}
`;
const PAD = {
  none: "0",
  sm: "var(--space-4)",
  md: "var(--space-6)",
  lg: "var(--space-8)"
};
const RAD = {
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  xl: "var(--radius-xl)",
  "2xl": "var(--radius-2xl)"
};

/**
 * Generic surface container. Soft diffuse elevation (not hard borders);
 * on a `.surface-dark` ancestor it becomes a navy card automatically.
 */
function Card({
  elevation = "md",
  interactive = false,
  padding = "md",
  radius = "lg",
  as: Tag = "div",
  className = "",
  style,
  children,
  ...rest
}) {
  injectCSS("cm-card-css", CSS);
  const cls = ["cm-card", `cm-card--${elevation}`, interactive ? "cm-card--interactive" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls,
    style: {
      padding: PAD[padding] ?? padding,
      borderRadius: RAD[radius] ?? radius,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const injectCSS = (id, css) => {
  if (typeof document === "undefined" || document.getElementById(id)) return;
  const el = document.createElement("style");
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
};
const CSS = `
.cm-iconbtn{display:inline-flex;align-items:center;justify-content:center;border:1.5px solid transparent;cursor:pointer;color:var(--text);background:transparent;border-radius:var(--radius-pill);-webkit-tap-highlight-color:transparent;transition:transform var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out),background-color var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out)}
.cm-iconbtn:focus-visible{outline:none;box-shadow:var(--focus-shadow)}
.cm-iconbtn[disabled]{opacity:.45;pointer-events:none}
.cm-iconbtn--square{border-radius:var(--radius-md)}
.cm-iconbtn--sm{width:var(--control-sm);height:var(--control-sm);font-size:16px}
.cm-iconbtn--md{width:var(--control-md);height:var(--control-md);font-size:19px}
.cm-iconbtn--lg{width:var(--control-lg);height:var(--control-lg);font-size:22px}
.cm-iconbtn--solid{background:var(--gradient-brand);color:#fff;box-shadow:var(--glow-orange-sm)}
.cm-iconbtn--solid:hover{transform:translateY(var(--hover-lift));box-shadow:var(--glow-orange)}
.cm-iconbtn--soft{background:var(--primary-soft);color:var(--primary)}
.cm-iconbtn--soft:hover{background:color-mix(in srgb,var(--orange-500) 18%,transparent)}
.cm-iconbtn--ghost{background:transparent;color:var(--text-muted)}
.cm-iconbtn--ghost:hover{background:var(--bg-subtle);color:var(--text-strong)}
.cm-iconbtn--navy{background:var(--secondary);color:var(--text-inverse)}
.cm-iconbtn--navy:hover{background:var(--secondary-hover)}
.cm-iconbtn:active{transform:scale(var(--press-scale))}
.cm-iconbtn svg{width:1.2em;height:1.2em;display:block}
`;

/**
 * Square/circular icon-only button. Always pass an `label` for a11y.
 */
function IconButton({
  variant = "ghost",
  size = "md",
  shape = "circle",
  label,
  className = "",
  children,
  ...rest
}) {
  injectCSS("cm-iconbtn-css", CSS);
  const cls = ["cm-iconbtn", `cm-iconbtn--${variant}`, `cm-iconbtn--${size}`, shape === "square" ? "cm-iconbtn--square" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls,
    "aria-label": label
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const injectCSS = (id, css) => {
  if (typeof document === "undefined" || document.getElementById(id)) return;
  const el = document.createElement("style");
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
};
const CSS = `
.cm-field{display:flex;flex-direction:column;gap:6px;font-family:var(--font-sans)}
.cm-field__label{font-size:13px;font-weight:var(--fw-semibold);color:var(--text-strong)}
.cm-field__req{color:var(--primary);margin-left:2px}
.cm-input{display:flex;align-items:center;gap:9px;height:var(--control-md);padding:0 14px;background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius-md);transition:border-color var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out)}
.cm-input:hover{border-color:var(--border-strong)}
.cm-input:focus-within{border-color:var(--primary);box-shadow:var(--focus-shadow)}
.cm-input--sm{height:var(--control-sm)}
.cm-input--lg{height:var(--control-lg)}
.cm-input--error{border-color:var(--danger)}
.cm-input--error:focus-within{box-shadow:0 0 0 4px var(--danger-soft)}
.cm-input--disabled{background:var(--bg-subtle);opacity:.7;pointer-events:none}
.cm-input__ico{color:var(--text-muted);display:inline-flex;flex:0 0 auto}
.cm-input__ico svg{width:18px;height:18px;display:block}
.cm-input input{flex:1;min-width:0;border:0;background:transparent;font-family:var(--font-sans);font-size:15px;font-weight:var(--fw-medium);color:var(--text);outline:none}
.cm-input input::placeholder{color:var(--text-subtle);font-weight:var(--fw-regular)}
.cm-field__hint{font-size:12px;color:var(--text-muted)}
.cm-field__hint--error{color:var(--danger)}
`;

/**
 * Labeled text field with optional leading icon and hint/error.
 */
function Input({
  label,
  hint,
  error,
  required,
  iconLeft,
  size = "md",
  id,
  className = "",
  disabled,
  ...rest
}) {
  injectCSS("cm-input-css", CSS);
  const fid = id || (label ? `cm-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const boxCls = ["cm-input", size !== "md" ? `cm-input--${size}` : "", error ? "cm-input--error" : "", disabled ? "cm-input--disabled" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", {
    className: "cm-field"
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "cm-field__label",
    htmlFor: fid
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    className: "cm-field__req"
  }, "*") : null) : null, /*#__PURE__*/React.createElement("div", {
    className: boxCls
  }, iconLeft ? /*#__PURE__*/React.createElement("span", {
    className: "cm-input__ico"
  }, iconLeft) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    disabled: disabled,
    "aria-invalid": !!error
  }, rest))), error ? /*#__PURE__*/React.createElement("span", {
    className: "cm-field__hint cm-field__hint--error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "cm-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const injectCSS = (id, css) => {
  if (typeof document === "undefined" || document.getElementById(id)) return;
  const el = document.createElement("style");
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
};
const CSS = `
.cm-selfield{display:flex;flex-direction:column;gap:6px;font-family:var(--font-sans)}
.cm-selfield__label{font-size:13px;font-weight:var(--fw-semibold);color:var(--text-strong)}
.cm-select{position:relative;display:flex;align-items:center;height:var(--control-md);background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius-md);transition:border-color var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out)}
.cm-select:hover{border-color:var(--border-strong)}
.cm-select:focus-within{border-color:var(--primary);box-shadow:var(--focus-shadow)}
.cm-select--sm{height:var(--control-sm)}
.cm-select--lg{height:var(--control-lg)}
.cm-select select{appearance:none;-webkit-appearance:none;border:0;background:transparent;flex:1;height:100%;padding:0 38px 0 14px;font-family:var(--font-sans);font-size:15px;font-weight:var(--fw-medium);color:var(--text);outline:none;cursor:pointer;border-radius:inherit}
.cm-select__chev{position:absolute;right:13px;color:var(--text-muted);pointer-events:none;display:inline-flex}
.cm-select__chev svg{width:18px;height:18px;display:block}
`;
const Chevron = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "m6 9 6 6 6-6"
}));

/**
 * Styled wrapper over a native <select> (keeps native a11y + mobile UX),
 * with a brand chevron. Pass `options` or <option> children.
 */
function Select({
  label,
  options,
  size = "md",
  id,
  className = "",
  children,
  ...rest
}) {
  injectCSS("cm-select-css", CSS);
  const fid = id || (label ? `cm-sel-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const cls = ["cm-select", size !== "md" ? `cm-select--${size}` : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", {
    className: "cm-selfield"
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "cm-selfield__label",
    htmlFor: fid
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    className: cls
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fid
  }, rest), options ? options.map(o => typeof o === "string" ? /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label)) : children), /*#__PURE__*/React.createElement("span", {
    className: "cm-select__chev"
  }, /*#__PURE__*/React.createElement(Chevron, null))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/marketing/FeatureCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const injectCSS = (id, css) => {
  if (typeof document === "undefined" || document.getElementById(id)) return;
  const el = document.createElement("style");
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
};
const CSS = `
.cm-feature{display:flex;flex-direction:column;gap:12px;font-family:var(--font-sans)}
.cm-feature--center{align-items:center;text-align:center}
.cm-feature__media{width:88px;height:88px;display:flex;align-items:center;justify-content:center;flex:0 0 auto}
.cm-feature__media img{width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 16px 26px rgba(124,107,255,.28))}
.cm-feature__glyph{width:64px;height:64px;border-radius:var(--radius-xl);background:var(--gradient-ember);display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:var(--glow-orange-sm)}
.cm-feature__glyph svg{width:30px;height:30px;display:block}
.cm-feature__title{font-family:var(--font-display);font-weight:var(--fw-bold);font-size:19px;color:var(--text-strong);margin:0;letter-spacing:-.01em;line-height:1.2}
.cm-feature__text{font-size:14px;line-height:1.55;color:var(--text-muted);margin:0;max-width:42ch}
`;

/**
 * Value-prop tile ("Por que escolher"). Pass `image` (one of the brand's
 * 3D squircle illustrations) for the signature look, or `icon` for a
 * gradient glyph tile. Use align="center" in 3-up grids.
 */
function FeatureCard({
  image,
  imageAlt = "",
  icon,
  title,
  align = "left",
  className = "",
  children,
  ...rest
}) {
  injectCSS("cm-feature-css", CSS);
  const cls = ["cm-feature", align === "center" ? "cm-feature--center" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), image ? /*#__PURE__*/React.createElement("div", {
    className: "cm-feature__media"
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: imageAlt
  })) : icon ? /*#__PURE__*/React.createElement("div", {
    className: "cm-feature__glyph"
  }, icon) : null, title ? /*#__PURE__*/React.createElement("h3", {
    className: "cm-feature__title"
  }, title) : null, children ? /*#__PURE__*/React.createElement("p", {
    className: "cm-feature__text"
  }, children) : null);
}
Object.assign(__ds_scope, { FeatureCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/FeatureCard.jsx", error: String((e && e.message) || e) }); }

// components/marketing/Footer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const injectCSS = (id, css) => {
  if (typeof document === "undefined" || document.getElementById(id)) return;
  const el = document.createElement("style");
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
};
const CSS = `
.cm-footer{background:var(--navy-950);color:#B9C0DA;font-family:var(--font-sans);padding:48px var(--gutter) 26px}
.cm-footer__top{display:flex;flex-wrap:wrap;gap:34px;justify-content:space-between;align-items:flex-start;max-width:var(--container-xl);margin:0 auto}
.cm-footer__brand{max-width:340px;display:flex;flex-direction:column;gap:13px}
.cm-footer__brand img{height:40px;width:auto;display:block}
.cm-footer__wordmark{font-family:var(--font-display);font-weight:var(--fw-bold);font-size:24px;line-height:1}
.cm-footer__wordmark .cat{color:#fff}.cm-footer__wordmark .miner{color:var(--orange-500)}
.cm-footer__tag{font-size:14px;line-height:1.55;color:#8E96B8;margin:0}
.cm-footer__social{display:flex;gap:9px;margin-top:2px}
.cm-footer__nav{display:flex;flex-direction:column;gap:9px}
.cm-footer__nav h5{margin:0 0 4px;font-size:12px;font-weight:var(--fw-bold);letter-spacing:.1em;text-transform:uppercase;color:#6E76A0}
.cm-footer__link{color:#B9C0DA;text-decoration:none;font-size:14px;font-weight:var(--fw-medium);transition:color var(--dur-fast) var(--ease-out)}
.cm-footer__link:hover{color:var(--orange-500)}
.cm-footer__bottom{max-width:var(--container-xl);margin:26px auto 0;padding-top:20px;border-top:1px solid rgba(255,255,255,.08);display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;font-size:13px;color:#7A82A6}
.cm-footer__bottom a{color:#7A82A6;text-decoration:none}
.cm-footer__bottom a:hover{color:var(--orange-500)}
`;
const IcoFb = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
}));
const IcoIg = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("rect", {
  width: "20",
  height: "20",
  x: "2",
  y: "2",
  rx: "5",
  ry: "5"
}), /*#__PURE__*/React.createElement("path", {
  d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
}), /*#__PURE__*/React.createElement("line", {
  x1: "17.5",
  x2: "17.51",
  y1: "6.5",
  y2: "6.5"
}));
const IcoWa = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M7.9 20A9 9 0 1 0 4 16.1L2 22z"
}));

/**
 * Dark site footer — brand, link columns, social icons, contact email
 * and copyright. Composes IconButton for the social buttons.
 */
function Footer({
  logo,
  tagline = "A maior fornecedora de máquinas ASICs usadas do Brasil. Equipamentos testados, revisados e prontos para minerar.",
  columns = [],
  email,
  facebookHref,
  instagramHref,
  whatsappHref,
  copyright = "© 2025 Cat Miner",
  className = "",
  ...rest
}) {
  injectCSS("cm-footer-css", CSS);
  return /*#__PURE__*/React.createElement("footer", _extends({
    className: ["cm-footer", className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "cm-footer__top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cm-footer__brand"
  }, logo ? /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: "Cat Miner"
  }) : /*#__PURE__*/React.createElement("span", {
    className: "cm-footer__wordmark"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cat"
  }, "cat"), " ", /*#__PURE__*/React.createElement("span", {
    className: "miner"
  }, "MINER")), /*#__PURE__*/React.createElement("p", {
    className: "cm-footer__tag"
  }, tagline), /*#__PURE__*/React.createElement("div", {
    className: "cm-footer__social"
  }, facebookHref ? /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    variant: "navy",
    size: "sm",
    label: "Facebook",
    href: facebookHref,
    as: "a"
  }, /*#__PURE__*/React.createElement(IcoFb, null)) : null, instagramHref ? /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    variant: "navy",
    size: "sm",
    label: "Instagram",
    href: instagramHref,
    as: "a"
  }, /*#__PURE__*/React.createElement(IcoIg, null)) : null, whatsappHref ? /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    variant: "solid",
    size: "sm",
    label: "WhatsApp",
    href: whatsappHref,
    as: "a"
  }, /*#__PURE__*/React.createElement(IcoWa, null)) : null)), columns.map((col, i) => /*#__PURE__*/React.createElement("nav", {
    className: "cm-footer__nav",
    key: col.title + i
  }, col.title ? /*#__PURE__*/React.createElement("h5", null, col.title) : null, col.links.map(l => /*#__PURE__*/React.createElement("a", {
    className: "cm-footer__link",
    key: l.href + l.label,
    href: l.href
  }, l.label))))), /*#__PURE__*/React.createElement("div", {
    className: "cm-footer__bottom"
  }, /*#__PURE__*/React.createElement("span", null, copyright), email ? /*#__PURE__*/React.createElement("a", {
    href: "mailto:" + email
  }, email) : null));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/Footer.jsx", error: String((e && e.message) || e) }); }

// components/marketing/Navbar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const injectCSS = (id, css) => {
  if (typeof document === "undefined" || document.getElementById(id)) return;
  const el = document.createElement("style");
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
};
const CSS = `
.cm-nav{position:relative;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:13px var(--gutter);font-family:var(--font-sans);color:#fff}
.cm-nav--solid{background:var(--navy-900)}
.cm-nav--glass{background:color-mix(in srgb,var(--navy-900) 60%,transparent);backdrop-filter:var(--blur-md);-webkit-backdrop-filter:var(--blur-md);border-bottom:1px solid var(--glass-border)}
.cm-nav--sticky{position:sticky;top:0;z-index:var(--z-sticky)}
.cm-nav__brand{display:inline-flex;align-items:center;text-decoration:none}
.cm-nav__brand img{height:34px;width:auto;display:block}
.cm-nav__wordmark{font-family:var(--font-display);font-weight:var(--fw-bold);font-size:22px;letter-spacing:-.01em;line-height:1}
.cm-nav__wordmark .cat{color:#fff}
.cm-nav__wordmark .miner{color:var(--orange-500)}
.cm-nav__links{display:flex;align-items:center;gap:2px}
.cm-nav__link{padding:8px 15px;border-radius:var(--radius-pill);font-size:14px;font-weight:var(--fw-semibold);color:#C2C8E0;text-decoration:none;transition:color var(--dur-fast) var(--ease-out),background-color var(--dur-fast) var(--ease-out)}
.cm-nav__link:hover{color:#fff;background:rgba(255,255,255,.08)}
.cm-nav__link--active{color:#fff;background:rgba(255,255,255,.12)}
.cm-nav__actions{display:flex;align-items:center;gap:10px}
.cm-nav__menu{display:none}
@media(max-width:780px){.cm-nav__links{display:none}.cm-nav__cta{display:none}.cm-nav__menu{display:inline-flex}}
`;
const IcoMenu = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 6h18M3 12h18M3 18h18"
}));
const IcoChat = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M7.9 20A9 9 0 1 0 4 16.1L2 22z"
}));

/**
 * Marketing top nav. Sits over the dark hero (the wordmark/logo is light).
 * Composes Button (WhatsApp CTA) and IconButton (mobile menu).
 */
function Navbar({
  logo,
  brandHref = "/",
  links = [],
  ctaLabel = "Comprar",
  ctaHref,
  theme = "glass",
  sticky = true,
  onMenu,
  className = "",
  ...rest
}) {
  injectCSS("cm-nav-css", CSS);
  const cls = ["cm-nav", `cm-nav--${theme}`, sticky ? "cm-nav--sticky" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("nav", _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement("a", {
    className: "cm-nav__brand",
    href: brandHref,
    "aria-label": "Cat Miner"
  }, logo ? /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: "Cat Miner"
  }) : /*#__PURE__*/React.createElement("span", {
    className: "cm-nav__wordmark"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cat"
  }, "cat"), " ", /*#__PURE__*/React.createElement("span", {
    className: "miner"
  }, "MINER"))), /*#__PURE__*/React.createElement("div", {
    className: "cm-nav__links"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.href + l.label,
    href: l.href,
    onClick: l.onClick,
    className: "cm-nav__link" + (l.active ? " cm-nav__link--active" : "")
  }, l.label))), /*#__PURE__*/React.createElement("div", {
    className: "cm-nav__actions"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cm-nav__cta"
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "whatsapp",
    size: "sm",
    href: ctaHref,
    iconLeft: /*#__PURE__*/React.createElement(IcoChat, null)
  }, ctaLabel)), /*#__PURE__*/React.createElement("span", {
    className: "cm-nav__menu"
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    variant: "ghost",
    label: "Menu",
    onClick: onMenu,
    style: {
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement(IcoMenu, null)))));
}
Object.assign(__ds_scope, { Navbar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/Navbar.jsx", error: String((e && e.message) || e) }); }

// components/marketing/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const injectCSS = (id, css) => {
  if (typeof document === "undefined" || document.getElementById(id)) return;
  const el = document.createElement("style");
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
};
const CSS = `
.cm-heading{display:flex;flex-direction:column;gap:10px;font-family:var(--font-sans)}
.cm-heading--center{align-items:center;text-align:center}
.cm-heading__eyebrow{font-weight:var(--fw-bold);font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--primary)}
.cm-heading__title{font-family:var(--font-display);font-weight:var(--fw-bold);line-height:1.08;letter-spacing:-.02em;color:var(--text-strong);margin:0}
.cm-heading--sm .cm-heading__title{font-size:var(--fs-fluid-h3)}
.cm-heading--md .cm-heading__title{font-size:var(--fs-fluid-h2)}
.cm-heading--lg .cm-heading__title{font-size:var(--fs-fluid-h1)}
.cm-heading__sub{font-size:16px;line-height:1.6;color:var(--text-muted);margin:0;max-width:60ch}
.cm-heading--center .cm-heading__sub{margin-inline:auto}
`;

/**
 * Section header: orange uppercase eyebrow + display title + optional
 * subtitle. Centered variant for section intros.
 */
function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  size = "md",
  as: Tag = "h2",
  className = "",
  ...rest
}) {
  injectCSS("cm-heading-css", CSS);
  const cls = ["cm-heading", `cm-heading--${size}`, align === "center" ? "cm-heading--center" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), eyebrow ? /*#__PURE__*/React.createElement("span", {
    className: "cm-heading__eyebrow"
  }, eyebrow) : null, title ? /*#__PURE__*/React.createElement(Tag, {
    className: "cm-heading__title"
  }, title) : null, subtitle ? /*#__PURE__*/React.createElement("p", {
    className: "cm-heading__sub"
  }, subtitle) : null);
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/App.jsx
try { (() => {
/* App shell — nav, view switching, product detail + WhatsApp modals. */
const CMApp = function () {
  const {
    Navbar,
    Footer,
    Button,
    Badge,
    SpecList,
    PriceTag
  } = window.CatMinerDesignSystem_26514a;
  const {
    links,
    WA,
    A
  } = window.CMData;
  const I = n => React.createElement("i", {
    "data-lucide": n
  });
  const brl = v => "R$ " + v.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  function ProductDetail({
    p,
    onClose,
    onBuy
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "overlay",
      onClick: onClose
    }, /*#__PURE__*/React.createElement("div", {
      className: "dialog dialog--wide",
      onClick: e => e.stopPropagation(),
      role: "dialog",
      "aria-modal": "true"
    }, /*#__PURE__*/React.createElement("button", {
      className: "dialog__x",
      onClick: onClose,
      "aria-label": "Fechar"
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "x"
    })), /*#__PURE__*/React.createElement("div", {
      className: "detail"
    }, /*#__PURE__*/React.createElement("div", {
      className: "detail__media"
    }, /*#__PURE__*/React.createElement("div", {
      className: "detail__tags"
    }, p.inStock ? /*#__PURE__*/React.createElement(Badge, {
      tone: "profit",
      variant: "solid",
      dot: true
    }, "Em estoque") : /*#__PURE__*/React.createElement(Badge, {
      tone: "danger",
      variant: "solid"
    }, "Esgotado"), /*#__PURE__*/React.createElement(Badge, {
      tone: "navy",
      variant: "solid"
    }, p.estado)), /*#__PURE__*/React.createElement("img", {
      src: p.image,
      alt: p.title
    })), /*#__PURE__*/React.createElement("div", {
      className: "detail__info"
    }, /*#__PURE__*/React.createElement("h2", null, p.title), /*#__PURE__*/React.createElement(SpecList, {
      items: [{
        label: "Hashrate",
        value: p.hashrate + " TH",
        icon: I("gauge")
      }, {
        label: "Consumo",
        value: p.consumo,
        icon: I("zap")
      }, {
        label: "Tensão",
        value: p.tensao,
        icon: I("plug")
      }, {
        label: "Estado",
        value: p.estado,
        tone: "muted"
      }]
    }), /*#__PURE__*/React.createElement("div", {
      className: "detail__profit"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "k"
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "trending-up"
    }), " Rendimento di\xE1rio"), /*#__PURE__*/React.createElement("span", {
      className: "v"
    }, p.daily)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "k"
    }, "Rentabilidade l\xEDquida"), /*#__PURE__*/React.createElement("span", {
      className: "v"
    }, p.monthly))), /*#__PURE__*/React.createElement("div", {
      className: "detail__price"
    }, /*#__PURE__*/React.createElement(PriceTag, {
      value: p.price,
      note: "\xE0 vista no Pix",
      size: "lg"
    }), /*#__PURE__*/React.createElement("span", {
      className: "detail__warr"
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "shield-check"
    }), " Garantia de 30 dias")), /*#__PURE__*/React.createElement(Button, {
      variant: "whatsapp",
      size: "lg",
      block: true,
      iconLeft: I("message-circle"),
      onClick: () => onBuy(p)
    }, "Comprar pelo WhatsApp")))));
  }
  function WhatsModal({
    p,
    onClose
  }) {
    const msg = `Olá, vim do site e quero mais informações sobre a ${p.title}.`;
    return /*#__PURE__*/React.createElement("div", {
      className: "overlay",
      onClick: onClose
    }, /*#__PURE__*/React.createElement("div", {
      className: "dialog dialog--sm",
      onClick: e => e.stopPropagation(),
      role: "dialog",
      "aria-modal": "true"
    }, /*#__PURE__*/React.createElement("button", {
      className: "dialog__x",
      onClick: onClose,
      "aria-label": "Fechar"
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "x"
    })), /*#__PURE__*/React.createElement("div", {
      className: "wa"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wa__icon"
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "message-circle"
    })), /*#__PURE__*/React.createElement("h3", null, "Falar com um especialista"), /*#__PURE__*/React.createElement("p", null, "Voc\xEA ser\xE1 direcionado ao WhatsApp da Cat Miner com esta mensagem:"), /*#__PURE__*/React.createElement("div", {
      className: "wa__msg"
    }, "\u201C", msg, "\u201D"), /*#__PURE__*/React.createElement(Button, {
      variant: "whatsapp",
      size: "lg",
      block: true,
      href: WA,
      iconLeft: I("send")
    }, "Abrir WhatsApp"), /*#__PURE__*/React.createElement("button", {
      className: "wa__cancel",
      onClick: onClose
    }, "Agora n\xE3o"))));
  }
  function App() {
    const [view, setView] = React.useState("home");
    const [detail, setDetail] = React.useState(null);
    const [whats, setWhats] = React.useState(null);
    const [menu, setMenu] = React.useState(false);
    React.useEffect(() => {
      window.lucide && window.lucide.createIcons();
    });
    React.useEffect(() => {
      const k = e => {
        if (e.key === "Escape") {
          setDetail(null);
          setWhats(null);
          setMenu(false);
        }
      };
      window.addEventListener("keydown", k);
      return () => window.removeEventListener("keydown", k);
    }, []);
    const go = v => {
      setView(v);
      setMenu(false);
      window.scrollTo({
        top: 0
      });
    };
    const navLinks = links.map(l => ({
      label: l.label,
      href: "#" + l.view,
      active: view === l.view,
      onClick: e => {
        e.preventDefault();
        go(l.view);
      }
    }));
    const openBuy = p => {
      setDetail(null);
      setWhats(p);
    };
    const Home = window.CMHome,
      Store = window.CMStore,
      Asic = window.CMAsic,
      News = window.CMNews;
    return /*#__PURE__*/React.createElement("div", {
      className: "app"
    }, /*#__PURE__*/React.createElement(Navbar, {
      logo: A + "logo.png",
      brandHref: "#",
      links: navLinks,
      ctaHref: WA,
      theme: "glass",
      sticky: false,
      onMenu: () => setMenu(m => !m)
    }), menu ? /*#__PURE__*/React.createElement("div", {
      className: "mobile-menu"
    }, navLinks.map(l => /*#__PURE__*/React.createElement("a", {
      key: l.href,
      href: l.href,
      onClick: l.onClick,
      className: l.active ? "is-on" : ""
    }, l.label))) : null, /*#__PURE__*/React.createElement("main", {
      className: "app__main"
    }, view === "home" && /*#__PURE__*/React.createElement(Home, {
      onView: go,
      onBuy: openBuy,
      onOpen: setDetail
    }), view === "loja" && /*#__PURE__*/React.createElement(Store, {
      onBuy: openBuy,
      onOpen: setDetail
    }), view === "asic" && /*#__PURE__*/React.createElement(Asic, null), view === "news" && /*#__PURE__*/React.createElement(News, null), /*#__PURE__*/React.createElement(Footer, {
      logo: A + "logo.png",
      columns: [{
        title: "Navegação",
        links: links.map(l => ({
          label: l.label,
          href: "#" + l.view
        }))
      }],
      email: "catminer@support.com.br",
      facebookHref: "https://web.facebook.com/profile.php?id=61577801548690",
      instagramHref: "https://www.instagram.com/catminerr/",
      whatsappHref: WA
    })), detail ? /*#__PURE__*/React.createElement(ProductDetail, {
      p: detail,
      onClose: () => setDetail(null),
      onBuy: openBuy
    }) : null, whats ? /*#__PURE__*/React.createElement(WhatsModal, {
      p: whats,
      onClose: () => setWhats(null)
    }) : null);
  }
  return App;
}();
window.CMApp = CMApp;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Asic.jsx
try { (() => {
/* Asic — rentabilidade comparison of the catalog. */
const CMAsic = function () {
  const {
    SectionHeading,
    Stat,
    Badge,
    Button
  } = window.CatMinerDesignSystem_26514a;
  const {
    products,
    WA
  } = window.CMData;
  const I = n => React.createElement("i", {
    "data-lucide": n
  });
  const num = s => parseFloat(String(s).replace(/[^\d,]/g, "").replace(",", "."));
  const brl = v => "R$ " + v.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  function Asic() {
    const rows = products.map(p => {
      const daily = num(p.daily);
      const payback = Math.round(p.price / daily / 30); // months
      return {
        ...p,
        dailyNum: daily,
        payback
      };
    });
    const best = rows.reduce((a, b) => b.payback < a.payback ? b : a, rows[0]);
    const avgMonthly = Math.round(rows.reduce((s, r) => s + num(r.monthly), 0) / rows.length);
    return /*#__PURE__*/React.createElement("div", {
      className: "page"
    }, /*#__PURE__*/React.createElement("div", {
      className: "page__head"
    }, /*#__PURE__*/React.createElement(SectionHeading, {
      eyebrow: "Rentabilidade ASIC",
      title: "Compare o retorno de cada minerador",
      subtitle: "Estimativas de rendimento por equipamento. Valores ilustrativos \u2014 a rentabilidade real varia com a cota\xE7\xE3o, a dificuldade da rede e o custo de energia."
    })), /*#__PURE__*/React.createElement("div", {
      className: "asic-stats"
    }, /*#__PURE__*/React.createElement(Stat, {
      variant: "chip",
      tone: "brand",
      label: "Modelos dispon\xEDveis",
      value: products.length,
      icon: I("cpu")
    }), /*#__PURE__*/React.createElement(Stat, {
      variant: "chip",
      tone: "profit",
      label: "Rentab. m\xE9dia",
      value: brl(avgMonthly),
      sub: "/m\xEAs (estimada)",
      icon: I("trending-up")
    }), /*#__PURE__*/React.createElement(Stat, {
      variant: "chip",
      label: "Melhor payback",
      value: "~" + best.payback + " meses",
      sub: best.title.split("(")[0],
      icon: I("timer")
    })), /*#__PURE__*/React.createElement("div", {
      className: "rtable-wrap"
    }, /*#__PURE__*/React.createElement("table", {
      className: "rtable"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Modelo"), /*#__PURE__*/React.createElement("th", null, "Hashrate"), /*#__PURE__*/React.createElement("th", null, "Consumo"), /*#__PURE__*/React.createElement("th", null, "Pre\xE7o"), /*#__PURE__*/React.createElement("th", null, "Rend./dia"), /*#__PURE__*/React.createElement("th", null, "Rentab./m\xEAs"), /*#__PURE__*/React.createElement("th", null, "Payback"), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, rows.map(r => /*#__PURE__*/React.createElement("tr", {
      key: r.id,
      className: r.id === best.id ? "is-best" : ""
    }, /*#__PURE__*/React.createElement("td", {
      className: "rtable__model"
    }, /*#__PURE__*/React.createElement("span", {
      className: "rtable__name"
    }, r.title), r.id === best.id ? /*#__PURE__*/React.createElement(Badge, {
      tone: "profit",
      variant: "soft"
    }, "Melhor rentabilidade") : null), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, r.hashrate, " TH"), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, r.consumo), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, brl(r.price)), /*#__PURE__*/React.createElement("td", {
      className: "mono profit"
    }, r.daily), /*#__PURE__*/React.createElement("td", {
      className: "mono profit"
    }, r.monthly), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, "~", r.payback, " meses"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Button, {
      variant: "whatsapp",
      size: "sm",
      href: WA,
      iconLeft: I("message-circle")
    }, "Comprar"))))))), /*#__PURE__*/React.createElement("div", {
      className: "asic-cta"
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "calculator"
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Quer um c\xE1lculo sob medida?"), /*#__PURE__*/React.createElement("span", null, "Informe seu custo de energia e objetivo \u2014 montamos a melhor configura\xE7\xE3o para voc\xEA.")), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      href: WA,
      iconLeft: I("message-circle")
    }, "Simular no WhatsApp")));
  }
  return Asic;
}();
window.CMAsic = CMAsic;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Asic.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Home.jsx
try { (() => {
/* Home (Início) — hero, models, banner, features, about, CTA band. */
const CMHome = function () {
  const {
    SectionHeading,
    ProductCard,
    FeatureCard,
    Button,
    Stat
  } = window.CatMinerDesignSystem_26514a;
  const {
    products,
    features,
    WA,
    A
  } = window.CMData;
  const I = n => React.createElement("i", {
    "data-lucide": n
  });
  const specsOf = p => [{
    label: "Hashrate",
    value: p.hashrate + " TH",
    icon: I("gauge")
  }, {
    label: "Consumo",
    value: p.consumo,
    icon: I("zap")
  }, {
    label: "Tensão",
    value: p.tensao,
    icon: I("plug")
  }];
  function Home({
    onView,
    onBuy,
    onOpen
  }) {
    const featured = products.filter(p => p.real);
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("header", {
      className: "hero"
    }, /*#__PURE__*/React.createElement("div", {
      className: "hero__inner"
    }, /*#__PURE__*/React.createElement("div", {
      className: "hero__copy"
    }, /*#__PURE__*/React.createElement("span", {
      className: "eyebrow",
      style: {
        color: "var(--gold-400)"
      }
    }, "Grandes Oportunidades"), /*#__PURE__*/React.createElement("h1", {
      className: "hero__title"
    }, "Sua fonte de ", /*#__PURE__*/React.createElement("b", null, "ASICs")), /*#__PURE__*/React.createElement("p", {
      className: "hero__sub"
    }, "Equipamentos para minera\xE7\xE3o de criptomoedas \u2014 testados, revisados e com entrega para todo o Brasil."), /*#__PURE__*/React.createElement("div", {
      className: "hero__cta"
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      iconRight: I("arrow-right"),
      onClick: () => onView("asic")
    }, "Ver rentabilidade"), /*#__PURE__*/React.createElement(Button, {
      variant: "whatsapp",
      size: "lg",
      iconLeft: I("message-circle"),
      href: WA
    }, "Falar no WhatsApp")), /*#__PURE__*/React.createElement("div", {
      className: "hero__stats"
    }, /*#__PURE__*/React.createElement(Stat, {
      variant: "glass",
      label: "Hashrate at\xE9",
      value: "120",
      unit: "TH"
    }), /*#__PURE__*/React.createElement(Stat, {
      variant: "glass",
      label: "Garantia",
      value: "30",
      unit: "dias"
    }), /*#__PURE__*/React.createElement(Stat, {
      variant: "glass",
      label: "Entrega",
      value: "Brasil",
      sub: "todo o territ\xF3rio"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "hero__art"
    }, /*#__PURE__*/React.createElement("img", {
      src: A + "about-tall.png",
      alt: "Mascote Cat Miner segurando uma ASIC"
    })))), /*#__PURE__*/React.createElement("section", {
      className: "sec",
      id: "loja"
    }, /*#__PURE__*/React.createElement(SectionHeading, {
      align: "center",
      eyebrow: "Confira nossos modelos",
      title: "Nossos modelos em destaque",
      subtitle: "Mineradores ASIC revisados, prontos para uso e com a melhor rentabilidade do mercado."
    }), /*#__PURE__*/React.createElement("div", {
      className: "grid-products"
    }, featured.map(p => /*#__PURE__*/React.createElement("div", {
      key: p.id,
      className: "pc-wrap",
      onClick: () => onOpen(p)
    }, /*#__PURE__*/React.createElement(ProductCard, {
      title: p.title,
      image: p.image,
      condition: p.estado,
      inStock: p.inStock,
      featured: p.featured,
      specs: specsOf(p),
      price: p.price,
      profitDaily: p.daily,
      profitMonthly: p.monthly,
      ctaHref: WA,
      onBuy: e => {
        e.preventDefault();
        e.stopPropagation();
        onBuy(p);
      }
    })))), /*#__PURE__*/React.createElement("div", {
      className: "sec__foot"
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "lg",
      iconRight: I("arrow-right"),
      onClick: () => onView("loja")
    }, "Ver toda a loja"))), /*#__PURE__*/React.createElement("section", {
      className: "banner"
    }, /*#__PURE__*/React.createElement("img", {
      src: A + "warehouse.jpg",
      alt: ""
    }), /*#__PURE__*/React.createElement("div", {
      className: "banner__veil"
    }), /*#__PURE__*/React.createElement("div", {
      className: "banner__copy"
    }, /*#__PURE__*/React.createElement("h2", null, "Os melhores equipamentos para sua minera\xE7\xE3o"))), /*#__PURE__*/React.createElement("section", {
      className: "sec surface-dark sec--dark"
    }, /*#__PURE__*/React.createElement(SectionHeading, {
      align: "center",
      eyebrow: "Por que escolher a Cat Miner",
      title: "Confian\xE7a em cada etapa",
      subtitle: "Do primeiro contato ao p\xF3s-venda, voc\xEA conta com uma equipe especializada."
    }), /*#__PURE__*/React.createElement("div", {
      className: "features-grid"
    }, features.map(f => /*#__PURE__*/React.createElement(FeatureCard, {
      key: f.id,
      align: "center",
      image: f.image,
      title: f.title
    }, f.text)))), /*#__PURE__*/React.createElement("section", {
      className: "sec about"
    }, /*#__PURE__*/React.createElement("div", {
      className: "about__art"
    }, /*#__PURE__*/React.createElement("img", {
      src: A + "about-tall.png",
      alt: "Mascote Cat Miner"
    })), /*#__PURE__*/React.createElement("div", {
      className: "about__copy"
    }, /*#__PURE__*/React.createElement("span", {
      className: "eyebrow"
    }, "Sobre n\xF3s"), /*#__PURE__*/React.createElement("h2", null, "A maior fornecedora de ASICs usadas do Brasil"), /*#__PURE__*/React.createElement("p", null, "Somos refer\xEAncia em qualidade, variedade e os melhores pre\xE7os do mercado. Oferecemos uma ampla sele\xE7\xE3o de equipamentos testados, revisados e prontos para uso, garantindo alto desempenho e confiabilidade."), /*#__PURE__*/React.createElement("p", {
      className: "about__note"
    }, "Lembrando que as m\xE1quinas s\xE3o usadas, por\xE9m em \xF3timo estado de conserva\xE7\xE3o."), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "lg",
      iconLeft: I("message-circle"),
      href: WA
    }, "Fale conosco"))), /*#__PURE__*/React.createElement("section", {
      className: "cta-band surface-dark"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cta-band__inner"
    }, /*#__PURE__*/React.createElement("h2", null, "Pronto para come\xE7ar a minerar?"), /*#__PURE__*/React.createElement("p", null, "Fale com nossos especialistas e receba uma recomenda\xE7\xE3o para o seu objetivo."), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      iconLeft: I("message-circle"),
      href: WA
    }, "Quero mais informa\xE7\xF5es"))));
  }
  return Home;
}();
window.CMHome = CMHome;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/News.jsx
try { (() => {
/* Notícias — blog grid. Post titles are illustrative (blog body not captured). */
const CMNews = function () {
  const {
    SectionHeading,
    Badge,
    Button
  } = window.CatMinerDesignSystem_26514a;
  const {
    posts,
    WA
  } = window.CMData;
  const I = n => React.createElement("i", {
    "data-lucide": n
  });
  function News() {
    return /*#__PURE__*/React.createElement("div", {
      className: "page"
    }, /*#__PURE__*/React.createElement("div", {
      className: "page__head"
    }, /*#__PURE__*/React.createElement(SectionHeading, {
      eyebrow: "Not\xEDcias",
      title: "Conte\xFAdo para mineradores",
      subtitle: "Guias, dicas e novidades do universo da minera\xE7\xE3o de criptomoedas."
    })), /*#__PURE__*/React.createElement("div", {
      className: "news-grid"
    }, posts.map(p => /*#__PURE__*/React.createElement("article", {
      className: "post",
      key: p.id
    }, /*#__PURE__*/React.createElement("div", {
      className: "post__media"
    }, /*#__PURE__*/React.createElement("img", {
      src: p.img,
      alt: ""
    })), /*#__PURE__*/React.createElement("div", {
      className: "post__body"
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "orange",
      variant: "soft"
    }, p.tag), /*#__PURE__*/React.createElement("h3", {
      className: "post__title"
    }, p.title), /*#__PURE__*/React.createElement("a", {
      className: "post__more",
      href: WA
    }, "Ler mais ", /*#__PURE__*/React.createElement("i", {
      "data-lucide": "arrow-right"
    })))))), /*#__PURE__*/React.createElement("div", {
      className: "sec__foot"
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "lg",
      href: WA,
      iconRight: I("arrow-right")
    }, "Ver todas as not\xEDcias")));
  }
  return News;
}();
window.CMNews = CMNews;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/News.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Store.jsx
try { (() => {
/* Loja — searchable / filterable product grid. */
const CMStore = function () {
  const {
    SectionHeading,
    ProductCard,
    Input,
    Select,
    Button
  } = window.CatMinerDesignSystem_26514a;
  const {
    products,
    WA
  } = window.CMData;
  const I = n => React.createElement("i", {
    "data-lucide": n
  });
  const specsOf = p => [{
    label: "Hashrate",
    value: p.hashrate + " TH",
    icon: I("gauge")
  }, {
    label: "Consumo",
    value: p.consumo,
    icon: I("zap")
  }, {
    label: "Tensão",
    value: p.tensao,
    icon: I("plug")
  }];
  const brands = ["Todas", "Bitmain", "Whatsminer"];
  function Store({
    onBuy,
    onOpen
  }) {
    const [q, setQ] = React.useState("");
    const [brand, setBrand] = React.useState("Todas");
    const [sort, setSort] = React.useState("rent");
    let list = products.filter(p => (brand === "Todas" || p.brand === brand) && p.title.toLowerCase().includes(q.toLowerCase()));
    list = [...list].sort((a, b) => sort === "price" ? a.price - b.price : sort === "hash" ? b.hashrate - a.hashrate : parseFloat(b.monthly.replace(/[^\d,]/g, "").replace(",", ".")) - parseFloat(a.monthly.replace(/[^\d,]/g, "").replace(",", ".")));
    return /*#__PURE__*/React.createElement("div", {
      className: "page"
    }, /*#__PURE__*/React.createElement("div", {
      className: "page__head"
    }, /*#__PURE__*/React.createElement(SectionHeading, {
      eyebrow: "Loja",
      title: "Todos os modelos",
      subtitle: `${products.length} mineradores ASIC revisados e prontos para uso.`
    })), /*#__PURE__*/React.createElement("div", {
      className: "toolbar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "toolbar__search"
    }, /*#__PURE__*/React.createElement(Input, {
      placeholder: "Buscar modelo (ex.: S19j, M50\u2026)",
      value: q,
      onChange: e => setQ(e.target.value),
      iconLeft: I("search")
    })), /*#__PURE__*/React.createElement("div", {
      className: "chips"
    }, brands.map(b => /*#__PURE__*/React.createElement("button", {
      key: b,
      className: "chip" + (brand === b ? " chip--on" : ""),
      onClick: () => setBrand(b)
    }, b))), /*#__PURE__*/React.createElement("div", {
      className: "toolbar__sort"
    }, /*#__PURE__*/React.createElement(Select, {
      value: sort,
      onChange: e => setSort(e.target.value),
      options: [{
        value: "rent",
        label: "Maior rentabilidade"
      }, {
        value: "price",
        label: "Menor preço"
      }, {
        value: "hash",
        label: "Maior hashrate"
      }]
    }))), list.length ? /*#__PURE__*/React.createElement("div", {
      className: "grid-products"
    }, list.map(p => /*#__PURE__*/React.createElement("div", {
      key: p.id,
      className: "pc-wrap",
      onClick: () => onOpen(p)
    }, /*#__PURE__*/React.createElement(ProductCard, {
      title: p.title,
      image: p.image,
      condition: p.estado,
      inStock: p.inStock,
      featured: p.featured,
      specs: specsOf(p),
      price: p.price,
      profitDaily: p.daily,
      profitMonthly: p.monthly,
      ctaHref: WA,
      onBuy: e => {
        e.preventDefault();
        e.stopPropagation();
        onBuy(p);
      }
    })))) : /*#__PURE__*/React.createElement("div", {
      className: "empty"
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "search-x"
    }), /*#__PURE__*/React.createElement("p", null, "Nenhum modelo encontrado para \u201C", q, "\u201D."), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => {
        setQ("");
        setBrand("Todas");
      }
    }, "Limpar filtros")));
  }
  return Store;
}();
window.CMStore = CMStore;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Store.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/data.js
try { (() => {
/* Cat Miner — UI kit data.
   Models 1–3 are the real listings from catminer.com.br.
   Models 4–6 are REPRESENTATIVE entries (real ASIC hardware, illustrative
   specs/prices, images reused) to demonstrate the store grid & filters. */
(function () {
  const A = "../../assets/";
  const WA = "https://wa.me/5545998370750?text=" + encodeURIComponent("Olá, vim do site e quero mais informações sobre as Asics.");
  const products = [{
    id: "s19j-pro-plus",
    title: "Bitmain Antminer S19j Pro+ (120 TH)",
    brand: "Bitmain",
    image: A + "product-s19j-pro-plus.png",
    hashrate: 120,
    consumo: "3.360 W",
    tensao: "220v",
    estado: "Usada",
    price: 7499,
    daily: "R$ 32,83 /dia",
    monthly: "R$ 984,77 /mês",
    inStock: true,
    featured: true,
    real: true
  }, {
    id: "s19j-pro",
    title: "Bitmain S19J Pro (95 TH)",
    brand: "Bitmain",
    image: A + "product-s19j-pro.jpg",
    hashrate: 95,
    consumo: "3.250 W",
    tensao: "220v",
    estado: "Usada",
    price: 3899,
    daily: "R$ 24,76 /dia",
    monthly: "R$ 742,78 /mês",
    inStock: true,
    featured: false,
    real: true
  }, {
    id: "whatsminer-m50",
    title: "Whatsminer M50 (120 TH)",
    brand: "Whatsminer",
    image: A + "product-whatsminer-m50.png",
    hashrate: 120,
    consumo: "3.360 W",
    tensao: "220v",
    estado: "Usada",
    price: 5999,
    daily: "R$ 32,83 /dia",
    monthly: "R$ 984,77 /mês",
    inStock: true,
    featured: false,
    real: true
  }, {
    id: "s19-pro",
    title: "Bitmain Antminer S19 Pro (110 TH)",
    brand: "Bitmain",
    image: A + "product-s19j-pro-plus.png",
    hashrate: 110,
    consumo: "3.250 W",
    tensao: "220v",
    estado: "Usada",
    price: 6499,
    daily: "R$ 29,70 /dia",
    monthly: "R$ 891,00 /mês",
    inStock: true,
    featured: false,
    real: false
  }, {
    id: "m30s",
    title: "Whatsminer M30S++ (112 TH)",
    brand: "Whatsminer",
    image: A + "product-whatsminer-m50.png",
    hashrate: 112,
    consumo: "3.472 W",
    tensao: "220v",
    estado: "Usada",
    price: 5499,
    daily: "R$ 30,24 /dia",
    monthly: "R$ 907,20 /mês",
    inStock: false,
    featured: false,
    real: false
  }, {
    id: "t19",
    title: "Bitmain Antminer T19 (84 TH)",
    brand: "Bitmain",
    image: A + "product-s19j-pro.jpg",
    hashrate: 84,
    consumo: "3.150 W",
    tensao: "220v",
    estado: "Usada",
    price: 3299,
    daily: "R$ 22,68 /dia",
    monthly: "R$ 680,40 /mês",
    inStock: true,
    featured: false,
    real: false
  }];
  const features = [{
    id: "atendimento",
    image: A + "feature-atendimento.png",
    title: "Atendimento personalizado",
    text: "Nosso atendimento continua no pós-venda, oferecendo suporte e atenção contínua aos nossos clientes."
  }, {
    id: "transacoes",
    image: A + "feature-transacoes.png",
    title: "Transações seguras",
    text: "Oferecemos métodos de pagamento seguros e envio protegido para todos os nossos produtos."
  }, {
    id: "suporte",
    image: A + "feature-suporte.png",
    title: "Suporte especializado",
    text: "Nossa equipe técnica fornece suporte para configuração e solução de problemas."
  }];

  /* Representative news posts (titles illustrative — blog content not captured). */
  const posts = [{
    id: 1,
    tag: "Guia",
    title: "Mineração em pools: vale a pena começar?",
    img: A + "og-hero.png"
  }, {
    id: 2,
    tag: "ASICs",
    title: "Como escolher a sua primeira ASIC usada",
    img: A + "warehouse.jpg"
  }, {
    id: 3,
    tag: "Rentabilidade",
    title: "3 dicas para minerar com mais eficiência",
    img: A + "feature-suporte.png"
  }];
  const links = [{
    label: "Início",
    view: "home"
  }, {
    label: "Loja",
    view: "loja"
  }, {
    label: "Asic",
    view: "asic"
  }, {
    label: "Notícias",
    view: "news"
  }];
  window.CMData = {
    products,
    features,
    posts,
    links,
    WA,
    A
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.js", error: String((e && e.message) || e) }); }

__ds_ns.PriceTag = __ds_scope.PriceTag;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.SpecList = __ds_scope.SpecList;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.FeatureCard = __ds_scope.FeatureCard;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.Navbar = __ds_scope.Navbar;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

})();
