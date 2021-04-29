import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { CSVLink } from "react-csv";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { getAllCompanies } from "../../../actions/adminActions";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";

const useFilterData = (fItems, config = null) => {
  const [filterConfig, setFilterConfig] = useState(config);

  const filterItems = useMemo(() => {
    let filterableItems = [...fItems];
    if (filterConfig !== null) {
      filterableItems = filterableItems.filter((company) => {
        if (
          company.CompanyName.includes(filterConfig.key) ||
          company.CompanyEmail.includes(filterConfig.key) ||
          company.Website.includes(filterConfig.key)
        ) {
          return company;
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
      sortCoonfig.key == key &&
      sortCoonfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  return { items: sortedItems, requestSort, sortCoonfig };
};

const Employers = (props) => {
  const history = useHistory();
  const [arr, setArr] = useState([]);
  const [perPage, setPerPage] = useState("10");
  const [pageNo, setPageNo] = useState("1");
  const [page, setPage] = useState();
  const { items, requestSort, sortCoonfig } = useSortableData(arr);
  const [filter, setFilter] = useState(false);

  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [numberFilter, setNumberFilter] = useState("");
  const [website, setWebsiteFilter] = useState("");
  const { fItems, requestFilter, filterConfig } = useFilterData(arr);

  const getCompanies = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/company/users/" + pageNo + "/" + perPage
      );
      setArr(res.data.users);
      setPage(Math.ceil(res.data.length / 10));
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    // props.getAllCompanies();
    getCompanies();
    if (nameFilter !== "" || emailFilter !== "" || website !== "") {
      setFilter(false);
    } else {
      setFilter(true);
    }
  }, [pageNo]);

  return (
    <div>
      <div class='main-panel'>
        <div class='content-wrapper'>
          <div class='card'>
            <div class='card-body'>
              <h4 class='card-title'>Employers</h4>
              {/*} <CSVLink
                      data={props.companies}
                      filename={"Companies_" + Date.now() + ".csv"}
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
                    placeholder='Name'
                    value={nameFilter}
                    onChange={(e) => {
                      setNameFilter(e.target.value);
                      requestFilter(e.target.value);
                    }}></input>
                  <input
                    type='text'
                    class='form-control col-sm-2'
                    id='exampleFormControlSelect2'
                    placeholder='Email'
                    value={emailFilter}
                    onChange={(e) => {
                      setEmailFilter(e.target.value);
                      requestFilter(e.target.value);
                    }}></input>
                  <input
                    type='text'
                    class='form-control col-sm-2'
                    id='exampleFormControlSelect2'
                    placeholder='Number'
                    value={numberFilter}
                    onChange={(e) => {
                      setNumberFilter(e.target.value);
                      requestFilter(e.target.value);
                    }}></input>
                  <input
                    type='text'
                    class='form-control col-sm-2'
                    id='exampleFormControlSelect2'
                    placeholder='Website'
                    value={website}
                    onChange={(e) => {
                      setWebsiteFilter(e.target.value);
                      requestFilter(e.target.value);
                    }}></input>
                </div>
              </div>
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

                          getCompanies();
                        } else {
                          setPageNo(e.target.textContent);
                          console.log("hi");
                          getCompanies();
                        }
                      }}
                    />
                    <table class='table'>
                      <thead>
                        <tr>
                          <th
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
                          </th>
                          <th
                            onClick={() => {
                              requestSort("CompanyEmail");
                              setFilter(true);
                              if (filter) {
                                setFilter(false);
                              } else {
                                setFilter(true);
                              }
                            }}>
                            Email ID
                          </th>
                          <th
                            onClick={() => {
                              setFilter(true);
                              if (filter) {
                                setFilter(false);
                              } else {
                                setFilter(true);
                              }
                            }}>
                            Contact
                          </th>
                          <th
                            onClick={() => {
                              requestSort("Website");
                              setFilter(true);
                              if (filter) {
                                setFilter(false);
                              } else {
                                setFilter(true);
                              }
                            }}>
                            Website
                          </th>
                          <th>Subscription</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filter ? (
                          items.length === 0 ? (
                            <p>Empty</p>
                          ) : (
                            items.map((company, i) => {
                              return (
                                <tr key={i}>
                                  <td>{company.CompanyName}</td>
                                  <td>{company.CompanyEmail}</td>
                                  <td>{company.CompanyContact}</td>
                                  <td>
                                    <a href='https://toodecimal.com/'>
                                      {company.Website}
                                    </a>
                                  </td>
                                  <td>
                                    <label class='badge badge-danger'>
                                      Expired
                                    </label>
                                  </td>
                                  <td>
                                    {/* <button
                                            class="btn btn-dark btn-rounded"
                                            style={{
                                              padding: "10px",
                                              paddingLeft: "15px",
                                              paddingRight: "15px",
                                            }}
                                          >
                                            View
                                          </button> */}
                                    <a
                                      onClick={() => {
                                        localStorage.setItem(
                                          "company",
                                          JSON.stringify(company)
                                        );
                                        history.push("/edit-employer");
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
                                  </td>
                                </tr>
                              );
                            })
                          )
                        ) : (
                          fItems.map((company, i) => {
                            return (
                              <tr key={i}>
                                <td>{company.CompanyName}</td>
                                <td>{company.CompanyEmail}</td>
                                <td>{company.CompanyContact}</td>
                                <td>
                                  <a href='https://toodecimal.com/'>
                                    {company.Website}
                                  </a>
                                </td>
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
                                  <a
                                    onClick={() => {
                                      localStorage.setItem(
                                        "company",
                                        JSON.stringify(company)
                                      );
                                      history.push("/edit-employer");
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
                                </td>
                              </tr>
                            );
                          })
                        )}
                        {/* {props.companies.map((company) => {
                                return (
                                  <tr>
                                    <td>{company.Website}</td>
                                  </tr>
                                );
                              })} */}
                        {/* <tr>
                                <td>Edinburgh</td>
                                <td>New York</td>
                                <td>$1500</td>
                                <td>
                                  <a href="https://toodecimal.com/">
                                    www.toodecimal.com
                                  </a>
                                </td>
                                <td>
                                  <label class="badge badge-danger">
                                    Expired
                                  </label>
                                </td>
                                <td>
                                  <button
                                    class="btn btn-dark btn-rounded"
                                    style={{
                                      padding: "10px",
                                      paddingLeft: "15px",
                                      paddingRight: "15px",
                                    }}
                                  >
                                    View
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td>Doe</td>
                                <td>Brazil</td>
                                <td>$4500</td>
                                <td>$7500</td>
                                <td>
                                  <label class="badge badge-success">
                                    Active
                                  </label>
                                </td>
                                <td>
                                  <button
                                    class="btn btn-dark btn-rounded"
                                    style={{
                                      padding: "10px",
                                      paddingLeft: "15px",
                                      paddingRight: "15px",
                                    }}
                                  >
                                    View
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
  companies: state.admin.companies,
});

export default connect(mapStateToProps, {
  // getAllCompanies,
})(Employers);
