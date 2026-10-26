# Héberger le site ailleurs que sur Lovable

Le site a besoin de **Node.js 22 ou plus**. L'hébergeur est choisi avec la variable `NITRO_PRESET`.

| Hébergeur | Réglage |
|---|---|
| Netlify | Rien à faire : `netlify.toml` est fourni. |
| Vercel | Variable `NITRO_PRESET=vercel`, commande `npm run build`. |
| Serveur Node (VPS, OVH, o2switch…) | `NITRO_PRESET=node-server npm run build`, puis `node .output/server/index.mjs` (port via `PORT`). |
| Cloudflare | Réglage par défaut, aucune variable. |

## Carte Google Maps
La clé Google Maps actuelle ne fonctionne que sur les domaines Lovable : ailleurs, un lien « Voir l'atelier sur Google Maps » s'affiche à la place de la carte.
Pour afficher la carte sur votre domaine : créez votre propre clé dans Google Cloud (API « Maps Embed »), limitez-la à votre domaine, mettez-la dans la variable `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY` chez l'hébergeur, et ajoutez votre domaine dans `mapsEmbedAllowed()` (`src/components/site/MapEmbed.tsx`).
