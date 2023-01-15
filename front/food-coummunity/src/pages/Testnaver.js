import React from 'react';
import { useLocation } from 'react-router-dom';

const TestNaver = () => {
  let params = new URL(document.URL).searchParams;
  let code = params.get('access_token');
  const location = useLocation();
  console.log(location);

  console.log(params);
  return <div>1</div>;
};

export default TestNaver;
