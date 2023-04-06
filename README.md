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
    Stat 0+ -- 0+ UserStat: "relates to"
    UserGame 1 -- 1 Plot: "owns"
    CropType 0+ -- 1 Crop: "has"
    UserGame 0+ -- 0+ UserStat: "has"
    Plot 0+ -- 1 Crop: "contains"
    UpgradeType 0+ -- 1 Upgrade: "relates to"
    UserGame 0+ -- 1 UserUpgrade: "has"
    Upgrade 0+ -- 1 UserUpgrade: "has"


    User {
        int userId
        string email
        string password 
        bool isAdmin
        date userCreatedAt
        date userUpdatedAt
        date userDeletedAt
    }
    UserGame {
        int userGameId
        string username
        int level
        bigint experience
        bigint gold
        bigint gems
    }
    UserStat {
        int userStatId
        int statId
        int userGameId
        bigint statValue
    }
    Stat {
        int statId
        string statName
        int statTypeId
        string statDescription
    }
    Plot {
        int plotId
        int plotWidth
        int plotHeight
        float plotSpeed
        float plotEfficiency
        float plotBoost
    }
    Crop {
        int cropId
        int plotId
        int cropLocX
        int cropLocY
        string cropType
    }
    CropType {
        int cropTypeId
        string cropTypeName
        int statLevelRequired
        int cropTypePrice
        int cropTypeEarning
        int cropTypeExperience
        int cropTypeTime
        int cropTypeDescription
    }
    UserUpgrade {
        int userUpgradeId
        int userId
        int upgradeId
    }
    Upgrade {
        int upgradeId
        int upgradeTypeId
        string upgradeName
        int upgradeLevelRequired
        int upgradeGrade
        int upgradePrice
        string upgradeDescription
    }
    UpgradeType {
        int upgradeTypeId
        string upgradeTypeName
        bool upgradePriceType
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