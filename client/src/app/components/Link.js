import React from 'react';
import { NavLink } from 'react-router-dom';

const Link = ({ Icon, title, to, onClick }) => {
  return (
    <NavLink
      to={to}
      className='navbar__link'
      activeClassName='active'
      onClick={onClick}
    >
      <Icon className='navbar__link-icon' />
      <span>{title}</span>
    </NavLink>
  );
};

export default Link;
