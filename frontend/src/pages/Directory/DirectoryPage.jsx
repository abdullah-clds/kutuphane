import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../../components/Page/PageHero";
import useReveal from "../../components/Page/useReveal";
import DatabaseRow from "./DatabaseRow";
import { MdArrowOutward } from "react-icons/md";
import { FilterCard, FilterOption, FilterPanel, ResultsHeader, Segmented } from "../../components/Page/ListParts";
import { DIRECTORY_LABELS, DIRECTORY_ROUTES, countByType, findPage, formatDate, trialStatus, visibleDatabases } from "../../lib/content";

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

            <section className="kun-wrap pb-28 grid gap-10 lg:grid-cols-12 lg:gap-12" aria-label={`${title} listesi`}>
                <FilterPanel active={Boolean(letter) + (type === "all" && kind !== "all")}>
                    {/* Collections: links between the pages, or a filter on the combined page */}
                    <FilterCard title="Kaynak türleri">
                        <nav aria-label="Kaynak türleri" className="-mx-3 flex flex-col">
                            {type === "all" ? (
                                <>
                                    <FilterOption active={kind === "all"} onClick={() => { setKind("all"); setLetter(null); }} label="Tümü" count={visibleDatabases.length} />
                                    {Object.entries(DIRECTORY_LABELS).map(([k, label]) => (
                                        <FilterOption key={k} active={kind === k} onClick={() => { setKind(k); setLetter(null); }} label={label} count={countByType(k)} />
                                    ))}
                                </>
                            ) : (
                                <>
                                    <FilterOption as={Link} to="/elektronik-kaynaklar" label="Tümü" count={visibleDatabases.length} />
                                    {Object.entries(DIRECTORY_LABELS).map(([k, label]) => (
                                        <FilterOption key={k} as={Link} to={DIRECTORY_ROUTES[k]} aria-current={k === type ? "page" : undefined} active={k === type} label={label} count={countByType(k)} />
                                    ))}
                                </>
                            )}
                        </nav>
                    </FilterCard>
                    <FilterCard title="Baş harf">
                        <div className="grid grid-cols-6 gap-1" role="group" aria-label="Baş harfe göre süz">
                            <button type="button" aria-pressed={!letter} onClick={() => setLetter(null)} className={`col-span-2 h-9 rounded-lg text-[0.8rem] ${!letter ? "bg-[#f4efe7] text-[#2a2725]" : "text-[#b1a696] hover:bg-[#262321] hover:text-[#f4efe7]"}`}>Tümü</button>
                            {letters.map((l) => (
                                <button key={l} type="button" aria-pressed={letter === l} onClick={() => setLetter(letter === l ? null : l)} className={`h-9 rounded-lg text-[0.85rem] ${letter === l ? "bg-[#f4efe7] text-[#2a2725]" : "text-[#b1a696] hover:bg-[#262321] hover:text-[#f4efe7]"}`}>{l}</button>
                            ))}
                        </div>
                    </FilterCard>
                    {(effectiveType === "abone" || effectiveType === "all") && (
                        <section className="rounded-[1.75rem] bg-[#f4efe7] p-5 md:p-6 text-[#2a2725]">
                            <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#6b6259]">Yerleşke dışından</h2>
                            <p className="mt-3 text-[0.9rem] leading-snug text-[#5e574f]">Abone olunan veri tabanlarına kampüs dışından erişim için kılavuzlara bakın.</p>
                            <Link to="/yerleske-disi-erisim" className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#2a2725] px-4 py-2 text-[0.85rem] text-[#f4efe7] hover:bg-[#33302d]">Yerleşke Dışı Erişim<MdArrowOutward aria-hidden="true" className="w-4 h-4" /></Link>
                        </section>
                    )}
                </FilterPanel>

                <div className="lg:col-span-9 min-w-0" data-reveal>
                    <ResultsHeader query={query} onQuery={(v) => { setQuery(v); setLetter(null); }} placeholder="Kaynak adı veya konu arayın…" label="Kaynak adı veya açıklamasında ara"
                        count={list.length} noun="kaynak" filtered={Boolean(query || letter || (type === "all" && kind !== "all"))}
                        onReset={() => { setQuery(""); setLetter(null); setKind("all"); }}>
                        <Segmented label="Sıralama" value={sort} onChange={setSort} options={[["az", "A–Z"], ["source", "Sayfadaki sıra"]]} />
                    </ResultsHeader>

                    {groups.map(([heading, items]) => items.length > 0 && (
                        <div key={heading ?? "list"} className="mt-3">
                            {heading && <h2 className="mt-10 mb-2 px-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#8a8073]">{heading} <span className="tabular-nums">({items.length})</span></h2>}
                            <ul className="flex flex-col divide-y divide-[#2a2725]">
                                {items.map((d) => <DatabaseRow key={d.id} d={d} showType={type === "all"} />)}
                            </ul>
                        </div>
                    ))}
                    {list.length === 0 && <p className="py-16 text-center text-[#b1a696]">Aramanızla eşleşen kaynak bulunamadı.</p>}
                </div>
            </section>
        </div>
    );
};

export default DirectoryPage;
