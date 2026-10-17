import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import AnimateBtn from "../Buttons/AnimateBtn";
import SearchBox from "../Search/SearchBox";
import SmartLink from "../Buttons/SmartLink";
import { NAV_GROUPS, NAV_PRIMARY } from "../../data/nav";
import { media } from "../../lib/content";

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);
  const tlRef = useRef(null);
  const { pathname } = useLocation();

  // Panel grows out of the pill: clip-path from the bottom edge, lines rise like the preloader footer.
  useGSAP(() => {
    gsap.set(panelRef.current, { autoAlpha: 0, clipPath: "inset(100% 0% 0% 0% round 2.5rem)" });
    tlRef.current = gsap.timeline({ paused: true })
      .to(panelRef.current, { autoAlpha: 1, duration: 0.01 })
      .to(panelRef.current, { clipPath: "inset(0% 0% 0% 0% round 2.5rem)", duration: 0.9, ease: "power4.inOut" }, "<")
      .from(panelRef.current.querySelectorAll(".kun-mask > span"), { yPercent: 110, stagger: 0.012, duration: 0.7, ease: "power4.out" }, "-=0.45");
  }, []);

  useEffect(() => {
    const tl = tlRef.current;
    const smoother = ScrollSmoother.get();
    if (open) {
      smoother?.paused(true);
      reduceMotion() ? tl.progress(1) : tl.timeScale(1).play();
      const first = panelRef.current.querySelector("input[type=search]") || panelRef.current.querySelector("a");
      setTimeout(() => first?.focus({ preventScroll: true }), reduceMotion() ? 0 : 450);
    } else {
      smoother?.paused(false);
      reduceMotion() ? tl.progress(0) : tl.timeScale(1.6).reverse();
    }
  }, [open]);

  // Any navigation closes the menu.
  useEffect(() => { setOpen(false); }, [pathname]);

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
      buttonRef.current?.focus();
    }
    if (e.key === "Tab") {
      const focusables = [...panelRef.current.querySelectorAll("a, button, input:not([type=hidden])")];
      focusables.push(buttonRef.current);
      const i = focusables.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); focusables.at(-1).focus(); }
      else if (!e.shiftKey && i === focusables.length - 1) { e.preventDefault(); focusables[0].focus(); }
    }
  };

  return (
    <div onKeyDown={open ? onKeyDown : undefined}>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[48] bg-[#181717]/60 backdrop-blur-[2px] transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      <nav
        id="site-menu"
        ref={panelRef}
        aria-label="Site menüsü"
        className="fixed z-[49] left-1/2 -translate-x-1/2 bottom-[4.75rem] w-[calc(100vw-1rem)] max-w-[78rem] max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain bg-[#f4efe7] text-[#2a2725] rounded-[2.5rem] invisible"
        data-lenis-prevent
      >
        <div className="p-6 md:p-10">
          <div className="border-b border-[#2a2725]/15 pb-6 mb-6">
            <p className="text-[.7rem] font-bold uppercase tracking-[0.12em] text-[#8a7f70] mb-3">Kaynak tarama</p>
            <div className="max-w-[44rem]"><SearchBox size="md" tone="light" /></div>
          </div>
          <div className="flex items-start justify-between gap-6 border-b border-[#2a2725]/15 pb-6">
            <ul className="flex flex-wrap gap-x-8 gap-y-1">
              {NAV_PRIMARY.map((item) => (
                <li key={item.to}>
                  <span className="kun-mask">
                    <span>
                      <SmartLink to={item.to} className={`text-3xl md:text-5xl font-medium tracking-tight hover:text-[#8a7f70] transition-colors ${pathname === item.to ? "underline decoration-1 underline-offset-8" : ""}`}>
                        {item.label}
                      </SmartLink>
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <img src={media("media/site/kapadokya-amblem.png")} alt="" className="hidden md:block w-14 h-14 opacity-90" />
          </div>

          <div className="grid gap-x-8 gap-y-10 pt-8 sm:grid-cols-2 lg:grid-cols-5">
            {NAV_GROUPS.map((group) => (
              <div key={group.title}>
                <p className="kun-mask text-[.7rem] font-bold uppercase tracking-[0.12em] text-[#8a7f70] mb-4">
                  <span>
                    {group.to ? <SmartLink to={group.to} className="hover:text-[#2a2725]">{group.title}</SmartLink> : group.title}
                  </span>
                </p>
                <ul className="flex flex-col gap-2">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <span className="kun-mask">
                        <span>
                          <SmartLink
                            to={item.to}
                            href={item.href}
                            aria-current={pathname === item.to ? "page" : undefined}
                            className="group inline-flex items-start gap-1 text-[1.05rem] leading-snug hover:text-[#8a7f70] transition-colors aria-[current=page]:underline underline-offset-4"
                          >
                            {item.label}
                            {item.href && <MdArrowOutward aria-hidden="true" className="mt-1 shrink-0 text-[0.8rem] opacity-60" />}
                          </SmartLink>
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </nav>

      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 w-fit h-10 p-1 flex items-center justify-end gap-2 bg-[#f4efe7] rounded-4xl z-50 cursor-pointer group transition-all duration-500 shadow-[0_6px_24px_rgba(0,0,0,0.25)]"
      >
        <span className="pl-4 text-[#2a2725]">
          <AnimateBtn btnName={open ? "Kapat" : "Menü"} />
        </span>
        <span className="bg-[#2a2725] rounded-full p-2">
          {open
            ? <IoMdClose aria-hidden="true" className="text-[#b1a696] transition-transform duration-500 group-hover:rotate-[360deg]" />
            : <IoMdMenu aria-hidden="true" className="text-[#b1a696] transition-transform duration-500 group-hover:rotate-[360deg]" />}
        </span>
      </button>
    </div>
  );
};

export default Navbar;
