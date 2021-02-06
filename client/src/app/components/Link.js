import React from 'react';
import { NavLink } from 'react-router-dom';

const Link = ({ Icon, title, to }) => {
  return (
    <NavLink to={to} className='navbar__link' activeClassName='active'>
      <Icon className='navbar__link-icon' />
      {/* <span>{title}</span> */}
    </NavLink>
  );
};

export default Link;
