const cookieValidator = async (cookies) => {
  try {
    await externallyValidateCookie(cookies.testCookie)
  } catch (error) {
    throw new Error("Invalid Cookies")
  }
}

module.exports = cookieValidator;