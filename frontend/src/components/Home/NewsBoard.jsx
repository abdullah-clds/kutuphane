import { Link } from "react-router-dom";
import { MdArrowForward, MdSchedule, MdHourglassTop } from "react-icons/md";
import { activeTrials, announcements, announcementStatus, daysLeft, formatDate, libraries } from "../../lib/content";

const day = new Intl.DateTimeFormat("tr-TR", { day: "2-digit" });
const mon = new Intl.DateTimeFormat("tr-TR", { month: "short" });
const parts = (iso) => { const d = new Date(`${iso}T12:00:00`); return [day.format(d), mon.format(d), iso.slice(0, 4)]; };

const COUNT = 7;

/** Announcements list with date blocks, plus sidebar: active trials and opening hours (Genel Kurallar). */
const NewsBoard = () => {
    const items = announcements.slice(0, COUNT);
    const trials = activeTrials();
    const hours = [
        ...libraries.items.filter((l) => l.hours).map((l) => [l.name, l.hours.replace(/^.*?–\s*/, "")]),
        ...libraries.otherHours.map((h) => [h.split(/\s*[–-]\s*/)[0], h.replace(/^.*?[–-]\s*/, "")]),
    ];

    return (
        <section id="duyurular" aria-labelledby="duyurular-baslik" className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <p className="kun-eyebrow">Kütüphaneden</p>
                        <h2 id="duyurular-baslik" className="kun-h2 mt-2">Duyurular</h2>
                    </div>
                    <Link to="/duyurular" className="inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-[#002856] hover:underline underline-offset-4">
                        Tüm duyurular <MdArrowForward aria-hidden="true" />
                    </Link>
                </div>

                <ol className="mt-6 divide-y divide-[#e4ded4] border-y border-[#e4ded4]">
                    {items.map((a, i) => {
                        const [d, m, y] = parts(a.date);
                        const status = announcementStatus(a);
                        return (
                            // Phones show four.
                            <li key={a.slug} className={i >= 4 ? "hidden md:block" : undefined}>
                                <Link to={`/duyurular/${a.slug}`} className="group flex items-center gap-5 py-4">
                                    <time dateTime={a.date} className="shrink-0 w-16 rounded-lg border border-[#e4ded4] bg-white text-center py-1.5 group-hover:border-[#002856] transition-colors">
                                        <span className="block text-2xl font-semibold leading-none text-[#002856]">{d}</span>
                                        <span className="block mt-1 text-[0.7rem] uppercase tracking-wide text-[#6b7280]">{m} {y}</span>
                                    </time>
                                    <span className="flex-1 min-w-0">
                                        <span className="block text-[1.05rem] leading-snug text-[#1f2937] group-hover:text-[#002856] transition-colors">{a.title}</span>
                                        {status === "active" && (
                                            <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-[#002856]/[0.07] px-2.5 py-0.5 text-[0.72rem] text-[#002856]">
                                                Deneme erişimi · {daysLeft(a.trialEnd)} gün kaldı
                                            </span>
                                        )}
                                        {status === "expired" && <span className="mt-1.5 inline-block text-[0.72rem] text-[#6b7280]">Deneme süresi sona erdi</span>}
                                    </span>
                                    <MdArrowForward aria-hidden="true" className="shrink-0 text-[#9ca3af] group-hover:text-[#002856] group-hover:translate-x-1 transition-all" />
                                </Link>
                            </li>
                        );
                    })}
                </ol>
            </div>

            <aside className="lg:col-span-4 flex flex-col gap-4">
                <div className="rounded-xl border border-[#e4ded4] bg-white p-5">
                    <h3 className="flex items-center gap-2 text-[0.95rem] font-semibold text-[#002856]">
                        <MdHourglassTop aria-hidden="true" /> Deneme erişimindeki kaynaklar
                    </h3>
                    {trials.length > 0 ? (
                        <ul className="mt-3 divide-y divide-[#efeae2]">
                            {trials.map((t) => (
                                <li key={t.id}>
                                    <Link to={`/deneme-erisimli-veri-tabanlari#${t.id}`} className="flex items-baseline justify-between gap-3 py-2 text-[0.9rem] text-[#1f2937] hover:text-[#002856]">
                                        <span className="min-w-0 truncate">{t.name}</span>
                                        <span className="shrink-0 text-[0.78rem] text-[#6b7280]" title={`Son erişim: ${formatDate(t.trialEnd)}`}>{daysLeft(t.trialEnd)} gün</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : <p className="mt-3 text-[0.9rem] text-[#6b7280]">Şu anda deneme erişiminde kaynak yok.</p>}
                    <Link to="/deneme-erisimli-veri-tabanlari" className="mt-3 inline-flex items-center gap-1 text-[0.85rem] font-medium text-[#002856] hover:underline underline-offset-4">Tümünü gör <MdArrowForward aria-hidden="true" /></Link>
                </div>

                <div className="rounded-xl border border-[#e4ded4] bg-white p-5">
                    <h3 className="flex items-center gap-2 text-[0.95rem] font-semibold text-[#002856]">
                        <MdSchedule aria-hidden="true" /> Çalışma saatleri
                    </h3>
                    <dl className="mt-3 divide-y divide-[#efeae2]">
                        {hours.map(([name, h]) => (
                            <div key={name} className="py-2">
                                <dt className="text-[0.88rem] text-[#1f2937]">{name}</dt>
                                <dd className="text-[0.8rem] text-[#6b7280]">{h}</dd>
                            </div>
                        ))}
                    </dl>
                    <Link to="/genel-kurallar" className="mt-3 inline-flex items-center gap-1 text-[0.85rem] font-medium text-[#002856] hover:underline underline-offset-4">Genel Kurallar <MdArrowForward aria-hidden="true" /></Link>
                </div>
            </aside>
        </section>
    );
};

export default NewsBoard;
