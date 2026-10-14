// Builds src/data/*.json from the original WordPress export in /content/site-icerigi.
// The Markdown files are the authoritative record; this script only restructures them.
// Every deliberate correction is listed in CORRECTIONS below and documented in docs/CONTENT-ISSUES.md.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const here = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(here, "../..");
const SRC = path.join(ROOT, "content/site-icerigi");
const OUT = path.join(here, "../src/data");
const MEDIA_LIST = path.join(here, "../media-manifest.txt");
fs.mkdirSync(OUT, { recursive: true });

// ---------------------------------------------------------------- routing map
// Old WordPress slug -> new route. Only two slugs change (see CONTENT-ISSUES #URL-1, #URL-2).
const PAGE_ROUTES = {
  "anasayfa2": "/",
  "genel-kurallar": "/genel-kurallar",
  "tedarik-talebi": "/tedarik-talebi",
  "kutuphanelerimiz": "/kutuphanelerimiz",
  "engelsiz-kutuphane": "/engelsiz-kutuphane",
  "kutuphane-bagiscilarimiz": "/kutuphane-bagiscilarimiz",
  "odunc-alma-ve-odunc-sartlari": "/odunc-alma-ve-odunc-sartlari",
  "tez-teslimi": "/tez-teslimi",
  "yayin-girisi": "/yayin-girisi",
  "intihal-programlari": "/intihal-programlari",
  "acik-bilim-ve-kutuphane-komisyonu": "/acik-bilim-ve-kutuphane-komisyonu",
  "iletisim": "/iletisim",
  "abone-olunan-veri-tabanlari": "/abone-olunan-veri-tabanlari",
  "deneme-erisimli-veri-tabanlari": "/deneme-erisimli-veri-tabanlari",
  "acik-erisimli-veri-tabanlari": "/acik-dersler", // page titled "Açık Dersler"
  "acik-erisimli-veri-tabanlari-2": "/acik-erisimli-veri-tabanlari",
  "e-kitaplar": "/e-kitaplar",
  "e-kaynaklar": "/e-dergiler", // linked as "E-Dergiler" on the old homepage
  "sanal-muzeler": "/sanal-muzeler",
  "khan-academy": "/khan-academy",
  "yerleske-disi-erisim": "/yerleske-disi-erisim",
  "duyurular": "/duyurular",
};

// Directory pages: their cards become structured database records.
const DIRECTORY_TYPES = {
  "abone-olunan-veri-tabanlari": "abone",
  "acik-erisimli-veri-tabanlari-2": "acik",
  "deneme-erisimli-veri-tabanlari": "deneme",
  "e-kitaplar": "e-kitap",
  "e-kaynaklar": "e-dergi",
  "acik-erisimli-veri-tabanlari": "acik-ders",
  "sanal-muzeler": "sanal-muze",
};

// Link corrections backed by evidence (CONTENT-ISSUES #LINK-*). Keyed by record name + wrong URL.
const CORRECTIONS = [
  { where: "Kültür ve Turizm Bakanlığı Sanal Müzeleri", from: "https://www.uffizi.it/en/online-exhibitions", to: "https://sanalmuze.gov.tr/", ref: "LINK-1" },
  { where: "Free ebooks by Project Gutenberg", from: "https://doabooks.org/", to: "https://www.gutenberg.org/", ref: "LINK-2" },
  { where: "Inspec With Full Text", from: "https://research.ebsco.com/c/infzwo/?db=eric", to: "https://research.ebsco.com/c/infzwo?db=int", ref: "LINK-3" },
  { where: "Mesvera Yapay Zeka Platformu", from: "mesvera.com", to: "https://mesvera.com", ref: "LINK-4" },
];

