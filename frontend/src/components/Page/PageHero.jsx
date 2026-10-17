import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { media } from "../../lib/content";

gsap.registerPlugin(SplitText, ScrollTrigger);

/**
 * Inner-page header built from the theme's Hero: the same rounded image card, the same
 * scroll-scrubbed scale/parallax on the image, a large title bottom-left and a small note bottom-right.
 * `contain` shows a graphic (announcement poster, logo) whole on a blurred copy of itself.
 */
const PageHero = ({ title, eyebrow, crumbs = [], image, imageAlt = "", contain = false, aside, size = "lg" }) => {
    const ref = useRef(null);

    useGSAP(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const mm = gsap.matchMedia();
        // Same values as Hero.jsx (desktop only, like the original).
        mm.add("(min-width: 769px)", () => {
            if (reduce) return;
            gsap.to(ref.current.querySelectorAll(".page-hero-img"), {
                yPercent: -5,
                scale: 1.2,
                ease: "power1.inOut",
                scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 1.5 },
            });
        });
        if (!reduce) {
            SplitText.create(ref.current.querySelector("h1"), {
                type: "lines",
                mask: "lines",
                autoSplit: true,
                onSplit: (self) => gsap.from(self.lines, { yPercent: 110, stagger: 0.08, duration: 1.1, ease: "power4.out", delay: 0.1 }),
            });
            gsap.from(ref.current.querySelectorAll("[data-hero-fade]"), { autoAlpha: 0, y: 20, duration: 0.9, ease: "power3.out", delay: 0.45, stagger: 0.08 });
        }
        return () => mm.revert();
    }, { scope: ref });

    const height = size === "sm" ? "h-[62vh] md:h-[70vh]" : "h-[74vh] md:h-[86vh]";

    return (
        <section ref={ref} className={`page-hero w-full ${height} p-2.5 md:p-2 mb-10 md:mb-14`}>
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-[#2a2725]">
                {image && !contain && (
                    <img src={media(image)} alt={imageAlt} className="page-hero-img absolute inset-0 w-full h-full object-cover" fetchPriority="high" />
                )}
                {image && contain && (
                    <>
                        <img src={media(image)} alt="" aria-hidden="true" className="page-hero-img absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110" />
                        {/* Graphic on the right half (top on mobile), title keeps the left half */}
                        <div className="absolute inset-x-0 top-0 h-[48%] md:h-auto md:inset-y-0 md:left-auto md:right-0 md:w-[44%] flex items-center justify-center p-6 pt-24 md:p-12 md:pt-24">
                            <img src={media(image)} alt={imageAlt} className="max-h-full max-w-full object-contain rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.45)]" />
                        </div>
                    </>
                )}
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#181717]/90 via-[#181717]/30 to-[#181717]/45" />

                {crumbs.length > 0 && (
                    <nav aria-label="Konum" data-hero-fade className="absolute top-20 md:top-24 left-6 md:left-7 right-6 text-[0.7rem] text-[#eae5dd]/80">
                        <ol className="flex flex-wrap gap-x-2 gap-y-1">
                            <li><Link to="/" className="hover:text-[#f4efe7]">Anasayfa</Link></li>
                            {crumbs.map((c) => (
                                <li key={c.label} className="flex gap-2">
                                    <span aria-hidden="true">/</span>
                                    {c.to ? <Link to={c.to} className="hover:text-[#f4efe7]">{c.label}</Link> : <span>{c.label}</span>}
                                </li>
                            ))}
                        </ol>
                    </nav>
                )}

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div className={contain ? "md:max-w-[52%]" : "md:max-w-[72%]"}>
                        {eyebrow && <p data-hero-fade className="text-[0.7rem] font-bold text-[#eae5dd] mb-4">{eyebrow}</p>}
                        <h1 className={`text-[#f4efe7] font-medium tracking-[-0.025em] leading-[0.95] [text-wrap:balance] ${String(title).length > 55 ? "text-[length:var(--fs-h2)] leading-[1.02]" : contain ? "text-[length:var(--fs-h1)]" : "text-[length:var(--fs-display)]"}`} style={{ textShadow: "0 2px 18px rgba(0,0,0,0.35)" }}>
                            {title}
                        </h1>
                    </div>
                    {aside && (
                        <div data-hero-fade className="md:w-[24%] text-[#f4efe7] text-[0.75rem] font-medium tracking-wide md:text-end" style={{ textShadow: "1px 1px 4px #000" }}>
                            {aside}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PageHero;
