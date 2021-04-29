import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { createCompany } from "../../../actions/adminActions";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import makeToast from "../../../Toaster";

const EditEmployer = (props) => {
  const [edit, setEdit] = useState(false);
  const [company, setCompany] = useState(
    JSON.parse(localStorage.getItem("company"))
  );
  // useEffect(() => {
  //   setCompany(JSON.parse(localStorage.getItem("company")));
  // });

  const [CompanyName, setCompanyName] = useState(company.CompanyName || "");
  const [CompanyEmail, setCompanyEmail] = useState(company.CompanyEmail || "");
  const [CompanyContact, setCompanyContact] = useState(
    company.CompanyContact || ""
  );
  const [Website, setWebsite] = useState(company.Website || "");
  const [CompanyDescription, setCompanyDescription] = useState(
    company.CompanyDescription || ""
  );
  const [JoiningDate, setJoiningDate] = useState(company.JoiningDate || "");
  const [Validity, setValidity] = useState(company.Validity || "");
  const [HeadOffice, setHeadOffice] = useState(company.HeadOffice || "");
  const [Latitude, setLatitude] = useState(company.Latitude || "");
  const [Longitude, setLongitude] = useState(company.Longitude || "");
  const [Locations, setLocations] = useState(company.Locations || "");
  const [CIN, setCIN] = useState(company.CIN);
  const history = useHistory();
  const [saved, setSaved] = useState();
  const [inputBox, setInputBox] = useState(
    <div class='col-sm-9'>
      <form class='form-inline repeater'>
        <div data-repeater-list='group-a'>
          <div data-repeater-item class='d-flex mb-2'>
            <label class='sr-only' for='inlineFormInputGroup1'>
              Users
            </label>
            <div class='input-group mb-2 mr-sm-2 mb-sm-0'>
              <div class='input-group-prepend'>
                <span class='input-group-text'>@</span>
              </div>
              <input
                type='text'
                class='form-control form-control-sm'
                id='inlineFormInputGroup1'
                placeholder='Add user'
                value={Locations}
                onChange={(e) => {
                  setLocations(e.target.value);
                }}
              />
            </div>
            <button type='submit' class='btn btn-success btn-sm'>
              Submit
            </button>
            <button
              data-repeater-delete
              type='button'
              class='btn btn-danger btn-sm icon-btn ml-2'>
              <i class='mdi mdi-delete'></i>
            </button>
          </div>
        </div>
        <button
          data-repeater-create
          type='button'
          onClick={() => {
            let arr = [];
            arr = inputArr;
            arr.push(inputBox);
            setInputArr(arr);
            console.log(inputArr);
          }}
          class='btn btn-info btn-sm icon-btn ml-2 mb-2'>
          <i class='mdi mdi-plus'></i>
        </button>
      </form>
    </div>
  );

  const [inputArr, setInputArr] = useState([]);

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
                    <h4 class='card-title'>EDIT EMPLOYER</h4>
                    <button
                      type='s-ubmit'
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
                            Company Name
                          </label>
                          <div class='col-sm-9'>
                            <input
                              disabled={!edit}
                              type='text'
                              value={CompanyName}
                              onChange={(e) => {
                                setCompanyName(e.target.value);
                              }}
                              class='form-control'
                            />
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Company Description
                          </label>
                          <div class='col-sm-9'>
                            <textarea
                              class='form-control'
                              id='exampleTextarea1'
                              rows='4'
                              value={CompanyDescription}
                              onChange={(e) => {
                                setCompanyDescription(e.target.value);
                              }}
                              disabled={!edit}></textarea>
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Joining Date
                          </label>
                          <div
                            id='datepicker-popup'
                            class='input-group date datepicker col-sm-9'>
                            <input
                              type='text'
                              class='form-control'
                              value={JoiningDate}
                              onChange={(e) => {
                                setJoiningDate(e.target.value);
                              }}
                              disabled={!edit}
                            />
                            <span class='input-group-addon input-group-append border-left'>
                              <span class='mdi mdi-calendar input-group-text'></span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Head Office
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              class='form-control'
                              value={HeadOffice}
                              onChange={(e) => {
                                setHeadOffice(e.target.value);
                              }}
                              disabled={!edit}
                            />
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Latitude
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              class='form-control'
                              value={Latitude}
                              onChange={(e) => {
                                setLatitude(e.target.value);
                              }}
                              disabled={!edit}
                            />
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Longitude
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              class='form-control'
                              value={Longitude}
                              onChange={(e) => {
                                setLongitude(e.target.value);
                              }}
                              disabled={!edit}
                            />
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Validity
                          </label>
                          <div
                            id='datepicker-popup'
                            class='input-group date datepicker col-sm-9'>
                            <input
                              type='text'
                              class='form-control'
                              value='sample'
                              value={Validity}
                              onChange={(e) => {
                                setValidity(e.target.value);
                              }}
                              disabled={!edit}
                            />
                            <span class='input-group-addon input-group-append border-left'>
                              <span class='mdi mdi-calendar input-group-text'></span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label
                            class='col-sm-3'
                            for='exampleFormControlSelect2'
                            style={{ alignSelf: "center" }}>
                            Website
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              class='form-control'
                              value={Website}
                              onChange={(e) => {
                                setWebsite(e.target.value);
                              }}
                              disabled={!edit}
                            />
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label
                            class='col-sm-3'
                            for='exampleFormControlSelect2'
                            style={{ alignSelf: "center" }}>
                            Locations
                          </label>
                          {inputArr.length != 0
                            ? inputArr.map((arr) => {
                                return <>{arr}</>;
                              })
                            : inputBox}
                        </div>
                      </div>

                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>File</label>
                          <div class='col-sm-9 grid-margin stretch-card'>
                            <div class='card' style={{ width: "20px" }}>
                              <div class='card-body'>
                                <h4 class='card-title'>Dropzone</h4>
                                <input
                                  style={{ width: "290px" }}
                                  type='file'
                                  disabled={!edit}
                                  // action="https://www.bootstrapdash.com/file-upload"
                                  class='dropzone'
                                  id='my-awesome-dropzone'></input>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={async () => {
                        setSaved(
                          await createCompany({
                            CompanyName,
                            Website,
                            CompanyDescription,
                            HeadOffice,
                            Latitude,
                            Longitude,
                            CIN,
                          })
                        );
                        if (saved) {
                          history.push("/employers");
                        } else {
                          history.push("/employers");
                        }
                      }}
                      type='button'
                      class='btn btn-primary mr-2'>
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

export default connect(null, {
  createCompany,
})(EditEmployer);
