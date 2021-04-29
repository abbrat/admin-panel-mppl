import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getInactiveJobs } from "../../../actions/adminActions";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";

const InactiveEmployers = (props) => {
  useEffect(() => {
    getInactiveJobs();
  });
  return (
    <div>
      <div class='main-panel'>
        <div class='content-wrapper'>
          <div class='card'>
            <div class='card-body'>
              <h4 class='card-title'>Employers</h4>
              <div class='row'>
                <div class='col-12'>
                  <div class='table-responsive'>
                    <table class='table'>
                      <thead>
                        <tr>
                          <th>Company</th>
                          <th>Email ID</th>
                          <th>Contact</th>
                          <th>Website</th>
                          <th>Subscription</th>
                          {/* <th>Actions</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {!Array.isArray(props.jobs) ? (
                          <p>No Old Jobs</p>
                        ) : (
                          props.jobs.map((jobs) => {
                            return (
                              <tr>
                                <td>{jobs.CompanyName}</td>
                                <td>{jobs.ContactEmail}</td>
                                <td>{jobs.ContactNumber}</td>
                                <td>
                                  <a href='https://toodecimal.com/'>
                                    www.toodecimal.com
                                  </a>
                                </td>
                                <td>
                                  <label class='badge badge-danger'>
                                    Expired
                                  </label>
                                </td>
                                {/* <td>
                                        <button
                                          class="btn btn-dark btn-rounded"
                                          style={{
                                            padding: "10px",
                                            paddingLeft: "15px",
                                            paddingRight: "15px",
                                          }}
                                        >
                                          View
                                        </button>
                                      </td> */}
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
  jobs: state.admin.jobs,
});
export default connect(mapStateToProps, {
  // getInactiveJobs,
})(InactiveEmployers);
