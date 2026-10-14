import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import SmartLink from "../Buttons/SmartLink";
import { QUICK_LINKS, services, leadSentence } from "../../lib/content";

/** Compact closing block: the four research services and the previous homepage's quick links. */
const ServicesStrip = () => (
    <section aria-labelledby="arastirma-baslik" className="w-full px-6 md:px-8 py-24">
        <p className="text-[.7rem] font-bold text-[#eae5dd]">Araştırma</p>
        <h2 id="arastirma-baslik" className="mt-2 text-[#f4efe7] text-4xl md:text-5xl tracking-tight">Hizmetler ve hızlı erişim</h2>

        <ul className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
                <li key={s.slug}>
                    <Link to={`/arastirma/${s.slug}`} className="group flex flex-col justify-between gap-6 h-full rounded-[2rem] bg-[#2a2725] hover:bg-[#33302d] transition-colors p-6">
                        <span className="flex items-start justify-between gap-4">
                            <span className="text-[#f4efe7] text-xl leading-tight">{s.title}</span>
                            <MdArrowOutward aria-hidden="true" className="shrink-0 text-[#b1a696] transition-transform duration-500 group-hover:rotate-45" />
                        </span>
                        <span className="text-[0.82rem] text-[#8a8073] leading-relaxed line-clamp-3">{leadSentence(s.text, 160)}</span>
                    </Link>
                </li>
            ))}
        </ul>

        <ul className="mt-6 flex flex-wrap gap-2">
            {QUICK_LINKS.map((q) => (
                <li key={q.label}>
                    <SmartLink to={q.to} href={q.href} className="block rounded-full border border-[#4f4b48] px-4 py-1.5 text-[0.85rem] text-[#b1a696] hover:border-[#f4efe7] hover:text-[#f4efe7] transition-colors">
                        {q.label}
                    </SmartLink>
                </li>
            ))}
        </ul>
    </section>
);

export default ServicesStrip;
