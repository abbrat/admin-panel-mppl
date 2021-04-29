import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";

const EditAdmin = () => {
  const [edit, setEdit] = useState(false);

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
                              disabled={!edit}
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
                            />
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Employee ID
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              class='form-control'
                              disabled={!edit}
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
                                        value='sample'
                                        disabled={!edit}
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
                                        value='sample'
                                        disabled={!edit}
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
                                        value='sample'
                                        disabled={!edit}
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
                                        value='sample'
                                        disabled={!edit}
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
                                        value='sample'
                                        disabled={!edit}
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
                                        value='sample'
                                        disabled={!edit}
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
                                        value='sample'
                                        disabled={!edit}
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
                                        value='sample'
                                        disabled={!edit}
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
                                        value='sample'
                                        disabled={!edit}
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
                                        value='sample'
                                        disabled={!edit}
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
                    <button type='submit' class='btn btn-primary mr-2'>
                      {!edit ? "Submit" : "Save"}
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
    </div>
  );
};

export default EditAdmin;
