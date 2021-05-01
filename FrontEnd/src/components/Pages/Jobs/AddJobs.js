import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { createJob } from "../../../actions/adminActions";

import makeToast from "../../../Toaster";
import Select from "react-select";

const AddJobs = (props) => {
  const history = useHistory();
  const [saved, setSaved] = useState();

  const [CompanyName, setCompanyName] = useState("");
  const [Desgination, setDesgination] = useState("");
  const [ContactPerson, setContactPerson] = useState("");
  const [ContactNumber, setContactNumber] = useState("");
  const [ContactEmail, setContactEmail] = useState("");
  const [JobTitle, setJobTitle] = useState("");
  const [JobType, setJobType] = useState("");
  const [Qualificaiton, setQualificaiton] = useState("");
  // const [Experience, setExperience] = useState("");
  const [ExpectedCTC, setExpectedCTC] = useState("");
  const [Industry, setIndustry] = useState("");
  const [KeySkills, setKeySkills] = useState([]);
  const [Location, setLocation] = useState("");
  const [PublishType, setPublishType] = useState("");
  const [Remarks, setRemarks] = useState("");
  const [Description, setDescription] = useState("");
  const [SalaryRange, setSalaryRange] = useState("");
  const [Distance, setDistance] = useState("");
  const [PreviousExp, setPreviousExp] = useState("");
  const [CompanyHireRate, setCompanyHireRate] = useState("");
  const [CompanyMemberSince, setCompanyMemberSince] = useState("");
  const [Category, setCategory] = useState("");

  const [JobStatus, setJobStatus] = useState("");
  const [Logo, setLogo] = useState("");
  const [Starting, setStarting] = useState("");
  const [AboutCompany, setAboutCompany] = useState("");
  const [Validity, setValidity] = useState("");
  const [Positions, setPositions] = useState("");
  const [Featured, setFeatured] = useState("");
  const [Questions, setQuestions] = useState("");
  const [PostingType, setPostingType] = useState("");
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  const getCompanies = async () => {
    let arr = [];
    try {
      const res = await axios.get("http://localhost:5000/api/company/all");
      if (res.data.length > 0) {
        // setCompanies(res.data);
        arr = res.data;
      }
      let arr2 = [];
      arr.map((company) => {
        arr2.push({
          value: company.CompanyName,
          label: company.CompanyName,
          id: company._id,
        });
      });
      setCompanies(arr2);
      // console.log(companies);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCategories = async () => {
    let arr = [];
    try {
      const res = await axios.get("http://localhost:5000/api/category");
      if (res.data.length > 0) {
        // setCategories(res.data);
        arr = res.data;
      }
      let arr2 = [];
      arr.map((category) => {
        arr2.push({ value: category.name, label: category.name });
      });
      setCategories(arr2);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCompanydetails = async (id) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/company/details/" + id
      );
      setContactEmail(res.data.CompanyEmail);
      setContactNumber(parseInt(res.data.CompanyContact));
      setLogo(res.data.Logo);
      setAboutCompany(res.data.AboutCompany);
      setCompanyHireRate(res.data.CompanyHireRate);
      setCompanyMemberSince(res.data.JoiningDate);
      let arr = [];
      arr = res.data.OtherOffices;
      arr.push(res.data.HeadOffice);
      let arr2 = [];
      arr.map((location) => {
        arr2.push({ value: location, label: location });
      });
      setLocations(arr2);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getCompanies();
    getCategories();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const job = {
      PublishType: PublishType || "",
      Qualificaiton: Qualificaiton || "",
      Location: Location || "",
      CompanyHireRate: CompanyHireRate || "",
      CompanyName: CompanyName || "",
      Desgination: Desgination || "",
      ContactEmail: ContactEmail || "",
      ContactNumber: ContactNumber || "",
      ContactPerson: ContactPerson || "",
      JobTitle: JobTitle || "",
      JobType: JobType || "",
      Description: Description || "",
      SalaryRange: SalaryRange || "",
      PreviousExp: PreviousExp || "",
      Starting: Starting || "",
      Category: Category || "",
      ExpectedCTC: ExpectedCTC || "",
      Industry: Industry || "",
      KeySkills: KeySkills || "",
      Remarks: Remarks || "",
      CompanyMemberSince: CompanyMemberSince || "",
      JobStatus: JobStatus || "",
      Logo: Logo || "",
      AboutCompany: AboutCompany || "",
      Validity: Validity || "",
      Positions: Positions || "",
      Questions: Questions || "",
      PostingType: PostingType || "",
    };

    const jobInputArray = Object.keys(job);

    const isJobInputEmptpy = jobInputArray.every((jobInput) => {
      return job[jobInput].length !== 0;
    });

    if (!isJobInputEmptpy) {
      return makeToast("error", "Please add all the fields");
    }

    const create = await createJob(job);

    if (create) {
      makeToast("success", "Success");
      history.push("/posted-jobs");
    } else {
      makeToast("error", "Error");
      // history.push("/posted-jobs");
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
                  <h4 class='card-title'>Add JOB {}</h4>
                  <form class='form-sample'>
                    <div class='row'>
                      {/* <div class="col-md-6">
                              <div class="form-group row">
                                <label
                                  class="col-sm-3"
                                  for="exampleFormControlSelect2"
                                  style={{ alignSelf: "center" }}
                                >
                                  Company Name
                                </label>
                                <input
                                  type="text"
                                  class="form-control col-sm-9"
                                  id="exampleFormControlSelect2"
                                  placeholder="Company Name"
                                  value={CompanyName}
                                  onChange={(e) => {
                                    setCompanyName(e.target.value);
                                  }}
                                ></input>
                              </div>
                            </div> */}
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Company Name
                          </label>
                          <div class='col-sm-9'>
                            {/* <select
                                    onChange={(e) => {
                                      setCompanyName(e.target.value);
                                    }}
                                    class="form-control"
                                  >
                                    {companies.length == 0 ? (
                                      <option>No Companies</option>
                                    ) : (
                                      companies.map((company) => {
                                        return (
                                          <option>{company.CompanyName}</option>
                                        );
                                      })
                                    )}
                                  </select> */}
                            <Select
                              options={companies}
                              onChange={(e) => {
                                getCompanydetails(e.id);
                                setCompanyName(e.value);
                              }}
                              placeholder='Company'
                            />
                          </div>
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
                              required={true}
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
                              required={true}
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
                              required={true}
                              value={SalaryRange}
                              onChange={(e) => {
                                setSalaryRange(e.target.value);
                              }}
                              class='form-control'
                            />
                          </div>
                        </div>
                      </div>
                      {/* <div class="col-md-6">
                              <div class="form-group row">
                                <label
                                  class="col-sm-3"
                                  for="exampleFormControlSelect2"
                                  style={{ alignSelf: "center" }}
                                >
                                  Job Category
                                </label>
                                <div class="col-sm-9">
                                  <input
                                    type="text"
                                    value={Category}
                                    onChange={(e) => {
                                      setCategory(e.target.value);
                                    }}
                                    class="form-control"
                                  />
                                </div>
                              </div>
                            </div> */}
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Job Category
                          </label>
                          <div class='col-sm-9'>
                            <Select
                              options={categories}
                              placeholder='Categories'
                              onChange={(e) => {
                                setCategory(e.value);
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
                            Desgination
                          </label>
                          <div class='col-sm-9'>
                            <input
                              required={true}
                              type='text'
                              value={Desgination}
                              onChange={(e) => {
                                setDesgination(e.target.value);
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
                            Contact Person
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              required={true}
                              value={ContactPerson}
                              onChange={(e) => {
                                setContactPerson(e.target.value);
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
                            Contact Number
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              required={true}
                              value={ContactNumber}
                              onChange={(e) => {
                                setContactNumber(e.target.value);
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
                            Contact Email
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              required={true}
                              value={ContactEmail}
                              onChange={(e) => {
                                setContactEmail(e.target.value);
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
                            id='exampleFormControlSelect2'
                            onChange={(e) => {
                              setStarting(e.target.value);
                            }}>
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
                        </div>
                      </div>
                      {/* <div class="col-md-6">
                              <div class="form-group row">
                                <label class="col-sm-3 col-form-label">
                                  Location
                                </label>
                                <div class="col-sm-9">
                                  <input
                                    type="text"
                                    value={Location}
                                    onChange={(e) => {
                                      setLocation(e.target.value);
                                    }}
                                    class="form-control"
                                  />
                                </div>
                              </div>
                            </div> */}
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Location
                          </label>
                          <div class='col-sm-9'>
                            <Select
                              options={locations}
                              placeholder='Locations'
                              onChange={(e) => {
                                console.log(e.value);
                                setLocation(e.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      {/* <div class="col-md-6">
                              <div class="form-group row">
                                <label
                                  class="col-sm-3"
                                  for="exampleFormControlSelect2"
                                  style={{ alignSelf: "center" }}
                                >
                                  Skills & Requirements
                                </label>
                                <div class="col-sm-9">
                                  <input type="text" class="form-control" />
                                </div>
                              </div>
                            </div> */}
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Publish Type
                          </label>
                          <div class='col-sm-9'>
                            <select
                              onChange={(e) => {
                                setPublishType(e.target.value);
                              }}
                              class='form-control'>
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
                            <input
                              type='date'
                              required={true}
                              class='form-control'
                              value={Validity}
                              onChange={(e) => {
                                setValidity(e.target.value);
                              }}
                            />
                            {/* <span class="input-group-addon input-group-append border-left">
                                    <span class="mdi mdi-calendar input-group-text"></span>
                                  </span> */}
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>Logo</label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              required={true}
                              disabled
                              value={Logo}
                              onChange={(e) => {
                                setLogo(e.target.value);
                              }}
                              class='form-control'
                            />
                          </div>
                        </div>
                      </div>

                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            About Company
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              required={true}
                              value={AboutCompany}
                              onChange={(e) => {
                                setAboutCompany(e.target.value);
                              }}
                              class='form-control'
                            />
                          </div>
                        </div>
                      </div>

                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Positions
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='number'
                              required={true}
                              value={Positions}
                              onChange={(e) => {
                                setPositions(e.target.value);
                                if (e.target.value <= 0) {
                                  setPositions(0);
                                }
                              }}
                              class='form-control'
                            />
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Questions
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              required={true}
                              value={Questions}
                              onChange={(e) => {
                                setQuestions(e.target.value);
                              }}
                              class='form-control'
                            />
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Qualification
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              required={true}
                              value={Qualificaiton}
                              onChange={(e) => {
                                setQualificaiton(e.target.value);
                              }}
                              class='form-control'
                            />
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            ExpectedCTC
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              required={true}
                              value={ExpectedCTC}
                              onChange={(e) => {
                                setExpectedCTC(e.target.value);
                              }}
                              class='form-control'
                            />
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Industry
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              value={Industry}
                              onChange={(e) => {
                                setIndustry(e.target.value);
                              }}
                              class='form-control'
                            />
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Key Skills
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              value={KeySkills}
                              required={true}
                              onChange={(e) => {
                                setKeySkills(e.target.value);
                              }}
                              class='form-control'
                            />
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>Remarks</label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              value={Remarks}
                              required={true}
                              onChange={(e) => {
                                setRemarks(e.target.value);
                              }}
                              class='form-control'
                            />
                          </div>
                        </div>
                      </div>
                      {/* <div class="col-md-6">
                              <div class="form-group row">
                                <label class="col-sm-3 col-form-label">
                                  Distance
                                </label>
                                <div class="col-sm-9">
                                  <input
                                    type="text"
                                    value={Distance}
                                    onChange={(e) => {
                                      setDistance(e.target.value);
                                    }}
                                    class="form-control"
                                  />
                                </div>
                              </div>
                            </div> */}
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Company Hire Rate
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              disabled
                              required={true}
                              value={CompanyHireRate}
                              onChange={(e) => {
                                setCompanyHireRate(e.target.value);
                              }}
                              class='form-control'
                            />
                          </div>
                        </div>
                      </div>
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Company Membership Since
                          </label>
                          <div
                            id='datepicker-popup'
                            class='input-group date datepicker col-sm-9'>
                            <input
                              type='text'
                              class='form-control'
                              disabled
                              required={true}
                              value={CompanyMemberSince}
                              onChange={(e) => {
                                setCompanyMemberSince(e.target.value);
                              }}
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
                            Job Status
                          </label>
                          <div class='col-sm-9'>
                            <input
                              type='text'
                              value={JobStatus}
                              required={true}
                              onChange={(e) => {
                                setJobStatus(e.target.value);
                              }}
                              class='form-control'
                            />
                          </div>
                        </div>
                      </div>
                      {/* <div class="col-md-6">
                              <div class="form-group row">
                                <label class="col-sm-3 col-form-label">
                                  Posting Type
                                </label>
                                <div class="col-sm-9">
                                  <input
                                    type="text"
                                    value={PostingType}
                                    onChange={(e) => {
                                      setPostingType(e.target.value);
                                    }}
                                    class="form-control"
                                  />
                                </div>
                              </div>
                            </div> */}
                      <div class='col-md-6'>
                        <div class='form-group row'>
                          <label class='col-sm-3 col-form-label'>
                            Featured
                          </label>
                          <div class='col-sm-9'>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                marginTop: "5px",
                              }}>
                              <div style={{ padding: "10px" }}>
                                <label style={{ marginRight: "10px" }}>
                                  True
                                </label>
                                <input
                                  type='radio'
                                  name='featured'
                                  value={"true"}
                                  required={true}
                                  onChange={(e) => {
                                    setPostingType("true");
                                  }}
                                />
                              </div>
                              <div style={{ padding: "10px" }}>
                                <label style={{ marginRight: "10px" }}>
                                  False
                                </label>
                                <input
                                  required
                                  type='radio'
                                  name='featured'
                                  value={"false"}
                                  onChange={(e) => {
                                    setPostingType("false");
                                  }}
                                />
                              </div>
                            </div>
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
  createJob,
})(AddJobs);
