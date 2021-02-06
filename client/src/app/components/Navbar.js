import React from 'react';
import Link from './Link';
import logo from '../../assets/logo-inverted.svg';

import { Avatar } from '@chakra-ui/react';

// temp data
import { users } from '../../data/users';

//icons
import { RiDashboardLine } from 'react-icons/ri';
import { GiEscalator } from 'react-icons/gi';
import { RiTeamFill } from 'react-icons/ri';
import { ImBooks } from 'react-icons/im';
import { BsChatDotsFill } from 'react-icons/bs';
import { IoSettingsSharp } from 'react-icons/io5';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar__header'>
        <Avatar
          name={`${users[1].firstName} ${users[1].lastName}`}
          src={users[1].photoUrl}
          size='sm'
        />
        <h2 className='navbar__header-text'>{users[1].displayName}</h2>
      </div>
      <ul className='navbar__links'>
        <li>
          <Link to='/dashboard' title='Dashboard' Icon={RiDashboardLine} />
        </li>
        <li>
          <Link to='/team' title='Team' Icon={RiTeamFill} />
        </li>
        <li>
          <Link to='/solutions' title='Solutions' Icon={ImBooks} />
        </li>
        <li className='navbar__linkItem'>
          <Link to='/second' title='Escalations' Icon={GiEscalator} />
        </li>
        <li>
          <Link to='/chat' title='Chat' Icon={BsChatDotsFill} />
        </li>
        <li>
          <Link to='/settings' title='Settings' Icon={IoSettingsSharp} />
        </li>
      </ul>
      <img className='navbar__logo' src={logo} alt='logo' />
    </div>
  );
};

export default Navbar;
