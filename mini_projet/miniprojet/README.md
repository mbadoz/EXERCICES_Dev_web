# Générateur de tableau de besoins en protéines

Application React qui génère un tableau des besoins journaliers en protéines selon le poids et l'objectif sportif.

---

## Récupérer le projet

**Option 1 — Cloner avec Git**
```bash
git clone https://github.com/ton-utilisateur/ton-repo.git
cd miniprojet
```

**Option 2 — Télécharger le ZIP**

Sur la page GitHub du projet : `Code` → `Download ZIP`, puis extraire le dossier et l'ouvrir dans un terminal.

---

## Lancer le projet

```bash
npm install
npm run dev
```

Ouvrir ensuite `http://localhost:5173` dans le navigateur.

---

## Utilisation

1. Cocher un ou plusieurs objectifs
2. Renseigner un poids minimum et maximum (en kg)
3. Choisir le nombre de lignes à afficher
4. Cliquer sur **Afficher le tableau**
5. (Optionnel) Cliquer sur **Exporter en CSV** pour télécharger le tableau

---

## Règles de calcul

Le besoin en protéines se calcule ainsi :

```
besoin (g/jour) = poids (kg) × coefficient
```

| Objectif | Coefficient min | Coefficient max |
|---|---|---|
| Sédentaire | 0,8 | 1,0 |
| Endurance | 1,2 | 1,6 |
| Conservation musculaire | 1,6 | 1,8 |
| Prise de masse | 1,8 | 2,2 |

Les poids affichés sont répartis uniformément entre le poids min et le poids max.

Exemple : min 50 kg, max 100 kg, 6 lignes → 50, 60, 70, 80, 90, 100 kg.
