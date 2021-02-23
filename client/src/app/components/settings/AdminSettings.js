import React from 'react';
import { useSelector } from 'react-redux';
import { Table, Accordion, Form } from 'semantic-ui-react';
import { Avatar, Checkbox, Divider, TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { initials } from '../../../utils/converters';
import Button from '../common/Button';

const AdminSettings = () => {
  const { users } = useSelector(state => state.users);

  const handleDelete = userId => {};
  const handleEdit = userId => {};

  return (
    <div className='adminSettings'>
      <h1>Admin Settings</h1>
      <Divider />
      <h2>Add User</h2>
      <div className='addUser__container'>
        <div className='addUser__name'>
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
        <div className='addUser__email'>
          <TextField
            id='email'
            name='email'
            label='Email'
            variant='outlined'
            size='small'
          />
        </div>
        <TextField
          id='gmail'
          name='gmail'
          label='Gmail (optional)'
          variant='outlined'
          size='small'
        />
        <Button primary>Add User</Button>
      </div>
      <Divider />
      <h2>Team members</h2>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>E-mail address</Table.HeaderCell>
            <Table.HeaderCell>Tier 2</Table.HeaderCell>
            <Table.HeaderCell>Admin</Table.HeaderCell>
            <Table.HeaderCell>Remove</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map(user => (
            <Table.Row key={user._id}>
              <Table.Cell>
                <div className='adminSettings__userName'>
                  <Avatar src={user.photoUrl}>{initials(user.name)}</Avatar>
                  <span>{user.name}</span>
                </div>
              </Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>
                <Checkbox checked={user.isSecond} color='primary' />
              </Table.Cell>
              <Table.Cell>
                <Checkbox checked={user.isAdmin} />
              </Table.Cell>
              <Table.Cell>
                <IconButton onClick={() => handleDelete(user._id)}>
                  <DeleteIcon />
                </IconButton>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default AdminSettings;
