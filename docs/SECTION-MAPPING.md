# Capsule bölümleri → Kütüphane anasayfası

Sıra `frontend/src/pages/Home/Home.jsx`. Animasyon kodu her bölümde korunmuştur; değişiklikler ANIMATION-REGRESSION.md'de.

**Güncel tasarım (14.10.2026, kullanıcı isteği):** Giriş (preloader + kütüphane fotoğrafı slider'ı) ve sayfa geçişi Capsule'dan korunur. Geri kalan her şey Harvard Library'nin bilgi mimarisini Apple'ın görsel diliyle uygular: beyaz ve #f5f5f7 bantlar, Inter, #1d1d1f metin, #6e6e73 ikincil metin, #0a5cad vurgu, 18–28px yarıçap, "›" bağlantılar.

| # | Bölüm (dosya) | Harvard / referans karşılığı | İçerik | Kaynak |
|---|---|---|---|---|
| – | `GlobalNav` (yarı saydam üst çubuk) | Harvard üst menü + arama düğmesi; Apple globalnav flyout | 5 grup için açılır panel, Duyurular, İletişim, Katalog ↗, arama paneli (Bu sitede anlık sonuç / Katalog / Tüm kaynaklar + diğer arama araçları), mobilde tam ekran menü; "/" kısayolu | Eski menü |
| 0 | PreloaderII + Hero (Capsule) | – | Değişmedi (kart üst çubuğun altından başlar) | – |
| 1 | `IntroSearch` | Harvard "Search the library" / HOLLIS | "Aradığınızı bulun." + kapsamlı arama kutusu (`Search/SearchBox`) | Eski anasayfa formu |
| 2 | `TodayHours` | NYPL / Harvard "Hours" | 4 kütüphanenin bugünkü saati ve **şu an açık/kapalı** durumu (Genel Kurallar metninden hesaplanır, `lib/hours.js`) | Genel Kurallar |
| 3 | `Newsroom` | Harvard "Exhibitions/Events" kartları; Apple Newsroom | 6 duyuru kartı: görsel, durum etiketi, başlık, tarih | duyurular/ |
| 4 | `ResourceStats` | Harvard "Digital Collections" | Sayılarla 7 koleksiyon (bento) + Yerleşke Dışı Erişim | Dizin verisi |
| 5 | `LibrariesRail` | Apple kart şeridi | 3 kütüphane fotoğraf kartı, yerleşke, koleksiyon cümlesi, açık/kapalı | Kütüphanelerimiz |
| 6 | `Explore` | Harvard "Explore What's Possible" | Tanıtım paragrafı + 6 bağlantı satırı (tedarik, ödünç, yerleşke dışı, tez, intihal, engelsiz) | İlgili sayfalar |
| 7 | `OpenScience` | Harvard "Advancing Open Access" | Komisyon amaç cümlesi + Açık Arşiv/Açık Erişim bağlantıları | Komisyon sayfası, menü |
| 8 | `AskLibrarian` | Harvard "Ask a Librarian" | E-posta, telefon, iletişim | İletişim |
| 9 | `Footer` | Apple footer | Açık gri, küçük punto: iletişim satırı, 5 sütunlu site haritası, telif, sosyal | Footer şablonu, menü |

Kullanılmayan önceki bileşenler (depoda duruyor): Capsule Welcome, Choose, Gallery, MarqueeSticky, StickyCols, Activities, Showcase, Feedback, MapLink, FooterBanner, FooterTitle, Navbar, Logo, ReserveBtn; ayrıca `Home/SearchBand`, `NewsBoard`, `ResourceGrid`, `ResearchBand`, `Announcements/AnnouncementsSection`, `Services/ServicesStrip`.

İç sayfalar: `PageHero` beyaz zeminde breadcrumb + mavi üst başlık + büyük başlık; metin sayfalarında görsel yok, kütüphaneler/duyuru detayında geniş görsel veya poster çerçevesi. Liste ve kartlar açık paletle.

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
