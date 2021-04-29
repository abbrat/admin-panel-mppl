import axios from "axios";
import React, { useState } from "react";

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

  const [arr, setArr] = useState([]);

  const createAdmin = async (formData) => {
    console.log("FormData", formData);
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
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div class='main-panel'>
      <div class='content-wrapper'>
        <div class='row'>
          <div class='col-12 grid-margin'>
            <div class='card'>
              <div class='card-body'>
                <h4 class='card-title'>Add Admin</h4>
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
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div class='col-md-6'>
                      <div class='form-group row'>
                        <label class='col-sm-3 col-form-label'>Email ID</label>
                        <div class='col-sm-9'>
                          <input
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
                        <label class='col-sm-3 col-form-label'>
                          Contact Number
                        </label>
                        <div class='col-sm-9'>
                          <input
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
                        <label class='col-sm-3 col-form-label'>Password</label>
                        <div class='col-sm-9'>
                          <input
                            type='password'
                            class='form-control'
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <form>
                      <div>
                        <div
                          class='col-md-20'
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                          }}>
                          <label htmlFor='' style={{ padding: "15px" }}>
                            Access
                          </label>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}>
                              <div
                                class='form-group'
                                style={{
                                  padding: "10px",
                                  paddingBottom: "2px",
                                }}>
                                <div class='form-check'>
                                  <label class='form-check-label'>
                                    <input
                                      type='checkbox'
                                      class='form-check-input'
                                    />
                                    Dashboard
                                  </label>
                                </div>
                              </div>
                              <div
                                class='form-group'
                                style={{
                                  padding: "10px",
                                  paddingBottom: "2px",
                                }}>
                                <div class='form-check'>
                                  <label class='form-check-label'>
                                    <input
                                      type='checkbox'
                                      class='form-check-input'
                                      onClick={() => {
                                        if (!job) {
                                          setJob(true);
                                          // role.push("Jobs");
                                          role.push("Jobs");
                                          console.log(arr);
                                        } else {
                                          setJob(false);
                                          setRole(
                                            role.filter(
                                              (role) => role !== "Jobs"
                                            )
                                          );
                                          console.log("Map Function Starts");
                                          role.map((role, i) => {
                                            console.log(
                                              "key:",
                                              i,
                                              " Value:",
                                              role
                                            );
                                          });
                                          // console.log(role);
                                        }
                                      }}
                                    />
                                    Jobs
                                  </label>
                                </div>
                              </div>
                              <div
                                class='form-group'
                                style={{
                                  padding: "10px",
                                  paddingBottom: "2px",
                                }}>
                                <div class='form-check'>
                                  <label class='form-check-label'>
                                    <input
                                      type='checkbox'
                                      class='form-check-input'
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
                                          console.log(arr);
                                          console.log(role);
                                        }
                                      }}
                                    />
                                    Candidates
                                  </label>
                                </div>
                              </div>
                              <div
                                class='form-group'
                                style={{
                                  padding: "10px",
                                  paddingBottom: "2px",
                                }}>
                                <div class='form-check'>
                                  <label class='form-check-label'>
                                    <input
                                      type='checkbox'
                                      class='form-check-input'
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
                                          console.log(arr);
                                          console.log(role);
                                        }
                                      }}
                                    />
                                    Employers
                                  </label>
                                </div>
                              </div>
                              <div
                                class='form-group'
                                style={{
                                  padding: "10px",
                                  paddingBottom: "2px",
                                }}>
                                <div class='form-check'>
                                  <label class='form-check-label'>
                                    <input
                                      type='checkbox'
                                      class='form-check-input'
                                      onClick={() => {
                                        if (!Notes) {
                                          setNotes(true);
                                          role.push("Notes");
                                          arr.push("Notes");
                                          console.log(role);
                                        } else {
                                          setNotes(false);
                                          arr = role.filter(
                                            (role) => role !== "Notes"
                                          );
                                          setRole(arr);
                                          console.log(arr);
                                          console.log(role);
                                        }
                                      }}
                                    />
                                    Notes
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}>
                              <div
                                class='form-group'
                                style={{
                                  padding: "10px",
                                  paddingBottom: "2px",
                                  paddingTop: "2px",
                                }}>
                                <div class='form-check'>
                                  <label class='form-check-label'>
                                    <input
                                      type='checkbox'
                                      class='form-check-input'
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
                                          console.log(arr);
                                          console.log(role);
                                        }
                                      }}
                                    />
                                    Webinars
                                  </label>
                                </div>
                              </div>
                              <div
                                class='form-group'
                                style={{
                                  padding: "10px",
                                  paddingBottom: "2px",
                                  paddingTop: "2px",
                                }}>
                                <div class='form-check'>
                                  <label class='form-check-label'>
                                    <input
                                      type='checkbox'
                                      class='form-check-input'
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
                                          console.log(arr);
                                          console.log(role);
                                        }
                                      }}
                                    />
                                    Mock Tests
                                  </label>
                                </div>
                              </div>
                              <div
                                class='form-group'
                                style={{
                                  padding: "10px",
                                  paddingBottom: "2px",
                                  paddingTop: "2px",
                                }}>
                                <div class='form-check'>
                                  <label class='form-check-label'>
                                    <input
                                      type='checkbox'
                                      class='form-check-input'
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
                                          console.log(arr);
                                          console.log(role);
                                        }
                                      }}
                                    />
                                    Consultants
                                  </label>
                                </div>
                              </div>
                              <div
                                class='form-group'
                                style={{
                                  padding: "10px",
                                  paddingBottom: "2px",
                                  paddingTop: "2px",
                                }}>
                                <div class='form-check'>
                                  <label class='form-check-label'>
                                    <input
                                      type='checkbox'
                                      class='form-check-input'
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
                                          console.log(arr);
                                          console.log(role);
                                        }
                                      }}
                                    />
                                    Subscription
                                  </label>
                                </div>
                              </div>
                              <div
                                class='form-group'
                                style={{
                                  padding: "10px",
                                  paddingBottom: "2px",
                                  paddingTop: "2px",
                                }}>
                                <div class='form-check'>
                                  <label class='form-check-label'>
                                    <input
                                      type='checkbox'
                                      class='form-check-input'
                                      onClick={() => {
                                        if (!Admins) {
                                          setAdmins(true);
                                          role.push("Admins");
                                          arr.push("Admins");
                                          console.log(role);
                                        } else {
                                          setAdmins(false);
                                          arr = role.filter(
                                            (role) => role !== "Admins"
                                          );
                                          setRole(arr);
                                          console.log(arr);
                                          console.log(role);
                                        }
                                      }}
                                    />
                                    Admins
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
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
                  <button class='btn btn-light'>Cancel</button>
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
  );
};

export default AddAdmin;
