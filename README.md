# Nova Grove

Premium botanical provisions website with a product shop, digital membership, story, journal, and contact pages.

## Run locally

Requires Node.js 22.13+ and pnpm 11.25.0.

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open the local URL printed in the terminal.

```sh
pnpm build
pnpm start
```

## Source guide

- `app/`: page routes and styles, including Satoshi typography.
- `components/`: navigation, cart, forms, and reusable UI.
- `public/`: image assets, including the homepage hero.
- `app/page.tsx` and `app/globals.css`: homepage composition and corrected full-height hero background.

This is the current Sites implementation, using React, TypeScript, Vinext/Vite, and Tailwind. The production build targets a Cloudflare Worker; importing it into another hosting provider may require adapter/configuration changes.

The `.openai/hosting.json` file retains the original Sites project association; it is not a credential. External font/image URLs require an internet connection. This source export does not provision payment processing, membership billing, or a contact-delivery backend.

The original framework notes are in `FRAMEWORK_NOTES.md`.
