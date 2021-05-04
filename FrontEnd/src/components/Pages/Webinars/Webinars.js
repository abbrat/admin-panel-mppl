import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import {
  deleteWebinarsById,
  getAllWebinars,
} from "../../../actions/adminActions";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
// import TableFilter from "react-table-filter";
import "react-table-filter/lib/styles.css";
import { useHistory } from "react-router-dom";
import { CSVLink } from "react-csv";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";

const useFilterData = (fItems, config = null) => {
  const [filterConfig, setFilterConfig] = useState(config);

  const filterItems = useMemo(() => {
    let filterableItems = [...fItems];
    if (filterConfig !== null) {
      filterableItems = filterableItems.filter((w) => {
        if (
          w.webinarDate.includes(filterConfig.key) ||
          w.webinarTitle.includes(filterConfig.key)
        ) {
          return w;
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
    let sortableItems = [...items];
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

const Webinars = () => {
  const [arr, setArr] = useState([]);
  const [perPage, setPerPage] = useState("10");
  const [pageNo, setPageNo] = useState("1");

  const { items, requestSort, sortCoonfig } = useSortableData(arr);

  const [filter, setFilter] = useState(false);

  const [titleFilter, setTitleFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("");

  const [webinars, setWebinars] = useState([]);

  const { fItems, requestFilter, filterConfig } = useFilterData(arr);

  const history = useHistory();
  const getWebinars = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/webinar/users/" + pageNo + "/" + perPage
      );
      // console.log(res.data.user);
      await setArr(res.data.user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const gettingAllWebinars = async () => {
    const webinars = await getAllWebinars();
    await setWebinars(webinars);
  };

  const deleteWebinar = async (id) => {
    const deletedWebinar = await deleteWebinarsById(id);
    console.log(deletedWebinar);
    if (deletedWebinar) {
      setArr((prevState) => {
        return prevState.filter((webinar) => {
          return webinar._id !== id;
        });
      });
    }
    await gettingAllWebinars();
    await getWebinars();
  };

  useEffect(() => {
    gettingAllWebinars();
  }, []);

  useEffect(() => {
    getWebinars();
  }, [pageNo]);

  useEffect(() => {
    if (
      titleFilter !== "" ||
      typeFilter !== "" ||
      dateFilter !== "" ||
      timeFilter !== ""
    ) {
      setFilter(true);
    } else {
      setFilter(false);
    }
  }, [dateFilter, timeFilter, titleFilter, typeFilter]);

  return (
    <div>
      <div className='main-panel'>
        <div className='content-wrapper'>
          <div className='card'>
            <div className='card-body'>
              <h4 className='card-title'>Webinars</h4>
              {/*<CSVLink
                      data={props.webinars}
                      filename={"Webinars_" + Date.now() + ".csv"}
                      className='btn btn-primary btn-rounded btn-fw'
                      style={{ marginLeft: 10, marginBottom: 10 }}>
                      Export to CSV
                    </CSVLink> */}
              <br></br>
              Filter
              <div class='form-group'>
                <div class='form-group row'>
                  <input
                    type='text'
                    class='form-control col-sm-2'
                    id='exampleFormControlSelect2'
                    placeholder='Title'
                    value={titleFilter}
                    onChange={(e) => {
                      setTitleFilter(e.target.value);
                      requestFilter(e.target.value);
                    }}></input>
                  <input
                    type='text'
                    class='form-control col-sm-2'
                    id='exampleFormControlSelect2'
                    placeholder='Type'
                    value={typeFilter}
                    onChange={(e) => {
                      setTypeFilter(e.target.value);
                      requestFilter(e.target.value);
                    }}></input>
                  <input
                    type='text'
                    class='form-control col-sm-2'
                    id='exampleFormControlSelect2'
                    placeholder='Date'
                    value={dateFilter}
                    onChange={(e) => {
                      setDateFilter(e.target.value);
                      requestFilter(e.target.value);
                    }}></input>
                  <input
                    type='text'
                    class='form-control col-sm-2'
                    id='exampleFormControlSelect2'
                    placeholder='Time'
                    value={timeFilter}
                    onChange={(e) => {
                      setTimeFilter(e.target.value);
                      requestFilter(e.target.value);
                    }}></input>
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <div className='table-responsive'>
                    <Pagination
                      className='my-3'
                      siblingCount={2}
                      boundaryCount={1}
                      variant='outlined'
                      shape='rounded'
                      count={Math.ceil(webinars && webinars.length / 10)}
                      onChange={(e, page) => {
                        setPageNo(page);
                      }}
                    />

                    <table className='table'>
                      <thead>
                        <tr>
                          <th
                            onClick={() => {
                              requestSort("webinarTitle");
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
                              requestSort("webinarType");
                              setFilter(true);
                              if (filter) {
                                setFilter(false);
                              } else {
                                setFilter(true);
                              }
                            }}>
                            Category
                          </th>
                          <th
                            onClick={() => {
                              requestSort("webinarDate");
                              setFilter(true);
                              if (filter) {
                                setFilter(false);
                              } else {
                                setFilter(true);
                              }
                            }}>
                            Date
                          </th>
                          <th
                            onClick={() => {
                              requestSort("webinarTime");
                              setFilter(true);
                              if (filter) {
                                setFilter(false);
                              } else {
                                setFilter(true);
                              }
                            }}>
                            Time
                          </th>
                          <th>Link</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!filter ? (
                          items.length == 0 ? (
                            <p>Empty</p>
                          ) : (
                            items.map((webinar, i) => {
                              return (
                                <tr
                                  key={i}
                                  role='row'
                                  className={i % 2 == 0 ? "even" : "odd"}>
                                  <td className='sorting_1'>
                                    {webinar.webinarTitle}
                                  </td>
                                  <td>{webinar.webinarType}</td>
                                  <td>{webinar.webinarDate}</td>
                                  <td>{webinar.webinarTime}</td>
                                  <td>
                                    <button
                                      className='btn btn-primary btn-rounded'
                                      style={{
                                        padding: "10px",
                                        paddingLeft: "15px",
                                        paddingRight: "15px",
                                      }}
                                      onClick={() => {
                                        navigator.clipboard.writeText(
                                          webinar.webinarLink
                                        );
                                        alert("Copied");
                                      }}>
                                      Copy Link
                                    </button>
                                  </td>
                                  <td>
                                    <button
                                      className='btn  btn-rounded btn-dark'
                                      style={{
                                        padding: "9px",
                                        marginRight: "5px",
                                        paddingLeft: "15px",
                                        paddingRight: "15px",
                                      }}
                                      onClick={() => {
                                        history.push({
                                          pathname: "/edit-webinar",
                                          state: webinar,
                                        });
                                      }}>
                                      Edit
                                    </button>
                                    <button
                                      className='btn  btn-rounded btn-danger'
                                      style={{
                                        padding: "9px",
                                        paddingLeft: "10px",
                                        paddingRight: "10px",
                                      }}
                                      onClick={() => {
                                        deleteWebinar(webinar._id);
                                      }}>
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              );
                            })
                          )
                        ) : (
                          fItems.map((webinar, i) => {
                            return (
                              <tr
                                key={i}
                                role='row'
                                className={i % 2 == 0 ? "even" : "odd"}>
                                <td className='sorting_1'>
                                  {webinar.webinarTitle}
                                </td>
                                <td>{webinar.webinarType}</td>
                                <td>{webinar.webinarDate}</td>
                                <td>{webinar.webinarTime}</td>
                                <td>
                                  <button
                                    className='btn btn-primary btn-rounded'
                                    style={{
                                      padding: "10px",
                                      paddingLeft: "15px",
                                      paddingRight: "15px",
                                    }}
                                    onClick={() => {
                                      navigator.clipboard.writeText(
                                        webinar.webinarLink
                                      );
                                      alert("Copied");
                                    }}>
                                    Copy Link
                                  </button>
                                </td>
                                <td>
                                  <button
                                    className='btn  btn-rounded btn-dark'
                                    style={{
                                      padding: "9px",
                                      marginRight: "5px",
                                      paddingLeft: "15px",
                                      paddingRight: "15px",
                                    }}
                                    onClick={() => {
                                      history.push({
                                        pathname: "/edit-webinar",
                                        state: webinar,
                                      });
                                    }}>
                                    Edit
                                  </button>
                                  <button
                                    className='btn  btn-rounded btn-danger'
                                    style={{
                                      padding: "9px",
                                      paddingLeft: "10px",
                                      paddingRight: "10px",
                                    }}
                                    onClick={() => {
                                      deleteWebinarsById(webinar._id);
                                    }}>
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        )}
                        {/* <tr>
                                <td>New York</td>
                                <td>$1500</td>
                                <td>2012/08/03</td>
                                <td>2012/08/03</td>
                                <td>
                                  <button
                                    className="btn btn-primary btn-rounded"
                                    style={{
                                      padding: "10px",
                                      paddingLeft: "15px",
                                      paddingRight: "15px",
                                    }}
                                  >
                                    Copy Link
                                  </button>
                                </td>
                                <td>
                                  <a href="/edit-webinar">
                                    <button
                                      className="btn  btn-rounded btn-dark"
                                      style={{
                                        padding: "9px",
                                        marginRight: "5px",
                                        paddingLeft: "15px",
                                        paddingRight: "15px",
                                      }}
                                    >
                                      Edit
                                    </button>
                                  </a>
                                  <button
                                    className="btn  btn-rounded btn-danger"
                                    style={{
                                      padding: "9px",
                                      paddingLeft: "10px",
                                      paddingRight: "10px",
                                    }}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td>2015/04/01</td>
                                <td>Brazil</td>
                                <td>$4500</td>
                                <td>$7500</td>
                                <td>
                                  <button
                                    className="btn btn-primary btn-rounded"
                                    style={{
                                      padding: "10px",
                                      paddingLeft: "15px",
                                      paddingRight: "15px",
                                    }}
                                  >
                                    Copy Link
                                  </button>
                                </td>
                                <td>
                                  <a href="/edit-webinar">
                                    <button
                                      className="btn  btn-rounded btn-dark"
                                      style={{
                                        padding: "9px",
                                        paddingLeft: "15px",
                                        paddingRight: "15px",
                                        marginRight: "5px",
                                      }}
                                    >
                                      Edit
                                    </button>
                                  </a>
                                  <button
                                    className="btn  btn-rounded btn-danger"
                                    style={{
                                      padding: "9px",
                                      paddingLeft: "10px",
                                      paddingRight: "10px",
                                    }}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td>New York</td>
                                <td>$1500</td>
                                <td>2012/08/03</td>
                                <td>2012/08/03</td>
                                <td>
                                  <button
                                    className="btn btn-primary btn-rounded"
                                    style={{
                                      padding: "10px",
                                      paddingLeft: "15px",
                                      paddingRight: "15px",
                                    }}
                                  >
                                    Copy Link
                                  </button>
                                </td>
                                <td>
                                  <a href="/edit-webinar">
                                    <button
                                      className="btn  btn-rounded btn-dark"
                                      style={{
                                        padding: "9px",
                                        marginRight: "5px",
                                        paddingLeft: "15px",
                                        paddingRight: "15px",
                                      }}
                                    >
                                      Edit
                                    </button>
                                  </a>
                                  <button
                                    className="btn  btn-rounded btn-danger"
                                    style={{
                                      padding: "9px",
                                      paddingLeft: "10px",
                                      paddingRight: "10px",
                                    }}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td>2015/04/01</td>
                                <td>Brazil</td>
                                <td>$4500</td>
                                <td>$7500</td>
                                <td>
                                  <button
                                    className="btn btn-primary btn-rounded"
                                    style={{
                                      padding: "10px",
                                      paddingLeft: "15px",
                                      paddingRight: "15px",
                                    }}
                                  >
                                    Copy Link
                                  </button>
                                </td>
                                <td>
                                  <a href="/edit-webinar">
                                    <button
                                      className="btn  btn-rounded btn-dark"
                                      style={{
                                        padding: "9px",
                                        paddingLeft: "15px",
                                        paddingRight: "15px",
                                        marginRight: "5px",
                                      }}
                                    >
                                      Edit
                                    </button>
                                  </a>
                                  <button
                                    className="btn  btn-rounded btn-danger"
                                    style={{
                                      padding: "9px",
                                      paddingLeft: "10px",
                                      paddingRight: "10px",
                                    }}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td>New York</td>
                                <td>$1500</td>
                                <td>2012/08/03</td>
                                <td>2012/08/03</td>
                                <td>
                                  <button
                                    className="btn btn-primary btn-rounded"
                                    style={{
                                      padding: "10px",
                                      paddingLeft: "15px",
                                      paddingRight: "15px",
                                    }}
                                  >
                                    Copy Link
                                  </button>
                                </td>
                                <td>
                                  <a href="/edit-webinar">
                                    <button
                                      className="btn  btn-rounded btn-dark"
                                      style={{
                                        padding: "9px",
                                        marginRight: "5px",
                                        paddingLeft: "15px",
                                        paddingRight: "15px",
                                      }}
                                    >
                                      Edit
                                    </button>
                                  </a>
                                  <button
                                    className="btn  btn-rounded btn-danger"
                                    style={{
                                      padding: "9px",
                                      paddingLeft: "10px",
                                      paddingRight: "10px",
                                    }}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td>2015/04/01</td>
                                <td>Brazil</td>
                                <td>$4500</td>
                                <td>$7500</td>
                                <td>
                                  <button
                                    className="btn btn-primary btn-rounded"
                                    style={{
                                      padding: "10px",
                                      paddingLeft: "15px",
                                      paddingRight: "15px",
                                    }}
                                  >
                                    Copy Link
                                  </button>
                                </td>
                                <td>
                                  <a href="/edit-webinar">
                                    <button
                                      className="btn  btn-rounded btn-dark"
                                      style={{
                                        padding: "9px",
                                        paddingLeft: "15px",
                                        paddingRight: "15px",
                                        marginRight: "5px",
                                      }}
                                    >
                                      Edit
                                    </button>
                                  </a>
                                  <button
                                    className="btn  btn-rounded btn-danger"
                                    style={{
                                      padding: "9px",
                                      paddingLeft: "10px",
                                      paddingRight: "10px",
                                    }}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td>New York</td>
                                <td>$1500</td>
                                <td>2012/08/03</td>
                                <td>2012/08/03</td>
                                <td>
                                  <button
                                    className="btn btn-primary btn-rounded"
                                    style={{
                                      padding: "10px",
                                      paddingLeft: "15px",
                                      paddingRight: "15px",
                                    }}
                                  >
                                    Copy Link
                                  </button>
                                </td>
                                <td>
                                  <a href="/edit-webinar">
                                    <button
                                      className="btn  btn-rounded btn-dark"
                                      style={{
                                        padding: "9px",
                                        marginRight: "5px",
                                        paddingLeft: "15px",
                                        paddingRight: "15px",
                                      }}
                                    >
                                      Edit
                                    </button>
                                  </a>
                                  <button
                                    className="btn  btn-rounded btn-danger"
                                    style={{
                                      padding: "9px",
                                      paddingLeft: "10px",
                                      paddingRight: "10px",
                                    }}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td>2015/04/01</td>
                                <td>Brazil</td>
                                <td>$4500</td>
                                <td>$7500</td>
                                <td>
                                  <button
                                    className="btn btn-primary btn-rounded"
                                    style={{
                                      padding: "10px",
                                      paddingLeft: "15px",
                                      paddingRight: "15px",
                                    }}
                                  >
                                    Copy Link
                                  </button>
                                </td>
                                <td>
                                  <a href="/edit-webinar">
                                    <button
                                      className="btn  btn-rounded btn-dark"
                                      style={{
                                        padding: "9px",
                                        paddingLeft: "15px",
                                        paddingRight: "15px",
                                        marginRight: "5px",
                                      }}
                                    >
                                      Edit
                                    </button>
                                  </a>
                                  <button
                                    className="btn  btn-rounded btn-danger"
                                    style={{
                                      padding: "9px",
                                      paddingLeft: "10px",
                                      paddingRight: "10px",
                                    }}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr> */}
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
  getAllWebinars,
  deleteWebinarsById,
})(Webinars);
