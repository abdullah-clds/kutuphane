# Capsule bölümleri → Kütüphane anasayfası

Sıra `frontend/src/pages/Home/Home.jsx`. Animasyon kodu her bölümde korunmuştur; değişiklikler ANIMATION-REGRESSION.md'de.

Anasayfa 14.10.2026'da kullanıcı isteğiyle **kurumsal kütüphane** düzenine çevrildi ("ajans/otel gibi" görünmemesi için). Korunanlar: preloader, sayfa geçişi, Hero (kütüphane fotoğrafları slider'ı), Gallery (kütüphane fotoğrafları), menü.

| # | Bölüm (dosya) | İçerik | Kaynak |
|---|---|---|---|
| 0 | PreloaderII | "Kütüphane" + slogan; **zamanlama aynen** | Eski anasayfa |
| 1 | Hero (Capsule) | 5 görsellik kütüphane fotoğrafı slider'ı, kaydırma ölçek/parallax ve duman katmanı korunuyor | uploads 2024/08, gorseller/ |
| 2 | `Home/SearchBand` (açık panel) | KOHA / EBSCO sekmeli arama (özgün form alanları) + 8 ikonlu hızlı erişim | Eski anasayfa arama formu ve ikonları |
| 3 | `Home/NewsBoard` | Gün/ay tarih kutulu son 7 duyuru (telefonda 4); yan sütunda deneme erişimindeki kaynaklar (kalan gün) ve 4 kütüphanenin çalışma saatleri | duyurular/, deneme sayfası, Genel Kurallar |
| 4 | `Home/ResourceGrid` | 7 elektronik kaynak koleksiyonu kutucuğu (kayıt sayısıyla) + Yerleşke Dışı Erişim | Dizin verisi |
| 5 | Gallery (Capsule, koyu) | Kütüphanelerimiz: PIN'li 3 fotoğraf slaytı; telefonda kartlar | kutuphanelerimiz.md |
| 6 | `Home/ResearchBand` (açık panel) | 4 araştırma hizmeti + Açık Arşiv / Açık Erişim bağlantı listeleri | hizmetler/, menü |
| 7 | Footer (kurumsal, lacivert #002856) | Logo, birim, adres/telefon/faks/e-posta; 4 sütunlu site haritası; telif satırı, kapadokya.edu.tr, sosyal medya | sablonlar/footer.md, menü |

Anasayfada artık kullanılmayan Capsule bölümleri (dosyaları depoda duruyor): Welcome, Choose, MarqueeSticky/MarqueeText, StickyCols, Activities, Showcase, Feedback, MapLink, FooterBanner, FooterTitle, ayrıca önceki `Announcements/AnnouncementsSection` ve `Services/ServicesStrip`. Anasayfa yüksekliği masaüstünde ~6.700px.

Renkler: açık paneller `#f6f3ee`, başlık/vurgu üniversite laciverti `#002856`, üst başlık taş tonu `#8a6d45`; iç sayfalar Capsule'un koyu paletinde kaldı.

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
