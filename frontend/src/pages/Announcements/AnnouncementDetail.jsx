import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import PageHero from "../../components/Page/PageHero";
import Prose from "../../components/Page/Prose";
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

            <div className="px-6 md:px-8 pb-24 grid gap-14 lg:grid-cols-12">
                <aside className="lg:col-span-3 flex flex-col gap-8 text-[0.85rem]" data-reveal>
                    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 border-t border-[#4f4b48] pt-4">
                        <dt className="text-[#8a8073]">Yayın</dt>
                        <dd className="text-[#f4efe7]"><time dateTime={a.date}>{formatDate(a.date)}</time></dd>
                        {a.updated !== a.date && (<><dt className="text-[#8a8073]">Güncelleme</dt><dd className="text-[#b1a696]">{formatDate(a.updated)}</dd></>)}
                        {a.isTrial && (<><dt className="text-[#8a8073]">Son erişim</dt><dd className="text-[#b1a696]">{a.trialEnd ? formatDate(a.trialEnd) : "Duyuruda belirtilmemiş"}</dd></>)}
                    </dl>
                    {a.attachments.length > 0 && (
                        <div>
                            <p className="text-[.7rem] font-bold text-[#eae5dd] mb-3">Ekler</p>
                            <ul className="flex flex-col gap-2">
                                {a.attachments.map((f) => (
                                    <li key={f.url}>
                                        <a href={f.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-2 text-[#f4efe7] underline decoration-[#4f4b48] underline-offset-4 hover:decoration-[#f4efe7]">
                                            {f.label} <MdArrowOutward aria-hidden="true" className="mt-1 shrink-0" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <Link to="/duyurular" className="text-[#b1a696] hover:text-[#f4efe7] underline underline-offset-4 decoration-[#4f4b48]">← Tüm duyurular</Link>
                    <p className="text-[0.75rem] text-[#8a8073] break-all">Önceki adres: {a.sourceUrl.replace(/^https?:\/\//, "")}</p>
                </aside>

                <div className="lg:col-span-8 lg:col-start-5" data-reveal>
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
                </div>
            </div>

            <nav aria-label="Diğer duyurular" className="px-2 pb-24 grid gap-2 md:grid-cols-2">
                {[["Daha yeni duyuru", newer], ["Daha eski duyuru", older]].map(([label, item]) =>
                    item ? (
                        <Link key={label} to={`/duyurular/${item.slug}`} className="group rounded-[2.5rem] bg-[#2a2725] p-8 md:p-10 flex flex-col justify-between gap-10 min-h-[16rem] hover:bg-[#33302d] transition-colors">
                            <span className="text-[0.7rem] font-bold text-[#eae5dd]">{label} · {formatDate(item.date)}</span>
                            <span className="flex items-end justify-between gap-6">
                                <span className="text-2xl md:text-3xl text-[#f4efe7] leading-[1.1] [text-wrap:balance]">{item.title}</span>
                                <MdArrowOutward aria-hidden="true" className="shrink-0 w-12 h-12 p-2.5 rounded-full bg-[#f4efe7] text-[#2a2725] transition-transform duration-500 group-hover:rotate-45" />
                            </span>
                        </Link>
                    ) : (
                        <span key={label} className="hidden md:block" />
                    )
                )}
            </nav>
        </article>
    );
};

export default AnnouncementDetail;
