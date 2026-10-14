import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import SmartLink from "../Buttons/SmartLink";
import { NAV_GROUPS } from "../../data/nav";
import { CONTACT } from "../../lib/content";

const SOCIAL_ICONS = { "Instagram": FaInstagram, "Facebook": FaFacebookF, "YouTube": FaYoutube, "LinkedIn": FaLinkedinIn, "X (Twitter)": FaXTwitter };

/** Apple-style footer: light grey, small type, site map in columns, one legal line. */
const Footer = () => {
    return (
        <footer className="bg-[#f5f5f7] text-[0.75rem] leading-relaxed text-[#6e6e73]" aria-label="Alt bilgi">
            <div className="kun-wrap pt-10 pb-6">
                <p className="pb-4 border-b border-[#d2d2d7]">
                    {CONTACT.unit} · {CONTACT.footerAddress.join(", ")} · Tel: <a href={`tel:${CONTACT.phoneHref}`} className="hover:underline">{CONTACT.phone}</a> · Faks: {CONTACT.fax} · E-posta: <a href={`mailto:${CONTACT.email}`} className="text-[var(--kun-accent)] hover:underline">{CONTACT.email}</a>
                </p>

                <nav aria-label="Site haritası" className="py-6 grid gap-8 grid-cols-2 md:grid-cols-5">
                    {NAV_GROUPS.map((g) => (
                        <div key={g.title}>
                            <h2 className="font-semibold text-[#1d1d1f]">{g.title}</h2>
                            <ul className="mt-2 flex flex-col gap-1.5">
                                {g.items.map((i) => (
                                    <li key={i.label}>
                                        <SmartLink to={i.to} href={i.href} className="hover:text-[#1d1d1f] hover:underline">{i.label}</SmartLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>

                <div className="pt-4 border-t border-[#d2d2d7] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <p>Copyright © {new Date().getFullYear()} Kapadokya Üniversitesi. Tüm hakları saklıdır.</p>
                    <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <li><Link to="/duyurular" className="hover:text-[#1d1d1f] hover:underline">Duyurular</Link></li>
                        <li><Link to="/iletisim" className="hover:text-[#1d1d1f] hover:underline">İletişim</Link></li>
                        <li><a href="https://kapadokya.edu.tr/" target="_blank" rel="noopener noreferrer" className="hover:text-[#1d1d1f] hover:underline">kapadokya.edu.tr</a></li>
                        <li className="flex items-center gap-1" aria-label="Sosyal medya">
                            {CONTACT.social.map((s) => {
                                const Icon = SOCIAL_ICONS[s.label];
                                return (
                                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (yeni sekmede açılır)`} className="w-7 h-7 inline-flex items-center justify-center rounded-full hover:bg-[#e8e8ed] hover:text-[#1d1d1f]">
                                        <Icon aria-hidden="true" />
                                    </a>
                                );
                            })}
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
