const router = require('express').Router()

const {db, Place, Hotel, Activity, Restaurant} = require('../models')

router.get('/api', (req,res,next) => {
  Promise.all([
    Hotel.findAll({include: [Place]}),
    Activity.findAll({include: [Place]}),
    Restaurant.findAll({include: [Place]})
  ])
    .then(arrayOfPlaces => res.status(200).json(arrayOfPlaces))
    .catch(err => next(err))
})





module.exports = router
