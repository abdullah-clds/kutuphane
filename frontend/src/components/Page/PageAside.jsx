import { useLocation } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import SmartLink from "../Buttons/SmartLink";
import { groupOf } from "../../data/nav";
import { formatDate } from "../../lib/content";

/** Left column of inner pages: section siblings (from the site menu) and page metadata. */
const PageAside = ({ updated, sourceUrl, children }) => {
    const { pathname } = useLocation();
    const group = groupOf(pathname);

    return (
        <aside className="flex flex-col gap-10 text-[0.85rem]" data-reveal>
            {group && (
                <nav aria-label={group.title}>
                    <p className="text-[.7rem] font-bold text-[#eae5dd] mb-4">{group.title}</p>
                    <ul className="flex flex-col border-t border-[#4f4b48]">
                        {group.items.map((item) => {
                            const current = item.to === pathname;
                            return (
                                <li key={item.label} className="border-b border-[#4f4b48]">
                                    <SmartLink
                                        to={item.to}
                                        href={item.href}
                                        aria-current={current ? "page" : undefined}
                                        className={`flex items-center justify-between gap-3 py-2.5 transition-colors ${current ? "text-[#f4efe7]" : "text-[#b1a696] hover:text-[#f4efe7]"}`}
                                    >
                                        <span>{item.label}</span>
                                        {item.href ? <MdArrowOutward aria-hidden="true" className="shrink-0 opacity-60" /> : current && <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#f4efe7]" />}
                                    </SmartLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            )}
            {children}
            {(updated || sourceUrl) && (
                <dl className="text-[0.75rem] text-[#8a8073] flex flex-col gap-1">
                    {updated && (<><dt className="sr-only">Son güncelleme</dt><dd>Son güncelleme: {formatDate(updated)}</dd></>)}
                    {sourceUrl && (<><dt className="sr-only">Önceki adres</dt><dd className="break-all">Önceki adres: {sourceUrl.replace(/^https?:\/\//, "")}</dd></>)}
                </dl>
            )}
        </aside>
    );
};

export default PageAside;
