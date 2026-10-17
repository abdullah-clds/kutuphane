import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdArrowOutward, MdArrowBack, MdArrowForward, MdPrint, MdLink, MdCheck, MdMail, MdPhone } from "react-icons/md";
import SmartLink from "../Buttons/SmartLink";
import { groupOf } from "../../data/nav";
import { CONTACT, formatDate } from "../../lib/content";

/**
 * Body of every inner page under its PageHero: a toolbar (section, last update, print / copy link),
 * the text on the left, a card sidebar on the right (section pages, help, page-specific cards)
 * and previous / next pages of the same section at the end.
 */

const Card = ({ title, children, tone = "dark" }) => (
    <section className={`rounded-[1.75rem] p-6 md:p-7 ${tone === "light" ? "bg-[#f4efe7] text-[#2a2725]" : "bg-[#1f1d1c] ring-1 ring-inset ring-[#2f2c29]"}`}>
        {title && <h2 className={`text-[0.72rem] font-semibold uppercase tracking-[0.14em] ${tone === "light" ? "text-[#6b6259]" : "text-[#8a8073]"}`}>{title}</h2>}
        <div className={title ? "mt-4" : ""}>{children}</div>
    </section>
);

export const SideCard = Card;

const SectionNav = ({ group, pathname }) => (
    <Card title="Bu bölümde">
        <nav aria-label={group.title}>
            <p className="text-[1.05rem] font-medium tracking-tight text-[#f4efe7]">
                {group.to ? <Link to={group.to} className="hover:underline underline-offset-4">{group.title}</Link> : group.title}
            </p>
            <ul className="mt-3 -mx-3 flex flex-col">
                {group.items.map((item) => {
                    const current = item.to === pathname;
                    return (
                        <li key={item.label}>
                            <SmartLink to={item.to} href={item.href} aria-current={current ? "page" : undefined}
                                className={`relative flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-[0.9rem] leading-snug transition-colors ${current ? "bg-[#2a2725] text-[#f4efe7] font-medium" : "text-[#b1a696] hover:bg-[#262321] hover:text-[#f4efe7]"}`}>
                                {current && <span aria-hidden="true" className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-[#f4efe7]" />}
                                <span>{item.label}</span>
                                {item.href && <MdArrowOutward aria-hidden="true" className="shrink-0 w-3.5 h-3.5 opacity-60" />}
                            </SmartLink>
                        </li>
                    );
                })}
            </ul>
        </nav>
    </Card>
);

const HelpCard = () => (
    <Card title="Yardıma mı ihtiyacınız var?" tone="light">
        <p className="text-[0.92rem] leading-snug text-[#5e574f]">Sorularınız için {CONTACT.unit}’na ulaşabilirsiniz.</p>
        <ul className="mt-4 space-y-2 text-[0.92rem]">
            <li><a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 font-medium hover:underline underline-offset-4"><MdMail aria-hidden="true" className="w-4 h-4" />{CONTACT.email}</a></li>
            <li><a href={`tel:${CONTACT.phoneHref}`} className="inline-flex items-center gap-2 font-medium hover:underline underline-offset-4"><MdPhone aria-hidden="true" className="w-4 h-4" />{CONTACT.phone}</a></li>
        </ul>
        <Link to="/iletisim" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#2a2725] px-4 py-2 text-[0.85rem] text-[#f4efe7] hover:bg-[#33302d]">
            Tüm iletişim bilgileri<MdArrowOutward aria-hidden="true" className="w-4 h-4" />
        </Link>
    </Card>
);

const ToolButton = ({ onClick, icon: Icon, children }) => (
    <button type="button" onClick={onClick} className="inline-flex items-center gap-2 rounded-full border border-[#38332f] px-3.5 py-1.5 text-[0.8rem] text-[#d8cfc2] transition-colors hover:border-[#f4efe7] hover:text-[#f4efe7]">
        <Icon aria-hidden="true" className="w-4 h-4" />{children}
    </button>
);

const Toolbar = ({ label, updated }) => {
    const [copied, setCopied] = useState(false);
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch { /* clipboard unavailable: nothing to do */ }
    };
    return (
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2a2725] pb-5 print:hidden" data-reveal>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.82rem] text-[#8a8073]">
                {label && <span className="rounded-full bg-[#2a2725] px-3 py-1 text-[0.75rem] font-medium text-[#f4efe7]">{label}</span>}
                {updated && <span>Son güncelleme: <time dateTime={updated} className="text-[#b1a696]">{formatDate(updated)}</time></span>}
            </p>
            <div className="flex items-center gap-2">
                <ToolButton onClick={() => window.print()} icon={MdPrint}>Yazdır</ToolButton>
                <ToolButton onClick={copy} icon={copied ? MdCheck : MdLink}>
                    <span aria-live="polite">{copied ? "Kopyalandı" : "Bağlantıyı kopyala"}</span>
                </ToolButton>
            </div>
        </div>
    );
};

const PrevNext = ({ group, pathname }) => {
    const pages = group.items.filter((i) => i.to);
    const i = pages.findIndex((p) => p.to === pathname);
    if (i < 0 || pages.length < 2) return null;
    const prev = pages[i - 1];
    const next = pages[i + 1];
    return (
        <nav aria-label="Bölümdeki diğer sayfalar" className="mt-20 grid gap-4 md:grid-cols-2 border-t border-[#2a2725] pt-10 print:hidden" data-reveal>
            {prev ? (
                <Link to={prev.to} className="group flex items-center gap-5 rounded-[1.75rem] bg-[#1f1d1c] ring-1 ring-inset ring-[#2f2c29] p-6 hover:bg-[#262321] transition-colors">
                    <MdArrowBack aria-hidden="true" className="shrink-0 w-10 h-10 p-2.5 rounded-full border border-[#38332f] text-[#f4efe7] transition-transform group-hover:-translate-x-1" />
                    <span><span className="block text-[0.75rem] text-[#8a8073]">Önceki sayfa</span><span className="block mt-1 text-[1.1rem] font-medium tracking-tight text-[#f4efe7]">{prev.label}</span></span>
                </Link>
            ) : <span className="hidden md:block" />}
            {next && (
                <Link to={next.to} className="group flex items-center justify-end gap-5 text-right rounded-[1.75rem] bg-[#1f1d1c] ring-1 ring-inset ring-[#2f2c29] p-6 hover:bg-[#262321] transition-colors">
                    <span><span className="block text-[0.75rem] text-[#8a8073]">Sonraki sayfa</span><span className="block mt-1 text-[1.1rem] font-medium tracking-tight text-[#f4efe7]">{next.label}</span></span>
                    <MdArrowForward aria-hidden="true" className="shrink-0 w-10 h-10 p-2.5 rounded-full border border-[#38332f] text-[#f4efe7] transition-transform group-hover:translate-x-1" />
                </Link>
            )}
        </nav>
    );
};

const PageLayout = ({ children, aside, label, updated, footer, sectionNav = true, help = true, className = "pb-28" }) => {
    const { pathname } = useLocation();
    const group = groupOf(pathname);
    return (
        <div className={`kun-wrap ${className}`}>
            <Toolbar label={label ?? group?.title} updated={updated} />
            <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
                <div className="lg:col-span-8 min-w-0" data-reveal>{children}</div>
                <aside className="lg:col-span-4 flex flex-col gap-4 print:hidden" data-reveal>
                    {aside}
                    {sectionNav && group && <SectionNav group={group} pathname={pathname} />}
                    {help && <HelpCard />}
                </aside>
            </div>
            {footer ?? (group && <PrevNext group={group} pathname={pathname} />)}
        </div>
    );
};

export default PageLayout;
