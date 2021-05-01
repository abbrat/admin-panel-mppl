import React, { useState } from "react";
import { Fragment } from "react";

import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";

import classes from "./InputArray.module.css";

const InputArray = (props) => {
  return (
    <Fragment>
      <div className={classes.block}>
        <p className={classes["block__para"]}>{props.text}</p>
        <IconButton
          aria-label='delete'
          className={classes["block__button"]}
          onClick={() => {
            props.onDelete(props.text);
          }}>
          <DeleteIcon fontSize='small' />
        </IconButton>
      </div>
    </Fragment>
  );
};

export default InputArray;
