import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { deleteJobByID, updateJobById } from "../../../actions/adminActions";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import makeToast from "../../../Toaster";

const EditJob = (props) => {
  const [jobObj, setJobObj] = useState(
    JSON.parse(localStorage.getItem("selectedJob"))
  );
  useEffect(() => {
    setJobObj(JSON.parse(localStorage.getItem("selectedJob")));
  }, []);
  const [CompanyName, setCompanyName] = useState(jobObj.CompanyName || "");
  const [Desgination, setDesgination] = useState(jobObj.Desgination || "");
  const [ContactPerson, setContactPerson] = useState(
    jobObj.ContactPerson || ""
  );
  const [ContactNumber, setContactNumber] = useState(
    jobObj.ContactNumber || ""
  );
  const [ContactEmail, setContactEmail] = useState(jobObj.ContactEmail || "");
  const [JobTitle, setJobTitle] = useState(jobObj.JobTitle || "");
  const [JobType, setJobType] = useState(jobObj.JobType || "");
  const [Qualificaiton, setQualificaiton] = useState(
    jobObj.Qualificaiton || ""
  );
  const [Experience, setExperience] = useState(jobObj.Experience || "");
  const [ExpectedCTC, setExpectedCTC] = useState(jobObj.ExpectedCTC || "");
  const [Industry, setIndustry] = useState(jobObj.Industry || "");
  const [KeySkills, setKeySkills] = useState([]);
  const [Location, setLocation] = useState(jobObj.Location.state || "");
  const [PublishType, setPublishType] = useState("");
  const [Remarks, setRemarks] = useState(jobObj.Remarks || "");
  const [Description, setDescription] = useState(jobObj.Description || "");
  const [SalaryRange, setSalaryRange] = useState(jobObj.SalaryRange || "");
  const [Distance, setDistance] = useState("");
  const [PreviousExp, setPreviousExp] = useState(jobObj.PreviousExp || "");
  const [CompanyHireRate, setCompanyHireRate] = useState(
    jobObj.CompanyHireRate || ""
  );
  const [CompanyMemberSince, setCompanyMemberSince] = useState(
    jobObj.CompanyMemberSince || ""
  );
  const [Category, setCategory] = useState(jobObj.Category || "");

  const history = useHistory();
  const [saved, setSaved] = useState();

  return (
    <div>
      <div class='sidebar-light'>
        <div class='container-scroller'>
          <Navbar />
          <div class='container-fluid page-body-wrapper'>
            <Sidebar />
            <div class='main-panel'>
              <div class='content-wrapper'>
                <div class='row'>
                  <div class='col-12 grid-margin'>
                    <div class='card'>
                      <div class='card-body'>
                        <h4 class='card-title'>EDIT JOB {}</h4>
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
                                <input
                                  type='text'
                                  class='form-control col-sm-9'
                                  id='exampleFormControlSelect2'
                                  placeholder='Company Name'
                                  value={CompanyName}
                                  onChange={(e) => {
                                    setCompanyName(e.target.value);
                                  }}></input>
                              </div>
                            </div>
                            <div class='col-md-6'>
                              <div class='form-group row'>
                                <label class='col-sm-3 col-form-label'>
                                  Job Title
                                </label>
                                <div class='col-sm-9'>
                                  <input
                                    type='text'
                                    value={JobTitle}
                                    onChange={(e) => {
                                      setJobTitle(e.target.value);
                                    }}
                                    class='form-control'
                                  />
                                </div>
                              </div>
                            </div>
                            <div class='col-md-6'>
                              <div class='form-group row'>
                                <label class='col-sm-3 col-form-label'>
                                  Job Type
                                </label>
                                <div class='col-sm-9'>
                                  <input
                                    type='text'
                                    value={JobType}
                                    onChange={(e) => {
                                      setJobType(e.target.value);
                                    }}
                                    class='form-control'
                                  />
                                </div>
                              </div>
                            </div>
                            <div class='col-md-6'>
                              <div class='form-group row'>
                                <label class='col-sm-3 col-form-label'>
                                  Salary Range
                                </label>
                                <div class='col-sm-9'>
                                  <input
                                    type='text'
                                    value={SalaryRange}
                                    onChange={(e) => {
                                      setSalaryRange(e.target.value);
                                    }}
                                    class='form-control'
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
                                  Job Category
                                </label>
                                <div class='col-sm-9'>
                                  <input
                                    type='text'
                                    value={Category}
                                    onChange={(e) => {
                                      setCategory(e.target.value);
                                    }}
                                    class='form-control'
                                  />
                                </div>
                              </div>
                            </div>
                            <div class='col-md-6'>
                              <div class='form-group row'>
                                <label class='col-sm-3 col-form-label'>
                                  Job Description
                                </label>
                                <div class='col-sm-9'>
                                  <textarea
                                    value={Description}
                                    onChange={(e) => {
                                      setDescription(e.target.value);
                                    }}
                                    class='form-control'
                                    id='exampleTextarea1'
                                    rows='4'></textarea>
                                </div>
                              </div>
                            </div>
                            <div class='col-md-6'>
                              <div class='form-group row'>
                                <label class='col-sm-3 col-form-label'>
                                  Starting
                                </label>
                                <select
                                  class='form-control col-sm-9'
                                  id='exampleFormControlSelect2'>
                                  <option>Immediately</option>
                                  <option>1 Months</option>
                                  <option>2 Months</option>
                                  <option>3 Months</option>
                                  <option>4 Months</option>
                                  <option>5 Months</option>
                                  <option>6 Months</option>
                                  <option>7 Months</option>
                                  <option>8 Months</option>
                                  <option>9 Months</option>
                                  <option>10 Months</option>
                                  <option>11 Months</option>
                                  <option>12 Months</option>
                                </select>

                                {/* <div class="col-sm-5">
                                  <div class="form-check">
                                    <label class="form-check-label">
                                      <input
                                        type="radio"
                                        class="form-check-input"
                                        name="membershipRadios"
                                        id="membershipRadios2"
                                        value="option2"
                                      />
                                      In{" "}
                                      <select>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                      </select>{" "}
                                      Months
                                    </label>
                                  </div>
                                </div>
                               */}
                              </div>
                            </div>
                            <div class='col-md-6'>
                              <div class='form-group row'>
                                <label class='col-sm-3 col-form-label'>
                                  Location
                                </label>
                                <div class='col-sm-9'>
                                  <input
                                    type='text'
                                    value={Location}
                                    onChange={(e) => {
                                      setLocation(e.target.value);
                                    }}
                                    class='form-control'
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
                                  Skills & Requirements
                                </label>
                                <div class='col-sm-9'>
                                  <input type='text' class='form-control' />
                                </div>
                              </div>
                            </div>
                            <div class='col-md-6'>
                              <div class='form-group row'>
                                <label class='col-sm-3 col-form-label'>
                                  Publish Type
                                </label>
                                <div class='col-sm-9'>
                                  <select class='form-control'>
                                    <option>Basic</option>
                                    <option>Sponsored</option>
                                    <option>Top Rated</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div class='col-md-6'>
                              <div class='form-group row'>
                                <label class='col-sm-3 col-form-label'>
                                  Previous Experience
                                </label>
                                <div class='col-sm-9'>
                                  <textarea
                                    value={PreviousExp}
                                    onChange={(e) => {
                                      setPreviousExp(e.target.value);
                                    }}
                                    class='form-control'
                                    id='exampleTextarea1'
                                    rows='4'></textarea>
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
                                  <input type='date' class='form-control' />
                                  {/* <span class="input-group-addon input-group-append border-left">
                                    <span class="mdi mdi-calendar input-group-text"></span>
                                  </span> */}
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            type='button'
                            onClick={async () => {
                              setSaved(
                                await updateJobById(
                                  {
                                    Location,
                                    CompanyHireRate,
                                    CompanyName,
                                    CompanyHireRate,
                                    Desgination,
                                    ContactEmail,
                                    ContactNumber,
                                    ContactPerson,
                                    JobTitle,
                                    JobType,
                                    Description,
                                    SalaryRange,
                                    PreviousExp,
                                    Category,
                                  },
                                  jobObj._id
                                )
                              );
                              if (saved) {
                                // makeToast("success", "Success");
                                history.push("/posted-jobs");
                              } else {
                                history.push("/posted-jobs");
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
    </div>
  );
};

export default connect(null, {
  // updateJobById,
  // deleteJobByID,
})(EditJob);
