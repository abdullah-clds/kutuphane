import { useState } from "react";
import { Link } from "react-router-dom";
import ClickIndicator from "./ClickIndicator";

const MapLink = () => {
    const [active, setActive] = useState(false);

    return (
        <section className="w-screen h-[90vh] bg-[#181717] flex flex-col justify-center items-center text-center">
            <div>
                <p className="text-[0.7rem] font-bold text-[#a79c8d] choose-subtitle">
                    Yerleşkelerimiz
                </p>

                <h2 className="text-[max(2rem,5vw)] leading-[1.05] tracking-tight mt-5 text-[#f4efe7] px-6">
                    Kütüphanelerimiz Mustafapaşa<br className="hidden md:block" />{" "}
                    ve Ürgüp yerleşkelerimizde<br className="hidden md:block" />{" "}
                </h2>
            </div>

            <ClickIndicator active={active} label="Adresler ve iletişim" />

            <Link
                to="/iletisim"
                onMouseEnter={() => setActive(true)}
                onMouseLeave={() => setActive(false)}
                onFocus={() => setActive(false)}
                className="text-[#b1a696] text-[max(2rem,5vw)] leading-[1.05] tracking-tight underline hover:text-[#f4efe7]"
            >
                bulunmaktadır.
            </Link>
        </section>
    );
};

export default MapLink;