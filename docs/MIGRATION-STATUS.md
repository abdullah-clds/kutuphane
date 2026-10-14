# Taşıma durumu

> Son güncelleme: 14 Ekim 2026 · dal `main`

## Çalıştırma

```bash
cd frontend
npm ci
npm run dev        # http://localhost:5173/
npm run build      # önce `npm run content` (Markdown → src/data/*.json) çalışır
node scripts/inventory.mjs   # docs/CONTENT-INVENTORY.md yeniden üretilir
```

Dağıtım notu: Uygulama tek sayfalık (SPA) yönlendirme kullanıyor. Sunucu, bilinmeyen yolları `index.html`'e yönlendirmeli (Apache `FallbackResource /index.html`, Nginx `try_files $uri /index.html`). Eski WordPress adreslerinin 301 yönlendirmeleri sunucuda da kurulmalı (bkz. CONTENT-ISSUES › URL). Alt dizinde önizleme: `VITE_BASE=/alt-dizin/ npm run build`.

## Tamamlanan ve doğrulanan

| Alan | Durum | Doğrulama |
|---|---|---|
| Anasayfa (Capsule bölümleri + duyuru paneli + hero slider) | ✔ | Masaüstü 1440 ve telefon 390/360'ta bölüm bölüm ekran görüntüsü ve pin konumu ölçümü |
| Menü (5 grup + ana bağlantılar, özgün etiketler) | ✔ | Açma/kapama, Esc, odak dönüşü, menüden gezinme |
| 20 içerik/dizin sayfası, kütüphaneler, iletişim, tarama, 4 hizmet | ✔ | 33 rotalık tarama: hepsi doğru h1, konsol hatası yok |
| 68 duyuru: arşiv (filtre, yıl, arama) + ayrı detay sayfaları | ✔ | Örnek detaylar; süresi dolmuş deneme uyarısı |
| 207 kaynak kaydı (7 dizin + birleşik dizin), arama, A–Z, sıralama, deneme durumu | ✔ | Deneme: 6 etkin / 8 sona ermiş grupları |
| KOHA ve EBSCO arama formları | ✔ | Canlı sistemlerde sorgu: KOHA 727 sonuç; EBSCO sonuç sayfası (FT1:Y, autocorrect, enhanced) |
| Eski adres yönlendirmeleri (duyuru slug'ları, kütüphane yazıları, e-kaynaklar, -2, sondaki /) | ✔ | Rota taraması |
| Tipografi: Barlow (DIN benzeri, latin-ext); Türkçe karakterler | ✔ | Ç Ğ İ I Ö Ş Ü ç ğ ı i ö ş ü başlıklarda ve maskeli animasyonlarda doğru |
| Yazı tipi lisansı | – | Projede lisanslı DIN Pro yok; Barlow (SIL OFL) kullanıldı |
| Erişilebilirlik temelleri | ✔ kısmen | Atla bağlantısı, `lang="tr"`, alt metinler, aria etiketleri, odak halkası, azaltılmış hareket |

## Görseller

- Site fotoğrafları (`public/media/site/`): kütüphanenin kendi yüklemelerinden: 2024/08 `kapak.jpg` (taş kemer), `iletisimkutuphane.jpg`, `altkpk.jpg`, `kutuphanekpk-1.jpg`, `kutuphane2.jpg`; 2024/10 `banner-2.jpg`, `kutup-banner.jpg`; `content/gorseller/` (3 kütüphane, logolar, amblem).
- Duyuru ve kaynak görselleri: 274 dosya yedekten çıkarıldı (yalnız içerikte bağlantısı olanlar, özgün boyut, küçük boyut kopyaları alınmadı), >1600px olanlar küçültüldü (toplam ~22 MB).
- Kullanılmayanlar: 2018–2019 tema demo görselleri (Depositphotos, `-copyright`, `post-N`), Capsule demo görselleri (çöl/kapsül). Capsule demo dosyaları `src/assets` altında duruyor ama artık içe aktarılmıyor (pakete girmez). Yalnız `smoke_final.mp4` (soyut duman katmanı) kullanılıyor.
- Belirsizlik: Taş kemerli fotoğrafların hangi kütüphaneye ait olduğu kaynakta yazmıyor; alt metinlerde kütüphane adı verilmedi (yalnız kütüphanelerin kendi öne çıkan görselleri adla eşlendi). Hizmet görsellerinden `toplu-katalog.jpg` ve `odunc-verme.jpg` stok fotoğraf; eski sitede de aynı hizmetlerde kullanılıyordu.

## Kalan işler

1. Ara genişliklerde (1920, 1280, 1024, 768) görsel kontrol; bu oturumda yalnız 1440/1533 ve 390/360 test edildi.
2. Görünür bir tarayıcı sekmesinde son kontrol (bu ortamda sekme arka plandaydı; bkz. ANIMATION-REGRESSION).
3. Paket boyutu: JS 252 KB gzip (içerik JSON'u dahil). Öneri: dizin ve duyuru verisini rota bazında böl (`import()`).
4. `smoke_final.mp4` (30 MB) yeniden kodlanmalı.
5. CONTENT-ISSUES'taki **Doğrulama** maddeleri (Yordam→KOHA, kırık form bağlantıları, oturum bağlantıları, hizmet adresleri, unvanlar).
6. İletişim formu: eski sitede Contact Form 7 vardı; arka uç olmadığı için form yerine `mailto:` düğmesi kondu. Form gerekiyorsa sunucu tarafı uç noktası gerekir.
7. Sunucu yapılandırması (SPA geri dönüşü, 301'ler).
