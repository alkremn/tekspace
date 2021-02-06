import React, { useState } from 'react';

// Data
import { categories } from '../../data/categories';
import { solutions } from '../../data/solutions';

// Components
import TitleList from '../components/TitleList';
import SolutionSearch from '../components/SolutionSearch';
import Solution from '../components/Solution';

const SolutionPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className='solutionPage'>
      <TitleList
        items={categories}
        title='Categories'
        active={selectedCategory}
        action={setSelectedCategory}
        isCategories
      />
      <SolutionSearch />
      <TitleList items={solutions} title='Solutions' />
      <Solution solution={solutions[0]} />
    </div>
  );
};

export default SolutionPage;
