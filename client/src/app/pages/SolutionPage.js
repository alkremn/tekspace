import React, { useState } from 'react';
import { categories } from '../../data/categories';
// Editor imports
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Button from '../components/Button';

import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  FormHelperText,
  InputLabel,
} from '@material-ui/core';

const SolutionPage = ({ match, history }) => {
  const [title] = useState(
    match.params.id ? 'Edit Solution' : 'Create Solution'
  );
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [category, setCategory] = useState('');

  const handleChange = event => {
    setCategory(event.target.value);
    console.log(category);
  };

  const handleEditorState = newState => {
    setEditorState(newState);
  };

  const handleSave = () => {};

  return (
    <div className='solutionForm'>
      <div className='solutionForm__container'>
        <h1 className='solutionForm__title'>{title}</h1>
        <form action='' className='solutionForm__form'>
          <div className='form__category'>
            <FormControl style={{ width: '30%' }}>
              <InputLabel id='demo-simple-select-readonly-label'>
                Select Category
              </InputLabel>
              <Select value={category} onChange={handleChange}>
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {categories &&
                  categories.map(category => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.title}
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText>Category is required</FormHelperText>
            </FormControl>
            <div className='solutionForm__divider'>
              <span>or</span>
            </div>
            <FormControl style={{ width: '40%' }}>
              <TextField
                id='categoryInput'
                label='Category'
                variant='outlined'
                size='small'
              />
            </FormControl>
          </div>
          <FormControl className='form__title'>
            <TextField
              id='title'
              label='Title'
              variant='outlined'
              size='small'
            />
          </FormControl>
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
              primary
              onClick={e => handleSave(e)}
            >
              Save
            </Button>
            <Button
              title='Cancel'
              titleColor='black'
              onClick={e => history.push('/solutions')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SolutionPage;
