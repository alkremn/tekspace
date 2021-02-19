import React from 'react';
import { Loader } from 'semantic-ui-react';

const Button = ({
  className,
  color,
  children,
  type,
  primary,
  onClick,
  disabled,
  width,
  loading,
  height,
}) => {
  return (
    <button
      className={`button ${className} ${primary ? 'primary' : ''}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={{
        width: `${width}px`,
        height: `${height ?? height}px`,
        backgroundColor: color,
      }}
    >
      {loading ? (
        <Loader className='button__loader' active={loading} inverted />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
