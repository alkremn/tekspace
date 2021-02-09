import React from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const MenuOption = ({ Icon, title, active }) => {
  return (
    <div className='menuOption'>
      <Icon className='menuOption__icon' />
      <span className='menuOption__title'>{title}</span>
      <ArrowForwardIosIcon />
    </div>
  );
};

export default MenuOption;
