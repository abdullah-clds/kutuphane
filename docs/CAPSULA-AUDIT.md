# Capsule teması: kaynak denetimi ve korunacaklar

> Tarih: 14 Ekim 2026 · Denetlenen sürüm: git `7457a99` ("Baseline: original Capsule theme, untouched")
> Not: Klasörün gerçek adı `capsule-main` (brief'te "capsula-main" geçiyor). Tema, Moyra'nın Awwwards SOTD sitesi "Capsule"ın ShowravKormokar tarafından yapılmış React klonu.

## 1. Teknoloji yığını (package.json ve yapılandırmadan okunmuştur)

| Konu | Bulgu |
|---|---|
| Dil | JavaScript (JSX), TypeScript yok |
| Çatı | React 19.1 + Vite 6.3 (`@vitejs/plugin-react`) |
| Paket yöneticisi | npm (`frontend/package-lock.json`). Kök `package.json` yalnızca `react-responsive` içeriyor; uygulama `frontend/` altında |
| Betikler | `dev` (`vite --host`), `build`, `lint`, `preview` |
| Yönlendirme | `react-router-dom` 7, `createBrowserRouter`, tek rota `/capsule` → `MainLayout` > `Home` |
| CSS | Tailwind CSS 4 (`@tailwindcss/vite`), `src/index.css` + bileşen başına düz CSS dosyaları |
| Yazı tipi | Google Fonts **Inter** (`index.css` başında `@import`) |
| Animasyon | **GSAP 3.13** (ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin) + `@gsap/react` (`useGSAP`) |
| Yumuşak kaydırma | **GSAP ScrollSmoother** (`smooth: 1.5`, `effects: true`), `MainLayout`'ta kuruluyor. `@studio-freight/lenis` kurulu ve `src/lib/lenis.js` var ama **hiçbir yerde çağrılmıyor** |
| Duyarlılık | `react-responsive` `useMediaQuery` (768px eşiği) + Tailwind `md`/`lg` |
| İkonlar | `react-icons` (io, md, bs, fa, ci) |
| Dağıtım | GitHub Pages iş akışı (`.github/workflows/deploy.yml`), `vite.config.js` içinde `base: '/capsule/'` |

## 2. Bileşen hiyerarşisi

```
main.jsx → RouterProvider
└── MainLayout (layouts/MainLayout.jsx)
    ├── PreloaderII         sabit, z-51; SplitText karakter/satır + ilerleme çubuğu + kapsül maske büyümesi
    ├── Logo                sol üst, mutlak konumlu SVG
    ├── ReserveBtn          sağ üst krem hap düğme ("Reverse" yazım hatası)
    ├── Navbar              alt-orta sabit hap "Menu" (tıklanınca hiçbir şey açmıyor)
    └── #smooth-wrapper > #smooth-content > main
        ├── <Outlet/> → Home
        │   ├── Hero            parallax görsel + duman videosu + büyük başlık
        │   ├── Welcome         satır satır clip-path metin açılımı (scrub)
        │   ├── Choose          dev başlık açılımı + yükseklik büyümesi + hap etiketler
        │   ├── Gallery         PIN'li sahne: kayan "Capsules®" yazıları, kartın tam ekrana büyümesi, 3 slayt
        │   ├── MapLink         ortalı metin + imleci izleyen "Show the map" göstergesi
        │   ├── MarqueeSticky   kaydırma yönüne göre ters dönen marquee + yükseklik daralması
        │   ├── StickyCols      PIN'li 4 sütunlu iki fazlı geçiş (görsel clip-path, satır kaydırma, 1/3-2/3-3/3 sayaç)
        │   ├── Activities      dev başlık açılımı + ilerleme çizgileri
        │   ├── Showcase        PIN'li yatay kaydırma, 3 büyük görsel kart
        │   ├── Feedback        3 yorumluk geçiş (önceki/sonraki + ilerleme çizgisi)
        │   └── FooterBanner    görsel ölçek scrub + imleç göstergesi
        ├── Footer              marquee + metin + bağlantılar + sosyal ikonlar
        └── FooterTitle         dev "Capsules®" karakter karakter soldan giriş (scrub)
```

Boş/kullanılmayan dosyalar: `Cards/Card.jsx`, `Cards/Cards.jsx`, `Intro/Intro.jsx`, `Outro/Outro.jsx`, `Preloader/Preloader.jsx` (eski sürüm), `lib/lenis.js`.

## 3. Animasyon envanteri (taban çizgisi, 1440×900'de tarayıcıda gözlendi)

| Bölüm | Tetikleyici | Davranış | Zamanlama |
|---|---|---|---|
| PreloaderII | sayfa yükü | harfler `x:100%→0→-100%` (power4.inOut, stagger .05), alt satırlar `y`, ilerleme çubuğu 3 adımda scaleX (power3.out, 3.5 sn), `.preloader-mask` scale 6 (4 sn) ve kaybolma | toplam ~8 sn |
| Hero | `.hero-section` top→bottom | `.hero-img` yPercent −5, scale 1.2, power1.inOut, scrub 1.5. Yalnızca >768px | |
| Welcome | top 75% → bottom 75% | her satırın kopyası `clip-path inset(0 0 100% 0)` → `inset(0)`, scrub | |
| Choose | top 75% → bottom 100% | alt başlık yPercent; `.title-part` yükseklik 10vh→50vh; başlık clip; `.choose-sec` yPercent 100→0 | |
| Gallery | `10% 10%` → `220% 30%`, **pin**, scrub 1 | arka plan rengi; kart 40rem×18rem → tam ekran (radius 3.5rem); 2. ve 3. slayt alttan; metinler x:50 | |
| MarqueeSticky | `.pin-con` bottom 80%→50% | boşluk 20vh→0, sonra gizleme | |
| MarqueeText | wheel olayı | yön değişince marquee yön çevirir, yıldız ±110° döner | 10 sn döngü |
| StickyCols | top 20%, +=90%, **pin**, scrub 1 | col-1 sön, col-2 sağdan, col-3 alttan; görsel clip-path; SplitText satırları yPercent −125 | |
| Activities | top 80% → top 20% | Choose ile aynı başlık mekaniği + 3 ilerleme çizgisi | |
| Showcase | `-10% 10%`, uzunluk = taşan genişlik, **pin** | yatay `x` kaydırma | |
| FooterBanner | top bottom-20% → bottom top+20% | görsel scale 1.2→1 | |
| FooterTitle | top 90% → top 80% | SplitText harfleri x −120%→0, stagger .02 | |
| Hover | CSS | `AnimateBtn` iki satırlı dikey yuvarlanma (0.3s), Navbar ikonu 360° döner | |
| İmleç | mousemove | `ClickIndicator` portal ile imleci izler | |

Sayfa geçişi: **yok** (tek sayfa). Azaltılmış hareket (`prefers-reduced-motion`) desteği: **yok**.

## 4. Taban çizgisinde tespit edilen mevcut kusurlar (değiştirmeden önce kayıt)

1. **Konsol uyarıları:** SVG'de `fill-rule`/`clip-rule` (React camelCase istiyor); `Choose` ve `Activities`'te `className` dışına düşmüş JSX metinleri (`font-medium`, `tracking-tighter`, `choose-title` boolean öznitelik olarak gidiyor); `SplitText called before fonts loaded` (7 kez).
2. **Activities ilerleme çizgileri yanlış öğeleri hedefliyor:** `gsap.utils.toArray(".progress-line")` kapsamsız; ilk üç `.progress-line` Gallery'deki çizgiler olduğu için Activities'in kendi çizgileri hiç canlanmıyor, Gallery'nin çizgileri genişliyor.
3. **Gallery ve StickyCols temizliği her şeyi öldürüyor:** cleanup içinde `ScrollTrigger.getAll().forEach(t => t.kill())`. Tek sayfada görünmüyor ama rota değişiminde (ve React StrictMode'un çift effect çağrısında) diğer bölümlerin ve ScrollSmoother'ın tetikleyicilerini de öldürür.
4. **Gallery `useEffect` ile, diğerleri `useGSAP` (layout effect) ile kuruluyor:** Gallery'nin pin'i kendisinden aşağıdaki pin'lerden sonra oluşuyor; ScrollTrigger sıralaması yenilemeye bağlı.
5. **Menü çalışmıyor:** `Navbar` ve `ReserveBtn` yalnızca görsel; `AnimateBtn` içinde `href="#"` bağlantılar var.
6. **MarqueeText global seçici kullanıyor:** iki örnek (MarqueeSticky ve Footer) birbirinin öğelerini de canlandırıyor (görsel sonuç aynı hızda, zararsız).
7. **Mobil:** Hero metni üst üste biniyor, Gallery/StickyCols/Showcase 768px altında masaüstü ölçüleriyle çalışıyor (README "Not fully responsive" uyarısıyla uyumlu). Chrome penceresi 500px'den dar açılamadığı için 390/360px testleri genişliği sınırlı iframe ile yapıldı (bkz. ANIMATION-REGRESSION.md).
8. **Ağırlık:** `smoke_final.mp4` 30 MB; demo PNG'leri 2–4 MB.
9. `index.html` `lang="en"`, başlık "Closer to Nature—Closer to Yourself".

## 5. Korunacaklar (değişmez kurallar)

- ScrollSmoother kurulumu (`smooth: 1.5, effects: true`) ve `#smooth-wrapper/#smooth-content` yapısı.
- Her bölümün timeline'ı, tetik noktaları (`start`/`end`), scrub değerleri, easing'leri ve pin davranışı. İçerik değişir, hareket kodu değişmez.
- Renk sistemi: `#181717` (taban), `#2a2725`/`#2b2825` (koyu kahve), `#f4efe7` (krem), `#b1a696` (taş), `#4f4b48` (çizgi), `#eae5dd` (küçük başlık).
- Yuvarlatma dili: 2.5rem / 3rem / 3.5rem kartlar, `rounded-full` hap düğmeler, krem hap + koyu daire ok ikonu.
- Tipografi ölçeği: 9.5rem/9xl dev başlıklar, `.7rem` küçük üst başlıklar, 2rem gövde vurguları, sıkı harf aralığı.
- Preloader'ın kapsül maskesi (`public/preloader-bg.svg`) ve zamanlaması.
- `AnimateBtn` yuvarlanma etkisi, `ClickIndicator` imleç göstergesi.

## 6. Dosya konumları (önemli)

| Ne | Nerede |
|---|---|
| Global stiller, bölüm CSS'leri (welcome/choose/sticky) | `frontend/src/index.css` |
| Smoother kurulumu | `frontend/src/layouts/MainLayout.jsx` |
| Bölüm metinleri (satır dizileri) | `frontend/src/constants/*.js` |
| Preloader stili | `frontend/src/components/Preloader/preloaderII.css` |
| Gallery stili | `frontend/src/components/Gallery/gallery.css` |
| Hap düğme etkisi | `frontend/src/components/Buttons/revbtn.css` |
