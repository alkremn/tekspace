import React, { useState } from 'react';
// Redux
import { useSelector } from 'react-redux';
import Profile from '../components/settings/Profile';
import MenuOption from '../components/common/MenuOption';

//icons
import PersonIcon from '@material-ui/icons/Person';
import { RiAdminFill } from 'react-icons/ri';

const SettingsPage = () => {
  const { user } = useSelector(state => state.auth);
  const [menuOption, setMenuOption] = useState({
    profile: true,
    admin: false,
  });
  return (
    <div className='settings'>
      <ul className='settings__menu'>
        <li>
          <MenuOption
            title='Profile'
            setMenuOption={setMenuOption}
            Icon={PersonIcon}
            active
          />
        </li>
        <li>
          <MenuOption
            title='Admin Settings'
            setMenuOption={setMenuOption}
            Icon={RiAdminFill}
            active
          />
        </li>
      </ul>
      {menuOption.profile && <Profile user={user}/>}
    </div>
  );
};

export default SettingsPage;
