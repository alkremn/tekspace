import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = () => {
  return (
    <div className='loading'>
      <CircularProgress size={70} />
    </div>
  );
};

export default Loading;
