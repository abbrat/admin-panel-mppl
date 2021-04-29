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

  const getAllConsultants = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/consultant/users/" + pageNo + "/" + perPage
      );
      console.log(res.data.users);
      setArr(res.data.users);
      setPage(Math.ceil(res.data.length / 10));
    } catch (error) {
      console.log(error.message);
    }
  };
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
                      count={page}
                      onChange={(e) => {
                        if (e.target.textContent == "") {
                          var no = parseInt(pageNo);
                          setPageNo(no + 1);

                          getAllConsultants();
                        } else {
                          setPageNo(e.target.textContent);
                          console.log("hi");
                          getAllConsultants();
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
                        {arr.map((consultant) => {
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
                                  class='btn  btn-rounded btn-danger'
                                  style={{
                                    padding: "9px",
                                    paddingLeft: "10px",
                                    paddingRight: "10px",
                                  }}
                                  onClick={() => {
                                    banConsultantById(consultant._id);
                                  }}>
                                  Block
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