// Formatting-only repairs (wording unchanged), CONTENT-ISSUES #FMT-1.
const FORMAT_FIXES = {
  "odunc-alma-ve-odunc-sartlari": (md) => {
    const start = md.indexOf("**a)");
    const end = md.indexOf("-Ödünç kitap alırken");
    if (start < 0 || end < 0) return md;
    let seg = md.slice(start, end).replace(/\*\*/g, "");
    const joins = [
      ["öğrencileribir", "öğrencileri bir"], ["bir kez30", "bir kez 30"], ["bir kez15", "bir kez 15"],
      ["yayınalabilirler", "yayın alabilirler"], ["süreylegerçekleştirilir", "süreyle gerçekleştirilir"],
      ["gerçekleştirilir.Üst", "gerçekleştirilir. Üst"], ["15gün", "15 gün"],
      ["gerçekleştirilir.Ödünç", "gerçekleştirilir. Ödünç"], ["yararlanamaz.d)", "yararlanamaz.\n\nd)"],
    ];
    for (const [a, b] of joins) seg = seg.split(a).join(b);
    for (const label of ["a) Akademik personel ile yüksek lisans/doktora öğrencileri", "b) Ön lisans ve lisans öğrencileri", "c) Mezunlar,", "d) İdari personel,"])
      seg = seg.replace(label, `**${label}**`);
    // "-Text" paragraphs are the page's rule items: render them as a list.
    return (md.slice(0, start) + seg + md.slice(end)).replace(/^-(?=\S)/gm, "- ");
  },
};

// ---------------------------------------------------------------- helpers
const TR_MONTHS = { ocak: 1, şubat: 2, mart: 3, nisan: 4, mayıs: 5, haziran: 6, temmuz: 7, ağustos: 8, eylül: 9, ekim: 10, kasım: 11, aralık: 12 };
const pad = (n) => String(n).padStart(2, "0");
const iso = (y, m, d) => `${y}-${pad(m)}-${pad(d)}`;

