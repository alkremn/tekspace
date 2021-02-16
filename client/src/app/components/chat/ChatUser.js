import React from 'react';
import { Avatar } from '@material-ui/core';
import { initials } from '../../../utils/converters';

const ChatUser = ({ image, label, name, online }) => {
  return (
    <li className='chatUser'>
      <Avatar src={image} label={label} size={40}>
        {initials(name)}
      </Avatar>
      {online && <span className='chartUser__online'>Online</span>}
      <p className='chatUser__name'>{name}</p>
    </li>
  );
};

export default ChatUser;
