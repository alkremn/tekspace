import React, { useState } from 'react';
import { Form, Input, Accordion, Icon } from 'semantic-ui-react';
import Button from '../common/Button';

const AddUser = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className='addUser'>
      <Form className='addUser__form'>
        <div className='addUser__general'>
          <div className='addUser__name'>
            <Form.Field>
              <label>First Name</label>
              <Input name='title' type='text' />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <Input name='title' placeholder='Title' />
            </Form.Field>
          </div>
          <Form.Field style={{ width: '40%' }}>
            <label>Email</label>
            <Input type='email' name='email' placeholder='Email' />
          </Form.Field>
          <div className='caseForm__addButton'>
            <Button
              className='caseFrom__addButton'
              primary
              type='submit'
              width={100}
            >
              Add User
            </Button>
          </div>
        </div>
        <div className='addUser__optional'>
          <Accordion>
            <Accordion.Title active={open} onClick={handleClick}>
              <Icon name='dropdown' />
              Gmail Account (optional)
            </Accordion.Title>
            <Accordion.Content active={open}>
              <Form.Field>
                <Input type='email' name='email' placeholder='Email' />
              </Form.Field>
            </Accordion.Content>
          </Accordion>
        </div>
      </Form>
    </div>
  );
};

export default AddUser;
