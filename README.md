# Kapadokya Üniversitesi Kütüphanesi

kutuphane.kapadokya.edu.tr için yeni site. Tasarım ve hareket dili **Capsule** temasından (React + Vite + Tailwind 4 + GSAP ScrollSmoother/ScrollTrigger) korunarak, eski WordPress sitesinin tüm içeriği taşındı.

```bash
cd frontend
npm ci
npm run dev       # geliştirme
npm run build     # içerik derlemesi (Markdown → JSON) + üretim paketi → frontend/dist
```

| Klasör | İçerik |
|---|---|
| `content/site-icerigi/` | Eski siteden çıkarılmış sayfa/duyuru/hizmet Markdown'ları: **içeriğin tek kaynağı** |
| `content/gorseller/` | Kurumdan sağlanan görseller (logo, amblem, kütüphane fotoğrafları) |
| `frontend/scripts/build-content.mjs` | Markdown → `src/data/*.json`; bağlantı ve biçim düzeltmeleri burada, belgeli |
| `frontend/public/media/` | Yedekten çıkarılan görseller ve belgeler |
| `docs/` | Denetim, içerik envanteri, içerik sorunları, bölüm eşlemesi, animasyon regresyonu, taşıma durumu |

İçerik güncellemek için ilgili Markdown dosyasını düzenleyip `npm run build` çalıştırın. Sunucu, bilinmeyen yolları `index.html`'e yönlendirmelidir (tek sayfalık uygulama).

Tema: "Capsule", Moyra'nın Awwwards SOTD sitesinin ShowravKormokar tarafından yapılmış React klonu (öğrenme amaçlı klon; bkz. orijinal README geçmişi `git show 7457a99:README.md`). Kurumsal kullanımdan önce temanın lisans/kullanım koşulları kurumca değerlendirilmelidir.
