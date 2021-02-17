import React, { useState } from 'react';
import { Avatar, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const Profile = ({ user }) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <div className='profile'>
      <div className='profile__content'>
        <h1>{editMode && 'Edit'} Profile</h1>
        <div className='avatar__container'>
          <Avatar className='profile__avatar' src={user.photoUrl} />
          <div className='avatar__pencilDiv'>
            <EditIcon className='avatar__pencil' />
          </div>
        </div>

        <div className='profile_name'>
          {editMode ? (
            <>
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
            </>
          ) : (
            <p>{user.name}</p>
          )}
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
