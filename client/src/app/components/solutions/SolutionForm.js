import React, { useState, useEffect } from 'react';
// redux
import { useSelector, useDispatch } from 'react-redux';
import {
  createSolutionAction,
  updateSolutionAction,
} from '../../../actions/solutionActions';
// Editor imports
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
// Components
import Button from '../common/Button';
import { v4 as uuid } from 'uuid';

// Validation
import * as yup from 'yup';
import { useFormik } from 'formik';

// Material UI
import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  Radio,
  FormLabel,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const validationSchema = yup.object({
  category: yup.string('Select category').required('Category is required'),
  title: yup.string().required('Title is required'),
});

const BlueRadio = withStyles({
  root: {
    color: '#3d8ee1',
    '&$checked': {
      color: '#3d8ee1',
    },
  },
  checked: {},
})(props => <Radio color='default' {...props} />);

const SolutionForm = ({
  handleFormClose,
  handleSaveSolution,
  solution,
  categories,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const [newCategory, setNewCategory] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (solution) {
      const blocksFromHtml = htmlToDraft(solution.description);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [solution]);

  const handleEditorState = newState => {
    setEditorState(newState);
  };

  const handleRadio = isNew => {
    formik.values.category = '';
    setNewCategory(isNew);
  };

  // Formik
  const formik = useFormik({
    initialValues: {
      category: solution !== null ? solution.category._id : '',
      title: solution !== null ? solution.title : '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      values.text = html;
      const newSolution = {
        title: values.title,
        description: values.text,
        createdDate: Date.now(),
        createdBy: user._id,
      };

      if (newCategory) {
        newSolution.category = {
          _id: uuid(),
          title: values.category,
        };
      } else {
        for (const category of categories) {
          if (category._id === values.category) {
            newSolution.category = category;
          }
        }
      }
      if (solution) {
        newSolution._id = solution._id;
        dispatch(updateSolutionAction(newSolution));
      } else {
        dispatch(createSolutionAction(newSolution));
      }
      handleSaveSolution();
      handleFormClose();
    },
  });

  return (
    <div className='solutionForm'>
      <h1 className='solutionForm__title'>
        {solution == null ? 'New Solution' : 'Modify Solution'}
      </h1>
      <form className='solutionForm__form' onSubmit={formik.handleSubmit}>
        <div className='form__category'>
          <FormLabel>Category</FormLabel>
          <ul className='form__categoryList'>
            <li>
              <BlueRadio
                checked={!newCategory}
                onChange={() => handleRadio(false)}
                name='radio-button-demo'
              />
              {!newCategory ? (
                <FormControl style={{ width: '88%' }}>
                  <Select
                    id='category'
                    name='category'
                    placeholder='Select Category'
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    variant='outlined'
                    displayEmpty
                    error={
                      formik.touched.category && Boolean(formik.errors.category)
                    }
                  >
                    <MenuItem value='' disabled>
                      <em>Select category</em>
                    </MenuItem>
                    {categories &&
                      categories
                        .filter(c => c.title !== 'All Categories')
                        .map(category => (
                          <MenuItem key={category._id} value={category._id}>
                            {category.title}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
              ) : (
                <span className='form__category_span'>Select Category</span>
              )}
            </li>
            <li>
              <BlueRadio
                checked={newCategory}
                onChange={() => handleRadio(true)}
                name='radio-button-demo'
              />
              {newCategory ? (
                <FormControl style={{ width: '88%' }}>
                  <TextField
                    id='category'
                    name='category'
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    label='New Category'
                    variant='outlined'
                    size='small'
                    error={
                      formik.touched.category && Boolean(formik.errors.category)
                    }
                    helperText={
                      formik.touched.category && formik.errors.category
                    }
                  />
                </FormControl>
              ) : (
                <span className='form__category_span'>New Category</span>
              )}
            </li>
          </ul>
        </div>
        <div className='form__titleDiv'>
          <FormControl className='form__title'>
            <TextField
              id='title'
              name='title'
              label='Title'
              variant='outlined'
              size='small'
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </FormControl>
        </div>
        <Editor
          className='editor'
          editorState={editorState}
          wrapperClassName='editor__wrapper'
          editorClassName='editor__editorDiv'
          toolbarClassName='editor__toolbar'
          onEditorStateChange={handleEditorState}
        />
        <div className='form__buttons'>
          <Button
            className='form__saveButton'
            title='Save'
            type='submit'
            primary
            disabled={!formik.isValid}
          >
            Save
          </Button>
          <Button title='Cancel' titleColor='black' onClick={handleFormClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SolutionForm;
