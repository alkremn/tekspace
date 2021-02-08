import React from 'react';
import Emoji from 'react-emoji-render';
import moment from 'moment';

const ChatMessage = ({ message }) => {
  const userId = '2342345';
  return (
    <p
      className={`chatMessage ${
        message.senderId === userId ? 'chat__receiver' : ''
      }`}
    >
      <span className='chatMessage__sender'>{message.name}</span>
      <Emoji className='chatMessage__message' text={message.message} />
      <span className='chatMessage__timestamp'>
        {moment(Number(message.timestamp)).startOf('second').fromNow()}
      </span>
    </p>
  );
};

export default ChatMessage;
