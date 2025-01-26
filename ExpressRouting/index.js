const express = require('express')
const app = express();

// -------------------------------------------------------------------
// Route Methods 

// First Basic Routing
app.get("/", (req, res) => {
  res.send("This is basic routing and You are at Home Page.")
}) 

// GET method route
app.get("/", (req, res) => {
  res.send("GET request to the homePage.")
});

// POST method route
app.post("/", (req, res) => {
  res.send("POST request to the homePage.")
});

// all method route
app.all('/secret', (req, res) => {
  console.log("Accessing the secret section.")
  next() // pass control to the next hadler
});

// -----------------------------------------------------------------
// Route Paths
// This route path will match requests to the root route, /.
app.get("/", (req, res) => {
  res.send("Root");
}) 

// This route path will match requests to the root route, /about .
app.get("/about)", (req, res) => {
  res.send("About")
});

// This route path will match requests to the root route, /random.text .
app.get("/random.text", (req, res) => {
  res.send("random.text");
});

                  // examples of route paths based on string patterns.
// This route path will match acd and abcd.
app.get("/ab?cd", (req, res) => {
  res.send("ab?cd");
});

// This route path will match abcd, abbcd, abbbcd, and so on.
app.get("ab+cd", (req, res) => {
  res.send("ab+cd");
});

// This route path will match abcd, ab123cd, abxcd, abxsdhgcd, and so on..
app.get("ab*cd", (req, res) => {
  res.send("ab*cd");
});

// This route path will match /abe and /abcde .
app.get("ab(cd)?e", ( req, res) => {
  res.send("ab(cd)?e");
});

              // Examples of route paths based on regular expressions:

// This route path will match anything with an "a" in it.
app.get(/a/, (req, res) => {
  res.send("/a/")
})

// This route path will match with butterfly and dragonfly but not butterflyman and dragonflyman , and so on..
app.get(/.*fly$/, (req, res) => {
  res.send("/.*fly$/")
});

// -----------------------------------------------------------------
// Route Parameters
// Route path: /users/:userId/books/:bookId
// Request URL: http://localhost:3000/users/34/books/8989

// req.params: { "userId": "34", "bookId": "8989" }
app.get('users/:userId/books/:bookId', (req, res) => {
  res.send(req.params);
});

// Route path: /flights/:from-:to
// Request URL: http://localhost:3000/flights/LAX-SFO
// req.params: { "from": "LAX", "to": "SFO" }

// Route path: /plantae/:genus.:species
// Request URL: http://localhost:3000/plantae/Prunus.persica
// req.params: { "genus": "Prunus", "species": "persica" }

// Route path: /user/:userId(\d+)
// Request URL: http://localhost:3000/user/42
// req.params: {"userId": "42"}

              // Route handlers

// A single callback function handle a route.
app.get("/example/a", (req, res) => {
  res.send("Hello from A!");
});

// More than one callback function can handle a route (make sure you specify the next object).
app.get("/example/b", (req, res, next ) => {
  console.log("the response will be send by the next function...")
  next()
}, (req, res ) => {
  res.send("Hello from B!");
});

// An array of callback functions can handle a route.

const cb0 = function (req, res, next ) {
  console.log("CB0")
  next();
}
const cb1 = function (req, res, next ) {
  console.log("CB1")
  next()
}
const cb2 = function (req, res) {
  res.send("Hello from C!")
}
app.get('/example/c', [cb0, cb1, cb2])

// A combination of independent functions and arrays of functions can handle a route.

const cb3 = function ( req, res, next) {
  console.log("CB3")
  next()
}
const cb4 = function ( req, res, next ) {
  console.log("CB4")
  next()
}
app.get('/example/d', [cb3, cb4], (req, res, next) => {
  console.log("the response will be send by the next function ...")
  next()
}, (req, res) => {
  res.send("Hello from D!")
})

// Response methods see in md file  # Related to index file 

// app.route()
// chained route handlers that are defined by using app.route()
app.route("/book") 
  .get((req, res) => {
    res.send("Get a Random Book")
  })
  .post((req, res) => {
    res.send("Add a Book")
  })
  .put((req, res) => {
    res.send("Update a Book")
  })

