# ig3_projet_web_back

## Description

Ce projet est un projet seul. Il s'agit d'un projet en 3ème année de Polytech Montpellier en Informatique et Gestion. Ce projet est un projet de développement d'une application web. L'application web est un jeu de gestion de ferme. Le projet est divisé en deux parties, une partie front et une partie back. Cette partie est la partie back. La partie front est disponible [ici](https://github.com/TAIP25/ig3_projet_web_front)

## Prérequis

-   [NodeJS](https://nodejs.org/en/) (ma version : v12.22.9)
-   [Mermaid](https://mermaid-js.github.io/mermaid/#/) (pour visualiser les différents diagrammes, il existe une extension pour VSCode)
-   [PostgreSQL](https://www.postgresql.org/) (ma version : 14.7)

### Principales dépendances

-   [Express](https://expressjs.com/fr/) (framework NodeJS)
-   [Sequelize](https://sequelize.org/) (ORM)
-   [JWT](https://jwt.io/) (pour l'authentification)
-   [Bcrypt](https://www.npmjs.com/package/bcrypt) (pour le hashage des mots de passe)
-   [Dotenv](https://www.npmjs.com/package/dotenv) (pour la gestion des variables d'environnement)

## Setup le projet
### Installation

-   Cloner le projet
-   Installer les dépendances avec la commande `npm install`

### Setup du .env

    #Ici on crée la variable d'environnement qui permet de se connecter à la base de donnée
    DB_NAME=nom_base_de_donnees
    DB_USER=nom_utilisateur
    DB_PASSWORD=mot_de_passe
    DB_HOST=nom_hote
    DB_PORT=port

    #Ici on crée la variable d'environnement qui permet de donner le privilège admin à l'utilisateur qui s'inscrit avec le bon mot de passe admin
    ADMIN_PASSWORD=mot_de_passe_admin

    #Ici on crée la variable d'environnement qui permet de créer un jeton d'authentification via jwt
    JWT_SECRET=mot_de_passe_jwt

    #Ici on crée la variable d'environnement qui permet de setup le cors
    CLIENT_URL=nom_domaine

### Aide pour la base de donnée

Démarer le service postgresql

    sudo service postgresql start

Se connecter à postgresql
    
    psql -h nom_hote -p port -U nom_utilisateur -d nom_base_de_donnees

(Attention pour la table User il faut mettre "User" car "user" est un mot clé de postgresql)

### Lancement

-   Créer un fichier `.env` à la racine du projet avec les variables d'environnement expliquées ci-dessus
-   Créer une base de donnée
-   Lancer la base de donnée avec la commande `sudo service postgresql start`
-   Lancer le projet avec la commande `npm run start`


## Diagramme de la base de donnée

```mermaid
erDiagram
    
    User one or zero -- 1 UserGame: "plays with"
    UserGame 0+ -- 1 UserStat: "has"
    UserGame 0+ -- 1 UserCrop: "owns"
    UserStat 1 -- 0+ Stat: "relates to"
    UserCrop 1 -- 0+ Crop: "relates to"
    


    User {
        UUID userId
        STRING email
        STRING password 
        BOOLEAN isAdmin
        DATEONLY userCreatedAt
        DATEONLY userUpdatedAt
    }

    UserGame {
        UUID userGameId
        STRING userGameName
        BIGINT userGameCropLimit
        BIGINT userGameMoney
        BIGINT userGameToken
        DATE userGameLastRequest
    }

    UserCrop {
        UUID userCropId
        UUID userGameId
        UUID cropId
        BIGINT userCropQuantity
    }

    UserStat {
        UUID userStatId
        UUID statId
        UUID userGameId
        BIGINT userStatValue
    }

    Stat {
        UUID statId
        STRING statName
        STRING statDescription
    }

    Crop {
        UUID cropId
        STRING cropName
        STRING cropPNGName
        INTEGER cropTier
        BIGINT cropMoneyPrice
        BIGINT cropTokenPrice
        BIGINT cropMoneyEarning
        BIGINT cropAmountEarningOneToken
    }
```

## Informations sur les cultures

- Navet
    - Tier : 1
    - Price : $5 + €250
    - Rendement : $1/200Navets + €10/Navet
- Rose
    - Tier : 2
    - Price : $10 + €1.50K
    - Rendement : $1/199Roses + €15/Rose
- Comcombre
    - Tier : 3
    - Price : $15 + €5.00K
    - Rendement : $1/198Comcombres + €25/Comcombre 
- Tuli
    - Tier : 4
    - Price : $20 + €25.00K
    - Rendement : $1/197Tulis + €50/Tuli
- Tomate
    - Tier : 5
    - Price : $25 + €75.00K
    - Rendement : $1/196Tomates + €75/Tomate
- Melon
    - Tier : 6
    - Price : $30 + €175.00K
    - Rendement : $1/194Melons + €100/Melon
- Aubergine
    - Tier : 7
    - Price : $35 + €500.00K
    - Rendement : $1/192Aubergines + €150/Aubergine
- Citron
    - Tier : 8
    - Price : $40 + €1.10M
    - Rendement : $1/190Citrons + €200/Citron
- Ananas
    - Tier : 9
    - Price : $45 + €2.15M
    - Rendement : $1/188Ananas + €250/Ananas
- Riz
    - Tier : 10
    - Price : $50 + €4.50M
    - Rendement : $1/186Riz + €325/Riz
- Blé
    - Tier : 11
    - Price : $55 + €9.00M
    - Rendement : $1/183Blés + €400/Blé
- Raisin
    - Tier : 12
    - Price : 60 + €15.50M
    - Rendement : $1/180Raisins + €500/Raisin
- Fraise
    - Tier : 13
    - Price : $65 + €42.00M
    - Rendement : $1/177Fraises + €750/Fraise
- Manioc
    - Tier : 14
    - Price : $70 + €88.50M
    - Rendement : $1/174Maniocs + €1.00K/Manioc
- Patate
    - Tier : 15
    - Price : $75 + €235.00M
    - Rendement : $1/171Patates + €1.50K/Patate
- Café
    - Tier : 16
    - Price : $80 + €750.00M
    - Rendement : $1/167Cafés + €2.50K/Café
- Orange
    - Tier : 17
    - Price : $85 + €1.75B
    - Rendement : $1/163Oranges + €3.50K/Orange
- Avocat
    - Tier : 18
    - Price : $90 + €4.00B
    - Rendement : $1/159Avocats + €5.00K/Avocat
- Maïs
    - Tier : 19
    - Price : $95 + €10.50B
    - Rendement : $1/155Maïs + €7.50K/Maïs
- Tournesol
    - Tier : 20
    - Price : $100 + €21.00B
    - Rendement : $1/151Tournesols + €10.00K/Tournesol

## Auteurs

-   **Moi-même** - _Étudiant à Polytech Montpellier_

## License

Ce projet est sous licence GNU General Public License v3.0 - voir le fichier [LICENSE.md](LICENSE.md) pour plus de détails.