import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPastMocktests } from "../../../actions/adminActions";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";

const PastMockTest = (props) => {
  useEffect(() => {
    props.getPastMocktests();
  });
  return (
    <div>
      <div class="sidebar-light">
        <div class="container-scroller">
          <Navbar />
          <div class="container-fluid page-body-wrapper">
            <Sidebar />
            <div class="main-panel">
              <div class="content-wrapper">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Past Mock Test</h4>
                    <div class="row">
                      <div class="col-12">
                        <div class="table-responsive">
                          <table class="table">
                            <thead>
                              <tr>
                                <th>Test Code</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Duration</th>
                                <th>Validity</th>
                                <th>Difficulty</th>
                                {/* <th>Actions</th> */}
                              </tr>
                            </thead>

                            <tbody>
                              {!Array.isArray(props.mockTests) ? (
                                <p>No Past Mock Tests</p>
                              ) : (
                                props.mockTests.map((mockTests) => {
                                  return (
                                    <tr>
                                      <td>{mockTests.TestCode}</td>
                                      <td>{mockTests.TestTitle}</td>
                                      <td>{mockTests.Category}</td>
                                      <td>{mockTests.Duration}</td>
                                      <td>{mockTests.Validity}</td>
                                      <td>
                                        <label class="badge badge-success">
                                          Easy
                                        </label>
                                      </td>

                                      {/* <td>
                                  <button
                                    class="btn  btn-rounded btn-dark"
                                    style={{
                                      padding: "9px",
                                      marginRight: "5px",
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

              <footer class="footer">
                <div class="d-sm-flex justify-content-center justify-content-sm-between">
                  <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">
                    Copyright © 2021{" "}
                    <a href="https://www.toodecimal.com" target="_blank">
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

const mapStateToProps = (state) => ({
  mockTests: state.admin.mockTests,
});
export default connect(mapStateToProps, {
  getPastMocktests,
})(PastMockTest);
