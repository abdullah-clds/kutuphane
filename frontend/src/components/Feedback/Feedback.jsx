import { useState } from "react";
import { IoMdArrowForward, IoMdArrowBack } from "react-icons/io";
import SmartLink from "../Buttons/SmartLink";
import { media } from "../../lib/content";

// Sentences quoted from the pages they link to (wording unchanged).
const SLIDES = [
    {
        title: "Yayın Girişi",
        to: "/yayin-girisi",
        text: "Kapadokya Üniversitesi mensupları, akademik çalışmalarının tam metinlerini ve üst verilerini Kapadokya Üniversitesi Kurumsal Akademik Arşiv KÜNASİS’te depolamakla yükümlüdür.",
    },
    {
        title: "Kurumsal Açık Arşiv",
        href: "https://acikerisim.kapadokya.edu.tr/xmlui/",
        source: "Yayın Girişi",
        text: "Kurumsal Akademik Arşiv sistemlerinde birimlerce üretilen kitap, makale, bildiri, tez, teknik rapor, fotoğraf, harita, ses ve video dosyaları vb. gibi akademik dokümanlar arşivlenir.",
    },
    {
        title: "İntihal Programları",
        to: "/intihal-programlari",
        text: "Turnitin intihal programı, akademik çalışmalardaki intihalleri tespit etmek öğrenci ve öğretim elemanlarının kullandığı bir akademik veri havuzudur.",
    },
    {
        title: "Açık Bilim ve Kütüphane Komisyonu",
        to: "/acik-bilim-ve-kutuphane-komisyonu",
        text: "Kapadokya Üniversitesi Açık Bilim ve Kütüphane Komisyonu, Kapadokya Üniversitesi mensuplarının araştırma verilerinin ve akademik çalışmalarının, açık erişime sunulmasına ilişkin usul ve esasları düzenlemek ve açık erişimle, araştırma verileri ile akademik çalışmaların görünürlüğünü, izlenebilirliğini ve etkinliğini artırmayı amaçlamaktadır.",
    },
];

// Open archive and open science, one statement at a time like the theme's reviews.
const Feedback = () => {
    const [index, setIndex] = useState(0);
    const total = SLIDES.length;

    const handleNext = () => {
        setIndex((prev) => (prev + 1) % total);
    };

    const handlePrev = () => {
        setIndex((prev) => (prev - 1 + total) % total);
    };

    const slide = SLIDES[index];
    const progressWidth = `${Math.round(((index + 1) / total) * 100)}%`;

    return (
        <section className='w-full min-h-dvh p-8 flex flex-col justify-center items-center' aria-label="Açık Arşiv ve Açık Bilim">
            <div className='w-full text-left'>
                <p className='text-[.7rem] font-bold text-[#eae5dd] activities-subtitle text-left'>
                    Açık Arşiv · Açık Erişim
                </p>

                <div aria-live="polite">
                    <h2 className={`text-[#f4efe7] text-3xl md:text-5xl ${slide.text.length > 220 ? "lg:text-6xl" : "lg:text-7xl"} mt-4 mb-6 max-w-[84rem] leading-[1.05] tracking-tight [text-wrap:pretty]`}>
                        {slide.text}
                    </h2>

                    <div className='flex items-center gap-4 mt-12'>
                        <img src={media("media/site/kapadokya-amblem.png")} alt="" className='w-14 h-14 md:w-[4.5vw] md:h-[4.5vw] rounded-4xl bg-[#f4efe7] p-1.5' />
                        <p className="text-[#aca192] text-[0.7rem]">
                            <SmartLink to={slide.to} href={slide.href} className="text-[#f4efe7] underline underline-offset-2 hover:decoration-[#b1a696]">{slide.title}</SmartLink><br />
                            ({slide.source ? `Kaynak: ${slide.source}` : "Kapadokya Üniversitesi"})
                        </p>
                    </div>
                </div>

                <div className="flex justify-between items-center gap-6 mt-14">
                    <div className="flex gap-1">
                        <button
                            type="button"
                            aria-label="Önceki"
                            onClick={handlePrev}
                            className='border-[1px] p-1 border-[#aaa090] hover:bg-[#aaa090] rounded-4xl'
                        >
                            <IoMdArrowBack aria-hidden="true" className="text-[#f1ece4] w-7 h-7 md:w-[2vw] md:h-[3.4vh]" />
                        </button>

                        <button
                            type="button"
                            aria-label="Sonraki"
                            onClick={handleNext}
                            className='border-[1px] p-1 border-[#aaa090] rounded-4xl'
                        >
                            <IoMdArrowForward aria-hidden="true" className="text-[#f1ece4] w-7 h-7 md:w-[2vw] md:h-[3.4vh]" />
                        </button>
                    </div>

                    <div className="relative z-9 w-40 md:w-70 h-[0.1rem] bg-[#4f4b48]" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={index + 1} aria-label={`${index + 1} / ${total}`}>
                        <div
                            className="progress-line absolute z-10 bg-[#f4efe7] h-[0.1rem] top-1/2 -translate-y-1/2 left-0 transition-[width] duration-500"
                            style={{ width: progressWidth }}
                        ></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Feedback;
