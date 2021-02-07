import React from 'react';
import { BiSearch } from 'react-icons/bi';
import Button from '../common/Button';

const SolutionSearch = ({ searchValue, onChange, handleFormOpen }) => {
  return (
    <div className='solutionSearch'>
      <div className='solutionSearch__left'>
        <BiSearch className='solutionSearch__icon' />
        <input
          type='text'
          value={searchValue}
          placeholder='Search...'
          onChange={onChange}
        />
        <button type='button'>Search</button>
      </div>
      <Button
        primary
        className='createButton'
        onClick={handleFormOpen}
        height='35'
      >
        Create
      </Button>
    </div>
  );
};

export default SolutionSearch;
