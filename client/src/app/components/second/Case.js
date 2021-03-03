import React, { useState } from 'react';
// Rerux
import { useSelector } from 'react-redux';
// Components
import { Avatar, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
// Utils
import { initials } from '../../../utils/converters';
import { Modal } from 'semantic-ui-react';
import Button from '../common/Button';

const Case = ({ item, innerRef, provided, handleRemoveCase }) => {
  const { user } = useSelector(state => state.auth);
  const [open, setOpen] = useState(false);
  return (
    <>
      <li
        className='case'
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={innerRef}
      >
        <div className='case__top'>
          <span className={`case__status ${item.status}`}>
            {item.status === 'inProgress' ? 'in progress' : item.status}
          </span>
          {item?.assignedTo !== null && (
            <Avatar className='case__avatar' src={item.assignedTo.photoUrl}>
              {initials(item.assignedTo.name)}
            </Avatar>
          )}
        </div>
        <h1 className='case__title'>{item.title}</h1>
        <span className='case__date'>
          {new Date(item.createdAt).toDateString()}
        </span>
        <p className='case__number'>
          Case: <span>{item.caseNumber}</span>
        </p>

        <p className='case__description'>{item.description}</p>
        <div className='case__bottom'>
          <Avatar className='case__avatar' src={item.createdBy.photoUrl}>
            {initials(item.createdBy.name)}
          </Avatar>
          {user.isAdmin && (
            <IconButton onClick={() => setOpen(true)}>
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      </li>
      <Modal size='mini' open={open} onClose={() => setOpen(false)}>
        <Modal.Header>Delete</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpen(false)}>No</Button>
          <Button primary onClick={() => handleRemoveCase(item._id)}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default Case;
