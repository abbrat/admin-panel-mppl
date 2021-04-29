import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { updateNotesById } from "../../../actions/adminActions";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import makeToast from "../../../Toaster";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import DocViewer, { PDFRenderer, PNGRenderer } from "react-doc-viewer";

const EditNotes = (props) => {
  const history = useHistory();
  const [saved, setSaved] = useState();
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")));
  const [docs, setDocs] = useState([{ uri: notes.file }]);

  // useEffect(() => {
  //   setNotes(JSON.parse(localStorage.getItem("notes")));
  // });
  const [edit, setEdit] = useState(false);
  const [fileName, setFileName] = useState(notes.fileName || "");
  const [fileAuthor, setFileAuthor] = useState(notes.fileAuthor || "");
  const [file, setFile] = useState(null);

  const uploadFile = (e) => {
    if (e.target.files[0] == null) {
      console.log("Notes File error");
    } else {
      setFile(e.target.files[0]);
    }
  };

  const dataSubmit = async () => {
    const formData = new FormData();
    formData.append("fileName", fileName);
    formData.append("fileAuthor", fileAuthor);
    formData.append("file", file);

    setSaved(await updateNotesById(formData, notes._id));
    if (saved) {
      history.goBack();
    } else {
      history.goBack();
    }
  };

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

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
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            padding: "10px",
                          }}>
                          <div>
                            <h4 class='card-title'>EDIT NOTES</h4>
                          </div>
                          <div>
                            <button
                              type='submit'
                              class='btn btn-primary mr-2'
                              style={{ padding: "10px" }}
                              onClick={() => {
                                if (!edit) {
                                  setEdit(true);
                                } else {
                                  setEdit(false);
                                }
                              }}>
                              {!edit ? "Edit" : "Cancel"}
                            </button>
                            <button
                              type='submit'
                              class='btn btn-primary mr-2'
                              style={{ padding: "10px" }}
                              onClick={onOpenModal}>
                              Preview
                            </button>
                          </div>
                        </div>
                        <form class='form-sample'>
                          <div class='row'>
                            <div class='col-md-6'>
                              <div class='form-group row'>
                                <label class='col-sm-3 col-form-label'>
                                  Title
                                </label>
                                <div class='col-sm-9'>
                                  <input
                                    type='text'
                                    class='form-control'
                                    value={fileName}
                                    onChange={(e) => {
                                      setFileName(e.target.value);
                                    }}
                                    disabled={!edit}
                                  />
                                </div>
                              </div>
                            </div>
                            <div class='col-md-6'>
                              <div class='form-group row'>
                                <label class='col-sm-3 col-form-label'>
                                  Author
                                </label>
                                <div class='col-sm-9'>
                                  <input
                                    type='text'
                                    class='form-control'
                                    value={fileAuthor}
                                    onChange={(e) => {
                                      setFileAuthor(e.target.value);
                                    }}
                                    disabled={!edit}
                                  />
                                </div>
                              </div>
                            </div>
                            <div class='col-md-6'>
                              <div class='form-group row'>
                                <label class='col-sm-3 col-form-label'>
                                  File
                                </label>
                                <div class='col-sm-9 grid-margin stretch-card'>
                                  <div class='card' style={{ width: "20px" }}>
                                    <div class='card-body'>
                                      <h4 class='card-title'>
                                        Drop Files Here
                                      </h4>
                                      <input
                                        style={{ width: "290px" }}
                                        type='file'
                                        onChange={(e) => {
                                          uploadFile(e);
                                        }}
                                        disabled={!edit}
                                        // action="https://www.bootstrapdash.com/file-upload"
                                        class='dropzone'
                                        id='my-awesome-dropzone'></input>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <button
                            type='button'
                            onClick={() => {
                              dataSubmit();
                            }}
                            class='btn btn-primary mr-2'>
                            {!edit ? "Submit" : "Save"}
                          </button>
                          <button class='btn btn-light'>Cancel</button>
                        </form>
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
      <Modal open={open} onClose={onCloseModal} center>
        <DocViewer
          style={{ height: 400, width: 400 }}
          pluginRenderers={[PDFRenderer, PNGRenderer]}
          documents={docs}></DocViewer>
      </Modal>
    </div>
  );
};

export default connect(null, {
  // updateNotesById,
})(EditNotes);
