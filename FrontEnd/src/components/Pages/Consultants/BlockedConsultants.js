import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import {
  getBannedConsultants,
  unBanConsultantById,
} from "../../../actions/adminActions";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";

const BlockedConsultants = (props) => {
  const history = useHistory();
  useEffect(() => {
    getBannedConsultants();
  });
  return (
    <div>
      <div class='main-panel'>
        <div class='content-wrapper'>
          <div class='card'>
            <div class='card-body'>
              <h4 class='card-title'>Blocked Consultants</h4>
              <div class='row'>
                <div class='col-12'>
                  <div class='table-responsive'>
                    <table class='table'>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Sector</th>
                          <th>Average Rating</th>
                          <th>Reason</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!Array.isArray(props.consultants) ? (
                          <p>No Data Found</p>
                        ) : (
                          props.consultants.map((consultant) => {
                            return (
                              <tr>
                                <td>{consultant.name}</td>
                                <td>{consultant.email}</td>
                                <td>{consultant.experience}</td>
                                <td>
                                  <button
                                    class='btn btn-primary btn-rounded'
                                    style={{
                                      padding: "10px",
                                      paddingLeft: "15px",
                                      paddingRight: "15px",
                                    }}>
                                    View
                                  </button>
                                </td>
                                <td>
                                  <a
                                    onClick={() => {
                                      localStorage.setItem(
                                        "consultant",
                                        JSON.stringify(consultant)
                                      );
                                      history.push("/edit-consultant");
                                    }}>
                                    <button
                                      class='btn  btn-rounded btn-dark'
                                      style={{
                                        padding: "9px",
                                        marginRight: "5px",
                                        paddingLeft: "15px",
                                        paddingRight: "15px",
                                      }}>
                                      Edit
                                    </button>
                                  </a>
                                  <button
                                    class='btn  btn-rounded btn-success'
                                    style={{
                                      padding: "9px",
                                      paddingLeft: "10px",
                                      paddingRight: "10px",
                                    }}
                                    onClick={() => {
                                      unBanConsultantById(consultant._id);
                                    }}>
                                    Unblock
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
  consultants: state.admin.consultants,
});

export default connect(mapStateToProps, {
  getBannedConsultants,
  unBanConsultantById,
})(BlockedConsultants);
