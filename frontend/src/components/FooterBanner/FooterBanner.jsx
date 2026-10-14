import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { media } from '../../lib/content';

const banner = media('media/site/okuma-salonu.jpg');
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ClickIndicator from '../MapLink/ClickIndicator';


const FooterBanner = () => {
    const [active, setActive] = useState(false);
    const fbConRef = useRef(null);
    const fbImgRef = useRef(null);

    useGSAP(() => {
        if (!fbConRef.current || !fbImgRef.current) return;

        gsap.fromTo(fbImgRef.current,
            {
                scale: 1.2, // Initial scale
            },
            {
                scale: 1, // Final scale
                ease: "none",
                scrollTrigger: {
                    trigger: fbConRef.current,
                    start: "top bottom-=20%",
                    end: "bottom top+=20%",
                    scrub: true,
                    // markers: true,
                }
            }
        );

    }, { scope: fbConRef });

    return (
        < div ref={fbConRef} className="w-screen h-dvh p-2 overflow-hidden" >
            <div className='w-full relative overflow-hidden rounded-4xl'>
                <ClickIndicator active={active} label="İletişim" />
                <Link to="/iletisim" aria-label="İletişim" onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)} onFocus={() => setActive(false)} className="block">
                    <img
                        ref={fbImgRef} src={banner} alt="Kütüphane okuma salonunda çalışan öğrenciler" loading="lazy" className='w-full h-[70vh] md:h-auto md:aspect-[1200/830] max-h-[calc(100dvh-1rem)] object-cover' />
                </Link>

                <p aria-hidden="true" className='pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[max(3.5rem,10vw)] font-bold text-[#f4efe7]'>Kütüphane</p>
                <div className='pointer-events-none absolute bottom-5 px-4 w-full'>
                    <div className="w-full h-auto flex md:flex-row flex-col md:justify-between md:items-end">
                        <h2
                            className="text-start lg:mt-0 md:text-[#f4efe7] text-[#b1a696] text-2xl font-bold md:tracking-wider leading-5 flex flex-col gap-1"
                            style={{ textShadow: '2px 2px 4px #000' }}
                        >
                            <span>Kapadokya</span>
                            <span>Üniversitesi</span>
                            <span>Kütüphanesi</span>
                        </h2>

                        <p
                            className="md:w-[20%] w-[80%] text-[#f4efe7] text-[0.7rem] font-bold  md:font-medium tracking-wide lg:text-end mt-2 text-justify"
                            style={{ textShadow: '2px 2px 4px #000' }}
                        >
                            Kütüphane ve Dokümantasyon Daire Başkanlığı—kutuphane@kapadokya.edu.tr
                        </p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default FooterBanner