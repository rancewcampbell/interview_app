import React from 'react';
import classNames from 'classnames';
import './Button.scss';


const Button = ({children, confirm, danger, disabled, onClick}) => {
  let buttonClass = classNames({
    button: true,
    'button--confirm': confirm,
    'button--danger': danger
  });
  
  return (
  <>
    <button className={buttonClass} disabled={disabled} onClick={onClick}>{children}</button>
  </>
  );
};

export default Button;
