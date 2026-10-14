import { useRef } from "react";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import PageHero from "../../components/Page/PageHero";
import SearchBox from "../../components/Search/SearchBox";
import SmartLink from "../../components/Buttons/SmartLink";
import useReveal from "../../components/Page/useReveal";
import { QUICK_LINKS, SEARCH, services } from "../../lib/content";

const SearchPage = () => {
    const scope = useRef(null);
    useReveal(scope);

    return (
        <div ref={scope}>
            <PageHero
                title="Aradığınızı bulun."
                eyebrow="Katalog Tarama · Tüm Kaynaklarda Tarama"
                crumbs={[{ label: "Araştırma" }, { label: "Tarama" }]}
                image="media/site/tas-kemer-kare.jpg"
                imageAlt="Taş kemerli kütüphane bölümünde kitap rafları"
                size="sm"
                aside={SEARCH.ebsco.text}
            />

            <section className="kun-wrap pb-20 grid gap-14 lg:grid-cols-12" aria-label="Arama">
                <div className="lg:col-span-8" data-reveal>
                    <SearchBox />
                </div>
            </section>

            <section className="kun-wrap pb-20 grid gap-3 md:grid-cols-2" aria-label="Arama sistemleri">
                {[SEARCH.koha, SEARCH.ebsco].map((s) => (
                    <a key={s.label} href={s.home} target="_blank" rel="noopener noreferrer" data-reveal className="group rounded-[22px] bg-[#f5f5f7] p-8 md:p-10 flex flex-col justify-between gap-12 min-h-[22rem] hover:bg-[#ebebef] transition-colors">
                        <span className="text-[0.8rem] font-semibold text-[#6e6e73]">{s.system}</span>
                        <span>
                            <span className="block text-[#1d1d1f] text-3xl md:text-5xl font-semibold tracking-tight leading-[1.02]">{s.label}</span>
                            <span className="flex items-end justify-between gap-6 mt-6">
                                <span className="text-[#424245] max-w-[30rem]">{s.text}</span>
                                <MdArrowOutward aria-hidden="true" className="shrink-0 w-12 h-12 p-2.5 rounded-full bg-[#1d1d1f] text-white transition-transform duration-500 group-hover:rotate-45" />
                            </span>
                        </span>
                        <span className="sr-only">(yeni sekmede açılır)</span>
                    </a>
                ))}
            </section>

            <section className="kun-wrap pb-28 grid gap-14 lg:grid-cols-12" aria-label="Hızlı erişim ve araştırma hizmetleri">
                <div className="lg:col-span-6" data-reveal>
                    <h2 className="text-[0.8rem] font-semibold text-[#6e6e73] mb-6">Hızlı erişim</h2>
                    <ul className="flex flex-wrap gap-2">
                        {QUICK_LINKS.map((q, i) => (
                            <li key={q.label}>
                                <SmartLink to={q.to} href={q.href} className={`block border-[1px] ${i % 2 ? "border-[#1d1d1f] text-[#1d1d1f]" : "border-[#d2d2d7] text-[#424245]"} text-[0.95rem] px-4 py-1.5 rounded-full hover:bg-[#1d1d1f] hover:text-white transition-colors duration-300`}>
                                    {q.label}
                                </SmartLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="lg:col-span-5 lg:col-start-8" data-reveal>
                    <h2 className="text-[0.8rem] font-semibold text-[#6e6e73] mb-6">Araştırma hizmetleri</h2>
                    <ul className="border-t border-[#d2d2d7]">
                        {services.map((s) => (
                            <li key={s.slug} className="border-b border-[#d2d2d7]">
                                <Link to={`/arastirma/${s.slug}`} className="group flex items-center justify-between gap-4 py-4 text-xl md:text-2xl text-[#424245] hover:text-[#1d1d1f] transition-colors">
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
