import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { createUser } from "../../../actions/adminActions";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import makeToast from "../../../Toaster";

const AddCandidates = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [saved, setSaved] = useState();
  const history = useHistory();

  return (
    <div>
      <div class='sidebar-light'>
        <div class='container-scroller'>
          <div class='main-panel'>
            <div class='content-wrapper'>
              <div class='row'>
                <div class='col-12 grid-margin'>
                  <div class='card'>
                    <div class='card-body'>
                      <h4 class='card-title'>ADD CANDIDATES</h4>
                      <form class='form-sample'>
                        <div class='column'>
                          <div class='col-md-7'>
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
                          <div class='col-md-7'>
                            <div class='form-group row'>
                              <label class='col-sm-3 col-form-label'>
                                Email
                              </label>
                              <div class='col-sm-9'>
                                <input
                                  type='text'
                                  value={email}
                                  required={true}
                                  onChange={(e) => {
                                    setEmail(e.target.value);
                                  }}
                                  class='form-control'
                                />
                              </div>
                            </div>
                          </div>
                          <div class='col-md-7'>
                            <div class='form-group row'>
                              <label
                                class='col-sm-3'
                                for='exampleFormControlSelect2'
                                style={{ alignSelf: "center" }}>
                                Contact Number
                              </label>
                              <div class='col-sm-9'>
                                <input
                                  type='number'
                                  class='form-control'
                                  required={true}
                                  value={number}
                                  onChange={(e) => {
                                    setNumber(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          type='button'
                          onClick={async (e) => {
                            e.preventDefault();

                            if (name === "" || email === "" || number === "") {
                              return makeToast(
                                "error",
                                "Please add all the fields"
                              );
                            }

                            setSaved(await createUser({ name, email, number }));
                            if (saved) {
                              makeToast("success", "Created");
                              history.push("/candidates");
                            } else {
                              history.push("/candidates");
                            }
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
        </div>
      </div>
    </div>
  );
};

export default connect(null, {
  createUser,
})(AddCandidates);
