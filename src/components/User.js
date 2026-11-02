import React, { useState, useEffect } from 'react';

//Functional Components
export const User = ({ name }) => {
  const [count] = useState(0);
  const [count2] = useState(2);

  useEffect(() => {
    //API Calls
  }, []);

  //async userFn

  return (
    <div className="user-card">
      <h1>Count = {count}</h1>
      <h2>{name}</h2>
      <h3>Location : BBSR</h3>
      <h4>Contact: @aparupkumargiri1503</h4>
    </div>
  );
};
