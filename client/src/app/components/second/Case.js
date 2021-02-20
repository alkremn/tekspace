import { Avatar } from '@material-ui/core';
import React from 'react';

const shrinkDescription = (description, count) => {
  if (description.length > count) {
    const words = description.split(' ');
    let total = 0;
    for (let word in words) {
    }
    // console.log(words);
    return `${description.slice(0, count)}...`;
  }
  return description;
};

const Case = ({
  id,
  title,
  caseNumber,
  description,
  createdDate,
  createdBy,
  assignedTo,
  isDraggable,
  draggableProps,
  dragHandleProps,
  innerRef,
}) => {
  return (
    <li
      className='case'
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <h1 className='case__title'>{title}</h1>
      <span>{new Date(Number(createdDate)).toDateString()}</span>
      <p className='case__description'>{shrinkDescription(description, 100)}</p>
      <Avatar>AK</Avatar>
    </li>
  );
};

export default Case;
