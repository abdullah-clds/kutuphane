import { useGSAP } from "@gsap/react";
import gsap, { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { chooseLinesLG, chooseLinesSM } from "../../constants/welcome";
import SearchPanel from "../Search/SearchPanel";
import SmartLink from "../Buttons/SmartLink";
import { QUICK_LINKS, SEARCH } from "../../lib/content";

const Choose = () => {

    const isMobD = useMediaQuery({
        query: "(max-width:768px)",
    });
    const chooseLines = isMobD ? chooseLinesSM : chooseLinesLG;

    useGSAP(() => {

        const lines = gsap.utils.toArray(".choose-title-clip");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".choose-section",
                start: "top 75%",
                end: "bottom 100%",
                scrub: true,
                // markers: true,
            },
        });

        tl.from(".choose-subtitle", {
            yPercent: 100,
            opacity: 0,
            ease: "power1.inOut"
        });

        // Animate the div height
        if (!isMobD) {
            tl.fromTo(
                ".title-part",
                { height: "10vh" },
                { height: `${isMobD ? "22vh" : "24vh"}`, ease: "none" } // smaller title than the theme's
            );
        }

        // Animate text reveal — run *at the same time*
        tl.to(
            lines,
            {
                clipPath: "inset(0% 0% 0% 0%)",
                ease: "none",
                stagger: 0.2,
                duration: 1,
            },
            "<" // 👈 runs at the same time as the previous animation
        );

        if (!isMobD) {
            tl.from(".choose-sec", {
                yPercent: 100,
                duration: 1,
            }, "<");
        }
    });

    return (
        <section id="tarama" className="choose-section w-full p-8 pt-10 pb-20">
            <p className='text-[.7rem] text-[#eae5dd] choose-subtitle'>Katalog Tarama · Tüm Kaynaklarda Tarama</p>
            <div className="lg:mt-10 mt-7 title-part origin-bottom ">
                {
                    chooseLines.map((line, index) => (
                        <h2 key={index} className={`choose-heading text-[#f4efe7] lg:text-[5.5rem] text-[2.6rem] leading-[0.95]`}>
                            <span className={`choose-title-break ${index == 1 ? "lg:pb-3 pb-2" : ""}`}>{line}<span aria-hidden="true" className={`choose-title-clip ${index == 1 ? "lg:pb-3 pb-2" : ""}`}>{line}</span></span>
                        </h2>
                    ))
                }
            </div>
            <div className="choose-sec w-full flex lg:flex-row flex-col justify-center items-start gap-10 lg:mt-0">
                <div className='lg:w-1/2 w-full text-[#b1a696] lg:text-[1.5rem] text-[1rem] md:leading-[1.2] lg:mt-0 mt-8 lg:pr-16'>
                    <p>{SEARCH.ebsco.text}</p>
                </div>
                <div className='lg:w-1/2 w-full'>
                    <div className=" lg:w-[40%] w-[70%]">
                        <p className="text-[.7rem] text-[#eae5dd]">Arama yapılacak sistemi seçin—sonuçlar yeni sekmede açılır:</p>
                    </div>
                    <div className="mt-8">
                        <SearchPanel />
                    </div>
                    <div className="lg:w-[40%] w-[70%] mt-12">
                        <p className="text-[.7rem] text-[#eae5dd]">Hızlı erişim:</p>
                    </div>
                    <ul className="flex flex-1 flex-wrap justify-start items-start gap-2 mt-5">
                        {QUICK_LINKS.slice(2).map((q, i) => (
                            <li key={q.label}>
                                <SmartLink
                                    to={q.to}
                                    href={q.href}
                                    className={`block border-[1px] ${i % 2 ? "border-[#f4efe7] text-[#f4efe7]" : "border-[#b1a696] text-[#b1a696]"} lg:text-[1rem] px-[16px] py-[4px] rounded-full hover:bg-[#f4efe7] hover:text-[#2a2725] transition-colors duration-300`}
                                >
                                    {q.label}
                                </SmartLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Choose;
