import { id } from "date-fns/locale";
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

const EditCandidate = (props) => {
  const [edit, setEdit] = useState(false);

  const [user, setUser] = useState({
    user: JSON.parse(localStorage.getItem("userSelected")),
  });
  console.log(user);

  const [name, setName] = useState(user.user.name || "");
  const [email, setEmail] = useState(user.user.email || "");
  const [number, setNumber] = useState(user.user.number || "");
  const [gender, setGender] = useState(user.user.gender || "");
  const [address, setAddress] = useState(user.user.address || "");

  const [about, setAbout] = useState(user.user.about || "");
  const [linkdin, setLinkdin] = useState(user.user.linkdin || "");
  const [dob, setDOB] = useState(user.user.dob || "");
  const [maritalStatus, setMaritalStatus] = useState(
    user.user.maritalStatus || ""
  );
  const [subscription, setSubscription] = useState(
    user.user.subscription || ""
  );
  const [preferedWorkLocation, setPreferedWorkLocation] = useState(
    user.user.email || ""
  );
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

  const getUser = async (id) => {
    try {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      const res = await axios.get(
        "http://localhost:5000/api/profile/details/" + id,
        config
      );
      console.log(res.data.profileData);
      let dob1 = res.data.profileData.dateOfBirth
        .split("/")
        .reverse()
        .join("-");

      setName(res.data.profileData.name);
      setEmail(res.data.profileData.email);
      setNumber(res.data.profileData.gender);
      setGender(res.data.profileData.gender);
      setAddress(
        res.data.profileData.addressLine1 +
          " " +
          res.data.profileData.addressLine2
      );
      setAbout(res.data.profileData.aboutUser);
      setLinkdin(res.data.profileData.gender);
      setDOB(dob1);
      setMaritalStatus(res.data.profileData.maritalStatus);
      setSubscription(res.data.profileData.gender);
      setPreferedWorkLocation(res.data.profileData.preferredLocation);

      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const dataSubmit = () => {
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
    // formData.append("subscription", subscription);
    // formData.append("subscription", subscription);
    formData.append("videoResume", videoResume);
    formData.append("resume", resume);
    setSaved(
      updateUserById(
        {
          name,
          email,
          number,
          gender,
          address,
          about,
          linkdin,
          dob,
          maritalStatus,
        },
        user.user._id
      )
    );
    if (saved) {
      makeToast("success", "Updated");
      history.goBack();
    } else {
      makeToast("error", "Error");
    }
  };

  useEffect(() => {
    let id = JSON.parse(localStorage.getItem("userSelected"));
    var res = getUser(id);
  }, []);

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
                                  <label class='sr-only'>Users</label>
                                  <div class='input-group mb-2 mr-sm-2 mb-sm-0'>
                                    <div class='input-group-prepend'>
                                      <span class='input-group-text'>@</span>
                                    </div>
                                    <input
                                      type='text'
                                      class='form-control form-control-sm'
                                      id='inlineFormInputGroup1'
                                      placeholder='Add user'
                                      value='sample'
                                      disabled={!edit}
                                    />
                                  </div>
                                  <button
                                    type='submit'
                                    class='btn btn-success btn-sm'>
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
                                class='btn btn-info btn-sm icon-btn ml-2 mb-2'>
                                <i class='mdi mdi-plus'></i>
                              </button>
                            </form>
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
                                  <label class='sr-only'>Users</label>
                                  <div class='input-group mb-2 mr-sm-2 mb-sm-0'>
                                    <div class='input-group-prepend'>
                                      <span class='input-group-text'>@</span>
                                    </div>
                                    <input
                                      type='text'
                                      class='form-control form-control-sm'
                                      id='inlineFormInputGroup1'
                                      placeholder='Add user'
                                      value='sample'
                                      disabled={!edit}
                                    />
                                  </div>
                                  <button
                                    type='submit'
                                    class='btn btn-success btn-sm'>
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
                                class='btn btn-info btn-sm icon-btn ml-2 mb-2'>
                                <i class='mdi mdi-plus'></i>
                              </button>
                            </form>
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
                                  <label class='sr-only'>Users</label>
                                  <div class='input-group mb-2 mr-sm-2 mb-sm-0'>
                                    <div class='input-group-prepend'>
                                      <span class='input-group-text'>@</span>
                                    </div>
                                    <input
                                      type='text'
                                      class='form-control form-control-sm'
                                      id='inlineFormInputGroup1'
                                      placeholder='Add user'
                                      value='sample'
                                      disabled={!edit}
                                    />
                                  </div>
                                  <button
                                    type='submit'
                                    class='btn btn-success btn-sm'>
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
                                class='btn btn-info btn-sm icon-btn ml-2 mb-2'>
                                <i class='mdi mdi-plus'></i>
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type='button'
                      class='btn btn-primary mr-2'
                      onClick={() => {
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
  updateUserById,
})(EditCandidate);
