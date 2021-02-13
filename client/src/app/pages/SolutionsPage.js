import React, { useState, useEffect } from 'react';
// Redux
import { useSelector, useDispatch } from 'react-redux';
// Data
// import { categories } from '../../data/categories';
// import { solutions as solutionsData } from '../../data/solutions';
// Components
import TitleList from '../components/solutions/TitleList';
import SolutionSearch from '../components/solutions/SolutionSearch';
import Solution from '../components/solutions/Solution';
import SolutionForm from '../components/solutions/SolutionForm';
import Loading from '../components/common/Loading';
// Actions
import { fetchSolutions, removeSolution } from '../../actions/solutionsActions';

const SolutionPage = ({ history }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.async);
  const { categories } = useSelector(state => state.categories);
  const { solutions } = useSelector(state => state.solutions);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredSolutions, setFilteredSolutions] = useState(solutions);
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchSolutions());
  }, [dispatch]);

  const selectedCategoryHandler = categoryId => {
    setFormOpen(false);
    setSelectedCategory(categoryId);
    setSelectedSolution(null);
    setSearchTerm('');
    setFilteredSolutions(
      solutions.filter(solution => solution.categoryId === categoryId)
    );
  };

  const selectedSolutionHandler = solutionId => {
    setFormOpen(false);
    setSelectedSolution(
      solutions.find(solution => solution._id === solutionId)
    );
  };

  const searchHandler = event => {
    const searchInput = event.target.value;
    setFormOpen(false);
    setSearchTerm(searchInput);
    setSelectedCategory(null);
    setSelectedSolution(null);
    setFilteredSolutions(
      solutions.filter(solution =>
        solution.title
          .toLocaleLowerCase()
          .startsWith(searchInput?.toLocaleLowerCase())
      )
    );
  };

  const handleFormOpen = () => {
    setSelectedCategory(null);
    setSelectedSolution(null);
    setFilteredSolutions(solutions);
    setFormOpen(true);
  };

  const handleDeleteSolution = solutionId => {
    dispatch(removeSolution(solutionId));
    history.push('/solutions');
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
        items={filteredSolutions}
        title='Solutions'
        active={selectedSolution?._id}
        action={selectedSolutionHandler}
      />
      {!formOpen ? (
        selectedSolution && (
          <Solution
            solution={selectedSolution}
            handleModifyOpen={handleModifyOpen}
            deleteHandler={handleDeleteSolution}
          />
        )
      ) : (
        <SolutionForm
          handleFormClose={handleFormClose}
          solution={selectedSolution}
          categories={categories}
        />
      )}
    </div>
  );
};

export default SolutionPage;
