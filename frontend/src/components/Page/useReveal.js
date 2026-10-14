import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Quiet entrance for text-heavy pages: elements marked [data-reveal] rise 32px and fade in once.
 * Deliberately calmer than the homepage scrubs.
 */
export default function useReveal(scope, deps = []) {
    useGSAP(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        gsap.utils.toArray("[data-reveal]", scope.current).forEach((el) => {
            gsap.from(el, {
                y: 32,
                autoAlpha: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 90%", once: true },
            });
        });
    }, { scope, dependencies: deps, revertOnUpdate: true });
}
