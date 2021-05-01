import React, { useState } from "react";
import { connect } from "react-redux";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import { createConsultant } from "../../../actions/adminActions";
import { useHistory } from "react-router";
import makeToast from "../../../Toaster";

const AddConsultant = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sector, setSector] = useState("");
  const [about, setAbout] = useState("");
  const [membershipDate, setMembershipDate] = useState("");
  const [educationInfo, setEducationInfo] = useState("");
  const [experience, setExperience] = useState("");
  const history = useHistory();

  const submitHandler = async () => {
    if (
      name === "" ||
      email === "" ||
      sector === "" ||
      about === "" ||
      membershipDate === "" ||
      educationInfo === "" ||
      experience === ""
    ) {
      return makeToast("error", "Please add all the fields");
    }

    const result = await createConsultant({
      name,
      email,
      sector,
      about,
      membershipDate,
      educationInfo,
      experience,
    });

    if (result) {
      makeToast("success", "Success");
      history.push("/consultants");
    } else {
      makeToast("error", "Error");
      history.push("/consultants");
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
                  <h4 class='card-title'>ADD CONSULTANT</h4>
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
                            Email
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              class='form-control'
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
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
                              }}></textarea>
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
                              rows='4'
                              value={educationInfo}
                              onChange={(e) => {
                                setEducationInfo(e.target.value);
                              }}></textarea>
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
                              }}></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type='button'
                      onClick={submitHandler}
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
  );
};

export default connect(null, {
  createConsultant,
})(AddConsultant);
