import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { welcomeLinesLG, welcomeLinesSM } from "../../constants/welcome";
import { Link } from "react-router-dom";
import { media } from "../../lib/content";

const w1 = media("media/site/tas-kemer-kare.jpg");
const w2 = media("media/site/okuma-salonu.jpg");

const Welcome = () => {

    const isMobile = useMediaQuery({ maxWidth: 768 });
    const welcomeLines = isMobile ? welcomeLinesSM : welcomeLinesLG;

    useGSAP(() => {
        const lines = gsap.utils.toArray(".clip-text-welcome");
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".welcome-section",
                start: "top 75%",
                end: "bottom 75%",
                scrub: true,
                // markers: true
            },
        });

        lines.forEach((line) => {
            tl.to(line, {
                clipPath: "inset(0% 0% 0% 0%)",
                ease: "none",
                stagger: 0.2,
                duration: 1,
            });
        });

    });

    return (
        <div id='hakkinda' className='welcome-section w-full text-[#2A2725] md:px-7 px-6 pb-20 md:pb-28'>
            <div className='flex flex-col gap-2 tracking-[-4] leading-2'>
                <div className="w-full md:w-[86%] md:text-[44px] text-[30px] welcome-line md:pt-10">
                    <div className="w-full welcome-text flex flex-col justify-center items-start">
                        {welcomeLines.map((text, index) => (
                            <span key={index} className="relative block text-darkBrown md:tracking-[-0.010em] tracking-[0.015em]">
                                {text}
                                <span className="clip-text-welcome md:tracking-[-0.010em] tracking-[0.015em]">{text}</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex md:flex-row flex-col justify-between items-center md:p-4 md:mt-12 mt-10">
                <div className="flex flex-row justify-center items-center gap-1">
                    <img src={w1} alt="Taş kemerli kütüphane bölümünde kitap rafları" className="md:rounded-[8rem] rounded-[9rem] md:w-44 w-36 aspect-[340/235] object-cover" loading="lazy" />
                    <img src={w2} alt="Okuma salonunda çalışan öğrenciler" className="md:rounded-[8rem] rounded-[9rem] md:w-44 w-36 aspect-[340/235] object-cover" loading="lazy" />
                </div>
                <div className="md:w-1/2 w-full md:mt-0 mt-10">
                    <p className="md:text-[1.5rem] text-[1.2rem] text-[#b1a696] md:leading-[1.2] md:pr-24 font-normal leading-[26px] tracking-[-0.2px]">
                        <span>Kütüphanelerdeki koleksiyonlar, yerleşkelerde faaliyet gösteren eğitim-öğretim programlarına göre oluşturulmuştur.</span>
                    </p>
                    <Link to="/kutuphanelerimiz" className="inline-block mt-6 text-[0.8rem] text-[#f4efe7] underline decoration-[#4f4b48] underline-offset-4 hover:decoration-[#f4efe7]">Kütüphanelerimiz</Link>
                </div>
            </div>
        </div>
    );
};

export default Welcome;