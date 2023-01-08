const express = require('express');

// We are importing here 
const tourController = require('./../controllers/tourController');

//  We could DESTRUCTURE the object also
// const {getAllTours, createTour, getTour, updateTour, deleteTour} = require('./../controllers/tourController')

const router = express.Router() 

router.param('id', tourController.checkID)


router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour)

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour)

  module.exports = router;