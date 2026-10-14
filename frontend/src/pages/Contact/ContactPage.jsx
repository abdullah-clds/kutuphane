import { useRef } from "react";
import { MdArrowOutward } from "react-icons/md";
import PageHero from "../../components/Page/PageHero";
import PillLink from "../../components/Buttons/PillLink";
import useReveal from "../../components/Page/useReveal";
import { CONTACT, findPage, formatDate } from "../../lib/content";

// All values below are from the "İletişim" page of the previous site (wording kept, incl. titles).
const STAFF = [
    { role: "Kütüphane ve Dokümantasyon Birim Başkanı", name: "Mehmet Cengiz", ext: "1143", email: "mehmet.cengiz@kapadokya.edu.tr" },
    { role: "Kütüphane ve Dokümantasyon Birim Görevlisi", name: "Erdem Demir", ext: "1138", email: "erdem.demir@kapadokya.edu.tr" },
];

const CAMPUSES = [
    {
        name: "Ürgüp Yerleşkesi",
        address: "Kavaklıönü Mahallesi, Alibarannumanoğlu Bulvarı No:53, 50400 Ürgüp/Nevşehir",
        // Map pin used on the previous page
        map: "Kapadokya Üniversitesi (Ürgüp Yerleşkesi), Esbelli, Ahmet Taner Kışlalı Cd. No:4, 50400 Ürgüp/Nevşehir",
        library: "Fen Bilimleri Kütüphanesi",
    },
    {
        name: "Mustafapaşa Yerleşkesi",
        address: "50420 - Mustafapaşa, Ürgüp / Nevşehir",
        map: "Kapadokya Üniversitesi Mustafapaşa Yerleşkesi, 50420 Mustafapaşa, Ürgüp / Nevşehir",
        library: "Merkez Kütüphane · Sosyal Bilimler Kütüphanesi",
    },
];

const mapUrl = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

const ContactPage = () => {
    const scope = useRef(null);
    const page = findPage("/iletisim");
    useReveal(scope);

    return (
        <div ref={scope}>
            <PageHero
                title="İletişim"
                eyebrow="Kapadokya Üniversitesi"
                crumbs={[{ label: "İletişim" }]}
                image="media/site/okuma-salonu-genis.jpg"
                imageAlt="Okuma salonunda çalışan öğrenciler"
                size="sm"
                aside={<>{CONTACT.unit}</>}
            />

            <section className="px-6 md:px-8 pb-16" aria-label="E-posta ve telefon">
                <div className="grid gap-10 lg:grid-cols-12 border-b border-[#4f4b48] pb-16" data-reveal>
                    <p className="lg:col-span-3 text-[.7rem] font-bold text-[#eae5dd]">Kütüphaneye yazın</p>
                    <div className="lg:col-span-9">
                        <a href={`mailto:${CONTACT.email}`} className="block text-[#f4efe7] text-[clamp(2rem,6vw,6rem)] leading-[0.95] tracking-tight hover:text-[#b1a696] transition-colors break-words">
                            {CONTACT.email}
                        </a>
                        <p className="mt-6 text-[#b1a696] text-lg">Tel: <a href={`tel:${CONTACT.phoneHref}`} className="text-[#f4efe7]">0384 353 50 09</a> · Faks: {CONTACT.fax}</p>
                        <div className="mt-8"><PillLink label="E-posta gönderin" href={`mailto:${CONTACT.email}`} /></div>
                    </div>
                </div>
            </section>

            <section className="px-6 md:px-8 pb-16" aria-label="Kütüphane personeli">
                <div className="grid gap-10 lg:grid-cols-12">
                    <h2 className="lg:col-span-3 text-[.7rem] font-bold text-[#eae5dd]" data-reveal>Kütüphane ve Dokümantasyon</h2>
                    <ul className="lg:col-span-9 grid gap-2 md:grid-cols-2">
                        {STAFF.map((s) => (
                            <li key={s.email} className="rounded-[2.5rem] bg-[#2a2725] p-8 md:p-10 flex flex-col gap-10 justify-between min-h-[18rem]" data-reveal>
                                <p className="text-[.7rem] font-bold text-[#eae5dd]">{s.role}</p>
                                <div>
                                    <p className="text-[#f4efe7] text-4xl md:text-5xl tracking-tight">{s.name}</p>
                                    <p className="mt-4 text-[#b1a696]">Tel: 0384 353 50 09 · Dahili: {s.ext}</p>
                                    <a href={`mailto:${s.email}`} className="text-[#f4efe7] underline decoration-[#4f4b48] underline-offset-4 hover:decoration-[#f4efe7] break-all">{s.email}</a>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="px-6 md:px-8 pb-28" aria-label="Yerleşkeler">
                <div className="grid gap-10 lg:grid-cols-12">
                    <h2 className="lg:col-span-3 text-[.7rem] font-bold text-[#eae5dd]" data-reveal>Kapadokya Üniversitesi yerleşkeleri</h2>
                    <ul className="lg:col-span-9 flex flex-col">
                        {CAMPUSES.map((c) => (
                            <li key={c.name} className="border-t border-[#4f4b48] py-10 grid gap-6 md:grid-cols-12" data-reveal>
                                <div className="md:col-span-7">
                                    <h3 className="text-[#f4efe7] text-3xl md:text-5xl tracking-tight">{c.name}</h3>
                                    <p className="mt-2 text-[0.8rem] text-[#8a8073]">{c.library}</p>
                                    <address className="not-italic mt-5 text-[#b1a696] text-lg leading-relaxed">
                                        {c.address}<br />
                                        T: (384) 353 5009 pbx · F: (384) 353 5125<br />
                                        <a href={`mailto:${CONTACT.universityEmail}`} className="text-[#f4efe7] underline decoration-[#4f4b48] underline-offset-4">{CONTACT.universityEmail}</a>
                                    </address>
                                </div>
                                <div className="md:col-span-5 md:flex md:justify-end md:items-start">
                                    <a href={mapUrl(c.map)} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-4xl border border-[#b1a696] text-[#f4efe7] pl-5 pr-1 py-1 hover:bg-[#f4efe7] hover:text-[#2a2725] transition-colors">
                                        Haritada aç <span className="sr-only">(Google Haritalar, yeni sekme)</span>
                                        <MdArrowOutward aria-hidden="true" className="w-8 h-8 p-1.5 rounded-full bg-[#f4efe7] text-[#2a2725] transition-transform duration-500 group-hover:rotate-45" />
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="mt-10 text-[0.75rem] text-[#8a8073]">Son güncelleme: {formatDate(page.updated)} · Önceki adres: {page.sourceUrl.replace(/^https?:\/\//, "")}</p>
            </section>
        </div>
    );
};

export default ContactPage;
