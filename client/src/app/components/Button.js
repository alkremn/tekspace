import React from 'react';

const Button = ({
  className,
  color,
  children,
  primary,
  onClick,
  disabled,
  width,
  height,
}) => {
  return (
    <button
      className={`button ${className} ${primary ? 'primary' : ''}`}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: `${width}px`,
        height: `${height ?? height}px`,
        backgroundColor: color,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
