import React from 'react';
import { io } from 'socket.io-client';

const Test = () => {
  const socket = io.connect('http://localhost:3005');

  return <div>test</div>;
};

export default Test;
