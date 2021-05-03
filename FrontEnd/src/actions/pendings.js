import axios from "axios";
import makeToast from "../components/Toaster";
import {
  APPROVE_JOBS,
  GET_ADMINS,
  GET_ADMIN_DETAILS,
  GET_ALL_COMPANIES,
  GET_ALL_JOBS,
  GET_ALL_USERS,
  GET_ALL_WEBINARS,
  GET_CLIENTS,
  GET_CONSULTANTS,
  GET_MOCK_TESTS,
  GET_NOTES,
  GET_USER_DETAILS,
  LOAD_UNAPPROVED_JOBS,
  LOGIN_USER,
  SEND_EMAIL,
} from "./types";

// const _URL = http://api.mppljobs.com;

const url = "http://localhost:5000";

var role = JSON.parse(localStorage.getItem("adminRole"));

export const getBannedUser = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    const res = await axios.get(url + "/api/user/getBannedUser", config);
    dispatch({ type: GET_ALL_USERS, payload: res.data });
  } catch (error) {
    console.log(error.message);
  }
};
export const updateWebinarByID = async (formData, id) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(
      url + "/api/webinar/update/" + id,
      formData,
      config
    );
    if (res.data.msg === "Webinar Updated!") {
      makeToast("success", "Success");
      return true;
    }
  } catch (error) {
    makeToast("error", error.message);

    console.log(error.message);
    return false;
  }
};

