import React from "react";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";

const Transaction = () => {
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
                    <h4 class="card-title">Transactions</h4>
                    <div class="row">
                      <div class="col-12">
                        <div class="table-responsive">
                          <table id="order-listing" class="table">
                            <thead>
                              <tr>
                                <th>Date & Time</th>
                                <th>Payment Details</th>
                                <th>Candidate Name</th>
                                <th>Payment Status</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>2012/08/03</td>
                                <td>Edinburgh</td>
                                <td>New York</td>
                                <td>
                                  <label class="badge badge-danger">
                                    Failed
                                  </label>
                                </td>
                                <td>
                                  <button
                                    class="btn  btn-rounded btn-success"
                                    style={{
                                      padding: "9px",
                                      marginRight: "5px",
                                    }}
                                  >
                                    View
                                  </button>
                                  <button
                                    class="btn  btn-rounded btn-dark"
                                    style={{
                                      padding: "9px",
                                    }}
                                  >
                                    Profile
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td>2015/04/01</td>
                                <td>Doe</td>
                                <td>Brazil</td>
                                <td>
                                  <label class="badge badge-success">
                                    Success
                                  </label>
                                </td>
                                <td>
                                  <button
                                    class="btn  btn-rounded btn-success"
                                    style={{
                                      padding: "9px",
                                      marginRight: "5px",
                                    }}
                                  >
                                    View
                                  </button>
                                  <button
                                    class="btn  btn-rounded btn-dark"
                                    style={{
                                      padding: "9px",
                                    }}
                                  >
                                    Profile
                                  </button>
                                </td>
                              </tr>
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

export default Transaction;
