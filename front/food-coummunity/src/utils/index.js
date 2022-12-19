const { createGlobalStyle } = require('styled-components');

const GlobalStyle = createGlobalStyle`
body {
    font-family: 'Noto Sans', sans-serif;
    padding:0;
    margin:0;
    background:#F4F6F8;
  }
  div, p, span, h1 {
    margin: 0;
    box-sizing: border-box;
    color: #474749;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  button , input{
    outline: none;
    border:none;
  }
  button{
    cursor: pointer;
  }
  input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button { 
	-webkit-appearance: none;
} 
`;


const PhoneNumberConvert = (number) => {
  console.log(number);
  return number
    ?.toString()
    ?.replace(/\D+/g, '')
    ?.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
};

export { GlobalStyle, PhoneNumberConvert };
