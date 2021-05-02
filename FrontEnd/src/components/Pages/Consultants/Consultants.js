import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import {
  banConsultantById,
  getConsultants,
} from "../../../actions/adminActions";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";

const Consultants = (props) => {
  const history = useHistory();
  const [arr, setArr] = useState([]);
  // const { items, requestSort, sortCoonfig } = useSortableData(arr);
  const [perPage, setPerPage] = useState("10");
  const [pageNo, setPageNo] = useState("1");
  const [page, setPage] = useState();

  const [consultants, setConsultants] = useState([]);

  const getAllConsultants = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/consultant/users/" + pageNo + "/" + perPage
      );
      setArr(res.data.consultants);
      // setPage(Math.ceil(res.data.length / 10));
    } catch (error) {
      console.log(error.message);
    }
  };

  const gettingAllConsultants = async () => {
    const candidates = await getConsultants();
    await setConsultants(candidates);
  };

  const banConsultant = async (id) => {
    const banCandidate = await banConsultantById(id);
    console.log(banCandidate);
    if (banCandidate) {
      setArr((prevState) => {
        return prevState.filter((user) => {
          return user._id !== id;
        });
      });
      await getAllConsultants();
      await gettingAllConsultants();
    }
  };

  useEffect(() => {
    gettingAllConsultants();
  }, []);

  useEffect(() => {
    getAllConsultants();
  }, [pageNo]);

  return (
    <div>
      <div class='main-panel'>
        <div class='content-wrapper'>
          <div class='card'>
            <div class='card-body'>
              <h4 class='card-title'>Consultants</h4>
              <div class='row'>
                <div class='col-12'>
                  <div class='table-responsive'>
                    <Pagination
                      className='my-3'
                      siblingCount={1}
                      boundaryCount={1}
                      variant='outlined'
                      shape='rounded'
                      count={Math.ceil(consultants && consultants.length / 10)}
                      onChange={(e) => {
                        if (e.target.textContent === "") {
                          var no = parseInt(pageNo);
                          setPageNo(no + 1);
                        } else {
                          setPageNo(e.target.textContent);
                          console.log("hi");
                        }
                      }}
                    />
                    <table class='table'>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Sector</th>
                          <th>Experience</th>
                          {/* <th>Profile</th> */}
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {arr &&
                          arr.map((consultant) => {
                            return (
                              <tr>
                                <td>{consultant.name}</td>
                                <td>{consultant.email}</td>
                                <td>{consultant.sector}</td>
                                <td>{consultant.experience}</td>
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
                                      localStorage.setItem(
                                        "consultant",
                                        JSON.stringify(consultant)
                                      );
                                      history.push("/edit-consultant");
                                    }}>
                                    Edit
                                  </button>
                                  <button
                                    class='btn  btn-rounded btn-danger'
                                    disabled={consultant.banAccount}
                                    style={{
                                      padding: "9px",
                                      paddingLeft: "10px",
                                      paddingRight: "10px",
                                      backgroundColor: consultant.banAccount
                                        ? "green"
                                        : "red",
                                    }}
                                    onClick={() => {
                                      banConsultant(consultant._id);
                                    }}>
                                    {consultant.banAccount ? "Banned" : "Block"}
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
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
  getConsultants,
  banConsultantById,
})(Consultants);
