# Capsule bölümleri → Kütüphane anasayfası

Sıra `frontend/src/pages/Home/Home.jsx`. Animasyon kodu her bölümde korunmuştur; değişiklikler ANIMATION-REGRESSION.md'de.

**Güncel düzen (14.10.2026, kullanıcı kararı):** Tema korunur: koyu Capsule zemini, preloader, hero slider'ı, alttaki "Menü" hapı + logo + "Tarama" düğmesi, Gallery (Kütüphanelerimiz), Capsule footer'ı ve sayfa geçişi. Yalnızca diğer anasayfa bölümlerinin **yapısı** Harvard Library'den uyarlandı; görünümleri temanın kendi dilinde (krem hap düğme ve arama, taş renkli çerçeve etiketler, #2a2725 kartlar, Barlow). Açık zeminli "Apple" denemesi ve üst çubuk menü kullanıcı tarafından reddedildi ve geri alındı.

| # | Bölüm | Harvard karşılığı | İçerik |
|---|---|---|---|
| 0 | PreloaderII + Hero (tema) | – | Değişmedi |
| 1 | `Home/Sections › IntroSearch` | "Search the library" | "Aradığınızı bulun." + Tüm kaynaklar / Katalog / Bu sitede araması (`Search/SearchBox`, site içi anlık sonuç) |
| 2 | `Newsroom` | Exhibitions/Events kartları | 6 duyuru kartı (krem poster alanı, durum, başlık, tarih) |
| 3 | `TodayHours` | Hours | 4 kütüphane: bugünkü saat ve şu an açık/kapalı (Genel Kurallar metninden, `lib/hours.js`) |
| 4 | Gallery (tema) | – | Kütüphanelerimiz PIN'li fotoğraf sahnesi, değişmedi |
| 5 | `ResourceStats` | Digital Collections | Sayılarla 7 koleksiyon + Yerleşke Dışı Erişim |
| 6 | `Explore` | Explore What's Possible | Tanıtım paragrafı + 6 bağlantı satırı |
| 7 | `AskLibrarian` | Ask a Librarian | E-posta, telefon, iletişim |
| – | Footer + FooterTitle (tema) | – | Değişmedi |

Kullanılmayan bileşenler (depoda): `GlobalNav`, `Sections › LibrariesRail/OpenScience`, önceki `Home/*Band`, `NewsBoard`, `ResourceGrid`, `AnnouncementsSection`, `ServicesStrip`, Capsule Welcome/Choose/MarqueeSticky/StickyCols/Activities/Showcase/Feedback/MapLink/FooterBanner.

## İç sayfa şablonları (Capsule'dan türetilmiş)

| Şablon | Bileşen | Capsule kaynağı |
|---|---|---|
| Kurumsal metin (kurallar, yönerge, süreç) | `pages/Content/ContentPage` | Hero kartı (`PageHero`) + sol menü sütunu + okunur uzun metin |
| Duyuru arşivi | `pages/Announcements/AnnouncementsPage` | Footer çizgi dili, hap filtreler, `ClickIndicator` imleç göstergesi |
| Duyuru detayı | `pages/Announcements/AnnouncementDetail` | PageHero (poster sağda), Showcase kartlarından önceki/sonraki |
| Veri tabanı dizini | `pages/Directory/DirectoryPage` + `DatabaseRow` | Hap etiketler, krem hap + koyu ok düğmesi |
| Kütüphane bilgisi | `pages/Libraries/LibrariesPage` | StickyCols kart dili, FooterBanner ölçek scrub'ı |
| Akademik hizmet | `pages/Service/ServicePage` | PageHero (logo için "contain") |
| İletişim | `pages/Contact/ContactPage` | Kart ve çizgi dili |
| Tarama | `pages/Search/SearchPage` | Choose bölümü dili |
| 404 / eski adres | `pages/NotFound/NotFound` | Hero kartı |
