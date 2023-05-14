const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User } = require('../models/index');

require('dotenv').config();





//const validator = require('validator');

// TODO:
// vérifier l'email etc.

// status 200 = OK
// status 201 = Created
// status 400 = Bad Request
// status 409 = Conflict
// status 500 = Internal Server Error

// Fonction pour gérer les erreurs lors de la création d'un compte utilisateur
handleCreateUserError = (err, res) => {
    // A finir + le faire aussi pour la création d'un compte admin + le mettre dans une fonction
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
    return res.status(500).json({
        severity: "error",
        result: "Erreur interne du serveur, veuillez réessayer"
    });
}

exports.createUser = (req, res, next) => {

    // Vérification des champs obligatoires
    if(req.body.email === ""  || req.body.password === "") {
        return res.status(400).json({
            severity: "error",
            result: "Les champs obligatoires ne sont pas remplis, veuillez réessayer"
        });
    }

    // Création d'un compte
    else if(req.body.adminCode === "" || req.body.adminCode === process.env.ADMIN_PASSWORD) {
        // Hashage du mot de passe
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            return User.create({
                email: req.body.email,
                password: hash,
                isAdmin: req.body.adminCode === process.env.ADMIN_PASSWORD
            })
        }) 
        .then(result => {
            //Création d'un token d'authentification
            const payload = { userId: result.dataValues.userId };
            const secret = process.env.JWT_SECRET;
            const token = jwt.sign(payload, secret, { expiresIn: '1w' });

            //Envoi du cookie avec le token d'authentification
            res.cookie('authcookie', token, {
                sameSite: 'lax',
                path: '/inscription'
            });

            return result;
            })
        .then(result => {
            if(result.dataValues.isAdmin){
                console.log("Compte administrateur créé avec succès");
                return res.status(201).json({
                    severity: "success",
                    result: "Compte administrateur créé avec succès"
                });
            }
            else{
                console.log("Compte utilisateur créé avec succès");
                return res.status(201).json({
                    severity: "success",
                    result: "Compte utilisateur créé avec succès"
                });
            }
        })
        .catch(err => {
            //Utilisation de la fonction manageError pour gérer les erreurs
            return handleCreateUserError(err, res);
            
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

exports.getUser = (req, res, next) => {
    if(!req.params.email) {
        return res.status(400).json({
            error: "Missing email parameter"
        });
    }

    User
        .findByPk(req.params.email)
        .then(user => {
            res.status(200).json({
                user: user
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
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


//Ici pas encore de protection
exports.addAmin = (req, res, next) => {
    if(!req.params.email) {
        return res.status(400).json({
            error: "Missing email parameter"
        });
    }
    
    User
        .findOne({
            where: {
                email: req.params.email
            }
        })
        .then(user => {
            user.isAdmin = true;
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

exports.deleteUser = (req, res, next) => {
    if(!req.params.email) {
        return res.status(400).json({
            error: "Missing email parameter"
        });
    }

    User
        .findOne({
            where: {
                email: req.params.email
            }
        })
        .then(user => {
            return user.destroy();
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