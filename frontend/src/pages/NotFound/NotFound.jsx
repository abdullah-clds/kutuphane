import { Navigate, useLocation } from "react-router-dom";
import PillLink from "../../components/Buttons/PillLink";
import { announcements, libraries } from "../../lib/content";

// Old WordPress addresses that changed (see docs/CONTENT-ISSUES.md › URL).
// Note: the old /acik-erisimli-veri-tabanlari/ was the "Açık Dersler" page; that address now
// serves the open-access database list, so it cannot be redirected.
const LEGACY = {
    "anasayfa2": "/",
    "e-kaynaklar": "/e-dergiler",
    "acik-erisimli-veri-tabanlari-2": "/acik-erisimli-veri-tabanlari",
};

const NotFound = () => {
    const { pathname } = useLocation();
    const slug = pathname.replace(/^\/+|\/+$/g, "").split("/").pop();

    if (LEGACY[slug]) return <Navigate to={LEGACY[slug]} replace />;
    if (announcements.some((a) => a.slug === slug) && !pathname.startsWith("/duyurular/")) return <Navigate to={`/duyurular/${slug}`} replace />;
    if (libraries.items.some((l) => l.slug === slug)) return <Navigate to={`/kutuphanelerimiz#${slug}`} replace />;
    if (pathname !== "/" && pathname.endsWith("/")) return <Navigate to={pathname.replace(/\/+$/, "")} replace />;

    return (
        <section className="w-full min-h-dvh p-2">
            <div className="relative w-full min-h-[calc(100dvh-1rem)] rounded-[22px] bg-[#f5f5f7] flex flex-col justify-between p-6 md:p-8 pt-28">
                <p className="text-[0.8rem] font-semibold text-[#6e6e73]">Sayfa bulunamadı</p>
                <h1 className="text-[#1d1d1f] font-bold tracking-tight leading-[0.9] text-[clamp(6rem,24vw,22rem)]">404</h1>
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <p className="text-[#424245] max-w-[30rem]">Aradığınız sayfa taşınmış ya da kaldırılmış olabilir. Menüden veya aşağıdaki bağlantılardan devam edebilirsiniz.</p>
                    <div className="flex flex-wrap gap-2">
                        <PillLink label="Anasayfa" to="/" />
                        <PillLink label="Duyurular" to="/duyurular" />
                        <PillLink label="Tarama" to="/tarama" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
