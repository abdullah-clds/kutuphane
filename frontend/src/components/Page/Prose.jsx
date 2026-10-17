import { useNavigate } from "react-router-dom";
import { withBase } from "../../lib/content";

/**
 * Renders migrated page HTML (generated at build time from our own content files).
 * Internal links are handed to the router so page transitions and the smoother keep working.
 */
const Prose = ({ html, className = "" }) => {
    const navigate = useNavigate();

    const onClick = (e) => {
        const a = e.target.closest("a");
        if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey) return;
        const base = import.meta.env.BASE_URL.replace(/\/$/, "");
        const raw = a.getAttribute("href") || "";
        const href = base && raw.startsWith(`${base}/`) ? raw.slice(base.length) : raw;
        if (href.startsWith("/") && !href.startsWith("/media/")) {
            e.preventDefault();
            navigate(href);
        }
    };

    return <div className={`kun-prose ${className}`} onClick={onClick} dangerouslySetInnerHTML={{ __html: withBase(html) }} />;
};

export default Prose;
