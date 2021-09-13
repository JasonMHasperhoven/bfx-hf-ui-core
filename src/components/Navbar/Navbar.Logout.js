import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import WSActions from '../../redux/actions/ws'

const propTypes = {}

const defaultProps = {}

export default function NavbarLogout(props) {
  const dispatch = useDispatch()

  const logout = () => dispatch(WSActions.send([
    'auth.logout',
  ]))

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
