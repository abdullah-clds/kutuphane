import { libraries } from "./content";

/**
 * Opening hours parsed from the "Genel Kurallar" wording, e.g.
 *   "Mustafapaşa Merkez Kütüphanesi – Pazar hariç, her gün saat 09:00 – 18:00"
 *   "… – Her gün saat 09:00 – 23:59 (Pazar günü saat 10:00 – 23:59)"
 * Nothing is added: if the text changes, the schedule follows it.
 */
const TIME = /(\d{1,2}[:.]\d{2})\s*[–-]\s*(\d{1,2}[:.]\d{2})/;
const toMin = (t) => { const [h, m] = t.replace(".", ":").split(":").map(Number); return h * 60 + m; };

export function parseHours(text) {
    if (!text) return null;
    const rule = text.replace(/^.*?[–-]\s*(?=(Pazar|Her|her))/u, "");
    const main = rule.match(TIME);
    if (!main) return null;
    const sundayClosed = /pazar\s+hariç/i.test(rule);
    const sun = rule.match(/pazar\s+günü\s+saat\s+(\d{1,2}[:.]\d{2})\s*[–-]\s*(\d{1,2}[:.]\d{2})/i);
    const week = [main[1], main[2]];
    return {
        text: rule.trim(),
        // index 0 = Sunday (Date.getDay)
        days: [sundayClosed ? null : sun ? [sun[1], sun[2]] : week, week, week, week, week, week, week],
    };
}

export function statusNow(schedule, now = new Date()) {
    if (!schedule) return null;
    const today = schedule.days[now.getDay()];
    const mins = now.getHours() * 60 + now.getMinutes();
    if (today && mins >= toMin(today[0]) && mins < toMin(today[1])) return { open: true, label: `Açık · kapanış ${today[1]}`, today };
    if (today && mins < toMin(today[0])) return { open: false, label: `Kapalı · açılış ${today[0]}`, today };
    for (let i = 1; i <= 7; i++) {
        const d = schedule.days[(now.getDay() + i) % 7];
        if (d) return { open: false, label: `Kapalı · ${i === 1 ? "yarın" : "sonraki açılış"} ${d[0]}`, today };
    }
    return { open: false, label: "Kapalı", today };
}

const CAMPUS = { "Merkez Kütüphane": "Mustafapaşa", "Sosyal Bilimler Kütüphanesi": "Mustafapaşa", "Fen Bilimleri Kütüphanesi": "Ürgüp" };

export const LIBRARY_HOURS = [
    ...libraries.items.map((l) => ({ name: l.name, slug: l.slug, campus: CAMPUS[l.name], schedule: parseHours(l.hours) })),
    ...libraries.otherHours.map((h) => ({ name: h.split(/\s*[–-]\s*/)[0].trim(), slug: null, campus: "Ürgüp", schedule: parseHours(h) })),
];
