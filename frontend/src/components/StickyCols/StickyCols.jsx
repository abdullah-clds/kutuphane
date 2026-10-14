import gsap, { ScrollTrigger, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { activeTrials, countByType, media } from "../../lib/content";

const colimg1 = media("media/site/iki-katli-salon.jpg");
const colimg2 = media("media/site/okuma-salonu.jpg");
const colimg3 = media("media/site/kutup-banner.jpg");

// Three collections, in the order of the previous "Elektronik Kaynaklar" menu. Counts come from the migrated records.
const PHASES = [
    {
        title: "Abone Olunan Veri Tabanları",
        lines: ["Abone olunan", "veri tabanları", `· ${countByType("abone")} kaynak`],
        count: countByType("abone"),
        to: "/abone-olunan-veri-tabanlari",
        // "Kütüphanelerimiz" page
        text: "Öğrencilerimiz ve öğretim elemanlarımız veri tabanlarından 7 gün 24 saat yararlanabilmektedir.",
    },
    {
        title: "Açık Erişimli Veri Tabanları",
        lines: ["Açık erişimli", "veri tabanları", `· ${countByType("acik")} kaynak`],
        count: countByType("acik"),
        to: "/acik-erisimli-veri-tabanlari",
        // "Yerleşke Dışı Erişim" page
        text: "Yerleşke dışından erişim, internet imkanı olan her yerden sağlanabilmektedir.",
    },
    {
        title: "Deneme Erişimli Veri Tabanları",
        lines: ["Deneme erişimli", "veri tabanları", `· ${activeTrials().length} etkin deneme`],
        count: activeTrials().length,
        to: "/deneme-erisimli-veri-tabanlari",
        text: "Son erişim tarihleri her kaynağın kartında ve ilgili duyuruda yer almaktadır.",
    },
];

const StickyCols = () => {

    const [reveal, setReveal] = useState(false);

    // Phones get stacked cards; the four-column pinned sequence needs a wide viewport.
    const isMob = useMediaQuery({ maxWidth: 768 });

    useGSAP(() => {
        if (isMob) return;
        gsap.registerPlugin(ScrollTrigger, SplitText);

        // 1️⃣ Split text lines once DOM ready
        const textElements = document.querySelectorAll(".col-3 h3, .col-3 p");
        textElements.forEach((element) => {
            const split = new SplitText(element, { type: "lines", linesClass: "line" });
            split.lines.forEach((line) => {
                line.innerHTML = `<span>${line.textContent}</span>`;
            });
        });

        // Refresh ScrollTrigger after split
        ScrollTrigger.refresh();

        // 2️⃣ Initial state
        gsap.set(".col-3 .col-content-wrapper .line span", { yPercent: 0 });
        gsap.set(".col-3 .col-content-wrapper-2 .line span", { yPercent: -125 });

        // 3️⃣ Controlled phase logic using timeline (simpler and stable)
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".sticky-cols",
                start: "top 20%",
                end: "+=90%",
                pin: true,
                scrub: 1,
                // markers: true,
            },
        });
        tl.add(() => setReveal(false));
        // PHASE 1: Reveal col-2, hide col-1
        tl.to(".col-1", { opacity: 0, scale: 0.8, duration: 0.8 })
            .to(".col-2", { x: "0%", duration: 0.8 }, "<")
            .to(".col-3", { y: "0%", duration: 0.8 }, "<")
            .to(".col-img-1 img", { scale: 1, duration: 0.8 }, "<")
            .to(".col-img-2", {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 0.8,
            }, "<")
            .to(".col-img-2 img", { scale: 1.6, duration: 0.8 }, "<")

        tl.add(() => setReveal(false));
        tl.add(() => setReveal(true));
        // PHASE 2: Switch col-2 -> col-3 content
        tl.to(".col-2", { opacity: 0, scale: 0.8, duration: 0.8 })
            .to(".col-3 .col-content-wrapper .line span", {
                yPercent: -125,
                duration: 0.8,
            }, "<")
        tl.to(".col-3", { x: "0%", duration: 0.8 }, "-=0.8")
            .to(".col-4", { y: "0%", duration: 0.8 }, "<")
            .to(".col-3 .col-content-wrapper-2 .line span", {
                yPercent: 0,
                delay: 0.4,
                duration: 0.8,
            }, "<");

        // useGSAP reverts this section's triggers and splits; the original also killed
        // every other ScrollTrigger on the page here, which broke route changes.
        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, { dependencies: [isMob], revertOnUpdate: true });

    // Each card is a link to its collection; the middle card switches target with the phase.
    const phase2 = reveal ? PHASES[2] : PHASES[1];

    if (isMob) {
        const imgs = [colimg1, colimg2, colimg3];
        return (
            <section aria-label="Elektronik kaynaklar" className="px-2 pb-16 flex flex-col gap-2">
                {PHASES.map((p, i) => (
                    <Link key={p.to} to={p.to} className="grid grid-cols-1 gap-2">
                        <div className="rounded-[2.5rem] bg-[#2a2725] p-6 min-h-[16rem] flex flex-col justify-between gap-8">
                            <h3 className="text-3xl text-[#b1a696] font-bold leading-[1.05]">{p.lines.map((l, j) => <span key={j} className="block">{l}</span>)}</h3>
                            <div className="flex items-end justify-between gap-4">
                                <div className="flex shrink-0" aria-hidden="true">
                                    <span className="border-1 px-3 py-1 rounded-full text-[#aaa091]">{i + 1}</span>
                                    <span className="border-1 px-3 py-1 rounded-full text-[#524e4b]">3</span>
                                </div>
                                <p className="text-[12px] font-medium text-[#b1a696] text-right">{p.text}</p>
                            </div>
                        </div>
                        <img src={imgs[i]} alt="" loading="lazy" className="w-full h-56 object-cover rounded-[2.5rem]" />
                    </Link>
                ))}
            </section>
        );
    }

    return (
        <section className="sticky-cols w-screen h-dvh overflow-hidden bg-[#181717] lg:mb-20" aria-label="Elektronik kaynaklar">
            <div className="sticky-cols-wrapper relative w-full h-screen">
                <Link to={PHASES[0].to} className="col col-1 block" aria-label={`${PHASES[0].title}: ${PHASES[0].count} kaynak`}>
                    <div className="col-content">
                        <div className="col-content-wrapper">
                            <h3 className="text-2xl md:text-4xl text-[#b1a696] font-bold leading-[1.05]">{PHASES[0].lines.map((l, i) => <span key={i} className="block">{l}</span>)}</h3>
                            <div className="col-content-para flex items-center gap-4 justify-between">
                                <div className="flex items-center gap-0 justify-center" aria-hidden="true">
                                    <h4 className="border-1 px-3 py-1 rounded-full text-[#aaa091]">1</h4>
                                    <h4 className="border-1 px-3 py-1 rounded-full text-[#524e4b]">3</h4>
                                </div>
                                <p className={`text-[12px] font-medium max-w-[22rem] text-right ${!reveal ? "mr-6" : "mr-0"}`}>{PHASES[0].text}</p>
                            </div>

                        </div>
                    </div>
                </Link>
                <div className="col col-2" aria-hidden="true">
                    <div className="col-img col-img-1">
                        <div className="col-img-wrapper">
                            <img src={colimg1} alt="" loading="lazy" />
                        </div>
                    </div>
                    <div className="col col-img-2 p-2">
                        <div className="col-img-wrapper">
                            <img src={colimg2} alt="" loading="lazy" />
                        </div>
                    </div>
                </div>
                <Link to={phase2.to} className="col col-3 block" aria-label={`${phase2.title}: ${phase2.count} kaynak`}>
                    <div className="col-content-wrapper">
                        <h3 className="text-2xl md:text-4xl font-bold leading-[1.05]">{PHASES[1].lines.join(" ")}</h3>
                        <div className={`col-content-para flex items-center gap-4 justify-between ${reveal ? "ml-0" : "ml-6"}`}>
                            <div className="flex items-center gap-0 justify-center" aria-hidden="true">
                                <h4 className="border-1 px-3 py-1 rounded-full text-[#aaa091]">{(reveal) ? "3" : "2"}</h4>
                                <h4 className="border-1 px-3 py-1 rounded-full text-[#524e4b]">3</h4>
                            </div>
                            <p className="text-[12px] font-medium max-w-[22rem] text-right">{PHASES[1].text}</p>
                        </div>
                    </div>
                    <div className="col-content-wrapper-2">
                        <h3 className="text-2xl md:text-4xl font-bold leading-[1.05]">{PHASES[2].lines.join(" ")}</h3>
                        <div className="col-content-para flex items-center gap-4 justify-between">
                            <div className="flex items-center gap-0 justify-center">
                                {/* <h3 className="border-1 px-3 py-1 rounded-full text-[#aaa091]">3</h3>
                                <h3 className="border-1 px-3 py-1 rounded-full text-[#524e4b]">3</h3> */}
                            </div>
                            <p className={`text-[12px] font-medium max-w-[22rem] text-right ${!reveal ? "mr-0" : "mr-6"}`}>{PHASES[2].text}</p>
                        </div>
                    </div>
                </Link>
                <div className="col col-4" aria-hidden="true">
                    <div className="col-img col-img-1">
                        <div className="col-img-wrapper">
                            <img src={colimg3} alt="" loading="lazy" />
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default StickyCols;