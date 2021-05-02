import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { getInactiveEmployers } from "../../../actions/adminActions";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";

const InactiveEmployers = () => {
  const [inactiveEmp, setInactiveEmp] = useState([]);

  const getJobs = async () => {
    const emp = await getInactiveEmployers();
    console.log(emp);
    if (emp) {
      setInactiveEmp(emp);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

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
                    <table id='order-listing' class='table'>
                      <thead>
                        <tr>
                          <th>Company</th>
                          <th>Email ID</th>
                          <th>Contact</th>
                          <th>Website</th>
                          <th>Subscription</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inactiveEmp.length === 0 ? (
                          <p>No Inactive Employers</p>
                        ) : (
                          inactiveEmp.map((emp) => {
                            return (
                              <tr>
                                <td>{emp.CompanyName || ""}</td>
                                <td>{emp.CompanyName || ""}</td>
                                <td>{emp.CompanyContact || ""}</td>
                                <td>
                                  <a href='https://toodecimal.com/'>
                                    {emp.Website}
                                  </a>
                                </td>
                                <td>
                                  <label class='badge badge-danger'>
                                    Expired
                                  </label>
                                </td>
                                <td>
                                  <button
                                    class='btn btn-dark btn-rounded'
                                    style={{
                                      padding: "10px",
                                      paddingLeft: "15px",
                                      paddingRight: "15px",
                                    }}
                                    onClick={(e) => {
                                      e.preventDefault();
                                    }}>
                                    View
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

export default InactiveEmployers;
