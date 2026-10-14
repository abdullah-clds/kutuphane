import { useId, useState } from "react";
import { MdSearch, MdMenuBook, MdTravelExplore, MdInventory2, MdLibraryBooks, MdAutoStories, MdArticle, MdFactCheck, MdVpnLock } from "react-icons/md";
import SmartLink from "../Buttons/SmartLink";
import { QUICK_LINKS, SEARCH } from "../../lib/content";

const ICONS = {
    "Katalog Tarama": MdMenuBook,
    "Tüm Kaynaklarda Tarama": MdTravelExplore,
    "Kurumsal Açık Arşiv": MdInventory2,
    "JSTOR": MdLibraryBooks,
    "KÜN Kitapları": MdAutoStories,
    "KÜN Dergileri": MdArticle,
    "İntihal Programları": MdFactCheck,
    "Yerleşke Dışı Erişim": MdVpnLock,
};

/** Library homepage entry: catalogue / discovery search and the eight quick links of the previous site. */
const SearchBand = () => {
    const [scope, setScope] = useState("ebsco");
    const id = useId();
    const cfg = SEARCH[scope];

    return (
        <section id="tarama" aria-labelledby="tarama-baslik" className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
                <p className="kun-eyebrow">Kaynak tarama</p>
                <h2 id="tarama-baslik" className="kun-h2 mt-2">Aradığınız kaynağa ulaşın</h2>
                <p className="mt-3 text-[#4b5563] max-w-[40rem]">{cfg.text}</p>

                <div role="tablist" aria-label="Arama yapılacak sistem" className="mt-6 flex border-b border-[#d9d3c7]">
                    {Object.entries(SEARCH).map(([key, s]) => (
                        <button
                            key={key}
                            type="button"
                            role="tab"
                            aria-selected={key === scope}
                            onClick={() => setScope(key)}
                            className={`-mb-px px-4 py-2.5 text-[0.95rem] font-medium border-b-2 transition-colors ${key === scope ? "border-[#002856] text-[#002856]" : "border-transparent text-[#6b7280] hover:text-[#002856]"}`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>

                <form action={cfg.action} method="GET" target="_blank" role="search" aria-label={cfg.label} className="mt-4">
                    {Object.entries(cfg.hidden).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}
                    <label htmlFor={id} className="sr-only">{cfg.label}</label>
                    <div className="flex items-stretch rounded-xl border border-[#cfc8bb] bg-white focus-within:border-[#002856] focus-within:ring-2 focus-within:ring-[#002856]/15 overflow-hidden">
                        <MdSearch aria-hidden="true" className="self-center ml-4 w-6 h-6 text-[#6b7280] shrink-0" />
                        <input id={id} name="q" type="search" required autoComplete="off" placeholder={cfg.placeholder} className="flex-1 min-w-0 px-3 py-3.5 text-[#1f2937] placeholder:text-[#9ca3af] outline-none" />
                        <button type="submit" className="px-6 bg-[#002856] text-white font-medium hover:bg-[#003a7a] transition-colors">Ara</button>
                    </div>
                    <p className="mt-2 text-[0.8rem] text-[#6b7280]">
                        {cfg.system} · sonuçlar yeni sekmede açılır ·{" "}
                        <a href={cfg.home} target="_blank" rel="noopener noreferrer" className="text-[#002856] underline underline-offset-2">gelişmiş arama</a>
                    </p>
                </form>
            </div>

            <div className="lg:col-span-5">
                <p className="kun-eyebrow">Hızlı erişim</p>
                <ul className="mt-3 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2">
                    {QUICK_LINKS.map((q) => {
                        const Icon = ICONS[q.label];
                        return (
                            <li key={q.label}>
                                <SmartLink to={q.to} href={q.href} className="group flex flex-col items-center justify-center gap-2 h-full min-h-[6.5rem] rounded-xl border border-[#e4ded4] bg-white px-2 py-3 text-center hover:border-[#002856] hover:shadow-[0_6px_20px_rgba(0,40,86,0.08)] transition-all">
                                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#002856]/[0.07] text-[#002856] group-hover:bg-[#002856] group-hover:text-white transition-colors">
                                        <Icon aria-hidden="true" className="w-5 h-5" />
                                    </span>
                                    <span className="text-[0.8rem] leading-tight text-[#1f2937]">{q.label}</span>
                                </SmartLink>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default SearchBand;
