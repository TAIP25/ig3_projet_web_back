# ig3_projet_web_back

## Description

Ce projet est un projet seul. Il s'agit d'un projet en 3ème année de Polytech Montpellier en Informatique et Gestion. Ce projet est un projet de développement d'une application web. L'application web est un jeu de gestion de ferme. Le projet est divisé en deux parties, une partie front et une partie back. Cette partie est la partie back.

## Prérequis

-   [NodeJS](https://nodejs.org/en/)
-   [Mermaid](https://mermaid-js.github.io/mermaid/#/)
-   [PostgreSQL](https://www.postgresql.org/)

## Installation

-   Cloner le projet
-   Installer les dépendances avec la commande `npm install`

## Lancement

-   Lancer le projet avec la commande `npm start`

## Diagramme de la base de donnée

```mermaid
erDiagram
    
    User one or zero -- 1 UserGame: "plays"
    Stats 0+ -- 0+ UserStats: "relates to"
    UserGame 1 -- 1 Plot: "owns"
    CropType 0+ -- 1 Crop: "has"
    UserGame 0+ -- 0+ UserStats: "has"
    Plot 0+ -- 1 Crop: "contains"
    UpgradeType 0+ -- 1 Upgrade: "relates to"
    UserGame 0+ -- 1 UserUpgrade: "has"
    Upgrade 0+ -- 1 UserUpgrade: "has"


    User {
        int userId
        string password 
        string email
        date userCreatedAt
        date userUpdatedAt
        date userDeletedAt
        bool isAdmin
    }
    UserGame {
        int userGameId
        int userPlotId
        int level
        int experience
        bigint gold
        bigint gems
    }
    UserStats {
        int userStatsId
        int statsId
        int userId
        bigint statsValue
    }
    Stats {
        int statsId
        string statsName
        int statsTypeId
        string statsDescription
        date statsCreatedAt
        date statsUpdatedAt
        date statsDeletedAt
    }
    Plot {
        int plotId
        int userId
        int plotWidth
        int plotHeight
        float plotHaste
        float plotEfficiency
        float plotBoost
    }
    Crop {
        int cropId
        int plotId
        int cropLocX
        int cropLocY
        string cropType
        int cropStage
        int cropTime
    }
    CropType {
        int cropTypeId
        string cropTypeName
        int cropTypePrice
        int cropTypeTime
    }
    Upgrade {
        int upgradeId
        int upgradeTypeId
        int upgradePrice
        int upgradeGrade
        string upgradeName
        string upgradeDescription
    }
    UpgradeType {
        int upgradeTypeId
        string upgradeTypeName
    }
    UserUpgrade {
        int userUpgradeId
        int userId
        int upgradeId
    }
```

## Auteurs

-   **Moi-même** - _Étudiant_

## License

Ce projet est sous licence GNU General Public License v3.0 - voir le fichier [LICENSE.md](LICENSE.md) pour plus de détails.

## Remerciements

-   Merci à mon professeur pour m'avoir aidé
-   Merci à mes camarades de classe pour m'avoir aidé
-   Merci à mon chat pour m'avoir aidé
-   Merci à mon ordinateur pour m'avoir aidé
-   Merci à mon clavier pour m'avoir aidé
-   Merci à mon écran pour m'avoir aidé
-   Merci à mon bureau pour m'avoir aidé
-   Merci à ma chaise pour m'avoir aidé
-   Merci à mon lit pour m'avoir aidé
-   Merci à ma table pour m'avoir aidé
-   Merci à ma lampe pour m'avoir aidé