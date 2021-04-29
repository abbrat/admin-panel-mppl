import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {useSelector,connect} from 'react-redux';
const Dashboard = () => {
    const history = useHistory();
    const selector = useSelector(state=>state);
    useEffect(() => {
        
    },[selector.loggedin]);
    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-lg-8 grid-margin d-flex flex-column">
                        <div className="row">
                            <div className="col-md-3 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <div className="text-primary mb-4">
                                            <i className="mdi mdi-account-multiple mdi-36px"></i>
                                            <p className="font-weight-medium mt-2">Customers</p>
                                        </div>
                                        <h1 className="font-weight-light">45679</h1>
                                        <p className="text-muted mb-0">Increase by 20%</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <div className="text-danger mb-4">
                                            <i className="mdi mdi-chart-pie mdi-36px"></i>
                                            <p className="font-weight-medium mt-2">Orders</p>
                                        </div>
                                        <h1 className="font-weight-light">80927</h1>
                                        <p className="text-muted mb-0">Increase by 60%</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <div className="text-info mb-4">
                                            <i className="mdi mdi-car mdi-36px"></i>
                                            <p className="font-weight-medium mt-2">Delivery</p>
                                        </div>
                                        <h1 className="font-weight-light">22339</h1>
                                        <p className="text-muted mb-0">Decrease by 2%</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <div className="text-success mb-4">
                                            <i className="mdi mdi-verified mdi-36px"></i>
                                            <p className="font-weight-medium mt-2">Users</p>
                                        </div>
                                        <h1 className="font-weight-light">+1900</h1>
                                        <p className="text-muted mb-0">Steady growth</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row flex-grow-1">
                            <div className="col-lg-6 grid-margin grid-margin-lg-0 stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Product categories</h4>
                                        <canvas id="sales-status-chart"></canvas>
                                        <div
                                            id="sales-status-chart-legend"
                                            className="mt-3 chartjs-legend"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 stretch-card">
                                <div className="card">
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <div className="d-flex justify-content-between align-items-start">
                                            <h4 className="card-title">Product visits</h4>
                                            <div className="dropdown">
                                                <button
                                                    className="btn btn-sm btn-outline-secondary btn-rounded dropdown-toggle text-black"
                                                    type="button"
                                                    id="dropdownMenuButton2"
                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >
                                                    This week
                              </button>
                                                <div
                                                    className="dropdown-menu"
                                                    aria-labelledby="dropdownMenuButton2"
                                                >
                                                    <a className="dropdown-item" href="#">
                                                        This day
                                </a>
                                                    <div className="dropdown-divider"></div>
                                                    <a className="dropdown-item" href="#">
                                                        This month
                                </a>
                                                    <div className="dropdown-divider"></div>
                                                    <a className="dropdown-item" href="#">
                                                        This week
                                </a>
                                                    <div className="dropdown-divider"></div>
                                                    <a className="dropdown-item" href="#">
                                                        This year
                                </a>
                                                </div>
                                            </div>
                                        </div>
                                        <canvas id="sales-chart"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 grid-margin stretch-card">
                        <div className="card d-flex flex-column justify-content-between">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start">
                                    <h4 className="card-title">Revenue</h4>
                                    <div className="dropdown mb-4">
                                        <button
                                            className="btn btn-sm btn-outline-secondary btn-rounded dropdown-toggle text-black"
                                            type="button"
                                            id="dropdownMenuButton1"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            This week
                          </button>
                                        <div
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuButton1"
                                        >
                                            <a className="dropdown-item" href="#">
                                                This day
                            </a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="#">
                                                This month
                            </a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="#">
                                                This week
                            </a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="#">
                                                This year
                            </a>
                                        </div>
                                    </div>
                                </div>
                                <h4 className="font-weight-light">Total revenue</h4>
                                <h1 className="font-weight-normal mb-0">36568</h1>
                                <div className="d-md-flex justify-content-start mt-5">
                                    <div className="mb-3 mb-lg-0">
                                        <h4 className="font-weight-light text-primary">
                                            +40%
                          </h4>
                                        <p className="text-primary mb-0">Growth</p>
                                    </div>
                                    <div className="mb-3 mb-lg-0 ml-md-4">
                                        <h4 className="font-weight-light text-danger">
                                            2.5%
                          </h4>
                                        <p className="text-danger mb-0">Refund</p>
                                    </div>
                                    <div className="ml-md-4">
                                        <h4 className="font-weight-light text-info">
                                            +23.6%
                          </h4>
                                        <p className="text-info mb-0">Online</p>
                                    </div>
                                </div>
                                <p className="mt-3 mb-0 text-muted">
                                    Lorem ipsum doller sit amete Lorem ipsum doller sit
                                    amete Lorem ipsum doller sit amete Lorem ipsum doller
                                    sit amete
                      </p>
                            </div>
                            <div className="card-body px-0 pb-0 d-flex flex-column justify-content-between">
                                <canvas
                                    id="statistics-chart"
                                    className="mt-auto"
                                ></canvas>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Calendar</h4>
                                <div
                                    id="inline-datepicker-example"
                                    className="datepicker"
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Best sellers</h4>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Sales</th>
                                                <th>Stock</th>
                                                <th>Category</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Moon Fever</td>
                                                <td>42070</td>
                                                <td>801</td>
                                                <td>Cynthialand</td>
                                            </tr>
                                            <tr>
                                                <td>Dude You Re Getting A Telescope</td>
                                                <td>38667</td>
                                                <td>882</td>
                                                <td>West Janie</td>
                                            </tr>
                                            <tr>
                                                <td>Telescopes 101</td>
                                                <td>12467</td>
                                                <td>181</td>
                                                <td>Harrisport</td>
                                            </tr>
                                            <tr>
                                                <td>Asteroids</td>
                                                <td>8118</td>
                                                <td>336</td>
                                                <td>West Furmanstad</td>
                                            </tr>
                                            <tr>
                                                <td>The Glossary Of Telescopes</td>
                                                <td>21136</td>
                                                <td>979</td>
                                                <td>Lake Berenice</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body d-flex flex-column justify-content-between">
                                <h4 className="card-title">Statistics</h4>
                                <div>
                                    <h1 className="font-weight-normal">87659</h1>
                                    <h4 className="font-weight-light mb-0">
                                        Last 6 months sales
                        </h4>
                                </div>
                                <canvas id="orders-chart"></canvas>
                                <div
                                    id="orders-chart-legend"
                                    className="chartjs-legend orders-legend"
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Tickets</h4>
                                <div className="d-flex border-bottom pb-3">
                                    <img
                                        src="../../images/faces/face1.jpg"
                                        alt="profile"
                                        className="img-xs rounded-circle"
                                    />
                                    <div className="flex-grow-1 ml-3">
                                        <p>Dollie Ellis</p>
                                        <div className="d-flex text-muted">
                                            <p className="mb-0">Friesenview</p>
                                            <p className="ml-auto mb-0">12:45</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex border-bottom py-3">
                                    <img
                                        src="../../images/faces/face2.jpg"
                                        alt="profile"
                                        className="img-xs rounded-circle"
                                    />
                                    <div className="flex-grow-1 ml-3">
                                        <p>Lillie Long</p>
                                        <div className="d-flex text-muted">
                                            <p className="mb-0">Susiehaven</p>
                                            <p className="ml-auto mb-0">10:33</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex border-bottom py-3">
                                    <img
                                        src="../../images/faces/face3.jpg"
                                        alt="profile"
                                        className="img-xs rounded-circle"
                                    />
                                    <div className="flex-grow-1 ml-3">
                                        <p>Lloyd Harper</p>
                                        <div className="d-flex text-muted">
                                            <p className="mb-0">South Hilbert</p>
                                            <p className="ml-auto mb-0">11:10</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex pt-3">
                                    <img
                                        src="../../images/faces/face4.jpg"
                                        alt="profile"
                                        className="img-xs rounded-circle"
                                    />
                                    <div className="flex-grow-1 ml-3">
                                        <p>Bradley Foster</p>
                                        <div className="d-flex text-muted">
                                            <p className="mb-0">Deshawnhaven</p>
                                            <p className="ml-auto mb-0">13:20</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Activity timeline</h4>
                                <ul className="bullet-line-list">
                                    <li>
                                        <p className="text-muted mb-2">24 May 2018</p>
                                        <p>Vacation Home Rental Success</p>
                                    </li>
                                    <li>
                                        <p className="text-muted mb-2">25 May 2018</p>
                                        <p>Online Games How To Play To Win</p>
                                    </li>
                                    <li>
                                        <p className="text-muted mb-2">26 May 2018</p>
                                        <p>Big Savings On Gas</p>
                                    </li>
                                    <li>
                                        <p className="text-muted mb-2">27 May 2018</p>
                                        <p className="mb-0">A Time Travel Postcard</p>
                                    </li>
                                </ul>
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
    );
};

const m = state => {
    return {
      state: state
    };
  
  };
  

export default connect(m) (Dashboard);
