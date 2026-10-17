import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MdChevronRight, MdChevronLeft, MdArrowOutward, MdCalendarToday } from "react-icons/md";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SmartLink from "../Buttons/SmartLink";
import {
    CONTACT, DIRECTORY_LABELS, DIRECTORY_ROUTES, activeTrials, announcements, announcementStatus,
    countByType, daysBetween, daysLeft, formatDate, libraries, media,
} from "../../lib/content";
import { LIBRARY_HOURS, statusNow } from "../../lib/hours";
import { NAV_GROUPS } from "../../data/nav";
import { ATATURK_SILHOUETTE } from "./ataturkSilhouette";

gsap.registerPlugin(ScrollTrigger);

/** Shared section frame: Apple-like rhythm, alternating white / light grey. */
const Band = ({ tone = "white", id, label, pad = "py-20 md:py-28", children }) => (
    <section id={id} aria-label={label} className={tone === "grey" ? "bg-[#181717]" : "bg-[#181717]"}>
        <div className={`kun-wrap ${pad}`} data-band>{children}</div>
    </section>
);

/** Gentle rise for each band's content (once). */
export function useBandReveal(scope) {
    useGSAP(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        gsap.utils.toArray("[data-rise]", scope.current).forEach((el) => {
            gsap.from(el, { y: 28, autoAlpha: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
        });
    }, { scope });
}


// ---------------------------------------------------------------- 2. Today
const dayFmt = new Intl.DateTimeFormat("tr-TR", { weekday: "long", day: "numeric", month: "long" });

// A still wall clock at 09:05, a faint Atatürk silhouette inside its face.
const HOUR = (9 + 5 / 60) * 30; // 272.5°
const MINUTE = 5 * 6;           // 30°

const WallClock = () => (
    <svg viewBox="0 0 200 200" role="img" aria-label="09:05'i gösteren duvar saati, içinde Atatürk portresi" className="w-full h-auto">
        <defs>
            <clipPath id="kun-clock-face"><circle cx="100" cy="100" r="92" /></clipPath>
        </defs>
        <g clipPath="url(#kun-clock-face)">
            <path d={ATATURK_SILHOUETTE} transform="translate(46 26) scale(0.5)" fill="#000000" fillRule="evenodd" opacity="0.5" />
        </g>
        <circle cx="100" cy="100" r="95" fill="none" stroke="#f4efe7" strokeWidth="2.5" />
        {Array.from({ length: 12 }, (_, i) => (
            <line key={i} x1="100" y1={i % 3 === 0 ? 14 : 16} x2="100" y2={i % 3 === 0 ? 30 : 24}
                stroke={i % 3 === 0 ? "#f4efe7" : "#b1a696"} strokeWidth={i % 3 === 0 ? 3 : 1.75} strokeLinecap="round"
                transform={`rotate(${i * 30} 100 100)`} />
        ))}
        <line x1="100" y1="108" x2="100" y2="54" stroke="#f4efe7" strokeWidth="4.5" strokeLinecap="round" transform={`rotate(${HOUR} 100 100)`} />
        <line x1="100" y1="112" x2="100" y2="30" stroke="#f4efe7" strokeWidth="2.5" strokeLinecap="round" transform={`rotate(${MINUTE} 100 100)`} />
        <circle cx="100" cy="100" r="4" fill="#f4efe7" />
    </svg>
);

const LibraryHoursText = ({ l, now, align }) => {
    const st = statusNow(l.schedule, now);
    const body = (
        <>
            <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[#8a8073]">{l.campus} Yerleşkesi</span>
            <span className="block mt-1.5 text-[1.3rem] md:text-[1.45rem] font-medium leading-tight tracking-tight text-[#f4efe7] group-hover:text-[#ffffff]">{l.name}</span>
            <span className="block mt-1.5 text-[0.9rem] leading-snug text-[#b1a696]">{l.schedule?.text}</span>
            <span className={`mt-2 flex items-center gap-2 text-[0.85rem] ${align === "right" ? "lg:justify-end" : ""}`}>
                <span aria-hidden="true" className={`w-2 h-2 rounded-full ${st?.open ? "bg-[#1f9d55]" : "bg-[#5e574f]"}`} />
                <span className={st?.open ? "text-[#9ad3a8]" : "text-[#8a8073]"}>{st?.label ?? "Bilgi yok"}</span>
            </span>
        </>
    );
    const cls = `group block ${align === "right" ? "lg:text-right" : ""}`;
    return l.slug ? <Link to={`/kutuphanelerimiz#${l.slug}`} className={cls}>{body}</Link> : <div className={cls}>{body}</div>;
};

export const TodayHours = () => {
    const [now, setNow] = useState(() => new Date());
    useEffect(() => { const t = setInterval(() => setNow(new Date()), 60000); return () => clearInterval(t); }, []);
    const half = Math.ceil(LIBRARY_HOURS.length / 2);
    const left = LIBRARY_HOURS.slice(0, half);
    const right = LIBRARY_HOURS.slice(half);

    return (
        <Band tone="grey" id="bugun" label="Bugün açık kütüphaneler">
            <div className="text-center" data-rise>
                <p className="text-[0.95rem] text-[#b1a696] capitalize">{dayFmt.format(now)}</p>
                <h2 className="kun-title mt-1">Bugün kütüphanelerimiz</h2>
            </div>
            <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-16">
                <div className="mx-auto w-[16rem] md:w-[19rem] lg:order-2" data-rise><WallClock /></div>
                <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1 lg:gap-12 lg:order-1">
                    {left.map((l) => <li key={l.name} data-rise><LibraryHoursText l={l} now={now} align="right" /></li>)}
                </ul>
                <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1 lg:gap-12 lg:order-3">
                    {right.map((l) => <li key={l.name} data-rise><LibraryHoursText l={l} now={now} align="left" /></li>)}
                </ul>
            </div>
            <div className="mt-12 flex flex-col items-center gap-3 text-center" data-rise>
                <Link to="/kutuphanelerimiz" className="kun-more">Kütüphanelerimiz</Link>
                <p className="text-[0.75rem] text-[#8a8073]">Saatler “Genel Kurallar” sayfasındaki çalışma saatlerinden hesaplanır.</p>
            </div>
        </Band>
    );
};

// ---------------------------------------------------------------- 3. Explore (Harvard "Explore What's Possible")
// Subtitles are quoted from the linked pages.
const EXPLORE = [
    { title: "Yayın tedarik talebinde bulunun", to: "/tedarik-talebi", sub: "Yüksek lisans ve doktora öğrencileri ile öğretim elemanları, kütüphane koleksiyonuna eklenmesi amacıyla yayın tedarik talebinde bulunabilirler." },
    { title: "Ödünç alma ve ödünç şartları", to: "/odunc-alma-ve-odunc-sartlari", sub: "KÜN kütüphaneleri, öğretim elemanlarımızın, öğrencilerimizin ve mezunlarımızın kullanımına açıktır." },
    { title: "Yerleşke dışından erişin", to: "/yerleske-disi-erisim", sub: "Üniversitemiz kütüphanelerine yerleşke dışından erişim, internet imkanı olan her yerden sağlanabilmektedir." },
    { title: "Tezinizi teslim edin", to: "/tez-teslimi", sub: "Kapadokya Üniversitesi Lisansüstü Eğitim, Öğretim ve Araştırma Enstitüsü Tez Teslim Süreci" },
    { title: "İntihal programlarını kullanın", to: "/intihal-programlari", sub: "Turnitin, İntihal.net ve iThenticate intihal analiz programları." },
    { title: "Engelsiz kütüphane", to: "/engelsiz-kutuphane", sub: "GETEM, İstanbul Üniversitesi Engelsiz Bilgi Merkezi ve Milli Kütüphane Konuşan Kitaplık." },
];

export const Explore = () => (
    <Band id="kesfet" label="Kütüphaneyi keşfedin">
        <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5" data-rise>
                <h2 className="kun-title">Kütüphaneyi keşfedin.</h2>
                {/* "Kütüphanelerimiz" page, third paragraph */}
                <p className="kun-lead mt-4">{libraries.intro[2]}</p>
            </div>
            <ul className="lg:col-span-7 border-t border-[#4f4b48]">
                {EXPLORE.map((e) => (
                    <li key={e.to} data-rise className="border-b border-[#4f4b48]">
                        <Link to={e.to} className="group flex items-center justify-between gap-6 py-5">
                            <span className="min-w-0">
                                <span className="block text-[1.15rem] font-semibold tracking-tight text-[#f4efe7] group-hover:text-[var(--kun-accent)]">{e.title}</span>
                                <span className="block mt-1 text-[0.9rem] text-[#b1a696] line-clamp-2">{e.sub}</span>
                            </span>
                            <MdChevronRight aria-hidden="true" className="shrink-0 w-6 h-6 text-[#8a8073] group-hover:text-[var(--kun-accent)] group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </Band>
);

// ---------------------------------------------------------------- 4. Newsroom
// A bulletin rather than an image grid (most announcement images are small logos): a ticker of
// running trials, one featured notice set in large type, and a dated list of the next five.
const monthShort = new Intl.DateTimeFormat("tr-TR", { month: "short" });
const monthYear = new Intl.DateTimeFormat("tr-TR", { month: "long", year: "numeric" });
const asDate = (iso) => new Date(`${iso}T12:00:00`);
const cleanExcerpt = (t = "") => t.trim().replace(/\.?\s*(\.{3}|…)$/, "…");

const NEWS_FILTERS = [
    { key: "all", label: "Tümü", test: () => true },
    { key: "trial", label: "Deneme erişimi", test: (a) => a.isTrial },
    { key: "news", label: "Duyuru", test: (a) => !a.isTrial },
];

const kindLabel = (a) => (a.isTrial ? "Deneme erişimi" : "Duyuru");

const TrialTicker = ({ items }) => {
    // The second copy only fills the loop: hidden from screen readers and the tab order.
    const run = (copy) => (
        <>
            {items.map((a) => (
                <Link key={`${copy}-${a.slug}`} to={`/duyurular/${a.slug}`} aria-hidden={copy ? "true" : undefined} tabIndex={copy ? -1 : undefined} className="inline-flex items-center gap-3 px-6 text-[0.95rem] text-[#d8cfc2] hover:text-[#f4efe7]">
                    <span aria-hidden="true" className="text-[#8a8073]">✳</span>
                    <span className="font-medium text-[#f4efe7]">{a.title.replace(/\s*(Veri ?tabanı|Platformu)?\s*Deneme Erişim.*$/i, "")}</span>
                    <span className="text-[#8a8073]">{formatDate(a.trialEnd)} tarihine kadar</span>
                </Link>
            ))}
        </>
    );
    return (
        <div className="mt-10 flex items-stretch overflow-hidden rounded-full border border-[#2f2c29]" data-rise>
            <span className="shrink-0 flex items-center gap-2 rounded-full bg-[#f4efe7] px-3.5 sm:px-5 py-3 text-[0.68rem] sm:text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-[#2a2725]">
                <span aria-hidden="true" className="kun-pulse w-2 h-2 rounded-full bg-[#1f9d55]" />Şu an denemede
            </span>
            <div className="kun-ticker relative flex-1 overflow-hidden">
                <div className="kun-ticker-track flex w-max items-center py-3">
                    {run(0)}
                    {run(1)}
                </div>
            </div>
        </div>
    );
};

const FeaturedNotice = ({ a }) => {
    const d = asDate(a.date);
    const status = announcementStatus(a);
    const total = a.trialEnd ? Math.max(1, daysBetween(a.date, a.trialEnd)) : 0;
    const left = a.trialEnd ? Math.max(0, daysLeft(a.trialEnd)) : 0;
    const pct = total ? Math.min(100, Math.max(0, ((total - left) / total) * 100)) : 0;
    return (
        <Link to={`/duyurular/${a.slug}`} className="group relative flex h-full flex-col rounded-[2rem] bg-[#f4efe7] p-7 md:p-9 text-[#2a2725] overflow-hidden">
            <span className="flex items-center justify-between gap-4">
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[#6b6259]">Son duyuru · {kindLabel(a)}</span>
                {a.image && (
                    <span className="relative w-14 h-14 shrink-0 rounded-2xl bg-[#ebe3d7]">
                        <img src={media(a.image)} alt="" className="absolute inset-0 m-auto max-w-[78%] max-h-[78%] object-contain mix-blend-multiply" />
                    </span>
                )}
            </span>
            <span className="mt-8 flex items-end gap-4">
                <span className="text-[length:var(--fs-figure)] font-medium leading-[0.8] tracking-[-0.05em]">{d.getDate()}</span>
                <span className="pb-2 text-[1rem] leading-tight capitalize text-[#5e574f]">{monthYear.format(d)}</span>
            </span>
            <span className="mt-8 block text-[length:var(--fs-h3)] font-medium leading-[1.1] tracking-tight">{a.title}</span>
            {a.excerpt && <span className="mt-4 block text-[0.98rem] leading-relaxed text-[#5e574f] line-clamp-3">{cleanExcerpt(a.excerpt)}</span>}
            {status === "active" && (
                <span className="mt-7 block">
                    <span className="flex items-baseline justify-between text-[0.8rem]">
                        <span className="text-[#6b6259]">Deneme süresi</span>
                        <span className="font-semibold">{left === 0 ? "Bugün sona eriyor" : `${left} gün kaldı`}</span>
                    </span>
                    <span className="mt-2 block h-[6px] rounded-full bg-[#2a2725]/12 overflow-hidden">
                        <span className="block h-full rounded-full bg-[#2a2725]" style={{ width: `${pct}%` }} />
                    </span>
                    <span className="mt-2 block text-[0.75rem] text-[#6b6259]">{formatDate(a.trialEnd)} tarihine kadar açık</span>
                </span>
            )}
            <span className="mt-auto pt-8 flex">
                <span className="inline-flex items-center gap-3 rounded-full bg-[#2a2725] pl-5 pr-1.5 py-1.5 text-[0.9rem] text-[#f4efe7]">
                    Duyuruyu okuyun
                    <MdArrowOutward aria-hidden="true" className="w-8 h-8 rounded-full bg-[#f4efe7] p-1.5 text-[#2a2725] transition-transform duration-500 group-hover:rotate-45" />
                </span>
            </span>
        </Link>
    );
};

// Row fills with cream from the bottom on hover, like the theme's menu panel.
const NoticeRow = ({ a }) => {
    const d = asDate(a.date);
    return (
        <li data-row>
            <Link to={`/duyurular/${a.slug}`} className="group relative grid grid-cols-[3.5rem_1fr_auto] sm:grid-cols-[4.5rem_1fr_auto] items-center gap-4 sm:gap-6 rounded-[1.5rem] px-3 sm:px-5 py-5 overflow-hidden">
                <span aria-hidden="true" className="absolute inset-0 bg-[#f4efe7] [clip-path:inset(100%_0_0_0)] group-hover:[clip-path:inset(0_0_0_0)] group-focus-visible:[clip-path:inset(0_0_0_0)] transition-[clip-path] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]" />
                <span className="relative text-center leading-none">
                    <span className="block text-[2rem] sm:text-[2.4rem] font-medium tracking-tight text-[#f4efe7] group-hover:text-[#2a2725] transition-colors duration-300">{String(d.getDate()).padStart(2, "0")}</span>
                    <span className="block mt-1 text-[0.72rem] uppercase tracking-[0.12em] text-[#8a8073] group-hover:text-[#6b6259] transition-colors duration-300">{monthShort.format(d)} {String(d.getFullYear()).slice(2)}</span>
                </span>
                <span className="relative min-w-0">
                    <span className={`block text-[0.7rem] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 ${announcementStatus(a) === "active" ? "text-[#9ad3a8] group-hover:text-[#1f7a45]" : "text-[#8a8073] group-hover:text-[#6b6259]"}`}>
                        {announcementStatus(a) === "active" ? `Deneme erişimi · ${daysLeft(a.trialEnd)} gün` : kindLabel(a)}
                    </span>
                    <span className="mt-1.5 block text-[1.05rem] sm:text-[1.15rem] font-medium leading-snug tracking-tight text-[#f4efe7] group-hover:text-[#2a2725] transition-colors duration-300 line-clamp-2">{a.title}</span>
                    {a.excerpt && <span className="mt-1 hidden md:block text-[0.86rem] text-[#8a8073] group-hover:text-[#5e574f] transition-colors duration-300 truncate">{cleanExcerpt(a.excerpt)}</span>}
                </span>
                <span className="relative flex items-center gap-3">
                    {a.image && (
                        <span className="relative hidden sm:block w-12 h-12 rounded-xl bg-[#f4efe7] transition-transform duration-500 group-hover:scale-110">
                            <img src={media(a.image)} alt="" loading="lazy" className="absolute inset-0 m-auto max-w-[76%] max-h-[76%] object-contain mix-blend-multiply grayscale group-hover:grayscale-0 transition-[filter] duration-500" />
                        </span>
                    )}
                    <MdArrowOutward aria-hidden="true" className="w-5 h-5 text-[#8a8073] group-hover:text-[#2a2725] group-hover:rotate-45 transition-all duration-500" />
                </span>
            </Link>
        </li>
    );
};

export const Newsroom = () => {
    const [filter, setFilter] = useState("all");
    const listRef = useRef(null);
    const pool = announcements.filter(NEWS_FILTERS.find((f) => f.key === filter).test);
    const [featured, ...rest] = pool;
    const rows = rest.slice(0, 5);
    const trials = announcements.filter((a) => announcementStatus(a) === "active");

    useGSAP(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        gsap.fromTo(listRef.current.querySelectorAll("[data-row], [data-feature]"), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.05, ease: "power3.out" });
    }, { dependencies: [filter], scope: listRef, revertOnUpdate: false });

    return (
        <Band tone="grey" id="duyurular" label="Duyurular">
            <div className="flex flex-wrap items-end justify-between gap-6" data-rise>
                <div>
                    <p className="text-[0.95rem] text-[#b1a696]">{announcements.length} duyuru</p>
                    <h2 className="kun-title mt-1">Duyurular</h2>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    {NEWS_FILTERS.map((f) => (
                        <button key={f.key} type="button" aria-pressed={filter === f.key} onClick={() => setFilter(f.key)} className="kun-chip">{f.label}</button>
                    ))}
                    <Link to="/duyurular" className="kun-more w-full sm:w-auto sm:ml-3 mt-2 sm:mt-0">Tüm duyurular</Link>
                </div>
            </div>

            {trials.length > 0 && <TrialTicker items={trials} />}

            <div ref={listRef} className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-10">
                {featured && <div data-feature className="lg:col-span-5"><FeaturedNotice a={featured} /></div>}
                <ul className="lg:col-span-7 flex flex-col divide-y divide-[#2f2c29] border-y border-[#2f2c29]">
                    {rows.map((a) => <NoticeRow key={a.slug} a={a} />)}
                    {rows.length === 0 && <li className="py-8 text-[0.95rem] text-[#8a8073]">Bu türde başka duyuru yok.</li>}
                </ul>
            </div>
        </Band>
    );
};

// ---------------------------------------------------------------- 5. Resources by the numbers
// Counts come from the directory data; trial days from each trial's end date. One cream hue,
// thin bars from a single baseline, value at the tip; hovering a row shows its share.
const useBarsGrow = (scope) => {
    useGSAP(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        gsap.utils.toArray("[data-bars]", scope.current).forEach((list) => {
            gsap.from(list.querySelectorAll("[data-bar]"), {
                scaleX: 0, transformOrigin: "left center", duration: 1.1, ease: "power3.out", stagger: 0.06,
                scrollTrigger: { trigger: list, start: "top 85%", once: true },
            });
        });
    }, { scope });
};

const BarRow = ({ to, label, value, max, valueText, hint, labelCol = "sm:grid-cols-[13rem_1fr]" }) => (
    <li>
        <Link to={to} className={`group grid grid-cols-1 ${labelCol} items-center gap-1.5 sm:gap-4 rounded-xl py-2.5 px-2 -mx-2 transition-colors hover:bg-[#1e1c1b]`}>
            <span className="text-[0.92rem] leading-tight text-[#d8cfc2] group-hover:text-[#f4efe7] truncate">{label}</span>
            <span className="flex items-center gap-3 min-w-0">
                <span className="relative flex-1 h-[10px] rounded-r-[4px] bg-[#24211f]">
                    <span data-bar className="absolute inset-y-0 left-0 rounded-r-[4px] bg-[#f4efe7] transition-[filter] duration-300 group-hover:brightness-110"
                        style={{ width: `${Math.max(2, (value / max) * 100)}%` }} />
                </span>
                <span className="sm:w-[9rem] shrink-0 flex items-baseline justify-end gap-2">
                    <span className="hidden sm:inline text-[0.75rem] text-[#8a8073] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity whitespace-nowrap">{hint}</span>
                    <span className="text-[0.95rem] font-semibold text-[#f4efe7] tabular-nums whitespace-nowrap">{valueText}</span>
                </span>
            </span>
        </Link>
    </li>
);

export const ResourceStats = () => {
    const scope = useRef(null);
    useBarsGrow(scope);

    const cats = Object.keys(DIRECTORY_LABELS)
        .map((t) => ({ type: t, label: DIRECTORY_LABELS[t], to: DIRECTORY_ROUTES[t], n: countByType(t) }))
        .sort((x, y) => y.n - x.n);
    const total = cats.reduce((sum, c) => sum + c.n, 0);
    const catMax = cats[0]?.n || 1;

    const trials = activeTrials().map((d) => ({ ...d, left: daysLeft(d.trialEnd) })).sort((x, y) => x.left - y.left);
    const trialMax = Math.max(30, Math.ceil(Math.max(0, ...trials.map((t) => t.left)) / 10) * 10);

    return (
        <Band id="e-kaynaklar" label="Elektronik kaynaklar">
            <div ref={scope}>
                <div className="flex flex-wrap items-end justify-between gap-4" data-rise>
                    <div className="max-w-[40rem]">
                        <h2 className="kun-title">Elektronik kaynaklar.</h2>
                        {/* "Kütüphanelerimiz" page */}
                        <p className="kun-lead mt-3">Öğrencilerimiz ve öğretim elemanlarımız veri tabanlarından 7 gün 24 saat yararlanabilmektedir.</p>
                    </div>
                    <Link to="/elektronik-kaynaklar" className="kun-more">Tüm kaynaklar</Link>
                </div>

                <div className="mt-12 grid gap-4 lg:grid-cols-12">
                    {/* Headline figure */}
                    <div className="lg:col-span-4 flex flex-col justify-between gap-10 rounded-[2rem] bg-[#f4efe7] p-7 md:p-9 text-[#2a2725]" data-rise>
                        <div>
                            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[#6b6259]">Erişiminizdeki kaynaklar</p>
                            <p className="mt-3 text-[length:var(--fs-figure)] font-medium leading-[0.85] tracking-[-0.04em]">{total}</p>
                            <p className="mt-3 text-[1.05rem] leading-snug">elektronik kaynak, {cats.length} kategoride</p>
                        </div>
                        <dl className="grid grid-cols-2 gap-4 border-t border-[#2a2725]/15 pt-6">
                            <div>
                                <dt className="text-[0.75rem] text-[#6b6259]">Erişim</dt>
                                <dd className="mt-1 text-[1.6rem] font-medium leading-none tracking-tight">7/24</dd>
                            </div>
                            <div>
                                <dt className="text-[0.75rem] text-[#6b6259]">Etkin deneme</dt>
                                <dd className="mt-1 text-[1.6rem] font-medium leading-none tracking-tight">{trials.length}</dd>
                            </div>
                        </dl>
                        <Link to="/yerleske-disi-erisim" className="group inline-flex items-center justify-between gap-3 rounded-full bg-[#2a2725] pl-5 pr-1.5 py-1.5 text-[0.9rem] text-[#f4efe7]">
                            Yerleşke dışından erişin
                            <MdArrowOutward aria-hidden="true" className="w-8 h-8 rounded-full bg-[#f4efe7] p-1.5 text-[#2a2725] transition-transform duration-500 group-hover:rotate-45" />
                        </Link>
                    </div>

                    {/* Categories */}
                    <figure className="lg:col-span-8 rounded-[2rem] border border-[#2f2c29] p-7 md:p-9" data-rise>
                        <figcaption className="flex flex-wrap items-baseline justify-between gap-2">
                            <span className="text-[1.15rem] font-semibold tracking-tight text-[#f4efe7]">Kategorilere göre kaynak sayısı</span>
                            <span className="text-[0.8rem] text-[#8a8073]">Toplam {total}</span>
                        </figcaption>
                        <ul data-bars className="mt-6">
                            {cats.map((c) => (
                                <BarRow key={c.type} to={c.to} label={c.label} value={c.n} max={catMax} valueText={c.n}
                                    hint={`%${Math.round((c.n / total) * 100)}`} />
                            ))}
                        </ul>
                    </figure>

                    {/* Trials */}
                    {trials.length > 0 && (
                        <figure className="lg:col-span-12 rounded-[2rem] border border-[#2f2c29] p-7 md:p-9" data-rise>
                            <figcaption className="flex flex-wrap items-baseline justify-between gap-3">
                                <span>
                                    <span className="block text-[1.15rem] font-semibold tracking-tight text-[#f4efe7]">Şu an deneme erişiminde</span>
                                    <span className="block mt-1 text-[0.85rem] text-[#9c9286]">Deneme süresi bitmeden inceleyin: çubuk, kalan gün sayısını gösterir.</span>
                                </span>
                                <Link to={DIRECTORY_ROUTES.deneme} className="kun-more">Deneme erişimli veri tabanları</Link>
                            </figcaption>
                            <ul data-bars className="mt-6 grid gap-x-12 lg:grid-cols-2 lg:grid-flow-col" style={{ gridTemplateRows: `repeat(${Math.ceil(trials.length / 2)}, auto)` }}>
                                {trials.map((t) => (
                                    <BarRow key={t.id ?? t.name} to={DIRECTORY_ROUTES.deneme} label={t.name} value={t.left} max={trialMax}
                                        valueText={t.left === 0 ? "Bugün" : `${t.left} gün`} hint={formatDate(t.trialEnd)} labelCol="sm:grid-cols-[11rem_1fr]" />
                                ))}
                            </ul>
                        </figure>
                    )}
                </div>
            </div>
        </Band>
    );
};

// ---------------------------------------------------------------- 6. Libraries rail (Apple card carousel)
const PHOTOS = {
    "merkez-kutuphane": ["media/site/merkez-kutuphane.jpg", "Merkez Kütüphane: taş tonozlu salonda kitap rafları"],
    "sosyal-bilimler-kutuphanesi": ["media/site/sosyal-bilimler-kutuphanesi.jpg", "Sosyal Bilimler Kütüphanesi: kitap rafları"],
    "fen-bilimleri-kutuphanesi": ["media/site/fen-bilimleri-kutuphanesi.jpg", "Fen Bilimleri Kütüphanesi: iki katlı okuma salonu"],
};

export const LibrariesRail = () => {
    const rail = useRef(null);
    const scroll = (dir) => rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: "smooth" });
    const cards = libraries.items.map((l) => ({ ...l, hours: LIBRARY_HOURS.find((h) => h.name === l.name), photo: PHOTOS[l.slug] }));

    return (
        <section aria-label="Kütüphanelerimiz" className="bg-[#f5f5f7] py-20 md:py-28 overflow-hidden">
            <div className="kun-wrap flex flex-wrap items-end justify-between gap-4" data-rise>
                <h2 className="kun-title">Kütüphanelerimiz.</h2>
                <div className="flex items-center gap-4">
                    <Link to="/kutuphanelerimiz" className="kun-more">Tümünü görün</Link>
                    <div className="hidden md:flex gap-2">
                        <button type="button" aria-label="Önceki" onClick={() => scroll(-1)} className="w-9 h-9 rounded-full bg-[#2a2725] hover:bg-[#33302d] inline-flex items-center justify-center"><MdChevronLeft aria-hidden="true" className="w-5 h-5" /></button>
                        <button type="button" aria-label="Sonraki" onClick={() => scroll(1)} className="w-9 h-9 rounded-full bg-[#2a2725] hover:bg-[#33302d] inline-flex items-center justify-center"><MdChevronRight aria-hidden="true" className="w-5 h-5" /></button>
                    </div>
                </div>
            </div>
            <ul ref={rail} className="kun-scroller mt-8 flex gap-4 overflow-x-auto pb-4 px-6 md:px-12 xl:px-[max(4rem,calc((100vw_-_1280px)/2_+_4rem))]" data-lenis-prevent-wheel>
                {cards.map((l) => {
                    const st = statusNow(l.hours?.schedule);
                    return (
                        <li key={l.name} className="shrink-0 w-[82vw] sm:w-[400px]">
                            <Link to={`/kutuphanelerimiz#${l.slug}`} className="group relative block h-[480px] md:h-[540px] rounded-[2rem] overflow-hidden bg-[#2a2725]">
                                {l.photo && <img src={media(l.photo[0])} alt={l.photo[1]} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />}
                                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/0 to-black/45" />
                                <span className="absolute top-0 inset-x-0 p-6 text-white">
                                    <span className="block text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-white/80">{l.hours?.campus} Yerleşkesi</span>
                                    <span className="block mt-1.5 text-[1.6rem] font-semibold tracking-tight leading-tight">{l.name}</span>
                                </span>
                                <span className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between gap-3 text-white">
                                    <span className="text-[0.85rem] text-white/90 max-w-[16rem]">{l.paragraphs.at(-1)}</span>
                                    {st && <span className="shrink-0 rounded-full bg-white/90 text-[#f4efe7] px-3 py-1 text-[0.75rem] font-medium">{st.open ? "Şu an açık" : "Şu an kapalı"}</span>}
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

// ---------------------------------------------------------------- 7. Open science (Harvard "Advancing Open Access")
export const OpenScience = () => {
    const links = [
        ...NAV_GROUPS.find((g) => g.title === "Açık Arşiv").items.filter((i) => i.label !== "İntihal Programları"),
        ...NAV_GROUPS.find((g) => g.title === "Açık Erişim").items,
    ];
    return (
        <Band id="acik-bilim" label="Açık bilim">
            <div className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-5" data-rise>
                    <h2 className="kun-title">Açık bilim ve açık arşiv.</h2>
                    {/* "Açık Bilim ve Kütüphane Komisyonu" page, first sentence */}
                    <p className="kun-lead mt-4">Kapadokya Üniversitesi Açık Bilim ve Kütüphane Komisyonu, Kapadokya Üniversitesi mensuplarının araştırma verilerinin ve akademik çalışmalarının, açık erişime sunulmasına ilişkin usul ve esasları düzenlemek ve açık erişimle, araştırma verileri ile akademik çalışmaların görünürlüğünü, izlenebilirliğini ve etkinliğini artırmayı amaçlamaktadır.</p>
                </div>
                <ul className="lg:col-span-7 border-t border-[#4f4b48]">
                    {links.map((l) => (
                        <li key={l.label} data-rise className="border-b border-[#4f4b48]">
                            <SmartLink to={l.to} href={l.href} className="group flex items-center justify-between gap-6 py-4">
                                <span className="text-[1.05rem] font-medium tracking-tight text-[#f4efe7] group-hover:text-[var(--kun-accent)]">{l.label}</span>
                                {l.href ? <MdArrowOutward aria-hidden="true" className="shrink-0 text-[#8a8073]" /> : <MdChevronRight aria-hidden="true" className="shrink-0 w-6 h-6 text-[#8a8073]" />}
                            </SmartLink>
                        </li>
                    ))}
                </ul>
            </div>
        </Band>
    );
};

// ---------------------------------------------------------------- 8. Help (Harvard "Ask a Librarian")
export const AskLibrarian = () => (
    <Band tone="grey" id="yardim" label="Yardım">
        <div className="max-w-[40rem] mx-auto text-center" data-rise>
            <h2 className="kun-headline">Yardıma mı ihtiyacınız var?</h2>
            <p className="kun-lead mt-4">Sorularınız için {CONTACT.unit}’na e-posta veya telefonla ulaşabilirsiniz.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href={`mailto:${CONTACT.email}`} className="kun-btn">E-posta gönderin</a>
                <a href={`tel:${CONTACT.phoneHref}`} className="kun-btn kun-btn-quiet">0384 353 50 09</a>
            </div>
            <Link to="/iletisim" className="kun-more mt-6">Tüm iletişim bilgileri</Link>
        </div>
    </Band>
);
