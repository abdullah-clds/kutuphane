import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import PageHero from "../../components/Page/PageHero";
import useReveal from "../../components/Page/useReveal";
import { FilterCard, FilterOption, FilterPanel, ResultsHeader, Segmented } from "../../components/Page/ListParts";
import { announcements, announcementStatus, daysLeft, formatDate, media } from "../../lib/content";

const FILTERS = [
    { key: "all", label: "Tümü", test: () => true },
    { key: "active", label: "Etkin denemeler", test: (a) => announcementStatus(a) === "active" },
    { key: "trial", label: "Tüm deneme erişimleri", test: (a) => a.isTrial },
    { key: "other", label: "Diğer duyurular", test: (a) => !a.isTrial },
];

const PAGE = 15;
const norm = (s) => s.toLocaleLowerCase("tr");
const monthShort = new Intl.DateTimeFormat("tr-TR", { month: "short" });
const asDate = (iso) => new Date(`${iso}T12:00:00`);
const cleanExcerpt = (t = "") => t.trim().replace(/\.?\s*(\.{3}|…)$/, "…");

const Row = ({ a }) => {
    const d = asDate(a.date);
    const status = announcementStatus(a);
    return (
        <li>
            <Link to={`/duyurular/${a.slug}`} className="group grid grid-cols-[3.5rem_1fr] sm:grid-cols-[4.5rem_1fr_auto] items-center gap-4 sm:gap-6 rounded-[1.5rem] px-3 sm:px-5 py-5 transition-colors hover:bg-[#1f1d1c]">
                <span className="text-center leading-none">
                    <span className="block text-[2rem] sm:text-[2.3rem] font-medium tracking-tight text-[#f4efe7]">{String(d.getDate()).padStart(2, "0")}</span>
                    <span className="block mt-1 text-[0.7rem] uppercase tracking-[0.12em] text-[#8a8073]">{monthShort.format(d)} {d.getFullYear()}</span>
                </span>
                <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-2">
                        <span className={`text-[0.7rem] font-semibold uppercase tracking-[0.12em] ${status === "active" ? "text-[#9ad3a8]" : "text-[#8a8073]"}`}>
                            {a.isTrial ? "Deneme erişimi" : "Duyuru"}
                        </span>
                        {status === "active" && <span className="rounded-full bg-[#1f3a2a] px-2 py-0.5 text-[0.7rem] text-[#9ad3a8]">{daysLeft(a.trialEnd)} gün kaldı</span>}
                        {(status === "expired" || status === "archive") && <span className="rounded-full border border-[#38332f] px-2 py-0.5 text-[0.7rem] text-[#8a8073]">Sona erdi</span>}
                    </span>
                    <span className="mt-1.5 block text-[1.08rem] sm:text-[1.2rem] font-medium leading-snug tracking-tight text-[#f4efe7] [text-wrap:pretty]">{a.title}</span>
                    {a.excerpt && <span className="mt-1 block text-[0.88rem] leading-relaxed text-[#8a8073] line-clamp-2">{cleanExcerpt(a.excerpt)}</span>}
                </span>
                <span className="hidden sm:flex items-center gap-4">
                    {a.image && (
                        <span className="relative w-16 h-16 rounded-2xl bg-[#f4efe7] overflow-hidden">
                            <img src={media(a.image)} alt="" loading="lazy" className="absolute inset-0 m-auto max-w-[78%] max-h-[78%] object-contain mix-blend-multiply" />
                        </span>
                    )}
                    <MdArrowOutward aria-hidden="true" className="w-9 h-9 p-2 rounded-full border border-[#38332f] text-[#b1a696] transition-all duration-500 group-hover:bg-[#f4efe7] group-hover:border-[#f4efe7] group-hover:text-[#2a2725] group-hover:rotate-45" />
                </span>
            </Link>
        </li>
    );
};

