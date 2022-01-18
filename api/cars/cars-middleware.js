const { getById, getAdd, getByVin } = require("../cars/cars-model")

const vinValidator = require("vin-validator")

const checkCarId = async (req, res, next) => {
  try {
    const car = await getById(req.params.id)
    if (!car) {
      next({
        status: 404,
        message: `car with id ${req.params.id} is not found`
      })
    } else {
      req.car = car
      next()
    }
  } catch (err) {
    next(err)
  }
}
// DO YOUR MAGIC


const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin, make, model, mileage } = req.body;


  if (!vin) {
    res.status(400).json({
      message: "vin is missing"
    })
  } else if (!make) {
    res.status(400).json({
      message: "make is missing"
    })
  } else if (!model) {
    res.status(400).json({
      message: "model is missing"
    })
  } else if (!mileage) {
    res.status(400).json({
      message: "mileage is missing"
    })
  } else {
    next()
  }

}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  if( vinValidator.validate(req.body.vin) ) {
    next()
  } else {
    next({
      status:400,
      message:`vin ${req.body.vin} is invalid`,
    })
  }
}


const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const existing = await getByVin(req.body.vin)
    if( !existing) {
      next()
    } else {
      next({
        status:400,
        message:`vin ${req.body.vin} already exists`
      })
    }
  } catch(err) {
    next(err)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}
