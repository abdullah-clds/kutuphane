import { MdArrowOutward } from "react-icons/md";
import AnimateBtn from "./AnimateBtn";
import SmartLink from "./SmartLink";

// The theme's cream pill with the dark arrow disc (from ReserveBtn), as a real link.
const PillLink = ({ label, to, href, dark = false, className = "" }) => (
    <SmartLink
        to={to}
        href={href}
        className={`group inline-flex items-center gap-2 rounded-4xl p-1 pl-4 ${dark ? "bg-[#2a2725] text-[#f4efe7]" : "bg-[#f4efe7] text-[#2a2725]"} ${className}`}
    >
        <AnimateBtn btnName={label} />
        <MdArrowOutward
            aria-hidden="true"
            className={`w-8 h-8 rounded-full p-1.5 transition-transform duration-500 group-hover:rotate-45 ${dark ? "bg-[#f4efe7] text-[#2a2725]" : "bg-[#2a2725] text-[#b3a694]"}`}
        />
    </SmartLink>
);

export default PillLink;
