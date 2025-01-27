import React, { memo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _get from 'lodash/get'
import { Checkbox } from '@ufx-ui/core'

import { getAuthToken } from '../../redux/selectors/ws'
import WSActions from '../../redux/actions/ws'
import GAActions from '../../redux/actions/google_analytics'
import { getActiveAlgoOrders } from '../../redux/actions/ao'
import {
  isDevEnv,
  getAutoLoginState,
  updateAutoLoginState,
} from '../../util/autologin'

const INITIAL_AUTO_LOGIN = getAutoLoginState()

const General = () => {
  const dispatch = useDispatch()
  const settingsDms = useSelector(state => _get(state, 'ui.settings.dms', null))
  const settingsGa = useSelector(state => _get(state, 'ui.settings.ga', null))
  const settingsShowAlgoPauseInfo = useSelector(state => _get(state, 'ui.settings.showAlgoPauseInfo', null))
  const authToken = useSelector(getAuthToken)

  const [isAutoLoginChecked, setIsAutoLoginChecked] = useState(INITIAL_AUTO_LOGIN)
  const [isDmsChecked, setIsDmsChecked] = useState(settingsDms)
  const [isGaChecked, setIsGaChecked] = useState(settingsGa)
  const [isShowAlgoPauseInfoChecked, setIsShowAlgoPauseInfoChecked] = useState(settingsShowAlgoPauseInfo)

  useEffect(() => {
    setIsDmsChecked(settingsDms)
  }, [settingsDms])

  useEffect(() => {
    setIsGaChecked(settingsGa)
  }, [settingsGa])

  useEffect(() => {
    setIsShowAlgoPauseInfoChecked(settingsShowAlgoPauseInfo)
  }, [settingsShowAlgoPauseInfo])

  const updateDms = (nextDms) => {
    setIsDmsChecked(nextDms)
    dispatch(WSActions.send([
      'settings.update',
      authToken,
      nextDms,
      settingsGa,
      isShowAlgoPauseInfoChecked,
    ]))
    dispatch(getActiveAlgoOrders())
    dispatch(GAActions.updateSettings())
  }

  const updateGa = (nextGa) => {
    setIsGaChecked(nextGa)
    dispatch(WSActions.send([
      'settings.update',
      authToken,
      settingsDms,
      nextGa,
      isShowAlgoPauseInfoChecked,
    ]))
    dispatch(GAActions.updateSettings())
  }

  const updateAOPause = (nextAOPause) => {
    setIsShowAlgoPauseInfoChecked(nextAOPause)
    dispatch(WSActions.send([
      'settings.update',
      authToken,
      settingsDms,
      settingsGa,
      nextAOPause,
    ]))
    dispatch(GAActions.updateSettings())
  }

  return (
    <div>
      <div className='appsettings-modal__title'>
        General
      </div>
      <div className='appsettings-modal__setting'>
        <Checkbox
          onChange={updateDms}
          label='Dead Man Switch'
          checked={isDmsChecked}
          className='appsettings-modal__checkbox'
        />
        <div className='appsettings-modal__description'>
          <p>
            Enabling the Dead Man switch will automatically cancel all
            active orders when the application closes.
          </p>
          <p>
            Algorithmic orders are cancelled on application close;
            without the Dead Man switch, any atomic orders created by an
            AO will remain open, and state may be lost when the
            application is started up again.
          </p>
          <div className='appsettings-modal__warning'>
            Disabling this should be done with caution!
          </div>
        </div>
      </div>
      <div className='appsettings-modal__setting'>
        <Checkbox
          onChange={updateGa}
          label='Usage reporting'
          checked={isGaChecked}
          className='appsettings-modal__checkbox'
        />
      </div>
      <div className='appsettings-modal__setting'>
        <Checkbox
          onChange={updateAOPause}
          label='Show Algo Orders pause info'
          checked={isShowAlgoPauseInfoChecked}
          className='appsettings-modal__checkbox'
        />
        <div className='appsettings-modal__description'>
          If checked, the modal with explanations will be displayed when you close the app with active Algo Orders.
        </div>
      </div>
      {isDevEnv() && (
        <div className='appsettings-modal__setting'>
          <Checkbox
            label='Auto-login in development mode'
            checked={isAutoLoginChecked}
            onChange={(value) => {
              setIsAutoLoginChecked(value)
              updateAutoLoginState(value)
            }}
            className='appsettings-modal__checkbox'
          />
        </div>
      )}
    </div>
  )
}

export default memo(General)
