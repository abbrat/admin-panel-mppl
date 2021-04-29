import React from "react";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";

const Profile = () => {
  return (
    <div>
      <div class="sidebar-light">
        <div class="container-scroller">
          <Navbar />
          <div class="container-fluid page-body-wrapper">
            <Sidebar />
            <div class="main-panel">
              <div class="content-wrapper">
                <div class="row">
                  <div class="col-12 grid-margin">
                    <div class="card">
                      <div class="card-body">
                        <h4 class="card-title">Profile</h4>
                        <form class="form-sample">
                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group row">
                                <label
                                  class="col-sm-3"
                                  for="exampleFormControlSelect2"
                                  style={{ alignSelf: "center" }}
                                >
                                  Name
                                </label>
                                <div class="col-sm-9">
                                  <input type="text" class="form-control" />
                                </div>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group row">
                                <label class="col-sm-3 col-form-label">
                                  Email ID
                                </label>
                                <div class="col-sm-9">
                                  <input type="text" class="form-control" />
                                </div>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group row">
                                <label class="col-sm-3 col-form-label">
                                  Contact Number
                                </label>
                                <div class="col-sm-9">
                                  <input type="text" class="form-control" />
                                </div>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group row">
                                <label class="col-sm-3 col-form-label">
                                  Employee ID
                                </label>
                                <div class="col-sm-9">
                                  <input
                                    type="text"
                                    class="form-control"
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                            <form>
                              <div>
                                <div
                                  class="col-md-20"
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                  }}
                                >
                                  <label htmlFor="" style={{ padding: "15px" }}>
                                    Access
                                  </label>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                      }}
                                    >
                                      <div
                                        class="form-group"
                                        style={{
                                          padding: "10px",
                                          paddingBottom: "2px",
                                        }}
                                      >
                                        <div class="form-check">
                                          <label class="form-check-label">
                                            <input
                                              type="checkbox"
                                              class="form-check-input"
                                            />
                                            Dashboard
                                          </label>
                                        </div>
                                      </div>
                                      <div
                                        class="form-group"
                                        style={{
                                          padding: "10px",
                                          paddingBottom: "2px",
                                        }}
                                      >
                                        <div class="form-check">
                                          <label class="form-check-label">
                                            <input
                                              type="checkbox"
                                              class="form-check-input"
                                            />
                                            Jobs
                                          </label>
                                        </div>
                                      </div>
                                      <div
                                        class="form-group"
                                        style={{
                                          padding: "10px",
                                          paddingBottom: "2px",
                                        }}
                                      >
                                        <div class="form-check">
                                          <label class="form-check-label">
                                            <input
                                              type="checkbox"
                                              class="form-check-input"
                                            />
                                            Candidates
                                          </label>
                                        </div>
                                      </div>
                                      <div
                                        class="form-group"
                                        style={{
                                          padding: "10px",
                                          paddingBottom: "2px",
                                        }}
                                      >
                                        <div class="form-check">
                                          <label class="form-check-label">
                                            <input
                                              type="checkbox"
                                              class="form-check-input"
                                            />
                                            Employers
                                          </label>
                                        </div>
                                      </div>
                                      <div
                                        class="form-group"
                                        style={{
                                          padding: "10px",
                                          paddingBottom: "2px",
                                        }}
                                      >
                                        <div class="form-check">
                                          <label class="form-check-label">
                                            <input
                                              type="checkbox"
                                              class="form-check-input"
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
                                      }}
                                    >
                                      <div
                                        class="form-group"
                                        style={{
                                          padding: "10px",
                                          paddingBottom: "2px",
                                          paddingTop: "2px",
                                        }}
                                      >
                                        <div class="form-check">
                                          <label class="form-check-label">
                                            <input
                                              type="checkbox"
                                              class="form-check-input"
                                            />
                                            Webinars
                                          </label>
                                        </div>
                                      </div>
                                      <div
                                        class="form-group"
                                        style={{
                                          padding: "10px",
                                          paddingBottom: "2px",
                                          paddingTop: "2px",
                                        }}
                                      >
                                        <div class="form-check">
                                          <label class="form-check-label">
                                            <input
                                              type="checkbox"
                                              class="form-check-input"
                                            />
                                            Mock Tests
                                          </label>
                                        </div>
                                      </div>
                                      <div
                                        class="form-group"
                                        style={{
                                          padding: "10px",
                                          paddingBottom: "2px",
                                          paddingTop: "2px",
                                        }}
                                      >
                                        <div class="form-check">
                                          <label class="form-check-label">
                                            <input
                                              type="checkbox"
                                              class="form-check-input"
                                            />
                                            Consultants
                                          </label>
                                        </div>
                                      </div>
                                      <div
                                        class="form-group"
                                        style={{
                                          padding: "10px",
                                          paddingBottom: "2px",
                                          paddingTop: "2px",
                                        }}
                                      >
                                        <div class="form-check">
                                          <label class="form-check-label">
                                            <input
                                              type="checkbox"
                                              class="form-check-input"
                                            />
                                            Subscription
                                          </label>
                                        </div>
                                      </div>
                                      <div
                                        class="form-group"
                                        style={{
                                          padding: "10px",
                                          paddingBottom: "2px",
                                          paddingTop: "2px",
                                        }}
                                      >
                                        <div class="form-check">
                                          <label class="form-check-label">
                                            <input
                                              type="checkbox"
                                              class="form-check-input"
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
                          <button type="submit" class="btn btn-primary mr-2">
                            Submit
                          </button>
                          <button class="btn btn-light">Cancel</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <footer class="footer">
                <div class="d-sm-flex justify-content-center justify-content-sm-between">
                  <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">
                    Copyright © 2021{" "}
                    <a href="https://www.toodecimal.com" target="_blank">
                      Too Decimal
                    </a>
                    . All rights reserved.
                  </span>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
