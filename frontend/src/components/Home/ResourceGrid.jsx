import { Link } from "react-router-dom";
import { MdSubscriptions, MdHourglassTop, MdLockOpen, MdMenuBook, MdNewspaper, MdSchool, MdMuseum, MdVpnLock, MdArrowForward } from "react-icons/md";
import { DIRECTORY_LABELS, DIRECTORY_ROUTES, activeTrials, countByType } from "../../lib/content";

const ICONS = { abone: MdSubscriptions, deneme: MdHourglassTop, acik: MdLockOpen, "e-kitap": MdMenuBook, "e-dergi": MdNewspaper, "acik-ders": MdSchool, "sanal-muze": MdMuseum };

/** Electronic resources as category tiles with record counts (counts come from the migrated pages). */
const ResourceGrid = () => {
    const tiles = Object.keys(DIRECTORY_LABELS).map((type) => ({
        type,
        label: DIRECTORY_LABELS[type],
        to: DIRECTORY_ROUTES[type],
        meta: type === "deneme" ? `${activeTrials().length} etkin deneme` : `${countByType(type)} kaynak`,
    }));

    return (
        <section aria-labelledby="ekaynak-baslik">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <p className="kun-eyebrow">Elektronik kaynaklar</p>
                    <h2 id="ekaynak-baslik" className="kun-h2 mt-2">Veri tabanları ve dijital koleksiyonlar</h2>
                    {/* "Kütüphanelerimiz" page */}
                    <p className="mt-3 text-[#4b5563] max-w-[42rem]">Öğrencilerimiz ve öğretim elemanlarımız veri tabanlarından 7 gün 24 saat yararlanabilmektedir.</p>
                </div>
                <Link to="/elektronik-kaynaklar" className="hidden sm:inline-flex shrink-0 items-center gap-1.5 text-[0.9rem] font-medium text-[#002856] hover:underline underline-offset-4">
                    Tüm kaynaklar <MdArrowForward aria-hidden="true" />
                </Link>
            </div>

            <ul className="mt-6 grid gap-2 grid-cols-2 md:grid-cols-4">
                {tiles.map((t) => {
                    const Icon = ICONS[t.type];
                    return (
                        <li key={t.type}>
                            <Link to={t.to} className="group flex h-full flex-col gap-4 rounded-xl border border-[#e4ded4] bg-white p-5 hover:border-[#002856] hover:shadow-[0_6px_20px_rgba(0,40,86,0.08)] transition-all">
                                <span className="flex items-center justify-center w-11 h-11 rounded-lg bg-[#002856]/[0.07] text-[#002856] group-hover:bg-[#002856] group-hover:text-white transition-colors">
                                    <Icon aria-hidden="true" className="w-5 h-5" />
                                </span>
                                <span>
                                    <span className="block text-[1rem] font-medium leading-snug text-[#1f2937] group-hover:text-[#002856]">{t.label}</span>
                                    <span className="block mt-1 text-[0.8rem] text-[#6b7280]">{t.meta}</span>
                                </span>
                            </Link>
                        </li>
                    );
                })}
                <li>
                    <Link to="/yerleske-disi-erisim" className="group flex h-full flex-col gap-4 rounded-xl bg-[#002856] p-5 text-white hover:bg-[#003a7a] transition-colors">
                        <span className="flex items-center justify-center w-11 h-11 rounded-lg bg-white/10">
                            <MdVpnLock aria-hidden="true" className="w-5 h-5" />
                        </span>
                        <span>
                            <span className="block text-[1rem] font-medium leading-snug">Yerleşke Dışı Erişim</span>
                            <span className="block mt-1 text-[0.8rem] text-white/70">Öğrenci ve öğretim elemanı kılavuzları</span>
                        </span>
                    </Link>
                </li>
            </ul>
        </section>
    );
};

export default ResourceGrid;
