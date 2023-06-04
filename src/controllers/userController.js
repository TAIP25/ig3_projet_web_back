const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User, UserGame, UserCrop } = require('../models/index');

require('dotenv').config();

// Fonction qui permet de créer un cookie d'authentification
createAuthCookie = (res, userId) => {
    // Création d'un token d'authentification
    const payload = { userId: userId };
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret, { expiresIn: '1w' });

    return token;
}


exports.createUser = (req, res, next) => {

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Vérification des champs obligatoires
    if(req.body.email === ""  || req.body.password === "") {
        return res.status(400).json({
            severity: "error",
            result: "Les champs obligatoires ne sont pas remplis, veuillez réessayer"
        });
    }

    else if (req.body.password.length < 5) {
        return res.status(400).json({
          severity: "error",
          result: "Le mot de passe doit comporter au moins 5 caractères",
        });
    }      

    else if (!isValidEmail(req.body.email)) {
        return res.status(400).json({
            severity: "error",
            result: "L'adresse email n'est pas valide",
        });
    }

    // Création d'un compte
    else if(req.body.adminCode === "" || req.body.adminCode === process.env.ADMIN_PASSWORD) {
        // Longueur du sel pour le hashage du mot de passe
        const bcryptSalt = 10;

        // Hashage du mot de passe
        bcrypt.hash(req.body.password, bcryptSalt)
        .then(hash => {
            return User.create({
                email: req.body.email,
                password: hash,
                isAdmin: req.body.adminCode === process.env.ADMIN_PASSWORD
            })
        })
        .then(result => {
            // Création d'un UserGame
            return UserGame.create({
                userGameId: result.dataValues.userId,
                userGameMoney: 10000,
                userGameToken: 50000
            }).then(() => {
                return result;
            });
        })
        .then(result => {
            if(result.dataValues.isAdmin){
                console.log("Compte administrateur créé avec succès");
                return res.status(201).json({
                    severity: "success",
                    result: "Compte administrateur créé avec succès",
                    admin: result.dataValues.isAdmin,
                    token: createAuthCookie(res, result.dataValues.userId)
                });
            }
            else{
                console.log("Compte utilisateur créé avec succès");
                return res.status(201).json({
                    severity: "success",
                    result: "Compte utilisateur créé avec succès",
                    admin: result.dataValues.isAdmin,
                    token: createAuthCookie(res, result.dataValues.userId)
                });
            }
        })
        .catch(err => {
            if(err.name === "SequelizeUniqueConstraintError"){
                if(err.errors[0].message === "email must be unique"){
                    return res.status(409).json({
                        severity: "error",
                        result: "Cet email est déjà utilisé, veuillez réessayer"
                    });
                }
            }
            // Si l'erreur n'est pas gérée alors on renvoie une erreur interne du serveur
            // TODO: Ajouter un système de log pour enregistrer les erreurs dans un fichier
            console.log(err);
            console.log(err.name)
            return res.status(500).json({
                severity: "error",
                result: "Erreur interne du serveur, veuillez réessayer"
            });
        });
    }

    // Si le code administrateur n'est pas bon
    else if(req.body.adminCode !== process.env.ADMIN_PASSWORD){
        return res.status(400).json({
            severity: "error",
            result: "Le code administrateur n'est pas bon, veuillez réessayer"
        });
    }

    // Si aucun des cas précédent n'est valide alors c'est une mauvaise requête
    else{
        return res.status(400).json({
            severity: "error",
            result: "Mauvaise requête, veuillez réessayer"
        });
    }
};

