import React from 'react';
import { callCountData } from '../../data/callCountData';
import { callsPerAgent } from '../../data/agentCallsCountData';
import { utilizationData } from '../../data/utilizationData';
import { Line, Bar } from 'react-chartjs-2';

const callOptions = {
  title: {
    display: true,
    text: 'Call Count',
    fontSize: 18,
  },
  responsive: true,
  aspectRatio: 2,
  maintainAspectRatio: false,
};

const agentOptions = {
  title: {
    display: true,
    text: '# of calls per week',
    fontSize: 18,
  },
  responsive: true,
  legend: { display: false },
};

const utilizationOptions = {
  title: {
    display: true,
    text: 'Utilization',
    fontSize: 18,
  },
  aspectRatio: 2,
  maintainAspectRatio: true,
  legend: { display: false },
};

const OverviewPage = () => {
  return (
    <div className='overview'>
      <div className='overview__info'>
        <h1>1722</h1>
        <span>Total Calls in 2021</span>
      </div>
      <div className='overview__info'>
        <h1>362</h1>
        <span>Total calls per Week</span>
      </div>
      <div className='overview__info'>
        <h1>472</h1>
        <span>Total Tasks per Week</span>
      </div>
      <div className='overview__info'>
        <h1>1722</h1>
        <span>Calls in 2021</span>
      </div>
      <div className='overview__info'>
        <h1>1722</h1>
        <span>Calls in 2021</span>
      </div>
      <div className='overview__info'>
        <h1>1722</h1>
        <span>Calls in 2021</span>
      </div>

      <div className='overview__callsPerAgent'>
        <Bar
          className='overview__lineChart'
          data={callsPerAgent}
          options={agentOptions}
        />
      </div>
      <div className='overview__callsPerAgent-info'>
        <h1>1722</h1>
        <span>Total Calls in 2021</span>
      </div>
      <div className='overview__utilization'>
        <Line
          className='overview__lineChart'
          data={utilizationData}
          options={utilizationOptions}
        />
      </div>
      <div className='overview__callCount'>
        <Line
          className='overview__lineChart'
          data={callCountData}
          options={callOptions}
        />
      </div>
    </div>
  );
};

export default OverviewPage;
