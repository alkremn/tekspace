import React, { useEffect, useState } from 'react';
// Redux
import { useSelector } from 'react-redux';

// Templates
import { callsPerAgent as callsPerAgentData } from '../../data/agentCallsCountData';
import { callCountData } from '../../data/callCountData';
import { weekTaskCountTemplate } from '../../templates/weekTaskCountTemplate';
import { utilizationTemplate } from '../../templates/utilizationTemplate';

// overviewOptions
import {
  agentOptions,
  taskCountOptions,
  casesOptions,
  callsOptions,
  utilizationOptions,
} from '../../utils/overviewOptions';
import { Line, Bar, HorizontalBar } from 'react-chartjs-2';
import Loading from '../components/common/Loading';

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

const createTaskCountData = report => {
  return {
    ...weekTaskCountTemplate,
    datasets: [
      {
        ...weekTaskCountTemplate.datasets[0],
        data: report.weekTaskCount,
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

const createTotalCallCountData = report => {
  return {
    ...callCountData,
    datasets: [
      {
        ...callCountData.datasets[0],
        data: report.yearCallCount.currentYear,
      },
      {
        ...callCountData.datasets[1],
        data: report.yearCallCount.max,
      },
      {
        ...callCountData.datasets[2],
        data: report.yearCallCount.avg,
      },
    ],
  };
};

const createUtilizationData = report => {
  return {
    ...utilizationTemplate,
    datasets: [
      {
        ...utilizationTemplate.datasets[0],
        data: report.weekUtilization,
      },
    ],
  };
};

const OverviewPage = () => {
  const { loading } = useSelector(state => state.async);
  const { report } = useSelector(state => state.report);
  const [callsPerAgent, setCallsPerAgent] = useState({});
  const [casesPercentData, setCasesPercentData] = useState({});
  const [callsInfo, setCallsInfo] = useState([]);
  const [totalCallsCount, setTotalCallsCount] = useState({});
  const [weekUtilizationData, setWeekUtilizationData] = useState({});
  const [weekTaskCountData, setWeekTaskCountData] = useState({});

  useEffect(() => {
    if (report) {
      setCallsPerAgent(populateCallsData(report));
      setCasesPercentData(populateCasesPercentData(report));
      setCallsInfo(createCallsInfo(report));
      setTotalCallsCount(createTotalCallCountData(report));
      setWeekUtilizationData(createUtilizationData(report));
      setWeekTaskCountData(createTaskCountData(report));
    }
  }, [report]);

  if (loading) return <Loading />;

  return (
    <div className='overview'>
      <div className='overview__info'>
        <h1>{report?.yearTotalCalls}</h1>
        <span>Total Calls in 2021</span>
      </div>
      <div className='overview__info'>
        <h1>{report?.weekTotalCalls}</h1>
        <span>Total calls per Week</span>
      </div>
      <div className='overview__info'>
        <h1>{report?.weekTotalEmails}</h1>
        <span>Other/Emails</span>
      </div>
      <div className='overview__info'>
        <h1>{report?.weekTotalTasks}</h1>
        <span>Total Tasks per Week</span>
      </div>
      <div className='overview__info'>
        <h1>{report?.longestCallTime} mins</h1>
        <span>Longest Call Time</span>
      </div>
      <div className='overview__info'>
        <h1>{report?.averageCallTime} mins</h1>
        <span>Average call Time</span>
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
      <div className='overview__taskCountContainer'>
        <Line
          className='overview__lineChart'
          data={weekTaskCountData}
          options={taskCountOptions}
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
          data={totalCallsCount}
          options={callsOptions}
        />
      </div>
      <div className='overview__utilization'>
        <Line
          className='overview__lineChart'
          data={weekUtilizationData}
          options={utilizationOptions}
        />
      </div>
    </div>
  );
};

export default OverviewPage;
