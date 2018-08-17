import React from 'react';
export const Button = (props) =>{
  return (
    <button type='button' className={props.class} onClick={props.click}>{props.name}</button>
  );
}