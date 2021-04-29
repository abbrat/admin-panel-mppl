import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const [role, setRole] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setRole(selector.role);
  }, [selector.role]);
  return (
    <div>
      <nav className='sidebar sidebar-offcanvas' id='sidebar'>
        <ul className='nav'>
          <li className='nav-item'>
            <Link className='nav-link' to='/'>
              <i className='mdi mdi-view-quilt menu-icon'></i>
              <span className='menu-title'>Dashboard</span>
            </Link>
          </li>
          {role.includes("All") || role.includes("Jobs") ? (
            <li className='nav-item'>
              <a
                className='nav-link'
                data-toggle='collapse'
                href='#ui-basic'
                aria-expanded='false'
                aria-controls='ui-basic'>
                <i className='mdi mdi-palette menu-icon'></i>
                <span className='menu-title'>Jobs</span>
                <i className='menu-arrow'></i>
              </a>
              <div className='collapse' id='ui-basic'>
                <ul className='nav flex-column sub-menu'>
                  <li className='nav-item'>
                    <NavLink to='/add-jobs' className='nav-link'>
                      Add Jobs
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink to='/pending-jobs' className='nav-link'>
                      Pending Jobs
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink to='/posted-jobs' className='nav-link'>
                      Posted Jobs
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink to='/old-jobs' className='nav-link'>
                      Old Jobs
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink to='/categories' className='nav-link'>
                      Categories
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
          ) : (
            <Fragment></Fragment>
          )}

          {role.includes("All") || role.includes("Candidates") ? (
            <li className='nav-item'>
              <a
                className='nav-link'
                data-toggle='collapse'
                href='#ui-advanced'
                aria-expanded='false'
                aria-controls='ui-advanced'>
                <i className='mdi mdi-layers menu-icon'></i>
                <span className='menu-title'>Candidates</span>
                <i className='menu-arrow'></i>
              </a>
              <div className='collapse' id='ui-advanced'>
                <ul className='nav flex-column sub-menu'>
                  <li className='nav-item'>
                    {" "}
                    <NavLink to='/add-candidates' className='nav-link'>
                      Add Candidates
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    {" "}
                    <NavLink to='/candidates' className='nav-link'>
                      Candidates
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    {" "}
                    <NavLink to='/blocked-candidates' className='nav-link'>
                      Blocked Candidates
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
          ) : (
            <Fragment></Fragment>
          )}
          {role.includes("All") || role.includes("Employers") ? (
            <li className='nav-item'>
              <a
                className='nav-link'
                data-toggle='collapse'
                href='#form-elements'
                aria-expanded='false'
                aria-controls='form-elements'>
                <i className='mdi mdi-view-headline menu-icon'></i>
                <span className='menu-title'>Employers</span>
                <i className='menu-arrow'></i>
              </a>
              <div className='collapse' id='form-elements'>
                <ul className='nav flex-column sub-menu'>
                  <li className='nav-item'>
                    <NavLink to='/add-employer' className='nav-link'>
                      Add Employer
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink to='/employers' className='nav-link'>
                      Employers
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink to='/inactive-employers' className='nav-link'>
                      Inactive Employers
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
          ) : (
            <Fragment></Fragment>
          )}

          {role.includes("All") || role.includes("Notes") ? (
            <li className='nav-item'>
              <a
                className='nav-link'
                data-toggle='collapse'
                href='#editors'
                aria-expanded='false'
                aria-controls='editors'>
                <i className='mdi mdi-pencil-box-outline menu-icon'></i>
                <span className='menu-title'>Notes</span>
                <i className='menu-arrow'></i>
              </a>
              <div className='collapse' id='editors'>
                <ul className='nav flex-column sub-menu'>
                  <li className='nav-item'>
                    <NavLink to='/add-notes' className='nav-link'>
                      Add Notes
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink to='/notes' className='nav-link'>
                      Notes
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
          ) : (
            <Fragment></Fragment>
          )}
          {role.includes("All") || role.includes("Webinars") ? (
            <li className='nav-item'>
              <a
                className='nav-link'
                data-toggle='collapse'
                href='#charts'
                aria-expanded='false'
                aria-controls='charts'>
                <i className='mdi mdi-chart-pie menu-icon'></i>
                <span className='menu-title'>Webinars</span>
                <i className='menu-arrow'></i>
              </a>
              <div className='collapse' id='charts'>
                <ul className='nav flex-column sub-menu'>
                  <li className='nav-item'>
                    {" "}
                    <NavLink to='/add-webinar' className='nav-link'>
                      Add Webinars
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    {" "}
                    <NavLink to='/webinars' className='nav-link'>
                      Webinar
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    {" "}
                    <NavLink to='/past-webinars' className='nav-link'>
                      Past Webinars
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
          ) : (
            <Fragment></Fragment>
          )}
          {role.includes("All") || role.includes("MockTests") ? (
            <li className='nav-item'>
              <a
                className='nav-link'
                data-toggle='collapse'
                href='#maps'
                aria-expanded='false'
                aria-controls='maps'>
                <i className='mdi mdi-map menu-icon'></i>
                <span className='menu-title'>Mock Tests</span>
                <i className='menu-arrow'></i>
              </a>
              <div className='collapse' id='maps'>
                <ul className='nav flex-column sub-menu'>
                  <li className='nav-item'>
                    {" "}
                    <a className='nav-link' href='/add-mock-test'>
                      Add Mock Test
                    </a>
                  </li>
                  <li className='nav-item'>
                    {" "}
                    <a className='nav-link' href='/active-mock-test'>
                      Active Mock Test
                    </a>
                  </li>
                  <li className='nav-item'>
                    {" "}
                    <a className='nav-link' href='/past-mock-test'>
                      Past Mock Tests
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          ) : (
            <Fragment></Fragment>
          )}
          {role.includes("All") || role.includes("Consultants") ? (
            <li className='nav-item'>
              <a
                className='nav-link'
                data-toggle='collapse'
                href='#tables'
                aria-expanded='false'
                aria-controls='tables'>
                <i className='mdi mdi-grid-large menu-icon'></i>
                <span className='menu-title'>Consultants</span>
                <i className='menu-arrow'></i>
              </a>
              <div className='collapse' id='tables'>
                <ul className='nav flex-column sub-menu'>
                  <li className='nav-item'>
                    {" "}
                    <NavLink to='/add-consultant' className='nav-link'>
                      Add Consultant
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    {" "}
                    <NavLink to='/consultants' className='nav-link'>
                      Consultants
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    {" "}
                    <NavLink to='/blocked-consultants' className='nav-link'>
                      Blocked Consultants
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
          ) : (
            <Fragment></Fragment>
          )}
          {role.includes("All") || role.includes("Subscription") ? (
            <li className='nav-item'>
              <a
                className='nav-link'
                data-toggle='collapse'
                href='#icons'
                aria-expanded='false'
                aria-controls='icons'>
                <i className='mdi mdi-emoticon menu-icon'></i>
                <span className='menu-title'>Subscription</span>
                <i className='menu-arrow'></i>
              </a>
              <div className='collapse' id='icons'>
                <ul className='nav flex-column sub-menu'>
                  <li className='nav-item'>
                    {" "}
                    <NavLink to='/subsciption-plan' className='nav-link'>
                      Subscription Plans
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    {" "}
                    <NavLink to='/transactions' className='nav-link'>
                      Transactions
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
          ) : (
            <Fragment></Fragment>
          )}
          {role.includes("All") || role.includes("Admins") ? (
            <li className='nav-item'>
              <a
                className='nav-link'
                data-toggle='collapse'
                href='#auth'
                aria-expanded='false'
                aria-controls='auth'>
                <i className='mdi mdi-account menu-icon'></i>
                <span className='menu-title'>Admins</span>
                <i className='menu-arrow'></i>
              </a>
              <div className='collapse' id='auth'>
                <ul className='nav flex-column sub-menu'>
                  <li className='nav-item'>
                    {" "}
                    <NavLink to='/add-admin' className='nav-link'>
                      {" "}
                      Add Admin
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    {" "}
                    <NavLink to='/admins' className='nav-link'>
                      Admins
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    {" "}
                    <NavLink to='/blocked-admins' className='nav-link'>
                      Blocked Admins
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
          ) : (
            <Fragment></Fragment>
          )}

          <li className='nav-item'>
            <NavLink to='/profile' className='nav-link'>
              <i className='mdi mdi-file-document-box-outline menu-icon'></i>
              <span className='menu-title'>Profile</span>
            </NavLink>
          </li>
          <li className='nav-item'>
            <a
              className='nav-link'
              onClick={() => {
                sessionStorage.removeItem("x-auth-token");
                localStorage.removeItem("x-auth-token");
                dispatch({ type: "LOGOUT" });
              }}>
              <i className='mdi mdi-file-document-box-outline menu-icon'></i>
              <span className='menu-title'>Logout</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const m = (state) => {
  return {
    state: state,
  };
};

export default Sidebar;
