import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './gallery.css';
import { BsFillPlusCircleFill } from "react-icons/bs";

import { Link } from 'react-router-dom';
import { libraries, media } from '../../lib/content';

// The three libraries, in the order of the "Kütüphanelerimiz" page. Photos are the
// featured images of their posts (supplied as content/gorseller/*.jpg).
const PHOTOS = {
    "merkez-kutuphane": ["media/site/merkez-kutuphane.jpg", "Merkez Kütüphane: taş tonozlu salonda kitap rafları"],
    "sosyal-bilimler-kutuphanesi": ["media/site/sosyal-bilimler-kutuphanesi.jpg", "Sosyal Bilimler Kütüphanesi: kitap rafları"],
    "fen-bilimleri-kutuphanesi": ["media/site/fen-bilimleri-kutuphanesi.jpg", "Fen Bilimleri Kütüphanesi: iki katlı okuma salonu"],
};
const LIBRARIES = libraries.items.slice(0, 3).map((l) => ({
    name: l.name,
    slug: l.slug,
    campus: /Ürgüp/.test(l.paragraphs[0]) ? "Ürgüp" : "Mustafapaşa",
    text: l.paragraphs.at(-1),
    hours: l.hours?.replace(/^.*?–\s*/, "") ?? "",
    image: media(PHOTOS[l.slug][0]),
    alt: PHOTOS[l.slug][1],
}));
const PROGRESS = ["w-[33%]", "w-[67%]", "w-[100%]"];

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
    const pageRef = useRef(null);

    useEffect(() => {

        // document.fonts.ready.then(() => {
        // Create new timeline
        const tl4 = gsap.timeline({
            scrollTrigger: {
                trigger: ".gallery-page4",
                start: "10% 10%",
                end: "220% 30%",
                scrub: 1,
                pin: true,
            }
        });

        // Add background color animation
        tl4.to(".gallery-page4", {
            backgroundColor: "#181717",
        }, 'start');

        gsap.set(".gallery-topText h4, .gallery-topText h3, .gallery-bottomText h3", {
            opacity: 1,
            x: 0
        });

        // Animation sequence
        tl4.to(".gallery-box h3", {
            opacity: 0,
        }, 'a')
            .to(".gallery-page4 .gallery-background", {
                width: "calc(100vw - 1rem)",
                height: "calc(100vh - 1rem)",
                borderRadius: "3.5rem",
                y: -40,
            }, 'a')
            .to(".gallery-page4 .gallery-background img", {
                transform: "scale(1)",
            }, 'a')
            .from(".gallery-background .gallery-topText h4, .gallery-background .gallery-topText h3, .gallery-background .gallery-bottomText h3", {
                opacity: 0,
                x: 50,
            })
            .to({}, { duration: 0.4 }, "+=0")

            .to("#gallery-second", {
                transform: "translate(-50%, -56%)",
            }, 'b')
            .to("#gallery-second img", {
                transform: "scale(1)",
            }, 'b')
            .to(".gallery-page4 .gallery-background", {
                scale: 0.9,
                opacity: 0,
                y: -50
            }, 'b')
            .from("#gallery-second .gallery-topText h4, #gallery-second .gallery-topText h3, #gallery-second .gallery-bottomText h3", {
                opacity: 0,
                x: 50,
            })
            .to({}, { duration: 0.4 }, "+=0")
            .to("#gallery-third", {
                transform: "translate(-50%, -56%)",
            }, 'c')
            .to("#gallery-third img", {
                transform: "scale(1)",
            }, 'c')
            .to("#gallery-second", {
                scale: 0.9,
                opacity: 0,
            }, 'c')
            .from("#gallery-third .gallery-topText h4, #gallery-third .gallery-topText h3, #gallery-third .gallery-bottomText h3", {
                opacity: 0,
                x: 50,
            })
            .to({}, { duration: 0.4 }, "+=0");

        // Clean up function: only this section's timeline. Killing every ScrollTrigger here
        // (original code) also removed other sections' triggers on route changes.
        return () => {
            tl4.scrollTrigger?.kill();
            tl4.kill();
        };
    }, []);

    // Generate repeating marquee words
    const generateCapsules = (quantity = 6) => {
        const capsules = [];
        for (let i = 1; i <= quantity; i++) {
            capsules.push(
                <h3 key={i} style={{ "--index": i }} className='tracking-tighter'>
                    Kütüphane
                </h3>
            );
        }
        return capsules;
    };

    return (
        <section className="gallery-page4" ref={pageRef} id="kutuphanelerimiz" aria-label="Kütüphanelerimiz">
            <div className="gallery-slider" aria-hidden="true">
                <div
                    className="gallery-box"
                    style={{ "--time": "40s", "--quantity": 6 }}
                >
                    {generateCapsules(6)}
                </div>
            </div>

            {LIBRARIES.map((lib, i) => (
                <div
                    key={lib.name}
                    id={i === 0 ? undefined : i === 1 ? "gallery-second" : "gallery-third"}
                    className={i === 0 ? "gallery-background" : "gallery-background2"}
                >
                    <img src={lib.image} alt={lib.alt} />
                    <div className="gallery-topText">
                        <h4>{lib.name}</h4>
                        <h3>({lib.campus})</h3>
                    </div>
                    <div className="gallery-bottomText">
                        <div className='w-full flex justify-center items-center gap-0'>
                            <Link to={`/kutuphanelerimiz#${lib.slug}`} aria-label={`${lib.name}: ayrıntılar`} className="shrink-0 transition-transform duration-500 hover:rotate-90">
                                <BsFillPlusCircleFill className='w-8 h-8 text-[#b1a696]' />
                            </Link>
                            <h3>{lib.text}<br />{lib.hours}</h3>
                        </div>
                        <div className="relative z-9 w-50 h-[0.1rem] bg-[#4f4b48] shrink-0">
                            <div className={`progress-line absolute z-10 bg-[#f4efe7] ${PROGRESS[i]} h-[0.1rem] top-1/2 -translate-y-1/2 left-0`}></div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Gallery;