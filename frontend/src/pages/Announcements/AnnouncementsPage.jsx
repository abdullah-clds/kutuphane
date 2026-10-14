import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import PageHero from "../../components/Page/PageHero";
import useReveal from "../../components/Page/useReveal";
import { announcements, announcementStatus, formatDate, media, trialLabel } from "../../lib/content";

const FILTERS = [
    { key: "all", label: "Tümü" },
    { key: "trial", label: "Deneme erişimi" },
    { key: "active", label: "Etkin denemeler" },
    { key: "other", label: "Diğer duyurular" },
];

const norm = (s) => s.toLocaleLowerCase("tr");

const AnnouncementsPage = () => {
    const scope = useRef(null);
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("all");
    const [year, setYear] = useState("all");

    const years = useMemo(() => [...new Set(announcements.map((a) => a.date.slice(0, 4)))], []);

    const list = useMemo(() => {
        const q = norm(query.trim());
        return announcements.filter((a) => {
            const status = announcementStatus(a);
            if (filter === "trial" && !a.isTrial) return false;
            if (filter === "active" && status !== "active") return false;
            if (filter === "other" && a.isTrial) return false;
            if (year !== "all" && !a.date.startsWith(year)) return false;
            return !q || norm(a.title).includes(q) || norm(a.excerpt).includes(q);
        });
    }, [query, filter, year]);

    useReveal(scope, [list.length === announcements.length]);

    const pill = (active) =>
        `border-[1px] rounded-full px-4 py-1 text-sm transition-colors duration-300 ${active ? "bg-[#1d1d1f] border-[#1d1d1f] text-white" : "border-transparent bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]"}`;

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

            <section className="kun-wrap pb-28" aria-label="Duyuru listesi">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-[#d2d2d7] pb-8" data-reveal>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-wrap gap-2" role="group" aria-label="Duyuru türü">
                            {FILTERS.map((f) => (
                                <button key={f.key} type="button" aria-pressed={filter === f.key} onClick={() => setFilter(f.key)} className={pill(filter === f.key)}>{f.label}</button>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-2" role="group" aria-label="Yıl">
                            <button type="button" aria-pressed={year === "all"} onClick={() => setYear("all")} className={pill(year === "all")}>Tüm yıllar</button>
                            {years.map((y) => (
                                <button key={y} type="button" aria-pressed={year === y} onClick={() => setYear(y)} className={pill(year === y)}>{y}</button>
                            ))}
                        </div>
                    </div>
                    <label className="flex items-center gap-2 kun-field lg:w-[26rem]">
                        <span className="sr-only">Duyurularda ara</span>
                        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Duyurularda arayın..." className="flex-1 min-w-0 bg-transparent py-2.5 text-[#1d1d1f] placeholder:text-[#86868b] outline-none" />
                    </label>
                </div>

                <p className="text-[0.75rem] text-[#6e6e73] mt-5" aria-live="polite">{list.length} duyuru listeleniyor</p>

                <ol className="mt-4">
                    {list.map((a) => {
                        const status = announcementStatus(a);
                        return (
                            <li key={a.slug} className="border-b border-[#d2d2d7]">
                                <Link
                                    to={`/duyurular/${a.slug}`}
                                    className="group grid gap-3 md:gap-6 py-5 md:grid-cols-12 md:items-center"
                                >
                                    <time dateTime={a.date} className="md:col-span-2 text-[0.75rem] text-[#6e6e73]">{formatDate(a.date)}</time>
                                    <span className="md:col-span-7 flex items-center gap-5">
                                        {a.image && (
                                            <img src={media(a.image)} alt="" loading="lazy" className="hidden md:block w-20 h-14 shrink-0 rounded-xl object-contain bg-white border border-[#e8e8ed] p-1" />
                                        )}
                                        <span className="text-lg md:text-[1.3rem] font-semibold leading-[1.2] tracking-tight text-[#1d1d1f] group-hover:text-[#0a5cad] transition-colors [text-wrap:pretty]">{a.title}</span>
                                    </span>
                                    <span className="md:col-span-3 flex md:justify-end items-center gap-3">
                                        {status && (
                                            <span className={`rounded-full border px-3 py-1 text-[0.7rem] ${status === "active" ? "bg-[#e8f1fb] text-[#0a5cad] border-transparent" : "border-[#d2d2d7] text-[#6e6e73]"}`}>
                                                {trialLabel(status, a.trialEnd)}
                                            </span>
                                        )}
                                        <MdArrowOutward aria-hidden="true" className="hidden md:block w-9 h-9 p-2 rounded-full border border-[#d2d2d7] text-[#424245] group-hover:bg-[#1d1d1f] group-hover:text-white group-hover:rotate-45 transition-all duration-500" />
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ol>
                {list.length === 0 && <p className="py-16 text-[#424245]">Aramanızla eşleşen duyuru bulunamadı.</p>}
            </section>
        </div>
    );
};

export default AnnouncementsPage;
