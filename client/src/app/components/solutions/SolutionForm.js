import React, { useState, useEffect } from 'react';
// data
import { categories } from '../../../data/categories';
import { solutions } from '../../../data/solutions';
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
  FormHelperText,
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

const SolutionForm = ({ handleFormClose, solution }) => {
  const [newCategory, setNewCategory] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // useEffect(() => {
  //   if (match.params.id) {
  //     const solution = solutions.find(
  //       solution => solution._id === match.params.id
  //     );
  //     setSelectedSolution(solution);

  //     const blocksFromHtml = htmlToDraft(solution.description);
  //     const { contentBlocks, entityMap } = blocksFromHtml;
  //     const contentState = ContentState.createFromBlockArray(
  //       contentBlocks,
  //       entityMap
  //     );
  //     setEditorState(EditorState.createWithContent(contentState));
  //   }
  // }, [match.params.id]);

  const handleEditorState = newState => {
    setEditorState(newState);
  };

  // Formik
  const formik = useFormik({
    initialValues: {
      category: solution !== null ? solution.category : '',
      title: solution !== null ? solution.title : '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      values.text = html;
      const newSolution = {
        _id: '123123',
        title: values.title,
        description: values.text,
        categoryId: values.category,
        createdDate: Date.now(),
        createdBy: '6009e1e40553527dd39639ab',
      };
      solutions.push(newSolution);
    },
  });

  const handleRadio = isNew => {
    formik.values.category = '';
    formik.errors.category = '';
    setNewCategory(isNew);
  };

  return (
    <div className='solutionForm'>
      <h1 className='solutionForm__title'>
        {solution == null ? 'New Solution' : 'Modify Solution'}
      </h1>
      <form
        action=''
        className='solutionForm__form'
        onSubmit={formik.handleSubmit}
      >
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
                <FormControl style={{ width: '70%' }}>
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
                      categories.map(category => (
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
                <FormControl style={{ width: '70%' }}>
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
                  <FormHelperText></FormHelperText>
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