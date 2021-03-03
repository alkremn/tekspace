import React, { useState } from 'react';

// Redux
import { useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import { Modal } from 'semantic-ui-react';
import Button from '../common/Button';

const Solution = ({ solution, handleEdit, handleDelete }) => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector(state => state.auth);
  return (
    <>
      <div className='solution'>
        <div className='solution__header'>
          <h1 className='solution__title'>{solution.title}</h1>
          <div className='solution__header-links'>
            {user.isAdmin && (
              <>
                <IconButton onClick={() => handleEdit(solution._id)}>
                  <EditIcon className='solution__header-icons' />
                </IconButton>
                <IconButton onClick={() => setOpen(true)}>
                  <DeleteIcon className='solution__header-icons' />
                </IconButton>
              </>
            )}
          </div>
        </div>
        <div
          className='solution__description'
          dangerouslySetInnerHTML={{
            __html: solution.description,
          }}
          readOnly
        ></div>
      </div>
      <Modal size='mini' open={open} onClose={() => setOpen(false)}>
        <Modal.Header>Delete</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpen(false)}>No</Button>
          <Button primary onClick={() => handleDelete(solution._id)}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default Solution;
