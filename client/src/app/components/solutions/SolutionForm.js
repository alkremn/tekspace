import React, { useState } from 'react';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { createSolution } from '../../../actions/solutionActions';
// Editor imports
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Button from '../common/Button';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

// Validation
import * as yup from 'yup';
import { useFormik } from 'formik';

// Material UI
import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core';

const validationSchema = yup.object({
  category: yup.string('Select category').required('Category is required'),
  title: yup.string().required('Title is required'),
});

const SolutionForm = ({
  handleFormClose,
  handleSaveSolution,
  solution,
  categories,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorState = newState => {
    setEditorState(newState);
  };

  // Formik
  const formik = useFormik({
    initialValues: {
      category: solution !== null ? solution.categoryId : '',
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
        categoryId: values.category,
      };

      if (solution) {
      } else {
        dispatch(createSolution(newSolution));
      }
      handleSaveSolution();
      handleFormClose(true);
    },
  });

  return (
    <div className='solutionForm'>
      <h1 className='solutionForm__title'>
        {solution == null ? 'New Solution' : 'Modify Solution'}
      </h1>
      <form className='solutionForm__form' onSubmit={formik.handleSubmit}>
        <div className='form__category'>
          <FormControl style={{ width: '50%' }}>
            <Select
              id='category'
              name='category'
              placeholder='Select Category'
              value={formik.values.category}
              onChange={formik.handleChange}
              variant='outlined'
              displayEmpty
              error={formik.touched.category && Boolean(formik.errors.category)}
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
