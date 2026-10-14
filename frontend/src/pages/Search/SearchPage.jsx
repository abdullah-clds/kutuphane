import { useRef } from "react";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import PageHero from "../../components/Page/PageHero";
import SearchPanel from "../../components/Search/SearchPanel";
import SmartLink from "../../components/Buttons/SmartLink";
import useReveal from "../../components/Page/useReveal";
import { QUICK_LINKS, SEARCH, services } from "../../lib/content";

const SearchPage = () => {
    const scope = useRef(null);
    useReveal(scope);

    return (
        <div ref={scope}>
            <PageHero
                title="Bilgiye hızla ulaşın"
                eyebrow="Katalog Tarama · Tüm Kaynaklarda Tarama"
                crumbs={[{ label: "Araştırma" }, { label: "Tarama" }]}
                image="media/site/tas-kemer-kare.jpg"
                imageAlt="Taş kemerli kütüphane bölümünde kitap rafları"
                size="sm"
                aside={<>KOHA kataloğu ve EBSCO Discovery</>}
            />

            <section className="px-6 md:px-8 pb-20 grid gap-14 lg:grid-cols-12" aria-label="Arama">
                <div className="lg:col-span-5 text-[#b1a696] lg:text-[2rem] text-[1.2rem] leading-[1.15]" data-reveal>
                    <p>{SEARCH.ebsco.text}</p>
                </div>
                <div className="lg:col-span-6 lg:col-start-7" data-reveal>
                    <SearchPanel />
                </div>
            </section>

            <section className="px-2 pb-20 grid gap-2 md:grid-cols-2" aria-label="Arama sistemleri">
                {[SEARCH.koha, SEARCH.ebsco].map((s) => (
                    <a key={s.label} href={s.home} target="_blank" rel="noopener noreferrer" data-reveal className="group rounded-[2.5rem] bg-[#2a2725] p-8 md:p-10 flex flex-col justify-between gap-12 min-h-[22rem] hover:bg-[#33302d] transition-colors">
                        <span className="text-[.7rem] font-bold text-[#eae5dd]">{s.system}</span>
                        <span>
                            <span className="block text-[#f4efe7] text-4xl md:text-6xl tracking-tight leading-[0.95]">{s.label}</span>
                            <span className="flex items-end justify-between gap-6 mt-6">
                                <span className="text-[#b1a696] max-w-[30rem]">{s.text}</span>
                                <MdArrowOutward aria-hidden="true" className="shrink-0 w-12 h-12 p-2.5 rounded-full bg-[#f4efe7] text-[#2a2725] transition-transform duration-500 group-hover:rotate-45" />
                            </span>
                        </span>
                        <span className="sr-only">(yeni sekmede açılır)</span>
                    </a>
                ))}
            </section>

            <section className="px-6 md:px-8 pb-28 grid gap-14 lg:grid-cols-12" aria-label="Hızlı erişim ve araştırma hizmetleri">
                <div className="lg:col-span-6" data-reveal>
                    <h2 className="text-[.7rem] font-bold text-[#eae5dd] mb-6">Hızlı erişim</h2>
                    <ul className="flex flex-wrap gap-2">
                        {QUICK_LINKS.map((q, i) => (
                            <li key={q.label}>
                                <SmartLink to={q.to} href={q.href} className={`block border-[1px] ${i % 2 ? "border-[#f4efe7] text-[#f4efe7]" : "border-[#b1a696] text-[#b1a696]"} text-lg lg:text-[1.5rem] px-[20px] py-[4px] rounded-full hover:bg-[#f4efe7] hover:text-[#2a2725] transition-colors duration-300`}>
                                    {q.label}
                                </SmartLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="lg:col-span-5 lg:col-start-8" data-reveal>
                    <h2 className="text-[.7rem] font-bold text-[#eae5dd] mb-6">Araştırma hizmetleri</h2>
                    <ul className="border-t border-[#4f4b48]">
                        {services.map((s) => (
                            <li key={s.slug} className="border-b border-[#4f4b48]">
                                <Link to={`/arastirma/${s.slug}`} className="group flex items-center justify-between gap-4 py-4 text-xl md:text-2xl text-[#b1a696] hover:text-[#f4efe7] transition-colors">
                                    {s.title}
                                    <MdArrowOutward aria-hidden="true" className="shrink-0 transition-transform duration-500 group-hover:rotate-45" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default SearchPage;
