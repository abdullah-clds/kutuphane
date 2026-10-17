# Yayın ve güncelleme rehberi

Kapadokya Üniversitesi Kütüphanesi sitesini değiştirmek, kaydetmek (commit) ve yayına almak için gereken her şey bu dosyada.

## Adresler

| Ne | Adres |
|---|---|
| Canlı site | https://abdullah-clds.github.io/kutuphane/ |
| Kod deposu (GitHub) | https://github.com/abdullah-clds/kutuphane |
| Yayın durumu (Actions) | https://github.com/abdullah-clds/kutuphane/actions |
| Bilgisayardaki klasör | `~/Desktop/kutuphane-kapadokya/capsule-main` |

> Canlı sitenin adresi sonunda `/kutuphane/` olan adrestir. `github.com/...` adresi sitenin kendisi değil, kodun durduğu depodur.

## Klasör yapısı (kısaca)

- `frontend/` — sitenin kendisi (React + Vite + Tailwind)
  - `src/components/` — bölümler ve ortak parçalar (`Home/Sections.jsx` anasayfa bölümleri, `Page/PageLayout.jsx` detay sayfası düzeni, `Page/ListParts.jsx` liste sayfası parçaları, `Footer/Footer.jsx`)
  - `src/pages/` — sayfalar
  - `src/index.css` — renkler ve yazı ölçeği (`--fs-*` değişkenleri)
  - `public/media/` — görseller
- `content/site-icerigi/` — sayfa, duyuru ve veri tabanı metinleri (Markdown). Derleme sırasında `frontend/src/data/*.json` dosyalarına dönüştürülür.
- `.github/workflows/deploy.yml` — otomatik yayın iş akışı
- `docs/` — belgeler (bu dosya dahil)

## 1. Bilgisayarda çalıştırma

```bash
cd ~/Desktop/kutuphane-kapadokya/capsule-main/frontend
npm install        # yalnızca ilk sefer ya da paketler değiştiyse
npm run dev        # http://localhost:5173 adresinde açılır
```

## 2. Değişikliği kontrol etme

Yayına göndermeden önce derlemenin hatasız geçtiğinden emin olun:

```bash
cd ~/Desktop/kutuphane-kapadokya/capsule-main/frontend
npm run build
```

`✓ built in …` yazısını görürseniz sorun yok.

## 3. Kaydetme (commit) ve yayına alma

```bash
cd ~/Desktop/kutuphane-kapadokya/capsule-main
git status                         # neler değişti
git add -A                         # tüm değişiklikleri hazırla
git commit -m "Kısa açıklama: ne değişti"
git push                           # GitHub'a gönder = yayına al
```

`git push` yapıldığı anda GitHub site otomatik olarak yeniden derleyip yayına alır. Bu yaklaşık **1–2 dakika** sürer.

### Commit mesajı nasıl yazılır?

- Tek satırda ne değiştiğini söyleyin: `Duyurular: önizleme kartlarının rengi açıldı`
- Hangi alanın değiştiğini başa yazmak sonradan bulmayı kolaylaştırır: `Footer: …`, `İletişim: …`, `Mobil: …`
- Birbirinden bağımsız işleri ayrı commit'lerde göndermek, gerektiğinde geri almayı kolaylaştırır.

## 4. Yayının bittiğini kontrol etme

- Tarayıcıda: https://github.com/abdullah-clds/kutuphane/actions → en üstteki satırda yeşil ✓ varsa yayın tamamdır, kırmızı ✗ varsa hata olmuştur.
- Terminalde:

```bash
gh run list -R abdullah-clds/kutuphane -L 3     # son yayınlar ve sonuçları
gh run view --log-failed -R abdullah-clds/kutuphane   # son başarısız yayının hata kaydı
```

Yayın bittikten sonra siteyi **Cmd + Shift + R** ile tam yenileyin (tarayıcı eski sürümü hatırlayabilir).

## 5. Geri alma

Son commit'i geri almak (yeni bir "geri alma" commit'i oluşturur, geçmiş silinmez):

```bash
cd ~/Desktop/kutuphane-kapadokya/capsule-main
git log --oneline -5      # son commit'leri listele
git revert HEAD           # en son commit'i geri al
git push
```

## Sık karşılaşılan sorunlar

| Belirti | Neden / Çözüm |
|---|---|
| `git push` sırasında `refusing to allow an OAuth App to create or update workflow` | GitHub oturumunda iş akışı izni yok. Terminalde `gh auth refresh -h github.com -s workflow` çalıştırıp tarayıcıda onaylayın, sonra yeniden `git push`. |
| Actions'ta `Rollup failed to resolve import "…"` | Kullanılan bir paket `frontend/package.json`'da yok. `cd frontend && npm install paket-adi --save`, sonra commit + push. (Üst klasördeki `package.json` yayında kullanılmaz.) |
| Görseller canlıda kırık, bilgisayarda düzgün | Kodda görsel yolu `/media/...` diye sabit yazılmış olabilir. Görselleri `media("media/...")` yardımcısıyla, HTML metinlerini `Prose` bileşeniyle gösterin; ikisi de `/kutuphane/` alt adresini ekler. |
| Canlı site eski hâliyle görünüyor | Yayın bitmemiş olabilir (Actions'a bakın) ya da tarayıcı önbelleği: **Cmd + Shift + R** veya gizli pencere. |
| Alt sayfalar (ör. /duyurular) teknik olarak "404" dönüyor ama açılıyor | GitHub Pages'in sınırı; `404.html` yedeği uygulamayı açar. Ziyaretçiyi etkilemez. Site kendi alan adına (ör. kutuphane.kapadokya.edu.tr) taşınırken sunucu tarafında tek sayfa uygulama yönlendirmesi kurulmalıdır. |

## Nasıl çalışıyor (teknik özet)

1. `main` dalına push gelir.
2. `.github/workflows/deploy.yml` çalışır: `frontend` klasöründe `npm ci` → `npm run build` (önce `scripts/build-content.mjs` içerikleri JSON'a çevirir). Derleme `VITE_BASE=/kutuphane/` ile yapılır, çünkü site bu alt adresten sunulur.
3. `dist/index.html`, `dist/404.html` olarak kopyalanır (doğrudan açılan alt sayfalar için).
4. `dist` klasörü `gh-pages` dalına gönderilir; GitHub Pages bu dalı yayınlar.
