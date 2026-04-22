const Reservation = require('../models/reservation');

exports.getAll = async (req, res) => {
    const data = await Reservation.find({ catwayNumber: req.params.id });
    res.status(200).json(data);
};

exports.getById = async (req, res) => {
    const data = await Reservation.findById(req.params.idReservation);
    if (!data) return res.status(404).json('reservation_not_found');
    res.status(200).json(data);
};

exports.add = async (req, res) => {
    const reservation = await Reservation.create({
        catwayNumber: req.params.id,
        ...req.body
    });

    res.status(201).json(reservation);
};

exports.update = async (req, res) => {
    const reservation = await Reservation.findById(req.params.idReservation);
    if (!reservation) return res.status(404).json('reservation_not_found');

    Object.assign(reservation, req.body);
    await reservation.save();

    res.status(200).json(reservation);
};

exports.delete = async (req, res) => {
    await Reservation.deleteOne({ _id: req.params.idReservation });
    res.status(204).json('delete_ok');
};