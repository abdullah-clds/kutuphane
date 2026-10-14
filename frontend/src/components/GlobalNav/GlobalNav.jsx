import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdSearch, MdClose, MdMenu, MdArrowOutward, MdChevronRight } from "react-icons/md";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import SmartLink from "../Buttons/SmartLink";
import { NAV_GROUPS } from "../../data/nav";
import { QUICK_LINKS, SEARCH, media } from "../../lib/content";
import { searchSite } from "../../lib/siteSearch";

const SHORT = {
    "Kütüphane Hakkında": "Kütüphane",
    "Elektronik Kaynaklar": "Kaynaklar",
    "Açık Arşiv": "Açık Arşiv",
    "Açık Erişim": "Açık Erişim",
    "Araştırma": "Araştırma",
};

const SCOPES = [
    { key: "site", label: "Bu sitede" },
    { key: "koha", label: "Katalog" },
    { key: "ebsco", label: "Tüm kaynaklar" },
];

const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Search panel: site results inline; catalogue and discovery submit the original forms (new tab). */
function SearchFlyout({ onClose }) {
    const [scope, setScope] = useState("site");
    const [q, setQ] = useState("");
    const inputId = useId();
    const navigate = useNavigate();
    const results = scope === "site" ? searchSite(q) : [];
    const ext = SEARCH[scope];

    const submit = (e) => {
        if (scope !== "site") return; // real GET form to KOHA / EBSCO
        e.preventDefault();
        const first = results[0];
        if (first?.to) { navigate(first.to); onClose(); }
    };

    return (
        <div className="kun-wrap py-8 md:py-10">
            <form onSubmit={submit} action={ext?.action} method="GET" target={scope === "site" ? undefined : "_blank"} role="search">
                {ext && Object.entries(ext.hidden).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}
                <label htmlFor={inputId} className="sr-only">Arama</label>
                <div className="flex items-center gap-3 border-b border-[#d2d2d7] pb-3">
                    <MdSearch aria-hidden="true" className="w-7 h-7 text-[#6e6e73] shrink-0" />
                    <input
                        id={inputId}
                        name="q"
                        autoFocus
                        autoComplete="off"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder={scope === "site" ? "Sitede arayın: sayfa, duyuru, veri tabanı…" : ext.placeholder}
                        className="flex-1 min-w-0 bg-transparent text-2xl md:text-[1.75rem] font-semibold tracking-tight text-[#1d1d1f] placeholder:text-[#86868b] outline-none"
                    />
                    {scope !== "site" && <button type="submit" className="kun-btn">Ara</button>}
                </div>
            </form>

            <div role="radiogroup" aria-label="Arama kapsamı" className="mt-4 flex flex-wrap gap-2">
                {SCOPES.map((s) => (
                    <button key={s.key} type="button" role="radio" aria-checked={scope === s.key} aria-pressed={scope === s.key} onClick={() => setScope(s.key)} className="kun-chip">
                        {s.label}
                    </button>
                ))}
            </div>

            {scope === "site" && q.trim().length >= 2 && (
                <div className="mt-6" aria-live="polite">
                    <p className="text-[0.75rem] text-[#6e6e73]">{results.length ? "Sonuçlar" : "Sonuç bulunamadı. Katalogda veya tüm kaynaklarda aramayı deneyin."}</p>
                    <ul className="mt-2">
                        {results.map((r) => (
                            <li key={`${r.kind}-${r.title}-${r.to || r.href}`}>
                                <SmartLink to={r.to} href={r.href} onClick={onClose} className="group flex items-center justify-between gap-4 py-2.5 border-b border-[#f0f0f2]">
                                    <span className="min-w-0">
                                        <span className="block text-[1rem] text-[#1d1d1f] group-hover:text-[var(--kun-accent)] truncate">{r.title}</span>
                                        <span className="block text-[0.75rem] text-[#6e6e73]">{r.kind}{r.meta ? ` · ${r.meta}` : ""}</span>
                                    </span>
                                    <MdChevronRight aria-hidden="true" className="shrink-0 text-[#86868b]" />
                                </SmartLink>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {(scope !== "site" || q.trim().length < 2) && (
                <div className="mt-8 grid gap-8 md:grid-cols-2">
                    {scope !== "site" && <p className="text-[0.95rem] text-[#6e6e73] max-w-[30rem]">{ext.text} <span className="block mt-1 text-[0.8rem]">{ext.system} · sonuçlar yeni sekmede açılır</span></p>}
                    <div className={scope === "site" ? "md:col-span-2" : ""}>
                        <p className="text-[0.75rem] text-[#6e6e73]">Diğer arama araçları</p>
                        <ul className="mt-3 grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-4">
                            {QUICK_LINKS.map((l) => (
                                <li key={l.label}>
                                    <SmartLink to={l.to} href={l.href} onClick={onClose} className="inline-flex items-center gap-1 py-1.5 text-[0.95rem] text-[#1d1d1f] hover:text-[var(--kun-accent)]">
                                        {l.label}{l.href && <MdArrowOutward aria-hidden="true" className="text-[0.8rem] text-[#86868b]" />}
                                    </SmartLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

/** Menu panel for one group: primary links large (Apple flyout), the rest of the site small. */
function GroupFlyout({ group, onClose }) {
    return (
        <div className="kun-wrap py-10 grid gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
                <p className="text-[0.75rem] text-[#6e6e73]">{group.title}</p>
                <ul className="mt-3 flex flex-col gap-1.5">
                    {group.items.map((i) => (
                        <li key={i.label} data-fly>
                            <SmartLink to={i.to} href={i.href} onClick={onClose} className="inline-flex items-center gap-1.5 text-[1.5rem] md:text-[1.6rem] font-semibold tracking-tight leading-tight text-[#1d1d1f] hover:text-[var(--kun-accent)]">
                                {i.label}{i.href && <MdArrowOutward aria-hidden="true" className="text-[1rem] text-[#86868b]" />}
                            </SmartLink>
                        </li>
                    ))}
                </ul>
                {group.to && <Link to={group.to} onClick={onClose} className="kun-more mt-5">{group.title} sayfası</Link>}
            </div>
            <div className="md:col-span-5" data-fly>
                <p className="text-[0.75rem] text-[#6e6e73]">Hızlı bağlantılar</p>
                <ul className="mt-3 flex flex-col gap-2 text-[0.9rem]">
                    <li><Link to="/duyurular" onClick={onClose} className="hover:text-[var(--kun-accent)]">Duyurular</Link></li>
                    <li><Link to="/kutuphanelerimiz" onClick={onClose} className="hover:text-[var(--kun-accent)]">Kütüphanelerimiz ve çalışma saatleri</Link></li>
                    <li><Link to="/yerleske-disi-erisim" onClick={onClose} className="hover:text-[var(--kun-accent)]">Yerleşke Dışı Erişim</Link></li>
                    <li><Link to="/iletisim" onClick={onClose} className="hover:text-[var(--kun-accent)]">İletişim</Link></li>
                </ul>
            </div>
        </div>
    );
}

const GlobalNav = () => {
    const [open, setOpen] = useState(null); // group title | "search" | "mobile" | null
    const [mobileGroup, setMobileGroup] = useState(null);
    const panelRef = useRef(null);
    const barRef = useRef(null);
    const hoverTimer = useRef(null);
    const { pathname } = useLocation();

    const close = () => { setOpen(null); setMobileGroup(null); };

    useEffect(() => { close(); }, [pathname]);

    // "/" opens search, Esc closes any panel.
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") close();
            if (e.key === "/" && !/input|textarea/i.test(document.activeElement?.tagName)) { e.preventDefault(); setOpen("search"); }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // Panel entrance + pause the page while the full mobile menu is open.
    useEffect(() => {
        const smoother = ScrollSmoother.get();
        smoother?.paused(open === "mobile");
        if (!open || !panelRef.current || reduce()) return;
        gsap.fromTo(panelRef.current, { autoAlpha: 0, y: -8 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" });
        gsap.fromTo(panelRef.current.querySelectorAll("[data-fly]"), { autoAlpha: 0, y: -6 }, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.025, ease: "power2.out", delay: 0.05 });
    }, [open]);

    const hoverOpen = (title) => {
        if (!window.matchMedia("(hover: hover)").matches) return;
        clearTimeout(hoverTimer.current);
        hoverTimer.current = setTimeout(() => setOpen(title), 120);
    };
    const hoverLeave = () => {
        clearTimeout(hoverTimer.current);
        if (open && open !== "search") hoverTimer.current = setTimeout(() => setOpen(null), 220);
    };

    const group = NAV_GROUPS.find((g) => g.title === open);

    return (
        <>
            {/* Dim + blur the page under an open panel */}
            <div aria-hidden="true" onClick={close} className={`fixed inset-0 z-[47] bg-black/20 backdrop-blur-[6px] transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`} />

            <header ref={barRef} className="fixed top-0 inset-x-0 z-[49]" onMouseLeave={hoverLeave} onMouseEnter={() => clearTimeout(hoverTimer.current)}>
                <div className="bg-white/80 backdrop-blur-xl backdrop-saturate-150 border-b border-black/[0.08]">
                    <nav aria-label="Ana menü" className="mx-auto max-w-[1120px] h-12 md:h-14 px-4 md:px-6 flex items-center justify-between gap-4">
                        <Link to="/" aria-label="Kapadokya Üniversitesi Kütüphanesi, anasayfa" className="flex items-center gap-2.5 shrink-0">
                            <img src={media("media/site/kapadokya-logo.png")} alt="" className="h-7 md:h-8 w-auto" width="560" height="152" />
                            <span className="hidden sm:block h-5 w-px bg-[#d2d2d7]" aria-hidden="true" />
                            <span className="hidden sm:block text-[0.95rem] font-semibold tracking-tight text-[#1d1d1f]">Kütüphane</span>
                        </Link>

                        <ul className="hidden lg:flex items-center gap-1 text-[0.82rem] text-[#1d1d1f]/85">
                            {NAV_GROUPS.map((g) => (
                                <li key={g.title} onMouseEnter={() => hoverOpen(g.title)}>
                                    <button
                                        type="button"
                                        aria-expanded={open === g.title}
                                        onClick={() => setOpen(open === g.title ? null : g.title)}
                                        className={`px-3 py-2 rounded-full transition-colors hover:text-[#1d1d1f] ${open === g.title ? "text-[#1d1d1f] bg-black/[0.04]" : ""}`}
                                    >
                                        {SHORT[g.title]}
                                    </button>
                                </li>
                            ))}
                            <li onMouseEnter={hoverLeave}><Link to="/duyurular" aria-current={pathname.startsWith("/duyurular") ? "page" : undefined} className="px-3 py-2 rounded-full hover:text-[#1d1d1f] aria-[current=page]:text-[#1d1d1f] aria-[current=page]:font-medium">Duyurular</Link></li>
                            <li onMouseEnter={hoverLeave}><Link to="/iletisim" aria-current={pathname === "/iletisim" ? "page" : undefined} className="px-3 py-2 rounded-full hover:text-[#1d1d1f] aria-[current=page]:text-[#1d1d1f] aria-[current=page]:font-medium">İletişim</Link></li>
                        </ul>

                        <div className="flex items-center gap-1">
                            <a href={SEARCH.koha.home} target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex items-center gap-1 px-3 py-2 text-[0.82rem] text-[#1d1d1f]/85 hover:text-[#1d1d1f]">
                                Katalog <MdArrowOutward aria-hidden="true" className="text-[0.75rem]" /><span className="sr-only"> (yeni sekmede açılır)</span>
                            </a>
                            <button type="button" aria-label="Ara" aria-expanded={open === "search"} onClick={() => setOpen(open === "search" ? null : "search")} className="w-10 h-10 inline-flex items-center justify-center rounded-full hover:bg-black/[0.05]">
                                {open === "search" ? <MdClose aria-hidden="true" className="w-5 h-5" /> : <MdSearch aria-hidden="true" className="w-5 h-5" />}
                            </button>
                            <button type="button" aria-label="Menü" aria-expanded={open === "mobile"} onClick={() => setOpen(open === "mobile" ? null : "mobile")} className="lg:hidden w-10 h-10 inline-flex items-center justify-center rounded-full hover:bg-black/[0.05]">
                                {open === "mobile" ? <MdClose aria-hidden="true" className="w-5 h-5" /> : <MdMenu aria-hidden="true" className="w-5 h-5" />}
                            </button>
                        </div>
                    </nav>
                </div>

                {open && open !== "mobile" && (
                    <div ref={panelRef} className="bg-white/95 backdrop-blur-xl border-b border-black/[0.08] max-h-[calc(100dvh-3.5rem)] overflow-y-auto" data-lenis-prevent>
                        {open === "search" ? <SearchFlyout onClose={close} /> : group && <GroupFlyout group={group} onClose={close} />}
                    </div>
                )}

                {open === "mobile" && (
                    <div ref={panelRef} className="lg:hidden bg-white h-[calc(100dvh-3rem)] overflow-y-auto overscroll-contain" data-lenis-prevent>
                        <ul className="px-6 py-6">
                            {NAV_GROUPS.map((g) => (
                                <li key={g.title} data-fly className="border-b border-[#f0f0f2]">
                                    <button type="button" aria-expanded={mobileGroup === g.title} onClick={() => setMobileGroup(mobileGroup === g.title ? null : g.title)} className="w-full flex items-center justify-between py-4 text-[1.6rem] font-semibold tracking-tight text-[#1d1d1f]">
                                        {g.title}
                                        <MdChevronRight aria-hidden="true" className={`w-6 h-6 text-[#86868b] transition-transform ${mobileGroup === g.title ? "rotate-90" : ""}`} />
                                    </button>
                                    {mobileGroup === g.title && (
                                        <ul className="pb-4 flex flex-col gap-1">
                                            {g.items.map((i) => (
                                                <li key={i.label}>
                                                    <SmartLink to={i.to} href={i.href} onClick={close} className="block py-2 text-[1.05rem] text-[#1d1d1f]">{i.label}</SmartLink>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                            {[["Duyurular", "/duyurular"], ["İletişim", "/iletisim"]].map(([label, to]) => (
                                <li key={to} data-fly className="border-b border-[#f0f0f2]">
                                    <Link to={to} onClick={close} className="block py-4 text-[1.6rem] font-semibold tracking-tight text-[#1d1d1f]">{label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </header>
        </>
    );
};

export default GlobalNav;
