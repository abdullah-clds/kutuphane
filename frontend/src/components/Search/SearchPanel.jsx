import { useId, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { SEARCH } from "../../lib/content";

/**
 * Real GET forms to the two systems (no API, nothing proxied):
 *  - EBSCO Discovery: same action and hidden fields as the previous homepage form
 *  - KOHA OPAC: standard opac-search.pl?q=
 * Results open in a new tab, as before.
 */
const SearchPanel = ({ initial = "ebsco", tone = "dark" }) => {
    const [scope, setScope] = useState(initial);
    const id = useId();
    const cfg = SEARCH[scope];
    const onDark = tone === "dark";

    return (
        <div>
            <div role="radiogroup" aria-label="Arama yapılacak sistem" className="flex flex-wrap gap-2">
                {Object.entries(SEARCH).map(([key, s]) => {
                    const active = key === scope;
                    return (
                        <button
                            key={key}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            onClick={() => setScope(key)}
                            className={`border-[1px] rounded-full px-[20px] py-[4px] lg:text-[1.1rem] text-[1rem] transition-colors duration-300 ${active
                                ? (onDark ? "bg-[#f4efe7] border-[#f4efe7] text-[#2a2725]" : "bg-[#2a2725] border-[#2a2725] text-[#f4efe7]")
                                : (onDark ? "border-[#b1a696] text-[#b1a696] hover:text-[#f4efe7] hover:border-[#f4efe7]" : "border-[#2a2725]/40 text-[#2a2725]")}`}
                        >
                            {s.label}
                        </button>
                    );
                })}
            </div>

            <form action={cfg.action} method="GET" target="_blank" className="mt-5" role="search" aria-label={cfg.label}>
                {Object.entries(cfg.hidden).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}
                <label htmlFor={id} className="sr-only">{cfg.label}</label>
                <div className={`flex items-center gap-2 rounded-full p-1 pl-6 ${onDark ? "bg-[#f4efe7]" : "bg-white border border-[#2a2725]/15"}`}>
                    <input
                        id={id}
                        name="q"
                        type="search"
                        required
                        autoComplete="off"
                        placeholder={cfg.placeholder}
                        className="flex-1 min-w-0 bg-transparent py-3 text-[#2a2725] placeholder:text-[#8a7f70] text-base lg:text-lg outline-none"
                    />
                    <button type="submit" className="group shrink-0 inline-flex items-center gap-2 bg-[#2a2725] text-[#f4efe7] rounded-full pl-5 pr-1.5 py-1.5 text-sm">
                        Ara
                        <MdArrowOutward aria-hidden="true" className="w-8 h-8 p-1.5 rounded-full bg-[#f4efe7] text-[#2a2725] transition-transform duration-500 group-hover:rotate-45" />
                    </button>
                </div>
                <p className={`mt-3 text-[0.7rem] ${onDark ? "text-[#b1a696]" : "text-[#5e574f]"}`}>
                    {cfg.system} · sonuçlar yeni sekmede açılır ·{" "}
                    <a href={cfg.home} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">gelişmiş arama</a>
                </p>
            </form>
        </div>
    );
};

export default SearchPanel;
