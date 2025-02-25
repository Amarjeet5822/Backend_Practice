export const createUserValidationSchema = {
  username:{
    notEmpty: {
      errorMessage:"username can not Empty"
    },
    isLength:{
      options:{
        min:5,
        max: 32
      },
      errorMessage:"username must be at least 5 to 32 Characters"    
    },
    isString:{
      errorMessage:"Username must be a String!"
    },
  },
  age:{
    notEmpty: {
      errorMessage:"age can not Empty"
    },
    isInt:{
      errorMessage: "age must be a Number!"
    }
  },
};
