import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import Button from './Button';

const SolutionSearch = () => {
  return (
    <div className='solutionSearch'>
      <div className='solutionSearch__left'>
        <BiSearch className='solutionSearch__icon' />
        <input type='search' placeholder='Search...' />
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
