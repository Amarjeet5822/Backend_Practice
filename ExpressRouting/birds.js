  // Use the express.Router class to create modular, mountable route handlers.
  // A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
const express = require('express');
const router = express.Router();
// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log("Time: ", Date.now())
  next()
}
router.use(timeLog)

// Defines he home page route
router.get("/", (req, res ) => {
  res.send("Birds home page")
})

// Defines the about page route
router.get("/about", (req, res ) => {
  res.send("Birds about");
})
module.exports = router;
  