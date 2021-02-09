import React, { useState } from 'react';

// Data
import { categories } from '../../data/categories';
import { solutions as solutionsData } from '../../data/solutions';

// Components
import TitleList from '../components/solutions/TitleList';
import SolutionSearch from '../components/solutions/SolutionSearch';
import Solution from '../components/solutions/Solution';
import SolutionForm from '../components/solutions/SolutionForm';
import Loading from '../components/common/Loading';

const SolutionPage = ({ history }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [solutions, setSolutions] = useState(solutionsData);
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const selectedCategoryHandler = categoryId => {
    setFormOpen(false);
    setSelectedCategory(categoryId);
    setSelectedSolution(null);
    setSearchTerm('');
    setSolutions(
      solutionsData.filter(solution => solution.categoryId === categoryId)
    );
  };

  const selectedSolutionHandler = solutionId => {
    setFormOpen(false);
    setSelectedSolution(
      solutionsData.find(solution => solution._id === solutionId)
    );
  };

  const searchHandler = event => {
    const searchInput = event.target.value;
    setFormOpen(false);
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

  const handleFormOpen = () => {
    setSelectedCategory(null);
    setSelectedSolution(null);
    setSolutions(solutionsData);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const handleModifyOpen = () => {
    setFormOpen(true);
  };

  if (loading) return <Loading />;

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
        handleFormOpen={handleFormOpen}
      />
      <TitleList
        items={solutions}
        title='Solutions'
        active={selectedSolution?._id}
        action={selectedSolutionHandler}
      />
      {!formOpen ? (
        selectedSolution && (
          <Solution
            solution={selectedSolution}
            handleModifyOpen={handleModifyOpen}
          />
        )
      ) : (
        <SolutionForm
          handleFormClose={handleFormClose}
          solution={selectedSolution}
        />
      )}
    </div>
  );
};

export default SolutionPage;
