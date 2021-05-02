import React, { useState } from "react";
import { Fragment } from "react";

import classes from "./Admin.module.css";

const AdminInput = (props) => {
  const [input, setInput] = useState(props.checked);
  const [inputObj, setInputObj] = useState({
    type: "checkbox",
    name: props.label.toLowerCase(),
    id: props.label.toLowerCase(),
    defaultChecked: input,
  });

  return (
    <Fragment>
      <input
        {...inputObj}
        onClick={() => {
          props.onClick();
          if (!input) {
            setInput(true);
            setInputObj((prevState) => {
              return { ...prevState, defaultChecked: true };
            });
          } else {
            setInput(false);
            setInputObj((prevState) => {
              return { ...prevState, defaultChecked: false };
            });
          }
        }}
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
