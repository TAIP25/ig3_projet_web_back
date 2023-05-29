const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    // Récupère le token d'authentification
    const token = req.cookies.authcookie;

    // Vérifie si le token est valide
    jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
            res.status(401).json({
                severity: "error",
                result: "Vous n'êtes pas autorisé à accéder à cette page"
            });
        } else {
            req.userId = decodedToken.userId;
            next();
        }
    });
}

module.exports = authMiddleware;