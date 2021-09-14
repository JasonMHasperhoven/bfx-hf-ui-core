import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import WSActions from '../../redux/actions/ws'
import getNotifications from '../../redux/selectors/ws/get_notifications'

const propTypes = {}

const defaultProps = {}

export default function NavbarLogout(props) {
  const dispatch = useDispatch()
  const notifications = useSelector(getNotifications)

  const logout = () => dispatch(WSActions.send([
    'auth.logout',
  ]))

  useEffect(() => {
    const logoutSuccess = notifications.some(notification => notification.status === 'success'
      && notification.message === 'Closing session...')

    const authTimeout = notifications.some(notification => notification.status === 'error'
      && notification.message === 'Authentication timeout')

    if (logoutSuccess || authTimeout) {
      // logout
    }
  }, [notifications])

  return (
    <button
      type='button'
      className='hfui-navbar__logout hfui-exchangeinfobar__button'
      onClick={logout}
    >
      Logout
    </button>
  )
}

NavbarLogout.propTypes = propTypes
NavbarLogout.defaultProps = defaultProps
