# Êmmà website

Responsive static implementation of the supplied Figma prototype, including:

- Homepage: `index.html` — frame `2967:17882`
- Shop: `shop.html` — frame `3132:17857`
- Product Details: `product.html` — frame `3161:18122`
- About Us: `about.html` — frame `3653:64085`
- Tea finder: `tea-finder.html` and the homepage's inline interaction — variant `3878:76690`
- Cart drawer shared by every page — component `3459:32324`

Header, footer, product links, and breadcrumbs connect the pages. Shop includes category filters and sorting. Product Details includes a layered packaging visual, thumbnail gallery, and cart controls. Cart quantities, item selection, and totals persist on the visitor's device.

## Run locally

    python3 -m http.server 8080

## Deploy

Upload this repository’s HTML, CSS, JavaScript, and `assets/` directory to static hosting. No build step, dependencies, secrets, or backend are required.

Live website: https://emma-vietnamese-tea-khanh.brownbough1.chatgpt.site/

## Content and launch status

Original imagery and vector assets are stored locally. Fonts load from Google Fonts with system fallbacks. Product card names and the 120,000 VND / 5g pricing follow the prototype's sample content. The Shop frame contains eight visible product cards despite its original label saying “5 products”; the website displays the actual visible count and updates it with filters.

Online checkout, account authentication, newsletter delivery, official social links, and business contact details are not connected. No orders, payments, or mailing subscriptions are submitted. Existing informational placeholders remain until approved business details and services are supplied. All product cards lead to the prototype's single Tea Cube detail screen.

## Language and navigation

The header remains pinned to the viewport top while scrolling on desktop and mobile. Its homepage hero overlay becomes solid plum after scrolling. The globe control switches between English and Vietnamese, including dynamic cart, search, filter, and tea-finder content. The chosen language persists in local storage across all six pages. Original branding and packaging imagery remain intact.

## Checkout preview

`checkout.html` adds a bilingual checkout form for name, phone, delivery address, and COD / Internet Banking / MoMo selection. The cart checkout button shows a loading indicator before navigation. The checkout summary includes selected cart items only. Required fields validate before a review screen. Buyer information remains in form/review DOM state; it is not stored or sent to a server. Order submission and payment collection remain unconnected.

## Hero prototype playback

The homepage hero implements all five Figma variants (`3113:230`, `3113:280`, `3113:8126`, `3118:10025`, `3118:10045`). Prototype reactions specify a two-second hold followed by a 300 ms ease-in-out dissolve, looping back to the first scene. Direct scene selection uses the prototype's 800 ms transition. Original image assets, crops, texture layers, and per-scene indicator SVGs are local. Pause/play, keyboard scene selection, visibility handling, and reduced-motion preference are supported. English and Vietnamese cover every scene.
