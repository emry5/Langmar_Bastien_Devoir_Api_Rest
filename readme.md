# Api port de plaisance Russel

## Description

Application Node.js permettant la gestion:

- des catways
- des utilisateurs
- des reservations

L'application possède:

- une API REST
- une interface utilisateur en EJS

Fonctionnement:

- Cette API permet à l'utilisateur de se connecter, afin d'être redirigé vers un tableau de bord (dashboard.ejs).
- À partir de celui ci, il aura accès à d'autres pages lui permettant d'accèder aux opérations CRUD dont il aura besoin(catways.ejs, reservations.ejs et users.ejs).

- À partir du menu l'utilisateur peut se déconnecter et être redirigé vers la page d'acceuil via le bouton "deconnexion".

---

## Installation

```bash
npm install
```

## Lancement

```bash
npm start
```

## Technologies utilisées

- Node.js
- Express
- MongoDB
- Mongoose
- EJS

## Routes principales

Catways:

- GET /catways (liste des catways)
- GET / catways/:id (rechercher un catway à partir d'un identifiant)
- POST /catways (ajouter un catway)
- PUT /catways/:id (modifier un catway à partir d'un identifiant)
- DELETE /catways/:id (supprimer un catway à partir d'un identifiant)

Users:

- GET /users/ (liste des utilisateurs)
- GET /users/:email (rechercher un catway à partir d'un email)
- POST /users/ (ajouter un utilisateur)
- PUT /users/:email (modifier un utilisateur à partir d'un email)
- DELETE /users/:email (supprimer un utilisateur à partir d'un email)

Reservations:

- GET /catways/:id/reservations (liste des reservations)
- GET /catway/:id/reservations/:idReservation (recherche de reservation par identidiant)
- POST /catways/:id/reservations (ajout de reservation)
- PUT /catways/:id/reservations (modifier une reservation)
- DELETE /catway/:id/reservations/:idReservation (supprimer une reservation par identifiant)

Authentification, connexion, deconnexion:

- POST /login
- GET /logout

## Schema de l'API:

<!--
Page d'accueil(index.ejs) -> dashboard.ejs  -> Catways(catways.ejs)
                                            -> Reservations (reservation. ejs)
                                            -> Utilisateurs (users.ejs)

                                            -> Deconnexion -> retour (index.ejs)
-->
