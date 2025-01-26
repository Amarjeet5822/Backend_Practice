
const checkAccess =(acceptedRole) =>{
  return (request, response, next ) => {
    if (request.role === acceptedRole){
      next()
    } else {
      response.status(401).send({message:"Not authorized!"})
    }
  }
}
module.exports = {checkAccess };