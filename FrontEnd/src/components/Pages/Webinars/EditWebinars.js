import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";

import { updateWebinarByID } from "../../../actions/adminActions";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import makeToast from "../../../Toaster";
import Select from "react-select";
import axios from "axios";

const EditWebinars = (props) => {
  const [saved, setSaved] = useState();
  const history = useHistory();
  const [edit, setEdit] = useState(false);
  const [webinar, setWebinar] = useState(
    JSON.parse(localStorage.getItem("webinar"))
  );

  const [webinarLink, setWebinarLink] = useState(webinar.webinarLink || "");
  const [webinarTitle, setWebinarTitle] = useState(webinar.webinarTitle || "");
  const [webinarType, setWebinarType] = useState(webinar.webinarType || "");
  const [webinarDate, setWebinarDate] = useState(webinar.webinarDate || "");
  const [webinarTime, setWebinarTime] = useState(webinar.webinarTime || "");
  const [webinarDescription, setWebinarDescription] = useState(
    webinar.webinarDescription || ""
  );
  const [webinarKeywords, setWebinarKeywords] = useState([]);
  const [webinarAudience, setWebinarAudience] = useState(
    webinar.webinarAudience || ""
  );
  const [instructorName, setInstructorName] = useState(
    webinar.instructorName || ""
  );
  const [aboutInstructor, setaboutInstructor] = useState(
    webinar.aboutInstructor || ""
  );
  const [designation, setDesignation] = useState(webinar.designation || "");
  // const [companies, setCompanies] = useState([]);
  // const [companies, setCompanies] = useState([]);
  const [CompanyName, setCompanyName] = useState("");
  // const getCompanies = async () => {
  //   let arr = [];
  //   try {
  //     const res = await axios.get("http://localhost:5000/api/company/all");
  //     if (res.data.length > 0) {
  //       // setCompanies(res.data);
  //       arr = res.data;
  //     }
  //     let arr2 = [];
  //     arr.map((company) => {
  //       arr2.push({
  //         value: company.CompanyName,
  //         label: company.CompanyName,
  //         id: company._id,
  //       });
  //     });
  //     setCompanies(arr2);
  //     // console.log(companies);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const getCompanydetails = async (id) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/company/details/" + id
      );

      let arr = [];
      arr = res.data.OtherOffices;
      arr.push(res.data.HeadOffice);
      let arr2 = [];
      arr.map((location) => {
        arr2.push({ value: location, label: location });
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  // useEffect(() => {
  //   getCompanies();
  // }, []);
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
                    <h4 class='card-title'>EDIT WEBINARS</h4>
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
                          <label class='col-sm-3 col-form-label'>
                            Audience
                          </label>
                          <div class='col-sm-9'>
                            <textarea
                              class='form-control'
                              id='exampleTextarea1'
                              rows='4'
                              value={webinarAudience}
                              onChange={(e) => {
                                setWebinarAudience(e.target.value);
                              }}
                              disabled={!edit}></textarea>
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Description
                          </label>
                          <div class='col-sm-9'>
                            <textarea
                              class='form-control'
                              id='exampleTextarea1'
                              rows='4'
                              value={webinarDescription}
                              onChange={(e) => {
                                setWebinarDescription(e.target.value);
                              }}
                              disabled={!edit}></textarea>
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>Title</label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              class='form-control'
                              value={webinarTitle}
                              onChange={(e) => {
                                setWebinarTitle(e.target.value);
                              }}
                              disabled={!edit}
                            />
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Category
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              class='form-control'
                              value={webinarType}
                              onChange={(e) => {
                                setWebinarType(e.target.value);
                              }}
                              disabled={!edit}
                            />
                            {/*<Select 
                              options={companies}
                              onChange={(e) => {
                                getCompanydetails(e.id);
                                setCompanyName(e.value);
                              }}
                              disabled={!edit}
                              placeholder='Company'
                            /> */}
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div
                          class='form-group'
                          style={{
                            display: "flex",
                            flexDirection: "row",
                          }}>
                          <label
                            class='col-sm-3'
                            for='exampleFormControlSelect2'
                            style={{ alignSelf: "center" }}>
                            Time
                          </label>
                          <input
                            class='form-control'
                            data-inputmask="'alias': 'datetime'"
                            data-inputmask-inputformat='dd/mm/yyyy HH:MM:ss'
                            value={webinarTime}
                            onChange={(e) => {
                              setWebinarTime(e.target.value);
                            }}
                            disabled={!edit}
                          />
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div
                          createCompany
                          class='form-group'
                          style={{
                            display: "flex",
                            flexDirection: "row",
                          }}>
                          <label
                            class='col-sm-3'
                            for='exampleFormControlSelect2'
                            style={{ alignSelf: "center" }}>
                            Date
                          </label>
                          <input
                            class='form-control'
                            type='date'
                            data-inputmask="'alias': 'datetime'"
                            data-inputmask-inputformat='dd/mm/yyyy HH:MM:ss'
                            value={webinarDate}
                            onChange={(e) => {
                              setWebinarDate(e.target.value);
                            }}
                            disabled={!edit}
                          />
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Instructor Name
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              class='form-control'
                              value={instructorName}
                              onChange={(e) => {
                                setInstructorName(e.target.value);
                              }}
                              disabled={!edit}
                            />
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Instructor Profile
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              class='form-control'
                              value={designation}
                              onChange={(e) => {
                                setDesignation(e.target.value);
                              }}
                              disabled={!edit}
                            />
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            About Instructor
                          </label>
                          <div class='col-sm-9'>
                            <textarea
                              class='form-control'
                              id='exampleTextarea1'
                              rows='4'
                              value={aboutInstructor}
                              onChange={(e) => {
                                setaboutInstructor(e.target.value);
                              }}
                              disabled={!edit}></textarea>
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Event Link
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              class='form-control'
                              value={webinarLink}
                              onChange={(e) => {
                                setWebinarLink(e.target.value);
                              }}
                              disabled={!edit}
                            />
                          </div>
                        </div>
                      </div>

                      {/* <div class="col-md-6">
                              <div class="card-body">
                                <h4 class="card-title">Input Tag</h4>
                                <p class="card-description">
                                  Type to add a new tag
                                </p>
                                <input
                                  name="tags"
                                  id="tags"
                                  value="London,Canada,Australia,Mexico"
                                  value="sample"
                                  disabled={!edit}
                                />
                              </div>
                            </div> */}
                    </div>
                    <button
                      type='button'
                      onClick={async () => {
                        var webinarInstructor = {
                          instructorName: instructorName,
                          designation: designation,
                          aboutInstructor: aboutInstructor,
                        };
                        setSaved(
                          await updateWebinarByID(
                            {
                              webinarAudience,
                              webinarDate,
                              webinarDescription,
                              webinarInstructor,
                              webinarLink,
                              webinarTitle,
                              webinarTime,
                              webinarType,
                            },
                            webinar._id
                          )
                        );
                        if (saved) {
                          history.goBack();
                        } else {
                          history.goBack();
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
  );
};

export default connect(null, {
  updateWebinarByID,
})(EditWebinars);
