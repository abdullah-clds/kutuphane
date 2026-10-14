import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import PageHero from "../../components/Page/PageHero";
import PageAside from "../../components/Page/PageAside";
import Prose from "../../components/Page/Prose";
import useReveal from "../../components/Page/useReveal";
import { findPage, libraries, media } from "../../lib/content";

const PHOTOS = {
    "merkez-kutuphane": ["media/site/merkez-kutuphane.jpg", "Merkez Kütüphane: taş tonozlu salonda kitap rafları"],
    "sosyal-bilimler-kutuphanesi": ["media/site/sosyal-bilimler-kutuphanesi.jpg", "Sosyal Bilimler Kütüphanesi: kitap rafları"],
    "fen-bilimleri-kutuphanesi": ["media/site/fen-bilimleri-kutuphanesi.jpg", "Fen Bilimleri Kütüphanesi: iki katlı okuma salonu"],
};

const pad = (n) => String(n).padStart(2, "0");

const LibrariesPage = () => {
    const scope = useRef(null);
    const page = findPage("/kutuphanelerimiz");
    useReveal(scope);

    // Photo cards: the image settles from 1.15 to 1 while it crosses the viewport (FooterBanner's scrub).
    useGSAP(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        gsap.utils.toArray(".lib-photo img", scope.current).forEach((img) => {
            gsap.fromTo(img, { scale: 1.15 }, {
                scale: 1, ease: "none",
                scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            });
        });
    }, { scope });

    const items = libraries.items;
    // Intro without the "Bunların dışında…" paragraph, which is shown with the other collections below.
    const [introMain, specialCollections] = [libraries.introHtml.split("<p>Bunların dışında")[0], libraries.intro.at(-1)];

    return (
        <div ref={scope}>
            <PageHero
                title="Kütüphanelerimiz"
                eyebrow="Kütüphane Hakkında"
                crumbs={[{ label: "Kütüphane Hakkında" }, { label: "Kütüphanelerimiz" }]}
                image="media/site/tas-kemer-raflar.jpg"
                imageAlt="Taş kemer altında kitap rafları ve çalışma masaları"
                aside={<>Mustafapaşa ve Ürgüp yerleşkeleri</>}
            />

            <div className="kun-wrap pb-20 grid gap-14 lg:grid-cols-12">
                <div className="lg:col-span-3"><PageAside updated={page.updated} sourceUrl={page.sourceUrl} /></div>
                <div className="lg:col-span-8 lg:col-start-5" data-reveal><Prose html={introMain} /></div>
            </div>

            <section aria-label="Kütüphaneler" className="mx-auto max-w-[1360px] px-2 md:px-4 flex flex-col gap-3">
                {items.map((lib, i) => {
                    const [src, alt] = PHOTOS[lib.slug] ?? [];
                    return (
                        <article key={lib.name} id={lib.slug ?? undefined} className="grid gap-2 lg:grid-cols-2 scroll-mt-6">
                            <div className={`lib-photo relative h-[56vh] lg:h-[88vh] rounded-[28px] overflow-hidden bg-[#f5f5f7] ${i % 2 ? "lg:order-2" : ""}`}>
                                {src && <img src={media(src)} alt={alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />}
                            </div>
                            <div className="rounded-[28px] bg-[#f5f5f7] p-8 md:p-12 flex flex-col justify-between gap-12 lg:min-h-[88vh]" data-reveal>
                                <div>
                                    <p className="text-[0.8rem] font-semibold text-[#6e6e73]">{/Ürgüp/.test(lib.paragraphs[0]) ? "Ürgüp Yerleşkesi" : "Mustafapaşa Yerleşkesi"}</p>
                                    <h2 className="mt-6 text-[#1d1d1f] text-4xl md:text-6xl font-semibold tracking-tight leading-[1] [text-wrap:balance]">{lib.name}</h2>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-3 text-[#424245] text-lg md:text-[1.35rem] leading-snug">
                                        {lib.paragraphs.map((p) => <p key={p}>{p}</p>)}
                                    </div>
                                    {lib.hours && (
                                        <p className="self-start rounded-full border border-[#d2d2d7] px-4 py-1.5 text-[0.85rem] text-[#1d1d1f]">
                                            Çalışma saati: {lib.hours.replace(/^.*?–\s*/, "")}
                                        </p>
                                    )}
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex" aria-hidden="true">
                                            <span className="border-[1px] border-[#86868b] rounded-3xl px-3 py-1 text-[0.7rem] text-[#1d1d1f]">{pad(i + 1)}</span>
                                            <span className="border-[1px] border-[#d2d2d7] rounded-3xl px-3 py-1 text-[0.7rem] text-[#86868b]">{pad(items.length)}</span>
                                        </div>
                                        <Link to="/genel-kurallar" className="text-[0.75rem] text-[#6e6e73] hover:text-[#1d1d1f] underline underline-offset-4">Kaynak: Genel Kurallar</Link>
                                    </div>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </section>

            <section aria-label="Diğer kitaplıklar" className="kun-wrap py-24 grid gap-14 lg:grid-cols-12">
                <h2 className="lg:col-span-3 text-[0.8rem] font-semibold text-[#6e6e73]" data-reveal>Diğer kitaplıklar ve özel koleksiyonlar</h2>
                <div className="lg:col-span-8 lg:col-start-5 flex flex-col gap-10" data-reveal>
                    {libraries.otherHours.map((h) => (
                        <div key={h} className="border-t border-[#d2d2d7] pt-6">
                            <h3 className="text-[#1d1d1f] text-2xl md:text-3xl font-semibold tracking-tight">{h.split(/\s*[–-]\s*/)[0]}</h3>
                            <p className="mt-3 text-[#424245] text-lg">Çalışma saati: {h.replace(/^.*?[–-]\s*/, "")}</p>
                            <p className="mt-2 text-[0.75rem] text-[#6e6e73]">Kaynak: <Link to="/genel-kurallar" className="underline">Genel Kurallar</Link></p>
                        </div>
                    ))}
                    <div className="border-t border-[#d2d2d7] pt-6">
                        <h3 className="text-[#1d1d1f] text-2xl md:text-3xl font-semibold tracking-tight">Özel kitaplıklar</h3>
                        <p className="mt-3 text-[#424245] text-lg max-w-[46rem]">{specialCollections}</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LibrariesPage;
