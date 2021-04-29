import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";

const EditSubscriptionPlan = () => {
  const [edit, setEdit] = useState(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState(
    JSON.parse(localStorage.getItem("subscriptionPlan"))
  );
  const [planName, setPlanName] = useState(subscriptionPlan.planName || "");
  const [amount, setAmount] = useState(amount.amount || "");
  const [validity, setValidity] = useState(subscriptionPlan.validity || "");
  const [perks, setPerks] = useState(subscriptionPlan.perks || "");

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
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            padding: "10px",
                          }}
                        >
                          <h4 class="card-title">EDIT SUBSCRIPTION</h4>
                          <button
                            type="submit"
                            class="btn btn-primary mr-2"
                            style={{ padding: "10px" }}
                            onClick={() => {
                              if (!edit) {
                                setEdit(true);
                              } else {
                                setEdit(false);
                              }
                            }}
                          >
                            {!edit ? "Edit" : "Cancel"}
                          </button>
                        </div>
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
                                    value={planName}
                                    onChange={(e) => {
                                      setPlanName(e.target.value);
                                    }}
                                    disabled={!edit}
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
                                    disabled={!edit}
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
                                  class="form-control col-sm-9"
                                  id="exampleFormControlSelect2"
                                  value={validity}
                                  onChange={(e) => {
                                    setValidity(e.target.value);
                                  }}
                                  disabled={!edit}
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
                                    class="form-control"
                                    id="exampleTextarea1"
                                    rows="4"
                                    value={perks}
                                    onChange={(e) => {
                                      setPerks(e.target.value);
                                    }}
                                    disabled={!edit}
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button type="submit" class="btn btn-primary mr-2">
                            {!edit ? "Submit" : "Save"}
                          </button>
                          <button class="btn btn-light">Cancel</button>
                        </form>
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

export default EditSubscriptionPlan;
