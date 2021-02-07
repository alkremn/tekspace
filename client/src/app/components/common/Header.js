import React from 'react';
import { Avatar } from '@material-ui/core';

const Header = () => {
  return (
    <div className='header'>
      <h1 className='header__title'>Alexey K.</h1>
      <Avatar src='https://avatars.githubusercontent.com/u/15260156?s=460&u=315a29ed6f1c17b22c7d96f929d2c878e4ea7bfc&v=4'>
        AK
      </Avatar>
    </div>
  );
};

export default Header;
