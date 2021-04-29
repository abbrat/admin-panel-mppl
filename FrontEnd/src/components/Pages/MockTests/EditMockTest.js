import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { createMockTests } from "../../../actions/adminActions";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import makeToast from "../../Toaster";

const EditMockTest = (props) => {
  const [edit, setEdit] = useState(false);
  const [mockTest, setMockTest] = useState(
    JSON.parse(localStorage.getItem("mockTest"))
  );
  const [testCode, setTestCode] = useState(mockTest.TestCode || "");
  const [testTitle, setTestTitle] = useState(mockTest.TestTitle || "");
  const [category, setCategory] = useState(mockTest.Category || "");
  const [duration, setDuration] = useState(mockTest.Duration || "");
  const [testDetails, setTestDetails] = useState(
    mockTest.TestDescription || ""
  );
  const [guidelines, setGuidelines] = useState(mockTest.Guidelines || "");
  const [validity, setValidity] = useState(mockTest.Validity || "");
  const [file, setFile] = useState(mockTest.file || "");
  const [saved, setSaveed] = useState();
  const history = useHistory();

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
                          <h4 class="card-title">EDIT MOCK TEST</h4>
                          <button
                            type="submit"
                            class="btn btn-primary mr-2"
                            style={{ padding: "10px" }}
                            onClick={() => {
                              if (!edit) {
                                setEdit(true);
                              } else {
                                setEdit(false);
                              }
                            }}
                          >
                            {!edit ? "Edit" : "Cancel"}
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
                                    class="form-control"
                                    value={testCode}
                                    onChange={(e) => {
                                      setTestCode(e.target.value);
                                    }}
                                    disabled={!edit}
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
                                    disabled={!edit}
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
                                <input
                                  class="form-control col-sm-9"
                                  id="exampleFormControlSelect2"
                                  value={category}
                                  onChange={(e) => {
                                    setCategory(e.target.value);
                                  }}
                                  disabled={!edit}
                                ></input>
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
                                    disabled={!edit}
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
                                    disabled={!edit}
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
                                    disabled={!edit}
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
                                    type="text"
                                    class="form-control"
                                    value={validity}
                                    onChange={(e) => {
                                      setValidity(e.target.value);
                                    }}
                                    disabled={!edit}
                                  />
                                  <span class="input-group-addon input-group-append border-left">
                                    <span class="mdi mdi-calendar input-group-text"></span>
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div class="col-md-6">
                              <div class="form-group row">
                                <label class="col-sm-3 col-form-label">
                                  File
                                </label>
                                <div class="col-sm-9 grid-margin stretch-card">
                                  <div class="card" style={{ width: "20px" }}>
                                    <div class="card-body">
                                      <h4 class="card-title">
                                        Drop test file here
                                      </h4>
                                      <input
                                        style={{ width: "290px" }}
                                        disabled={!edit}
                                        type="file"
                                        // action="https://www.bootstrapdash.com/file-upload"
                                        class="dropzone"
                                        value={file}
                                        onChange={(e) => {
                                          setFile(e.target.value);
                                        }}
                                        id="my-awesome-dropzone"
                                      ></input>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={async () => {
                              setSaveed(
                                await props.createMockTests({
                                  TestCode: testCode,
                                  TestTitle: testTitle,
                                  Category: category,
                                  Duration: duration,
                                  TestDteails: testDetails,
                                  Guidelines: guidelines,
                                  Validity: validity,
                                })
                              );
                              if (saved) {
                                history.goBack();
                              } else {
                                history.goBack();
                              }
                            }}
                            class="btn btn-primary mr-2"
                          >
                            {!edit ? "Submit" : "Save"}
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
})(EditMockTest);
