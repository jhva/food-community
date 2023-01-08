import Button from '@mui/material/Button';
import React, { useMemo } from 'react';
import { MdCancel } from 'react-icons/md';
import { BiArrowBack } from 'react-icons/bi';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { BiTrash } from 'react-icons/bi';
export const BasicButton = (props) => {
  const ButtonStyle = useMemo(
    () => ({
      width: '100%',
      height: '60px',
    }),
    []
  );
  return (
    <Button
      {...props}
      onClick={props.onClick}
      style={ButtonStyle}
      variant='outlined'
    >
      {props.text}
    </Button>
  );
};

export const CustomBiTrash = (props) => {
  const CUSTOMBACK = useMemo(
    () => ({
      width: '20px',
      height: '20px',
      cursor: 'pointer',
    }),
    []
  );

  return <BiTrash onClick={props.onClick} style={CUSTOMBACK} />;
};

export const CustomMdOutlineArrowBackIosNew = (props) => {
  const CUSTOMBACK = useMemo(
    () => ({
      width: '20px',
      height: '20px',
      cursor: 'pointer',
    }),
    []
  );

  return (
    <MdOutlineArrowBackIosNew onClick={props.onClick} style={CUSTOMBACK} />
  );
};

export const CustomCancelMdCancel = (props) => {
  const CustomCancel = useMemo(
    () => ({
      width: '20px',
      height: '30px',
      cursor: 'pointer',
    }),
    []
  );
  return <MdCancel onClick={props.onClick} style={CustomCancel} />;
};

export const CustomBackBiArrow = (props) => {
  const CustomBack = useMemo(
    () => ({
      width: '20px',
      height: '30px',
      cursor: 'pointer',
    }),
    []
  );
  return (
    <BiArrowBack onClick={props.onClick} style={CustomBack}>
      뒤로가기
    </BiArrowBack>
  );
};
