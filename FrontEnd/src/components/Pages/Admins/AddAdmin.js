import axios from "axios";
import React, { useState } from "react";
import AdminInput from "./AdminInput";

import classes from "./Admin.module.css";
import makeToast from "../../../Toaster";
import { useHistory } from "react-router";

const AddAdmin = () => {
  const [role, setRole] = useState([]);
  const [job, setJob] = useState(false);
  const [candidates, setCandidates] = useState(false);
  const [Employers, setEmployers] = useState(false);
  const [Notes, setNotes] = useState(false);
  const [Webinars, setWebinars] = useState(false);
  const [Mockests, setMockTests] = useState(false);
  const [Consultants, setConsultants] = useState(false);
  const [Subscriptions, setSubscriptions] = useState(false);
  const [Admins, setAdmins] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  let [arr, setArr] = useState([]);

  const history = useHistory();

  const createAdmin = async (formData) => {
    console.log("FormData", formData);

    if (name === "" || email === "" || number === "" || password === "") {
      return makeToast("error", "Please enter all the fields");
    } else if (role.length === 0) {
      return makeToast("error", "Please add atleast one role");
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "http://localhost:5000/api/admin",
        formData,
        config
      );

      if (res.status === 200) {
        console.log(res.data);
        makeToast("success", "Admin created Successfully");
        history.push("/admins");
      }
    } catch (error) {
      console.log(error);
      makeToast("error", "Error");
    }
  };
  return (
    <div>
      <div class='main-panel'>
        <div class='content-wrapper'>
          <div class='row'>
            <div class='col-12 grid-margin'>
              <div class='card'>
                <div class='card-body'>
                  <h4 class='card-title'>ADD ADMIN</h4>
                  <form class='form-sample'>
                    <div class='row'>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label
                            class='col-sm-3'
                            htmlFor='name'
                            style={{ alignSelf: "center" }}>
                            Name
                          </label>
                          <div class='col-sm-9'>
                            <input
                              id='name'
                              type='text'
                              class='form-control'
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label
                            class='col-sm-3'
                            for='email'
                            style={{ alignSelf: "center" }}>
                            Email
                          </label>
                          <div class='col-sm-9'>
                            <input
                              id='email'
                              type='text'
                              class='form-control'
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
                          <label
                            htmlFor='contact'
                            class='col-sm-3 col-form-label'>
                            Contact Number
                          </label>
                          <div class='col-sm-9'>
                            <input
                              id='contact'
                              type='text'
                              class='form-control'
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
                          <label
                            htmlFor='password'
                            class='col-sm-3 col-form-label'>
                            Password
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='password'
                              class='form-control'
                              id='password'
                              rows='4'
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }}></input>
                          </div>
                        </div>
                      </div>

                      <div class='form-group access__div'>
                        <label htmlFor='access'>Access</label>

                        <div class={classes["access__div--input"]}>
                          <AdminInput label='Dashobard' />
                          <AdminInput
                            label='Jobs'
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
                            label='Cadidates'
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
                            onClick={() => {
                              if (!Employers) {
                                setEmployers(true);
                                role.push("Employers");
                                arr.push("Employers");
                                console.log(role);
                              } else {
                                setEmployers(false);
                                arr = role.filter(
                                  (role) => role !== "Employers"
                                );
                                setRole(arr);
                              }
                            }}
                          />
                          <AdminInput
                            label='Notes'
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
                            label='Webinar'
                            onClick={() => {
                              if (!Webinars) {
                                setWebinars(true);
                                role.push("Webinars");
                                arr.push("Webinars");
                                console.log(role);
                              } else {
                                setWebinars(false);
                                arr = role.filter(
                                  (role) => role !== "Webinars"
                                );
                                setRole(arr);
                              }
                            }}
                          />
                          <AdminInput
                            label='Mock Tests'
                            onClick={() => {
                              if (!Mockests) {
                                setMockTests(true);
                                role.push("MockTests");
                                arr.push("MockTests");
                                console.log(role);
                              } else {
                                setMockTests(false);
                                arr = role.filter(
                                  (role) => role !== "MockTests"
                                );
                                setRole(arr);
                              }
                            }}
                          />
                          <AdminInput
                            label='Consultants'
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
                            label='Subscription'
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
                            label='Admin'
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
                    </div>
                    <button
                      type='button'
                      onClick={() => {
                        createAdmin({
                          name,
                          email,
                          number,
                          password,
                          role,
                        });
                      }}
                      class='btn btn-primary mr-2'>
                      Submit
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

export default AddAdmin;
