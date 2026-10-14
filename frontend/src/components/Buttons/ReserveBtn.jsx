import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";
import AnimateBtn from "./AnimateBtn";

// Top-right pill of the theme, now the shortcut to catalogue and discovery search.
const ReserveBtn = () => {
    return (
        <div className="relative z-49">
            <Link to="/tarama" className="group absolute right-4 md:right-6 top-[max(1.1rem,2vw)] bg-[#f4efe7] pl-4 pr-1 py-1 flex justify-end items-center rounded-4xl gap-2 text-[#2a2725]">
                <AnimateBtn btnName="Tarama" />
                <MdArrowOutward aria-hidden="true" className="bg-[#2a2725] text-[#b3a694] w-8 h-8 md:w-[max(2rem,2.5vw)] md:h-[max(2rem,2.5vw)] rounded-full p-1 transition-transform duration-500 group-hover:rotate-45" />
            </Link>
        </div>
    )
}

export default ReserveBtn;
