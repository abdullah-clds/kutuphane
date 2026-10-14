# İçerik sorunları ve doğrulama gerektirenler

> Kaynak kayıt her zaman `content/site-icerigi/` altındaki Markdown dosyasıdır; bu dosyalar **değiştirilmedi**. Uygulanan her düzeltme `frontend/scripts/build-content.mjs` içinde (`CORRECTIONS`, `FORMAT_FIXES`) kodlu ve aşağıda kanıtıyla listelenmiştir. Kurumsal/akademik metinlerde anlam değiştiren hiçbir düzeltme yapılmadı.

Durum: **Düzeltildi** (kanıtla uygulandı) · **Gösterimde** (orijinal metin yayında, düzeltme önerisi bekliyor) · **Doğrulama** (kurum onayı gerekli)

## Bağlantılar

| No | Kayıt | Sorun | Karar | Kanıt |
|---|---|---|---|---|
| LINK-1 | Sanal Müzeler › Kültür ve Turizm Bakanlığı Sanal Müzeleri | Bağlantı Uffizi'ye gidiyordu | **Düzeltildi** → `https://sanalmuze.gov.tr/` | Kayıt adı; adres 14.10.2026'da 200 döndü |
| LINK-2 | E-Kitaplar › Free ebooks by Project Gutenberg | DOAB'a gidiyordu | **Düzeltildi** → `https://www.gutenberg.org/` | Kayıt adı; adres 200 döndü |
| LINK-3 | Abone › Inspec With Full Text | `?db=eric` (ERIC) | **Düzeltildi** → `https://research.ebsco.com/c/infzwo?db=int` | Kütüphanenin kendi Inspec duyurusundaki bağlantı (09.01.2026) |
| LINK-4 | Deneme › Mesvera | `mesvera.com` (protokolsüz, göreli bağlantı oluyordu) | **Düzeltildi** → `https://mesvera.com` | Mesvera duyurusundaki bağlantı |
| LINK-5 | Tedarik Talebi, 2022/2026 yayın temini duyuruları › Yayın Talep Formu (`/wp-content/uploads/2021/01/KD.FR_.013.YAYIN-TALEP-FORMURev1.docx`) | Yedekte yok, canlı sitede **404** | **Gösterimde** (bağlantı korunuyor) · Öneri: güncel KD.FR.013 formunun kalite.kapadokya.edu.tr adresi kurumca bildirilmeli. ANKOS sayfasındaki `kalite…/KD.FR.013.YAYIN-TALEP-FORMU.Docx` adresi de 404 | curl, 14.10.2026 |
| LINK-6 | `22.05.2024-kitap-ihale-dosyasi.xls`, `LIBRARYTURK-KULLANIM-KILAVUZU.pdf`, `TAD-Kullanim-Kilavuzu.pdf` | Yedekte yok, canlı sitede 404 | **Gösterimde** · dosyalar kurumdan temin edilirse `public/media/` altına konmalı | curl |
| LINK-7 | Book Citation Index, CPCI, Science Citation Index (abone); Political Science Complete, MLA, LitBase, Rosetta Stone (deneme) | Erişim bağlantıları oturuma bağlı uzun EBSCO/Clarivate giriş adresleri (süresi dolmuş olabilir) | **Doğrulama** · kalıcı veri tabanı adresleri (ör. Web of Science ana adresi) kurumca verilmeli. Deneme olanlar zaten "süresi doldu" olarak bağlantısız gösteriliyor | Kayıtlardaki `requestIdentifier=…` parametreleri |
| LINK-8 | Toplu Katalog, KAŞİF, Kütüphaneler Arası Ödünç Verme Sistemi | Kaynakta hiçbir dış bağlantı yok | **Gösterimde** (bağlantı uydurulmadı) · hizmet adresleri kurumca bildirilmeli | hizmetler/*.md |

## Metin ve kurum bilgisi

| No | Yer | Sorun | Karar / öneri |
|---|---|---|---|
| TXT-1 | Kütüphanelerimiz | "tüm yayınlar **Yordam** kütüphane otomasyon programına aktarılmaktadır"; Ekim 2025'te KOHA'ya geçildi (03.10.2025 duyurusu) | **Doğrulama** · Öneri: "…**KOHA** kütüphane otomasyon programına aktarılmaktadır." Metin onay gelene kadar orijinal haliyle yayında |
| TXT-2 | Kütüphanelerimiz | `kutuphane-eski-site-icerik.md` Ek A'da "Sosyal Bilimler Kütüphanesi" iki kez; sayfa bazlı dışa aktarımda (`site-icerigi`) bir kez | Tek bölüm gösteriliyor (yinelenen blok WPBakery'nin masaüstü/mobil kopyası) |
| TXT-3 | Kütüphane sayısı | Kütüphanelerimiz: 3 kütüphane + 2 özel kitaplık; Genel Kurallar: 4 çalışma saati (Ürgüp Fabrika Yerleşke Kitaplığı dahil) | Yeni sitede üç ana kütüphane ayrı; **Fabrika Yerleşke Kitaplığı** "Diğer kitaplıklar" altında yalnızca kaynakta olan çalışma saatiyle; iki özel kitaplık ayrı. Kurumsal sınıflandırma **Doğrulama** |
| TXT-4 | Unvan | İletişim: "Birim Başkanı / Birim Görevlisi"; diğer sayfalar: "Daire Başkanlığı / Daire Başkanı" | İletişim sayfasında kaynak unvanı korunuyor; **Doğrulama** |
| TXT-5 | Yazım | "Book Citaiton Index", "MasterFILE Complate", "Platfroma", "dijtial", "NewYork Metroplolitan", "süresi solmadan", "intaratktif", "refarans" | **Gösterimde** (sessizce düzeltilmedi). Öneri: Citation, Complete, Platforma, dijital, New York Metropolitan, dolmadan, interaktif, referans |
| TXT-6 | İntihal Programları › iThenticate | "Turnitin hesabını bu link üzerinden aktive etmelidir" (kopyala-yapıştır) | **Doğrulama** · Öneri: "iThenticate hesabını…" |
| TXT-7 | Deneme › LibraryTürk kartı | Kart "Son Erişim Tarihi: 9.12.2024" diyor; 12.10.2026 duyurusu yeni deneme dönemini (12 Ekim – 30 Kasım 2026) bildiriyor | Kart kaynağa uygun olarak "süresi doldu"; duyuru etkin deneme olarak gösteriliyor. Kart tarihi güncellenmeli |
| TXT-8 | Deneme › AKAGEV kartı | Açıklama "…Son" diye kesilmiş | Bitiş tarihi (22.11.2024) aynı adlı duyurudan alındı, kartta bunu belirten not var |
| TXT-9 | 2024-05-17 tarihli 29 duyuru | WordPress'e toplu aktarım tarihi; gerçek yayın tarihleri daha eski (metinlerde 2020–2023) | Tarih kaynakta olduğu gibi gösteriliyor; deneme bitişleri metindeki tarihlerden hesaplandı |
| TXT-10 | Covid-19, "Kütüphane 2022-2023 Kuralları", 2020/2022 yayın temini | Güncelliğini yitirmiş | Arşivde yayında; deneme olanlar "süresi doldu/arşiv" etiketli. Kaldırma kararı kuruma ait |
| TXT-11 | Mesvera duyurusu | Üyelik için `@kun.edu.tr` uzantısı geçiyor (diğer yerlerde `@kapadokya.edu.tr`) | **Doğrulama** |

## Biçim

| No | Yer | Sorun | Karar |
|---|---|---|---|
| FMT-1 | Ödünç Alma ve Ödünç Şartları | Kalın etiketler yanlış kapanıyor (görünür `**`), boşluklar eksik, (c) ve (d) aynı paragrafta, maddeler tireyle yazılmış | **Düzeltildi (yalnız biçim)**: kelimeler aynen, boşluk/paragraf/kalın işaretleri onarıldı, tireli satırlar listeye çevrildi. Öneri (uygulanmadı): kullanıcı gruplarını tabloya dönüştürmek |
| FMT-2 | Sayfa gövdelerindeki eklenti yer tutucuları (`*[Randevu takvimi]*`, `*[İletişim formu]*`, `*[Google Harita]*`) ve kaynağı kaybolmuş görsellerden kalan tek "!" satırları | İçerik değil | Çıktıdan kaldırıldı |

## Kayıtlar ve adresler

| No | Konu | Karar |
|---|---|---|
| REC-1 | Açık Erişimli: "Open Culture" ve "USPTO Patent Database" iki kez | İkinci kayıtlar veride `duplicateOf` ile işaretli, listede gizli (77 görünür kayıt) |
| URL-1 | Eski `/acik-erisimli-veri-tabanlari/` = "Açık Dersler" sayfası; gerçek açık erişim listesi `/acik-erisimli-veri-tabanlari-2/` | Yeni: `/acik-dersler` ve `/acik-erisimli-veri-tabanlari`; `-2` adresi yönlendiriliyor. Eski "Açık Dersler" adresi artık açık erişim listesini gösteriyor (sunucu tarafında yönlendirme kurulursa bu tercih yeniden değerlendirilmeli) |
| URL-2 | `/e-kaynaklar/` (anasayfada "E-Dergiler") | Yeni `/e-dergiler`; eski adres yönlendiriliyor |
| URL-3 | Duyurular eski sitede kök dizinde (`/<slug>/`) | Yeni `/duyurular/<slug>`; eski adresler istemci tarafında yönlendiriliyor. `?page_id=` iç bağlantıları yeni rotalara çevrildi |
| URL-4 | Görsellerin bir kısmı eski ajans alan adından (`ajansepika.com/demo1/…`) | Tümü yedekten çıkarılıp `public/media/` altına yerelleştirildi (274 dosya) |
| SEC-1 | `uploads/2026/10/` içinde DOI faturası PDF'i ve `kargo-1.docx` | Hiçbir içerikte bağlantısı yok; **taşınmadı**. Canlı sunucuda herkese açık olup olmadığı kontrol edilmeli |
| DEMO-1 | WooCommerce ürünleri, etkinlik demo verisi, Mapplic, GiveWP, İngilizce demo menüler, AncoraThemes telif metni | Taşınmadı |
