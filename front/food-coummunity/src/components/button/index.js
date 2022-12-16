import Button from '@mui/material/Button';
import React, { useMemo } from 'react';

export const BasicButton = (props) => {
  const ButtonStyle = useMemo(
    () => ({
      width: '100%',
      height: '30px',
    }),
    []
  );
  return (
    <Button onClick={props.onClick} style={ButtonStyle} variant='outlined'>
      {props.text}
    </Button>
  );
};
