const { Crop } = require('../models/newModels/index');

exports.getAllCrops = (req, res, next) => {
    Crop
    .findAll()
    .then(crops => {
        res.status(200).json({
            severity: "success",
            message: "Ici la liste de tous les crops",
            crops: crops
        });
    })
    .catch(err => {
        console.log(err.name);
        res.status(500).json({
            severity: "error",
            message: "Erreur lors de la récupération de la liste des crops",
        });
    });
}