import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { media } from "../../lib/content";

gsap.registerPlugin(SplitText, ScrollTrigger);

/**
 * Inner-page header in an Apple-like layout: breadcrumb, eyebrow, large headline, grey lead.
 * `size="sm"` (text pages) shows no picture; otherwise a wide rounded photo, or a framed
 * graphic when `contain` (announcement posters, logos).
 */
const PageHero = ({ title, eyebrow, crumbs = [], image, imageAlt = "", contain = false, aside, size = "lg" }) => {
    const ref = useRef(null);
    const showImage = image && size !== "sm";

    useGSAP(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        SplitText.create(ref.current.querySelector("h1"), {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) => gsap.from(self.lines, { yPercent: 105, stagger: 0.06, duration: 0.9, ease: "power3.out", delay: 0.05 }),
        });
        gsap.from(ref.current.querySelectorAll("[data-hero-fade]"), { autoAlpha: 0, y: 12, duration: 0.8, ease: "power2.out", delay: 0.25, stagger: 0.06 });
        const img = ref.current.querySelector(".page-hero-img");
        if (img && !contain) {
            gsap.fromTo(img, { scale: 1.08 }, { scale: 1, ease: "none", scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true } });
        }
    }, { scope: ref });

    return (
        <header ref={ref} className={`page-hero bg-white pt-24 md:pt-32 ${showImage ? "pb-10" : "pb-12 md:pb-16"}`}>
            <div className="kun-wrap">
                {crumbs.length > 0 && (
                    <nav aria-label="Konum" data-hero-fade className="text-[0.8rem] text-[#6e6e73]">
                        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                            <li><Link to="/" className="hover:text-[#1d1d1f] hover:underline">Anasayfa</Link></li>
                            {crumbs.map((c) => (
                                <li key={c.label} className="flex items-center gap-1.5">
                                    <span aria-hidden="true">›</span>
                                    {c.to ? <Link to={c.to} className="hover:text-[#1d1d1f] hover:underline">{c.label}</Link> : <span aria-current="page" className="text-[#1d1d1f]">{c.label}</span>}
                                </li>
                            ))}
                        </ol>
                    </nav>
                )}
                {eyebrow && <p data-hero-fade className="mt-8 text-[0.95rem] font-semibold text-[var(--kun-accent)]">{eyebrow}</p>}
                <h1 className={`${eyebrow ? "mt-2" : "mt-8"} max-w-[54rem] font-semibold tracking-[-0.028em] text-[#1d1d1f] [text-wrap:balance] ${String(title).length > 60 ? "text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.12]" : "text-[clamp(2.3rem,5vw,4rem)] leading-[1.06]"}`}>
                    {title}
                </h1>
                {aside && <p data-hero-fade className="kun-lead mt-4 max-w-[44rem]">{aside}</p>}
            </div>

            {showImage && !contain && (
                <div className="mx-auto max-w-[1360px] px-2 md:px-4 mt-10" data-hero-fade>
                    <div className="rounded-[28px] overflow-hidden aspect-[16/9] md:aspect-[21/8] bg-[#f5f5f7]">
                        <img src={media(image)} alt={imageAlt} className="page-hero-img w-full h-full object-cover" fetchPriority="high" />
                    </div>
                </div>
            )}
            {showImage && contain && (
                <div className="kun-wrap mt-10" data-hero-fade>
                    <div className="rounded-[28px] bg-[#f5f5f7] flex items-center justify-center p-6 md:p-12 h-[260px] md:h-[420px]">
                        <img src={media(image)} alt={imageAlt} className="max-w-full max-h-full object-contain rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)]" />
                    </div>
                </div>
            )}
        </header>
    );
};

export default PageHero;
