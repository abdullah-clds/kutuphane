import { Link } from "react-router-dom";
import PillLink from "../../components/Buttons/PillLink";
import { DIRECTORY_SHORT, formatDate, media, trialLabel, trialStatus } from "../../lib/content";

/** One resource: provider logo, name, full source description, access link. */
const DatabaseRow = ({ d, showType }) => {
    const status = d.type === "deneme" ? trialStatus(d.trialEnd) : null;
    const expired = status === "expired" || status === "archive";

    return (
        <li id={d.id} className="grid gap-6 md:grid-cols-12 py-9 border-t border-[#4f4b48] scroll-mt-24">
            <div className="md:col-span-3">
                <div className="w-full max-w-[17rem] aspect-[500/225] rounded-[1.75rem] bg-[#f4efe7] overflow-hidden flex items-center justify-center">
                    {d.logo
                        ? <img src={media(d.logo.src)} alt={`${d.name} logosu`} loading="lazy" className={`w-full h-full object-contain ${expired ? "grayscale opacity-70" : ""}`} />
                        : <span aria-hidden="true" className="text-4xl font-bold text-[#2a2725]">{d.name.charAt(0)}</span>}
                </div>
            </div>
            <div className="md:col-span-6">
                <h3 className={`text-2xl md:text-[2rem] leading-[1.1] tracking-tight ${expired ? "text-[#b1a696]" : "text-[#f4efe7]"}`}>{d.name}</h3>
                <div className="flex flex-wrap gap-2 mt-3">
                    {showType && <span className="rounded-full border border-[#4f4b48] px-3 py-0.5 text-[0.7rem] text-[#b1a696]">{DIRECTORY_SHORT[d.type]}</span>}
                    {status && (
                        <span className={`rounded-full border px-3 py-0.5 text-[0.7rem] ${status === "active" ? "bg-[#f4efe7] text-[#2a2725] border-[#f4efe7]" : "border-[#4f4b48] text-[#8a8073]"}`}>
                            {trialLabel(status, d.trialEnd)}{d.trialEnd ? ` · ${formatDate(d.trialEnd)}` : ""}
                        </span>
                    )}
                </div>
                <div className="kun-prose text-[1rem] mt-4" dangerouslySetInnerHTML={{ __html: d.descriptionHtml }} />
                {d.trialEndSource && (
                    <p className="text-[0.75rem] text-[#8a8073] mt-3">Son erişim tarihi <Link to={d.trialEndSource} className="underline">ilgili duyurudan</Link> alınmıştır.</p>
                )}
            </div>
            <div className="md:col-span-3 md:flex md:justify-end md:items-start">
                {d.url && !expired && <PillLink label="Erişim için tıklayınız" href={d.url} />}
                {expired && <p className="text-[0.8rem] text-[#8a8073] md:text-right">Deneme süresi sona erdiği için erişim bağlantısı gösterilmiyor.</p>}
            </div>
        </li>
    );
};

export default DatabaseRow;
