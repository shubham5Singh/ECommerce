import React from 'react';
export const Input = (props) =>{
  return (
    <input 
    className={props.className} 
    type={props.type} 
    placeholder={props.placeholder} 
    onChange={props.change} 
    id={props.id}
    defaultValue={props.defaultValue}
    disabled={props.disable}
    />
  );
}