# Animasyon regresyon kaydı

## Test yöntemi

- Tarayıcı: Chrome (Claude in Chrome), `npm run dev`.
- Test sekmesi Chrome'da **arka planda** (`visibilityState: hidden`) olduğu için requestAnimationFrame, `scroll` olayları ve ResizeObserver çalışmıyordu. Bu yüzden yalnızca geliştirme sürümünde tanımlı iki yardımcı kullanıldı (`MainLayout.jsx`, üretimde yok): `__pump(ms)` GSAP saatini MessageChannel ile gerçek zamanlı ilerletir, `__go(y)` kaydırıp `scroll` olayını tetikler. Konumlar `getBoundingClientRect` ile ölçüldü, görüntüler ekran görüntüsüyle doğrulandı.
- Masaüstü: 1440×760 ve 1533×784. Telefon: 390×760 ve 360×760 (genişliği sınırlı iframe, Chrome penceresi 500px'den daralmadığı için).
- Ara genişlikler (1920, 1280, 1024, 768) **ayrıca test edilmedi** (bkz. Kalan işler).

## Korunan efektler ve sonuç

| Efekt | Değişiklik | Sonuç |
|---|---|---|
| Preloader (harfler, ilerleme, kapsül maske) | Yalnız metin; `prefers-reduced-motion` ise atlanır | ✔ zamanlama aynı |
| Hero kaydırma ölçek/parallax (`scrub 1.5`) | Aynı tween, slider katmanına uygulanıyor | ✔ |
| Welcome satır clip açılımı | Yalnız metin (masaüstü 5, telefon 11 satır) | ✔ Türkçe karakterler kırpılmıyor |
| Choose başlık açılımı + yükseklik | Yalnız içerik; bölüm `h-dvh` → `min-h-dvh` (arama formu sığsın) | ✔ |
| Gallery PIN sahnesi | İçerik + cleanup (A1) + başlık boyutu `clamp` | ✔ masaüstü pin üst kenarı −12px (orijinal `"10% 10%"`) |
| MarqueeSticky / MarqueeText | Metin prop'u; tetikleyiciye `onLeave/onLeaveBack` yenileme (A5) | ✔ |
| StickyCols iki fazlı PIN | İçerik + cleanup (A1) + `h1`→`h3` (CSS seçicisi ikisini de kapsar) | ✔ pin üst kenarı 152px (orijinal `"top 20%"`), 1/3→3/3 sayaç çalışıyor |
| Activities başlık + ilerleme çizgileri | Seçici kapsamlandı (A2), çizgi sayısı/genişliği veriden | ✔ kendi çizgileri büyüyor |
| Showcase yatay PIN | İçerik + `start` (A4) | ✔ pin üst kenarı 0, kartlar tam görünür |
| Feedback geçişi | İçerik | ✔ |
| FooterBanner ölçek scrub | Görsel bağlantıya sarıldı | ✔ |
| FooterTitle harf girişi | Metin | ✔ telefonda ve masaüstünde sona kadar açılıyor (A5 sonrası) |
| AnimateBtn yuvarlanma, ClickIndicator | `span` + `white-space: nowrap` (A3); gösterge etiketi prop | ✔ |

## Yapılan animasyon değişiklikleri (gerekçe → sonuç)

- **A1 Gallery/StickyCols cleanup.** Orijinal: `ScrollTrigger.getAll().forEach(kill)`. Rota değişiminde (ve StrictMode'da) diğer bölümlerin tetikleyicilerini de öldürüyordu. Yeni: yalnızca kendi timeline'ı. Rota değiştirip anasayfaya dönünce tüm pin'ler doğru.
- **A2 Activities ilerleme çizgileri.** `gsap.utils.toArray(".progress-line")` ilk üç eşleşmeyi, yani Gallery'nin çizgilerini canlandırıyordu (taban çizgisi kusuru). Seçici `.activities-section .progress-line` yapıldı.
- **A3 AnimateBtn.** `<a href="#">` → `<span>` (gerçek bağlantı/düğme içinde iç içe bağlantı olmasın). Çok kelimeli Türkçe etiketler `min-content` kutuda sarıldığı için `.rev-link { white-space: nowrap }`.
- **A4 Showcase `start`.** `"-10% 10%"` → `"top top"`. Orijinal değer, MarqueeSticky'nin 20vh daralmasını (≈151px) elle telafi ediyordu (A5). Yenileme sonrası ölçümler doğru olduğundan bu telafiye gerek kalmadı; görsel sonuç taban çizgisiyle aynı (kartlar ekranı dolduruyor).
- **A5 MarqueeSticky daralması.** `.sticky-spacer` 20vh→0 ve `display:none`, altındaki tüm bölümleri tetikleyiciler ölçüldükten **sonra** 20vh yukarı taşıyor. Sonuç: aşağıdaki pin'ler ~152px kayık, FooterTitle hiç tamamlanmıyordu. Daralma bittiğinde ve geri açıldığında `ScrollTrigger.refresh()`. Aşağıdaki hiçbir tetikleyici o anda etkin olmadığından görünür sıçrama yok. Kademeli kaydırma testinde aşağı ve tekrar yukarı-aşağı sonuç doğru.
- **A6 Tetikleyici sıralaması.** Rota değişiminde `ScrollTrigger.refresh()` + `ScrollTrigger.sort()`. Gallery'nin `useEffect` ile, diğerlerinin layout effect ile kurulmasından doğan sıra sorunu giderildi.
- **A7 Boyut değişimi.** Bölümlerden biri ölçüm sonrası boy değiştirirse (ResizeObserver, 150ms gecikmeli) ve web fontları yüklenince yenileme. Görsel yüklenince yenileme (mevcut).
- **A8 Sayfa geçişi (yeni).** Tema tek sayfaydı, geçiş yoktu. Rota değişiminde içerik 0.8 sn opaklıkla giriyor. Dönüşüm (`y`) kullanılmadı çünkü yeni sayfanın tetikleyici ölçümlerini kaydırırdı. Üste dönüş `behavior: "instant"`, çünkü temanın `html { scroll-behavior: smooth }` kuralı yeni sayfayı eski konumdan yukarı kaydırıyordu.
- **A9 Hero slider (yeni).** Gelen görsel StickyCols'taki clip-path açılımıyla (`inset(100% 0 0 0)` → `inset(0)`, 1.4 sn power4.inOut) ve 1.15→1 ölçekle giriyor. Kaydırma scrub'ı slider kabına uygulanıyor.
- **A10 Menü (yeni).** Haptan clip-path ile büyüyen panel (0.9 sn power4.inOut), satırlar preloader alt satırları gibi maskeli yükselir. Açıkken ScrollSmoother duraklatılır.
- **A11 Telefon düzenleri.** ≤768px'te Gallery ve StickyCols masaüstü PIN sahnelerini kurmaz (390px'te görsel üstte, altı boş kalıyordu); yerine aynı görsel dilde üst üste kartlar. Masaüstü davranışı değişmedi.
- **A12 Azaltılmış hareket.** Preloader atlanır, ScrollSmoother yumuşatması 0, slider otomatik oynamaz, menü/sayfa girişleri anında, Gallery'nin CSS kayan yazısı durur, iç sayfa girişleri kapalı. Kaydırmaya bağlı (scrub) efektler kaydırmayı izlediği için korunur.

## Kalan sorunlar

- Arka plan sekmesi nedeniyle ResizeObserver tabanlı yenileme (A7) bu ortamda tetiklenemedi; görünür sekmede doğrulanmalı. A5 bağımsız olarak doğrulandı.
- `smoke_final.mp4` 30 MB; mobilde veri maliyeti yüksek (öneri: 2–3 MB'lık yeniden kodlama veya mobilde poster).
- Telefonda Showcase yatay PIN'i çalışıyor; kartların 80vw genişliği korunuyor.
- Konsol: taban çizgisindeki `fill-rule`, boolean öznitelik ve `SplitText called before fonts loaded` uyarıları, değiştirilen bileşenlerde giderildi. Rota taramasında (33 rota) konsol hatası yok.
