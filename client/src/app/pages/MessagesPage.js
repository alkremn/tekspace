import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages } from '../../actions/messagesActions';
import ChatMessage from '../components/chat/ChatMessage';
import ChatUser from '../components/chat/ChatUser';
import InputEmoji from 'react-input-emoji';
import { users } from '../../data/users';
import { RiSendPlaneFill } from 'react-icons/ri';
import socket from '../../utils/socket';

const MessagesPage = () => {
  const { user } = useSelector(state => state.auth);
  const { messages } = useSelector(state => state.messages);
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState(messages);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchMessages());
    };
    fetchData();
  }, [dispatch]);

  socket.on('newMessage', newMessage => {
    setAllMessages([...allMessages, newMessage]);
  });

  const onEnterHandler = () => {
    const newMessage = {
      senderId: user._id,
      message: message,
    };
    socket.emit('message', newMessage);
  };

  return (
    <div className='messagesPage'>
      <div className='chat'>
        <div className='chat__messages'>
          {allMessages?.map(message => (
            <ChatMessage key={message._id} message={message} />
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
                  name={user.name}
                />
              ))}
        </ul>
      </div>
    </div>
  );
};

export default MessagesPage;
