import React, { useState } from 'react';
// Redux
import { useSelector } from 'react-redux';
// Components
import Profile from '../components/settings/Profile';
import MenuOption from '../components/common/MenuOption';
import AdminSettings from '../components/settings/AdminSettings';

//icons
import { MdModeEdit } from 'react-icons/md';
import { FaUnlock } from 'react-icons/fa';
import AvatarCropper from '../components/settings/AvatarCropper';

const SettingsPage = () => {
  const { user } = useSelector(state => state.auth);
  const [menuOption, setMenuOption] = useState({
    // profile: true,
    admin: false,
  });
  return (
    <div className='settings'>
      <ul className='settings__menu'>
        <li>
          <MenuOption
            title='Profile'
            setMenuOption={setMenuOption}
            Icon={MdModeEdit}
            active={menuOption.profile}
            onClick={() => setMenuOption({ profile: true, admin: false })}
          />
        </li>
        {user.isAdmin && (
          <li>
            <MenuOption
              title='Admin'
              setMenuOption={setMenuOption}
              Icon={FaUnlock}
              active={menuOption.admin}
              onClick={() => setMenuOption({ profile: false, admin: true })}
            />
          </li>
        )}
      </ul>
      {menuOption.profile && <Profile user={user} />}
      {/* {menuOption.profile && <AvatarCropper user={user.photoUrl} />} */}
      {menuOption.admin && <AdminSettings />}
    </div>
  );
};

export default SettingsPage;
