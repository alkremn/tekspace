import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '@material-ui/core';
import { convertName, initials } from '../../../utils/converters';

const Header = () => {
  const { user } = useSelector(state => state.auth);
  return (
    <div className='header'>
      <h1 className='header__title'>{convertName(user.name)}</h1>
      <Avatar src={user.photoUrl}>{initials(user.name)}</Avatar>
    </div>
  );
};

export default Header;
