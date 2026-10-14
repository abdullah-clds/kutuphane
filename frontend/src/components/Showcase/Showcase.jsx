import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import { services, media, leadSentence } from "../../lib/content";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Logos are shown whole; photographs fill the card.
const CONTAIN = new Set(["ankos", "kasif"]);
const pad = (n) => String(n).padStart(2, "0");

const Showcase = () => {
    const containerRef = useRef(null);
    const imgConRef = useRef(null);
    const items = services;

    useGSAP(() => {
        if (!imgConRef.current || !containerRef.current) return;

        // ✅ TARGET ONLY INNER IMAGES (NOT OUTER DIV)
        const images = gsap.utils.toArray(".image-item");

        const totalWidth =
            imgConRef.current.scrollWidth - containerRef.current.offsetWidth;

        let lastScroll = window.scrollY;
        let velocity = 0;

        // ✅ Horizontal scroll animation (unchanged)
        gsap.to(imgConRef.current, {
            x: () => -totalWidth,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                // Baseline showed the cards filling the viewport; "-10% 10%" only produced that
                // because Gallery's pin was measured after this one. With triggers sorted,
                // "top top" reproduces the observed composition (docs/ANIMATION-REGRESSION.md #A4).
                start: "top top",
                end: () => `+=${totalWidth}`,
                scrub: true,
                pin: true,
                // invalidateOnRefresh: true,
                // markers: true,
            }
        });
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            aria-label="Araştırma hizmetleri"
            className='relative w-full h-dvh overflow-hidden'
        >
            <div
                ref={imgConRef}
                className="absolute top-0 left-0 h-full flex items-center justify-start gap-2 p-2 overflow-hidden"
            >
                {items.map((s, i) => {
                    const contain = CONTAIN.has(s.slug);
                    return (
                        <Link
                            key={s.slug}
                            to={`/arastirma/${s.slug}`}
                            className="group relative flex-shrink-0 w-[80vw] h-full overflow-hidden rounded-[2.5rem]"
                        >
                            <div className="image-item absolute inset-0 rounded-[2.5rem] overflow-hidden bg-[#2a2725]">
                                {contain ? (
                                    <>
                                        <img src={media(s.image)} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 scale-125" />
                                        <div className="absolute inset-0 flex items-center justify-center p-24 md:p-40">
                                            <img src={media(s.image)} alt="" loading="lazy" className="max-w-full max-h-full object-contain rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.45)]" />
                                        </div>
                                    </>
                                ) : (
                                    <img src={media(s.image)} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]" />
                                )}
                                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#181717]/65 via-[#181717]/10 to-[#181717]/75" />
                            </div>

                            <div className="absolute top-8 md:top-10 left-5 right-5 flex justify-between items-start gap-6 text-[#f4efe7]">
                                <h3 className="text-3xl md:text-5xl font-bold leading-[1.02] tracking-tight max-w-[40rem] [text-wrap:balance]">{s.title}</h3>
                                <p className="shrink-0 border-[1px] rounded-3xl px-2 py-1 text-center text-[0.7rem]">Araştırma</p>
                            </div>

                            <div className="absolute bottom-8 md:bottom-10 left-5 right-5 flex justify-between items-end gap-6">
                                <p className="max-w-[36rem] text-[0.8rem] md:text-[0.85rem] font-bold text-[#f4efe7] leading-relaxed">{leadSentence(s.text, 260)}</p>
                                <div className="flex justify-center items-center shrink-0" aria-hidden="true">
                                    <p className="text-[#f4efe7] border-[1px] rounded-3xl px-3 md:px-[1vw] py-1 text-center text-[0.7rem]">{pad(i + 1)}</p>
                                    <p className="text-[#4e484e] border-[1px] rounded-3xl px-3 md:px-[1vw] py-1 text-center text-[0.7rem]">{pad(items.length)}</p>
                                </div>
                            </div>
                        </Link>
                    );
                })}

                {/* Closing card: search */}
                <Link to="/tarama" className="group relative flex-shrink-0 w-[80vw] md:w-[40vw] h-full overflow-hidden rounded-[2.5rem] bg-[#f4efe7] text-[#2a2725] flex flex-col justify-between p-8 md:p-10">
                    <p className="text-[0.7rem] font-bold">Katalog Tarama · Tüm Kaynaklarda Tarama</p>
                    <span className="flex items-end justify-between gap-4">
                        <span className="text-5xl md:text-7xl font-medium tracking-tight leading-[0.9]">Tarama<br />yapın</span>
                        <MdArrowOutward aria-hidden="true" className="shrink-0 w-14 h-14 md:w-20 md:h-20 rounded-full bg-[#2a2725] text-[#b3a694] p-3 transition-transform duration-500 group-hover:rotate-45" />
                    </span>
                </Link>
            </div>
        </section>
    );
};

export default Showcase;
