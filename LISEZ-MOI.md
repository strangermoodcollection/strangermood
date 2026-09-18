# STRANGER MOOD — passage à React

Cette version reprend les six fichiers fournis. Elle utilise React et Vite, avec le thème, les contenus, les images et les règles CSS existants. Le glassmorphism et la nouvelle palette feront l'objet de l'étape suivante.

## 1. Préparer ton projet dans VS Code

Dans le terminal du dossier que tu as cloné :

```powershell
git status
git switch -c migration-react
node -v
npm -v
```

S'il existe déjà des modifications locales, conserve-les avant de remplacer des fichiers (copie de sauvegarde ou commit de ton travail). Une branche seule ne sauvegarde pas les modifications non commitées.

Vite nécessite Node.js 20.19+ ou 22.12+ ; une version LTS récente convient. Référence : https://vite.dev/guide/

## 2. Installer cette version

Décompresse l'archive. Copie **le contenu** du dossier `stranger-mood-react` à la racine de ton projet cloné (pas le dossier entier dans un sous-dossier). Accepte le remplacement de `index.html` et `client.html` après sauvegarde.

Tu dois voir `package.json`, `vite.config.js`, `index.html`, `client.html` et `src` au même niveau que ton dossier `.git`. Conserve ton dossier `.git` et les autres fichiers propres à ton dépôt.

Si ton dépôt possède déjà un `package.json` ou une configuration de déploiement, compare-les avant de remplacer : cette archive a été préparée à partir des six fichiers joints, sans accès à ces éventuels fichiers supplémentaires.

Les anciens `script.js`, `membres.js`, `style.css` et `panier.css` à la racine ne sont plus chargés. Tu peux les archiver hors du projet pour éviter de modifier le mauvais fichier. Les versions actives se trouvent désormais dans `src`.

Puis exécute :

```powershell
npm install
npm run dev
```

Ouvre l'adresse affichée dans le terminal, généralement `http://localhost:5173`. Garde ce terminal ouvert. Pour l'arrêter : `Ctrl+C`.

N'utilise plus Live Server ou un double-clic sur `index.html` : Vite transforme le JSX et charge les modules React.

## 3. Comprendre ce qui a changé

| Avant | Maintenant | Rôle |
| --- | --- | --- |
| `index.html` avec toute la boutique | `src/App.jsx` et `src/components/` | Composition de la page en composants |
| `script.js` : tableaux produits | `src/data/produits.js` | Modifier noms, prix, descriptions et images |
| `script.js` : panier et thème | `src/hooks/useStoredState.js` | État React et conservation dans le navigateur |
| `script.js` : livraison | `src/components/DeliveryModal.jsx` et `src/data/livraison.js` | Formulaire, communes, pays et numéro WhatsApp |
| `membres.js` | `src/data/membres.js` | Données et recherche des membres |
| `client.html` : carte générée en JavaScript | `src/pages/ClientPage.jsx` | Carte membre en React |
| `style.css` | `src/styles/style.css` | CSS boutique, copié à l'identique |
| `panier.css` | `src/styles/panier.css` | CSS panier/livraison, copié à l'identique |
| CSS intégré dans `client.html` | `src/styles/client.css` | CSS carte membre, extrait sans refonte |

`src/main.jsx` démarre la boutique. `src/client.jsx` démarre la page membre. Les deux entrées sont compilées par Vite : les liens `client.html?id=SM-0001` continuent de fonctionner, y compris après compilation, sans règle spéciale de routage.

Un composant est une fonction qui renvoie du JSX (une syntaxe proche du HTML). Les classes deviennent `className`, les clics deviennent `onClick`, et `useState` contient ce qui change à l'écran. Par exemple :

```jsx
const [query, setQuery] = useState('');
<input value={query} onChange={event => setQuery(event.target.value)} />
```

React met l'affichage à jour à partir de cet état. Les anciennes constructions `innerHTML` et les fonctions globales des attributs `onclick` ne sont plus utilisées.

## 4. Le CSS : priorité à la continuité

Les deux feuilles CSS de la boutique sont conservées octet pour octet. Leurs classes et leur ordre de chargement sont conservés. Le CSS de la carte membre est chargé uniquement sur sa page pour éviter les conflits.

Pour l'instant, modifie uniquement les fichiers dans `src/styles/`. Il n'y a ni Tailwind ni bibliothèque graphique supplémentaire.

Après validation de cette migration, nous pourrons :

1. Définir les couleurs communes dans `src/styles/theme.css` (`:root` et `body.dark`).
2. Remplacer les couleurs répétées par des variables CSS en gardant d'abord les mêmes valeurs.
3. Fixer la palette définitive et les valeurs communes de transparence, flou, bordures et ombres.
4. Appliquer le glassmorphism aux composants en utilisant ces variables, sans refaire chaque couleur séparément.

Cette archive ne choisit pas encore de nouvelle palette.

## 5. Vérifier dans ton navigateur

- Retrouver la disposition, les images et les textes sur ordinateur et mobile.
- Chercher `freedom`, puis effacer la recherche.
- Ajouter des articles, ouvrir Menu → Panier, augmenter/diminuer les quantités et recharger la page.
- Ouvrir un petit produit, puis l'ajouter au panier.
- Tester les trois zones de livraison : Abidjan, hors Abidjan et international.
- Vérifier le récapitulatif avant le bouton « Valider et envoyer ». Ce bouton ouvre WhatsApp avec un message préparé ; l'envoi final se fait dans WhatsApp.
- Basculer le thème clair/sombre et recharger.
- Tester `SM-0001`, `SM-0002` et un identifiant inexistant.

Le panier et le thème utilisent les mêmes clés de stockage qu'avant. Attention : le stockage du navigateur est propre à chaque adresse ; celui du site en ligne ne sera pas automatiquement présent sur localhost.

Le fonctionnement membre reste celui du projet original : données statiques côté navigateur, pas de connexion sécurisée à un serveur. Les images et polices gardent leurs URL externes. Les boutons Acheter/Explorer du grand visuel et les liens de pied de page gardent leurs destinations ou leur absence d'action d'origine.

## 6. Compiler

```powershell
npm run build
npm run preview
```

La compilation crée `dist/`, avec `index.html`, `client.html` et les ressources. Si tu publies ultérieurement cette version, il faudra publier le contenu de `dist/`, et non simplement les fichiers source JSX. Aucun déploiement n'est effectué ici.

Pour revoir les changements dans ton dépôt :

```powershell
git status
git diff --stat
```

Le fichier `package-lock.json` fixe les versions installées. Conserve-le dans Git. `node_modules/` et `dist/` sont exclus par `.gitignore`.

## Vérifications réalisées sur cette livraison

- Compilation de production réussie (`npm run build`).
- Comparaison binaire réussie des deux feuilles CSS boutique avec les fichiers fournis.
- Tests DOM automatisés réussis : recherche, ajout/retrait et quantités, persistance du panier, thème, mini-produits, trois zones de livraison, validation des champs, URL WhatsApp encodée, membre valide/invalide et stockage panier malformé.
- Les ouvertures WhatsApp ont été interceptées pendant les tests : aucun message envoyé.
- Le navigateur de test n'a pas pu être installé dans cet environnement. La comparaison visuelle ordinateur/mobile reste à effectuer ; la compilation et les tests DOM ne garantissent pas à eux seuls un rendu pixel pour pixel identique.
