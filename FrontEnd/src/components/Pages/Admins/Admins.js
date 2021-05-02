import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { banAdminById, getAdmins } from "../../../actions/adminActions";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import AdminAccessModal from "./AdminAccessModal";

const Admins = (props) => {
  const [adminArr, setAdminArr] = useState([]);
  const [perPage, setPerPage] = useState("10");
  const [pageNo, setPageNo] = useState("1");
  const [page, setPage] = useState();

  const [admins, setAdmins] = useState([]);

  const [adminRole, setAdminRole] = useState("");

  const getAllAdmins = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/users/" + pageNo + "/" + perPage
      );
      await setAdminArr(res.data.admins);
    } catch (error) {
      console.log(error.message);
    }
  };

  const gettingAllAdmins = async () => {
    const admins = await getAdmins();
    console.log("Admins", admins);
    await setAdmins(admins);
  };

  const banAdmin = async (id) => {
    const bannedAdmin = await banAdminById(id);
    console.log(bannedAdmin);
    if (bannedAdmin) {
      setAdminArr((prevState) => {
        return prevState.filter((admin) => {
          return admin._id !== id;
        });
      });

      await gettingAllAdmins();
      await getAllAdmins();
    }
  };

  const getAdminAccess = (admin) => {
    setAdminRole(admin);
  };

  useEffect(() => {
    gettingAllAdmins();
  }, []);

  useEffect(() => {
    getAllAdmins();
  }, [pageNo]);
  return (
    <div>
      {adminRole !== "" ? (
        <AdminAccessModal
          name={adminRole.name}
          role={adminRole.role}
          closeModal={() => {
            setAdminRole("");
          }}
        />
      ) : (
        <div class='main-panel'>
          <div class='content-wrapper'>
            <div class='card'>
              <div class='card-body'>
                <h4 class='card-title'>Admins</h4>
                <div class='row'>
                  <div class='col-12'>
                    <div class='table-responsive'>
                      <Pagination
                        className='my-3'
                        siblingCount={1}
                        boundaryCount={1}
                        variant='outlined'
                        shape='rounded'
                        count={Math.ceil(admins && admins.length / 10)}
                        onChange={(e) => {
                          if (e.target.textContent === "") {
                            var no = parseInt(pageNo);
                            setPageNo(no + 1);
                          } else {
                            setPageNo(e.target.textContent);
                          }
                        }}
                      />
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
                          {adminArr.length === 0 ? (
                            <p>No Admins Created Yet!</p>
                          ) : (
                            adminArr.map((admin) => {
                              return (
                                <tr>
                                  <td>2012/08/03</td>
                                  <td>{admin.name}</td>
                                  <td>{admin.email}</td>
                                  <td>{admin.number}</td>
                                  <td>
                                    <a href='/edit-admin'>
                                      <button
                                        class='btn btn-primary btn-rounded'
                                        style={{
                                          padding: "10px",
                                          paddingLeft: "15px",
                                          paddingRight: "15px",
                                        }}
                                        onClick={() => {
                                          localStorage.setItem(
                                            "selectedAdmin",
                                            JSON.stringify(admin)
                                          );
                                        }}>
                                        View
                                      </button>
                                    </a>
                                  </td>
                                  <td>
                                    <button
                                      class='btn  btn-rounded btn-dark'
                                      style={{
                                        padding: "9px",
                                        marginRight: "5px",
                                        paddingLeft: "15px",
                                        paddingRight: "15px",
                                      }}
                                      onClick={() => {
                                        getAdminAccess(admin);
                                      }}>
                                      Access
                                    </button>
                                    <button
                                      class='btn  btn-rounded btn-danger'
                                      disabled={admin.banAccount}
                                      style={{
                                        padding: "9px",
                                        paddingLeft: "10px",
                                        paddingRight: "10px",
                                        backgroundColor: admin.banAccount
                                          ? "green"
                                          : "red",
                                      }}
                                      onClick={() => {
                                        banAdmin(admin._id);
                                      }}>
                                      {admin.banAccount ? "Banned" : "Block"}
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
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  admins: state.admin.admins,
});

export default connect(mapStateToProps, {
  // getAdmins,
  // banAdmin,
})(Admins);
