import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addMessageAction,
  fetchMessagesAction,
} from '../../actions/messageActions';
import ChatMessage from '../components/chat/ChatMessage';
import ChatUser from '../components/chat/ChatUser';
import Picker from 'emoji-picker-react';
import { RiSendPlaneFill } from 'react-icons/ri';
import socket from '../../utils/socket';

const MessagesPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { users, activeUsers } = useSelector(state => state.users);
  const { messages } = useSelector(state => state.messages);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    dispatch(fetchMessagesAction());
    scrollToBottom();
    socket.on('newMessage', async newMessage => {
      console.log(newMessage);
      dispatch(addMessageAction(newMessage));
    });
    return () => socket.off('newMessage');
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

  const onEmojiClick = (event, emojiObject) => {
    setMessage(message + emojiObject.emoji);
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
          {/* <Picker onEmojiClick={onEmojiClick} /> */}
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
                online={activeUsers.indexOf(user._id) < 0 ? false : true}
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
