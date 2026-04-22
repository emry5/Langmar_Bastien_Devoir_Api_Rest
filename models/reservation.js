const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Reservation = new Schema({
    catwayNumber: {
    type: Number,
    require: true
    },
    clientName: { 
    type: String
    
    },

    boatName: {
    type: String
    },
    startDate: {
    type: Date
    },

    endDate: {
    type: Date
    }
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Reservation', Reservation);