const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require("body-parser");

// Create Express app
const app = express();

mongoose
  .connect('mongodb://localhost:27017/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Start the server
const port = 3000;
// visitorRoute
const visitorRouter = require("./routes/visitorRoute");
app.use(bodyParser.json());
app.use("/",visitorRouter);

app.listen({ port: 3000 }, async () => {
  console.log("Server is listen on http://localhost:3000");
  // await sequelize.authenticate();
  console.log("Database Connected");
});

module.exports = app;