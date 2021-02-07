import React from 'react';
import { GrEdit } from 'react-icons/gr';
import { RiDeleteBinLine } from 'react-icons/ri';

const Solution = ({ history, solution, deleteHandler }) => {
  return (
    <div className='solution'>
      <div className='solution__header'>
        <h1 className='solution__title'>{solution.title}</h1>
        <div className='solution__header-links'>
          <button
            onClick={() => history.push(`/manageSolution/${solution._id}`)}
          >
            <GrEdit className='solution__header-icons' />
          </button>
          <button onClick={() => deleteHandler(solution._id)}>
            <RiDeleteBinLine className='solution__header-icons' />
          </button>
        </div>
      </div>
      <textarea
        className='solution__description'
        value={solution.description}
        readOnly
      ></textarea>
    </div>
  );
};

export default Solution;