exports.loginUser = (req, res, next) => {

    // Vérification des champs obligatoires
    if(req.body.email === ""  || req.body.password === "") {
        return res.status(400).json({
            severity: "error",
            result: "Les champs obligatoires ne sont pas remplis, veuillez réessayer"
        });
    }

    else{
        User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if(!user){
                // On rejette la promesse, le catch s'occupe de renvoyer l'erreur
                return Promise.reject({
                    code: 400,
                    severity: "error",
                    result: "Cet email n'existe pas, veuillez réessayer"
                });
            }
            return bcrypt.compare(req.body.password, user.dataValues.password)
            .then(correctPassword => {
                return { correctPassword: correctPassword, userId: user.dataValues.userId, isAdmin: user.dataValues.isAdmin };
            });
        })
        .then(({correctPassword, userId, isAdmin}) => {
            if(!correctPassword){
                // On rejette la promesse, le catch s'occupe de renvoyer l'erreur
                return Promise.reject({
                    code: 400,
                    severity: "error",
                    result: "Le mot de passe est incorrect, veuillez réessayer"
                });
            }
            else{
                return res.status(200).json({
                    severity: "success",
                    result: "Connexion réussie",
                    admin: isAdmin,
                    token: createAuthCookie(res, userId)
                });
            }
        })
        .catch(err => {
            if(err.code !== undefined){
                return res.status(err.code).json({
                    severity: err.severity,
                    result: err.result
                });
            }
            // Si l'erreur n'est pas gérée alors on renvoie une erreur interne du serveur
            // TODO: Ajouter un système de log pour enregistrer les erreurs dans un fichier
            console.log(err);
            console.log(err.name);
            return res.status(500).json({
                severity: "error",
                result: "Erreur interne du serveur, veuillez réessayer"
            });
        });
    }
};

exports.updateUser = (req, res, next) => {
    if(!req.params.email) {
        return res.status(400).json({
            error: "Missing email parameter"
        });
    }
    else if (!req.body.password || !req.body.newEmail) {
        return res.status(400).json({
            error: "Missing password or newEmail parameter"
        });
    }
    
    User
    .findOne({
        where: {
            email: req.params.email
        }
    })
    .then(user => {
        if(req.body.password){
            user.password = req.body.password;
        }
        if(req.body.newEmail){
            user.email = req.body.newEmail;
        }
        user.userUpdatedAt = Sequelize.literal('NOW()');
        return user.save();
    })
    .then(result => {
        res.status(200).json({
            result: result
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
};

exports.getAllUsers = (req, res, next) => {
    if(req.isAdmin === true){
        User
        .findAll()
        .then(users => {
            res.status(200).json({
                users: users
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    }
    else{
        res.status(401).json({
            severity: "error",
            result: "Vous n'êtes pas autorisé à accéder à cette ressource"
        });
    }
};

exports.deleteUser = (req, res, next) => {
    console.log(req.params.userId);
    if(!req.params.userId) {
        return res.status(400).json({
            severity: "error",
            result: "Missing userId parameter"
        });
    }

    if(req.isAdmin === false){
        return res.status(401).json({
            severity: "error",
            result: "Vous n'êtes pas autorisé à accéder à cette ressource"
        });
    }

    User.destroy({
        where: {
            userId: req.params.userId
        }
    })
    .then(result => {
        return UserCrop.destroy({
            where: {
                userGameId: req.params.userId
            }
        }).catch(err => {
            console.log(2);
            return Promise.reject({
                code: 500,
                severity: "error",
                result: "Erreur interne du serveur, veuillez réessayer"
            });
        });
    })
    .then(result => {
        return UserGame.destroy({
            where: {
                userGameId: req.params.userId
            }
        }).catch(err => {
            console.log(1);
            return Promise.reject({
                code: 500,
                severity: "error",
                result: "Erreur interne du serveur, veuillez réessayer"
            });
        });
    })
    .then(result => {
        return res.status(200).json({
            severity: "success",
            result: "Utilisateur supprimé avec c'est dépendances supprimées avec succès"
        });
    })
    .catch(err => {
        if(err.code !== undefined){
            console.log(3);
            return res.status(err.code).json({
                severity: err.severity,
                result: err.result
            });
        }
        // Si l'erreur n'est pas gérée alors on renvoie une erreur interne du serveur
        // TODO: Ajouter un système de log pour enregistrer les erreurs dans un fichier
        console.log(err);
        console.log(err.name);
        return res.status(500).json({
            severity: "error",
            result: "Erreur interne du serveur, veuillez réessayer"
        });
    });
};