import React, { useState, useEffect } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { removeCaseAction, updateCaseAction } from '../../actions/caseActions';
// Components
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Button from '../components/common/Button';
import Case from '../components/second/Case';
import TitleListItem from '../components/solutions/TitleListItem';
import CaseForm from '../components/second/CaseForm';
import Loading from '../components/common/Loading';

// drag and drop method
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);
  removed.status = droppableDestination.droppableId;

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const SecondPage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.async);
  const { user } = useSelector(state => state.auth);
  const { cases } = useSelector(state => state.cases);

  const [formActive, setFormActive] = useState(false);
  const [disabled, setDisabled] = useState(!user.isSecond);
  const [filteredCases, setFilteredCases] = useState({
    new: [],
    inProgress: [],
    completed: [],
  });

  useEffect(() => {
    if (cases) {
      setFilteredCases({
        new: cases.filter(c => c.status === 'new'),
        inProgress: cases.filter(c => c.status === 'inProgress'),
        completed: cases.filter(c => c.status === 'completed'),
      });
    }
  }, [cases]);

  const onDragEndHandler = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      return;
    }
    dispatch(
      updateCaseAction({
        caseId: result.draggableId,
        status: result.destination.droppableId,
      })
    );
    const sourceList = filteredCases[source.droppableId];
    const destinationList = filteredCases[destination.droppableId];
    result = move(sourceList, destinationList, source, destination);
    setFilteredCases({
      ...filteredCases,
      ...result,
    });
  };

  const handleRemoveCase = caseId => {
    dispatch(removeCaseAction(caseId));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className='secondPage'>
          <div className='secondPage__button'>
            {!formActive && (
              <Button
                primary
                onClick={() => setFormActive(!formActive)}
                type='button'
              >
                New Case
              </Button>
            )}
          </div>
          <div className='secondPage__content'>
            <div
              className={`secondPage__left ${formActive ? 'formActive' : ''}`}
            >
              <CaseForm setFormActive={setFormActive} />
            </div>
            <DragDropContext onDragEnd={onDragEndHandler}>
              <div
                className={`secondPage__right ${
                  formActive ? 'caseForm-active' : ''
                }`}
              >
                <div className='secondPage__column'>
                  <h1 className='second__header-title new'>New</h1>

                  <Droppable droppableId='new'>
                    {provided => (
                      <ul
                        className='secondPage__list'
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {filteredCases.new.map((item, index) => (
                          <Draggable
                            key={item._id}
                            draggableId={item._id}
                            index={index}
                            isDragDisabled={!user.isSecond || !user.isAdmin}
                          >
                            {provided => (
                              <Case
                                draggableProps={provided.draggableProps}
                                dragHandleProps={provided.dragHandleProps}
                                innerRef={provided.innerRef}
                                id={item._id}
                                title={item.title}
                                caseNumber={item.caseNumber}
                                description={item.description}
                                createdDate={item.createdDate}
                                createdBy={item.title}
                                assignedTo={item.title}
                                handleRemoveCase={handleRemoveCase}
                              />
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </div>
                <div className='secondPage__column'>
                  <h1 className='second__header-title inProgress'>
                    In Progress
                  </h1>
                  <Droppable droppableId='inProgress'>
                    {provided => (
                      <ul
                        className='secondPage__list'
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {filteredCases.inProgress.map((item, index) => (
                          <Draggable
                            key={item._id}
                            draggableId={item._id}
                            index={index}
                            isDragDisabled={!user.isSecond || !user.isAdmin}
                          >
                            {provided => (
                              <Case
                                className='case draggable'
                                draggableProps={provided.draggableProps}
                                dragHandleProps={provided.dragHandleProps}
                                innerRef={provided.innerRef}
                                id={item._id}
                                title={item.title}
                                caseNumber={item.caseNumber}
                                description={item.description}
                                createdDate={item.createdDate}
                                createdBy={item.title}
                                assignedTo={item.title}
                              />
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </div>

                <div className='secondPage__column'>
                  <h1 className='second__header-title complete'>Completed</h1>
                  <Droppable droppableId='completed'>
                    {provided => (
                      <ul
                        className='secondPage__list'
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {filteredCases.completed.map((item, index) => (
                          <Draggable
                            key={item._id}
                            draggableId={item._id}
                            index={index}
                            isDragDisabled={!user.isSecond || !user.isAdmin}
                          >
                            {provided => (
                              <Case
                                className='case draggable'
                                draggableProps={provided.draggableProps}
                                dragHandleProps={provided.dragHandleProps}
                                innerRef={provided.innerRef}
                                id={item._id}
                                title={item.title}
                                caseNumber={item.caseNumber}
                                description={item.description}
                                createdDate={item.createdDate}
                                createdBy={item.title}
                                assignedTo={item.title}
                              />
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </div>
              </div>
            </DragDropContext>
          </div>
        </div>
      )}
    </>
  );
};

export default SecondPage;
