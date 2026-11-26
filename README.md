# Digital Portfolio

Portfolio 3D immersif (React + Three.js + Tailwind) — bilingue FR/EN.

## Prérequis

- **Node.js 20 ou supérieur**
- Un navigateur avec **WebGL** activé (la scène 3D en dépend ; sans WebGL, le site affiche un repli sans 3D)

## Lancement local

```bash
npm install
npm run dev        # serveur de développement (Vite)
```

## Build de production

```bash
npm run build      # vérification TypeScript + build Vite dans dist/
npm run preview    # sert le build sur http://localhost:4173
```

## Tests

```bash
npm test           # vitest (exécution unique)
npm run test:watch # mode watch
```

## Configuration

Tout le contenu d'identité se trouve dans `src/config/portfolio.config.ts`.

- **Réseaux sociaux** : `social.github` et `social.linkedin` valent `'#'` (placeholders). Tant qu'ils restent `'#'` ou vides, les liens ne sont pas affichés. Remplacez-les par les vraies URLs (`https://...`) pour les activer.
- **`siteUrl`** : valeur actuelle `https://portfolio.local` (à remplacer). Elle n'est pas injectée automatiquement dans le sitemap (statique) : mettez à jour manuellement `public/sitemap.xml` (`<loc>`) et la ligne `Sitemap:` de `public/robots.txt` avec votre domaine de production.
- **Projets, expérience, compétences** : `src/data/`.
- **Audio** : désactivé par défaut, activation manuelle via le bouton dans la navigation.
