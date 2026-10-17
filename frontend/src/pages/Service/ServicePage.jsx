import { useRef } from "react";
import { useParams } from "react-router-dom";
import PageHero from "../../components/Page/PageHero";
import PageLayout from "../../components/Page/PageLayout";
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
            <PageLayout>
                <Prose html={s.html} />
            </PageLayout>
        </article>
    );
};

export default ServicePage;
