import React from 'react';
import TeamMember from '../components/team/TeamMember';

const TeamPage = () => {
  return (
    <div className='teamPage'>
      <h1>Team Members</h1>
      <TeamMember
        src='https://avatars.githubusercontent.com/u/15260156?s=460&u=315a29ed6f1c17b22c7d96f929d2c878e4ea7bfc&v=4'
        name='Alexey Kremnev'
        title='Tier 2 Support'
      />
      <ul className='teamPage__team'>
        <li>
          <TeamMember
            src='https://avatars.githubusercontent.com/u/15260156?s=460&u=315a29ed6f1c17b22c7d96f929d2c878e4ea7bfc&v=4'
            name='Alexey Kremnev'
            title='Tier 2 Support'
          />
        </li>
        <li>
          <TeamMember
            src='https://avatars.githubusercontent.com/u/15260156?s=460&u=315a29ed6f1c17b22c7d96f929d2c878e4ea7bfc&v=4'
            name='Alexey Kremnev'
            title='Tier 2 Support'
          />
        </li>
        <li>
          <TeamMember
            src='https://avatars.githubusercontent.com/u/15260156?s=460&u=315a29ed6f1c17b22c7d96f929d2c878e4ea7bfc&v=4'
            name='Alexey Kremnev'
            title='Tier 2 Support'
          />
        </li>
        <li>
          <TeamMember
            src='https://avatars.githubusercontent.com/u/15260156?s=460&u=315a29ed6f1c17b22c7d96f929d2c878e4ea7bfc&v=4'
            name='Alexey Kremnev'
            title='Tier 2 Support'
          />
        </li>
      </ul>
    </div>
  );
};

export default TeamPage;
