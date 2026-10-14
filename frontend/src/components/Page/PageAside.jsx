import { useLocation } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import SmartLink from "../Buttons/SmartLink";
import { groupOf } from "../../data/nav";
import { formatDate } from "../../lib/content";

/** Left column of inner pages: the section's other pages and page metadata. */
const PageAside = ({ updated, sourceUrl, children }) => {
    const { pathname } = useLocation();
    const group = groupOf(pathname);

    return (
        <aside className="flex flex-col gap-10 text-[0.9rem]" data-reveal>
            {group && (
                <nav aria-label={group.title}>
                    <p className="text-[0.8rem] font-semibold text-[#1d1d1f]">{group.title}</p>
                    <ul className="mt-3 flex flex-col">
                        {group.items.map((item) => {
                            const current = item.to === pathname;
                            return (
                                <li key={item.label}>
                                    <SmartLink
                                        to={item.to}
                                        href={item.href}
                                        aria-current={current ? "page" : undefined}
                                        className={`flex items-center justify-between gap-3 py-1.5 transition-colors ${current ? "text-[#1d1d1f] font-semibold" : "text-[#6e6e73] hover:text-[#1d1d1f]"}`}
                                    >
                                        <span>{item.label}</span>
                                        {item.href && <MdArrowOutward aria-hidden="true" className="shrink-0 text-[0.8rem] opacity-60" />}
                                    </SmartLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            )}
            {children}
            {(updated || sourceUrl) && (
                <dl className="text-[0.75rem] text-[#86868b] flex flex-col gap-1 border-t border-[#d2d2d7] pt-4">
                    {updated && (<><dt className="sr-only">Son güncelleme</dt><dd>Son güncelleme: {formatDate(updated)}</dd></>)}
                    {sourceUrl && (<><dt className="sr-only">Önceki adres</dt><dd className="break-all">Önceki adres: {sourceUrl.replace(/^https?:\/\//, "")}</dd></>)}
                </dl>
            )}
        </aside>
    );
};

export default PageAside;
