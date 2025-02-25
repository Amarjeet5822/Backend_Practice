import express from "express";
export const productRouter = express.Router();

// products Route
productRouter.get("/api/products", (request, response) => {
  console.log(request.headers.cookie);
  console.log(request.cookies);
  console.log(request.signedCookies.Hello)
  if(request.signedCookies.Hello && request.signedCookies.Hello=== "India!") {
    return response.status(201).send(({"message": `Hello from : ${request.signedCookies.Hello}` }))
  } else{
    return response.status(404).send({"message" : " sorry you don't have cookies "})
  }
})