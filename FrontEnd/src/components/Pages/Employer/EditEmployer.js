import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { updateCompanyById } from "../../../actions/adminActions";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import makeToast from "../../../Toaster";
import InputArray from "../Candidates/InputArray";

const EditEmployer = (props) => {
  const [edit, setEdit] = useState(false);
  const [company, setCompany] = useState(
    JSON.parse(localStorage.getItem("company"))
  );

  console.log(company.OtherOffices);

  const [locationArray, setLocationArray] = useState(
    company.OtherOffices || []
  );

  const [locationVal, setLocationVal] = useState("");

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
  const [CIN, setCIN] = useState(company.CIN);
  const history = useHistory();
  const [saved, setSaved] = useState();
  const [inputBox, setInputBox] = useState();
  const [Logo, setLogo] = useState(company.Logo || "");

  const uploadFile = (e) => {
    if (e.target.files[0] == null) {
      console.log("Logo Not Uploaded");
    } else {
      setLogo(e.target.files[0]);
    }
  };

  const deleteLocation = (enteredSkill) => {
    setLocationArray((prevState) => {
      return prevState.filter((skill) => {
        return skill !== enteredSkill;
      });
    });
  };

  const submitHandler = async () => {
    const formData = new FormData();
    formData.append("CompanyName", CompanyName);
    formData.append("CompanyDescription", CompanyDescription);
    formData.append("CIN", CIN);
    formData.append("JoiningDate", JoiningDate);
    formData.append("HeadOffice", HeadOffice);
    formData.append("Website", Website);
    formData.append("Validity", Validity);
    formData.append("Logo", Logo);
    formData.append("OtherOffices", locationArray);
    console.log(FormData);
    setSaved(await updateCompanyById(formData, company._id));
    if (saved) {
      history.push("/employers");
    } else {
      history.push("/employers");
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
                          <div class='input-group date datepicker col-sm-9'>
                            <input
                              type='date'
                              class='form-control'
                              value={JoiningDate}
                              onChange={(e) => {
                                setJoiningDate(e.target.value);
                              }}
                              disabled={!edit}
                            />
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
                            class='input-group col-sm-9'>
                            <input
                              type='date'
                              class='form-control'
                              value='sample'
                              value={Validity}
                              onChange={(e) => {
                                setValidity(e.target.value);
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
                            style={{ alignSelf: "center" }}>
                            Other Location
                          </label>
                          <div class='col-sm-9'>
                            <form class='form-inline repeater'>
                              <div data-repeater-list='group-a'>
                                <div data-repeater-item class='d-flex mb-2'>
                                  <label class='sr-only'>Users</label>
                                  <div class='input-group mb-2 mr-sm-2 mb-sm-0'>
                                    <div class='input-group-prepend'>
                                      <span class='input-group-text'>@</span>
                                    </div>
                                    <input
                                      type='text'
                                      class='form-control form-control-sm'
                                      id='inlineFormInputGroup1'
                                      value={locationVal}
                                      onChange={(e) => {
                                        setLocationVal(e.target.value);
                                      }}
                                      placeholder='Add user'
                                    />
                                  </div>
                                </div>
                              </div>
                              <button
                                data-repeater-create
                                type='button'
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (locationVal === "") {
                                    return;
                                  }
                                  setLocationArray((prevState) => {
                                    return [...prevState, locationVal];
                                  });
                                  setLocationVal("");
                                }}
                                class='btn btn-info btn-sm icon-btn ml-2 mb-2'>
                                <i class='mdi mdi-plus'></i>
                              </button>
                            </form>

                            {locationArray &&
                              locationArray.map((loc) => (
                                <InputArray
                                  key={Math.random()}
                                  text={loc}
                                  onDelete={deleteLocation}
                                />
                              ))}
                          </div>
                        </div>
                      </div>

                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>Logo</label>
                          <div class='col-sm-9 grid-margin stretch-card'>
                            <div class='card' style={{ width: "20px" }}>
                              <div class='card-body'>
                                <h4 class='card-title'>Dropzone</h4>
                                <input
                                  style={{ width: "290px" }}
                                  type='file'
                                  disabled={!edit}
                                  onChange={(e) => {
                                    uploadFile(e);
                                  }}
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
                      onClick={(e) => {
                        e.preventDefault();
                        submitHandler();
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
  // createCompany,
})(EditEmployer);
