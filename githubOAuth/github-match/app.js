// server.js
const express = require("express");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const session = require("express-session");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // set to true for HTTPS in production
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// CORS setup
app.use(cors());

// GitHub OAuth Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/auth/github/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      // Store user info in the session
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Routes
app.get("/", (req, res) => {
  res.send("GitHub OAuth with JWT App is running!");
});

app.get('/check-session', (req, res) => {
  res.json(req.session);
});


// Login Route
app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// Callback Route with jwt
app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign({id:user.id, username: user.username }, process.env.JWT_SECRET, {expiresIn:"600000"})
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
