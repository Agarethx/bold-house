This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Revalidación de contenido (Sanity → Next.js)

El sitio usa **ISR** (revalidación cada 60 segundos) para que el contenido de Sanity se actualice sin recompilar. Para actualizaciones **inmediatas** al publicar en Sanity, configura un webhook:

1. **Genera un secreto** (una sola vez):
   ```bash
   openssl rand -hex 32
   ```

2. **Añade a `.env.local`**:
   ```
   REVALIDATION_SECRET=<el-secreto-generado>
   ```

3. **Crea el webhook en Sanity**:
   - Ve a [sanity.io/manage](https://sanity.io/manage) → tu proyecto → **API** → **Webhooks**
   - **Create webhook**
   - **Name**: `Revalidar sitio`
   - **URL**: `https://tu-dominio.com/api/revalidate` (en local: usa [ngrok](https://ngrok.com) o similar)
   - **Dataset**: `production`
   - **Trigger on**: Create, Update, Delete
   - **HTTP Headers** → Add header:
     - Name: `Authorization`
     - Value: `Bearer <REVALIDATION_SECRET>`
   - **Filter** (opcional, para solo contenido público):
     ```
     _type in ["blogPost", "service", "portfolioItem", "client", "siteConfig", "navigation"]
     ```
   - **Projection** (opcional, para revalidar páginas específicas):
     ```
     { _type, "slug": slug.current }
     ```

4. **Despliega** y asegúrate de que `REVALIDATION_SECRET` esté en las variables de entorno de producción (Vercel, etc.).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# bold-house
