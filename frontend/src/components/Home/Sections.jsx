import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MdChevronRight, MdChevronLeft, MdArrowOutward } from "react-icons/md";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SearchBox from "../Search/SearchBox";
import SmartLink from "../Buttons/SmartLink";
import {
    CONTACT, DIRECTORY_LABELS, DIRECTORY_ROUTES, SEARCH, activeTrials, announcements, announcementStatus,
    countByType, daysLeft, formatDate, libraries, media,
} from "../../lib/content";
import { LIBRARY_HOURS, statusNow } from "../../lib/hours";
import { NAV_GROUPS } from "../../data/nav";

gsap.registerPlugin(ScrollTrigger);

/** Shared section frame: Apple-like rhythm, alternating white / light grey. */
const Band = ({ tone = "white", id, label, children }) => (
    <section id={id} aria-label={label} className={tone === "grey" ? "bg-[#f5f5f7]" : "bg-white"}>
        <div className="kun-wrap py-20 md:py-28" data-band>{children}</div>
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


// ---------------------------------------------------------------- 1. Search
export const IntroSearch = () => (
    <Band id="tarama" label="Kaynak tarama">
        <div className="max-w-[46rem] mx-auto text-center" data-rise>
            <h2 className="kun-headline">Aradığınızı bulun.</h2>
            <p className="kun-lead mt-4">{SEARCH.ebsco.text}</p>
        </div>
        <div className="max-w-[46rem] mx-auto mt-10" data-rise>
            <SearchBox />
        </div>
    </Band>
);

// ---------------------------------------------------------------- 2. Today
const dayFmt = new Intl.DateTimeFormat("tr-TR", { weekday: "long", day: "numeric", month: "long" });

export const TodayHours = () => {
    const [now, setNow] = useState(() => new Date());
    useEffect(() => { const t = setInterval(() => setNow(new Date()), 60000); return () => clearInterval(t); }, []);

    return (
        <Band tone="grey" id="bugun" label="Bugün açık kütüphaneler">
            <div className="flex flex-wrap items-end justify-between gap-4" data-rise>
                <div>
                    <p className="text-[0.95rem] text-[#6e6e73] capitalize">{dayFmt.format(now)}</p>
                    <h2 className="kun-title mt-1">Bugün kütüphanelerimiz</h2>
                </div>
                <Link to="/kutuphanelerimiz" className="kun-more">Kütüphanelerimiz</Link>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {LIBRARY_HOURS.map((l) => {
                    const st = statusNow(l.schedule, now);
                    const inner = (
                        <>
                            <span className="text-[0.8rem] text-[#6e6e73]">{l.campus}</span>
                            <span className="block mt-1 text-[1.15rem] font-semibold tracking-tight text-[#1d1d1f] leading-snug">{l.name}</span>
                            <span className="mt-auto pt-6 flex items-center gap-2 text-[0.9rem]">
                                <span aria-hidden="true" className={`w-2 h-2 rounded-full ${st?.open ? "bg-[#1f9d55]" : "bg-[#b0b0b5]"}`} />
                                <span className={st?.open ? "text-[#1d7a45] font-medium" : "text-[#6e6e73]"}>{st?.label ?? "Bilgi yok"}</span>
                            </span>
                            <span className="block mt-1 text-[0.8rem] text-[#6e6e73]">{st?.today ? `Bugün ${st.today[0]} – ${st.today[1]}` : "Bugün kapalı"}</span>
                        </>
                    );
                    return (
                        <li key={l.name} data-rise>
                            {l.slug
                                ? <Link to={`/kutuphanelerimiz#${l.slug}`} className="kun-tile !bg-white flex flex-col h-full p-6">{inner}</Link>
                                : <div className="kun-tile !bg-white flex flex-col h-full p-6">{inner}</div>}
                        </li>
                    );
                })}
            </ul>
            <p className="mt-4 text-[0.75rem] text-[#86868b]" data-rise>Saatler “Genel Kurallar” sayfasındaki çalışma saatlerinden hesaplanır.</p>
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
            <ul className="lg:col-span-7 border-t border-[#d2d2d7]">
                {EXPLORE.map((e) => (
                    <li key={e.to} data-rise className="border-b border-[#d2d2d7]">
                        <Link to={e.to} className="group flex items-center justify-between gap-6 py-5">
                            <span className="min-w-0">
                                <span className="block text-[1.15rem] font-semibold tracking-tight text-[#1d1d1f] group-hover:text-[var(--kun-accent)]">{e.title}</span>
                                <span className="block mt-1 text-[0.9rem] text-[#6e6e73] line-clamp-2">{e.sub}</span>
                            </span>
                            <MdChevronRight aria-hidden="true" className="shrink-0 w-6 h-6 text-[#86868b] group-hover:text-[var(--kun-accent)] group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </Band>
);

// ---------------------------------------------------------------- 4. Newsroom
export const Newsroom = () => {
    const items = announcements.slice(0, 6);
    return (
        <Band tone="grey" id="duyurular" label="Duyurular">
            <div className="flex flex-wrap items-end justify-between gap-4" data-rise>
                <h2 className="kun-title">Duyurular</h2>
                <Link to="/duyurular" className="kun-more">Tüm duyurular</Link>
            </div>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((a, i) => {
                    const status = announcementStatus(a);
                    const label = status === "active" ? `Deneme erişimi · ${daysLeft(a.trialEnd)} gün kaldı` : a.isTrial ? "Deneme erişimi" : "Duyuru";
                    return (
                        <li key={a.slug} data-rise className={i >= 4 ? "hidden lg:block" : ""}>
                            <Link to={`/duyurular/${a.slug}`} className="kun-tile !bg-white group flex h-full flex-col overflow-hidden">
                                <span className="relative block aspect-[16/10] bg-[#fbfbfd] border-b border-[#f0f0f2]">
                                    {a.image && <img src={media(a.image)} alt="" loading="lazy" className="absolute inset-0 m-auto max-w-[78%] max-h-[72%] object-contain" />}
                                </span>
                                <span className="flex flex-1 flex-col p-6">
                                    <span className={`text-[0.72rem] font-semibold uppercase tracking-[0.06em] ${status === "active" ? "text-[var(--kun-accent)]" : "text-[#6e6e73]"}`}>{label}</span>
                                    <span className="mt-2 text-[1.15rem] font-semibold leading-snug tracking-tight text-[#1d1d1f] line-clamp-3">{a.title}</span>
                                    <time dateTime={a.date} className="mt-auto pt-4 text-[0.82rem] text-[#6e6e73]">{formatDate(a.date)}</time>
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </Band>
    );
};

// ---------------------------------------------------------------- 5. Resources by the numbers
export const ResourceStats = () => {
    const tiles = Object.keys(DIRECTORY_LABELS).map((t) => ({
        type: t,
        label: DIRECTORY_LABELS[t],
        to: DIRECTORY_ROUTES[t],
        n: t === "deneme" ? activeTrials().length : countByType(t),
        unit: t === "deneme" ? "etkin deneme erişimi" : "kaynak",
    }));
    return (
        <Band id="e-kaynaklar" label="Elektronik kaynaklar">
            <div className="flex flex-wrap items-end justify-between gap-4" data-rise>
                <div className="max-w-[40rem]">
                    <h2 className="kun-title">Elektronik kaynaklar.</h2>
                    {/* "Kütüphanelerimiz" page */}
                    <p className="kun-lead mt-3">Öğrencilerimiz ve öğretim elemanlarımız veri tabanlarından 7 gün 24 saat yararlanabilmektedir.</p>
                </div>
                <Link to="/elektronik-kaynaklar" className="kun-more">Tüm kaynaklar</Link>
            </div>
            <ul className="mt-8 grid gap-3 grid-cols-2 lg:grid-cols-4">
                {tiles.map((t, i) => (
                    <li key={t.type} data-rise className={i < 2 ? "col-span-2 lg:col-span-2" : ""}>
                        <Link to={t.to} className="kun-tile group flex h-full flex-col justify-between gap-8 p-6 md:p-7">
                            <span className="text-[1rem] font-semibold tracking-tight text-[#1d1d1f]">{t.label}</span>
                            <span>
                                <span className={`block font-semibold tracking-tight text-[#1d1d1f] leading-none ${i < 2 ? "text-6xl md:text-7xl" : "text-5xl"}`}>{t.n}</span>
                                <span className="mt-2 flex items-center justify-between gap-2 text-[0.85rem] text-[#6e6e73]">
                                    {t.unit}<MdChevronRight aria-hidden="true" className="w-5 h-5 text-[#86868b] group-hover:text-[var(--kun-accent)]" />
                                </span>
                            </span>
                        </Link>
                    </li>
                ))}
                <li data-rise>
                    <Link to="/yerleske-disi-erisim" className="kun-tile !bg-[#1d1d1f] group flex h-full flex-col justify-between gap-8 p-6 md:p-7 text-white">
                        <span className="text-[1rem] font-semibold tracking-tight">Yerleşke Dışı Erişim</span>
                        <span className="flex items-center justify-between gap-2 text-[0.85rem] text-white/70">Kılavuzlar<MdChevronRight aria-hidden="true" className="w-5 h-5" /></span>
                    </Link>
                </li>
            </ul>
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
                        <button type="button" aria-label="Önceki" onClick={() => scroll(-1)} className="w-9 h-9 rounded-full bg-[#e8e8ed] hover:bg-[#dcdce1] inline-flex items-center justify-center"><MdChevronLeft aria-hidden="true" className="w-5 h-5" /></button>
                        <button type="button" aria-label="Sonraki" onClick={() => scroll(1)} className="w-9 h-9 rounded-full bg-[#e8e8ed] hover:bg-[#dcdce1] inline-flex items-center justify-center"><MdChevronRight aria-hidden="true" className="w-5 h-5" /></button>
                    </div>
                </div>
            </div>
            <ul ref={rail} className="kun-scroller mt-8 flex gap-4 overflow-x-auto pb-4 px-6 md:px-[max(2.5rem,calc((100vw_-_1120px)/2_+_2.5rem))]" data-lenis-prevent-wheel>
                {cards.map((l) => {
                    const st = statusNow(l.hours?.schedule);
                    return (
                        <li key={l.name} className="shrink-0 w-[82vw] sm:w-[400px]">
                            <Link to={`/kutuphanelerimiz#${l.slug}`} className="group relative block h-[480px] md:h-[540px] rounded-[22px] overflow-hidden bg-[#d2d2d7]">
                                {l.photo && <img src={media(l.photo[0])} alt={l.photo[1]} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />}
                                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/0 to-black/45" />
                                <span className="absolute top-0 inset-x-0 p-6 text-white">
                                    <span className="block text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-white/80">{l.hours?.campus} Yerleşkesi</span>
                                    <span className="block mt-1.5 text-[1.6rem] font-semibold tracking-tight leading-tight">{l.name}</span>
                                </span>
                                <span className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between gap-3 text-white">
                                    <span className="text-[0.85rem] text-white/90 max-w-[16rem]">{l.paragraphs.at(-1)}</span>
                                    {st && <span className="shrink-0 rounded-full bg-white/90 text-[#1d1d1f] px-3 py-1 text-[0.75rem] font-medium">{st.open ? "Şu an açık" : "Şu an kapalı"}</span>}
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
                <ul className="lg:col-span-7 border-t border-[#d2d2d7]">
                    {links.map((l) => (
                        <li key={l.label} data-rise className="border-b border-[#d2d2d7]">
                            <SmartLink to={l.to} href={l.href} className="group flex items-center justify-between gap-6 py-4">
                                <span className="text-[1.05rem] font-medium tracking-tight text-[#1d1d1f] group-hover:text-[var(--kun-accent)]">{l.label}</span>
                                {l.href ? <MdArrowOutward aria-hidden="true" className="shrink-0 text-[#86868b]" /> : <MdChevronRight aria-hidden="true" className="shrink-0 w-6 h-6 text-[#86868b]" />}
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
