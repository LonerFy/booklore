# BookLore

Démo en ligne de BookLore, l'application de bibliothèque du département IRT (TP Laravel).

Site statique pour GitHub Pages : les livres, auteurs, rayons et prêts sont des exemples,
et ce que vous ajoutez reste enregistré dans votre navigateur. L'application complète (PHP, base de données)
tourne avec Laravel, en local.

## Images des auteurs

Déposez une image JPG par auteur dans `portraits/`, nommée d'après l'auteur (la liste exacte est dans
`portraits/LISEZMOI.txt`, par exemple `chinua-achebe.jpg`). Sans image, l'auteur garde son ex-libris.

## Photos de couvertures

Elles sont servies depuis `covers/`, un fichier par ISBN. Pour les (re)télécharger depuis Open Library :

```
node outils/couvertures.mjs
```

Un livre sans photo garde sa couverture en toile dessinée.
