import React from 'react';
import { TextField } from '@material-ui/core';

const AddUser = () => {
  return (
    <div className='addUser'>
      <div className='addUser__content'>
        <h1>Add User</h1>
        <div className='profile_name'>
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

export default AddUser;
