import { Link } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";
import SmartLink from "../Buttons/SmartLink";
import { NAV_GROUPS } from "../../data/nav";
import { services, leadSentence, media } from "../../lib/content";

const group = (title) => NAV_GROUPS.find((g) => g.title === title);

/** Research services and the open archive / open access links. */
const ResearchBand = () => (
    <section aria-labelledby="arastirma-baslik" className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-8">
            <p className="kun-eyebrow">Araştırma</p>
            <h2 id="arastirma-baslik" className="kun-h2 mt-2">Araştırma hizmetleri</h2>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {services.map((s) => (
                    <li key={s.slug}>
                        <Link to={`/arastirma/${s.slug}`} className="group flex h-full gap-4 rounded-xl border border-[#e4ded4] bg-white p-4 hover:border-[#002856] hover:shadow-[0_6px_20px_rgba(0,40,86,0.08)] transition-all">
                            {s.image && <img src={media(s.image)} alt="" loading="lazy" className="w-16 h-16 shrink-0 rounded-lg object-cover bg-[#f3efe8]" />}
                            <span className="min-w-0">
                                <span className="flex items-center gap-1.5 text-[1rem] font-medium text-[#1f2937] group-hover:text-[#002856]">{s.title}<MdArrowForward aria-hidden="true" className="text-[#9ca3af] group-hover:text-[#002856]" /></span>
                                <span className="block mt-1 text-[0.82rem] leading-relaxed text-[#6b7280] line-clamp-2">{leadSentence(s.text, 150)}</span>
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>

        <div className="lg:col-span-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 content-start">
            {["Açık Arşiv", "Açık Erişim"].map((title) => (
                <div key={title} className="rounded-xl border border-[#e4ded4] bg-white p-5">
                    <h3 className="text-[0.95rem] font-semibold text-[#002856]">{title}</h3>
                    <ul className="mt-2 divide-y divide-[#efeae2]">
                        {group(title).items.map((i) => (
                            <li key={i.label}>
                                <SmartLink to={i.to} href={i.href} className="flex items-center justify-between gap-3 py-2 text-[0.9rem] text-[#1f2937] hover:text-[#002856]">
                                    {i.label}<MdArrowForward aria-hidden="true" className="shrink-0 text-[#9ca3af]" />
                                </SmartLink>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </section>
);

export default ResearchBand;
