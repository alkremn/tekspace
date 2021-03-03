import React, { useEffect, useState } from 'react';
import { callsPerAgent as callsPerAgentData } from '../../data/agentCallsCountData';
import { callCountData } from '../../data/callCountData';
import { utilizationData } from '../../data/utilizationData';
import { overviewData } from '../../data/overviewData';

// overviewOptions
import {
  agentOptions,
  casesOptions,
  callsOptions,
  utilizationOptions,
} from '../../utils/overviewOptions';
import { Line, Bar, HorizontalBar, Pie, Doughnut } from 'react-chartjs-2';

const populateCallsData = overviewData => {
  return {
    ...callsPerAgentData,
    labels: overviewData.agents,
    datasets: [
      {
        ...callsPerAgentData.datasets[0],
        data: overviewData.callsPerWeek,
      },
    ],
  };
};

const populateCasesPercentData = overviewData => {
  const { callsPerWeek, casesPerWeek } = overviewData;
  const percent = [];
  for (let i = 0; i < callsPerWeek.length; i++) {
    percent.push(Math.round((casesPerWeek[i] / callsPerWeek[i]) * 100));
  }
  return {
    ...callsPerAgentData,
    labels: overviewData.agents,
    datasets: [
      {
        ...callsPerAgentData.datasets[0],
        data: percent,
      },
    ],
  };
};

const createCallsInfo = overviewData => {
  const callsInfodata = [];
  for (let i = 0; i < overviewData.agents.length; i++) {
    callsInfodata.push({
      id: i,
      name: overviewData.agents[i],
      calls: overviewData.callsPerWeek[i],
    });
  }
  return callsInfodata;
};

const OverviewPage = () => {
  const [callsPerAgent, setCallsPerAgent] = useState({});
  const [casesPercentData, setCasesPercentData] = useState({});
  const [callsInfo, setCallsInfo] = useState([]);

  useEffect(() => {
    setCallsPerAgent(populateCallsData(overviewData));
    setCasesPercentData(populateCasesPercentData(overviewData));
    setCallsInfo(createCallsInfo(overviewData));
  }, []);
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

      <div className='overview__callsContainer'>
        <div className='overview__calls'>
          <Bar
            className='overview__lineChart'
            data={callsPerAgent}
            options={agentOptions}
          />
        </div>
        <div className='overview__infoContainer overview__calls-info'>
          <ul>
            {callsInfo.map(agent => (
              <li key={agent.id}>
                <span>{agent.calls}</span>
                {agent.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='overview__someContainer'>
        <Doughnut
          className='overview__lineChart'
          data={casesPercentData}
          options={casesOptions}
        />
      </div>
      <div className='overview__casesContainer'>
        <HorizontalBar
          className='overview__lineChart'
          data={casesPercentData}
          options={casesOptions}
        />
      </div>
      <div className='overview__callCount'>
        <Line
          className='overview__lineChart'
          data={callCountData}
          options={callsOptions}
        />
      </div>
      <div className='overview__utilization'>
        <Line
          className='overview__lineChart'
          data={utilizationData}
          options={utilizationOptions}
        />
      </div>
    </div>
  );
};

export default OverviewPage;
