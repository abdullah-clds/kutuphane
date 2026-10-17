import { useEffect, useRef, useState } from "react";
import gsap from "gsap/all";
import smoke from "../../assets/smoke_final.mp4";
import { media } from "../../lib/content";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import { IoMdArrowForward, IoMdArrowBack } from "react-icons/io";

// Opening visual: the library's own photographs (uploads of kutuphane.kapadokya.edu.tr).
const SLIDES = [
    { src: "media/site/tas-kemer-raflar.jpg", alt: "Taş kemer altında kitap rafları ve çalışma masaları", caption: "Taş kemer altında raflar" },
    { src: "media/site/merkez-kutuphane.jpg", alt: "Merkez Kütüphane: taş tonozlu salonda kitap rafları", caption: "Merkez Kütüphane · Mustafapaşa" },
    { src: "media/site/okuma-salonu.jpg", alt: "Okuma salonunda çalışan öğrenciler", caption: "Okuma salonu" },
    { src: "media/site/sosyal-bilimler-kutuphanesi.jpg", alt: "Sosyal Bilimler Kütüphanesi: kitap rafları", caption: "Sosyal Bilimler Kütüphanesi · Mustafapaşa" },
    { src: "media/site/fen-bilimleri-kutuphanesi.jpg", alt: "Fen Bilimleri Kütüphanesi: iki katlı okuma salonu", caption: "Fen Bilimleri Kütüphanesi · Ürgüp" },
].map((s) => ({ ...s, url: media(s.src) }));

const INTERVAL = 6500;
const pad = (n) => String(n).padStart(2, "0");

