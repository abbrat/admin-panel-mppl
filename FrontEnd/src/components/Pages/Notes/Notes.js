import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteNotesById, getAllNotes } from "../../../actions/adminActions";

import { CSVLink } from "react-csv";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import makeToast from "../../../Toaster";

const useFilterData = (fItems, config = null) => {
  const [filterConfig, setFilterConfig] = useState(config);

  const filterItems = useMemo(() => {
    let filterableItems = [...fItems];
    if (filterConfig !== null) {
      filterableItems = filterableItems.filter((note) => {
        if (
          note.fileName.includes(filterConfig.key) ||
          note.fileAuthor.includes(filterConfig.key) ||
          note.file.includes(filterConfig.key)
        ) {
          return note;
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

const Notes = () => {
  const [arr, setNotes] = useState([]);
  const getNotes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/notes/users/" + pageNo + "/" + perPage
      );
      console.log("Hello");

      if (res.data.notes) {
        await setNotes(res.data.notes);
      }
      // setPage(Math.ceil(res.data.length / 10));
    } catch (error) {
      console.log(error.message);
    }
  };

  const { items, requestSort, sortCoonfig } = useSortableData(arr);
  const history = useHistory();
  const { fItems, requestFilter, filterConfig } = useFilterData(arr);

  const [perPage, setPerPage] = useState("10");
  const [pageNo, setPageNo] = useState("1");
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [numberFilter, setNumberFilter] = useState("");

  const [src, SetSrc] = useState();
  const [open, SetOpen] = useState(false);

  const [filter, setFilter] = useState(false);

  const [allNotes, setAllNotes] = useState([]);

  const gettingAllNotes = async () => {
    const notes = await getAllNotes();
    await setAllNotes(notes);
  };

  const preview = async (event, note) => {
    try {
      const res = await axios.get(note);
      SetSrc(note);
      SetOpen(true);
    } catch (error) {
      makeToast("error", error.message);
      console.log(error.message);
    }
  };

  const deleteUser = async (id) => {
    const deletedNote = await deleteNotesById(id);

    if (deletedNote) {
      await setNotes((prevState) => {
        return prevState.filter((note) => {
          return note._id !== id;
        });
      });
    }
    await gettingAllNotes();
    await getNotes();
  };

  useEffect(() => {
    gettingAllNotes();
  }, []);

  useEffect(() => {
    getNotes();
  }, [arr]);

  useEffect(() => {
    if (nameFilter !== "" || emailFilter !== "" || numberFilter !== "") {
      setFilter(true);
    } else {
      setFilter(false);
    }
  }, [nameFilter, emailFilter, numberFilter]);

  return (
    <div>
      <div class='main-panel'>
        <div class='content-wrapper'>
          <div class='card'>
            <div class='card-body'>
              <h4 class='card-title'>Notes</h4>
              {/*<CSVLink
                      data={props.notes}
                      filename={"Notes_" + Date.now() + ".csv"}
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
                    value={nameFilter}
                    onChange={(e) => {
                      setNameFilter(e.target.value);
                      requestFilter(e.target.value);
                    }}></input>
                  <input
                    type='text'
                    class='form-control col-sm-2'
                    id='exampleFormControlSelect2'
                    placeholder='Author'
                    value={emailFilter}
                    onChange={(e) => {
                      setEmailFilter(e.target.value);
                      requestFilter(e.target.value);
                    }}></input>
                  <input
                    type='text'
                    class='form-control col-sm-2'
                    id='exampleFormControlSelect2'
                    placeholder='File'
                    value={numberFilter}
                    onChange={(e) => {
                      setNumberFilter(e.target.value);
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
                      count={Math.ceil(allNotes && allNotes.length / 10)}
                      onChange={(e) => {
                        if (e.target.textContent == "") {
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
                          <th
                            onClick={() => {
                              requestSort("fileName");
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
                              requestSort("fileAuthor");
                              setFilter(true);
                              if (filter) {
                                setFilter(false);
                              } else {
                                setFilter(true);
                              }
                            }}>
                            Author
                          </th>
                          <th
                            style={{ textAlign: "center" }}
                            onClick={() => {
                              requestSort("file");
                              setFilter(true);
                              if (filter) {
                                setFilter(false);
                              } else {
                                setFilter(true);
                              }
                            }}>
                            File
                          </th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filter ? (
                          items === undefined || items.length === 0 ? (
                            <p>Empty</p>
                          ) : (
                            items &&
                            items.map((note) => {
                              return (
                                <tr>
                                  <td>{note.fileName}</td>
                                  <td>{note.fileAuthor}</td>
                                  <td>
                                    <a
                                      href={note.file}
                                      class='btn btn-primary btn-rounded'
                                      style={{
                                        padding: "12px",
                                        paddingLeft: "15px",
                                        paddingRight: "15px",
                                        marginRight: "10px",
                                      }}>
                                      Download
                                    </a>
                                    <a
                                      onClick={(e) => {
                                        preview(e, note.file);
                                      }}
                                      class='btn btn-primary btn-rounded'
                                      style={{
                                        padding: "12px",
                                        paddingLeft: "15px",
                                        paddingRight: "15px",
                                      }}>
                                      Preview
                                    </a>
                                  </td>
                                  <td>
                                    <a
                                      onClick={() => {
                                        localStorage.setItem(
                                          "notes",
                                          JSON.stringify(note)
                                        );
                                        history.push("/edit-notes");
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
                                        deleteUser(note._id);
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
                          fItems.map((note) => {
                            return (
                              <tr>
                                <td>{note.fileName}</td>
                                <td>{note.fileAuthor}</td>
                                <td>
                                  <a
                                    href={note.file}
                                    class='btn btn-primary btn-rounded'
                                    style={{
                                      padding: "12px",
                                      paddingLeft: "15px",
                                      paddingRight: "15px",
                                      marginRight: "10px",
                                    }}>
                                    Download
                                  </a>
                                  <a
                                    onClick={(e) => {
                                      preview(e, note.file);
                                    }}
                                    class='btn btn-primary btn-rounded'
                                    style={{
                                      padding: "12px",
                                      paddingLeft: "15px",
                                      paddingRight: "15px",
                                    }}>
                                    Preview
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
                                      localStorage.setItem(
                                        "notes",
                                        JSON.stringify(note)
                                      );
                                      history.push("/edit-notes");
                                    }}>
                                    Edit
                                  </button>
                                  <button
                                    class='btn  btn-rounded btn-danger'
                                    style={{
                                      padding: "9px",
                                      paddingLeft: "10px",
                                      paddingRight: "10px",
                                    }}
                                    onClick={() => {
                                      deleteNotesById(note._id);
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
                                <td>
                                  <button
                                    class="btn btn-primary btn-rounded"
                                    style={{
                                      padding: "10px",
                                      paddingLeft: "15px",
                                      paddingRight: "15px",
                                    }}
                                  >
                                    Download
                                  </button>
                                </td>
                                <td>
                                  <a href="/edit-notes">
                                    <button
                                      class="btn  btn-rounded btn-dark"
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
                                    class="btn  btn-rounded btn-danger"
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
                                <td>Brazil</td>
                                <td>$4500</td>
                                <td>
                                  <button
                                    class="btn btn-primary btn-rounded"
                                    style={{
                                      padding: "10px",
                                      paddingLeft: "15px",
                                      paddingRight: "15px",
                                    }}
                                  >
                                    Download
                                  </button>
                                </td>
                                <td>
                                  <a href="/edit-notes">
                                    <button
                                      class="btn  btn-rounded btn-dark"
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
                                    class="btn  btn-rounded btn-danger"
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
          {open && (
            <iframe
              className='frame'
              src={src}
              style={{ width: "100%", height: "80%" }}
            />
          )}
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
  // notes: state.admin.notes,
});

// export default connect(mapStateToProps, { getNotes, deleteNotesById })(Notes);
export default connect(mapStateToProps)(Notes);
