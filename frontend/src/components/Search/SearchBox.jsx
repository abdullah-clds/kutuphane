import { useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdSearch, MdChevronRight } from "react-icons/md";
import SmartLink from "../Buttons/SmartLink";
import { SEARCH } from "../../lib/content";
import { searchSite } from "../../lib/siteSearch";

const SCOPES = [
    { key: "ebsco", label: "Tüm kaynaklar" },
    { key: "koha", label: "Katalog" },
    { key: "site", label: "Bu sitede" },
];

/**
 * One search field, three scopes. Catalogue and discovery submit the original GET forms
 * (new tab); "Bu sitede" lists matching pages, announcements and resources instantly.
 */
const SearchBox = ({ initial = "ebsco", size = "lg" }) => {
    const [scope, setScope] = useState(initial);
    const [q, setQ] = useState("");
    const id = useId();
    const navigate = useNavigate();
    const ext = SEARCH[scope];
    const results = scope === "site" ? searchSite(q, 6) : [];

    const onSubmit = (e) => {
        if (scope !== "site") return;
        e.preventDefault();
        if (results[0]?.to) navigate(results[0].to);
    };

    return (
        <div>
            <div role="radiogroup" aria-label="Arama kapsamı" className="flex flex-wrap gap-2">
                {SCOPES.map((s) => (
                    <button key={s.key} type="button" role="radio" aria-checked={scope === s.key} aria-pressed={scope === s.key} onClick={() => setScope(s.key)} className="kun-chip">
                        {s.label}
                    </button>
                ))}
            </div>
            <form onSubmit={onSubmit} action={ext?.action} method="GET" target={scope === "site" ? undefined : "_blank"} role="search" className="mt-4">
                {ext && Object.entries(ext.hidden).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}
                <label htmlFor={id} className="sr-only">{ext ? ext.label : "Sitede ara"}</label>
                <div className={`kun-field ${size === "lg" ? "text-lg md:text-xl" : ""}`}>
                    <MdSearch aria-hidden="true" className="w-6 h-6 text-[#8a8073] shrink-0" />
                    <input id={id} name="q" type="search" required autoComplete="off" value={q} onChange={(e) => setQ(e.target.value)} placeholder={ext ? ext.placeholder : "Sayfa, duyuru veya veri tabanı arayın…"} className={size === "lg" ? "!py-4" : ""} />
                    <button type="submit" className="kun-btn shrink-0 !py-2">Ara</button>
                </div>
            </form>
            {scope !== "site" && (
                <p className="mt-3 text-[0.8rem] text-[#b1a696]">
                    {ext.system} · sonuçlar yeni sekmede açılır · <a href={ext.home} target="_blank" rel="noopener noreferrer" className="text-[var(--kun-accent)] hover:underline">gelişmiş arama</a>
                </p>
            )}
            {scope === "site" && q.trim().length >= 2 && (
                <ul className="mt-3 rounded-[1.5rem] border border-[#4f4b48] bg-[#2a2725] divide-y divide-[#4f4b48] overflow-hidden" aria-live="polite">
                    {results.length === 0 && <li className="px-4 py-3 text-[0.9rem] text-[#b1a696]">Sonuç yok. Katalog veya tüm kaynaklar kapsamını deneyin.</li>}
                    {results.map((r) => (
                        <li key={`${r.kind}-${r.title}-${r.to || r.href}`}>
                            <SmartLink to={r.to} href={r.href} className="group flex items-center justify-between gap-3 px-4 py-3 hover:bg-[#33302d]">
                                <span className="min-w-0">
                                    <span className="block truncate text-[0.98rem] text-[#f4efe7]">{r.title}</span>
                                    <span className="block text-[0.75rem] text-[#b1a696]">{r.kind}{r.meta ? ` · ${r.meta}` : ""}</span>
                                </span>
                                <MdChevronRight aria-hidden="true" className="shrink-0 text-[#8a8073]" />
                            </SmartLink>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBox;
