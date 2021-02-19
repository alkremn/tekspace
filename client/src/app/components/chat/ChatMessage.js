import React from 'react';
import moment from 'moment';
import { Avatar } from '@material-ui/core';
import { initials } from '../../../utils/converters';
import Emoji from 'react-emoji-render';

const ChatMessage = ({ message, userId }) => {
  return (
    <div
      className={`chatMessage ${
        message.sender._id === userId ? 'chat__receiver' : ''
      }`}
    >
      <div className='chatMessage__container'>
        <Avatar
          src={message.sender.photoUrl}
          style={{ width: '35px', height: '35px' }}
        >
          {initials(message.sender.name)}
        </Avatar>
        <p className='chatMessage__message'>
          <span className='chatMessage__sender'>{message.sender.name}</span>
          <Emoji text={message.message} />
        </p>
        <span className='chatMessage__timestamp'>
          {moment(Number(message.timestamp)).startOf('second').fromNow()}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
