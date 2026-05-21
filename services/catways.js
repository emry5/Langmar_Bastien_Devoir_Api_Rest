const Catway = require('../models/catway');

exports.getAll = async (req, res) => {
    const data = await Catway.find();
    res.status(200).json(data);
};

exports.getById = async (req, res) => {
    const data = await Catway.findOne({ catwayNumber: req.params.id });
    if (!data) return res.status(404).json('catway_not_found');
    res.status(200).json(data);
};

exports.add = async (req, res) => {
    try {
        const catway = await Catway.create(req.body);
        res.status(201).redirect('/catways');
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.update = async (req, res) => {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    if (!catway) return res.status(404).json('catway_not_found');

    Object.keys(req.body).forEach(key => {
        catway[key] = req.body[key];
    });

    await catway.save();
    res.status(200).json(catway);
};

exports.delete = async (req, res) => {
    await Catway.deleteOne({ catwayNumber: req.params.id });
    res.status(204).json('delete_ok');
};