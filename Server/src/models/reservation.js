const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var reservationSchema = new Schema({
    passengerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    seatNumber: {
        type: Number,
        required: true
    }
});

var Reservation = mongoose.model('reservation', reservationSchema);

module.exports = Reservation;