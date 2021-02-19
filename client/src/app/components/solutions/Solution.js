import React from 'react';

// Redux
import { useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';

const Solution = ({ solution, handleEdit, handleDelete }) => {
  const { user } = useSelector(state => state.auth);
  return (
    <div className='solution'>
      <div className='solution__header'>
        <h1 className='solution__title'>{solution.title}</h1>
        <div className='solution__header-links'>
          {user.isAdmin && (
            <>
              <IconButton onClick={() => handleEdit(solution._id)}>
                <EditIcon className='solution__header-icons' />
              </IconButton>
              <IconButton onClick={() => handleDelete(solution._id)}>
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
  );
};

export default Solution;
