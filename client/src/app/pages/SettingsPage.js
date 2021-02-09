import React, { useState } from 'react';
import MenuOption from '../components/settings/MenuOption';
import Profile from '../components/settings/Profile';

//icons
import PersonIcon from '@material-ui/icons/Person';
import { RiAdminLine } from 'react-icons/ri';

const SettingsPage = () => {
  const [menuOption, setMenuOption] = useState({
    profile: true,
    admin: false,
  });
  return (
    <div className='settings'>
      <ul className='settings__menu'>
        <li>
          <MenuOption
            title='profile'
            setMenuOption={setMenuOption}
            Icon={PersonIcon}
          />
        </li>
        <li>
          <MenuOption
            title='Admin Settings'
            setMenuOption={setMenuOption}
            Icon={RiAdminLine}
          />
        </li>
      </ul>
      {menuOption.profile && <Profile />}
    </div>
  );
};

export default SettingsPage;
