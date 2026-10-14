// Site navigation. Labels are the original menu labels of kutuphane.kapadokya.edu.tr.
// `to` = internal route, `href` = external address (opens in a new tab).
const PDF = {
    yonerge: "https://acikerisim.kapadokya.edu.tr/xmlui/bitstream/handle/20.500.12695/2540/YNG.037.K%c3%9cT%c3%9cPHANE-%c3%87ALI%c5%9eMA-ESASLARI-Y%c3%96NERGES%c4%b0%28Rev1%29.pdf?sequence=1&isAllowed=y",
    politika: "https://acikerisim.kapadokya.edu.tr/xmlui/bitstream/handle/20.500.12695/2484/K%c3%9cN.PB.008.A%c3%87IK-B%c4%b0L%c4%b0M-VE-A%c3%87IK-ER%c4%b0%c5%9e%c4%b0M-POL%c4%b0T%c4%b0KA-BELGES%c4%b0%28Rev1%29.pdf?sequence=1&isAllowed=y",
    acikErisimYonergesi: "https://acikerisim.kapadokya.edu.tr/xmlui/bitstream/handle/20.500.12695/2541/YNG.038.A%c3%87IK-ER%c4%b0%c5%9e%c4%b0M-VE-KURUMSAL-AR%c5%9e%c4%b0V-Y%c3%96NERGES%c4%b0.pdf?sequence=1&isAllowed=y",
};

export const NAV_GROUPS = [
    {
        title: "Kütüphane Hakkında",
        items: [
            { label: "Genel Kurallar", to: "/genel-kurallar" },
            { label: "Tedarik Talebi", to: "/tedarik-talebi" },
            { label: "Kütüphanelerimiz", to: "/kutuphanelerimiz" },
            { label: "Engelsiz Kütüphane", to: "/engelsiz-kutuphane" },
            { label: "Kütüphane Yönergesi", href: PDF.yonerge, doc: true },
            { label: "Kütüphane Bağışçılarımız", to: "/kutuphane-bagiscilarimiz" },
            { label: "Ödünç Alma ve Ödünç Şartları", to: "/odunc-alma-ve-odunc-sartlari" },
        ],
    },
    {
        title: "Elektronik Kaynaklar",
        to: "/elektronik-kaynaklar",
        items: [
            { label: "Abone Olunan Veri Tabanları", to: "/abone-olunan-veri-tabanlari" },
            { label: "Deneme Erişimli Veri Tabanları", to: "/deneme-erisimli-veri-tabanlari" },
            { label: "Açık Erişimli Veri Tabanları", to: "/acik-erisimli-veri-tabanlari" },
            { label: "E-Kitaplar", to: "/e-kitaplar" },
            { label: "E-Dergiler", to: "/e-dergiler" },
            { label: "Yerleşke Dışı Erişim", to: "/yerleske-disi-erisim" },
            { label: "Açık Dersler", to: "/acik-dersler" },
            { label: "Sanal Müzeler", to: "/sanal-muzeler" },
            { label: "Khan Academy", to: "/khan-academy" },
        ],
    },
    {
        title: "Açık Arşiv",
        items: [
            { label: "Tez Teslimi", to: "/tez-teslimi" },
            { label: "Yayın Girişi", to: "/yayin-girisi" },
            { label: "Kurumsal Açık Arşiv", href: "https://acikerisim.kapadokya.edu.tr/xmlui/" },
            { label: "KÜN Dergileri", href: "https://kapadokyayayinlari.kapadokya.edu.tr/dergiler/" },
            { label: "KÜN Yayınları", href: "https://kapadokyayayinlari.kapadokya.edu.tr/" },
            { label: "İntihal Programları", to: "/intihal-programlari" },
        ],
    },
    {
        title: "Açık Erişim",
        items: [
            { label: "Açık Erişim Politikası", href: PDF.politika, doc: true },
            { label: "Açık Bilim ve Kütüphane Komisyonu", to: "/acik-bilim-ve-kutuphane-komisyonu" },
            { label: "Açık Erişim ve Açık Arşiv Yönergesi", href: PDF.acikErisimYonergesi, doc: true },
        ],
    },
    {
        title: "Araştırma",
        to: "/tarama",
        items: [
            { label: "Katalog Tarama", href: "https://katalog.kapadokya.edu.tr/cgi-bin/koha/opac-main.pl" },
            { label: "Tüm Kaynaklarda Tarama", href: "https://research.ebsco.com/c/qenzep/search" },
            { label: "Toplu Katalog", to: "/arastirma/toplu-katalog" },
            { label: "ANKOS", to: "/arastirma/ankos" },
            { label: "KAŞİF", to: "/arastirma/kasif" },
            { label: "Kütüphaneler Arası Ödünç Verme Sistemi", to: "/arastirma/kutuphaneler-arasi-odunc-verme-sistemi" },
        ],
    },
];

export const NAV_PRIMARY = [
    { label: "Anasayfa", to: "/" },
    { label: "Duyurular", to: "/duyurular" },
    { label: "Tarama", to: "/tarama" },
    { label: "İletişim", to: "/iletisim" },
];

// Group that contains a route, for breadcrumbs and sibling navigation on inner pages.
export function groupOf(route) {
    return NAV_GROUPS.find((g) => g.to === route || g.items.some((i) => i.to === route)) ?? null;
}
