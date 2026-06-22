# Petmily

一個幫助臺灣飼主尋找寵物友善場所的網頁。資料來自 [臺北市動物保護處](https://www.tcapo.gov.taipei/cp.aspx?n=0F4589261BDCB49B&s=E69595547CD21496)、[臺中市動物保護防疫處](https://www.animal.taichung.gov.tw/1521448/1521512/1521537/1521539) 的開放清單，目前涵蓋臺北市、臺中市，未來陸續擴充其他縣市。

臺灣的地圖輪廓資料來自 [taiwan.md/taiwan-shape](https://taiwan.md/taiwan-shape/) (MIT License)。

## Demo

| Desktop | Mobile |
|---------|--------|
| [![Petmily desktop](https://pub-277ae1ca0a2742a39a90fad8945c6329.r2.dev/petmily-desktop.png)](https://petmily-flame.vercel.app) | [![Petmily mobile](https://pub-277ae1ca0a2742a39a90fad8945c6329.r2.dev/petmily-mobile.png)](https://petmily-flame.vercel.app) |

Live site: [petmily-flame.vercel.app](https://petmily-flame.vercel.app)

## 為什麼做這個專案

寵物對現代多數人來說如同家人，帶寵物一起出去吃飯、旅遊越來越普遍。想帶寵物一起外出時，必須考量該場所是否允許寵物同行，但相關資訊分散在各個平台，難以系統化搜尋，因此希望做一個集中查詢的網站。

## 系統架構

資料爬取、清洗與推送透過 GitHub Actions 自動化進行（爬蟲程式碼：[petmily-crawler](https://github.com/guiril/petmily-crawler)）。爬蟲推送更新後，Vercel Deploy Hook 會自動觸發重新部署，搭配 Next.js 的 force-cache 讓資料在 build 時期靜態化，使用者讀取時不需要再呼叫 API。

## 主要功能

- 切換城市，依行政區等條件篩選場所
- 分頁瀏覽，避免一次載入過多資料
- 響應式版面，桌面版左側 Sidebar，手機版底部 Bottom Sheet

## Tech Stack

- **Next.js 16** — App Router、Server Components 讀取靜態 JSON
- **TypeScript** — 定義元件、hooks 與資料的型別
- **Tailwind CSS v4** — utility-first 響應式設計
- **d3-geo + TopoJSON** — 繪製臺灣地圖
- **Headless UI** — 使用 Modal 元件
- **Vercel** — 部署與 Deploy Hook
