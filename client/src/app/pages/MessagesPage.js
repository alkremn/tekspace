import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
import { messages } from '../../data/messages';
import ChatMessage from '../components/chat/ChatMessage';
import ChatUser from '../components/chat/ChatUser';
import InputEmoji from 'react-input-emoji';
import { users } from '../../data/users';
import { RiSendPlaneFill } from 'react-icons/ri';
// import io from 'socket.io-client';

function createName(user) {
  const { firstName, lastName } = user;
  return `${firstName} ${lastName}`;
}

const MessagesPage = () => {
  // const { user } = useSelector(state => state.auth);
  const [message, setMessage] = useState('');
  // const { users } = useSelector(state => state.users);
  // const socket = io('http://localhost:5000', {
  //   'force new connection': false,
  //   auth: {
  //     token: user.token,
  //   },
  // });

  const onEnterHandler = () => {
    messages.push({
      id: '4',
      senderId: '23423234',
      name: 'Ben Gold',
      message: message,
      timestamp: Date.now(),
      recieved: true,
    });
  };

  return (
    <div className='messagesPage'>
      <div className='chat'>
        <div className='chat__messages'>
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
        <div className='chat__form'>
          <InputEmoji
            value={message}
            onChange={setMessage}
            cleanOnEnter
            onEnter={onEnterHandler}
            placeholder='Type a message'
          />
          <button className='chat__form-button'>
            <RiSendPlaneFill className='chat__form-icon' />
          </button>
        </div>
      </div>
      <div className='chatMembers'>
        <h1 className='chatMembers__title'>Members</h1>
        <ul className='chatMembers__list'>
          {users &&
            users
              .sort((a, b) => (b.lastName < a.lastName ? 1 : -1))
              .map(user => (
                <ChatUser
                  key={user._id}
                  image={user.photoUrl}
                  label={user.initials}
                  name={createName(user)}
                />
              ))}
        </ul>
      </div>
    </div>
  );
};

export default MessagesPage;
