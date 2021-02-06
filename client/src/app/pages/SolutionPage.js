import React, { useState } from 'react';

// Data
import { categories } from '../../data/categories';
import { solutions as solutionsData } from '../../data/solutions';

// Components
import TitleList from '../components/TitleList';
import SolutionSearch from '../components/SolutionSearch';
import Solution from '../components/Solution';

const SolutionPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [solutions, setSolutions] = useState([]);
  const [selectedSolution, setSelectedSolution] = useState(null);

  const selectedCategoryHandler = categoryId => {
    setSelectedCategory(categoryId);
    setSelectedSolution(null);
    setSolutions(
      solutionsData.filter(solution => solution.categoryId === categoryId)
    );
  };

  const selectedSolutionHandler = solutionId => {
    setSelectedSolution(
      solutionsData.find(solution => solution._id === solutionId)
    );
  };

  return (
    <div className='solutionPage'>
      <TitleList
        items={categories}
        title='Categories'
        active={selectedCategory}
        action={selectedCategoryHandler}
        isCategories
      />
      <SolutionSearch />
      {solutions.length > 0 && (
        <TitleList
          items={solutions}
          title='Solutions'
          active={selectedSolution?._id}
          action={selectedSolutionHandler}
        />
      )}
      {selectedSolution && <Solution solution={selectedSolution} />}
    </div>
  );
};

export default SolutionPage;
