import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import AddJobs from "./components/Pages/Jobs/AddJobs";
import Profile from "./components/Pages/Profile/Profile";

import AddEmployer from "./components/Pages/Employer/AddEmployer";
import EditEmployer from "./components/Pages/Employer/EditEmployer";
import Employers from "./components/Pages/Employer/Employers";
import InactiveEmployers from "./components/Pages/Employer/InactiveEmployers";

import AddCandidates from "./components/Pages/Candidates/AddCandidates";
import Candidates from "./components/Pages/Candidates/Candidates";
import BlockedCandidates from "./components/Pages/Candidates/BlockedCandidates";
import EditCandidate from "./components/Pages/Candidates/EditCandidate";

import AddAdmin from "./components/Pages/Admins/AddAdmin";
import Admins from "./components/Pages/Admins/Admins";
import BlockedAdmins from "./components/Pages/Admins/BlockedAdmins";
import EditAdmin from "./components/Pages/Admins/EditAdmin";

import AddNotes from "./components/Pages/Notes/AddNotes";
import EditNotes from "./components/Pages/Notes/EditNotes";
import Notes from "./components/Pages/Notes/Notes";

import Consultants from "./components/Pages/Consultants/Consultants";
import AddConsultant from "./components/Pages/Consultants/AddConsultant";
import BlockedConsultants from "./components/Pages/Consultants/BlockedConsultants";
import EditConsultant from "./components/Pages/Consultants/EditConsultant";

import AddWebinar from "./components/Pages/Webinars/AddWebinar";
import EditWebinars from "./components/Pages/Webinars/EditWebinars";
import PastWebinars from "./components/Pages/Webinars/PastWebinars";
import Webinars from "./components/Pages/Webinars/Webinars";

import Login from "./containers/Login/login";
import ForgotPassword from "./components/Pages/Login/ForgotPassword";
import Verify from "./components/Pages/Login/Verify";
import Categories from "./components/Pages/Jobs/Categories";
import EditJob from "./components/Pages/Jobs/EditJob";
import InactiveJobs from "./components/Pages/Jobs/InactiveJobs";
import OldJobs from "./components/Pages/Jobs/InactiveJobs";
import PendingJobs from "./components/Pages/Jobs/PendingJobs";
import PostedJobs from "./components/Pages/Jobs/PostedJobs";

import NoMatchPage from "./components/Pages/etc/NoMatchPage";

class App extends Component {
  render() {
    var role = this.props.state.role;
    return (
      <Router>
        <div>
          <div className='sidebar-light'>
            <div className='container-scroller'>
              <Navbar />
              <div className='container-fluid page-body-wrapper'>
                <Sidebar />
                <Route exact path='/' component={Dashboard}></Route>
                <Route
                  path='/forgot-password'
                  component={ForgotPassword}></Route>
                <Route path='/verify' component={Verify}></Route>
                {/* <Route path='/home' component={index}></Route> */}
                {role.includes("All") || role.includes("Jobs") ? (
                  <Fragment>
                    <Route path='/add-jobs' component={AddJobs}></Route>
                    <Route path='/pending-jobs' component={PendingJobs}></Route>
                    <Route path='/posted-jobs' component={PostedJobs}></Route>
                    <Route path='/old-jobs' component={OldJobs}></Route>
                    <Route path='/edit-jobs' component={EditJob}></Route>
                    <Route path='/categories' component={Categories}></Route>
                  </Fragment>
                ) : (
                  <Fragment></Fragment>
                )}

                {/* Candidates*/}
                {role.includes("All") || role.includes("Candidates") ? (
                  <Fragment>
                    <Route
                      path='/add-candidates'
                      component={AddCandidates}></Route>
                    <Route path='/candidates' component={Candidates}></Route>
                    <Route
                      path='/edit-candidate'
                      component={EditCandidate}></Route>
                    <Route
                      path='/blocked-candidates'
                      component={BlockedCandidates}></Route>
                  </Fragment>
                ) : (
                  <Fragment></Fragment>
                )}

                {/* Employers*/}
                {role.includes("All") || role.includes("Employers") ? (
                  <Fragment>
                    <Route path='/add-employer' component={AddEmployer}></Route>
                    <Route path='/employers' component={Employers}></Route>
                    <Route
                      path='/edit-employer'
                      component={EditEmployer}></Route>
                    <Route
                      path='/inactive-employers'
                      component={InactiveEmployers}></Route>
                  </Fragment>
                ) : (
                  <Fragment></Fragment>
                )}

                {/* Admins*/}
                {role.includes("All") || role.includes("Admins") ? (
                  <Fragment>
                    <Route path='/add-admin' component={AddAdmin}></Route>
                    <Route path='/admins' component={Admins}></Route>
                    <Route path='/edit-admin' component={EditAdmin}></Route>
                    <Route
                      path='/blocked-admins'
                      component={BlockedAdmins}></Route>
                  </Fragment>
                ) : (
                  <Fragment></Fragment>
                )}

                {/* Notes*/}
                {role.includes("All") || role.includes("Notes") ? (
                  <Fragment>
                    <Route path='/add-notes' component={AddNotes}></Route>
                    <Route path='/edit-notes' component={EditNotes}></Route>
                    <Route path='/notes' component={Notes}></Route>
                  </Fragment>
                ) : (
                  <Fragment></Fragment>
                )}

                {/* Webinars*/}
                {role.includes("All") || role.includes("Webinars") ? (
                  <Fragment>
                    <Route path='/add-webinar' component={AddWebinar}></Route>
                    <Route path='/webinars' component={Webinars}></Route>
                    <Route
                      path='/edit-webinar'
                      component={EditWebinars}></Route>
                    <Route
                      path='/past-webinars'
                      component={PastWebinars}></Route>
                  </Fragment>
                ) : (
                  <Fragment></Fragment>
                )}

                {role.includes("All") || role.includes("Consultants") ? (
                  <Fragment>
                    <Route
                      path='/add-consultant'
                      component={AddConsultant}></Route>
                    <Route path='/consultants' component={Consultants}></Route>
                    <Route
                      path='/edit-consultant'
                      component={EditConsultant}></Route>
                    <Route
                      path='/blocked-consultants'
                      component={BlockedConsultants}></Route>
                  </Fragment>
                ) : (
                  <Fragment></Fragment>
                )}

                {/* Mocktests
            {role.includes("All") || role.includes("MockTests") ? (
              <> 
                <Route path='/add-mock-test' component={AddMockTest}></Route>
                <Route
                  path='/active-mock-test'
                  component={ActiveMockTest}></Route>
                <Route path='/edit-mock-test' component={EditMockTest}></Route>
                <Route path='/past-mock-test' component={PastMockTest}></Route>
                {/* </>
            ) : (
              <></>
            )} */}
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

const m = (state) => {
  return {
    state: state,
  };
};

export default connect(m)(App);
