import React from 'react';
import { Avatar } from '@material-ui/core';

const ChatUser = ({ image, label, name }) => {
  return (
    <li className='chatUser'>
      <Avatar image={image} label={label} size={40} />
      <p className='chatUser__name'>{name}</p>
    </li>
  );
};

export default ChatUser;
