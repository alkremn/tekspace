import React from 'react';
import { NavLink } from 'react-router-dom';

const Link = ({ Icon, title, to, setTitle }) => {
  return (
    <NavLink
      to={to}
      onClick={() => setTitle(title)}
      className='navbar__link'
      activeClassName='active-link'
    >
      <Icon className='navbar__link-icon' />
      <span>{title}</span>
    </NavLink>
  );
};

export default Link;
