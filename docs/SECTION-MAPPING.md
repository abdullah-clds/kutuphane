# Capsule bölümleri → Kütüphane anasayfası

Sıra `frontend/src/pages/Home/Home.jsx`. Animasyon kodu her bölümde korunmuştur; değişiklikler ANIMATION-REGRESSION.md'de.

| # | Capsule bölümü (dosya) | Orijinal işlev ve hareket | Kütüphane içeriği | Kaynak |
|---|---|---|---|---|
| 0 | PreloaderII | Harf harf logo, ilerleme çubuğu, kapsül maske büyümesi | "Kütüphane" + "Bilgiye Açılan Kapı—Kapadokya Üniversitesi Kütüphanesi." **Zamanlama aynen** | Eski anasayfa sloganı |
| 1 | Hero | Görsel + duman videosu, kaydırmada ölçek/parallax; büyük başlık, slogan, kısa metin | Kütüphane fotoğraflarından **5 görsellik slider** (clip-path açılım, 6.5 sn); "Kütüphane", "Bilgiye / Açılan / Kapı"; slayt başlığı, sayaç, ilerleme çizgisi | uploads 2024/08, gorseller/ |
| 2 | Welcome | Satır satır clip-path açılımı, iki hap görsel, sağda paragraf | "Kütüphanelerimiz" ilk paragrafı (aynen, 4 satır, 44px; tema 64px/120vh idi) + koleksiyon cümlesi | kutuphanelerimiz.md |
| 3 | **Yeni: AnnouncementsSection** | (Capsule'da yok) Koyu zeminde sade tipografik ızgara, hafif yükselme girişi | **Duyurular**: son 6 duyuru (telefonda 4) çizgi + tarih + deneme durumu + başlık; etkin deneme sayısı; tüm duyurular bağlantısı | duyurular/*.md |
| 4 | Choose | Dev başlık açılımı + yükseklik büyümesi, paragraf, hap etiketler | **Tarama**: "Bilgiye hızla / ulaşın" (5.5rem; tema 9.5rem), KOHA/EBSCO seçimi + arama, hızlı erişim hapları | Eski anasayfa arama formu |
| 5 | Gallery | PIN'li sahne, 3 slayt | **Kütüphanelerimiz** (Merkez, Sosyal Bilimler, Fen Bilimleri); telefonda üst üste kartlar | kutuphanelerimiz.md, genel-kurallar.md |
| 6 | MarqueeSticky + MarqueeText | Yön değiştiren marquee, boşluk daralması | "Elektronik Kaynaklar*" | – |
| 7 | StickyCols | PIN'li 4 sütun, iki faz, sayaç | Abone (66) → Açık erişimli (77) → Deneme (etkin); telefonda kartlar | Veri |
| 8 | **Yeni: ServicesStrip** | (Capsule kart dili) | **Hizmetler ve hızlı erişim**: 4 araştırma hizmeti kartı + 8 hızlı erişim hapı | hizmetler/*.md, eski anasayfa |
| 9 | Footer / FooterTitle | Marquee, bağlantılar; dev başlık harf girişi | Adres, iletişim, sosyal hesaplar; "Kütüphane" | sablonlar/footer.md |
| – | Navbar / ReserveBtn / Logo | Görsel düğmeler | Çalışan menü paneli; "Tarama"; üniversite logosu | Eski menü |

**Anasayfadan kaldırılanlar (sadeleştirme, 14.10.2026 kullanıcı isteği):** Activities (deneme geri sayımı), Showcase (hizmetlerin yatay kaydırması), Feedback (Açık Arşiv alıntıları), MapLink (yerleşke cümlesi), FooterBanner. Bileşen dosyaları depoda duruyor ama içe aktarılmıyor; içerikleri iç sayfalarda. Anasayfa yüksekliği masaüstünde ~16.000px'ten ~9.800px'e indi.

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
