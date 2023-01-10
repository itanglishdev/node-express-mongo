const Tour = require('./../models/tourModel')

// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour id is: ${val}`)
//   if (req.params.id * 1 > tours.length) {
//       return res.status(404).json({
//         status: 'fail',
//         message: 'Invalid ID'
//       })
//     }
//     next()
// }

exports.getAllTours = async (req,res) => {

  try {

    const tours = await Tour.find()
  
    res.status(200).json({
      status: 'success',
      results: tours.length, // when we send an array
      data: {
        tours //or tours: tours but no need for that
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
}

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)
    // Tour.findOne({_id: req.params.id})
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
}

exports.createTour = async (req, res) => {
  // const newTour = new Tour({})
  // newTour.save()
  try {
    const newTour = await Tour.create(req.body)
  
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    })
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid Data sent!"
    })
  }

}

exports.updateTour = async (req,res) => {

  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    res.status(200).json({
      status: 'success',
      data: {
        tour
    }
  })
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid Data sent!"
  })
}
}

exports.deleteTour = async (req,res) => {

  try {

    await Tour.findByIdAndDelete(req.params.id)
    
    res.status(204).json({
      status: 'success',
      message: "Deleted",
      data:null
    })
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    })
  }
}
