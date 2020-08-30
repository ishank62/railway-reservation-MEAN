const router = require('express').Router();
const reservationRoutes = require('./reservationRoutes');

router.use("/reservations", reservationRoutes);

module.exports = router;