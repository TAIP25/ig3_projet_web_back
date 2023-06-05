const jwt = require('jsonwebtoken');
const { User } = require('../models/index');

const secret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    // Récupère le token d'authentification
    //const token = req.cookies.authcookie;
    //console.log(req.cookies);
    /*
    authcookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1MjQ1YmQyYi0wYjI3LTRkMzktOGI4NC0yOWQ0NjMzNjNkYWEiLCJpYXQiOjE2ODU5MzAzMTYsImV4cCI6MTY4NjUzNTExNn0.eBlUPqaOOXeRheX51DAqE_qYFexI7bWyLNfcwvCtRSI; isAdmin=true
    */
    console.log(req.headers.cookie)
    const token = req.headers.cookie.split('=')[1].split(';')[0];
    console.log(token);

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