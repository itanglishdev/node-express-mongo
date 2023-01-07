const app = require('./app')

//   CREATING A SERVER (PORT VARIABLE AND A LISTENER)
const port = 3000
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
})
