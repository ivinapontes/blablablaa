const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");
let nextIndex = bookings.length;

app.get("/", function(request, response){
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});

//Create a new booking
app.post("/new", function(request, response){
  let booking = request.body;
  booking.id = nextIndex++;
  
    bookings.push(booking);
    response.status(201).json(bookings); 
})

// Read all bookings
app.get("/bookings", function(request, response){
  response.json(bookings);
});

// Read one booking, specified by an ID
app.get("/booking/:id?", function(request, response){
  let id = parseInt(request.params.id);
  let booking = bookings.filter(message => message.id == id);
  response.json(booking);
});

// Delete a booking, specified by an ID
app.delete("/delete/:id?", function (req, res) {
  let id = parseInt(req.params.id);  
  var indexToDelete = bookings.findIndex(item => id === item.id);
  if (indexToDelete>=0){
    bookings.splice(indexToDelete, 1);
    res.sendStatus(204);   
  } else {  
    res.sendStatus(404);
  }
})
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
