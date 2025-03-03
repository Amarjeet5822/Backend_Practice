// server.js
const express = require("express");
// It handle Authentication - used for GitHub OAuth  
const passport = require("passport"); 
// configure's GitHub OAuth strategy
const GitHubStrategy = require("passport-github2").Strategy;
// To store User sessions
const session = require("express-session");
const dotenv = require("dotenv");
// Allow API requests from Different domains 
const cors = require("cors");
const jwt = require("jsonwebtoken");
dotenv.config();
// Instance of express to handle routes and middleware
const app = express();
const PORT = process.env.PORT || 3000;

// Session middleware
app.use(
  session({ // Maintain server session (ie. login info)
    secret: process.env.SESSION_SECRET,//encrypt session secret from file
    resave: false,// not save session again and again
    saveUninitialized: true, // saves new session 
    cookie: { secure: false }, // set to true for HTTPS in production
  })
);

// Initialize passport
app.use(passport.initialize()); 
app.use(passport.session()); // 

// CORS setup
app.use(cors()); // allow cross-origin requests

// GitHub OAuth Strategy
passport.use(
  new GitHubStrategy( // Authenticate user using GitHub
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      //GitHub authenticate hone ke baad ye route call hota hai
      callbackURL: `${process.env.BASE_URL}/auth/github/callback`,
    },
    // GitHub ka token milta hai, we will use in future
    (accessToken, refreshToken, profile, done) => {
      // done(): Authentication complete hone pe user ka data pass karta hai
      return done(null, profile);
    }
  )
);
// User object ko session mein store karta hai.
passport.serializeUser((user, done) => {
  done(null, user);
});
// Session is user ko wapas retrieve karta hai
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Routes
app.get("/", (req, res) => {
  res.send("GitHub OAuth with JWT App is running!");
});

app.get('/check-session', (req, res) => {
  res.json(req.session?.cookie?.httpOnly);
});


// Login Route
// Jab user "/auth/github" par jayega, GitHub OAuth start hoga
app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
  // scope: GitHub se user ka email access karne ki permission maangta hai
);

// Callback Route with jwt
app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign({id:user.id, username: user.username }, process.env.JWT_SECRET, {expiresIn:"200000"}) // 5 minutes 
    // Redirect frontent ke taraf token ke saath
    res.redirect(`${process.env.FRONTENT_URL}/dashboard?token=${token}`)
  }
);

// Profile Route
app.get("/profile", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if(!token) {
    return res.status(401).json({error:"No token provided"});
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if(err) {
      return res.status(403).json({error: "Invalid token"});
    }
    res.json({message:"Welcome to the protected route!", user:decoded});
  })
});

// Logout Route
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
