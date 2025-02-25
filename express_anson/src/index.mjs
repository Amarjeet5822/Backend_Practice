import express from "express";
import cookieParser from "cookie-parser";
import { loggingMiddleware } from "../middlewares/loggingMIddleware.mjs";
import { routes } from "../routes/index.mjs";
import { indiaTimeNow } from "../utils/timeZone.mjs";
import session from "express-session"
const app = express();
app.use(cookieParser("HelloIndia!"));
app.use(loggingMiddleware);
app.use(express.json());
app.use(session({
  secret: "cap01_046",
  saveUninitialized: false,
  resave: false,
  cookie:{
    maxAge: 60000 * 60,
  }
}))
app.use(routes);


app.get("/", (request, response) => {
  // Set the cookie to expire in 15 minutes (IST time)
  // const expiresIn = 15 * 60 * 1000; // 15 minutes in milliseconds
  // const istExpiry = new Date(indiaTimeNow.getTime() + expiresIn);
  console.log(request.session)
  console.log(request.session.id, "or", request.sessionID)
  request.session.visited = true; // it won't change the session id.
  response.cookie("Hello","India!", { maxAge: 30000, signed: true})
  response.send({"message":"hello World!", "time India": indiaTimeNow, "expire in 10 seconds": 10000});
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});
