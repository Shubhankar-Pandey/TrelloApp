const BASE_URL = process.env.REACT_APP_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendOtp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/resetPasswordToken",
  RESETPASSWORD_API: BASE_URL + "/auth/resetPassword",
}


// Organisation end point
export const organisation_endPoints = {
  GET_ALL_ORG : BASE_URL + "/organisation/getAllOrganisationsAndItsDepartments",
}


// Owner end points
export const owner_endPoints = {
  GET_ALL_DETAILS_OF_OWNER : BASE_URL + "/owner/getAllDetailOfOwner"
}