function readMd(file) {
  const raw = fs.readFileSync(file, "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const meta = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i < 0) continue;
    let v = line.slice(i + 1).trim();
    if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
    meta[line.slice(0, i).trim()] = v;
  }
  // Drop the leading "# Title" line; the title lives in the frontmatter.
  const body = m[2].replace(/^\s*# .*\n/, "").trim();
  return { meta, body };
}

const mediaNeeded = new Set();
const UPLOAD_RE = /https?:\/\/(?:kutuphane\.kapadokya\.edu\.tr|ajansepika\.com\/demo1\/kutuphanekapadokya)\/wp-content\/uploads\/([^)\s"']+)/g;

function localMedia(url) {
  if (!url) return null;
  const m = [...url.matchAll(UPLOAD_RE)][0];
  if (!m) return url;
  let p = m[1].split("?")[0];
  try { p = decodeURIComponent(p); } catch { /* keep raw */ }
  mediaNeeded.add(p);
  return `media/${p}`;
}

const idToRoute = {};
const slugToRoute = { ...PAGE_ROUTES };

function rewriteUrl(url) {
  if (!url) return url;
  if (UPLOAD_RE.test(url)) { UPLOAD_RE.lastIndex = 0; return localMedia(url); }
  UPLOAD_RE.lastIndex = 0;
  const pid = url.match(/kutuphane\.kapadokya\.edu\.tr\/\?page_id=(\d+)/);
  if (pid && idToRoute[pid[1]]) return idToRoute[pid[1]];
  const s = url.match(/^https?:\/\/kutuphane\.kapadokya\.edu\.tr\/?([^?#]*?)\/?$/);
  if (s) return s[1] === "" ? "/" : slugToRoute[s[1]] ?? url;
  return url;
}

function rewriteMarkdown(md) {
  return md
    .replace(/(!?\[[^\]]*\]\()([^)\s]+)(\))/g, (_, a, url, c) => a + rewriteUrl(url) + c)
    // Plugin placeholders from the WordPress export are not content.
    .replace(/^\*\[(Randevu takvimi|İletişim formu|Google Harita|Otomatik liste)[^\n]*\]\*\s*$/gm, "")
    .replace(/^!\s*$/gm, "") // image tags whose source was lost in the export
    .replace(/\n{3,}/g, "\n\n");
}

marked.setOptions({ gfm: true, breaks: false });
const renderer = new marked.Renderer();
renderer.link = function ({ href, title, tokens }) {
  const text = this.parser.parseInline(tokens);
  const external = /^(https?:)?\/\//.test(href) || href.startsWith("mailto:");
  const doc = /\.(pdf|docx?|xlsx?|pptx?)(\?|$)/i.test(href) || /\/bitstreams?\/|\/File\/download\//i.test(href);
  const attrs = external && !href.startsWith("mailto:") ? ' target="_blank" rel="noopener noreferrer"' : "";
  const cls = doc ? ' class="doc-link"' : "";
  const t = title ? ` title="${title}"` : "";
  const h = href.startsWith("media/") ? "/" + href : href;
  return `<a href="${h}"${t}${attrs}${cls}>${text}</a>`;
};
renderer.image = ({ href, text }) => {
  const h = href.startsWith("media/") ? "/" + href : href;
  return `<img src="${h}" alt="${(text || "").replace(/"/g, "&quot;")}" loading="lazy">`;
};
const html = (md) => marked.parse(md, { renderer }).trim();

const plain = (md) =>
  md.replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`#>|]/g, "")
    .replace(/\s+/g, " ")
    .trim();

function excerptOf(md, max = 230) {
  const paras = md.split(/\n\s*\n/).map(plain).filter(Boolean)
    .filter((p) => !/^(değerli|sayın)\b.*[,:]$/i.test(p) && p.length > 25);
  const t = paras.join(" ");
  if (t.length <= max) return t;
  return t.slice(0, t.lastIndexOf(" ", max)) + "…";
}

// Finds every date written in the Turkish forms used by the source texts.
function findDates(text, fallbackYear) {
  const out = [];
  const months = Object.keys(TR_MONTHS).join("|");
  for (const m of text.matchAll(/\b(\d{1,2})\.(\d{1,2})\.(\d{4})\b/g)) out.push(iso(+m[3], +m[2], +m[1]));
  // "13 Ekim – 15 Kasım 2026": the first date inherits the year of the second.
  for (const m of text.matchAll(new RegExp(`\\b(\\d{1,2})\\s+(${months})\\s*[–-]\\s*(\\d{1,2})\\s+(${months})\\s+(\\d{4})`, "gi")))
    out.push(iso(+m[5], TR_MONTHS[m[2].toLocaleLowerCase("tr")], +m[1]), iso(+m[5], TR_MONTHS[m[4].toLocaleLowerCase("tr")], +m[3]));
  // "01 Ekim – 8 Kasım" without a year: the announcement's own year applies.
  if (fallbackYear) for (const m of text.matchAll(new RegExp(`\\b(\\d{1,2})\\s+(${months})\\s*[–-]\\s*(\\d{1,2})\\s+(${months})(?!\\s+\\d{4})`, "gi")))
    out.push(iso(fallbackYear, TR_MONTHS[m[4].toLocaleLowerCase("tr")], +m[3]));
  for (const m of text.matchAll(new RegExp(`\\b(\\d{1,2})\\s+(${months})\\s+(\\d{4})`, "gi")))
    out.push(iso(+m[3], TR_MONTHS[m[2].toLocaleLowerCase("tr")], +m[1]));
  return out.filter((d) => !Number.isNaN(Date.parse(d)));
}

const latest = (dates) => (dates.length ? dates.sort().at(-1) : null);

// ---------------------------------------------------------------- pages
const pageFiles = fs.readdirSync(path.join(SRC, "sayfalar")).filter((f) => f.endsWith(".md"));
const pages = [];
for (const f of pageFiles) {
  const { meta, body } = readMd(path.join(SRC, "sayfalar", f));
  if (meta.durum !== "publish") continue; // the draft copy of "Abone Olunan" is not migrated
  pages.push({ meta, body });
  idToRoute[meta.id] = PAGE_ROUTES[meta.slug];
}

// ---------------------------------------------------------------- posts (needed for id/slug maps first)
const postFiles = fs.readdirSync(path.join(SRC, "duyurular")).filter((f) => f.endsWith(".md")).sort().reverse();
const posts = postFiles.map((f) => ({ file: f, ...readMd(path.join(SRC, "duyurular", f)) }));
for (const { meta } of posts) {
  const route = meta.kategori === "Kütüphanelerimiz" ? `/kutuphanelerimiz#${meta.slug}` : `/duyurular/${meta.slug}`;
  idToRoute[meta.id] = route;
  slugToRoute[meta.slug] = route;
}

// ---------------------------------------------------------------- directory records
const databases = [];
const applied = [];
for (const { meta, body } of pages) {
  const type = DIRECTORY_TYPES[meta.slug];
  if (!type) continue;
  const lines = body.split("\n");
  let pendingLogo = null;
  let cur = null;
  const flush = () => { if (cur) databases.push(cur); cur = null; };
  for (const line of lines) {
    const img = line.match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/);
    const h = line.match(/^####\s+(.+)$/);
    if (img) { flush(); pendingLogo = { src: localMedia(img[2]), alt: img[1] }; continue; }
    if (h) {
      flush();
      cur = { name: h[1].trim(), type, logo: pendingLogo, descMd: [], links: [], source: PAGE_ROUTES[meta.slug], sourceUrl: meta.url };
      pendingLogo = null;
      continue;
    }
    if (!cur || !line.trim()) continue;
    const onlyLink = line.trim().match(/^\[([^\]]+)\]\(([^)]*)\)$/);
    if (onlyLink && /eri[şŞ]im\s+[iİ]çin/i.test(onlyLink[1])) cur.links.push({ label: onlyLink[1].trim(), url: onlyLink[2] });
    else cur.descMd.push(line);
  }
  flush();
}

