import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';

import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = (props) => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        onKeyPress={props.onKeyPress}
        value={props.value}
        onChange={props.onChange}
        placeholder='장소를 검색하세요'
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
};

export default SearchInput;

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  //   color: 'inherit',
  backgroundColor: alpha(theme.palette.common.black, 0.3),

  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '14ch',
      '&:focus': {
        width: '25ch',
      },
    },
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'absolute',
  zIndex: '1000',
  borderRadius: theme.shape.borderRadius,
  margin: '10px 0px',
  backgroundColor: alpha(theme.palette.common.black, 0.3),

  //   backgroundColor: alpha(theme.palette.common.white, 0.135),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.7),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
