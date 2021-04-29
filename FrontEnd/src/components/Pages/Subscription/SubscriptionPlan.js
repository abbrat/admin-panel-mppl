import axios from "axios";
import { set } from "date-fns/esm";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import makeToast from "../../Toaster";

const SubscriptionPlan = () => {
  const [name, setName] = useState("");
  const [validity, setValidity] = useState("");
  const [amount, setAmount] = useState("");
  const [perks, setPerks] = useState("");
  const [btn, setBtn] = useState("Submit");
  const [id, setId] = useState("");
  const [plans, setPlans] = useState([]);
  const history = useHistory();

  const addPlan = async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "http://api.mppljobs.com/api/subscription",
        formData,
        config
      );
      console.log(res.data);
      if (res.data) {
        makeToast("success", res.data.msg);
      }
    } catch (error) {
      console.log(error.message);
      makeToast("error", error.message);
    }
  };
  const getPlans = async () => {
    try {
      const res = await axios.get("http://api.mppljobs.com/api/subscription");
      setPlans(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const deletePlan = async (id) => {
    try {
      await axios
        .delete("http://api.mppljobs.com/api/subscription/delete/" + id)
        .then(() => {
          makeToast("success", "Deleted!");
        });
    } catch (error) {
      console.log(error.message);
      makeToast("error", error.message);
    }
  };
  const updatePlan = async (id, formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.put(
        "http://api.mppljobs.com/api/subscription/update/" + id,
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
    getPlans();
  });

  return (
    <div>
      <div class="sidebar-light">
        <div class="container-scroller">
          <Navbar />
          <div class="container-fluid page-body-wrapper">
            <Sidebar />
            <div class="main-panel">
              <div class="content-wrapper">
                <div class="row">
                  <div class="col-12 grid-margin">
                    <div class="card">
                      <div class="card-body">
                        <h4 class="card-title">Subscription</h4>
                        <form class="form-sample">
                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group row">
                                <label class="col-sm-3 col-form-label">
                                  Plan Name
                                </label>
                                <div class="col-sm-9">
                                  <input
                                    type="text"
                                    class="form-control"
                                    value={name}
                                    onChange={(e) => {
                                      setName(e.target.value);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group row">
                                <label class="col-sm-3 col-form-label">
                                  Amount
                                </label>
                                <div class="col-sm-9">
                                  <input
                                    type="text"
                                    class="form-control"
                                    value={amount}
                                    onChange={(e) => {
                                      setAmount(e.target.value);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group row">
                                <label class="col-sm-3 col-form-label">
                                  Validity
                                </label>
                                <select
                                  onChange={(e) => {
                                    setValidity(e.target.value);
                                  }}
                                  class="form-control col-sm-9"
                                  id="exampleFormControlSelect2"
                                >
                                  <option>0 Months</option>
                                  <option>1 Months</option>
                                  <option>2 Months</option>
                                  <option>3 Months</option>
                                  <option>4 Months</option>
                                  <option>5 Months</option>
                                  <option>6 Months</option>
                                  <option>7 Months</option>
                                  <option>8 Months</option>
                                  <option>9 Months</option>
                                  <option>10 Months</option>
                                  <option>11 Months</option>
                                  <option>12 Months</option>
                                </select>
                              </div>
                            </div>

                            <div class="col-md-6">
                              <div class="form-group row">
                                <label class="col-sm-3 col-form-label">
                                  Perks
                                </label>
                                <div class="col-sm-9">
                                  <textarea
                                    value={perks}
                                    onChange={(e) => {
                                      setPerks(e.target.value);
                                    }}
                                    class="form-control"
                                    id="exampleTextarea1"
                                    rows="4"
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              if (btn == "Submit") {
                                addPlan({ name, amount, validity, perks });
                              } else {
                                updatePlan(id, {
                                  name,
                                  amount,
                                  validity,
                                  perks,
                                });
                                setBtn("Submit");
                              }
                            }}
                            class="btn btn-primary mr-2"
                          >
                            {btn}
                          </button>
                          <button class="btn btn-light">Cancel</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="content-wrapper" style={{ marginTop: "-50px" }}>
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Subscription Plans</h4>
                    <div class="row">
                      <div class="col-12">
                        <div class="table-responsive">
                          <table class="table">
                            <thead>
                              <tr>
                                <th>Plan Name</th>
                                <th>Amount</th>
                                <th>Validity</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {!Array.isArray(plans) ? (
                                <p>No Plans Added</p>
                              ) : (
                                plans.map((plan) => {
                                  return (
                                    <tr>
                                      <td>{plan.name}</td>
                                      <td>{plan.amount}</td>
                                      <td>{plan.validity}</td>
                                      <td>
                                        <a>
                                          <button
                                            class="btn  btn-rounded btn-dark"
                                            style={{
                                              padding: "9px",
                                              marginRight: "5px",
                                            }}
                                            onClick={() => {
                                              setId(plan._id);
                                              setBtn("Update");
                                              setName(plan.name);
                                              setAmount(plan.amount);
                                              setValidity(plan.validity);
                                              setPerks(plan.perks);
                                              history.push(
                                                "/edit-subscription-plan"
                                              );
                                            }}
                                          >
                                            Edit
                                          </button>
                                        </a>
                                        <button
                                          onClick={() => {
                                            deletePlan(plan._id);
                                          }}
                                          class="btn  btn-rounded btn-danger"
                                          style={{
                                            padding: "9px",
                                          }}
                                        >
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

export default SubscriptionPlan;
