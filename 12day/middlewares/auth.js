const jwt = require("jsonwebtoken");
const { blacklist } = require("../src/blacklist")

const auth = (request, response, next) => {
  const token = request.headers["authorization"].split(" ")[1];
  if(!token || blacklist.includes(token)){
    return response.status(400).json({message:"Please Login first!",})
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=> {
    if(err){
      return response.status(401).json({message:"Invalid token. Please login first!"})
    } else{
      response.role = decoded.role;
      next();
    }

  });
} 

module.exports = {auth};