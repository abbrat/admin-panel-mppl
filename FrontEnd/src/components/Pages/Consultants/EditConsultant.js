import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { updateConsultantByID } from "../../../actions/adminActions";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import makeToast from "../../../Toaster";

const EditConsultant = (props) => {
  const [edit, setEdit] = useState(false);

  const selectedConsultant = props.location.state && props.location.state;

  const [name, setName] = useState(selectedConsultant.name || "");
  const [sector, setSector] = useState(selectedConsultant.sector || "");
  const [about, setAbout] = useState(selectedConsultant.about || "");
  const [membershipDate, setMembershipDate] = useState(
    selectedConsultant.membershipDate || ""
  );
  const [educationInfo, setEducationInfo] = useState(
    selectedConsultant.educationInfo || ""
  );
  const [saved, setSaved] = useState();
  const [experience, setExperience] = useState(
    selectedConsultant.experience || ""
  );
  const history = useHistory();

  const submitHandler = async () => {
    const isUpdated = await updateConsultantByID(
      {
        name,
        sector,
        about,
        membershipDate,
        educationInfo,
        experience,
      },
      selectedConsultant._id
    );

    if (isUpdated) {
      makeToast("success", "Consultant Updated");
      return history.goBack();
    }

    makeToast("error", "Error");
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
                    <h4 class='card-title'>EDIT CONSULTANT</h4>
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
                          <label class='col-sm-3 col-form-label'>Sector</label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              class='form-control'
                              value={sector}
                              onChange={(e) => {
                                setSector(e.target.value);
                              }}
                              disabled={!edit}
                            />
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
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Membership Date
                          </label>
                          <div
                            id='datepicker-popup'
                            class='input-group date datepicker col-sm-9'>
                            <input
                              type='date'
                              class='form-control'
                              value={membershipDate}
                              onChange={(e) => {
                                setMembershipDate(e.target.value);
                              }}
                              disabled={!edit}
                            />
                            <span class='input-group-addon input-group-append border-left'>
                              {/* <span class="mdi mdi-calendar input-group-text"></span> */}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Education Info
                          </label>
                          <div class='col-sm-9'>
                            <textarea
                              class='form-control'
                              id='exampleTextarea1'
                              rows='4'
                              value={educationInfo}
                              onChange={(e) => {
                                setEducationInfo(e.target.value);
                              }}
                              disabled={!edit}></textarea>
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Experience
                          </label>
                          <div class='col-sm-9'>
                            <textarea
                              class='form-control'
                              id='exampleTextarea1'
                              rows='4'
                              value={experience}
                              onChange={(e) => {
                                setExperience(e.target.value);
                              }}
                              disabled={!edit}></textarea>
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
              <a href='https://www.code-e-python.com' target='_blank'>
                Code-e-Python
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
  // updateConsultantByID,
})(EditConsultant);
