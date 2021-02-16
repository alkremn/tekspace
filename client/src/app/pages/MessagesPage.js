import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage, fetchMessages } from '../../actions/messageActions';
import ChatMessage from '../components/chat/ChatMessage';
import ChatUser from '../components/chat/ChatUser';
import InputEmoji from 'react-input-emoji';
import { RiSendPlaneFill } from 'react-icons/ri';
import socket from '../../utils/socket';

const MessagesPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { users } = useSelector(state => state.users);
  const { messages } = useSelector(state => state.messages);
  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    dispatch(fetchMessages());
    scrollToBottom();
    socket.on('newMessage', async newMessage => {
      dispatch(addMessage(newMessage));
    });

    return () => socket.disconnect();
  }, [dispatch]);

  const onEnterHandler = e => {
    if (message.length > 0) {
      if (e.keyCode === 13 || e.type === 'click') {
        const newMessage = {
          sender: user._id,
          message: message,
          timestamp: Date.now(),
        };
        socket.emit('message', newMessage);
        setMessage('');
      }
    }
  };

  return (
    <div className='messagesPage'>
      <div className='chat'>
        <div className='chat__messages'>
          {messages?.map(message => (
            <ChatMessage
              key={message._id}
              userId={user._id}
              message={message}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className='chat__form'>
          <div className='chat__form-left'>
            <textarea
              onKeyDown={onEnterHandler}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder='Type a message'
            />
          </div>
          <button className='chat__form-button' onClick={onEnterHandler}>
            <RiSendPlaneFill className='chat__form-icon' />
          </button>
        </div>
      </div>
      <div className='chatMembers'>
        <h1 className='chatMembers__title'>Members</h1>
        <ul className='chatMembers__list'>
          {users &&
            users.map(user => (
              <ChatUser
                key={user._id}
                online
                image={user.photoUrl}
                label={user.initials}
                name={user.name}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default MessagesPage;
