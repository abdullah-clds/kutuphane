import { Link } from "react-router-dom";
import PillLink from "../../components/Buttons/PillLink";
import { DIRECTORY_SHORT, formatDate, media, trialLabel, trialStatus } from "../../lib/content";

/** One resource: provider logo, name, full source description, access link. */
const DatabaseRow = ({ d, showType }) => {
    const status = d.type === "deneme" ? trialStatus(d.trialEnd) : null;
    const expired = status === "expired" || status === "archive";

    return (
        <li id={d.id} className="grid gap-6 md:grid-cols-12 py-8 border-t border-[#d2d2d7] scroll-mt-24">
            <div className="md:col-span-3">
                <div className="w-full max-w-[15rem] aspect-[500/225] rounded-[16px] bg-white border border-[#e8e8ed] overflow-hidden flex items-center justify-center">
                    {d.logo
                        ? <img src={media(d.logo.src)} alt={`${d.name} logosu`} loading="lazy" className={`w-full h-full object-contain ${expired ? "grayscale opacity-70" : ""}`} />
                        : <span aria-hidden="true" className="text-4xl font-bold text-[#1d1d1f]">{d.name.charAt(0)}</span>}
                </div>
            </div>
            <div className="md:col-span-6">
                <h3 className={`text-xl md:text-[1.45rem] font-semibold leading-[1.15] tracking-tight ${expired ? "text-[#424245]" : "text-[#1d1d1f]"}`}>{d.name}</h3>
                <div className="flex flex-wrap gap-2 mt-3">
                    {showType && <span className="rounded-full bg-[#f5f5f7] px-3 py-0.5 text-[0.75rem] text-[#424245]">{DIRECTORY_SHORT[d.type]}</span>}
                    {status && (
                        <span className={`rounded-full px-3 py-0.5 text-[0.75rem] ${status === "active" ? "bg-[#e8f1fb] text-[#0a5cad]" : "bg-[#f5f5f7] text-[#6e6e73]"}`}>
                            {trialLabel(status, d.trialEnd)}{d.trialEnd ? ` · ${formatDate(d.trialEnd)}` : ""}
                        </span>
                    )}
                </div>
                <div className="kun-prose !text-[0.95rem] !text-[#424245] mt-3" dangerouslySetInnerHTML={{ __html: d.descriptionHtml }} />
                {d.trialEndSource && (
                    <p className="text-[0.75rem] text-[#6e6e73] mt-3">Son erişim tarihi <Link to={d.trialEndSource} className="underline">ilgili duyurudan</Link> alınmıştır.</p>
                )}
            </div>
            <div className="md:col-span-3 md:flex md:justify-end md:items-start">
                {d.url && !expired && <PillLink label="Erişim" href={d.url} />}
                {expired && <p className="text-[0.8rem] text-[#6e6e73] md:text-right">Deneme süresi sona erdiği için erişim bağlantısı gösterilmiyor.</p>}
            </div>
        </li>
    );
};

export default DatabaseRow;
