import React, { useEffect, useState } from 'react';
import { Form, TextArea, Input, Select } from 'semantic-ui-react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
// Validation
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '../common/Button';
// Actions
import { createCaseAction } from '../../../actions/caseActions';

const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  caseNumber: yup.number().required('Case number is required'),
  description: yup.string().required('Description is required'),
});

const CaseForm = ({ setFormActive }) => {
  const { users } = useSelector(state => state.users);
  const [userOptions, setUserOptions] = useState([]);
  const [agent, setAgent] = useState(null);
  const dispatch = useDispatch();
  const initialValues = {
    title: '',
    caseNumber: '',
    description: '',
    agent: agent,
  };

  useEffect(() => {
    setUserOptions(
      users.map(user => ({ key: user._id, value: user._id, text: user.name }))
    );
  }, [users]);

  // Formik
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: values => {
      dispatch(createCaseAction(values));
      setFormActive(false);
    },
  });

  const handleCancel = () => {
    formik.setValues = { title: '', caseNumber: '', description: '' };
    setFormActive(false);
  };

  return (
    <div className='caseForm'>
      <h2>New Case</h2>
      <Form style={{ width: '80%' }} onSubmit={formik.handleSubmit}>
        <Form.Field>
          <label>Title</label>
          <Input
            name='title'
            placeholder='Title'
            value={formik.values.title}
            onChange={formik.handleChange}
          />
        </Form.Field>
        <Form.Field
          error={formik.touched.category && Boolean(formik.errors.category)}
        >
          <label>Case Number</label>
          <Input
            type='number'
            name='caseNumber'
            placeholder='Case Number'
            value={formik.values.caseNumber}
            onChange={formik.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <TextArea
            name='description'
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder='Tell us more'
            rows={6}
          />
        </Form.Field>
        <Form.Field>
          <label>Escalated By</label>
          <Select
            name='description'
            value={agent}
            onChange={e => setAgent(e.current.target)}
            placeholder='Select User'
            options={userOptions}
          />
        </Form.Field>
        <div className='caseForm__buttons'>
          <Button primary type='submit' width={90}>
            Save
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </div>
      </Form>
    </div>
  );
};

export default CaseForm;
