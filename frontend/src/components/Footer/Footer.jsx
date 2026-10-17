import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdArrowOutward, MdArrowUpward, MdPlace, MdPhone, MdMail, MdPrint } from "react-icons/md";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import SmartLink from "../Buttons/SmartLink";
import { CONTACT, media } from "../../lib/content";
import { LIBRARY_HOURS } from "../../lib/hours";
import { NAV_GROUPS } from "../../data/nav";

const SOCIAL_ICONS = {
    "Instagram": FaInstagram,
    "Facebook": FaFacebookF,
    "YouTube": FaYoutube,
    "LinkedIn": FaLinkedinIn,
    "X (Twitter)": FaXTwitter,
};

// Site map columns: the menu groups, with the two open-science groups sharing one column.
const group = (title) => NAV_GROUPS.find((g) => g.title === title);
const COLUMNS = [
    group("Kütüphane Hakkında"),
    group("Elektronik Kaynaklar"),
    { title: "Açık Arşiv ve Açık Erişim", items: [...group("Açık Arşiv").items, ...group("Açık Erişim").items] },
    group("Araştırma"),
];

const toTop = () => {
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(0, true);
    else window.scrollTo({ top: 0, behavior: "smooth" });
};

const Heading = ({ children }) => (
    <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#8a8073]">{children}</h2>
);

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="mt-10 bg-[#121111] border-t border-[#2a2725] text-[#b1a696]">
            <div className="kun-wrap">
                {/* Identity */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-12 md:py-14 border-b border-[#2a2725]">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                        <a href="https://kapadokya.edu.tr/" target="_blank" rel="noopener noreferrer" className="shrink-0">
                            <img src={media("media/site/kapadokya-logo-beyaz.png")} alt="Kapadokya Üniversitesi" width="560" height="123" className="w-40 md:w-48 h-auto" />
                            <span className="sr-only"> (yeni sekmede açılır)</span>
                        </a>
                        <span aria-hidden="true" className="hidden sm:block w-px self-stretch bg-[#2f2c29]" />
                        <p className="text-[0.95rem] leading-snug text-[#f4efe7]">
                            {CONTACT.unit.split(" Daire ")[0]}<br />
                            <span className="text-[#b1a696]">Daire {CONTACT.unit.split(" Daire ")[1]}</span>
                        </p>
                    </div>
                    <ul className="flex items-center gap-2" aria-label="Sosyal medya">
                        {CONTACT.social.map((s) => {
                            const Icon = SOCIAL_ICONS[s.label];
                            return (
                                <li key={s.label}>
                                    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (yeni sekmede açılır)`}
                                        className="flex w-10 h-10 items-center justify-center rounded-full border border-[#38332f] text-[#f4efe7] transition-colors hover:bg-[#f4efe7] hover:border-[#f4efe7] hover:text-[#2a2725]">
                                        <Icon aria-hidden="true" className="w-4 h-4" />
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Contact + hours | site map */}
                <div className="grid gap-12 py-12 md:py-16 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-4 grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
                        <section aria-labelledby="ft-contact">
                            <Heading><span id="ft-contact">İletişim</span></Heading>
                            <address className="not-italic mt-5 space-y-3 text-[0.92rem] leading-snug">
                                <p className="flex gap-3"><MdPlace aria-hidden="true" className="mt-0.5 w-4 h-4 shrink-0 text-[#8a8073]" /><span>{CONTACT.footerAddress[0]}<br />{CONTACT.footerAddress[1]}</span></p>
                                <p className="flex gap-3"><MdPhone aria-hidden="true" className="mt-0.5 w-4 h-4 shrink-0 text-[#8a8073]" /><a href={`tel:${CONTACT.phoneHref}`} className="text-[#f4efe7] hover:underline underline-offset-4">{CONTACT.phone}</a></p>
                                <p className="flex gap-3"><MdPrint aria-hidden="true" className="mt-0.5 w-4 h-4 shrink-0 text-[#8a8073]" /><span>Faks {CONTACT.fax}</span></p>
                                <p className="flex gap-3"><MdMail aria-hidden="true" className="mt-0.5 w-4 h-4 shrink-0 text-[#8a8073]" /><a href={`mailto:${CONTACT.email}`} className="text-[#f4efe7] hover:underline underline-offset-4">{CONTACT.email}</a></p>
                            </address>
                        </section>
                        <section aria-labelledby="ft-hours">
                            <Heading><span id="ft-hours">Çalışma saatleri</span></Heading>
                            <ul className="mt-5 space-y-3 text-[0.88rem] leading-snug">
                                {LIBRARY_HOURS.map((l) => (
                                    <li key={l.name}>
                                        <span className="block text-[#f4efe7]">{l.name}</span>
                                        <span className="block text-[#8a8073]">{l.schedule?.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    <nav aria-label="Site haritası" className="lg:col-span-8 grid gap-10 grid-cols-2 md:grid-cols-4 lg:pl-10 lg:border-l lg:border-[#2a2725]">
                        {COLUMNS.map((col) => (
                            <section key={col.title}>
                                <Heading>{col.to ? <SmartLink to={col.to} className="hover:text-[#f4efe7]">{col.title}</SmartLink> : col.title}</Heading>
                                <ul className="mt-5 space-y-2.5">
                                    {col.items.map((item) => (
                                        <li key={item.label}>
                                            <SmartLink to={item.to} href={item.href} className="group inline-flex items-start gap-1 text-[0.9rem] leading-snug text-[#d8cfc2] hover:text-[#f4efe7] transition-colors">
                                                <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">{item.label}</span>
                                                {item.href && <MdArrowOutward aria-hidden="true" className="mt-0.5 shrink-0 w-3 h-3 opacity-50" />}
                                            </SmartLink>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ))}
                    </nav>
                </div>

                {/* Legal bar; bottom padding keeps it clear of the floating menu pill */}
                <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-4 border-t border-[#2a2725] pt-6 pb-28 text-[0.8rem]">
                    <p>© {year} Kapadokya Üniversitesi · {CONTACT.unit}. Tüm hakları saklıdır.</p>
                    <div className="flex items-center gap-6">
                        <a href="https://kapadokya.edu.tr/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#f4efe7] hover:underline underline-offset-4">
                            kapadokya.edu.tr<MdArrowOutward aria-hidden="true" className="w-3 h-3 opacity-60" /><span className="sr-only"> (yeni sekmede açılır)</span>
                        </a>
                        <button type="button" onClick={toTop} className="group inline-flex items-center gap-2 rounded-full border border-[#38332f] px-4 py-2 text-[#f4efe7] transition-colors hover:bg-[#f4efe7] hover:text-[#2a2725]">
                            Başa dön<MdArrowUpward aria-hidden="true" className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
