<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

<!-- Règles techniques -->
- Géolocalisation : détection de commune 100 % côté client (coordonnées des communes dans `src/lib/site.ts`, calcul de distance local) — aucun appel facturable Google Maps pour la détection. La carte utilise Maps Embed via la clé navigateur du connecteur Google Maps ; hors domaine Lovable, `MapEmbed` affiche un lien Google Maps au lieu de l'iframe.

- Hosting: build target comes from the NITRO_PRESET env var (Cloudflare default; netlify.toml sets netlify) and build-time prerendering stays disabled — why: prerender fails on non-Cloudflare presets.
