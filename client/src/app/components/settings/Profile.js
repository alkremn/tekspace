import React from 'react';
import { Avatar, TextField } from '@material-ui/core';

const Profile = ({ user }) => {
  return (
    <div className='profile'>
      <div className='profile__content'>
        <h1>Profile</h1>
        <Avatar className='profile__avatar' src={user.photoUrl} />
        <div className='profile__name'>
          <TextField
            id='firstName'
            name='firstName'
            label='First Name'
            variant='outlined'
            size='small'
          />
          <TextField
            id='lastName'
            name='lastName'
            label='Last Name'
            variant='outlined'
            size='small'
          />
        </div>
        <TextField
          id='email'
          name='email'
          label='Email'
          variant='outlined'
          type='email'
          size='small'
        />
        <TextField
          id='gmail'
          name='gmail'
          label='Google email (optional)'
          variant='outlined'
          type='email'
          size='small'
        />
      </div>
    </div>
  );
};

export default Profile;