const seen = new Map();
databases.forEach((d, i) => {
  for (const c of CORRECTIONS) {
    if (d.name === c.where) d.links.forEach((l) => { if (l.url === c.from) { l.url = c.to; l.correction = c.ref; applied.push(c.ref); } });
  }
  const md = d.descMd.join("\n\n");
  d.description = plain(md);
  d.descriptionHtml = html(rewriteMarkdown(md));
  delete d.descMd;
  d.url = d.links[0]?.url ?? null;
  const m = d.description.match(/Son Eri[şŞ]im Tarihi?\s*:?\s*(.{0,30}?\d{4})/i);
  d.trialEnd = d.type === "deneme" && m ? latest(findDates(m[1])) : null;
  const base = d.name.toLocaleLowerCase("tr").replace(/[^a-z0-9çğıöşü]+/g, "-").replace(/^-|-$/g, "");
  const key = `${d.type}:${base}`;
  d.id = seen.has(key) ? `${d.type}-${base}-${i}` : `${d.type}-${base}`;
  if (seen.has(key)) d.duplicateOf = seen.get(key);
  else seen.set(key, d.id);
});

// ---------------------------------------------------------------- announcements
const announcements = [];
for (const { meta, body } of posts) {
  if (meta.kategori !== "Duyurular" || meta.durum !== "publish") continue;
  const text = `${meta.baslik} ${plain(body)}`;
  const isTrial = /deneme/i.test(meta.baslik);
  const pub = meta.yayin.slice(0, 10);
  const trialEnd = isTrial ? latest(findDates(text, +pub.slice(0, 4))) : null;
  let md = rewriteMarkdown(body);
  for (const c of CORRECTIONS) if (md.includes(`](${c.from})`)) { md = md.split(`](${c.from})`).join(`](${c.to})`); applied.push(c.ref); }
  const bodyHtml = html(md);
  announcements.push({
    slug: meta.slug,
    id: meta.id,
    title: meta.baslik.replace(/\s+/g, " ").trim(),
    date: pub,
    updated: meta.guncelleme.slice(0, 10),
    image: localMedia(meta.one_cikan_gorsel),
    excerpt: excerptOf(body),
    html: bodyHtml,
    empty: !plain(body) || /\(İçerik boş\)/.test(body),
    isTrial,
    trialEnd,
    attachments: [...bodyHtml.matchAll(/<a href="([^"]+)"[^>]*class="doc-link"[^>]*>(.*?)<\/a>/g)].map((m) => ({ url: m[1], label: m[2].replace(/<[^>]+>/g, "") })),
    sourceUrl: meta.url,
  });
}

// A trial card whose own text lost its end date takes it from the matching announcement.
for (const d of databases.filter((x) => x.type === "deneme" && !x.trialEnd)) {
  const key = d.name.toLocaleLowerCase("tr");
  const a = announcements.find((x) => x.trialEnd && x.title.toLocaleLowerCase("tr").includes(key));
  if (a) { d.trialEnd = a.trialEnd; d.trialEndSource = `/duyurular/${a.slug}`; }
}

