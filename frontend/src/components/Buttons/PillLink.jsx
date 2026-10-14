import { MdArrowOutward, MdChevronRight } from "react-icons/md";
import SmartLink from "./SmartLink";

// Apple-style pill button: filled accent by default, quiet grey with `dark` (kept prop name).
const PillLink = ({ label, to, href, dark = false, className = "" }) => (
    <SmartLink to={to} href={href} className={`kun-btn ${dark ? "kun-btn-quiet" : ""} ${className}`}>
        {label}
        {href && /^https?:/.test(href)
            ? <MdArrowOutward aria-hidden="true" className="text-[0.95em]" />
            : <MdChevronRight aria-hidden="true" className="text-[1.15em] -mr-1" />}
    </SmartLink>
);

export default PillLink;
