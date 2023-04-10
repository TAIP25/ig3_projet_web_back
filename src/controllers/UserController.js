const { User } = require('../models/index');

// TODO:
// Utiliser User.build() pour créer un administrateur (avec les attributs dans le .env)
// TODO: faire du async/await

exports.createUser = (req, res, next) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });
    user.save()
        .then(result => {
            res.status(201).json({
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
    User.findByPk(req.params.id)
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