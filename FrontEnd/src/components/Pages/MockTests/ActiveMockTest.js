import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { deleteTestByID, getMockTests } from "../../../actions/adminActions";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";

const ActiveMockTest = (props) => {
  const history = useHistory();

  const [arr, setArr] = useState([]);
  // const { items, requestSort, sortCoonfig } = useSortableData(arr);
  const [perPage, setPerPage] = useState("10");
  const [pageNo, setPageNo] = useState("1");
  const [page, setPage] = useState();

  const getAllMockTest = async () => {
    try {
      const res = await axios.get(
        "http://api.mppljobs.com/api/test/users/" + pageNo + "/" + perPage
      );
      setArr(res.data.users);
      setPage(Math.ceil(res.data.length / 10));
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    // props.getMockTests();
    getAllMockTest();
  }, [pageNo]);
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
                    <h4 class="card-title">Active Mock Test</h4>
                    <div class="row">
                      <div class="col-12">
                        <div class="table-responsive">
                          <Pagination
                            className="my-3"
                            siblingCount={1}
                            boundaryCount={1}
                            variant="outlined"
                            shape="rounded"
                            count={page}
                            onChange={(e) => {
                              if (e.target.textContent == "") {
                                var no = parseInt(pageNo);
                                setPageNo(no + 1);

                                getAllMockTest();
                              } else {
                                setPageNo(e.target.textContent);
                                console.log("hi");
                                getAllMockTest();
                              }
                            }}
                          />
                          <table class="table">
                            <thead>
                              <tr>
                                <th>Test Code</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Duration</th>
                                <th>Validity</th>
                                <th>Difficulty</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {arr.map((test) => {
                                return (
                                  <tr>
                                    <td>{test.TestCode}</td>
                                    <td>{test.TestTitle}</td>
                                    <td>{test.Category} </td>
                                    <td>{test.Duration}</td>
                                    <td>{test.Validity}</td>
                                    <td>
                                      <label class="badge badge-danger">
                                        Difficult
                                      </label>
                                    </td>

                                    <td>
                                      <a
                                        onClick={() => {
                                          localStorage.setItem(
                                            "mockTest",
                                            JSON.stringify(test)
                                          );
                                          history.push("edit-mock-test");
                                        }}
                                      >
                                        <button
                                          class="btn  btn-rounded btn-dark"
                                          style={{
                                            padding: "9px",
                                            marginRight: "5px",
                                          }}
                                        >
                                          Edit
                                        </button>
                                      </a>
                                      <button
                                        class="btn  btn-rounded btn-danger"
                                        style={{
                                          padding: "9px",
                                        }}
                                        onClick={() => {
                                          props.deleteTestByID(test._id);
                                        }}
                                      >
                                        Delete
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
  getMockTests,
  deleteTestByID,
})(ActiveMockTest);
