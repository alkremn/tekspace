import React, { useState } from 'react';
import { Avatar, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Modal } from 'semantic-ui-react';
import Alert from '@material-ui/lab/Alert';
import AvatarCropper from './AvatarCropper';

const Profile = ({ user }) => {
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <div className='profile'>
      <div className='profile__content'>
        <h1>{editMode && 'Edit'} Profile</h1>
        <Alert severity='success'>Updates have been saved successfully!</Alert>
        <div className='avatar__container'>
          <Avatar className='profile__avatar' src={user.photoUrl} />
          <button className='avatar__pencilDiv' onClick={() => setOpen(true)}>
            <EditIcon className='avatar__pencil' />
          </button>
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
      <Modal size='small' open={open} onClose={() => setOpen(false)}>
        <Modal.Header>Edit Avatar</Modal.Header>
        <Modal.Content>
          <AvatarCropper photoUrl={user.photoUrl} />
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default Profile;
