//    ADDING EXPRESS
const express = require('express')

//    ADDING MORGAN MIDLEWARE 
const morgan = require('morgan')

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

//    PUTTING IT IN A VARIABLE
const app = express()



//    MIDDLEWARES
app.use(morgan('dev'))

app.use(express.json())

app.use((req,res,next) => {
  console.log('Hello from the middleware!!!!!')
  next()
})


app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})

//     ROUTES
// MOUNTING a new Router on a Route

app.use('/api/v1/tours', tourRouter) 
app.use('/api/v1/users', userRouter) 


//      READING FILES


//   CREATING A SERVER (PORT VARIABLE AND A LISTENER)
const port = 3000
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
})

