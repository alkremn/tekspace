import React from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const MenuOption = ({ Icon, title, active, onClick }) => {
  return (
    <button
      className={`menuOption ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      <Icon className='menuOption__icon editIcon' />
      <span className='menuOption__title'>{title}</span>
      {active && <ArrowForwardIosIcon className='menuOption__arrow' />}
    </button>
  );
};

export default MenuOption;
