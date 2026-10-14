import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { useMediaQuery } from "react-responsive";
import './activities.css';
import { activitiesLinesLG, activitiesLinesSM } from "../../constants/activites";
import { activeTrials, announcements, formatDate, daysLeft, daysBetween } from "../../lib/content";
import PillLink from "../Buttons/PillLink";

// The trial window starts on the date of the matching announcement when there is one.
function trialRows() {
    return activeTrials().slice(0, 4).map((d) => {
        const key = d.name.split(/[\s(.]/)[0].toLocaleLowerCase("tr");
        const a = announcements.find((x) => x.isTrial && x.trialEnd === d.trialEnd && x.title.toLocaleLowerCase("tr").includes(key));
        const start = a?.date ?? null;
        const total = start ? Math.max(daysBetween(start, d.trialEnd), 1) : null;
        const left = daysLeft(d.trialEnd);
        return {
            name: d.name,
            end: d.trialEnd,
            left,
            to: a ? `/duyurular/${a.slug}` : "/deneme-erisimli-veri-tabanlari",
            // Remaining share of the trial period; without a known start the bar shows days left out of 60.
            width: `${Math.round(Math.min(1, Math.max(0.04, left / (total ?? 60))) * 100)}%`,
        };
    });
}

const Activities = () => {
    const isMobD = useMediaQuery({
        query: "(max-width:768px)",
    });
    const activitiesLines = isMobD ? activitiesLinesSM : activitiesLinesLG;
    const scope = useRef(null);
    const rows = trialRows();

    useGSAP(() => {
        const lines = gsap.utils.toArray(".activities-title-clip");
        // Scoped: the original selector also matched the Gallery's progress lines.
        const progressLines = gsap.utils.toArray(".activities-section .progress-line");

        const activitiesTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".activities-section",
                start: "top 80%",
                end: "top 20%",
                scrub: true,
                // markers: true,
            },
        });

        activitiesTl.from(".activities-subtitle", {
            yPercent: 100,
            opacity: 0,
            ease: "power1.inOut"
        });

        // Animate the div height
        if (!isMobD) {
            activitiesTl.fromTo(
                ".activities-part",
                { height: "10vh" },
                { height: `${isMobD ? "22vh" : "50vh"}`, ease: "none" }
            );
        }

        // Animate text reveal — run *at the same time*
        activitiesTl.to(
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
            activitiesTl.from(".activities-sec", {
                yPercent: 100,
                duration: 1,
            }, "<");
        }

        // Progress lines grow to their value together (same tween as the original three).
        progressLines.forEach((line, i) => {
            activitiesTl.fromTo(line,
                { width: "0%" },
                { width: line.dataset.width, duration: 0.5, ease: "power2.in" },
                i === 0 ? undefined : "<"
            );
        });
    }, { scope, dependencies: [isMobD], revertOnUpdate: true });

    return (
        <section ref={scope} id="deneme-erisimi" className="activities-section w-full min-h-[120vh] p-8 mt-16">
            <p className='text-[.7rem] font-bold text-[#eae5dd] activities-subtitle'>Elektronik Kaynaklar</p>
            <div className="lg:mt-10 mt-7 activities-part origin-bottom">
                {activitiesLines.map((line, index) => (
                    <h2 key={index} className={`activities-heading text-[#f4efe7] lg:text-[9.5rem] text-[3rem] leading-[0.9]`}>
                        <span className={`activities-title-break ${index == 1 ? "lg:pb-3 pb-2" : ""}`}>
                            {line}
                            <span aria-hidden="true" className={`activities-title-clip ${index == 1 ? "lg:pb-3 pb-2" : ""}`}>
                                {line}
                            </span>
                        </span>
                    </h2>
                ))}
            </div>
            <div className="activities-sec w-full flex lg:flex-row flex-col justify-center items-start gap-10 lg:mt-0">
                <div className='lg:w-1/2 w-full'>
                    {rows.length > 0 ? (
                        <>
                            <div className="lg:w-[60%] w-[80%]">
                                <p className="text-[.7rem] text-[#eae5dd]">Deneme erişimine açık kaynaklar ve son erişim tarihleri:</p>
                            </div>
                            <ul className="flex flex-col justify-start items-start gap-5 mt-8 lg:mr-14">
                                {rows.map((r) => (
                                    <li key={r.name} className="w-full">
                                        <Link to={r.to} className="block group">
                                            <span className="flex justify-between items-baseline gap-4 w-full mb-4">
                                                <span className="text-[#b1a696] group-hover:text-[#f4efe7] transition-colors text-xl">{r.name}</span>
                                                <span className="text-[#b1a696] text-[0.7rem] text-right shrink-0">{formatDate(r.end)} · {r.left} gün</span>
                                            </span>
                                            <span className="block relative z-9 w-full h-[0.1rem] bg-[#4f4b48]">
                                                <span data-width={r.width} style={{ width: r.width }} className="progress-line block absolute z-10 bg-[#f4efe7] h-[0.1rem] top-1/2 -translate-y-1/2 left-0"></span>
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p className="text-[.7rem] text-[#eae5dd]">Şu anda deneme erişiminde kaynak bulunmuyor. <Link to="/deneme-erisimli-veri-tabanlari" className="underline">Deneme Erişimli Veri Tabanları</Link></p>
                    )}
                </div>
                <div className='lg:w-1/2 w-full text-[#b1a696] lg:text-[2rem] text-[1.2rem] md:leading-[1.1] lg:mt-0 mt-8'>
                    <p>
                        {rows.length > 0
                            ? <>Şu anda {activeTrials().length} kaynak Üniversitemiz kullanıcıları için deneme erişimine açıktır. Son erişim tarihleri her kaynağın kartında ve ilgili duyuruda yer almaktadır.</>
                            : <>Deneme erişimine açılan kaynaklar duyurularda ve Deneme Erişimli Veri Tabanları sayfasında listelenir.</>}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-8">
                        <PillLink label="Deneme Erişimli Veri Tabanları" to="/deneme-erisimli-veri-tabanlari" />
                        <PillLink label="Deneme duyuruları" to="/duyurular" dark />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Activities;
