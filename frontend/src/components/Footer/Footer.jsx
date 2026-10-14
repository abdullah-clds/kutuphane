import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import SmartLink from "../Buttons/SmartLink";
import { NAV_GROUPS } from "../../data/nav";
import { CONTACT, media } from "../../lib/content";

const SOCIAL_ICONS = {
    "Instagram": FaInstagram,
    "Facebook": FaFacebookF,
    "YouTube": FaYoutube,
    "LinkedIn": FaLinkedinIn,
    "X (Twitter)": FaXTwitter,
};

const byTitle = (t) => NAV_GROUPS.find((g) => g.title === t);
const COLUMNS = [
    { title: "Kütüphane Hakkında", items: byTitle("Kütüphane Hakkında").items },
    { title: "Elektronik Kaynaklar", items: byTitle("Elektronik Kaynaklar").items },
    { title: "Açık Arşiv ve Açık Erişim", items: [...byTitle("Açık Arşiv").items, ...byTitle("Açık Erişim").items] },
    { title: "Araştırma", items: [...byTitle("Araştırma").items, { label: "Duyurular", to: "/duyurular" }, { label: "İletişim", to: "/iletisim" }] },
];

/** Institutional footer in the university's navy: identity and contact, site map, social, legal line. */
const Footer = () => {
    return (
        <footer className="mx-2 mt-2 rounded-t-[2.5rem] bg-[#002856] text-white" aria-label="Alt bilgi">
            <div className="px-6 md:px-10 lg:px-14 pt-14 pb-10 grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-4">
                    <Link to="/" aria-label="Anasayfa" className="inline-block">
                        <img src={media("media/site/kapadokya-logo-beyaz.png")} alt="Kapadokya Üniversitesi" className="w-52 h-auto" width="560" height="123" />
                    </Link>
                    <p className="mt-5 text-[1.05rem] font-medium">{CONTACT.unit}</p>
                    <ul className="mt-5 flex flex-col gap-3 text-[0.9rem] text-white/80">
                        <li className="flex gap-3">
                            <MdLocationOn aria-hidden="true" className="mt-0.5 shrink-0 text-white/60" />
                            <address className="not-italic">{CONTACT.footerAddress[0]}<br />{CONTACT.footerAddress[1]}</address>
                        </li>
                        <li className="flex gap-3">
                            <MdPhone aria-hidden="true" className="mt-0.5 shrink-0 text-white/60" />
                            <span>Tel: <a href={`tel:${CONTACT.phoneHref}`} className="hover:text-white">{CONTACT.phone}</a><br />Faks: {CONTACT.fax}</span>
                        </li>
                        <li className="flex gap-3">
                            <MdEmail aria-hidden="true" className="mt-0.5 shrink-0 text-white/60" />
                            <a href={`mailto:${CONTACT.email}`} className="hover:text-white underline underline-offset-4 decoration-white/30">{CONTACT.email}</a>
                        </li>
                    </ul>
                </div>

                <nav aria-label="Site haritası" className="lg:col-span-8 grid gap-8 grid-cols-2 md:grid-cols-4">
                    {COLUMNS.map((col) => (
                        <div key={col.title}>
                            <h2 className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-white/60">{col.title}</h2>
                            <ul className="mt-3 flex flex-col gap-2">
                                {col.items.map((i) => (
                                    <li key={i.label}>
                                        <SmartLink to={i.to} href={i.href} className="text-[0.88rem] leading-snug text-white/85 hover:text-white hover:underline underline-offset-4">
                                            {i.label}
                                        </SmartLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </div>

            <div className="border-t border-white/15 px-6 md:px-10 lg:px-14 pt-6 pb-28 md:pb-24 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                <p className="text-[0.8rem] text-white/70">
                    © {new Date().getFullYear()} Kapadokya Üniversitesi · {CONTACT.unit}.{" "}
                    <a href="https://kapadokya.edu.tr/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-white/30 hover:text-white">kapadokya.edu.tr</a>
                </p>
                <ul className="flex items-center gap-2" aria-label="Sosyal medya">
                    {CONTACT.social.map((s) => {
                        const Icon = SOCIAL_ICONS[s.label];
                        return (
                            <li key={s.label}>
                                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (yeni sekmede açılır)`} className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#002856] transition-colors">
                                    <Icon aria-hidden="true" className="text-[0.95rem]" />
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </footer>
    )
}

export default Footer;
