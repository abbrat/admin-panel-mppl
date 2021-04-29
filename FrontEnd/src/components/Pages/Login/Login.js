import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import makeToast from "../../Toaster";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      history.push("/Home");
    }
  });

  const loginAdmin = async (formData) => {
    console.log(formData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        formData,
        config
      );
      if (
        res.data.msg == "Invalid Credentials!" ||
        res.data.msg == "Admin Doesnt Exists!"
      ) {
        makeToast("error", res.data.msg);
      }
      if (res.data.token) {
        makeToast("success", "Success");
        localStorage.setItem("token", res.data.token);
        history.push("/Home");
      }
    } catch (error) {
      console.log(error.message);
      makeToast("error", error.message);
    }
  };
  return (
    <div>
      <div class='container-scroller'>
        <div class='container-fluid page-body-wrapper full-page-wrapper'>
          <div class='content-wrapper d-flex align-items-stretch auth auth-img-bg'>
            <div class='row flex-grow'>
              <div class='col-lg-6 d-flex align-items-center justify-content-center'>
                <div class='auth-form-transparent text-left p-3'>
                  <div class='brand-logo'>
                    <img src='./MPPL_logo.png' alt='logo' />
                  </div>
                  <h4>Welcome back!</h4>
                  <h6 class='font-weight-light'>Happy to see you again!</h6>
                  <form class='pt-3'>
                    <div class='form-group'>
                      <label for='exampleInputEmail'>Email</label>
                      <div class='input-group'>
                        <div class='input-group-prepend bg-transparent'>
                          <span class='input-group-text bg-transparent border-right-0'>
                            <i class='mdi mdi-account-outline text-primary'></i>
                          </span>
                        </div>
                        <input
                          type='text'
                          class='form-control form-control-lg border-left-0'
                          id='exampleInputEmail'
                          placeholder='Email'
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div class='form-group'>
                      <label for='exampleInputPassword'>Password</label>
                      <div class='input-group'>
                        <div class='input-group-prepend bg-transparent'>
                          <span class='input-group-text bg-transparent border-right-0'>
                            <i class='mdi mdi-lock-outline text-primary'></i>
                          </span>
                        </div>
                        <input
                          type='password'
                          class='form-control form-control-lg border-left-0'
                          id='exampleInputPassword'
                          placeholder='Password'
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div class='my-2 d-flex justify-content-between align-items-center'>
                      <div class='form-check'>
                        <label class='form-check-label text-muted'>
                          <input type='checkbox' class='form-check-input' />
                          Keep me signed in
                        </label>
                      </div>
                      <a href='/forgot-password' class='auth-link text-black'>
                        Forgot password?
                      </a>
                    </div>
                    <div class='my-3'>
                      <button
                        class='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn'
                        type='button'
                        onClick={() => {
                          loginAdmin({ email, password });
                        }}>
                        LOGIN
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div class='col-lg-6 login-half-bg d-flex flex-row'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