// ---------------------------------------------------------------- libraries (from the "Kütüphanelerimiz" page + category posts)
const libPage = pages.find((p) => p.meta.slug === "kutuphanelerimiz");
const [libIntroMd, ...libSections] = rewriteMarkdown(libPage.body).split(/^###### /m);
const libPosts = Object.fromEntries(posts.filter((p) => p.meta.kategori === "Kütüphanelerimiz").map((p) => [p.meta.baslik, p.meta]));
const hoursPage = pages.find((p) => p.meta.slug === "genel-kurallar").body;
const hourOf = (needle) => (hoursPage.match(new RegExp(`\\*\\*([^*]*${needle}[^*]*)\\*\\*`)) || [])[1] ?? null;
const libraryHours = {
  "Merkez Kütüphane": hourOf("Merkez Kütüphanesi"),
  "Sosyal Bilimler Kütüphanesi": hourOf("Sosyal Bilimler"),
  "Fen Bilimleri Kütüphanesi": hourOf("Fen Bilimleri"),
};
const libraries = {
  introHtml: html(libIntroMd),
  intro: libIntroMd.split(/\n\s*\n/).map(plain).filter(Boolean),
  items: libSections.map((s) => {
    const [name, ...rest] = s.split("\n");
    const paras = rest.join("\n").split(/\n\s*\n/).map(plain).filter(Boolean);
    const post = libPosts[name.trim()];
    return {
      name: name.trim(),
      slug: post?.slug ?? null,
      paragraphs: paras,
      hours: libraryHours[name.trim()] ?? null,
      sourceImage: post?.one_cikan_gorsel ?? null,
    };
  }),
  otherHours: [hourOf("Fabrika")].filter(Boolean),
};

// ---------------------------------------------------------------- services
const services = fs.readdirSync(path.join(SRC, "hizmetler")).filter((f) => f.endsWith(".md")).map((f) => {
  const { meta, body } = readMd(path.join(SRC, "hizmetler", f));
  return { slug: meta.slug, title: meta.baslik, image: localMedia(meta.one_cikan_gorsel), html: html(rewriteMarkdown(body)), text: plain(body) };
});
const serviceOrder = ["toplu-katalog", "ankos", "kasif", "kutuphaneler-arasi-odunc-verme-sistemi"];
services.sort((a, b) => serviceOrder.indexOf(a.slug) - serviceOrder.indexOf(b.slug));

// ---------------------------------------------------------------- generic pages
const pageOut = pages
  .filter((p) => !["anasayfa2", "duyurular"].includes(p.meta.slug))
  .map(({ meta, body }) => {
    const directory = DIRECTORY_TYPES[meta.slug] ?? null;
    // Directory pages keep any prose that precedes the first card (none at the moment).
    const fixed = FORMAT_FIXES[meta.slug] ? FORMAT_FIXES[meta.slug](body) : body;
    const md = rewriteMarkdown(directory ? fixed.split(/^!\[|^####/m)[0] : fixed);
    return {
      route: PAGE_ROUTES[meta.slug],
      oldSlug: meta.slug,
      title: meta.baslik,
      updated: meta.guncelleme.slice(0, 10),
      sourceUrl: meta.url,
      directory,
      html: html(md),
      text: plain(md).slice(0, 400),
    };
  });

// ---------------------------------------------------------------- write
const write = (name, data) => fs.writeFileSync(path.join(OUT, name), JSON.stringify(data, null, 1) + "\n");
write("pages.json", pageOut);
write("announcements.json", announcements);
write("databases.json", databases);
write("libraries.json", libraries);
write("services.json", services);
fs.writeFileSync(MEDIA_LIST, [...mediaNeeded].sort().map((p) => `uploads/${p}`).join("\n") + "\n");

const byType = databases.reduce((a, d) => ((a[d.type] = (a[d.type] || 0) + 1), a), {});
console.log(`pages ${pageOut.length} · announcements ${announcements.length} · databases ${databases.length}`, byType);
console.log(`duplicates: ${databases.filter((d) => d.duplicateOf).map((d) => d.name).join(", ") || "none"}`);
console.log(`corrections applied: ${[...new Set(applied)].join(", ")} · media files ${mediaNeeded.size}`);
