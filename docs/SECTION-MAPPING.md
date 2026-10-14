# Capsule bölümleri → Kütüphane anasayfası

Sıra `frontend/src/pages/Home/Home.jsx`. Animasyon kodu her bölümde korunmuştur; değişiklikler ANIMATION-REGRESSION.md'de.

| # | Capsule bölümü (dosya) | Orijinal işlev ve hareket | Kütüphane içeriği | Kaynak |
|---|---|---|---|---|
| 0 | PreloaderII | Harf harf logo, ilerleme çubuğu, kapsül maske büyümesi | "Kütüphane" + "Bilgiye Açılan Kapı—Kapadokya Üniversitesi Kütüphanesi." **Zamanlama aynen** | Eski anasayfa sloganı |
| 1 | Hero | Görsel + duman videosu, kaydırmada ölçek/parallax; büyük başlık, 3 satırlık slogan, sağ altta kısa metin | Kütüphanenin kendi fotoğraflarından **5 görsellik slider** (clip-path açılım, 6.5 sn, üzerine gelince durur); "Kütüphane", "Bilgiye / Açılan / Kapı", birim adı; slayt başlığı, sayaç, ilerleme çizgisi | Eski anasayfa; uploads 2024/08, gorseller/ |
| 2 | Welcome | Satır satır clip-path açılımı, iki hap görsel, sağda paragraf | "Kütüphanelerimiz" sayfasının ilk paragrafı (kelimeler aynen, satırlara bölündü); koleksiyon cümlesi; Kütüphanelerimiz bağlantısı | sayfalar/kutuphanelerimiz.md |
| 3 | **Yeni: AnnouncementsSection** | (Capsule'da yok) Koyu sayfaya gömülü krem panel, tema yarıçapı/boşluğu, maskeli başlık girişi | **Duyurular**: öne çıkan son duyuru, son 8 başlık (telefonda 4), tür sekmeleri, etkin deneme erişimleri geri sayımı, tüm duyurular bağlantısı | duyurular/*.md |
| 4 | Choose | Dev başlık açılımı + yükseklik büyümesi, sol paragraf, sağda hap etiketler | **Tarama**: "Bilgiye hızla / ulaşın"; EBSCO açıklaması; KOHA / EBSCO seçimi + arama kutusu; eski anasayfanın hızlı erişim bağlantıları hap etiket olarak | Eski anasayfa arama formu ve hızlı erişim ikonları |
| 5 | Gallery | PIN'li sahne: kayan kelime, kart tam ekrana büyür, 3 slayt, ilerleme çizgisi | **Kütüphanelerimiz**: Merkez, Sosyal Bilimler, Fen Bilimleri; yerleşke, koleksiyon cümlesi, çalışma saati, ayrıntı bağlantısı. Kayan kelime "Kütüphane". Telefonda üst üste kartlar | kutuphanelerimiz.md, genel-kurallar.md |
| 6 | MapLink | Ortalı cümle + imleç göstergesi | "Kütüphanelerimiz Mustafapaşa ve Ürgüp yerleşkelerimizde bulunmaktadır." → İletişim (adresler) | Kütüphanelerimiz |
| 7 | MarqueeSticky + MarqueeText | Yön değiştiren marquee, boşluk daralması | "Elektronik Kaynaklar*" | – |
| 8 | StickyCols | PIN'li 4 sütun, iki faz, 1/3–3/3 sayaç | Abone (66) → Açık erişimli (77) → Deneme (etkin sayı); her kart ilgili dizine bağlı. Telefonda üst üste kartlar | Kayıt sayıları veriden |
| 9 | Activities | Dev başlık + ilerleme çizgileri | **Deneme erişimine açık kaynaklar**: kalan süreyi gösteren çizgiler (son erişim tarihi, gün), dizin ve duyuru bağlantıları | deneme-erisimli-veri-tabanlari.md + duyurular |
| 10 | Showcase | PIN'li yatay kaydırma, büyük görsel kartlar, sayaç | **Araştırma hizmetleri**: Toplu Katalog, ANKOS, KAŞİF, Kütüphaneler Arası Ödünç; kapanış kartı "Tarama yapın" | hizmetler/*.md |
| 11 | Feedback | Büyük alıntı slider, önceki/sonraki, ilerleme | **Açık Arşiv · Açık Erişim**: Yayın Girişi, Kurumsal Açık Arşiv, İntihal Programları, Açık Bilim ve Kütüphane Komisyonu cümleleri (aynen) | ilgili sayfalar |
| 12 | FooterBanner | Ölçek scrub'lı görsel, dev marka, imleç göstergesi | Okuma salonu fotoğrafı, "Kütüphane", birim adı ve e-posta → İletişim | – |
| 13 | Footer | Marquee, metin, bağlantılar, sosyal ikonlar | "Bilgiye Açılan Kapı*", adres/telefon/faks/e-posta, site bağlantıları, 5 sosyal hesap | sablonlar/footer.md |
| 14 | FooterTitle | Dev başlık harf harf soldan | "Kütüphane"; Kapadokya Üniversitesi / birim / telif | – |
| – | Navbar (Menu hapı) | Görseldi, hiçbir şey açmıyordu | Haptan büyüyen krem menü paneli: 5 grup + ana bağlantılar (özgün etiketler), Esc, odak tuzağı | Eski menü yapısı |
| – | ReserveBtn | "Reverse" hap düğme | "Tarama" → /tarama | – |
| – | Logo | Capsule SVG | Kapadokya Üniversitesi beyaz logo → / | gorseller/ |

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
