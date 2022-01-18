// DO YOUR MAGIC
const express = require("express")
const Car = require("./cars-model")
const {
    checkCarId, 
    checkCarPayload,
    checkVinNumberUnique,
    checkVinNumberValid
} = require("./cars-middleware")

const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        const cars = await Car.getAll()
        res.json(cars)
    } catch (err) {
        next(err)
    }
})

router.get("/:id", checkCarId, async (req, res, next) => {
    res.json(req.car)
})


router.post("/", checkCarPayload, checkVinNumberUnique, checkVinNumberValid, (req, res, next) => {
    Car.create(req.body)
    .then(car => {
        res.status(201).json(car)
    })
    .catch(next)
} )

router.use( ( err, req, res, next ) => { //eslint-disable-line
    res.status(err.status || 500).json({
        message:err.message,
        stack:err.stack
    })
})

module.exports = router