import { Outlet, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar/Navbar";
import { useEffect, useLayoutEffect, useRef } from "react";
import PreloaderII from "../components/Preloader/PreloaderII";
import ReserveBtn from "../components/Buttons/ReserveBtn";
import Logo from "../components/Buttons/Logo";
import Footer from "../components/Footer/Footer";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Development only: handles for browser-based regression checks (docs/ANIMATION-REGRESSION.md).
// __pump/__go drive GSAP in a background (hidden) test tab where requestAnimationFrame is paused.
if (import.meta.env.DEV) {
    window.__kun = { gsap, ScrollTrigger, ScrollSmoother };
    window.__pump = (ms) => new Promise((res) => {
        const ch = new MessageChannel();
        const end = performance.now() + ms;
        let last = 0;
        ch.port1.onmessage = () => {
            const now = performance.now();
            if (now - last >= 16) { gsap.ticker.tick(); last = now; }
            if (now < end) ch.port2.postMessage(0); else res();
        };
        ch.port2.postMessage(0);
    });
    window.__go = async (y, ms = 2200) => {
        window.scrollTo({ top: y, behavior: "instant" });
        gsap.ticker.tick();
        window.dispatchEvent(new Event("scroll"));
        await window.__pump(50);
        window.dispatchEvent(new Event("scroll"));
        ScrollTrigger.update();
        await window.__pump(ms);
        return Math.round(ScrollSmoother.get()?.scrollTop() ?? window.scrollY);
    };
}

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const MainLayout = () => {
    const { pathname, hash } = useLocation();
    const outletRef = useRef(null);
    const firstRender = useRef(true);

    useGSAP(() => {
        ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            // Original values; smoothing is switched off for visitors who ask for reduced motion.
            smooth: reduceMotion() ? 0 : 1.5,
            effects: true,
        });
    });

    // Route change: new page starts at the top, then every trigger is re-measured in page order.
    useLayoutEffect(() => {
        const smoother = ScrollSmoother.get();
        // Instant: the theme sets `html { scroll-behavior: smooth }`, which would otherwise
        // animate the new page up from the previous scroll position.
        if (!hash) {
            window.scrollTo({ top: 0, behavior: "instant" });
            smoother?.scrollTop(0);
        }
        const id = requestAnimationFrame(() => {
            ScrollTrigger.refresh();
            ScrollTrigger.sort();
            if (hash) {
                const target = document.getElementById(decodeURIComponent(hash.slice(1)));
                if (target) smoother ? smoother.scrollTo(target, false, "top 80px") : target.scrollIntoView();
            }
        });
        return () => cancelAnimationFrame(id);
    }, [pathname, hash]);

    // Page entrance for route changes (the first load is handled by the preloader).
    useGSAP(() => {
        if (firstRender.current) { firstRender.current = false; return; }
        if (reduceMotion()) return;
        // Opacity only: a transform here would offset the trigger measurements of the new page.
        gsap.fromTo(outletRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8, ease: "power2.out" });
    }, { dependencies: [pathname] });

    // Any section that changes size after the triggers were measured (responsive line sets,
    // late fonts, filtered lists) would leave the pins below it misplaced: re-measure, debounced.
    useEffect(() => {
        let t;
        const refresh = () => { clearTimeout(t); t = setTimeout(() => ScrollTrigger.refresh(), 150); };
        const sizes = new WeakMap();
        const ro = new ResizeObserver((entries) => {
            let changed = false;
            for (const e of entries) {
                const h = Math.round(e.contentRect.height);
                if (sizes.has(e.target) && sizes.get(e.target) !== h) changed = true;
                sizes.set(e.target, h);
            }
            if (changed) refresh();
        });
        const sections = document.querySelectorAll("#icerik > div > div > *, #icerik > footer");
        sections.forEach((s) => ro.observe(s));
        document.fonts?.ready.then(refresh);
        return () => { ro.disconnect(); clearTimeout(t); };
    }, [pathname]);

    // Late-loading images change section heights; re-measure the scroll triggers once they settle.
    useEffect(() => {
        let t;
        const onLoad = (e) => {
            if (e.target.tagName !== "IMG") return;
            clearTimeout(t);
            t = setTimeout(() => ScrollTrigger.refresh(), 200);
        };
        document.addEventListener("load", onLoad, true);
        return () => { document.removeEventListener("load", onLoad, true); clearTimeout(t); };
    }, []);

    return (
        <>
            <a href="#icerik" className="sr-only-focusable fixed top-3 left-3 z-[60] bg-[#f4efe7] text-[#2a2725] px-4 py-2 rounded-4xl text-sm">İçeriğe geç</a>
            <PreloaderII />
            <Logo />
            <ReserveBtn />
            <Navbar />
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <main id="icerik">
                        <div ref={outletRef} key={pathname}>
                            <Outlet />
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default MainLayout;
