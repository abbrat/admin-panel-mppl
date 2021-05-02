import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getBannedUser, unBanUserById } from "../../../actions/adminActions";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";

const BlockedCandidates = () => {
  const [bannedUsers, setBannedusers] = useState([]);

  const getAllBannedUsers = async () => {
    const candidates = await getBannedUser();
    await setBannedusers(candidates);
  };

  const unBanUser = async (id) => {
    const unbannedCandidate = await unBanUserById(id);
    console.log(unbannedCandidate);
    if (unbannedCandidate) {
      setBannedusers((prevState) => {
        return prevState.filter((user) => {
          return user._id !== id;
        });
      });
    }
  };

  useEffect(() => {
    getAllBannedUsers();
  }, []);

  return (
    <div>
      <div class='main-panel'>
        <div class='content-wrapper'>
          <div class='card'>
            <div class='card-body'>
              <h4 class='card-title'>Blocked Candidates</h4>
              <div class='row'>
                <div class='col-12'>
                  <div class='table-responsive'>
                    <table class='table'>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Contact</th>
                          <th>Email ID</th>
                          <th>Active Since</th>
                          <th>Status</th>
                          <th>Reason</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!Array.isArray(bannedUsers) ||
                        bannedUsers.length == 0 ? (
                          <p>No blocked candidates</p>
                        ) : (
                          bannedUsers &&
                          bannedUsers.map((user) => {
                            return (
                              <tr>
                                <td>{user.name}</td>
                                <td>New York</td>
                                <td>$1500</td>
                                <td>$3200</td>
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
                                    }}>
                                    View
                                  </button>
                                </td>
                                <td>
                                  <button
                                    class='btn  btn-rounded btn-primary'
                                    style={{
                                      padding: "9px",
                                      marginRight: "5px",
                                      paddingLeft: "15px",
                                      paddingRight: "15px",
                                    }}>
                                    Profile
                                  </button>
                                  <button
                                    class='btn  btn-rounded btn-success'
                                    style={{
                                      padding: "9px",
                                    }}
                                    onClick={() => {
                                      unBanUser(user._id);
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
  users: state.admin.users,
});
export default connect(mapStateToProps, {
  // getBannedUser,
  // unBanUserById,
})(BlockedCandidates);
