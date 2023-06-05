const jwt = require('jsonwebtoken');
const { User } = require('../models/index');

const secret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    // Récupère le token d'authentification
    const token = req.cookies.authcookie;
    console.log(req.cookies);

    // Vérifie si le token est valide
    jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
            res.status(401).json({
                severity: "error",
                result: "Vous n'êtes pas autorisé à accéder à cette page"
            });
        } 
        else {
            User.findOne({ where: { userId: decodedToken.userId } })
            .then(user => {
                if(!user) {
                    res.status(401).json({
                        severity: "error",
                        result: "Vous n'êtes pas autorisé à accéder à cette page"
                    });
                }
                else {
                    req.userId = decodedToken.userId;
                    req.isAdmin = user.isAdmin;
                    next();
                }
            })
            .catch(err => {
                res.status(500).json({
                    severity: "error",
                    result: "Une erreur est survenue, veuillez réessayer"
                });
            });
        }
    });
}

module.exports = authMiddleware;