import React from 'react';
import { Form, TextArea, Input } from 'semantic-ui-react';
// Validation
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '../common/Button';

const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  caseNumber: yup.number().required('Case number is required'),
  description: yup.string().required('Description is required'),
});

const CaseForm = ({ setFormActive }) => {
  const initialValues = {
    title: '',
    caseNumber: '',
    description: '',
  };

  // Formik
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log(values);
    },
  });

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
          <label>Case Number</label>
          <TextArea
            name='description'
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder='Tell us more'
            rows={6}
          />
        </Form.Field>
        <div className='caseForm__buttons'>
          <Button primary type='submit' width={90}>
            Save
          </Button>
          <Button onClick={() => setFormActive(false)}>Cancel</Button>
        </div>
      </Form>
    </div>
  );
};

export default CaseForm;
