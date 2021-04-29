import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import makeToast from "../../../Toaster";

const Categories = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [btn, setBtn] = useState("Submit");
  const [id, setId] = useState("");

  const addCategory = async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "http://localhost:5000/api/category",
        formData,
        config
      );
      if (res.data) {
        makeToast("success", res.data.msg);
      }
    } catch (error) {
      console.log(error.message);
      makeToast("error", error.message);
    }
  };
  const getCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/category", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      setCategories(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteCategory = async (id) => {
    try {
      await axios
        .delete("http://localhost:5000/api/category/delete/" + id)
        .then(() => {
          makeToast("success", "Deleted!");
        });
    } catch (error) {
      console.log(error.message);
      makeToast("error", error.message);
    }
  };
  const updateCategory = async (id, formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.put(
        "http://localhost:5000/api/category/update/" + id,
        formData,
        config
      );
      if (res.data) {
        makeToast("success", res.data.msg);
      }
    } catch (error) {
      console.log(error.message);
      makeToast("error", error.message);
    }
  };
  useEffect(() => {
    getCategories();
  });
  return (
    <div>
      <div class='sidebar-light'>
        <div class='container-scroller'>
          <Navbar />
          <div class='container-fluid page-body-wrapper'>
            <div class='main-panel'>
              <div class='content-wrapper'>
                <div class='row'>
                  <div class='col-12 grid-margin'>
                    <div class='card'>
                      <div class='card-body'>
                        <h4 class='card-title'>Categories</h4>
                        <form class='form-sample'>
                          <div class='row'>
                            {/* <div class="col-md-6">
                              <div class="form-group row">
                                <label
                                  class="col-sm-3"
                                  for="exampleFormControlSelect2"
                                  style={{ alignSelf: "center" }}
                                >
                                  ID
                                </label>
                                <div class="col-sm-9">
                                  <input type="text" class="form-control" />
                                </div>
                              </div>
                            </div> */}
                            <div class='col-md-6'>
                              <div class='form-group row'>
                                <label class='col-sm-3 col-form-label'>
                                  Category Name
                                </label>
                                <div class='col-sm-9'>
                                  <input
                                    type='text'
                                    value={name}
                                    onChange={(e) => {
                                      setName(e.target.value);
                                    }}
                                    class='form-control'
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            type='button'
                            onClick={() => {
                              if (btn === "Submit") {
                                console.log("Submit");
                                addCategory({ name });
                              } else {
                                updateCategory(id, { name });
                                setBtn("Submit");
                              }
                            }}
                            class='btn btn-primary mr-2'>
                            {btn}
                          </button>
                          <button class='btn btn-light'>Cancel</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class='content-wrapper' style={{ marginTop: "-100px" }}>
                <div class='card'>
                  <div class='card-body'>
                    <h4 class='card-title'>Categories</h4>
                    <div class='row'>
                      <div class='col-12'>
                        <div class='table-responsive'>
                          <table class='table'>
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th>Category Name</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {!Array.isArray(categories) ? (
                                <p>No Categories Created</p>
                              ) : (
                                categories.map((category) => {
                                  return (
                                    <tr>
                                      <td>{category._id}</td>
                                      <td>{category.name}</td>
                                      <td>
                                        <button
                                          class='btn  btn-rounded btn-dark'
                                          style={{
                                            padding: "9px",
                                            marginRight: "5px",
                                          }}
                                          onClick={() => {
                                            setName(category.name);
                                            setId(category._id);
                                            setBtn("Update");
                                          }}>
                                          Edit
                                        </button>
                                        <button
                                          class='btn  btn-rounded btn-danger'
                                          style={{
                                            padding: "9px",
                                          }}
                                          onClick={() => {
                                            deleteCategory(category._id);
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
      </div>
    </div>
  );
};

export default Categories;
