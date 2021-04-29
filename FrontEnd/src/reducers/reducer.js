import { GET_ALL_JOBS, GET_ALL_USERS } from "../actions/types";

const initialState = {
  email: "",
  token: "",
  loggedin: false,
  admin: {},
  verified: false,
  role: [],
  jobs: [],
  users: [],
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        loggedin: true,
      };
    case "LOGOUT":
      window.sessionStorage.removeItem("x-auth-token");
      window.localStorage.removeItem("x-auth-token");
      return {
        ...state,
        token: null,
        loggedin: false,
        email: "",
        roles: null,
      };
    case "SETROLE":
      return {
        ...state,
        role: action.payload.role,
      };
    case "SETTOKENS":
      return {
        ...state,
        token: action.payload.token,
      };
    case "SETVALUE":
      return {
        ...state,
        [action.payload.data]: action.payload.value,
      };

    case GET_ALL_JOBS:
      return {
        ...state,
        jobs: action.payload,
      };

    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
};

export default Reducer;
