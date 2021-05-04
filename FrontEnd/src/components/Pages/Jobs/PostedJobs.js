import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { deleteJobByID, getAllJobs } from "../../../actions/adminActions";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import Moment from "react-moment";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import PropTypes from "prop-types";
import { CSVLink } from "react-csv";
import { useHistory } from "react-router";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";

const useFilterData = (fItems, config = null) => {
  const [filterConfig, setFilterConfig] = useState(config);

  const filterItems = useMemo(() => {
    let filterableItems;

    if (fItems) {
      filterableItems = fItems && [...fItems];
    }

    if (filterConfig !== null) {
      filterableItems = filterableItems.filter((job) => {
        if (
          job.CompanyName.includes(filterConfig.key) ||
          job.JobTitle.includes(filterConfig.key)
        ) {
          return job;
        }
      });
    }
    return filterableItems;
  }, [fItems, filterConfig]);

  const requestFilter = (key) => {
    setFilterConfig({ key });
  };
  return { fItems: filterItems, requestFilter, filterConfig };
};

const useSortableData = (items, config = null) => {
  const [sortCoonfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems;

    if (items) {
      sortableItems = [...items];
    }
    if (sortCoonfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortCoonfig.key] < b[sortCoonfig.key]) {
          return sortCoonfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortCoonfig.key] > b[sortCoonfig.key]) {
          return sortCoonfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortCoonfig]);

  const requestSort = (key) => {
    console.log(key);
    let direction = "ascending";
    if (
      sortCoonfig &&
      sortCoonfig.key === key &&
      sortCoonfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  return { items: sortedItems, requestSort, sortCoonfig };
};

const PostedJobs = (props) => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [filter, setFilter] = useState(false);

  // const [jobsArr, setJobs] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [titleFilter, setTitleFilter] = useState("");
  const history = useHistory();

  const [arr, setArr] = useState([]);
  // const { items, requestSort, sortCoonfig } = useSortableData(arr);
  const [perPage, setPerPage] = useState("10");
  const [pageNo, setPageNo] = useState("1");
  const [page, setPage] = useState();

  const [allJobs, setAllJobs] = useState([]);

  const { items, requestSort, sortCoonfig } = useSortableData(arr);
  const { fItems, requestFilter, filterConfig } = useFilterData(arr);

  const getJobs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/jobs/users/" + pageNo + "/" + perPage
      );
      console.log(res);
      if (res.data.jobs) {
        return setArr(res.data.jobs);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const gettingAllJobs = async () => {
    const jobs = await getAllJobs();
    if (jobs) {
      console.log(jobs);
      await setAllJobs(jobs);
    }
  };

  const deleteJobs = async (id) => {
    try {
      const isJobDeleted = await deleteJobByID(id);
      if (isJobDeleted) {
        setArr((prevState) => {
          return prevState.filter((job) => {
            return job._id !== id;
          });
        });
      }
      await gettingAllJobs();
      await getJobs();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gettingAllJobs();
  }, []);

  useEffect(() => {
    getJobs();
    // setJobs(arr);
  }, [pageNo]);

  useEffect(() => {
    if (nameFilter !== "" || titleFilter !== "") {
      setFilter(true);
    } else {
      setFilter(false);
    }
  }, [nameFilter, titleFilter]);

  // const filterData = () => {
  //   if (nameFilter == "" && titleFilter == "") {
  //     setJobs(props.getAllJobs);
  //   }
  //   if (nameFilter != "") {
  //     items = items.filter((job) => {
  //       if (job.CompanyName.includes(nameFilter)) {
  //         return job;
  //       }
  //     });
  //   }
  //   if (titleFilter != "") {
  //     setJobs(
  //       items.filter((job) => {
  //         if (job.JobTitle.includes(titleFilter)) {
  //           return job;
  //         }
  //       })
  //     );
  //   }
  //   // if (titleFilter != "" && nameFilter != "") {
  //   //   setJobs(
  //   //     props.jobs.filter((job) => {
  //   //       if (
  //   //         job.JobTitle.includes(titleFilter) &&
  //   //         job.CompanyName.includes(nameFilter)
  //   //       ) {
  //   //         return job;
  //   //       }
  //   //     })
  //   //   );
  //   // }
  // };

  const resetFilter = () => {
    setTitleFilter("");
    setNameFilter("");
  };

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div>
      <div class='sidebar-light'>
        <div class='container-scroller'>
          <div class='main-panel'>
            <div class='content-wrapper'>
              <div class='card'>
                <div class='card-body'>
                  <h4 class='card-title'>Posted Jobs</h4>
                  <button
                    type='button'
                    class='btn btn-primary btn-rounded btn-fw'
                    style={{ marginBottom: 10 }}
                    onClick={() => {
                      onOpenModal();
                    }}>
                    Filter
                  </button>
                  <button
                    type='button'
                    class='btn btn-danger btn-rounded btn-fw'
                    style={{ marginBottom: 10, marginLeft: 10 }}
                    onClick={() => {
                      resetFilter();
                    }}>
                    Reset Filters
                  </button>
                  {/*<CSVLink
                      data={props.jobs}
                      filename={"Jobs_" + Date.now() + ".csv"}
                      className='btn btn-primary btn-rounded btn-fw'
                      style={{ marginLeft: 10, marginBottom: 10 }}>
                      Export to CSV
                    </CSVLink> */}
                  <br></br>
                  <button
                    type='button'
                    class='btn btn-primary btn-rounded btn-fw'
                    style={{ marginBottom: 10, marginLeft: 10 }}
                    onClick={() => {
                      requestSort("CompanyName");
                      setFilter(true);
                      if (filter) {
                        setFilter(false);
                      } else {
                        setFilter(true);
                      }
                    }}>
                    Company
                  </button>
                  {/* <code>Sort By</code>
                    <button
                      type="button"
                      class="btn btn-primary btn-rounded btn-fw"
                      style={{ marginBottom: 10, marginLeft: 10 }}
                      onClick={() => {
                        // setJobs(
                        //   props.jobs.sort((a, b) => {
                        //     if (a.JobTitle > b.JobTitle) {
                        //       return 1;
                        //     } else {
                        //       return -1;
                        //     }
                        //   })
                        // );
                        requestSort("JobTitle");
                      }}
                    >
                      Job Title
                    </button>
              
                    <button
                      type="button"
                      class="btn btn-primary btn-rounded btn-fw"
                      style={{ marginBottom: 10, marginLeft: 10 }}
                      onClick={() => {
                        // onOpenModal();
                        alert("Sorting to be Set!");
                      }}
                    >
                      Openings
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary btn-rounded btn-fw"
                      style={{ marginBottom: 10, marginLeft: 10 }}
                      onClick={() => {
                        requestSort("date");
                      }}
                    >
                      Published On
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary btn-rounded btn-fw"
                      style={{ marginBottom: 10, marginLeft: 10 }}
                      onClick={() => {
                        // onOpenModal();
                        alert("Sorting to be Set!");
                      }}
                    >
                      Validity
                    </button> */}
                  <div class='form-group'>
                    <div class='form-group row'>
                      <input
                        type='text'
                        class='form-control col-sm-2'
                        id='exampleFormControlSelect2'
                        placeholder='Job Title'
                        value={titleFilter}
                        onChange={(e) => {
                          setTitleFilter(e.target.value);
                          requestFilter(e.target.value);
                        }}></input>
                      <input
                        type='text'
                        class='form-control col-sm-2'
                        id='exampleFormControlSelect2'
                        placeholder='Company Name'
                        value={nameFilter}
                        onChange={(e) => {
                          setNameFilter(e.target.value);
                          requestFilter(e.target.value);
                        }}></input>
                    </div>
                  </div>
                  <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={(e) => {
                      console.log(e);
                      if (e.selection.startDate) {
                        setSelectionRange({
                          startDate: e.selection.startDate,
                        });
                      }

                      if (e.selection.endDate) {
                        setSelectionRange({
                          endDate: e.selection.endDate,
                        });
                      }
                    }}></DateRangePicker>

                  <div class='row'>
                    <div class='col-12'>
                      <div class='table-responsive'>
                        <Pagination
                          className='my-3'
                          siblingCount={1}
                          boundaryCount={1}
                          variant='outlined'
                          shape='rounded'
                          count={Math.ceil(allJobs && allJobs.length / 10)}
                          onChange={(e, page) => {
                            setPageNo(page);
                          }}
                        />
                        <table class='table'>
                          <thead>
                            <tr>
                              <th
                                onClick={() => {
                                  if (items.length === 0) {
                                    return;
                                  }
                                  requestSort("JobTitle");
                                  setFilter(true);
                                  if (filter) {
                                    setFilter(false);
                                  } else {
                                    setFilter(true);
                                  }
                                }}>
                                Title
                              </th>
                              <th
                                onClick={() => {
                                  if (items.length === 0) {
                                    return;
                                  }
                                  requestSort("CompanyName");
                                  setFilter(true);
                                  if (filter) {
                                    setFilter(false);
                                  } else {
                                    setFilter(true);
                                  }
                                }}>
                                Company
                              </th>
                              <th
                                onClick={() => {
                                  // onOpenModal();
                                  alert("Sorting to be Set!");
                                }}>
                                Openings
                              </th>
                              <th
                                onClick={() => {
                                  if (items.length === 0) {
                                    return;
                                  }
                                  requestSort("date");
                                  setFilter(true);
                                  if (filter) {
                                    setFilter(false);
                                  } else {
                                    setFilter(true);
                                  }
                                }}>
                                Published On
                              </th>
                              <th>Validity</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {!filter ? (
                              items.length === 0 ? (
                                <p>Empty</p>
                              ) : (
                                items.map((job) => {
                                  return (
                                    <tr>
                                      <td>{job.JobTitle}</td>
                                      <td>{job.CompanyName}</td>
                                      <td>{job.CompanyName}</td>
                                      <td>
                                        <Moment format='DD/MM/YYYY'>
                                          {job.date}
                                        </Moment>
                                      </td>
                                      <td>
                                        <Moment format='DD/MM/YYYY'>
                                          {job.Validity}
                                        </Moment>
                                      </td>
                                      <td>
                                        <label class='badge badge-success'>
                                          Active
                                        </label>
                                      </td>
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
                                          onClick={() => {
                                            history.push({
                                              pathname: "/edit-jobs",
                                              state: job,
                                            });
                                          }}
                                          style={{
                                            padding: "9px",
                                            marginRight: "5px",
                                            paddingLeft: "15px",
                                            paddingRight: "15px",
                                          }}>
                                          Edit
                                        </button>
                                        <button
                                          class='btn  btn-rounded btn-danger'
                                          style={{
                                            padding: "9px",
                                          }}
                                          onClick={() => {
                                            deleteJobByID(job._id);
                                          }}>
                                          Delete
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })
                              )
                            ) : (
                              fItems &&
                              fItems.map((job) => {
                                return (
                                  <tr>
                                    <td>{job.JobTitle}</td>
                                    <td>{job.CompanyName}</td>
                                    <td>{job.CompanyName}</td>
                                    <td>
                                      <Moment format='DD/MM/YYYY'>
                                        {job.date}
                                      </Moment>
                                    </td>
                                    <td>
                                      <Moment format='DD/MM/YYYY'>
                                        {job.Validity}
                                      </Moment>
                                    </td>
                                    <td>
                                      <label class='badge badge-success'>
                                        Active
                                      </label>
                                    </td>
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
                                        onClick={() => {
                                          history.push({
                                            pathname: "/edit-jobs",
                                            state: { selectedJob: job },
                                          });
                                        }}
                                        style={{
                                          padding: "9px",
                                          marginRight: "5px",
                                          paddingLeft: "15px",
                                          paddingRight: "15px",
                                        }}>
                                        Edit
                                      </button>
                                      <button
                                        class='btn  btn-rounded btn-danger'
                                        onClick={() => {
                                          console.log("Deleted");
                                          deleteJobs(job._id);
                                        }}
                                        style={{
                                          padding: "9px",
                                        }}>
                                        Delete
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
      </div>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        styles={{
          overlay: {
            width: 10000,
          },
        }}
        onEscKeyDown={onCloseModal}>
        <div class='col-12 grid-margin stretch-card'>
          <div class='card'>
            <div class='card-body'>
              <h4 class='card-title'>Filter Data</h4>
              <p class='card-description'>Filter Elements</p>
              <form class='forms-sample'>
                <div class='form-group'>
                  <label for='exampleInputName1'>Company Name</label>
                  <input
                    type='text'
                    class='form-control'
                    id='exampleInputName1'
                    placeholder='Name'
                    value={nameFilter}
                    onChange={(e) => {
                      setNameFilter(e.target.value);
                      requestFilter(e.target.value);
                      console.log(fItems);
                    }}
                  />
                </div>
                <div class='form-group'>
                  <label for='exampleInputEmail3'>Job Title</label>
                  <input
                    type='text'
                    value={titleFilter}
                    onChange={(e) => {
                      setTitleFilter(e.target.value);
                    }}
                    class='form-control'
                    id='exampleInputEmail3'
                    placeholder='Job Title'
                  />
                </div>
                {/* <div class="form-group">
                  <label for="exampleInputPassword4">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword4"
                    placeholder="Password"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleSelectGender">Gender</label>
                  <select class="form-control" id="exampleSelectGender">
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>File upload</label>
                  <input type="file" name="img[]" class="file-upload-default" />
                  <div class="input-group col-xs-12">
                    <input
                      type="text"
                      class="form-control file-upload-info"
                      disabled
                      placeholder="Upload Image"
                    />
                    <span class="input-group-append">
                      <button
                        class="file-upload-browse btn btn-primary"
                        type="button"
                      >
                        Upload
                      </button>
                    </span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputCity1">City</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputCity1"
                    placeholder="Location"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleTextarea1">Textarea</label>
                  <textarea
                    class="form-control"
                    id="exampleTextarea1"
                    rows="4"
                  ></textarea>
                </div> */}
                <button
                  type='button'
                  class='btn btn-primary mr-2'
                  onClick={() => {
                    // filterData();
                    onCloseModal();
                  }}>
                  Submit
                </button>
                <button class='btn btn-light'>Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

PostedJobs.propTypes = {
  jobs: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  jobs: state.jobs,
});

export default connect(mapStateToProps, {
  // getAllJobs,
  // deleteJobByID,
})(PostedJobs);
