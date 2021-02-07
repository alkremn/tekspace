import React, { useState } from 'react';

// Data
import { categories } from '../../data/categories';
import { solutions as solutionsData } from '../../data/solutions';

// Components
import TitleList from '../components/solutions/TitleList';
import SolutionSearch from '../components/solutions/SolutionSearch';
import Solution from '../components/solutions/Solution';
import SolutionFormPage from '../components/solutions/SolutionForm';

const SolutionPage = ({ history }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [solutions, setSolutions] = useState([]);
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const selectedCategoryHandler = categoryId => {
    setSelectedCategory(categoryId);
    setSelectedSolution(null);
    setSearchTerm('');
    setSolutions(
      solutionsData.filter(solution => solution.categoryId === categoryId)
    );
  };

  const selectedSolutionHandler = solutionId => {
    setSelectedSolution(
      solutionsData.find(solution => solution._id === solutionId)
    );
  };

  const searchHandler = event => {
    const searchInput = event.target.value;
    setSearchTerm(searchInput);
    setSelectedCategory(null);
    setSelectedSolution(null);
    setSolutions(
      solutionsData.filter(solution =>
        solution.title
          .toLocaleLowerCase()
          .startsWith(searchInput?.toLocaleLowerCase())
      )
    );
  };

  const handleCreateOpen = () => {
    setIsCreateOpen(!isCreateOpen);
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
      <SolutionSearch
        searchValue={searchTerm}
        onChange={searchHandler}
        handleCreateOpen={handleCreateOpen}
      />
      {solutions.length > 0 && (
        <TitleList
          items={solutions}
          title='Solutions'
          active={selectedSolution?._id}
          action={selectedSolutionHandler}
        />
      )}
      {!isCreateOpen ? (
        selectedSolution && (
          <Solution solution={selectedSolution} history={history} />
        )
      ) : (
        <SolutionFormPage />
      )}
    </div>
  );
};

export default SolutionPage;
