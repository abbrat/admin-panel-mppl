import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { createNotes } from "../../../actions/adminActions";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import makeToast from "../../../Toaster";
// import Preview from "../../Preview/Preview";

const AddNotes = (props) => {
  const history = useHistory();
  const [src, SetSrc] = useState();
  const [open, SetOpen] = useState(false);
  const [saved, setSaved] = useState();
  const [fileName, setFileName] = useState("");
  const [fileAuthor, setFileAuthor] = useState("");
  const [file, setFile] = useState(null);

  const dataSubmit = async () => {
    if (!file || fileName === "" || fileAuthor === "") {
      return makeToast("error", "Please add all the fields");
    }

    const formData = new FormData();
    formData.append("fileName", fileName);
    formData.append("fileAuthor", fileAuthor);
    formData.append("file", file);

    setSaved(await createNotes(formData));
    if (saved) {
      history.push("/notes");
    } else {
      history.push("/notes");
    }
  };

  const preview = (event) => {
    console.log(event.target.files[0]);
    SetSrc(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
    SetOpen(true);
  };

  return (
    <div>
      <div className='container-fluid page-body-wrapper'>
        <div className='main-panel'>
          <div className='content-wrapper'>
            <div className='row'>
              <div className='col-12 grid-margin'>
                <div className='card'>
                  <div className='card-body'>
                    <h4 className='card-title'>ADD NOTES</h4>
                    <form className='form-sample' encType='multipart/form-data'>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='form-group row'>
                            <label className='col-sm-3 col-form-label'>
                              Title
                            </label>
                            <div className='col-sm-9'>
                              <input
                                type='text'
                                className='form-control'
                                value={fileName}
                                onChange={(e) => {
                                  setFileName(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className='col-md-6'>
                          <div className='form-group row'>
                            <label className='col-sm-3 col-form-label'>
                              Author
                            </label>
                            <div className='col-sm-9'>
                              <input
                                type='text'
                                className='form-control'
                                value={fileAuthor}
                                onChange={(e) => {
                                  setFileAuthor(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className='col-md-6'>
                          <div className='form-group' id='upload'>
                            <label
                              className='col-sm-3 col-form-label'
                              id='file'>
                              File
                            </label>
                            <div className='input-group  '>
                              <div>
                                <input
                                  type='file'
                                  id='file'
                                  onChange={(e) => {
                                    preview(e);
                                  }}
                                />
                              </div>

                              <span className='input-group-append'></span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        type='button'
                        onClick={() => {
                          dataSubmit();
                        }}
                        className='btn btn-primary mr-2'>
                        Submit
                      </button>
                      <button className='btn btn-light'>Cancel</button>
                    </form>
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
          <footer className='footer'>
            <div className='d-sm-flex justify-content-center justify-content-sm-between'>
              <span className='text-muted text-center text-sm-left d-block d-sm-inline-block'>
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
  );
};

export default connect(null, {
  createNotes,
})(AddNotes);
