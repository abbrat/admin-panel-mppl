import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { deleteJobByID, updateJobById } from "../../../actions/adminActions";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import makeToast from "../../../Toaster";

const EditJob = (props) => {
  const selectedJob = props.location.state;

  const [CompanyName, setCompanyName] = useState(selectedJob.CompanyName || "");
  const [Desgination, setDesgination] = useState(selectedJob.Desgination || "");
  const [ContactPerson, setContactPerson] = useState(
    selectedJob.ContactPerson || ""
  );
  const [ContactNumber, setContactNumber] = useState(
    selectedJob.ContactNumber || ""
  );
  const [ContactEmail, setContactEmail] = useState(
    selectedJob.ContactEmail || ""
  );
  const [JobTitle, setJobTitle] = useState(selectedJob.JobTitle || "");
  const [JobType, setJobType] = useState(selectedJob.JobType || "");
  const [Qualificaiton, setQualificaiton] = useState(
    selectedJob.Qualificaiton || ""
  );
  const [Experience, setExperience] = useState(selectedJob.Experience || "");
  const [ExpectedCTC, setExpectedCTC] = useState(selectedJob.ExpectedCTC || "");
  const [Industry, setIndustry] = useState(selectedJob.Industry || "");
  const [KeySkills, setKeySkills] = useState([]);
  // const [Location, setLocation] = useState(selectedJob.Location.state || "");
  const [PublishType, setPublishType] = useState("");
  const [Remarks, setRemarks] = useState(selectedJob.Remarks || "");
  const [Description, setDescription] = useState(selectedJob.Description || "");
  const [SalaryRange, setSalaryRange] = useState(selectedJob.SalaryRange || "");
  const [Distance, setDistance] = useState("");
  const [PreviousExp, setPreviousExp] = useState(selectedJob.PreviousExp || "");
  const [CompanyHireRate, setCompanyHireRate] = useState(
    selectedJob.CompanyHireRate || ""
  );
  const [CompanyMemberSince, setCompanyMemberSince] = useState(
    selectedJob.CompanyMemberSince || ""
  );
  const [Category, setCategory] = useState(selectedJob.Category || "");

  const history = useHistory();
  const [saved, setSaved] = useState();

  console.log(JSON.parse(localStorage.getItem("selectedJob")).CompanyName);

  const submitHandler = async () => {
    console.log("fdsf", selectedJob._id);

    const isSaved = await updateJobById(
      {
        CompanyHireRate,
        CompanyName,
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
      selectedJob._id
    );

    if (isSaved) {
      history.goBack();
    }
  };

  return (
    <div>
      <div className='main-panel'>
        <div className='content-wrapper'>
          <div className='row'>
            <div className='col-12 grid-margin'>
              <div className='card'>
                <div className='card-body'>
                  <h4 className='card-title'>EDIT JOB {}</h4>
                  <form className='form-sample'>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='form-group row'>
                          <label
                            className='col-sm-3'
                            for='exampleFormControlSelect2'
                            style={{ alignSelf: "center" }}>
                            Company Name
                          </label>
                          <input
                            type='text'
                            className='form-control col-sm-9'
                            id='exampleFormControlSelect2'
                            placeholder='Company Name'
                            value={CompanyName}
                            onChange={(e) => {
                              setCompanyName(e.target.value);
                            }}></input>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='form-group row'>
                          <label className='col-sm-3 col-form-label'>
                            Job Title
                          </label>
                          <div className='col-sm-9'>
                            <input
                              type='text'
                              value={JobTitle}
                              onChange={(e) => {
                                setJobTitle(e.target.value);
                              }}
                              className='form-control'
                            />
                          </div>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='form-group row'>
                          <label className='col-sm-3 col-form-label'>
                            Job Type
                          </label>
                          <div className='col-sm-9'>
                            <input
                              type='text'
                              value={JobType}
                              onChange={(e) => {
                                setJobType(e.target.value);
                              }}
                              className='form-control'
                            />
                          </div>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='form-group row'>
                          <label className='col-sm-3 col-form-label'>
                            Salary Range
                          </label>
                          <div className='col-sm-9'>
                            <input
                              type='text'
                              value={SalaryRange}
                              onChange={(e) => {
                                setSalaryRange(e.target.value);
                              }}
                              className='form-control'
                            />
                          </div>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='form-group row'>
                          <label
                            className='col-sm-3'
                            for='exampleFormControlSelect2'
                            style={{ alignSelf: "center" }}>
                            Job Category
                          </label>
                          <div className='col-sm-9'>
                            <input
                              type='text'
                              value={Category}
                              onChange={(e) => {
                                setCategory(e.target.value);
                              }}
                              className='form-control'
                            />
                          </div>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='form-group row'>
                          <label className='col-sm-3 col-form-label'>
                            Job Description
                          </label>
                          <div className='col-sm-9'>
                            <textarea
                              value={Description}
                              onChange={(e) => {
                                setDescription(e.target.value);
                              }}
                              className='form-control'
                              id='exampleTextarea1'
                              rows='4'></textarea>
                          </div>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='form-group row'>
                          <label className='col-sm-3 col-form-label'>
                            Starting
                          </label>
                          <select
                            className='form-control col-sm-9'
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

                          {/* <div className="col-sm-5">
                                  <div className="form-check">
                                    <label className="form-check-label">
                                      <input
                                        type="radio"
                                        className="form-check-input"
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
                      {/*<div className='col-md-6'>
                              <div className='form-group row'>
                                <label className='col-sm-3 col-form-label'>
                                  Location
                                </label>
                                <div className='col-sm-9'>
                                  <input
                                    type='text'
                                    value={Location}
                                    onChange={(e) => {
                                      setLocation(e.target.value);
                                    }}
                                    className='form-control'
                                  />
                                </div>
                              </div>
                                  </div>  */}
                      <div className='col-md-6'>
                        <div className='form-group row'>
                          <label
                            className='col-sm-3'
                            for='exampleFormControlSelect2'
                            style={{ alignSelf: "center" }}>
                            Skills & Requirements
                          </label>
                          <div className='col-sm-9'>
                            <input type='text' className='form-control' />
                          </div>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='form-group row'>
                          <label className='col-sm-3 col-form-label'>
                            Publish Type
                          </label>
                          <div className='col-sm-9'>
                            <select className='form-control'>
                              <option>Basic</option>
                              <option>Sponsored</option>
                              <option>Top Rated</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='form-group row'>
                          <label className='col-sm-3 col-form-label'>
                            Previous Experience
                          </label>
                          <div className='col-sm-9'>
                            <textarea
                              value={PreviousExp}
                              onChange={(e) => {
                                setPreviousExp(e.target.value);
                              }}
                              className='form-control'
                              id='exampleTextarea1'
                              rows='4'></textarea>
                          </div>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='form-group row'>
                          <label className='col-sm-3 col-form-label'>
                            Validity
                          </label>
                          <div
                            id='datepicker-popup'
                            className='input-group date datepicker col-sm-9'>
                            <input type='date' className='form-control' />
                            {/* <span className="input-group-addon input-group-append border-left">
                                    <span className="mdi mdi-calendar input-group-text"></span>
                                  </span> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type='button'
                      onClick={(e) => {
                        e.preventDefault();
                        submitHandler();
                      }}
                      className='btn btn-primary mr-2'>
                      Submit
                    </button>

                    <button
                      className='btn btn-light'
                      onClick={() => {
                        history.push("/posted-jobs");
                      }}>
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className='footer'>
          <div className='d-sm-flex justify-content-center justify-content-sm-between'>
            <span className='text-muted text-center text-sm-left d-block d-sm-inline-block'>
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
  // updateJobById,
  // deleteJobByID,
})(EditJob);