const AnnouncementsPage = () => {
    const scope = useRef(null);
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("all");
    const [year, setYear] = useState("all");
    const [order, setOrder] = useState("new");
    const [shown, setShown] = useState(PAGE);

    const years = useMemo(() => [...new Set(announcements.map((a) => a.date.slice(0, 4)))], []);
    const byType = FILTERS.find((f) => f.key === filter).test;

    const list = useMemo(() => {
        const q = norm(query.trim());
        const out = announcements.filter((a) =>
            byType(a) && (year === "all" || a.date.startsWith(year)) &&
            (!q || norm(a.title).includes(q) || norm(a.excerpt).includes(q))
        );
        return order === "new" ? out : [...out].reverse();
    }, [query, byType, year, order]);

    const set = (fn) => (v) => { fn(v); setShown(PAGE); };
    const reset = () => { setQuery(""); setFilter("all"); setYear("all"); setShown(PAGE); };
    const filtered = query || filter !== "all" || year !== "all";

    useReveal(scope, []);

    return (
        <div ref={scope}>
            <PageHero
                title="Duyurular"
                eyebrow="Kütüphaneden haberler"
                crumbs={[{ label: "Duyurular" }]}
                image="media/site/okuma-salonu-genis.jpg"
                imageAlt="Okuma salonunda çalışan öğrenciler"
                size="sm"
                aside={<>{announcements.length} duyuru · son duyuru {formatDate(announcements[0].date)}</>}
            />

            <section className="kun-wrap pb-28 grid gap-10 lg:grid-cols-12 lg:gap-12" aria-label="Duyuru listesi">
                <FilterPanel active={(filter !== "all") + (year !== "all")}>
                    <FilterCard title="Duyuru türü">
                        <div className="-mx-3 flex flex-col">
                            {FILTERS.map((f) => (
                                <FilterOption key={f.key} active={filter === f.key} onClick={() => set(setFilter)(f.key)} label={f.label}
                                    count={announcements.filter((a) => f.test(a) && (year === "all" || a.date.startsWith(year))).length} />
                            ))}
                        </div>
                    </FilterCard>
                    <FilterCard title="Yıl">
                        <div className="-mx-3 flex flex-col">
                            <FilterOption active={year === "all"} onClick={() => set(setYear)("all")} label="Tüm yıllar" count={announcements.filter(byType).length} />
                            {years.map((y) => (
                                <FilterOption key={y} active={year === y} onClick={() => set(setYear)(y)} label={y}
                                    count={announcements.filter((a) => byType(a) && a.date.startsWith(y)).length} />
                            ))}
                        </div>
                    </FilterCard>
                </FilterPanel>

                <div className="lg:col-span-9 min-w-0" data-reveal>
                    <ResultsHeader query={query} onQuery={set(setQuery)} placeholder="Duyurularda arayın…" label="Duyurularda ara"
                        count={list.length} noun="duyuru" filtered={filtered} onReset={reset}>
                        <Segmented label="Sıralama" value={order} onChange={set(setOrder)} options={[["new", "En yeni"], ["old", "En eski"]]} />
                    </ResultsHeader>

                    <ol className="mt-3 flex flex-col divide-y divide-[#2a2725]">
                        {list.slice(0, shown).map((a) => <Row key={a.slug} a={a} />)}
                    </ol>
                    {list.length === 0 && <p className="py-16 text-center text-[#b1a696]">Aramanızla eşleşen duyuru bulunamadı.</p>}
                    {shown < list.length && (
                        <div className="mt-8 flex flex-col items-center gap-2">
                            <button type="button" onClick={() => setShown((n) => n + PAGE)} className="rounded-full border border-[#38332f] px-6 py-2.5 text-[0.9rem] text-[#f4efe7] transition-colors hover:bg-[#f4efe7] hover:border-[#f4efe7] hover:text-[#2a2725]">
                                Daha fazla göster
                            </button>
                            <p className="text-[0.78rem] text-[#8a8073]">{list.length} duyurudan {Math.min(shown, list.length)} tanesi gösteriliyor</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default AnnouncementsPage;
