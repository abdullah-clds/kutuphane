import { useRef } from "react";
import { Link } from "react-router-dom";
import { MdArrowOutward, MdMail, MdPhone } from "react-icons/md";
import PageHero from "../../components/Page/PageHero";
import SearchPanel from "../../components/Search/SearchPanel";
import SmartLink from "../../components/Buttons/SmartLink";
import useReveal from "../../components/Page/useReveal";
import { CONTACT, QUICK_LINKS, SEARCH, services } from "../../lib/content";

const Eyebrow = ({ children, className = "" }) => (
    <h2 className={`text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#8a8073] ${className}`}>{children}</h2>
);

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

            <div className="kun-wrap pb-28">
                {/* Search hub */}
                <section aria-label="Arama" className="rounded-[2rem] bg-[#1f1d1c] ring-1 ring-inset ring-[#2f2c29] p-6 md:p-10 lg:p-12" data-reveal>
                    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 lg:items-center">
                        <div className="lg:col-span-4">
                            <h2 className="kun-title">Ne arıyorsunuz?</h2>
                            <p className="kun-lead mt-3">Kitap, makale, tez ve diğer kaynakları tek yerden arayın.</p>
                        </div>
                        <div className="lg:col-span-8"><SearchPanel /></div>
                    </div>
                </section>

                {/* The two systems */}
                <section aria-label="Arama sistemleri" className="mt-4 grid gap-4 md:grid-cols-2">
                    {[SEARCH.ebsco, SEARCH.koha].map((s) => (
                        <a key={s.label} href={s.home} target="_blank" rel="noopener noreferrer" data-reveal
                            className="group flex flex-col justify-between gap-8 rounded-[2rem] bg-[#f4efe7] p-7 md:p-9 text-[#2a2725] transition-colors hover:bg-white">
                            <span className="flex items-start justify-between gap-6">
                                <span>
                                    <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#6b6259]">{s.system}</span>
                                    <span className="mt-2 block text-[length:var(--fs-h3)] font-medium leading-tight tracking-tight">{s.label}</span>
                                </span>
                                <MdArrowOutward aria-hidden="true" className="shrink-0 w-10 h-10 p-2.5 rounded-full bg-[#2a2725] text-[#f4efe7] transition-transform duration-500 group-hover:rotate-45" />
                            </span>
                            <span className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-6">
                                <span className="max-w-[28rem] text-[0.95rem] leading-relaxed text-[#5e574f]">{s.text}</span>
                                <span className="shrink-0 text-[0.85rem] font-medium underline underline-offset-4 decoration-[#2a2725]/30 group-hover:decoration-[#2a2725]">Sisteme git</span>
                            </span>
                            <span className="sr-only">(yeni sekmede açılır)</span>
                        </a>
                    ))}
                </section>

                <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-12">
                    {/* Quick links */}
                    <section aria-labelledby="quick" className="lg:col-span-7" data-reveal>
                        <Eyebrow><span id="quick">Hızlı erişim</span></Eyebrow>
                        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                            {QUICK_LINKS.map((q) => (
                                <li key={q.label}>
                                    <SmartLink to={q.to} href={q.href}
                                        className="group flex h-full items-center justify-between gap-4 rounded-2xl bg-[#1f1d1c] ring-1 ring-inset ring-[#2f2c29] px-5 py-4 text-[0.98rem] text-[#f4efe7] transition-colors hover:bg-[#262321] hover:ring-[#4f4b48]">
                                        <span>{q.label}</span>
                                        <MdArrowOutward aria-hidden="true" className={`shrink-0 w-4 h-4 text-[#8a8073] transition-transform duration-300 group-hover:text-[#f4efe7] ${q.href ? "group-hover:rotate-45" : "rotate-45 group-hover:translate-x-0.5"}`} />
                                    </SmartLink>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Research services + help */}
                    <aside className="lg:col-span-5 flex flex-col gap-4" data-reveal>
                        <section className="rounded-[1.75rem] bg-[#1f1d1c] ring-1 ring-inset ring-[#2f2c29] p-6 md:p-7">
                            <Eyebrow>Araştırma hizmetleri</Eyebrow>
                            <ul className="mt-3 -mx-3 flex flex-col">
                                {services.map((s) => (
                                    <li key={s.slug}>
                                        <Link to={`/arastirma/${s.slug}`} className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-[0.95rem] text-[#d8cfc2] transition-colors hover:bg-[#262321] hover:text-[#f4efe7]">
                                            {s.title}
                                            <MdArrowOutward aria-hidden="true" className="shrink-0 w-4 h-4 text-[#8a8073] transition-transform duration-300 group-hover:rotate-45 group-hover:text-[#f4efe7]" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </section>
                        <section className="rounded-[1.75rem] bg-[#f4efe7] p-6 md:p-7 text-[#2a2725]">
                            <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#6b6259]">Aradığınızı bulamadınız mı?</h2>
                            <p className="mt-3 text-[0.92rem] leading-snug text-[#5e574f]">Sorularınız için {CONTACT.unit}’na ulaşabilirsiniz.</p>
                            <ul className="mt-4 space-y-2 text-[0.92rem]">
                                <li><a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 font-medium hover:underline underline-offset-4"><MdMail aria-hidden="true" className="w-4 h-4" />{CONTACT.email}</a></li>
                                <li><a href={`tel:${CONTACT.phoneHref}`} className="inline-flex items-center gap-2 font-medium hover:underline underline-offset-4"><MdPhone aria-hidden="true" className="w-4 h-4" />{CONTACT.phone}</a></li>
                            </ul>
                        </section>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
