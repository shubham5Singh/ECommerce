import React from 'react';
export const Button = (props) =>{
  return (
    <button type='button' className="primary button small" onClick={props.click}>{props.name}</button>
  );
}