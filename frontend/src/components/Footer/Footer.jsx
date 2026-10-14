import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { Link } from "react-router-dom";

import MarqueeText from '../Marquee/MarqueeText';
import { CONTACT } from "../../lib/content";

const SOCIAL_ICONS = {
    "Instagram": FaInstagram,
    "Facebook": FaFacebookF,
    "YouTube": FaYoutube,
    "LinkedIn": CiLinkedin,
    "X (Twitter)": FaXTwitter,
};

const FOOTER_LINKS = [
    { label: "Duyurular", to: "/duyurular" },
    { label: "Kütüphanelerimiz", to: "/kutuphanelerimiz" },
    { label: "Elektronik Kaynaklar", to: "/elektronik-kaynaklar" },
    { label: "Tarama", to: "/tarama" },
    { label: "Genel Kurallar", to: "/genel-kurallar" },
    { label: "İletişim", to: "/iletisim" },
];

const Footer = () => {
    return (
        <footer className='w-full min-h-dvh px-6 mt-10 pb-28'>
            <p className='text-[.7rem] text-[#eae5dd] choose-subtitle mt-10'>Kapadokya Üniversitesi<br />{CONTACT.unit}</p>
            <div aria-hidden="true">
                <MarqueeText text="Bilgiye Açılan Kapı" />
            </div>

            <div className='flex md:flex-row flex-col justify-between md:items-center gap-12 text-xl md:text-2xl mt-14'>
                <address className='not-italic text-[#b1a696]'>
                    {CONTACT.footerAddress[0]}<br />
                    {CONTACT.footerAddress[1]}<br /><br />
                    Tel: <a href={`tel:${CONTACT.phoneHref}`} className='text-[#f4efe7] hover:text-[#c4c1b9]'>{CONTACT.phone}</a><br />
                    Faks: {CONTACT.fax}<br />
                    E-posta—<a href={`mailto:${CONTACT.email}`} className='text-[#f4efe7] hover:text-[#c4c1b9] underline'>{CONTACT.email}</a>
                </address>

                <nav aria-label="Alt bilgi bağlantıları">
                    <ul className='flex flex-col md:items-end'>
                        {FOOTER_LINKS.map((l) => (
                            <li key={l.to}><Link to={l.to} className='text-[#f2ede5] hover:text-[#b1a696] transition-colors text-2xl'>{l.label}</Link></li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className="w-full flex md:flex-row flex-col justify-between md:items-center gap-8 mt-20">
                <ul className="flex justify-start items-center gap-1" aria-label="Sosyal medya">
                    {CONTACT.social.map((s) => {
                        const Icon = SOCIAL_ICONS[s.label];
                        return (
                            <li key={s.label}>
                                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (yeni sekmede açılır)`} className='block border-[1px] border-[#c4c1b9] rounded-full p-3 text-[#f2ede5] hover:bg-[#f2ede5] hover:text-[#2a2725] transition-colors'>
                                    <Icon className="text-xl" aria-hidden="true" />
                                </a>
                            </li>
                        );
                    })}
                </ul>

                <div>
                    <p className="text-[0.8rem] text-[#b1a696] md:text-right">
                        Bilgiye Açılan Kapı—Kapadokya<br />
                        Üniversitesi Kütüphanesi.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
