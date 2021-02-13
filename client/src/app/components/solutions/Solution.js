import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

const Solution = ({ solution, deleteHandler }) => {
  return (
    <div className='solution'>
      <div className='solution__header'>
        <h1 className='solution__title'>{solution.title}</h1>
        <div className='solution__header-links'>
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
