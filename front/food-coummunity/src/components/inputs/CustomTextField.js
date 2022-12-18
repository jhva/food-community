import { TextField } from '@mui/material';
import React from 'react';

const CustomTextField = (props) => {
  return <TextField {...props} label={props.label} />;
};

export default CustomTextField;
