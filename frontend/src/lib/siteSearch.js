import { announcements, pages, services, visibleDatabases, DIRECTORY_SHORT, DIRECTORY_ROUTES, formatDate } from "./content";
import { NAV_GROUPS } from "../data/nav";

// One flat index over everything on the site: pages, announcements, resources, services, menu links.
const norm = (s) => (s || "").toLocaleLowerCase("tr").normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/ı/g, "i");

const INDEX = [
    ...pages.map((p) => ({ kind: "Sayfa", title: p.title, to: p.route, hay: norm(`${p.title} ${p.text}`) })),
    ...services.map((s) => ({ kind: "Hizmet", title: s.title, to: `/arastirma/${s.slug}`, hay: norm(`${s.title} ${s.text}`) })),
    ...visibleDatabases.map((d) => ({ kind: DIRECTORY_SHORT[d.type], title: d.name, to: `${DIRECTORY_ROUTES[d.type]}#${d.id}`, hay: norm(`${d.name} ${d.description}`) })),
    ...announcements.map((a) => ({ kind: "Duyuru", title: a.title, meta: formatDate(a.date), to: `/duyurular/${a.slug}`, hay: norm(`${a.title} ${a.excerpt}`) })),
    ...NAV_GROUPS.flatMap((g) => g.items.filter((i) => i.href).map((i) => ({ kind: g.title, title: i.label, href: i.href, hay: norm(i.label) }))),
];

export function searchSite(query, limit = 8) {
    const q = norm(query.trim());
    if (q.length < 2) return [];
    const words = q.split(/\s+/);
    return INDEX
        .map((item) => {
            const t = norm(item.title);
            if (!words.every((w) => item.hay.includes(w) || t.includes(w))) return null;
            const score = (t.startsWith(q) ? 4 : 0) + (t.includes(q) ? 2 : 0) + (item.kind === "Sayfa" ? 1 : 0);
            return { ...item, score };
        })
        .filter(Boolean)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
}