const Hero = () => {

    const isMobHero = useMediaQuery({
        query: "(max-width:768px)",
    });
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const first = useRef(true);
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Original scroll scrub on the image layer (unchanged).
    useGSAP(() => {
        if (!isMobHero) {
            gsap.to(".hero-section .hero-img", {
                yPercent: "-5",
                stagger: 0.02,
                scale: 1.2,
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: ".hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.5,
                    // markers: true
                }
            });
        };
    }, [isMobHero]);


    // Title entrance once the preloader opens: "Kütüp" rises from its mask, "hane" glides in.
    useGSAP(() => {
        if (reduce) return;
        const kutup = titleRef.current.querySelector("[data-kutup]");
        const hane = titleRef.current.querySelector("[data-hane]");
        gsap.set(kutup, { yPercent: 110 });
        gsap.set(hane, { autoAlpha: 0, xPercent: 18, filter: "blur(10px)" });
        const play = () => {
            gsap.to(kutup, { yPercent: 0, duration: 1.3, ease: "power4.out" });
            gsap.to(hane, { autoAlpha: 1, xPercent: 0, filter: "blur(0px)", duration: 1.6, ease: "power3.out", delay: 0.35 });
        };
        if (window.__kunPreloaded) play();
        else window.addEventListener("kun:preloaded", play, { once: true });
        return () => window.removeEventListener("kun:preloaded", play);
    }, { scope: sectionRef });

    // Slide change: the incoming photo opens from the bottom edge (the clip-path reveal used in
    // StickyCols) while it settles from 1.15 to 1.
    useGSAP(() => {
        const slides = gsap.utils.toArray(".hero-slide", sectionRef.current);
        if (first.current) {
            first.current = false;
            gsap.set(slides, { zIndex: (i) => (i === index ? 2 : 0), clipPath: "inset(0% 0% 0% 0%)" });
            return;
        }
        const incoming = slides[index];
        gsap.set(slides, { zIndex: (i) => (i === index ? 2 : slides[i].dataset.shown === "1" ? 1 : 0) });
        slides.forEach((s, i) => { s.dataset.shown = i === index ? "1" : "0"; });
        if (reduce) { gsap.set(incoming, { clipPath: "inset(0% 0% 0% 0%)", scale: 1 }); return; }
        gsap.fromTo(incoming, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power4.inOut" });
        gsap.fromTo(incoming.querySelectorAll(".hero-slide-inner"), { scale: 1.15 }, { scale: 1, duration: 2.2, ease: "power3.out" });
    }, { scope: sectionRef, dependencies: [index] });

    // Autoplay; pauses on hover/focus, in background tabs and for reduced motion.
    useEffect(() => {
        if (reduce || paused) return;
        const t = setTimeout(() => { if (!document.hidden) setIndex((i) => (i + 1) % SLIDES.length); }, INTERVAL);
        return () => clearTimeout(t);
    }, [index, paused, reduce]);

    const go = (dir) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);
    const slide = SLIDES[index];

    return (
        <section
            ref={sectionRef}
            aria-roledescription="carousel"
            aria-label="Kütüphanelerimizden görüntüler"
            className="hero-section w-dvw md:h-dvh h-[100vh] md:p-2 p-2.5"
        >
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">
                <div className="absolute inset-0">
                    {/* Background images (down layer) */}
                    <div className="hero-img absolute inset-0 z-0">
                        {SLIDES.map((s, i) => (
                            <div key={s.src} data-shown={i === 0 ? "1" : "0"} className="hero-slide absolute inset-0 overflow-hidden" style={{ zIndex: i === 0 ? 2 : 0 }}>
                                <div
                                    role="img"
                                    aria-label={s.alt}
                                    aria-hidden={i !== index}
                                    className="hero-slide-inner absolute inset-0 bg-no-repeat bg-cover bg-center"
                                    style={{ backgroundImage: `url(${s.url})` }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Legibility: the library photos are brighter than the theme's dusk image */}
                    <div aria-hidden="true" className="absolute inset-0 z-[5] bg-gradient-to-t from-[#181717]/85 via-[#181717]/10 to-[#181717]/45 md:from-[#181717]/70 md:via-transparent md:to-[#181717]/35" />

                    {/* Smoke video (upper layer) */}
                    <video
                        src={smoke}
                        autoPlay
                        loop
                        aria-hidden="true"
                        muted
                        playsInline
                        className="hidden md:block absolute inset-0 w-full h-full object-cover z-10 pointer-events-none object-center opacity-50 mix-blend-hard-light"
                    ></video>
                </div>
                <div className="p-4 flex flex-col md:justify-center">
                    <div className="relative h-dvh">
                        {/* Logo sits top-left (outside the card), so the title starts below it */}
                        <h1
                            className="text-[#f4efe7] text-start text-[length:var(--fs-display)] font-medium leading-[0.9] tracking-[-0.03em] lg:absolute lg:left-1.5 pl-1.5 lg:pl-0 pt-20 md:pt-24 relative z-20"
                            style={{ textShadow: "0 2px 18px rgba(0,0,0,0.35)" }}
                        >
                            <span className="sr-only">Kapadokya Üniversitesi Kütüphane</span>
                            {/* "Kütüp" (books) upright, "hane" (house) in an italic serif */}
                            <span ref={titleRef} aria-hidden="true" className="inline-flex items-baseline whitespace-nowrap">
                                <span className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em]"><span data-kutup className="inline-block font-semibold tracking-[-0.045em]">Kütüp</span></span>
                                <span data-hane className="kun-serif inline-block italic text-[1.18em] leading-none tracking-[-0.01em] ml-[0.015em]">hane</span>
                            </span>
                        </h1>

                        <div className="w-full h-auto absolute z-20 bottom-28 md:top-24 md:bottom-[8%] lg:bottom-[9%] px-1.5 flex md:flex-row flex-col md:justify-between md:items-end gap-6 md:gap-0">
                            <h2
                                className="text-start lg:mt-0 text-[#f4efe7] text-[length:var(--fs-h3)] font-medium leading-[1.05] tracking-tight flex flex-col"
                                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.45)" }}
                            >
                                <span>Bilgiye</span>
                                <span>Açılan</span>
                                <span>Kapı</span>
                            </h2>

                            <div
                                className="md:w-[24%] w-full flex flex-col gap-3 md:gap-4 md:items-end"
                                onMouseEnter={() => setPaused(true)}
                                onMouseLeave={() => setPaused(false)}
                                onFocus={() => setPaused(true)}
                                onBlur={() => setPaused(false)}
                            >
                                {/* Slide controls in the theme's counter/progress style */}
                                <div className="flex items-center gap-3 w-full md:justify-end">
                                    <div className="flex gap-1">
                                        <button type="button" aria-label="Önceki görsel" onClick={() => go(-1)} className="border-[1px] p-1 border-[#f4efe7]/60 hover:bg-[#f4efe7]/20 rounded-4xl">
                                            <IoMdArrowBack aria-hidden="true" className="text-[#f1ece4] w-5 h-5" />
                                        </button>
                                        <button type="button" aria-label="Sonraki görsel" onClick={() => go(1)} className="border-[1px] p-1 border-[#f4efe7]/60 hover:bg-[#f4efe7]/20 rounded-4xl">
                                            <IoMdArrowForward aria-hidden="true" className="text-[#f1ece4] w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="relative flex-1 md:flex-none md:w-28 h-[0.1rem] bg-[#f4efe7]/30" aria-hidden="true">
                                        <div key={`${index}-${paused}`} className="hero-progress absolute left-0 top-0 h-full bg-[#f4efe7]" style={{ animationDuration: `${INTERVAL}ms`, animationPlayState: paused || reduce ? "paused" : "running" }} />
                                    </div>
                                    <div className="flex" aria-hidden="true">
                                        <span className="text-[#f4efe7] border-[1px] rounded-3xl px-2 py-0.5 text-[0.7rem]">{pad(index + 1)}</span>
                                        <span className="text-[#f4efe7]/50 border-[1px] border-[#f4efe7]/40 rounded-3xl px-2 py-0.5 text-[0.7rem]">{pad(SLIDES.length)}</span>
                                    </div>
                                </div>
                                <p aria-live="polite" className="text-[#f4efe7] text-[0.75rem] font-bold md:text-end" style={{ textShadow: '2px 2px 4px #000' }}>
                                    {slide.caption}
                                </p>
                                <p
                                    className="text-[#f4efe7] text-[0.7rem] font-bold md:font-medium tracking-wide md:text-end"
                                    style={{ textShadow: '2px 2px 4px #000' }}
                                >
                                    Kapadokya Üniversitesi—Kütüphane ve Dokümantasyon Daire Başkanlığı. Mustafapaşa ve Ürgüp yerleşkelerinde.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
