const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");
let nextIndex = bookings.length

app.get("/", function(request, response){
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});


// TODO add your routes and helper functions here
//Create a new booking
app.post("/new", function(request, response){
  let booking = request.body;
  booking.id = nextIndex++;
    bookings.push(booking);
    response.status(201).json(bookings); 
})



// {"id":1,"title":"Mr","firstName":"Jimi","surname":"Hendrix"
//   ,"email":"jimi@example.com","roomId":2,"checkInDate":"2017-11-21","checkOutDate":"2017-11-23"}
// app.post("/messages", function(request, response){
//   let message = request.body;
//   message.id = nextIndex++;
//   if (!message.text || !message.from){
//     response.status(400).send('missing text or name')
//     } else {
//     messages.push(message);
//     response.status(201).json(messages); 
//   }
// });


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

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
