import { useRef } from "react";
import PageHero from "../../components/Page/PageHero";
import PageAside from "../../components/Page/PageAside";
import Prose from "../../components/Page/Prose";
import useReveal from "../../components/Page/useReveal";
import { findPage } from "../../lib/content";
import { groupOf } from "../../data/nav";

// Header photographs: all from the library's own uploads (see docs/MIGRATION-STATUS.md › Görseller).
const HERO = {
    "/genel-kurallar": ["media/site/okuma-salonu.jpg", "Kütüphane okuma salonunda çalışan öğrenciler"],
    "/tedarik-talebi": ["media/site/kutup-banner.jpg", "Kütüphane raflarında kitaplar"],
    "/engelsiz-kutuphane": ["media/site/iki-katli-salon.jpg", "İki katlı kütüphane salonu"],
    "/kutuphane-bagiscilarimiz": ["media/site/tas-kemer-raflar.jpg", "Taş kemer altında kitap rafları"],
    "/odunc-alma-ve-odunc-sartlari": ["media/site/raflar-2.jpg", "Kütüphane rafları"],
    "/tez-teslimi": ["media/site/iki-katli-salon.jpg", "İki katlı kütüphane salonu"],
    "/yayin-girisi": ["media/site/kutup-banner.jpg", "Kütüphane raflarında kitaplar"],
    "/intihal-programlari": ["media/site/okuma-salonu-genis.jpg", "Okuma salonunda dizüstü bilgisayarla çalışan öğrenciler"],
    "/acik-bilim-ve-kutuphane-komisyonu": ["media/site/tas-kemer-kare.jpg", "Taş kemerli kütüphane bölümü"],
    "/khan-academy": ["media/site/okuma-salonu.jpg", "Kütüphane okuma salonu"],
    "/yerleske-disi-erisim": ["media/site/okuma-salonu-genis.jpg", "Okuma salonunda dizüstü bilgisayarla çalışan öğrenciler"],
};

const COLUMNS = new Set(["/kutuphane-bagiscilarimiz"]);

const ContentPage = ({ route }) => {
    const page = findPage(route);
    const group = groupOf(route);
    const scope = useRef(null);
    useReveal(scope, [route]);
    const [image, alt] = HERO[route] ?? ["media/site/tas-kemer-raflar.jpg", ""];

    return (
        <article ref={scope}>
            <PageHero
                title={page.title}
                eyebrow={group?.title ?? "Kütüphane"}
                crumbs={[...(group ? [{ label: group.title, to: group.to }] : []), { label: page.title }]}
                image={image}
                imageAlt={alt}
                size="sm"
            />
            <div className="kun-wrap pb-28 grid gap-14 lg:grid-cols-12">
                <div className="lg:col-span-3">
                    <PageAside updated={page.updated} sourceUrl={page.sourceUrl} />
                </div>
                <div className="lg:col-span-8 lg:col-start-5" data-reveal>
                    <Prose html={page.html} className={COLUMNS.has(route) ? "kun-columns max-w-none" : ""} />
                </div>
            </div>
        </article>
    );
};

export default ContentPage;
