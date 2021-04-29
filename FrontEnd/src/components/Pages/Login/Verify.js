import React from "react";

const Verify = () => {
  return (
    <div>
      <div class="container-scroller">
        <div class="container-fluid page-body-wrapper full-page-wrapper">
          <div class="content-wrapper d-flex align-items-stretch auth auth-img-bg">
            <div class="row flex-grow">
              <div class="col-lg-6 d-flex align-items-center justify-content-center">
                <div class="auth-form-transparent text-left p-3">
                  <div class="brand-logo">
                    <img src="./MPPL_logo.png" alt="logo" />
                  </div>
                  <h4>Verify OTP</h4>
                  <h6 class="font-weight-light">Please enter the OTP!</h6>
                  <form class="pt-3">
                    <div class="form-group">
                      <label for="exampleInputPassword">OTP</label>
                      <div class="input-group">
                        <div class="input-group-prepend bg-transparent">
                          <span class="input-group-text bg-transparent border-right-0">
                            <i class="mdi mdi-lock-outline text-primary"></i>
                          </span>
                        </div>
                        <input
                          type="password"
                          class="form-control form-control-lg border-left-0"
                          id="exampleInputPassword"
                          placeholder="OTP"
                        />
                      </div>
                    </div>

                    <div class="my-3">
                      <a
                        class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                        href="../../index.html"
                      >
                        SUBMIT
                      </a>
                    </div>
                  </form>
                </div>
              </div>
              <div class="col-lg-6 login-half-bg d-flex flex-row"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
