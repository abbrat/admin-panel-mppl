import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import {
  updateUserById,
  getUserDetailsByID,
} from "../../../actions/adminActions";

import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import makeToast from "../../../Toaster";
import axios from "axios";
import InputArray from "./InputArray";

const EditCandidate = (props) => {
  const [edit, setEdit] = useState(false);

  const selectedCandidated = props.location.state;
  console.log(selectedCandidated);

  const [name, setName] = useState(selectedCandidated.name || "");
  const [email, setEmail] = useState(selectedCandidated.email || "");
  const [number, setNumber] = useState(selectedCandidated.number || "");
  const [gender, setGender] = useState(selectedCandidated.gender || "");
  const [address, setAddress] = useState(selectedCandidated.address || "");

  const [workLocationArray, setLocationArray] = useState(
    selectedCandidated.preferedWorkLocation
  );
  const [workLocationVal, setWorkLocationVal] = useState("");

  const [skillArray, setSkillArray] = useState(selectedCandidated.skillSet);
  const [skillVal, setSkillVal] = useState("");

  const [languageArray, setLanguageArray] = useState(
    selectedCandidated.languages
  );
  const [langVal, setLangval] = useState("");

  const [about, setAbout] = useState(selectedCandidated.about || "");
  const [linkdin, setLinkdin] = useState(selectedCandidated.linkdin || "");
  const [dob, setDOB] = useState(selectedCandidated.dob || "");
  const [maritalStatus, setMaritalStatus] = useState(
    selectedCandidated.maritalStatus || ""
  );
  const [subscription, setSubscription] = useState(
    selectedCandidated.subscription || ""
  );
  // const [preferedWorkLocation, setPreferedWorkLocation] = useState(
  //   selectedCandidated.email || ""
  // );
  const [resume, setResume] = useState(null);
  const [videoResume, setVideoResume] = useState(null);
  const [saved, setSaved] = useState();
  const history = useHistory();
  const uploadResumeFile = (e) => {
    if (e.target.files[0] == null) {
      console.log("Resume File Not Uploaded!");
    } else {
      setResume(e.target.files[0]);
    }
  };

  const uploadVideoResumeFile = (e) => {
    if (e.target.files[0] == null) {
      console.log("Resume File not Uploaded!");
    } else {
      setVideoResume(e.target.files[0]);
    }
  };

  function convert(date) {
    let formatted_date =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    console.log(formatted_date);
    return formatted_date;
  }

  console.log(selectedCandidated);

  const dataSubmit = async () => {
    // console.log("Location", workLocationArray);
    // console.log("Skills", skillArray);
    // console.log("Language", languageArray);

    const locations = JSON.stringify(workLocationArray);
    const skills = JSON.stringify(skillArray);
    const languages = JSON.stringify(languageArray);

    console.log(typeof locations, locations);
    console.log(typeof skills, skills);
    console.log(typeof languages, languages);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("number", number);
    formData.append("gender", gender);
    formData.append("address", address);
    formData.append("about", about);
    formData.append("linkdin", linkdin);
    formData.append("dob", dob);
    formData.append("maritalStatus", maritalStatus);
    formData.append("subscription", subscription);
    formData.append("preferedWorkLocation", locations);
    formData.append("skillSet", skills);
    formData.append("languages", languages);
    formData.append("videoResume", videoResume);
    formData.append("resume", resume);

    console.log(formData);

    const isUserUpdated = await updateUserById(
      formData,
      selectedCandidated._id
    );

    console.log(isUserUpdated);

    if (isUserUpdated) {
      makeToast("success", "Updated");
      history.push("/candidates");
    } else {
      makeToast("error", "Error");
    }
  };

  const deleteLocation = (location) => {
    setLocationArray((prevState) => {
      return prevState.filter((loc) => {
        return loc !== location;
      });
    });
  };

  const deleteSkill = (enteredSkill) => {
    setSkillArray((prevState) => {
      return prevState.filter((skill) => {
        return skill !== enteredSkill;
      });
    });
  };

  const deleteLanguage = (enteredLang) => {
    setLanguageArray((prevState) => {
      return prevState.filter((lang) => {
        return lang !== enteredLang;
      });
    });
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
                    <h4 class='card-title'>EDIT CANDIDATES</h4>

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
                          <label class='col-sm-3 col-form-label'>Name</label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              class='form-control'
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value);
                              }}
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
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
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
                              value={number}
                              onChange={(e) => {
                                setNumber(e.target.value);
                              }}
                              disabled={!edit}
                            />
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>Gender</label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              class='form-control'
                              value={gender}
                              onChange={(e) => {
                                setGender(e.target.value);
                              }}
                              disabled={!edit}
                            />
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>Address</label>
                          <div class='col-sm-9'>
                            <textarea
                              class='form-control'
                              id='exampleTextarea1'
                              rows='4'
                              value={address}
                              onChange={(e) => {
                                setAddress(e.target.value);
                              }}
                              disabled={!edit}></textarea>
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>About</label>
                          <div class='col-sm-9'>
                            <textarea
                              class='form-control'
                              id='exampleTextarea1'
                              rows='4'
                              value={about}
                              onChange={(e) => {
                                setAbout(e.target.value);
                              }}
                              disabled={!edit}></textarea>
                          </div>
                        </div>
                      </div>

                      {/* Later */}
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Upload Resume
                          </label>
                          <div class='col-sm-9 grid-margin stretch-card'>
                            <div class='card' style={{ width: "20px" }}>
                              <div class='card-body'>
                                <h4 class='card-title'>Drop resume here</h4>
                                <input
                                  style={{ width: "290px" }}
                                  type='file'
                                  disabled={!edit}
                                  onChange={(e) => {
                                    uploadResumeFile(e);
                                  }}
                                  // action="https://www.bootstrapdash.com/file-upload"
                                  class='dropzone'
                                  id='my-awesome-dropzone'></input>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Video Resume
                          </label>
                          <div class='col-sm-9 grid-margin stretch-card'>
                            <div class='card' style={{ width: "20px" }}>
                              <div class='card-body'>
                                <h4 class='card-title'>
                                  Drop video resume here
                                </h4>
                                <input
                                  style={{ width: "290px" }}
                                  type='file'
                                  disabled={!edit}
                                  onChange={(e) => {
                                    uploadVideoResumeFile(e);
                                  }}
                                  // action="https://www.bootstrapdash.com/file-upload"
                                  class='dropzone'
                                  id='my-awesome-dropzone'></input>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Linked In
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              class='form-control'
                              value={linkdin}
                              onChange={(e) => {
                                setLinkdin(e.target.value);
                              }}
                              disabled={!edit}
                            />
                          </div>
                        </div>
                      </div>

                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>DOB</label>
                          <div
                            id='datepicker-popup'
                            class='input-group date datepicker col-sm-9'>
                            <input
                              type='date'
                              class='form-control'
                              value={dob}
                              onChange={(e) => {
                                setDOB(e.target.value);
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
                            Marital Status
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              class='form-control'
                              value={maritalStatus}
                              onChange={(e) => {
                                setMaritalStatus(e.target.value);
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
                            Subscription Status
                          </label>
                          <select
                            class='form-control col-sm-9'
                            id='exampleFormControlSelect2'
                            disabled={!edit}>
                            <option>Sample Company</option>
                          </select>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Subscription Info
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              class='form-control'
                              value={subscription}
                              onChange={(e) => {
                                setSubscription(e.target.value);
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
                            Skill Set
                          </label>
                          <div class='col-sm-9'>
                            <form class='form-inline repeater'>
                              <div data-repeater-list='group-a'>
                                <div data-repeater-item class='d-flex mb-2'>
                                  <label class='sr-only'>Skills</label>
                                  <div class='input-group mb-2 mr-sm-2 mb-sm-0'>
                                    <div class='input-group-prepend'>
                                      <span class='input-group-text'>@</span>
                                    </div>
                                    <input
                                      type='text'
                                      class='form-control form-control-sm'
                                      id='inlineFormInputGroup1'
                                      value={skillVal}
                                      onChange={(e) => {
                                        setSkillVal(e.target.value);
                                      }}
                                      placeholder='Add Skills'
                                      disabled={!edit}
                                    />
                                  </div>
                                </div>
                              </div>
                              <button
                                data-repeater-create
                                type='button'
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (skillVal === "") {
                                    return;
                                  }
                                  setSkillArray((prevState) => {
                                    return [...prevState, skillVal];
                                  });
                                  setSkillVal("");
                                }}
                                class='btn btn-info btn-sm icon-btn ml-2 mb-2'>
                                <i class='mdi mdi-plus'></i>
                              </button>
                            </form>
                            {skillArray &&
                              skillArray.map((skill) => (
                                <InputArray
                                  key={Math.random()}
                                  text={skill}
                                  onDelete={deleteSkill}
                                />
                              ))}
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label
                            class='col-sm-3'
                            style={{ alignSelf: "center" }}>
                            Preffered Work Location
                          </label>
                          <div class='col-sm-9'>
                            <form class='form-inline repeater'>
                              <div data-repeater-list='group-a'>
                                <div data-repeater-item class='d-flex mb-2'>
                                  <label class='sr-only'>Locations</label>
                                  <div class='input-group mb-2 mr-sm-2 mb-sm-0'>
                                    <div class='input-group-prepend'>
                                      <span class='input-group-text'>@</span>
                                    </div>
                                    <input
                                      type='text'
                                      class='form-control form-control-sm'
                                      id='inlineFormInputGroup1'
                                      onChange={(e) => {
                                        setWorkLocationVal(e.target.value);
                                      }}
                                      value={workLocationVal}
                                      placeholder='Add Locations'
                                      disabled={!edit}
                                    />
                                  </div>
                                </div>
                              </div>
                              <button
                                data-repeater-create
                                type='button'
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (workLocationVal === "") {
                                    return;
                                  }
                                  setLocationArray((prevState) => {
                                    return [...prevState, workLocationVal];
                                  });
                                  setWorkLocationVal("");
                                }}
                                class='btn btn-info btn-sm icon-btn ml-2 mb-2'>
                                <i class='mdi mdi-plus'></i>
                              </button>
                            </form>
                            {workLocationArray &&
                              workLocationArray.map((loc) => (
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
                          <label
                            class='col-sm-3'
                            style={{ alignSelf: "center" }}>
                            Languages
                          </label>
                          <div class='col-sm-9'>
                            <form class='form-inline repeater'>
                              <div data-repeater-list='group-a'>
                                <div data-repeater-item class='d-flex mb-2'>
                                  <label class='sr-only'>Languages</label>
                                  <div class='input-group mb-2 mr-sm-2 mb-sm-0'>
                                    <div class='input-group-prepend'>
                                      <span class='input-group-text'>@</span>
                                    </div>
                                    <input
                                      type='text'
                                      class='form-control form-control-sm'
                                      id='inlineFormInputGroup1'
                                      value={langVal}
                                      placeholder='Add Languages'
                                      onChange={(e) => {
                                        setLangval(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <button
                                data-repeater-create
                                type='button'
                                class='btn btn-info btn-sm icon-btn ml-2 mb-2'
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (langVal === "") {
                                    return;
                                  }
                                  setLanguageArray((prevState) => {
                                    return [...prevState, langVal];
                                  });
                                  setLangval("");
                                }}>
                                <i class='mdi mdi-plus'></i>
                              </button>
                            </form>
                            {languageArray &&
                              languageArray.map((lang) => (
                                <InputArray
                                  key={Math.random()}
                                  text={lang}
                                  onDelete={deleteLanguage}
                                />
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type='submit'
                      class='btn btn-primary mr-2'
                      onClick={(e) => {
                        e.preventDefault();
                        dataSubmit();
                      }}>
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
  );
};

export default connect(null, {
  // updateUserById,
})(EditCandidate);
