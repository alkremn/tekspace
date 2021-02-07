import React from 'react';

const TitleListItem = ({ item, active, action }) => {
  return (
    <button
      id={item._id}
      className={`titleListItem ${active ? 'activeListItem' : ''}`}
      onClick={e => action(e.target.id)}
    >
      {item.title}
    </button>
  );
};

export default TitleListItem;
