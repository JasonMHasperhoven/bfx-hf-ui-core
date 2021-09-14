import React from 'react'
import { useDispatch } from 'react-redux'
import cx from 'classnames'

import HFIcon from '../../ui/HFIcon'
import UIActions from '../../redux/actions/ui'
import NavbarLink from './Navbar.Link'
import NavbarButton from './Navbar.Button'
import SwitchMode from '../SwitchMode'

import LayoutSettings from './Navbar.LayoutSettings'
import AppSettings from './Navbar.AppSettings'
import Logout from './Navbar.Logout'
import Routes from '../../constants/routes'
import { isElectronApp } from '../../redux/config'

import './style.css'

const Navbar = () => {
  const dispatch = useDispatch()

  return (
    <div className='hfui-navbar__wrapper'>
      <HFIcon className='hfui-navbar__logo' />
      <ul className='hfui-navbar__main-links'>
        {Object.values(Routes).map(({ path, label }) => (
          <li key={path}>
            <NavbarLink
              route={path}
              label={label}
            />
          </li>
        ))}
      </ul>
      <div className='hfui-tradingpage__menu'>
        <div
          className={cx('hfui-exchangeinfobar__buttons', {
            'is-web': !isElectronApp,
          })}
        >
          <LayoutSettings />
          <NavbarButton
            alt='Notifications'
            icon='notifications'
            onClick={() => dispatch(UIActions.switchNotifcationPanel())}
          />
          {isElectronApp && <AppSettings />}
          {!isElectronApp && <Logout />}
        </div>
        {isElectronApp && (
          <div className='hfui-tradingpaper__control'>
            <div className='hfui-tradingpaper__control-toggle'>
              <p>Paper Trading</p>
              <SwitchMode />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
