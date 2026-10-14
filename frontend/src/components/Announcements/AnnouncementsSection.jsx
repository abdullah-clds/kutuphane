import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { activeTrials, announcements, announcementStatus, daysLeft, formatDate, formatDateShort, media, trialLabel } from "../../lib/content";

gsap.registerPlugin(ScrollTrigger);

const TABS = [
    { key: "all", label: "Tümü", test: () => true },
    { key: "trial", label: "Deneme erişimi", test: (a) => a.isTrial },
    { key: "other", label: "Diğer", test: (a) => !a.isTrial },
];

const LIST_SIZE = 8;

/**
 * Dedicated, compact announcements block: a cream panel set into the dark page
 * (theme radius and 0.5rem gutter). One featured item, eight recent titles, live trial countdowns.
 */
const AnnouncementsSection = () => {
    const scope = useRef(null);
    const [tab, setTab] = useState("all");

    const items = useMemo(() => announcements.filter(TABS.find((t) => t.key === tab).test), [tab]);
    const [featured, ...rest] = items;
    const list = rest.slice(0, LIST_SIZE);
    const trials = activeTrials();
    const featuredStatus = featured ? announcementStatus(featured) : null;

    useGSAP(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const tl = gsap.timeline({ scrollTrigger: { trigger: scope.current, start: "top 80%", once: true } });
        tl.from(scope.current.querySelector(".ann-panel"), { y: 60, autoAlpha: 0, duration: 1, ease: "power3.out" })
            .from(scope.current.querySelectorAll(".ann-title > span"), { yPercent: 110, duration: 1, ease: "power4.out" }, "-=0.6")
            .from(scope.current.querySelectorAll("[data-ann]"), { y: 24, autoAlpha: 0, stagger: 0.04, duration: 0.7, ease: "power3.out" }, "-=0.7");
    }, { scope });

    return (
        <section ref={scope} id="duyurular" aria-labelledby="duyurular-baslik" className="w-full px-2 pb-24 md:pb-28">
            <div className="ann-panel rounded-[2.5rem] bg-[#f4efe7] text-[#2a2725] p-5 md:p-8">
                {/* Header: one row */}
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-[#2a2725]/12 pb-5">
                    <div className="flex items-end gap-4">
                        <h2 id="duyurular-baslik" className="ann-title kun-mask text-5xl md:text-6xl leading-[0.9] tracking-tight font-medium">
                            <span>Duyurular</span>
                        </h2>
                        <span className="text-[0.7rem] font-bold text-[#8a7f70] pb-1" data-ann>{announcements.length} duyuru</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2" data-ann>
                        <div role="tablist" aria-label="Duyuru türü" className="flex gap-1 rounded-full bg-[#2a2725]/[0.06] p-1">
                            {TABS.map((t) => (
                                <button
                                    key={t.key}
                                    type="button"
                                    role="tab"
                                    aria-selected={tab === t.key}
                                    onClick={() => setTab(t.key)}
                                    className={`rounded-full px-3.5 py-1 text-[0.8rem] transition-colors duration-300 ${tab === t.key ? "bg-[#2a2725] text-[#f4efe7]" : "text-[#5e574f] hover:text-[#2a2725]"}`}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>
                        <Link to="/duyurular" className="group inline-flex items-center gap-2 rounded-full bg-[#2a2725] text-[#f4efe7] pl-4 pr-1 py-1 text-[0.8rem]">
                            Tüm duyurular
                            <MdArrowOutward aria-hidden="true" className="w-7 h-7 p-1.5 rounded-full bg-[#f4efe7] text-[#2a2725] transition-transform duration-500 group-hover:rotate-45" />
                        </Link>
                    </div>
                </div>

                {featured && (
                    <div className="mt-5 grid gap-5 lg:grid-cols-12" role="tabpanel">
                        {/* Featured */}
                        <Link to={`/duyurular/${featured.slug}`} data-ann className="group lg:col-span-5 rounded-[2rem] bg-[#2a2725] text-[#f4efe7] p-3 flex flex-col sm:flex-row lg:flex-col gap-4">
                            {featured.image && (
                                <div className="relative sm:w-56 lg:w-full shrink-0 aspect-[2/1] rounded-[1.5rem] overflow-hidden bg-[#181717]">
                                    <img src={media(featured.image)} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 w-full h-full object-cover blur-xl opacity-40 scale-125" />
                                    <img src={media(featured.image)} alt="" loading="lazy" className="absolute inset-0 m-auto max-w-[84%] max-h-[80%] object-contain rounded-xl transition-transform duration-700 group-hover:scale-[1.04]" />
                                </div>
                            )}
                            <div className="flex flex-col gap-2 px-2 pb-2 flex-1">
                                <div className="flex flex-wrap items-center gap-2 text-[0.7rem]">
                                    <span className="font-bold text-[#eae5dd]">En son · <time dateTime={featured.date}>{formatDate(featured.date)}</time></span>
                                    {featuredStatus && <span className={`rounded-full px-2.5 py-0.5 ${featuredStatus === "active" ? "bg-[#f4efe7] text-[#2a2725]" : "border border-[#f4efe7]/30"}`}>{trialLabel(featuredStatus, featured.trialEnd)}</span>}
                                </div>
                                <h3 className="text-xl md:text-2xl leading-[1.1] tracking-tight [text-wrap:balance]">{featured.title}</h3>
                                <p className="text-[0.82rem] text-[#b1a696] leading-relaxed line-clamp-2">{featured.excerpt}</p>
                                <span className="mt-auto pt-2 inline-flex items-center gap-1 text-[0.75rem] text-[#f4efe7] underline underline-offset-4 decoration-[#f4efe7]/30 group-hover:decoration-[#f4efe7]">Devamını oku <MdArrowOutward aria-hidden="true" /></span>
                            </div>
                        </Link>

                        {/* Recent titles: two compact columns */}
                        <div className="lg:col-span-7 flex flex-col">
                        <ol className="grid sm:grid-cols-2 gap-x-6 content-start">
                            {list.map((a, i) => {
                                const status = announcementStatus(a);
                                return (
                                    // Phones show the first four; the archive link covers the rest.
                                    <li key={a.slug} data-ann className={`border-b border-[#2a2725]/12 ${i >= 4 ? "hidden sm:block" : ""}`}>
                                        <Link to={`/duyurular/${a.slug}`} className="group flex items-start gap-3 py-3.5">
                                            <span className="flex-1 min-w-0">
                                                <span className="flex items-center gap-2 text-[0.7rem] text-[#8a7f70]">
                                                    <time dateTime={a.date}>{formatDateShort(a.date)}</time>
                                                    {status === "active" && <span className="inline-flex items-center gap-1 text-[#2a2725]"><span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#2a2725]" />Deneme · {daysLeft(a.trialEnd)} gün</span>}
                                                    {status === "expired" && <span>· süresi doldu</span>}
                                                </span>
                                                <span className="block mt-1 text-[0.98rem] leading-snug line-clamp-2 group-hover:text-[#8a7f70] transition-colors">{a.title}</span>
                                            </span>
                                            <MdArrowOutward aria-hidden="true" className="shrink-0 mt-1 w-6 h-6 p-1 rounded-full border border-[#2a2725]/20 transition-all duration-500 group-hover:bg-[#2a2725] group-hover:text-[#f4efe7] group-hover:rotate-45" />
                                        </Link>
                                    </li>
                                );
                            })}
                            {list.length === 0 && <li className="py-6 text-[#5e574f] text-sm">Bu türde başka duyuru yok.</li>}
                        </ol>
                    {/* Live trial countdowns */}
                    {trials.length > 0 && (
                        <div className="mt-auto pt-5 flex flex-col gap-3" data-ann>
                            <Link to="/deneme-erisimli-veri-tabanlari" className="shrink-0 text-[0.7rem] font-bold text-[#5e574f] hover:text-[#2a2725]">Deneme erişimindeki kaynaklar ({trials.length})</Link>
                            <ul className="flex flex-wrap gap-1.5">
                                {trials.map((d) => (
                                    <li key={d.id}>
                                        <Link to={`/deneme-erisimli-veri-tabanlari#${d.id}`} title={`Son erişim: ${formatDate(d.trialEnd)}`} className="inline-flex items-center gap-1.5 rounded-full border border-[#2a2725]/20 px-3 py-1 text-[0.75rem] hover:bg-[#2a2725] hover:text-[#f4efe7] transition-colors">
                                            {d.name}<span className="text-[#8a7f70]">· {daysLeft(d.trialEnd)} gün</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
};

export default AnnouncementsSection;
