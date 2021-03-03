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
        <div className='addUser__left'>
          <div className='addUser__name'>
            <Form.Field>
              <label>First Name</label>
              <Input name='firstName' type='text' size='small' />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <Input name='lastName' size='small' />
            </Form.Field>
          </div>
          <Accordion>
            <Accordion.Title active={open} onClick={handleClick}>
              <Icon name='dropdown' />
              Gmail Account (optional)
            </Accordion.Title>
            <Accordion.Content active={open}>
              <Form.Field>
                <Input
                  type='email'
                  name='gemail'
                  placeholder='Gmail'
                  size='small'
                />
              </Form.Field>
            </Accordion.Content>
          </Accordion>
        </div>
        <div className='addUser__right'>
          <Form.Field style={{ width: '60%' }}>
            <label>Email</label>
            <Input type='email' name='email' size='small' />
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
      </Form>
    </div>
  );
};

export default AddUser;
