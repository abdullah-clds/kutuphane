import { useState } from "react";
import { MdSearch, MdClose, MdTune, MdExpandMore } from "react-icons/md";

/**
 * Shared pieces of the listing pages (announcements, resource directories):
 * a filter sidebar made of cards, and a results header with search and sort.
 */

export const FilterCard = ({ title, children }) => (
    <section className="rounded-[1.75rem] bg-[#1f1d1c] ring-1 ring-inset ring-[#2f2c29] p-5 md:p-6">
        <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#8a8073]">{title}</h2>
        <div className="mt-3">{children}</div>
    </section>
);

/** One choice in a filter card: a full-width row with a count, current one marked. */
export const FilterOption = ({ active, onClick, label, count, as: As = "button", ...rest }) => (
    <As
        {...(As === "button" ? { type: "button", onClick, "aria-pressed": active } : rest)}
        className={`relative flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-[0.9rem] leading-snug transition-colors ${active ? "bg-[#2a2725] text-[#f4efe7] font-medium" : "text-[#b1a696] hover:bg-[#262321] hover:text-[#f4efe7]"}`}
    >
        {active && <span aria-hidden="true" className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-[#f4efe7]" />}
        <span>{label}</span>
        {count != null && <span className={`text-[0.78rem] tabular-nums ${active ? "text-[#d8cfc2]" : "text-[#8a8073]"}`}>{count}</span>}
    </As>
);

export const ResultsHeader = ({ query, onQuery, placeholder, label, count, noun, children, onReset, filtered }) => (
    <div className="flex flex-col gap-4 border-b border-[#2a2725] pb-5">
        <label className="flex items-center gap-3 rounded-full bg-[#f4efe7] pl-5 pr-2 py-1">
            <MdSearch aria-hidden="true" className="w-5 h-5 shrink-0 text-[#8a7f70]" />
            <span className="sr-only">{label}</span>
            <input type="search" value={query} onChange={(e) => onQuery(e.target.value)} placeholder={placeholder}
                className="flex-1 min-w-0 bg-transparent py-2.5 text-[#2a2725] placeholder:text-[#8a7f70] outline-none" />
        </label>
        <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="flex items-center gap-3 text-[0.85rem] text-[#b1a696]" aria-live="polite">
                <span><span className="font-semibold text-[#f4efe7] tabular-nums">{count}</span> {noun}</span>
                {filtered && (
                    <button type="button" onClick={onReset} className="inline-flex items-center gap-1 rounded-full border border-[#38332f] px-2.5 py-0.5 text-[0.75rem] text-[#d8cfc2] hover:border-[#f4efe7] hover:text-[#f4efe7]">
                        <MdClose aria-hidden="true" className="w-3.5 h-3.5" />Filtreleri temizle
                    </button>
                )}
            </p>
            {children}
        </div>
    </div>
);

/** Two-option segmented control (sorting). */
export const Segmented = ({ label, value, onChange, options }) => (
    <div role="group" aria-label={label} className="inline-flex rounded-full bg-[#1f1d1c] ring-1 ring-inset ring-[#2f2c29] p-1 text-[0.8rem]">
        {options.map(([key, text]) => (
            <button key={key} type="button" aria-pressed={value === key} onClick={() => onChange(key)}
                className={`rounded-full px-3.5 py-1.5 transition-colors ${value === key ? "bg-[#f4efe7] text-[#2a2725]" : "text-[#b1a696] hover:text-[#f4efe7]"}`}>
                {text}
            </button>
        ))}
    </div>
);

/** Sidebar of filter cards; on phones it folds behind one "Filtreler" button. */
export const FilterPanel = ({ children, active = 0 }) => {
    const [open, setOpen] = useState(false);
    return (
        <aside className="lg:col-span-3 flex flex-col gap-4" data-reveal>
            <button type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)}
                className="lg:hidden flex items-center justify-between rounded-full bg-[#1f1d1c] ring-1 ring-inset ring-[#2f2c29] px-5 py-3 text-[0.92rem] text-[#f4efe7]">
                <span className="inline-flex items-center gap-2"><MdTune aria-hidden="true" className="w-5 h-5" />Filtreler{active > 0 && <span className="rounded-full bg-[#f4efe7] px-2 text-[0.75rem] font-semibold text-[#2a2725]">{active}</span>}</span>
                <MdExpandMore aria-hidden="true" className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            <div className={`${open ? "flex" : "hidden"} lg:flex flex-col gap-4`}>{children}</div>
        </aside>
    );
};
