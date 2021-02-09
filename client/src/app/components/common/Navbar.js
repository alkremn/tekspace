import React from 'react';
import Link from './Link';
import logo from '../../../assets/logo-inverted.svg';
//icons
import { RiDashboardLine } from 'react-icons/ri';
import PublishIcon from '@material-ui/icons/Publish';
import { IoExitOutline } from 'react-icons/io5';
import { RiTeamFill } from 'react-icons/ri';
import { ImBooks } from 'react-icons/im';
import { BsChatDotsFill } from 'react-icons/bs';
import { IoSettingsSharp } from 'react-icons/io5';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssessmentIcon from '@material-ui/icons/Assessment';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar__header'>
        <img className='navbar__logo' src={logo} alt='logo' />
      </div>
      <ul className='navbar__links'>
        <li>
          <Link to='/overview' title='Overview' Icon={RiDashboardLine} />
        </li>
        <li>
          <Link to='/team' title='Team' Icon={RiTeamFill} />
        </li>
        <li>
          <Link to='/tasks' title='Tasks' Icon={AssignmentTurnedInIcon} />
        </li>
        <li>
          <Link to='/solutions' title='Solutions' Icon={ImBooks} />
        </li>
        <li>
          <Link to='/second' title='Escalations' Icon={PublishIcon} />
        </li>
        <li>
          <Link to='/messages' title='Messages' Icon={BsChatDotsFill} />
        </li>
        <li>
          <Link to='/reports' title='Reports' Icon={AssessmentIcon} />
        </li>
        <li>
          <Link to='/settings' title='Settings' Icon={IoSettingsSharp} />
        </li>
      </ul>
      <div className='navbar__bottom'>
        <Link to='/logout' title='Logout' Icon={IoExitOutline} />
      </div>
    </div>
  );
};

export default Navbar;
