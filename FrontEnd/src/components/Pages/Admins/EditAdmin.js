import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import AdminInput from "./AdminInput";
import classes from "./Admin.module.css";
import { updateAdminById } from "../../../actions/adminActions";
import makeToast from "../../../Toaster";

const EditAdmin = () => {
  const [edit, setEdit] = useState(false);
  let [arr, setArr] = useState([]);

  const selectedAdmin = JSON.parse(localStorage.getItem("selectedAdmin")) || "";

  const [name, setName] = useState(selectedAdmin.name || "");
  const [email, setEmail] = useState(selectedAdmin.email || "");
  const [number, setNumber] = useState(selectedAdmin.number || "");
  const [password, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState("");

  const [adminAccessArray, setadminAccessArray] = useState(
    selectedAdmin.role || ""
  );

  const fun = (role) => {
    const access =
      adminAccessArray.includes(role) || adminAccessArray.includes("All")
        ? true
        : false;
    return access;
  };

  const [role, setRole] = useState(selectedAdmin.role);
  const [dashboard, setDashboard] = useState(fun("Dashboard"));
  const [job, setJob] = useState(fun("Jobs"));
  const [candidates, setCandidates] = useState(fun("Candidates"));
  const [Employers, setEmployers] = useState(fun("Employers"));
  const [Notes, setNotes] = useState(fun("Notes"));
  const [Webinars, setWebinars] = useState(fun("Webinars"));
  const [Mockests, setMockTests] = useState(fun("MockTests"));
  const [Consultants, setConsultants] = useState(fun("Consultants"));
  const [Subscriptions, setSubscriptions] = useState(fun("Subscriptions"));
  const [Admins, setAdmins] = useState(fun("Admins"));

  const submitHandler = async (id) => {
    console.log(role);
    await updateAdminById(id);
  };

  return (
    <div>
      <div class='main-panel'>
        <div class='content-wrapper'>
          <div class='row'>
            <div class='col-12 grid-margin'>
              <div class='card'>
                <div class='card-body'>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: "10px",
                    }}>
                    <h4 class='card-title'>EDIT ADMIN</h4>
                    <button
                      type='submit'
                      class='btn btn-primary mr-2'
                      style={{ padding: "10px" }}
                      onClick={() => {
                        if (!edit) {
                          setEdit(true);
                        } else {
                          setEdit(false);
                        }
                      }}>
                      {!edit ? "Edit" : "Cancel"}
                    </button>
                  </div>
                  <form class='form-sample'>
                    <div class='row'>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label
                            class='col-sm-3'
                            for='exampleFormControlSelect2'
                            style={{ alignSelf: "center" }}>
                            Name
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              class='form-control'
                              value={name}
                              disabled={!edit}
                              onChange={(e) => {
                                setName(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Email ID
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              class='form-control'
                              disabled={!edit}
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Contact Number
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              class='form-control'
                              disabled={!edit}
                              value={number}
                              onChange={(e) => {
                                setNumber(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Old Password
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='password'
                              class='form-control'
                              disabled={!edit}
                              value={password}
                              onChange={(e) => {
                                setOldPassword(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            New Password
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='password'
                              class='form-control'
                              disabled={!edit}
                              value={newPassword}
                              onChange={(e) => {
                                setNewPassword(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`form-group ${classes["access__div"]}`}>
                      <label htmlFor='access'>Access</label>

                      <div class={classes["access__div--input"]}>
                        <AdminInput
                          label='Dashboard'
                          checked={dashboard}
                          onClick={() => {
                            if (!dashboard) {
                              setDashboard(true);
                              // role.push("Jobs");
                              role.push("Dashboard");
                              console.log(arr);
                            } else {
                              setDashboard(false);
                              setRole(
                                role.filter((role) => role !== "Dashboard")
                              );
                              console.log("Map Function Starts");
                              role.map((role, i) => {
                                console.log("key:", i, " Value:", role);
                              });
                            }
                          }}
                        />
                        <AdminInput
                          label='Jobs'
                          checked={job}
                          onClick={() => {
                            if (!job) {
                              setJob(true);
                              // role.push("Jobs");
                              role.push("Jobs");
                              console.log(arr);
                            } else {
                              setJob(false);
                              setRole(role.filter((role) => role !== "Jobs"));
                              console.log("Map Function Starts");
                              role.map((role, i) => {
                                console.log("key:", i, " Value:", role);
                              });
                            }
                          }}
                        />
                        <AdminInput
                          label='Candidates'
                          checked={candidates}
                          onClick={() => {
                            if (!candidates) {
                              setCandidates(true);
                              role.push("Candidates");
                              arr.push("Candidates");
                              console.log(role);
                            } else {
                              setCandidates(false);
                              arr = role.filter(
                                (role) => role !== "Candidates"
                              );
                              setRole(arr);
                            }
                          }}
                        />
                        <AdminInput
                          label='Employers'
                          checked={Employers}
                          onClick={() => {
                            if (!Employers) {
                              setEmployers(true);
                              role.push("Employers");
                              arr.push("Employers");
                              console.log(role);
                            } else {
                              setEmployers(false);
                              arr = role.filter((role) => role !== "Employers");
                              setRole(arr);
                            }
                          }}
                        />
                        <AdminInput
                          label='Notes'
                          checked={Notes}
                          onClick={() => {
                            if (!Notes) {
                              setNotes(true);
                              role.push("Notes");
                              arr.push("Notes");
                              console.log(role);
                            } else {
                              setNotes(false);
                              arr = role.filter((role) => role !== "Notes");
                              setRole(arr);
                            }
                          }}
                        />
                        <AdminInput
                          label='Webinars'
                          checked={Webinars}
                          onClick={() => {
                            console.log("Before :", Webinars);
                            if (!Webinars) {
                              setWebinars(true);
                              role.push("Webinars");
                              console.log(Webinars);
                              arr.push("Webinars");
                              console.log(role);
                            } else {
                              setWebinars(false);
                              console.log("After :", Webinars);
                              arr = role.filter((role) => role !== "Webinars");
                              setRole(arr);
                            }
                          }}
                        />
                        <AdminInput
                          label='Mock Tests'
                          checked={Mockests}
                          onClick={() => {
                            if (!Mockests) {
                              setMockTests(true);
                              role.push("MockTests");
                              arr.push("MockTests");
                              console.log(role);
                            } else {
                              setMockTests(false);
                              arr = role.filter((role) => role !== "MockTests");
                              setRole(arr);
                            }
                          }}
                        />
                        <AdminInput
                          label='Consultants'
                          checked={Consultants}
                          onClick={() => {
                            if (!Consultants) {
                              setConsultants(true);
                              role.push("Consultants");
                              arr.push("Consultants");
                              console.log(role);
                            } else {
                              setConsultants(false);
                              arr = role.filter(
                                (role) => role !== "Consultants"
                              );
                              setRole(arr);
                            }
                          }}
                        />
                        <AdminInput
                          label='Subscriptions'
                          checked={Subscriptions}
                          onClick={() => {
                            if (!Subscriptions) {
                              setSubscriptions(true);
                              role.push("Subscriptions");
                              arr.push("Subscriptions");
                              console.log(role);
                            } else {
                              setSubscriptions(false);
                              arr = role.filter(
                                (role) => role !== "Subscriptions"
                              );
                              setRole(arr);
                            }
                          }}
                        />
                        <AdminInput
                          label='Admins'
                          checked={Admins}
                          onClick={() => {
                            if (!Admins) {
                              setAdmins(true);
                              role.push("Admins");
                              arr.push("Admins");
                              console.log(role);
                            } else {
                              setAdmins(false);
                              arr = role.filter((role) => role !== "Admins");
                              setRole(arr);
                            }
                          }}
                        />
                      </div>
                    </div>

                    <button
                      type='submit'
                      class='btn btn-primary mr-2'
                      onClick={(e) => {
                        e.preventDefault();
                        submitHandler(selectedAdmin._id);
                      }}>
                      {!edit ? "Submit" : "Save"}
                    </button>
                    <button
                      class='btn btn-light'
                      onClick={(e) => e.preventDefault()}>
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer class='footer'>
          <div class='d-sm-flex justify-content-center justify-content-sm-between'>
            <span class='text-muted text-center text-sm-left d-block d-sm-inline-block'>
              Copyright © 2021{" "}
              <a href='https://www.toodecimal.com' target='_blank'>
                Too Decimal
              </a>
              . All rights reserved.
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default EditAdmin;
