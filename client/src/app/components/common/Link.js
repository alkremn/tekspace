import React from 'react';
import { Tooltip } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const Link = ({ Icon, title, to }) => {
  return (
    <Tooltip title={title} placement='right-end'>
      <NavLink to={to} className='navbar__link' activeClassName='active'>
        <Icon className='navbar__link-icon' />
      </NavLink>
    </Tooltip>
  );
};

export default Link;
