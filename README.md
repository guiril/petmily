# Petmily

A web app that helps pet owners in Taiwan discover pet-friendly venues, built with data sourced from [臺北市動物保護處](https://www.tcapo.gov.taipei/cp.aspx?n=0F4589261BDCB49B&s=E69595547CD21496)、[臺中市動物保護防疫處](https://www.animal.taichung.gov.tw/1521448/1521512/1521537/1521539).

Taiwan map shape data from [taiwan.md/taiwan-shape](https://taiwan.md/taiwan-shape/) (MIT License).

## Demo

| Desktop | Mobile |
|---------|--------|
| [![Petmily desktop](https://pub-277ae1ca0a2742a39a90fad8945c6329.r2.dev/petmily-desktop.png)](https://petmily-flame.vercel.app) | [![Petmily mobile](https://pub-277ae1ca0a2742a39a90fad8945c6329.r2.dev/petmily-mobile.png)](https://petmily-flame.vercel.app) |

Live site: [petmily-flame.vercel.app](https://petmily-flame.vercel.app)

## Features

- Filter venues by service type, pet type, and district
- Paginated results
- Responsive layout — sidebar on desktop, bottom sheet on mobile

## Tech Stack

- **Next.js 16** — App Router, Server Components for static JSON data fetching
- **TypeScript** — strict typing across components, hooks, and data models
- **Tailwind CSS v4** — utility-first styling with responsive layout
