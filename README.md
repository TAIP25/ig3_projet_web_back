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
    Stat 0+ -- 1 UserStat: "relates to"
    UserGame 1 -- 1 Plot: "owns"
    CropType 0+ -- 1 Crop: "has"
    UserGame 0+ -- 1 UserStat: "has"
    Plot 0+ -- 1 Crop: "contains"
    UpgradeType 0+ -- 1 Upgrade: "relates to"
    UserGame 0+ -- 1 UserUpgrade: "has"
    Upgrade 0+ -- 1 UserUpgrade: "has"


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
        STRING username
        INTEGER level
        BIGINT experience
        BIGINT gold
        BIGINT diamond
    }
    UserStat {
        UUID userStatId
        UUID statId
        UUID userGameId
        BIGINT statValue
    }
    Stat {
        UUID statId
        STRING statName
        STRING statDescription
    }
    Plot {
        UUID plotId
        INTEGER plotWidth
        INTEGER plotHeight
        FLOAT plotSpeed
        FLOAT plotEfficiency
        FLOAT plotBoost
    }
    Crop {
        UUID cropId
        UUID plotId
        UUID cropTypeId
        INTEGER cropLocX
        INTEGER cropLocY
        
    }
    CropType {
        UUID cropTypeId
        STRING cropTypeName
        INTEGER cropTypeLevelRequired
        INTEGER cropTypePrice
        INTEGER cropTypeEarning
        INTEGER cropTypeExperience
        INTEGER cropTypeTime
        INTEGER cropTypeDescription
    }
    UserUpgrade {
        UUID userUpgradeId
        UUID userGameId
        UUID upgradeId
    }
    Upgrade {
        UUID upgradeId
        UUID upgradeTypeId
        STRING upgradeName
        INTEGER upgradeLevelRequired
        INTEGER upgradeGrade
        INTEGER upgradePrice
        STRING upgradeDescription
    }
    UpgradeType {
        UUID upgradeTypeId
        STRING upgradeTypeName
        BOOLEAN upgradePriceType
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