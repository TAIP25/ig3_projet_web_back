const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

// TODO Pas encore testé !!!
const authMiddleware = (req, res, next) => {
    // Récupère le token d'authentification
    const token = req.cookies.authcookie;

    // Vérifie si le token est valide
    jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
            console.log(err.message);
            res.status(401).json({
                severity: "error",
                result: "Vous n'êtes pas autorisé à accéder à cette page"
            });
        } else {
            console.log(decodedToken);
            //next();
        }
    });
}

module.exports = authMiddleware;