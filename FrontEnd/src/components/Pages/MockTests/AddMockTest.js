import { connect } from "react-redux";
import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import Select from "react-select";
import { createMockTests } from "../../../actions/adminActions";
import { useHistory } from "react-router";
import makeToast from "../../Toaster";

const AddMockTest = (props) => {
  const [saved, setSaved] = useState();
  const history = useHistory();
  const [testCode, setTestCode] = useState("");
  const [testTitle, setTestTitle] = useState("");
  const [category, setCatogery] = useState("");
  const [duration, setDuration] = useState("");
  const [testDetails, setTestDetails] = useState("");
  const [guidelines, setGuidelines] = useState("");
  const [validity, setValidity] = useState("");
  const [file, setFile] = useState("");

  const options = [
    { value: "Sample Value 1", label: "sample lable 1" },
    { value: "Sample Value 2", label: "sample lable 2" },
    { value: "Sample Value 3", label: "sample lable 3" },
    { value: "Sample Value 4", label: "sample lable 4" },
    { value: "Sample Value 5", label: "sample lable 5" },
  ];
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
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            padding: "10px",
                          }}
                        >
                          <h4 class="card-title">ADD MOCK TEST</h4>
                          <button
                            type="submit"
                            class="btn btn-dark btn-rounded"
                            style={{ padding: "10px" }}
                          >
                            Sample Test File
                          </button>
                        </div>
                        <form class="form-sample">
                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group row">
                                <label class="col-sm-3 col-form-label">
                                  Test Code
                                </label>
                                <div class="col-sm-9">
                                  <input
                                    type="text"
                                    value={testCode}
                                    onChange={(e) => {
                                      setTestCode(e.target.value);
                                    }}
                                    class="form-control"
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group row">
                                <label class="col-sm-3 col-form-label">
                                  Test Title
                                </label>
                                <div class="col-sm-9">
                                  <input
                                    type="text"
                                    class="form-control"
                                    value={testTitle}
                                    onChange={(e) => {
                                      setTestTitle(e.target.value);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group row">
                                <label
                                  class="col-sm-3"
                                  for="exampleFormControlSelect2"
                                  style={{ alignSelf: "center" }}
                                >
                                  Category
                                </label>
                                <Select
                                  className=" col-sm-9"
                                  options={options}
                                  onChange={(e) => {
                                    setCatogery(e.value);
                                    console.log(category);
                                  }}
                                ></Select>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group row">
                                <label class="col-sm-3 col-form-label">
                                  Duration{" "}
                                </label>
                                <div class="col-sm-9">
                                  <input
                                    type="text"
                                    class="form-control"
                                    value={duration}
                                    onChange={(e) => {
                                      setDuration(e.target.value);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group row">
                                <label class="col-sm-3 col-form-label">
                                  Test Details
                                </label>
                                <div class="col-sm-9">
                                  <textarea
                                    class="form-control"
                                    id="exampleTextarea1"
                                    rows="4"
                                    value={testDetails}
                                    onChange={(e) => {
                                      setTestDetails(e.target.value);
                                    }}
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group row">
                                <label class="col-sm-3 col-form-label">
                                  Guidelines
                                </label>
                                <div class="col-sm-9">
                                  <textarea
                                    class="form-control"
                                    id="exampleTextarea1"
                                    rows="4"
                                    value={guidelines}
                                    onChange={(e) => {
                                      setGuidelines(e.target.value);
                                    }}
                                  ></textarea>
                                </div>
                              </div>
                            </div>

                            <div class="col-md-6">
                              <div class="form-group row">
                                <label class="col-sm-3 col-form-label">
                                  Validity
                                </label>
                                <div
                                  id="datepicker-popup"
                                  class="input-group date datepicker col-sm-9"
                                >
                                  <input
                                    type="date"
                                    class="form-control"
                                    value={validity}
                                    onChange={(e) => {
                                      setValidity(e.target.value);
                                    }}
                                  />
                                  <span class="input-group-addon input-group-append border-left">
                                    {/* <span class="mdi mdi-calendar input-group-text"></span> */}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setSaved(
                                props.createMockTests({
                                  TestCode: testCode,
                                  TestTitle: testTitle,
                                  Category: category,
                                  Duration: duration,
                                  TestDescription: testDetails,
                                  Guidelines: guidelines,
                                  Validity: validity,
                                })
                              );
                              if (saved) {
                                makeToast("success", "Success");
                                history.push("/active-mock-test");
                              } else {
                                makeToast("error", "Error");
                                history.push("/active-mock-test");
                              }
                            }}
                            class="btn btn-primary mr-2"
                          >
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

export default connect(null, {
  createMockTests,
})(AddMockTest);
