const express = require("express");

const router = express.Router();

//a middleware function with no mount path. This code is executed for every request to the router 
router.use((req, res, next) => {
  console.log("time:", Date.now());
  next()
})

router.use('/users/:id', (req, res, next) => {
  console.log('Request URL router: ', req.originalUrl)
  next()
}, (req, res, next) => {
  console.log("Router request Type: ", req.method)
  next()
})

// // a middleware sub-stack that handles GET requests to the /users/:id path
// router.get('/users/:id', (req, res, next) => {
//   // if the users ID is 0, skip to the next router
//   if(req.params.id ==="0") next('route')
//   // otherwise pass control to the next middleware function is this stack
//   else next()
// }, (req, res, next ) => {
//   // render a regular page
//   res.render('regular')
// })

// // handler for the /users/:id path, which renders a special page
// router.get('/users/:id', (req, res, next) => {
//   console.log(req.params.id);
//   res.render('special', {id: req.params.id});
// })

module.exports = router;