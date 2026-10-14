import { useRef } from "react";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { activeTrials, announcements, announcementStatus, daysLeft, formatDate } from "../../lib/content";

gsap.registerPlugin(ScrollTrigger);

const COUNT = 6;

/**
 * Homepage announcements: a quiet typographic grid on the dark page.
 * Each item = hairline, date, status, title. No images; the archive holds the rest.
 */
const AnnouncementsSection = () => {
    const scope = useRef(null);
    const items = announcements.slice(0, COUNT);
    const trials = activeTrials().length;

    useGSAP(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        gsap.from(scope.current.querySelectorAll("[data-ann]"), {
            y: 24, autoAlpha: 0, stagger: 0.05, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: scope.current, start: "top 80%", once: true },
        });
    }, { scope });

    return (
        <section ref={scope} id="duyurular" aria-labelledby="duyurular-baslik" className="w-full px-6 md:px-8 pt-8 pb-24">
            <div className="flex items-end justify-between gap-6" data-ann>
                <div>
                    <p className="text-[.7rem] font-bold text-[#eae5dd]">Kütüphaneden</p>
                    <h2 id="duyurular-baslik" className="mt-2 text-[#f4efe7] text-4xl md:text-5xl tracking-tight">Duyurular</h2>
                </div>
                <Link to="/duyurular" className="group inline-flex items-center gap-2 text-[0.8rem] text-[#b1a696] hover:text-[#f4efe7] transition-colors pb-1">
                    Tüm duyurular ({announcements.length})
                    <MdArrowOutward aria-hidden="true" className="transition-transform duration-500 group-hover:rotate-45" />
                </Link>
            </div>

            <ol className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((a) => {
                    const status = announcementStatus(a);
                    return (
                        <li key={a.slug} data-ann>
                            <Link to={`/duyurular/${a.slug}`} className="group flex flex-col gap-3 h-full border-t border-[#4f4b48] hover:border-[#f4efe7] transition-colors duration-500 pt-4 pb-8">
                                <span className="flex items-center justify-between gap-3 text-[0.72rem]">
                                    <time dateTime={a.date} className="text-[#8a8073]">{formatDate(a.date)}</time>
                                    {status === "active"
                                        ? <span className="inline-flex items-center gap-1.5 text-[#f4efe7]"><span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#f4efe7]" />Deneme · {daysLeft(a.trialEnd)} gün</span>
                                        : status === "expired" ? <span className="text-[#8a8073]">Süresi doldu</span> : null}
                                </span>
                                <span className="text-[1.15rem] leading-snug text-[#b1a696] group-hover:text-[#f4efe7] transition-colors line-clamp-3 [text-wrap:pretty]">{a.title}</span>
                            </Link>
                        </li>
                    );
                })}
            </ol>

            {trials > 0 && (
                <p className="text-[0.8rem] text-[#8a8073]" data-ann>
                    Şu anda {trials} kaynak deneme erişiminde ·{" "}
                    <Link to="/deneme-erisimli-veri-tabanlari" className="text-[#b1a696] hover:text-[#f4efe7] underline underline-offset-4 decoration-[#4f4b48]">Deneme Erişimli Veri Tabanları</Link>
                </p>
            )}
        </section>
    );
};

export default AnnouncementsSection;
