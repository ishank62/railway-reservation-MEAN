const express = require('express');
const bodyParser = require('body-parser');
const Reservation = require('../models/reservation');
const reservationRouter = express.Router();

const axios = require('axios');



reservationRouter.use(bodyParser.json());

reservationRouter
    .get('/reserved-seats', (req, res, next) => {
        Reservation.find({})
            .then(reservations => {
                    let filledSeats = [];
                    if (reservations && reservations.length) {
                        reservations.map(reservation => filledSeats.push(reservation.seatNumber));
                    }
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({
                        error: false,
                        message: 'success',
                        response: {
                            filledSeats: filledSeats
                        }
                    });
                },
                err => next(err)
            )
            .catch(err => next(err));
    })
    .get('/assignment',  (req, res, next) =>  {
        console.log("kkkkkkkasdasdada");
        axios.get('https://reqres.in/api/users?page=2')
            .then(data =>  {
               console.log("insideeeeasdasdadada", data.data);

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ error:  false, response:data.data});
            })
            .catch(err =>  console.error(err));
    })
    .post('/reserve-seats', (req, res, next) => {
        let seatNumberErr = req.body.seatNumbers.filter(seatNumber => seatNumber > 80);
        if (seatNumberErr.length) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.json({
                error: true,
                message: "Please select seat numbers less than or equal to 80"
            });
            return;
        }
        Reservation.find({
                seatNumber: {
                    $in: req.body.seatNumbers
                }
            })
            .then(result => {
                console.error(result, "-------asdasd");
                if (result && result.length) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({
                        error: true,
                        message: "Chosen Seat(s) have already been booked by another user! Please Refresh the page to see booked seats"
                    });
                    return;
                }
                let bulkCreate = req.body.seatNumbers.map(seatNumber => {
                    return {
                        passengerId: req.body.passengerId,
                        seatNumber: seatNumber
                    };
                });
                Reservation.insertMany(bulkCreate)
                    .then(reservation => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json({
                                error: false,
                                response: reservation,
                                message: 'success'
                            });
                        },
                        err => next(err))
                    .catch(err => next(err));
            }, err => next(err))
            .catch(err => next(err))
    })
    .delete('/delete-all-reservations', (req, res, next) => {
        Reservation.remove({})
            .then(response => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({
                        error: false,
                        message: 'success',
                        response: response
                    });
                },
                err => next(err))
            .catch(err => next(err));
    });

module.exports = reservationRouter;