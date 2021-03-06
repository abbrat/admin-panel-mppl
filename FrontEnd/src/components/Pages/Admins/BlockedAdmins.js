import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { getBannedAdmins, unBanAdmin } from "../../../actions/adminActions";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";

const BlockedAdmins = (props) => {
  const [bannedAdmins, setBannedAdmins] = useState([]);

  const history = useHistory();

  const getAllBannedAdmins = async () => {
    const admins = await getBannedAdmins();
    console.log(admins);
    await setBannedAdmins(admins);
  };

  const unBanConsultant = async (id) => {
    const unbannedAdmin = await unBanAdmin(id);
    console.log(unbannedAdmin);
    if (unbannedAdmin) {
      setBannedAdmins((prevState) => {
        return prevState.filter((admin) => {
          return admin._id !== id;
        });
      });
    }
  };

  useEffect(() => {
    getAllBannedAdmins();
  }, []);

  return (
    <div>
      <div class='main-panel'>
        <div class='content-wrapper'>
          <div class='card'>
            <div class='card-body'>
              <h4 class='card-title'>Blocked Admins</h4>
              <div class='row'>
                <div class='col-12'>
                  <div class='table-responsive'>
                    <table class='table'>
                      <thead>
                        <tr>
                          <th>Employee ID</th>
                          <th>Name</th>
                          <th>Email ID</th>
                          <th>Contact Number</th>
                          <th>Profile</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bannedAdmins === undefined ||
                        bannedAdmins.length === 0 ? (
                          <p>No Blocked Admins</p>
                        ) : (
                          bannedAdmins.length !== 0 &&
                          bannedAdmins.map((admin) => {
                            return (
                              <tr>
                                <td>{admin.empID}</td>
                                <td>{admin.name}</td>
                                <td>{admin.email}</td>
                                <td>{admin.number}</td>
                                <td>
                                  <button
                                    class='btn btn-primary btn-rounded'
                                    style={{
                                      padding: "10px",
                                      paddingLeft: "15px",
                                      paddingRight: "15px",
                                    }}
                                    onClick={() => {
                                      history.push({
                                        pathname: "/edit-admin",
                                        state: admin,
                                      });
                                    }}>
                                    View
                                  </button>
                                </td>
                                <td>
                                  <button
                                    class='btn  btn-rounded btn-dark'
                                    style={{
                                      padding: "9px",
                                      marginRight: "5px",
                                      paddingLeft: "15px",
                                      paddingRight: "15px",
                                    }}>
                                    Access
                                  </button>
                                  <button
                                    class='btn  btn-rounded btn-danger'
                                    style={{
                                      padding: "9px",
                                      paddingLeft: "10px",
                                      paddingRight: "10px",
                                    }}
                                    onClick={() => {
                                      unBanConsultant(admin._id);
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
              Copyright ?? 2021{" "}
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
  // admins: state.admin.admins,
});

export default connect(mapStateToProps, {
  // getBannedAdmins,
  // unBanAdmin,
})(BlockedAdmins);
