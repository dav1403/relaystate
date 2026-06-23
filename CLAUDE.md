@AGENTS.md

# RelayState — Site vitrine immobilier Jérusalem

> Site Next.js 16 FR/EN destiné aux **acheteurs étrangers** à Jérusalem, alimenté par les leads du projet D2G.
> Fiche Notion : "RelayState" (espace Projets perso).

## Liens
- Live : https://www.relaystate.com (+ https://relaystate.vercel.app) — vérifié 23/06/2026 : 307→/fr, Vercel actif
- Repo : https://github.com/dav1403/relaystate (PUBLIC — vérifié 23/06/2026 ; toujours à passer en privé)
- Local : `C:\Users\David\AI\relaystate`

## Stack
- **Next.js 16.2.4** (App Router) — breaking changes vs Next.js 13/14 : params est une Promise, il faut l'`await`
- **next-intl** (i18n FR/EN) — routing `[locale]`, messages dans `messages/fr.json` / `messages/en.json`
- **Tailwind CSS 4** (`@import "tailwindcss"` sans config JS)
- **gray-matter** pour les articles Markdown
- Déploiement **Vercel** · DNS via API NameSilo
- Google Analytics `G-CVXHR3Q09P`
- Formulaire contact **Formspree** endpoint `xnnqwkbo` (hardcodé dans `app/[locale]/contact/page.tsx` — à vérifier si lié au bon compte)

## Architecture
```
app/
  page.tsx              ← redirect /fr
  layout.tsx            ← RootLayout minimal (pas de html/body)
  [locale]/
    layout.tsx          ← html + body + GA + Navbar/Footer + generateStaticParams
    page.tsx            ← HomePage (Hero, Deals x3, Articles x3, CTA)
    deals/page.tsx      ← liste complète des opportunités
    articles/page.tsx   ← liste des articles
    articles/[slug]/page.tsx  ← article seul (markdownToHtml interne)
    contact/page.tsx    ← formulaire "use client" → Formspree
components/             ← Navbar, Footer, DealCard, ArticleCard
lib/
  deals.ts              ← lecture data/leads.json + filtre Jérusalem + dérive sellerType
  articles.ts           ← lecture content/articles/{locale}/*.md (gray-matter)
content/articles/
  fr/ (11 articles)
  en/ (11 articles)
data/leads.json         ← copié manuellement depuis D2G (13 leads — vérifié 23/06/2026)
messages/fr.json · en.json
i18n/routing.ts · request.ts
```

## Fonctionnement — données
- Les leads viennent de **D2G** : `data/leads.json` de D2G est copié **manuellement** dans `relaystate/data/leads.json`.
- `lib/deals.ts` filtre automatiquement les biens non-Jérusalem (Nahariya, Netanya dans la data actuelle).
- `sellerType` est dérivé de `raw.adType` : "yad1" → "private", "commercial" → "agency".
- Les images Yad2 passent par Next.js `<img>` brouillée (décoratives) — pas d'optimisation image native (intentionnel : pas de prop `src` dans `<Image>` pour images externes non autorisées).

## Relations
- Dépend de D2G (source des leads). RE1V est un cousin (même domaine Yad2) mais non lié au site.
- 11 articles FR + 11 EN déjà rédigés (contenu complet), tous orientés acheteurs étrangers Jérusalem.

## Audit 12/06/2026 — corrections appliquées (NON COMMITÉES — à déployer)
- `lib/deals.ts` : ajout filtre Jérusalem (`isJerusalem`) + dérivation `sellerType` depuis `raw.adType`
- `app/[locale]/articles/[slug]/page.tsx` : réécriture de `markdownToHtml` (regex `[h|u|l]` → `[hul]` + logique de wrapping corrigée)
- ⚠️ Ces deux fichiers + `CLAUDE.md` restent non commités au 23/06/2026 (vérifié `git status`). La prod tourne encore sur le code pré-audit.

## Prochaines actions prioritaires
1. Automatiser la synchro `data/leads.json` D2G → relaystate via GitHub Action (déclenché par push D2G ou cron)
2. Configurer Formspree avec le vrai compte (endpoint actuel `xnnqwkbo` à vérifier)
3. Passer le repo en privé sur GitHub (vérifier d'abord la compatibilité Vercel)
4. Activer un vrai domaine email `contact@relaystate.com` (hardcodé dans Footer)
5. Décision stratégique : modèle de monétisation (commission courtage ? abonnement alertes ?)

## Statut (vérifié 23/06/2026)
Site live et accessible (relaystate.com, relaystate.vercel.app). Design premium terminé. Contenu éditorial complet (22 articles : 11 FR + 11 EN). Données réelles (13 leads D2G).
⚠️ Les corrections de l'audit 12/06 (deals.ts, articles/[slug]/page.tsx) ne sont PAS commitées : la prod tourne sur le code pré-audit. Aucune GitHub Action configurée (pas de CI).
Bloquants restants : commit + push des corrections d'audit, synchro auto D2G, Formspree vérifié, décision repo privé.
