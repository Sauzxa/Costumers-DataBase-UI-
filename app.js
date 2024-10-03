const express = require('express');
const mongoose = require("mongoose");
const livereload = require("livereload"); // Add livereload package
const connectLivereload = require("connect-livereload");
const app = express();
const port = 3000;
app.use(express.urlencoded({extended : true}))
var moment = require("moment") // library for time handiling

app.set('view engine', 'ejs'); 
app.use(express.static('public'));

// Setup livereload server
const liveReloadServer = livereload.createServer(); // Create a LiveReload server
liveReloadServer.watch(__dirname + "/public"); // Watch the 'public' directory for changes

// Automatique refresh using connect-livereload middleware
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/"); // Refresh the page
  }, 100);
});

// MongoDB connection
mongoose.connect("mongodb+srv://sauzxa:node-1233@learning-mongodb.ei6rl.mongodb.net/Customer")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });
 
   // import customer
 const Customer = require('./models/customerSchema')
  

  // get all data  // render all objects + stack the result in an array
  app.get("/" , (req,res)=>{
    Customer.find()
    .then((result)=>{
      console.log(result);
      
      res.render("index" ,{arr :result , moment:moment}) // cuz in index.ejs i name it moment also
    }).catch((err)=>{
      console.log(err);
      
    })
  })

 
// get and render the add page 
app.get('/user/add.html', (req, res) => {
  res.render("user/add"); // conditional rendering (render the add.ejs)
});
// edit Customer 
app.get('/edit/:id', (req, res) => {
 Customer.findById(req.params.id).then((result)=>{
   res.render("user/edit", {object : result}); 

 })



});
// rendering the view page // only for the clicked one 
app.get('/user/:id',(req,res)=>{
   
  Customer.findById(req.params.id)
  .then((result)=>{
   console.log(result);
   
    res.render("user/view",{object : result , moment : moment})
   
  }).catch((err)=>{
    console.log(err);
      
 })


})


// post request // create the doucment in the collection 'Customer'
app.post("/user/add.html", (req, res) => {
  console.log("Received form data:", req.body);  // Log the form data for inspection

  Customer.create(req.body)
    .then(() => {
      console.log("Document saved successfully");
      res.redirect('/');
    })
    .catch((err) => {
      console.error("Error saving document:", err);
      res.status(500).send("An error occurred while saving the document.");
    });
});





