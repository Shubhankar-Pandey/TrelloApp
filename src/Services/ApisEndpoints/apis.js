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
  CREATE_ORG : BASE_URL + "/organisation/createOrganisation",
}


// issue end points 
export const issue_endPoints = {
  GET_ALL_PUBLIC_ISSUE_DETAILS : BASE_URL + "/organisation/department/issue/getAllPublicIssueDetails",
  CREATE_ISSUE : BASE_URL + "/organisation/department/issue/createIssue",
  UPDATE_ISSUE_STATUS : BASE_URL + "/organisation/department/issue/updateIssueStatus",
}


// department end points 
export const department_endPoints = {
  CREATE_DEPARTMENT : BASE_URL + "/organisation/department/createDepartment",
}


// Owner end points
export const owner_endPoints = {
  GET_ALL_DETAILS_OF_OWNER : BASE_URL + "/owner/getAllDetailOfOwner"
}


// employee end points
export const employee_endPoints = {
  GET_ALL_EMPLOYEES : BASE_URL + "/employee/getAllEmployees",
  GET_ALL_DETAILS_OF_EMPLOYEE : BASE_URL + "/employee/getAllDetailsOfEmployee",
}


// request end points
export const request_endPoints = {
  GET_ALL_REQUEST_CAME_TO_ME : BASE_URL + "/request/getAllRequestCameToMe",
  ACCEPT_REQUEST : BASE_URL + "/request/acceptRequest",
  REJECT_REQUEST : BASE_URL + "/request/rejectRequest",
  SEND_REQUEST_BY_OWNER : BASE_URL + "/request/sendRequestByOwner",
  SEND_REQUEST_BY_EMPLOYEE : BASE_URL + "/request/sendRequestByEmployee",
}