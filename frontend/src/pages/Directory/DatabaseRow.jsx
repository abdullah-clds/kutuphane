import { useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import { DIRECTORY_SHORT, formatDate, media, trialLabel, trialStatus, withBase } from "../../lib/content";

/** One resource: provider logo, name, tags, the source description (folded to three lines), access link. */
const DatabaseRow = ({ d, showType }) => {
    const [open, setOpen] = useState(false);
    const status = d.type === "deneme" ? trialStatus(d.trialEnd) : null;
    const expired = status === "expired" || status === "archive";
    const long = (d.description || "").length > 260;

    return (
        <li id={d.id} className="grid grid-cols-[4.5rem_1fr] gap-x-4 gap-y-4 sm:gap-x-5 sm:grid-cols-[9.5rem_1fr] lg:grid-cols-[9.5rem_1fr_auto] items-start py-7 scroll-mt-24">
            <div className="relative w-[4.5rem] sm:w-[9.5rem] aspect-square sm:aspect-[3/2] rounded-xl sm:rounded-2xl bg-[#f4efe7] overflow-hidden">
                {d.logo
                    ? <img src={media(d.logo.src)} alt={`${d.name} logosu`} loading="lazy" className={`absolute inset-0 m-auto max-w-[84%] max-h-[76%] object-contain mix-blend-multiply ${expired ? "grayscale opacity-60" : ""}`} />
                    : <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center text-3xl font-medium text-[#2a2725]">{d.name.charAt(0)}</span>}
            </div>
            <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                    {showType && <span className="rounded-full bg-[#2a2725] px-2.5 py-0.5 text-[0.72rem] text-[#d8cfc2]">{DIRECTORY_SHORT[d.type]}</span>}
                    {status && (
                        <span className={`rounded-full px-2.5 py-0.5 text-[0.72rem] ${status === "active" ? "bg-[#1f3a2a] text-[#9ad3a8]" : "border border-[#38332f] text-[#8a8073]"}`}>
                            {trialLabel(status, d.trialEnd)}{d.trialEnd ? ` · ${formatDate(d.trialEnd)}` : ""}
                        </span>
                    )}
                </div>
                <h3 className={`mt-2 text-[1.25rem] md:text-[1.4rem] font-medium leading-tight tracking-tight ${expired ? "text-[#b1a696]" : "text-[#f4efe7]"}`}>{d.name}</h3>
                <div className={`kun-prose kun-prose-sm mt-2.5 ${long && !open ? "line-clamp-3" : ""}`} dangerouslySetInnerHTML={{ __html: withBase(d.descriptionHtml) }} />
                {long && (
                    <button type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)} className="mt-2 text-[0.82rem] text-[#f4efe7] underline decoration-[#4f4b48] underline-offset-4 hover:decoration-[#f4efe7]">
                        {open ? "Daha az göster" : "Devamını oku"}
                    </button>
                )}
                {d.trialEndSource && (
                    <p className="text-[0.75rem] text-[#8a8073] mt-3">Son erişim tarihi <Link to={d.trialEndSource} className="underline">ilgili duyurudan</Link> alınmıştır.</p>
                )}
            </div>
            <div className="col-start-2 lg:col-start-auto lg:pt-1">
                {d.url && !expired && (
                    <a href={d.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#f4efe7] pl-4 pr-1.5 py-1.5 text-[0.85rem] font-medium text-[#2a2725] hover:bg-white">
                        Erişim<MdArrowOutward aria-hidden="true" className="w-7 h-7 rounded-full bg-[#2a2725] p-1.5 text-[#f4efe7] transition-transform duration-500 group-hover:rotate-45" />
                        <span className="sr-only"> {d.name} (yeni sekmede açılır)</span>
                    </a>
                )}
                {expired && <p className="max-w-[12rem] text-[0.78rem] text-[#8a8073] lg:text-right">Deneme süresi sona erdi; erişim bağlantısı gösterilmiyor.</p>}
            </div>
        </li>
    );
};

export default DatabaseRow;
