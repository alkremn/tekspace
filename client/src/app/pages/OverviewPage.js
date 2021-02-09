import React from 'react';
import { callCountData } from '../../data/callCountData';
import { callsPerAgent } from '../../data/agentCallsCountData';
import { Line, Doughnut } from 'react-chartjs-2';

const options = {
  title: {
    display: true,
    text: 'Call Count',
    fontSize: 16,
    responsive: true,
    aspectRatio: 2,
    maintainAspectRatio: false,
  },
};

const OverviewPage = () => {
  return (
    <div className='overview'>
      <h1>Calls in 2021: 1722</h1>
      <div className='overview__callCount'>
        <Line
          className='overview__lineChart'
          data={callCountData}
          options={options}
        />
      </div>
      <div className='overview__callsPerAgent'>
        <Doughnut data={callsPerAgent} />
      </div>
    </div>
  );
};

export default OverviewPage;
