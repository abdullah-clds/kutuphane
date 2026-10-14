import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import ContentPage from "../pages/Content/ContentPage";
import DirectoryPage from "../pages/Directory/DirectoryPage";
import AnnouncementsPage from "../pages/Announcements/AnnouncementsPage";
import AnnouncementDetail from "../pages/Announcements/AnnouncementDetail";
import LibrariesPage from "../pages/Libraries/LibrariesPage";
import ContactPage from "../pages/Contact/ContactPage";
import SearchPage from "../pages/Search/SearchPage";
import ServicePage from "../pages/Service/ServicePage";
import NotFound from "../pages/NotFound/NotFound";
import { pages } from "../lib/content";

// Directory pages (database cards) and the long-form pages come from the migrated content.
const DIRECTORY_ROUTES = [
    ["abone-olunan-veri-tabanlari", "abone"],
    ["deneme-erisimli-veri-tabanlari", "deneme"],
    ["acik-erisimli-veri-tabanlari", "acik"],
    ["e-kitaplar", "e-kitap"],
    ["e-dergiler", "e-dergi"],
    ["acik-dersler", "acik-ders"],
    ["sanal-muzeler", "sanal-muze"],
];

const SPECIAL = new Set(["/kutuphanelerimiz", "/iletisim", ...DIRECTORY_ROUTES.map(([r]) => `/${r}`)]);

const contentRoutes = pages
    .filter((p) => !p.directory && !SPECIAL.has(p.route))
    .map((p) => ({ path: p.route.slice(1), element: <ContentPage route={p.route} /> }));

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "duyurular", element: <AnnouncementsPage /> },
            { path: "duyurular/:slug", element: <AnnouncementDetail /> },
            { path: "elektronik-kaynaklar", element: <DirectoryPage type="all" /> },
            ...DIRECTORY_ROUTES.map(([path, type]) => ({ path, element: <DirectoryPage type={type} /> })),
            { path: "kutuphanelerimiz", element: <LibrariesPage /> },
            { path: "iletisim", element: <ContactPage /> },
            { path: "tarama", element: <SearchPage /> },
            { path: "arastirma/:slug", element: <ServicePage /> },
            ...contentRoutes,
            // Unknown paths: old WordPress addresses are redirected where a match exists.
            { path: "*", element: <NotFound /> },
        ],
    },
], { basename: import.meta.env.BASE_URL.replace(/\/$/, "") || "/" });

export default router;
