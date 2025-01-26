const jwt = require("jsonwebtoken");
const auth = (request, response, next) => {
  const token = request.headers.authorization.split(" ")[1];
  if(token){
    jwt.verify(token, 'cap01_046', async (err, decoded) => {
      if(decoded){
        next()
      }else{
        response.status(400).json({message:"Please again login", err})
      }
    });
  }else{
    response.status(400).json({message:"Please Login first!"})
  }
  
}

module.exports = {auth};