import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import Button from './Button';

const SolutionSearch = ({ searchValue, onChange }) => {
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
      <NavLink to='/createSolution'>
        <Button primary className='createButton'>
          Create
        </Button>
      </NavLink>
    </div>
  );
};

export default SolutionSearch;
