import React from 'react';

const TeamMember = ({ size, src, name, title }) => {
  return (
    <div className='teamMember'>
      <img className='teamMember__image' src={src} alt='avatar' />
      <div className='teamMember__bottom'>
        <h4 className='teamMember__name'>{name}</h4>
        <small className='teamMember__title'>{title}</small>
      </div>
    </div>
  );
};

export default TeamMember;