export const updateUserById = async (formData, id) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(
      url + "/api/user/update/" + id,
      formData,
      config
    );
    if (res.data) {
      return true;
    }
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const getUserDetailsByID = (id) => async (dispatch) => {
  console.log(id);
  try {
    const res = await axios.get(url + "/api/admin/user/details/" + id);

    dispatch({ type: GET_USER_DETAILS, payload: res.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getAdminDetails = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    const res = await axios.get(url + "/api/admin/me", config);
    dispatch({ type: GET_ADMIN_DETAILS, payload: res.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getClients = () => async (dispatch) => {
  // console.log("function getclients working");
  try {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    const res = await axios.get(url + "/api/user", config);
    dispatch({ type: GET_CLIENTS, payload: res.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const loginAdmin = (formData) => async (dispatch) => {
  // console.log("function login admin working");
  // console.log("Login Fun()  ");
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const res = await axios.post(url + "/api/admin/login", formData, config);
    console.log("Login ", res.data.token);
    dispatch({ type: LOGIN_USER, payload: res.data.token });
  } catch (error) {
    console.log("Auth Error (login function) ", error.message);
  }
};

export const registerUser = (formData) => async (dispatch) => {
  // console.log("function register user working");
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(url + "/api/admin/", formData, config);
    console.log("Register ", res.data.token);
    dispatch({ type: LOGIN_USER, payload: res.data.token });
  } catch (error) {
    console.log("Auth Error (Register function) ", error.message);
  }
};

export const sendEmailToCustomer = (formData) => async (dispatch) => {
  // console.log("function send email to customer working");
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      url + "/api/admin/sendEmail",
      formData,
      config
    );
    console.log(res.data);
    dispatch({ type: SEND_EMAIL });
  } catch (error) {
    console.log(error.response);
  }
};

export const getUnApprovedJobs = () => async (dispatch) => {
  // console.log("function get unapproved jobs working");
  try {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    const res = await axios.get(url + "/api/jobs/unApprovedJobs", config);
    dispatch({ type: LOAD_UNAPPROVED_JOBS, payload: res.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const approveJobs = (id) => async (dispatch) => {
  // console.log("function approve jobs  working");
  try {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    const res = await axios.get(url + "/api/jobs/approve/" + id, config);
    console.log(res.data);
    if (res.data) {
      makeToast("success", "Success");
    }
    dispatch({ type: APPROVE_JOBS });
  } catch (error) {
    makeToast("error", error.message);
    console.log(error.message);
  }
};

export const banUserById = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    const res = await axios.get(url + "/api/user/banUser/" + id, config);
    if (res.data.msg == "User Banned!") {
      makeToast("success", "Banned");
    }
  } catch (error) {
    console.log(error.message);
    makeToast("error", error.message);
  }
};

export const unBanUserById = async (id) => {
  try {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    const res = await axios.get(url + "/api/user/unBanUser/" + id, config);
    if (res.data.msg == "User UnBanned!") {
      makeToast("success", "UnBanned");
    }
  } catch (error) {
    console.log(error.message);
    makeToast("error", error.message);
  }
};

export const createNotes = (formData) => async (dispatch) => {
  // console.log("function create notes working");
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    const res = await axios.post(url + "/api/notes/create", formData, config);
    if (res.data) {
      makeToast("success", "Success");
      return true;
    }
  } catch (error) {
    makeToast("error", error.message);
    console.log(error.message);
    return false;
  }
};

export const getNotes = () => async (dispatch) => {
  // console.log("function get notes working");
  try {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    const res = await axios.get(url + "/api/notes/all", config);
    dispatch({ type: GET_NOTES, payload: res.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateNotesById = (formData, id) => async (dispatch) => {
  // console.log("function update notes by id working");
  try {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(
      url + "/api/notes/update/" + id,
      formData,
      config
    );
    if (res.data) {
      makeToast("success", "Success");

      return true;
    }
  } catch (error) {
    makeToast("error", error.message);

    return false;
  }
};

export const deleteNotesById = (id) => async (dispatch) => {
  // console.log("function delete notes by id working");
  try {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    const res = await axios.delete(url + "/api/notes/delete/" + id, config);
    if (res.data) {
      makeToast("success", "Success");

      return true;
    }
  } catch (error) {
    makeToast("error", error.message);

    return false;
  }
};

export const declineJob = (formData, id) => async (dispatch) => {
  // console.log("function decline job working");
  // console.log("decline job Function");
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    const res = await axios.post(
      url + "/api/admin/decline/" + id,
      formData,
      config
    );
    console.log(res.data);
  } catch (error) {
    console.log(error.message);
  }
};

export const createJob = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    const res = await axios.post(url + "/api/jobs", formData, config);
    if (res.data) {
      console.log(res.data);
      return true;
    }
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const getAllJobs = () => async (dispatch) => {
  try {
    if (role.includes("All") || role.includes("Jobs")) {
      const res = await axios.get(url + "/api/jobs/all");
      dispatch({ type: GET_ALL_JOBS, payload: res.data });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const createWebinars = async (formData) => {
  // console.log("function create webinars working");
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      url + "/api/webinar/createWebinar",
      formData,
      config
    );
    if (res.data.msg === "Webinar Created!") {
      makeToast("success", "Success");
      return true;
    }
  } catch (error) {
    console.log(error.message);
    makeToast("error", error.message);
    return false;
  }
};

export const createCompany = (formData) => async (dispatch) => {
  try {
    // const config = {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // };

    const res = await axios.post(url + "/api/company/create", formData);
    if (
      res.data.msg === "Company Created!" ||
      res.data.msg === "Company Updated!"
    ) {
      makeToast("success", "Success");

      return true;
    }
  } catch (error) {
    console.log(error.message);
    makeToast("error", error.message);

    return false;
  }
};

export const getAllCompanies = () => async (dispatch) => {
  try {
    const res = await axios.get(url + "/api/company/all");
    dispatch({ type: GET_ALL_COMPANIES, payload: res.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllWebinars = () => async (dispatch) => {
  try {
    const res = await axios.get(url + "/api/webinar/all");
    dispatch({ type: GET_ALL_WEBINARS, payload: res.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(url + "/api/admin/users");
    dispatch({ type: GET_ALL_USERS, payload: res.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getMockTests = () => async (dispatch) => {
  try {
    const res = await axios.get(url + "/api/test");
    dispatch({ type: GET_MOCK_TESTS, payload: res.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getConsultants = () => async (dispatch) => {
  try {
    const res = await axios.get(url + "/api/consultant");
    dispatch({ type: GET_CONSULTANTS, payload: res.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createUser = (formData) => async (dispatch) => {
  console.log(formData);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(url + "/api/user", formData, config);
    if (res.data.msg == "User Created!") {
      makeToast("success", "Created");
      return true;
    }
    console.log(res.data);
  } catch (error) {
    console.log(error.message);
    makeToast("error", "Failed");

    return false;
  }
};

export const createMockTests = (formData) => async (dispatch) => {
  console.log(formData);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(url + "/api/test/createMockTest", formData);
    if (
      res.data.msg == "Mock Test Created!" ||
      res.data.msg == "Mock test Updated!"
    ) {
      makeToast("success", "Success");
      return true;
    }
  } catch (error) {
    console.log(error.message);
    makeToast("error", error.message);
    return false;
  }
};

export const createConsultant = async (formData) => {
  console.log(formData);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      url + "/api/consultant/createConsultant",
      formData,
      config
    );
    if (res.data) {
      return true;
    }
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const deleteJobByID = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    const res = await axios.delete(url + "/api/jobs/" + id, config);
    if (res.data == "Job deleted.") {
      makeToast("success", "Success");
    }
  } catch (error) {
    console.log(error.message);
    makeToast("error", "Success");
  }
};

export const updateJobById = (formData, id) => async (dispatch) => {
  console.log(formData);
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const res = await axios.put(
      url + "/api/jobs/update/" + id,
      formData,
      config
    );
    if (res.data) {
      makeToast("success", "Success");
      console.log(res.data);
      return true;
    }
  } catch (error) {
    makeToast("error", "Error");

    console.log(error.message);
    return false;
  }
};

export const updateConsultantByID = async (formData, id) => {
  console.log("ID : ", id);
  console.log("passed Data", formData);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(
      url + "/api/consultant/updateConsultant/" + id,
      formData,
      config
    );
    if (res.data.msg == "Consultant Updated!") {
      console.log(res.data);
      makeToast("success", "Success");
      return true;
    }
  } catch (error) {
    console.log(error.message);
    makeToast("error", error.message);

    return false;
  }
};

export const deleteWebinarsById = async (id) => {
  try {
    const res = await axios.delete(url + "/api/webinar/delete/" + id);
    if (res.data.msg === "Webinar Deleted!") {
      makeToast("success", "Deleted");
      return true;
    }
  } catch (error) {
    console.log(error.message);
    makeToast("error", error.message);
  }
};

export const deleteTestByID = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(url + "/api/test/delete/" + id);
    if (res.data.msg === "Test Deleted!") {
      makeToast("success", "Success");
      return true;
    }
  } catch (error) {
    console.log(error.message);
    makeToast("error", error.message);
    return false;
  }
};

export const banConsultantById = async (id) => {
  try {
    const res = await axios.get(url + "/api/consultant/banConsultant/" + id);
    if (res.data.msg == "Consultant Banned!") {
      makeToast("success", "Success");
    }
  } catch (error) {
    console.log(error.message);
    makeToast("error", error.message);
  }
};

export const unBanConsultantById = async (id) => {
  try {
    const res = await axios.get(url + "/api/consultant/unBanConsultant/" + id);
    if (res.data.msg === "Consultant unBanned!") {
      makeToast("success", "Success");
    }
  } catch (error) {
    console.log(error.message);
    makeToast("error", error.message);
  }
};

export const getBannedConsultants = () => async (dispatch) => {
  try {
    const res = await axios.get(url + "/api/consultant/bannedConsultants");
    dispatch({ type: GET_CONSULTANTS, payload: res.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getInactiveJobs = () => async (dispatch) => {
  try {
    const res = await axios.get(url + "/api/jobs/expired");
    dispatch({ type: GET_ALL_JOBS, payload: res.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getInactiveWebinars = () => async (dispatch) => {
  try {
    const res = await axios.get(url + "/api/webinar/inActive");
    dispatch({ type: GET_ALL_WEBINARS, payload: res.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPastMocktests = () => async (dispatch) => {
  try {
    const res = await axios.get(url + "/api/test/inActive");
    dispatch({ type: GET_MOCK_TESTS, payload: res.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getAdmins = () => async (dispatch) => {
  try {
    const res = await axios.get(url + "/api/admin/allAdmins");
    dispatch({ type: GET_ADMINS, payload: res.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const banAdmin = (id) => async () => {
  try {
    const res = await axios.get(url + "/api/admin/banAccount/" + id);
    console.log(res.data);
  } catch (error) {
    console.log(error.message);
  }
};

export const unBanAdmin = (id) => async () => {
  try {
    const res = await axios.get(url + "/api/admin/unBanAccount/" + id);
    console.log(res.data);
  } catch (error) {
    console.log(error.message);
  }
};

export const getBannedAdmins = () => async (dispatch) => {
  try {
    const res = await axios.get(url + "/api/admin/bannedAdmins");
    dispatch({ type: GET_ADMINS, payload: res.data });
  } catch (error) {
    console.log(error.message);
  }
};
