import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import PageHero from "../../components/Page/PageHero";
import Prose from "../../components/Page/Prose";
import PageLayout, { SideCard } from "../../components/Page/PageLayout";
import useReveal from "../../components/Page/useReveal";
import NotFound from "../NotFound/NotFound";
import { announcements, announcementStatus, formatDate, trialLabel } from "../../lib/content";

const AnnouncementDetail = () => {
    const { slug } = useParams();
    const scope = useRef(null);
    useReveal(scope, [slug]);
    const index = announcements.findIndex((a) => a.slug === slug);
    if (index < 0) return <NotFound />;

    const a = announcements[index];
    const newer = announcements[index - 1];
    const older = announcements[index + 1];
    const status = announcementStatus(a);

    return (
        <article ref={scope}>
            <PageHero
                title={a.title}
                eyebrow={formatDate(a.date)}
                crumbs={[{ label: "Duyurular", to: "/duyurular" }, { label: "Duyuru" }]}
                image={a.image ?? "media/site/okuma-salonu-genis.jpg"}
                imageAlt={a.image ? `${a.title}: duyuru görseli` : ""}
                contain={Boolean(a.image)}
                size="lg"
                aside={status ? trialLabel(status, a.trialEnd) : "Kütüphane duyurusu"}
            />

            <PageLayout
                label="Duyuru"
                updated={a.updated !== a.date ? a.updated : undefined}
                sectionNav={false}
                aside={
                    <SideCard title="Duyuru bilgileri">
                        <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2.5 text-[0.9rem]">
                            <dt className="text-[#8a8073]">Yayın</dt>
                            <dd className="text-[#f4efe7]"><time dateTime={a.date}>{formatDate(a.date)}</time></dd>
                            {a.updated !== a.date && (<><dt className="text-[#8a8073]">Güncelleme</dt><dd className="text-[#d8cfc2]">{formatDate(a.updated)}</dd></>)}
                            {a.isTrial && (<><dt className="text-[#8a8073]">Son erişim</dt><dd className="text-[#d8cfc2]">{a.trialEnd ? formatDate(a.trialEnd) : "Duyuruda belirtilmemiş"}</dd></>)}
                            {status && (<><dt className="text-[#8a8073]">Durum</dt><dd className={status === "active" ? "text-[#9ad3a8]" : "text-[#d8cfc2]"}>{trialLabel(status, a.trialEnd)}</dd></>)}
                        </dl>
                        {a.attachments.length > 0 && (
                            <div className="mt-6 border-t border-[#2f2c29] pt-5">
                                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#8a8073]">Ekler</p>
                                <ul className="mt-3 flex flex-col gap-2">
                                    {a.attachments.map((f) => (
                                        <li key={f.url}>
                                            <a href={f.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-2 text-[0.9rem] text-[#f4efe7] underline decoration-[#4f4b48] underline-offset-4 hover:decoration-[#f4efe7]">
                                                {f.label} <MdArrowOutward aria-hidden="true" className="mt-1 shrink-0" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <Link to="/duyurular" className="mt-6 inline-flex items-center gap-2 text-[0.88rem] text-[#b1a696] hover:text-[#f4efe7]">← Tüm duyurular</Link>
                    </SideCard>
                }
                footer={
                    <nav aria-label="Diğer duyurular" className="mt-20 grid gap-4 md:grid-cols-2 border-t border-[#2a2725] pt-10 print:hidden" data-reveal>
                        {[["Daha yeni duyuru", newer], ["Daha eski duyuru", older]].map(([label, item]) =>
                            item ? (
                                <Link key={label} to={`/duyurular/${item.slug}`} className="group flex items-end justify-between gap-6 rounded-[1.75rem] bg-[#1f1d1c] ring-1 ring-inset ring-[#2f2c29] p-6 md:p-7 hover:bg-[#262321] transition-colors">
                                    <span>
                                        <span className="block text-[0.75rem] text-[#8a8073]">{label} · {formatDate(item.date)}</span>
                                        <span className="block mt-2 text-[1.15rem] font-medium leading-snug tracking-tight text-[#f4efe7] [text-wrap:balance]">{item.title}</span>
                                    </span>
                                    <MdArrowOutward aria-hidden="true" className="shrink-0 w-10 h-10 p-2.5 rounded-full bg-[#f4efe7] text-[#2a2725] transition-transform duration-500 group-hover:rotate-45" />
                                </Link>
                            ) : <span key={label} className="hidden md:block" />
                        )}
                    </nav>
                }
            >
                {status === "expired" && (
                    <p role="note" className="mb-10 rounded-[1.5rem] border border-[#4f4b48] px-6 py-4 text-[#f4efe7] text-[0.95rem]">
                        Bu duyurudaki deneme erişimi {formatDate(a.trialEnd)} tarihinde sona ermiştir. Duyuru arşiv amacıyla yayımlanmaktadır.
                    </p>
                )}
                {status === "archive" && (
                    <p role="note" className="mb-10 rounded-[1.5rem] border border-[#4f4b48] px-6 py-4 text-[#f4efe7] text-[0.95rem]">
                        Bu bir arşiv duyurusudur; deneme erişiminin bitiş tarihi duyuruda belirtilmemiştir.
                    </p>
                )}
                <Prose html={a.html} />
            </PageLayout>
        </article>
    );
};

export default AnnouncementDetail;
