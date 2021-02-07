import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

const Solution = ({ history, solution, deleteHandler }) => {
  return (
    <div className='solution'>
      <div className='solution__header'>
        <h1 className='solution__title'>{solution.title}</h1>
        <div className='solution__header-links'>
          <IconButton
            onClick={() => history.push(`/manageSolution/${solution._id}`)}
          >
            <EditIcon className='solution__header-icons' />
          </IconButton>
          <IconButton onClick={() => deleteHandler(solution._id)}>
            <DeleteIcon className='solution__header-icons' />
          </IconButton>
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
