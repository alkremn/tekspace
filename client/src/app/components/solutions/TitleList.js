import React from 'react';
import TitleListItem from './TitleListItem';

const TitleList = ({ items, title, active, action, isCategories }) => {
  return (
    <div className={`titleList ${isCategories ? 'categories' : ''}`}>
      <h2 className='titleList__title'>{title}</h2>
      <div className='titleList__titles'>
        {items &&
          items.map(item => (
            <TitleListItem
              key={item._id}
              item={item}
              active={item._id === active}
              action={action}
            />
          ))}
      </div>
    </div>
  );
};

export default TitleList;
