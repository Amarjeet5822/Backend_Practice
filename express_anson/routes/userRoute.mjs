import express from "express";
import { query, validationResult,matchedData, checkSchema} from "express-validator";
import { createUserValidationSchema } from "../utils/userValidationSchema.mjs";
export const userRouter = express.Router()

const mockData = [
  {id: 1, username: "amar", displayName: "Amarjeet_G"},
  {id: 2, username: "satyam", displayName: "Satyam"},
  {id: 3, username: "arpit", displayName: "Arpit"},
  {id: 3, username: "amit", displayName: "Amit"},
  {id: 3, username: "ayush", displayName: "Ayush"},
  {id: 3, username: "anuj", displayName: "Anuj"},
  {id: 3, username: "ayon", displayName: "Ayon"},
  {id: 3, username: "ankit", displayName: "Ankit"},
];

// Json response object
userRouter.get("/api/users",
  query('filter').isString().notEmpty()
  .withMessage("must not be empty")
  .isLength({min:3, max:10})
  .withMessage("must be at least 3 to 10 Characters")
  ,(request, response) => {
    console.log(request.session);
    console.log(request.sessionID);
    request.sessionStore.get(request.sessionID, (err, sessionData) => {
      if(err){
        console.log(err);
        throw err
      }
      console.log(sessionData);
    })
  // console.log(request['express-validator#contexts'])
  const result = validationResult(request);
  console.log("line 36 ",result)
  const { query: {filter, value}} = request;

  if(!filter && !value){
    return response.status(201).send(mockData);
  } 
  if(filter && value){
    return response.send(
      mockData.filter((user) => user[username].includes(value))
    )
  }
  return response.status(201).send(mockData);
})
// post request
userRouter.post("/api/users", checkSchema(createUserValidationSchema), (request, response) => {
  const result = validationResult(request);
  if(!result.isEmpty()){
    return response.status(400).send({errors:result.array()});
  }
  const data = matchedData(request)
  const newUser = { id:mockData.length,...data};
  mockData.push(newUser)
  response.status(201).send({message:"Okay for post request", newUser} )
});
// params Id get from request
userRouter.get("/api/users/:id", (request, response) => {
  const userID = parseInt(request.params.id);
  if(isNaN(userID)){
    return response.status(400).send({message: "Bad Request/ INVALID ID", userID});
  }
  const findUser = mockData.find((item) => item.id === userID);
  if (!findUser){
    return response.Status(404).send(userID)
  }
  return response.send([userID, {findUser}])

});