import announcements from "../data/announcements.json";
import databases from "../data/databases.json";
import pages from "../data/pages.json";
import services from "../data/services.json";
import libraries from "../data/libraries.json";

export { announcements, databases, pages, services, libraries };

// Media paths in the data are relative ("media/2026/10/x.png"); the HTML bodies use "/media/...".
export const media = (p) => {
    if (!p) return null;
    if (/^(https?:)?\/\//.test(p) || p.startsWith("data:")) return p;
    return import.meta.env.BASE_URL + p.replace(/^\//, "");
};

const pad = (n) => String(n).padStart(2, "0");

// Local calendar date, so a trial ending "15 Kasım" stays active all of 15 Kasım in Türkiye.
export const todayIso = () => {
    const d = new Date();
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const toDate = (iso) => new Date(`${iso}T12:00:00`);

export const daysBetween = (a, b) => Math.round((toDate(b) - toDate(a)) / 86400000);

const fmtLong = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" });
const fmtShort = new Intl.DateTimeFormat("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric" });

export const formatDate = (iso) => (iso ? fmtLong.format(toDate(iso)) : "");
export const formatDateShort = (iso) => (iso ? fmtShort.format(toDate(iso)) : "");

/**
 * Trial status from the end date found in the source text.
 * active  – end date is today or later
 * expired – end date has passed
 * archive – no end date in the source and the record is over a year old
 * unknown – no end date in the source
 */
export function trialStatus(end, published) {
    const today = todayIso();
    if (end) return end >= today ? "active" : "expired";
    if (published && daysBetween(published, today) > 365) return "archive";
    return "unknown";
}

export const daysLeft = (end) => daysBetween(todayIso(), end);

export function trialLabel(status, end) {
    if (status === "active") {
        const d = daysLeft(end);
        return d === 0 ? "Deneme erişimi bugün sona eriyor" : `Deneme erişimi · ${d} gün kaldı`;
    }
    if (status === "expired") return "Deneme süresi sona erdi";
    if (status === "archive") return "Arşiv · bitiş tarihi belirtilmemiş";
    return "Deneme erişimi · bitiş tarihi belirtilmemiş";
}

export const announcementStatus = (a) => (a.isTrial ? trialStatus(a.trialEnd, a.date) : null);

export const findAnnouncement = (slug) => announcements.find((a) => a.slug === slug);
export const findPage = (route) => pages.find((p) => p.route === route);

export const DIRECTORY_LABELS = {
    abone: "Abone Olunan Veri Tabanları",
    deneme: "Deneme Erişimli Veri Tabanları",
    acik: "Açık Erişimli Veri Tabanları",
    "e-kitap": "E-Kitaplar",
    "e-dergi": "E-Dergiler",
    "acik-ders": "Açık Dersler",
    "sanal-muze": "Sanal Müzeler",
};

export const DIRECTORY_SHORT = {
    abone: "Abone",
    deneme: "Deneme erişimi",
    acik: "Açık erişim",
    "e-kitap": "E-kitap",
    "e-dergi": "E-dergi",
    "acik-ders": "Açık ders",
    "sanal-muze": "Sanal müze",
};

export const DIRECTORY_ROUTES = {
    abone: "/abone-olunan-veri-tabanlari",
    deneme: "/deneme-erisimli-veri-tabanlari",
    acik: "/acik-erisimli-veri-tabanlari",
    "e-kitap": "/e-kitaplar",
    "e-dergi": "/e-dergiler",
    "acik-ders": "/acik-dersler",
    "sanal-muze": "/sanal-muzeler",
};

// Records shown in listings: one entry per resource (source duplicates are kept in the data, flagged).
export const visibleDatabases = databases.filter((d) => !d.duplicateOf);

export const countByType = (type) => visibleDatabases.filter((d) => d.type === type).length;

export function activeTrials() {
    return visibleDatabases
        .filter((d) => d.type === "deneme" && trialStatus(d.trialEnd) === "active")
        .sort((a, b) => a.trialEnd.localeCompare(b.trialEnd));
}

// First sentence for display slots that cannot hold a long official text; the full text is linked.
export function leadSentence(text, max = 220) {
    if (text.length <= max) return text;
    const m = text.match(/^.+?[.!?](\s|$)/);
    return m ? m[0].trim() : text.slice(0, text.lastIndexOf(" ", max)) + "…";
}

export const SEARCH = {
    ebsco: {
        label: "Tüm Kaynaklarda Tarama",
        short: "Tüm kaynaklar",
        system: "EBSCO Discovery",
        action: "https://research.ebsco.com/c/qenzep/results",
        home: "https://research.ebsco.com/c/qenzep/search",
        placeholder: "Tüm kaynaklarda arayın...",
        // Same hidden fields as the form on the previous homepage.
        hidden: { limiters: "FT1:Y", autocorrect: "y", searchMode: "enhanced" },
        text: "Kütüphanemizin tüm dijital ve basılı kaynakları arasında kapsamlı bir arama yaparak ihtiyacınız olan bilgiye hızla ulaşın.",
    },
    koha: {
        label: "Katalog Tarama",
        short: "Katalog",
        system: "KOHA",
        action: "https://katalog.kapadokya.edu.tr/cgi-bin/koha/opac-search.pl",
        home: "https://katalog.kapadokya.edu.tr/cgi-bin/koha/opac-main.pl",
        placeholder: "Katalogda arayın...",
        hidden: {},
        text: "Kütüphane kaynaklarımız arasında hızlı ve kolay arama yaparak kitap, makale ve diğer materyalleri bulun.",
    },
};

// The eight quick links of the previous homepage, in their original order.
export const QUICK_LINKS = [
    { label: "Katalog Tarama", href: SEARCH.koha.home },
    { label: "Tüm Kaynaklarda Tarama", href: SEARCH.ebsco.home },
    { label: "Kurumsal Açık Arşiv", href: "https://acikerisim.kapadokya.edu.tr/xmlui/" },
    { label: "JSTOR", href: "https://www.jstor.org/" },
    { label: "KÜN Kitapları", href: "https://kapadokyayayinlari.kapadokya.edu.tr/" },
    { label: "KÜN Dergileri", href: "https://kapadokyayayinlari.kapadokya.edu.tr/dergiler/" },
    { label: "İntihal Programları", to: "/intihal-programlari" },
    { label: "Yerleşke Dışı Erişim", to: "/yerleske-disi-erisim" },
];

export const CONTACT = {
    unit: "Kütüphane ve Dokümantasyon Daire Başkanlığı",
    email: "kutuphane@kapadokya.edu.tr",
    universityEmail: "info@kapadokya.edu.tr",
    phone: "(384) 353 5009 pbx",
    phoneHref: "+903843535009",
    fax: "(384) 353 5125",
    footerAddress: ["Kapadokya Yerleşkesi", "Mustafapaşa, 50420 Ürgüp / Nevşehir"],
    social: [
        { label: "Instagram", href: "https://www.instagram.com/kapadokyauniversitesi/" },
        { label: "Facebook", href: "https://www.facebook.com/KapadokyaUniversitesi" },
        { label: "YouTube", href: "https://www.youtube.com/Kapadokya%C3%9Cniversitesi" },
        { label: "LinkedIn", href: "https://www.linkedin.com/school/kapadokya-universitesi/" },
        { label: "X (Twitter)", href: "https://x.com/KapadokyaUniv" },
    ],
};
