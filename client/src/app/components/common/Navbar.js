import React, { useState } from 'react';
import Link from './Link';
import logo from '../../../assets/logo-inverted.svg';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../../actions/authActions';
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
import { Button, Modal } from 'semantic-ui-react';
import { GoogleLogout } from 'react-google-login';

const Navbar = ({ setTitle }) => {
  const { user } = useSelector(state => state.auth);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const logoutHandler = logout => {
    if (logout) {
      dispatch(logoutAction());
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  return (
    <div className='navbar'>
      <div className='navbar__header'>
        <img className='navbar__logo' src={logo} alt='logo' />
      </div>
      <ul className='navbar__links'>
        <li>
          <Link
            to='/overview'
            title='Overview'
            setTitle={setTitle}
            Icon={RiDashboardLine}
          />
        </li>
        <li>
          <Link to='/team' title='Team' setTitle={setTitle} Icon={RiTeamFill} />
        </li>
        {/* <li>
          <Link to='/tasks' title='Tasks'   setTitle={setTitle} Icon={AssignmentTurnedInIcon} />
        </li> */}
        <li>
          <Link
            to='/solutions'
            title='Solutions'
            setTitle={setTitle}
            Icon={ImBooks}
          />
        </li>
        <li>
          <Link
            to='/second'
            title='Escalations'
            setTitle={setTitle}
            Icon={PublishIcon}
          />
        </li>
        <li>
          <Link
            to='/messages'
            title='Messages'
            setTitle={setTitle}
            Icon={BsChatDotsFill}
          />
        </li>
        {user.isAdmin && (
          <li>
            <Link
              to='/reports'
              title='Reports'
              setTitle={setTitle}
              Icon={AssessmentIcon}
            />
          </li>
        )}
        <li>
          <Link
            to='/settings'
            title='Settings'
            setTitle={setTitle}
            Icon={IoSettingsSharp}
          />
        </li>
      </ul>
      <div className='navbar__bottom'>
        <button className='navbar__logoutButton' onClick={() => setOpen(true)}>
          <IoExitOutline className='navbar__link-icon' />
          Logout
        </button>
      </div>
      <Modal size='mini' open={open} onClose={() => setOpen(false)}>
        <Modal.Header>Logout</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to logout?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={() => logoutHandler(false)}>
            No
          </Button>
          <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText='Logout'
            onLogoutSuccess={() => logoutHandler(true)}
            render={renderProps => (
              <Button color='green' onClick={renderProps.onClick}>
                Yes
              </Button>
            )}
          ></GoogleLogout>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default Navbar;
