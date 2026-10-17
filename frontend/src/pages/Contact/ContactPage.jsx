import { useRef } from "react";
import { MdArrowOutward, MdMail, MdPhone, MdPrint, MdPlace } from "react-icons/md";
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import PageHero from "../../components/Page/PageHero";
import useReveal from "../../components/Page/useReveal";
import { CONTACT, findPage, formatDate } from "../../lib/content";
import { LIBRARY_HOURS, statusNow } from "../../lib/hours";

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
const initials = (name) => name.split(" ").map((w) => w[0]).join("").slice(0, 2).toLocaleUpperCase("tr");
const SOCIAL_ICONS = { "Instagram": FaInstagram, "Facebook": FaFacebookF, "YouTube": FaYoutube, "LinkedIn": FaLinkedinIn, "X (Twitter)": FaXTwitter };

const Eyebrow = ({ children, light = false, as: As = "h2" }) => (
    <As className={`text-[0.72rem] font-semibold uppercase tracking-[0.14em] ${light ? "text-[#6b6259]" : "text-[#8a8073]"}`}>{children}</As>
);
const darkCard = "rounded-[1.75rem] bg-[#1f1d1c] ring-1 ring-inset ring-[#2f2c29]";

const ContactPage = () => {
    const scope = useRef(null);
    const page = findPage("/iletisim");
    useReveal(scope);
    const now = new Date();

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

            <div className="kun-wrap pb-28">
                {/* Ways to reach us */}
                <section aria-label="E-posta, telefon ve faks" className="grid gap-4 md:grid-cols-3" data-reveal>
                    <a href={`mailto:${CONTACT.email}`} className="group flex flex-col justify-between gap-8 rounded-[1.75rem] bg-[#f4efe7] p-6 md:p-7 text-[#2a2725] transition-colors hover:bg-white">
                        <span className="flex items-center justify-between">
                            <Eyebrow light as="span">E-posta</Eyebrow>
                            <MdMail aria-hidden="true" className="w-10 h-10 p-2.5 rounded-full bg-[#2a2725] text-[#f4efe7]" />
                        </span>
                        <span>
                            <span className="block text-[1.2rem] md:text-[1.3rem] font-medium tracking-tight break-all">{CONTACT.email}</span>
                            <span className="mt-2 inline-flex items-center gap-1 text-[0.85rem] text-[#5e574f] group-hover:text-[#2a2725]">E-posta gönderin<MdArrowOutward aria-hidden="true" className="w-4 h-4 transition-transform group-hover:rotate-45" /></span>
                        </span>
                    </a>
                    <a href={`tel:${CONTACT.phoneHref}`} className={`group flex flex-col justify-between gap-8 p-6 md:p-7 transition-colors hover:bg-[#262321] ${darkCard}`}>
                        <span className="flex items-center justify-between">
                            <Eyebrow as="span">Telefon</Eyebrow>
                            <MdPhone aria-hidden="true" className="w-10 h-10 p-2.5 rounded-full border border-[#38332f] text-[#f4efe7]" />
                        </span>
                        <span>
                            <span className="block text-[1.2rem] md:text-[1.3rem] font-medium tracking-tight text-[#f4efe7]">0384 353 50 09</span>
                            <span className="mt-2 block text-[0.85rem] text-[#8a8073]">Santral · personel dahili numaraları aşağıda</span>
                        </span>
                    </a>
                    <div className={`flex flex-col justify-between gap-8 p-6 md:p-7 ${darkCard}`}>
                        <span className="flex items-center justify-between">
                            <Eyebrow as="span">Faks</Eyebrow>
                            <MdPrint aria-hidden="true" className="w-10 h-10 p-2.5 rounded-full border border-[#38332f] text-[#f4efe7]" />
                        </span>
                        <span>
                            <span className="block text-[1.2rem] md:text-[1.3rem] font-medium tracking-tight text-[#f4efe7]">{CONTACT.fax}</span>
                            <span className="mt-2 block text-[0.85rem] text-[#8a8073]">{CONTACT.footerAddress.join(", ")}</span>
                        </span>
                    </div>
                </section>

                <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-14">
                    <div className="lg:col-span-8 flex flex-col gap-14">
                        {/* Staff */}
                        <section aria-labelledby="staff" data-reveal>
                            <Eyebrow><span id="staff">Kütüphane ve Dokümantasyon personeli</span></Eyebrow>
                            <ul className="mt-5 grid gap-4 md:grid-cols-2">
                                {STAFF.map((p) => (
                                    <li key={p.email} className={`p-6 md:p-7 ${darkCard}`}>
                                        <div className="flex items-center gap-4">
                                            <span aria-hidden="true" className="flex w-14 h-14 shrink-0 items-center justify-center rounded-full bg-[#f4efe7] text-[1.1rem] font-medium text-[#2a2725]">{initials(p.name)}</span>
                                            <div>
                                                <h3 className="text-[1.25rem] font-medium leading-tight tracking-tight text-[#f4efe7]">{p.name}</h3>
                                                <p className="mt-1 text-[0.85rem] leading-snug text-[#8a8073]">{p.role}</p>
                                            </div>
                                        </div>
                                        <ul className="mt-6 space-y-2 border-t border-[#2f2c29] pt-5 text-[0.92rem]">
                                            <li className="flex items-center gap-3 text-[#d8cfc2]"><MdPhone aria-hidden="true" className="w-4 h-4 text-[#8a8073]" />0384 353 50 09 · Dahili <span className="font-medium text-[#f4efe7]">{p.ext}</span></li>
                                            <li><a href={`mailto:${p.email}`} className="flex items-center gap-3 text-[#f4efe7] hover:underline underline-offset-4 break-all"><MdMail aria-hidden="true" className="w-4 h-4 shrink-0 text-[#8a8073]" />{p.email}</a></li>
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Campuses */}
                        <section aria-labelledby="campuses" data-reveal>
                            <Eyebrow><span id="campuses">Kapadokya Üniversitesi yerleşkeleri</span></Eyebrow>
                            <ul className="mt-5 grid gap-4 md:grid-cols-2">
                                {CAMPUSES.map((c) => (
                                    <li key={c.name} className={`flex flex-col justify-between gap-6 p-6 md:p-7 ${darkCard}`}>
                                        <div>
                                            <h3 className="text-[length:var(--fs-h3)] font-medium leading-tight tracking-tight text-[#f4efe7]">{c.name}</h3>
                                            <p className="mt-2 inline-block rounded-full bg-[#2a2725] px-3 py-1 text-[0.75rem] text-[#d8cfc2]">{c.library}</p>
                                            <address className="not-italic mt-5 space-y-2 text-[0.92rem] leading-snug text-[#b1a696]">
                                                <p className="flex gap-3"><MdPlace aria-hidden="true" className="mt-0.5 w-4 h-4 shrink-0 text-[#8a8073]" />{c.address}</p>
                                                <p className="flex gap-3"><MdPhone aria-hidden="true" className="mt-0.5 w-4 h-4 shrink-0 text-[#8a8073]" />T: (384) 353 5009 pbx · F: (384) 353 5125</p>
                                                <p className="flex gap-3"><MdMail aria-hidden="true" className="mt-0.5 w-4 h-4 shrink-0 text-[#8a8073]" /><a href={`mailto:${CONTACT.universityEmail}`} className="text-[#f4efe7] hover:underline underline-offset-4">{CONTACT.universityEmail}</a></p>
                                            </address>
                                        </div>
                                        <a href={mapUrl(c.map)} target="_blank" rel="noopener noreferrer" className="group inline-flex w-fit items-center gap-2 rounded-full bg-[#f4efe7] pl-4 pr-1.5 py-1.5 text-[0.85rem] font-medium text-[#2a2725] hover:bg-white">
                                            Haritada aç <span className="sr-only">(Google Haritalar, yeni sekme)</span>
                                            <MdArrowOutward aria-hidden="true" className="w-7 h-7 p-1.5 rounded-full bg-[#2a2725] text-[#f4efe7] transition-transform duration-500 group-hover:rotate-45" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    <aside className="lg:col-span-4 flex flex-col gap-4" data-reveal>
                        <section className={`p-6 md:p-7 ${darkCard}`}>
                            <Eyebrow>Çalışma saatleri</Eyebrow>
                            <ul className="mt-4 flex flex-col divide-y divide-[#2f2c29]">
                                {LIBRARY_HOURS.map((l) => {
                                    const st = statusNow(l.schedule, now);
                                    return (
                                        <li key={l.name} className="py-3 first:pt-0 last:pb-0">
                                            <p className="flex items-center justify-between gap-3">
                                                <span className="text-[0.95rem] font-medium text-[#f4efe7]">{l.name}</span>
                                                <span className={`inline-flex items-center gap-1.5 text-[0.75rem] ${st?.open ? "text-[#9ad3a8]" : "text-[#8a8073]"}`}>
                                                    <span aria-hidden="true" className={`w-1.5 h-1.5 rounded-full ${st?.open ? "bg-[#1f9d55]" : "bg-[#5e574f]"}`} />{st?.open ? "Açık" : "Kapalı"}
                                                </span>
                                            </p>
                                            <p className="mt-1 text-[0.82rem] leading-snug text-[#8a8073]">{l.schedule?.text}</p>
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                        <section className={`p-6 md:p-7 ${darkCard}`}>
                            <Eyebrow>Sosyal medya</Eyebrow>
                            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Sosyal medya">
                                {CONTACT.social.map((so) => {
                                    const Icon = SOCIAL_ICONS[so.label];
                                    return (
                                        <li key={so.label}>
                                            <a href={so.href} target="_blank" rel="noopener noreferrer" aria-label={`${so.label} (yeni sekmede açılır)`}
                                                className="flex w-11 h-11 items-center justify-center rounded-full border border-[#38332f] text-[#f4efe7] transition-colors hover:bg-[#f4efe7] hover:border-[#f4efe7] hover:text-[#2a2725]">
                                                <Icon aria-hidden="true" className="w-4 h-4" />
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                        {page?.updated && <p className="px-2 text-[0.75rem] text-[#8a8073]">Son güncelleme: {formatDate(page.updated)}</p>}
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
