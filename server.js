// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 3000;

const server = app.listen(port, listening);

function listening() {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}

//post requests
app.post("/addlog", addlog);
function addlog(req, res) {
  projectData = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content,
  };
  console.log(projectData);
  res.send(projectData);
}

//Get all projectData
app.get("/all", sendData);
function sendData(req, res) {
  console.log(projectData);
  res.send(projectData);
}
