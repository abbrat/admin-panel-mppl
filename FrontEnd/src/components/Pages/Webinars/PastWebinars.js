import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getInactiveWebinars } from "../../../actions/adminActions";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";

const PastWebinars = (props) => {
  const [inactiveWeb, setInactiveWeb] = useState([]);

  const getWebinars = async () => {
    const emp = await getInactiveWebinars();
    console.log(emp);
    if (emp) {
      setInactiveWeb(emp);
    }
  };

  useEffect(() => {
    getWebinars();
  }, []);
  return (
    <div>
      <div class='main-panel'>
        <div class='content-wrapper'>
          <div class='card'>
            <div class='card-body'>
              <h4 class='card-title'>Past Webinars</h4>
              <div class='row'>
                <div class='col-12'>
                  <div class='table-responsive'>
                    <table class='table'>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Category</th>
                          <th>Date</th>
                          <th>Time</th>
                          {/* <th>Actions</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {!Array.isArray(inactiveWeb) ||
                        inactiveWeb.length === 0 ? (
                          <p>No Past Webinars</p>
                        ) : (
                          Array.isArray(inactiveWeb) &&
                          inactiveWeb.map((webinars) => {
                            return (
                              <tr>
                                <td>{webinars.webinarTitle}</td>
                                <td>{webinars.webinarType}</td>
                                <td>{webinars.webinarDate}</td>
                                <td>{webinars.webinarTime}</td>
                                {/* <td>
                                        <button
                                          class="btn btn-primary btn-rounded"
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
  webinars: state.admin.webinars,
});
export default connect(mapStateToProps, {
  getInactiveWebinars,
})(PastWebinars);
