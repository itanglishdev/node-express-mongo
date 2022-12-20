const express = require('express')
const fs = require('fs')

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

const router = express.Router() 

const getAllTours =  (req,res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length, // when we send an array
    data: {
      tours //or tours: tours but no need for that
    }
  })
}
const getTour =  (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1 // || +req.params.id || parsInt() || Number()
  
  const tour = tours.find(el => el.id === id)

  // if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  })
}

const createTour = (req, res) => {
  // console.log(req.body)

  const newId = tours[tours.length -1].id + 1
  const newTour = Object.assign({id: newId}, req.body)

  tours.push(newTour)

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tours: newTour
      }
    })
  })
}

const updateTour =  (req,res) => {
  if (req.params.id * 1 > tours.length) {
    // if (!tour) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID'
      })
    }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated Tour here...>'
    }
  })
}

const deleteTour = (req,res) => {
  if (req.params.id * 1 > tours.length) {
    // if (!tour) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID'
      })
    }
  res.status(204).json({
    status: 'success',
    data:null
  })
}

router
  .route('/')
  .get(getAllTours)
  .post(createTour)

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

  module.exports = router