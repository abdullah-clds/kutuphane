import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../../components/Page/PageHero";
import useReveal from "../../components/Page/useReveal";
import DatabaseRow from "./DatabaseRow";
import { DIRECTORY_LABELS, DIRECTORY_ROUTES, findPage, formatDate, trialStatus, visibleDatabases } from "../../lib/content";

const HERO = {
    all: "media/site/kutup-banner.jpg",
    abone: "media/site/kutup-banner.jpg",
    deneme: "media/site/okuma-salonu.jpg",
    acik: "media/site/iki-katli-salon.jpg",
    "e-kitap": "media/site/raflar-2.jpg",
    "e-dergi": "media/site/tas-kemer-raflar.jpg",
    "acik-ders": "media/site/okuma-salonu-genis.jpg",
    "sanal-muze": "media/site/tas-kemer-kare.jpg",
};

const norm = (s) => s.toLocaleLowerCase("tr");
const initial = (name) => name.replace(/^[^\p{L}\p{N}]+/u, "").charAt(0).toLocaleUpperCase("tr");

const DirectoryPage = ({ type }) => {
    const scope = useRef(null);
    const [query, setQuery] = useState("");
    const [letter, setLetter] = useState(null);
    const [sort, setSort] = useState("az");
    const [kind, setKind] = useState("all"); // only used on the combined page

    const effectiveType = type === "all" ? kind : type;
    const title = type === "all" ? "Elektronik Kaynaklar" : DIRECTORY_LABELS[type];
    const page = type === "all" ? null : findPage(DIRECTORY_ROUTES[type]);

    const base = useMemo(
        () => visibleDatabases.filter((d) => effectiveType === "all" || d.type === effectiveType),
        [effectiveType]
    );

    const letters = useMemo(() => [...new Set(base.map((d) => initial(d.name)))].sort((a, b) => a.localeCompare(b, "tr")), [base]);

    const list = useMemo(() => {
        const q = norm(query.trim());
        const out = base.filter((d) =>
            (!letter || initial(d.name) === letter) &&
            (!q || norm(d.name).includes(q) || norm(d.description).includes(q))
        );
        return sort === "az" ? [...out].sort((a, b) => a.name.localeCompare(b.name, "tr")) : out;
    }, [base, query, letter, sort]);

    // Trials: current ones first, then those whose period has ended.
    const isTrialView = effectiveType === "deneme";
    const groups = isTrialView
        ? [
            ["Etkin deneme erişimleri", list.filter((d) => trialStatus(d.trialEnd) === "active").sort((a, b) => a.trialEnd.localeCompare(b.trialEnd))],
            ["Süresi sona eren deneme erişimleri", list.filter((d) => trialStatus(d.trialEnd) !== "active")],
        ]
        : [[null, list]];

    useReveal(scope, [type]);

    const pill = (active) =>
        `border-[1px] rounded-full px-4 py-1 text-sm transition-colors duration-300 ${active ? "bg-[#f4efe7] border-[#f4efe7] text-[#2a2725]" : "border-[#4f4b48] text-[#b1a696] hover:text-[#f4efe7] hover:border-[#b1a696]"}`;

    return (
        <div ref={scope}>
            <PageHero
                title={title}
                eyebrow="Elektronik Kaynaklar"
                crumbs={type === "all" ? [{ label: "Elektronik Kaynaklar" }] : [{ label: "Elektronik Kaynaklar", to: "/elektronik-kaynaklar" }, { label: title }]}
                image={HERO[type]}
                imageAlt="Kütüphane rafları"
                size="sm"
                aside={<>{base.length} kaynak{page?.updated ? <><br />Son güncelleme {formatDate(page.updated)}</> : null}</>}
            />

            <section className="px-6 md:px-8 pb-28" aria-label={`${title} listesi`}>
                {/* Collection switcher: links on single pages, a filter on the combined page */}
                <nav aria-label="Kaynak türleri" className="flex flex-wrap gap-2" data-reveal>
                    {type === "all" ? (
                        <>
                            <button type="button" aria-pressed={kind === "all"} onClick={() => { setKind("all"); setLetter(null); }} className={pill(kind === "all")}>Tümü ({visibleDatabases.length})</button>
                            {Object.entries(DIRECTORY_LABELS).map(([k, label]) => (
                                <button key={k} type="button" aria-pressed={kind === k} onClick={() => { setKind(k); setLetter(null); }} className={pill(kind === k)}>
                                    {label} ({visibleDatabases.filter((d) => d.type === k).length})
                                </button>
                            ))}
                        </>
                    ) : (
                        <>
                            <Link to="/elektronik-kaynaklar" className={pill(false)}>Tümü</Link>
                            {Object.entries(DIRECTORY_LABELS).map(([k, label]) => (
                                <Link key={k} to={DIRECTORY_ROUTES[k]} aria-current={k === type ? "page" : undefined} className={pill(k === type)}>{label}</Link>
                            ))}
                        </>
                    )}
                </nav>

                <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between border-b border-[#4f4b48] pb-8" data-reveal>
                    <label className="flex items-center gap-2 bg-[#f4efe7] rounded-full pl-5 pr-2 py-1 lg:w-[30rem]">
                        <span className="sr-only">Kaynak adı veya açıklamasında ara</span>
                        <input type="search" value={query} onChange={(e) => { setQuery(e.target.value); setLetter(null); }} placeholder="Kaynak adı veya konu arayın..." className="flex-1 min-w-0 bg-transparent py-2.5 text-[#2a2725] placeholder:text-[#8a7f70] outline-none" />
                    </label>
                    <div className="flex flex-wrap gap-2" role="group" aria-label="Sıralama">
                        <button type="button" aria-pressed={sort === "az"} onClick={() => setSort("az")} className={pill(sort === "az")}>A–Z</button>
                        <button type="button" aria-pressed={sort === "source"} onClick={() => setSort("source")} className={pill(sort === "source")}>Sayfadaki sıra</button>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-6" role="group" aria-label="Baş harfe göre süz" data-reveal>
                    <button type="button" aria-pressed={!letter} onClick={() => setLetter(null)} className={`w-auto px-3 h-9 rounded-full text-sm ${!letter ? "bg-[#f4efe7] text-[#2a2725]" : "text-[#b1a696] hover:text-[#f4efe7]"}`}>Tümü</button>
                    {letters.map((l) => (
                        <button key={l} type="button" aria-pressed={letter === l} onClick={() => setLetter(letter === l ? null : l)} className={`w-9 h-9 rounded-full text-sm ${letter === l ? "bg-[#f4efe7] text-[#2a2725]" : "text-[#b1a696] hover:text-[#f4efe7] hover:bg-[#2a2725]"}`}>{l}</button>
                    ))}
                </div>

                {(effectiveType === "abone" || effectiveType === "all") && (
                    <p className="mt-6 text-[0.85rem] text-[#b1a696]">
                        Yerleşke dışından erişim için <Link to="/yerleske-disi-erisim" className="text-[#f4efe7] underline underline-offset-4 decoration-[#4f4b48]">Yerleşke Dışı Erişim</Link> kılavuzlarına bakın.
                    </p>
                )}

                <p className="text-[0.75rem] text-[#8a8073] mt-6" aria-live="polite">{list.length} kaynak listeleniyor</p>

                {groups.map(([heading, items]) => (
                    <div key={heading ?? "list"} className="mt-6">
                        {heading && <h2 className="text-[.7rem] font-bold text-[#eae5dd] mt-12 mb-2">{heading} ({items.length})</h2>}
                        <ul className="border-b border-[#4f4b48]">
                            {items.map((d) => <DatabaseRow key={d.id} d={d} showType={type === "all"} />)}
                        </ul>
                    </div>
                ))}
                {list.length === 0 && <p className="py-16 text-[#b1a696]">Aramanızla eşleşen kaynak bulunamadı.</p>}
            </section>
        </div>
    );
};

export default DirectoryPage;
