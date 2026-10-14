import { useRef } from "react";
import { useParams } from "react-router-dom";
import PageHero from "../../components/Page/PageHero";
import PageAside from "../../components/Page/PageAside";
import Prose from "../../components/Page/Prose";
import useReveal from "../../components/Page/useReveal";
import NotFound from "../NotFound/NotFound";
import { services } from "../../lib/content";

// Small logos are shown whole; photographs fill the header.
const CONTAIN = new Set(["kasif", "ankos"]);

const ServicePage = () => {
    const { slug } = useParams();
    const scope = useRef(null);
    useReveal(scope, [slug]);
    const s = services.find((x) => x.slug === slug);
    if (!s) return <NotFound />;

    return (
        <article ref={scope}>
            <PageHero
                title={s.title}
                eyebrow="Araştırma"
                crumbs={[{ label: "Araştırma", to: "/tarama" }, { label: s.title }]}
                image={s.image ?? "media/site/kutup-banner.jpg"}
                imageAlt=""
                contain={CONTAIN.has(slug)}
                size="sm"
                aside={<>Araştırma hizmeti</>}
            />
            <div className="px-6 md:px-8 pb-28 grid gap-14 lg:grid-cols-12">
                <div className="lg:col-span-3"><PageAside /></div>
                <div className="lg:col-span-8 lg:col-start-5" data-reveal>
                    <Prose html={s.html} className="text-[1.35rem]" />
                </div>
            </div>
        </article>
    );
};

export default ServicePage;
