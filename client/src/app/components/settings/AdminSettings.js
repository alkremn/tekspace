import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Modal } from 'semantic-ui-react';
import { Avatar, Checkbox, Divider } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { initials } from '../../../utils/converters';
import AddUser from './AddUser';
import Button from '../common/Button';

const AdminSettings = () => {
  const { users } = useSelector(state => state.users);
  const { user } = useSelector(state => state.auth);
  const [selectedUserId, setSelectedUserId] = useState(undefined);
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    if (selectedUserId) {
      console.log(selectedUserId);
    }
  };

  const handleChange = (event, userId) => {
    const foundUser = users.find(user => user._id === userId);
    console.log(event.target.name, foundUser);
    // setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div className='adminSettings'>
      <h1>Admin Settings</h1>
      <Divider />
      <AddUser />
      <Divider />
      <h2>Team members</h2>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email address</Table.HeaderCell>
            <Table.HeaderCell>Gmail account</Table.HeaderCell>
            <Table.HeaderCell>Tier 2</Table.HeaderCell>
            <Table.HeaderCell>Admin</Table.HeaderCell>
            <Table.HeaderCell>Remove</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users
            .filter(u => u._id !== user._id)
            .map(user => (
              <Table.Row key={user._id}>
                <Table.Cell>
                  <div className='adminSettings__userName'>
                    <Avatar
                      src={user.photoUrl}
                      style={{ width: '30px', height: '30px' }}
                    >
                      {initials(user.name)}
                    </Avatar>
                    <span>{user.name}</span>
                  </div>
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.gmail}</Table.Cell>
                <Table.Cell>
                  <Checkbox
                    name='second'
                    checked={user.isSecond}
                    onChange={e => handleChange(e, user._id)}
                    color='primary'
                  />
                </Table.Cell>
                <Table.Cell>
                  <Checkbox
                    name='isAdmin'
                    checked={user.isAdmin}
                    onChange={e => handleChange(e, user._id)}
                  />
                </Table.Cell>
                <Table.Cell>
                  <IconButton
                    onClick={() => {
                      setSelectedUserId(user._id);
                      setOpen(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <Modal size='mini' open={open} onClose={() => setOpen(false)}>
        <Modal.Header>Delete</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpen(false)}>No</Button>
          <Button primary onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default AdminSettings;
