import React from "react";
import { Fragment } from "react";

import classes from "./Admin.module.css";

const AdminInput = (props) => {
  return (
    <Fragment>
      <input
        type='checkbox'
        name={props.label.toLowerCase()}
        id={props.label.toLowerCase()}
        onClick={props.onClick}
      />
      <label
        className={classes["access__label"]}
        htmlFor={props.label.toLowerCase()}>
        {props.label}
      </label>
    </Fragment>
  );
};

export default AdminInput;
