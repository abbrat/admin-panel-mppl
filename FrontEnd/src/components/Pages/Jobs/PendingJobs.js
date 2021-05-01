import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  approveJobs,
  deleteJobByID,
  getUnApprovedJobs,
} from "../../../actions/adminActions";
import { useHistory } from "react-router";

import Moment from "react-moment";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const PendingJobs = () => {
  // const selector = useSelector((state) => state);
  // const dispatch = useDispatch();

  const [jobs, setJobs] = useState([]);

  const history = useHistory();

  const getAllUnApprovedJobs = async () => {
    const jobs = await getUnApprovedJobs();
    await setJobs(jobs);
  };

  const approveJobsById = async (id) => {
    const isApproved = await approveJobs(id);
    if (isApproved) {
      setJobs((prevState) => {
        return prevState.filter((job) => {
          return job._id !== id;
        });
      });
    }
  };

  const deleteJob = async (id) => {
    const isDeleted = await deleteJobByID(id);
    if (isDeleted) {
      setJobs((prevState) => {
        return prevState.filter((job) => {
          return job._id !== id;
        });
      });
    }
  };

  useEffect(() => {
    getAllUnApprovedJobs();
  }, []);

  return (
    <div>
      <div class='main-panel'>
        <div class='content-wrapper'>
          <div class='card'>
            <div class='card-body'>
              <h4 class='card-title'>Pending Jobs</h4>
              <div class='row'>
                <div class='col-12'>
                  <div class='table-responsive'>
                    <table class='table'>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Company</th>
                          <th>Openings</th>
                          <th>Published On</th>
                          <th>Validity</th>
                          <th>Status</th>
                          <th>View Job</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobs.length === 0 ? (
                          <p>No Unapproved Jobs</p>
                        ) : (
                          jobs.map((job) => {
                            return (
                              <tr>
                                <td>{job.JobTitle}</td>
                                <td>{job.CompanyName}</td>
                                <td>{job.CompanyName}</td>
                                <td>
                                  <Moment format='DD/MM/YYYY'>
                                    {job.date}
                                  </Moment>
                                </td>
                                <td>{job.JobTitle}</td>
                                <td>
                                  <label class='badge badge-success'>
                                    Active
                                  </label>
                                </td>
                                <td>
                                  <button
                                    class='btn btn-primary btn-rounded'
                                    style={{
                                      padding: "10px",
                                      paddingLeft: "15px",
                                      paddingRight: "15px",
                                    }}
                                    onClick={() => {
                                      localStorage.setItem(
                                        "selectedJob",
                                        JSON.stringify(job)
                                      );
                                      history.push("/edit-jobs");
                                    }}>
                                    View
                                  </button>
                                </td>
                                <td>
                                  <button
                                    class='btn  btn-rounded btn-dark'
                                    onClick={() => {
                                      approveJobsById(job._id);
                                    }}
                                    style={{
                                      padding: "9px",
                                      marginRight: "5px",
                                      paddingLeft: "15px",
                                      paddingRight: "15px",
                                    }}>
                                    Approve
                                  </button>
                                  <button
                                    class='btn  btn-rounded btn-danger'
                                    style={{
                                      padding: "9px",
                                    }}
                                    onClick={() => {
                                      deleteJob(job._id);
                                    }}>
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
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

const mapStateToProps = (state) => ({
  // unApprovedJobs: state.admin.unApprovedJobs,
});

export default connect(mapStateToProps, {
  // getUnApprovedJobs,
  // approveJobs,
  // deleteJobByID,
})(PendingJobs);
