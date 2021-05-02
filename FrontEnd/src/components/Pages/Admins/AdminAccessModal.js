import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const AdminAccessModal = (props) => {
  return (
    <div>
      <Modal open={true} onClose={props.closeModal} center>
        <div class='col-12 grid-margin stretch-card'>
          <div class='card'>
            <div class='card-body'>
              <h6 class='card-title'>{props.name}</h6>
              {props.role.length === 0 ? (
                <p>No Role Assigned</p>
              ) : (
                props.role.map((rol) => <p class='card-description'>{rol}</p>)
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminAccessModal;
