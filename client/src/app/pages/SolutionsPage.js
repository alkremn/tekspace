import React, { useState, useEffect } from 'react';
// Redux
import { useSelector, useDispatch } from 'react-redux';
// Components
import TitleList from '../components/solutions/TitleList';
import SolutionSearch from '../components/solutions/SolutionSearch';
import Solution from '../components/solutions/Solution';
import SolutionForm from '../components/solutions/SolutionForm';
import Loading from '../components/common/Loading';
import TitleListItem from '../components/solutions/TitleListItem';
// Actions
import { removeSolutionAction } from '../../actions/solutionActions';

const SolutionPage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.async);
  const { solutions } = useSelector(state => state.solutions);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredSolutions, setFilteredSolutions] = useState(solutions);
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    if (solutions) {
      const categories = [];
      solutions.forEach(solution => categories.push(solution.category));
      const filteredCategories = Array.from(
        new Set(categories.map(c => c._id))
      ).map(id => {
        return {
          _id: id,
          title: categories.find(c => c._id === id).title,
        };
      });
      setCategories(filteredCategories);
      setFilteredSolutions(solutions);
    }
  }, [solutions]);

  const handleSelectedCategory = categoryId => {
    setFormOpen(false);
    setSelectedCategory(categoryId);
    setSelectedSolution(null);
    setSearchTerm('');
    if (categoryId === '') {
      setFilteredSolutions(solutions);
    } else {
      setFilteredSolutions(
        solutions.filter(solution => solution.category._id === categoryId)
      );
    }
  };

  const handleSelectedSolution = solutionId => {
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

  const handleSaveSolution = () => {
    handleSelectedCategory('');
  };

  const handleFormOpen = () => {
    setSelectedCategory(null);
    setSelectedSolution(null);
    setFilteredSolutions(solutions);
    setFormOpen(true);
  };

  const handleEditSolution = solutionId => {
    setFormOpen(true);
    setSelectedSolution(
      solutions.find(solution => solution._id === solutionId)
    );
  };

  const handleDeleteSolution = solutionId => {
    dispatch(removeSolutionAction(solutionId));
    setSelectedCategory('');
    setSelectedSolution(null);
    setFilteredSolutions(
      solutions.filter(solution => solution._id !== solutionId)
    );
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  if (loading) return <Loading />;

  return (
    <div className='solutionPage'>
      <div className='titleList categories'>
        <h2 className='titleList__title'>Categories</h2>
        <div className='titleList__titles'>
          <TitleListItem
            item={{ _id: '', title: 'All Categories' }}
            active={selectedCategory === ''}
            action={handleSelectedCategory}
          />
          {categories &&
            categories.map(category => (
              <TitleListItem
                key={category._id}
                item={category}
                active={category._id === selectedCategory}
                action={handleSelectedCategory}
              />
            ))}
        </div>
      </div>
      <SolutionSearch
        searchValue={searchTerm}
        onChange={searchHandler}
        handleFormOpen={handleFormOpen}
      />
      <TitleList
        items={filteredSolutions}
        title='Solutions'
        active={selectedSolution?._id}
        action={handleSelectedSolution}
      />
      {!formOpen ? (
        selectedSolution && (
          <Solution
            solution={selectedSolution}
            handleEdit={handleEditSolution}
            handleDelete={handleDeleteSolution}
          />
        )
      ) : (
        <SolutionForm
          handleFormClose={handleFormClose}
          handleSaveSolution={handleSaveSolution}
          solution={selectedSolution}
          categories={categories}
        />
      )}
    </div>
  );
};

export default SolutionPage;
