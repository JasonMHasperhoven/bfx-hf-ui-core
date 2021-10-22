import React, { memo } from 'react'
import PropTypes from 'prop-types'
import _isEmpty from 'lodash/isEmpty'
import { useTranslation } from 'react-i18next'

import Panel from '../../ui/Panel'
import PositionsTable from '../PositionsTable'
import AtomicOrdersTable from '../AtomicOrdersTable'
import AlgoOrdersTable from '../AlgoOrdersTable'
import BalancesTable from '../BalancesTable'
import MarketSelect from '../MarketSelect'
import TabTitle from './TabTitle'
import './style.css'

const TradingStatePanel = ({
  dark, onRemove, moveable, removeable, getPositionsCount, getAtomicOrdersCount, getAlgoOrdersCount, markets, savedState, updateState,
  layoutID, layoutI,
}) => {
  const { currentMarket: activeFilter = {} } = savedState
  const positionsCount = getPositionsCount(activeFilter)
  const atomicOrdersCount = getAtomicOrdersCount(activeFilter)
  const algoOrdersCount = getAlgoOrdersCount(activeFilter)
  const { t } = useTranslation()

  const saveState = (param, value) => {
    updateState(layoutID, layoutI, {
      [param]: value,
    })
  }

  const setActiveFilter = (market) => {
    saveState('currentMarket', market)
  }

  return (
    <Panel
      label={t('tradingStatePanel.title')}
      dark={dark}
      darkHeader={dark}
      className='hfui-tradingstatepanel__wrapper'
      moveable={false}
      removeable={false}
      extraIcons={[_isEmpty(activeFilter) ? (
        <MarketSelect
          key='filter-market'
          markets={markets}
          value={activeFilter}
          onChange={setActiveFilter}
          renderWithFavorites
        />
      ) : (
        <div key='filter-market' onClick={() => setActiveFilter({})} className='hfui-tspanel-header-button active'>
          <i className='icon-filter-active' />
          <p>{activeFilter.uiID}</p>
        </div>
      ), (
        <div key='filter-by'>
          <p className='hfui-uppercase'>
            {`${_isEmpty(activeFilter) ? t('tradingStatePanel.filterBy') : t('tradingStatePanel.filteringBy')}:`}
          </p>
        </div>
      )]}
    >
      <Panel
        onRemove={onRemove}
        moveable={moveable}
        removeable={removeable}
        forcedTab={savedState.tab}
        onTabChange={(tab) => saveState('tab', tab)}
        darkHeader
      >
        <PositionsTable
          renderedInTradingState
          htmlKey='Positions'
          tabtitle={<TabTitle heading={t('tradingStatePanel.positionsTab')} count={positionsCount} />}
          activeFilter={activeFilter}
        />
        <AtomicOrdersTable
          renderedInTradingState
          htmlKey='Atomics'
          tabtitle={<TabTitle heading={t('tradingStatePanel.atomicsTab')} count={atomicOrdersCount} />}
          activeFilter={activeFilter}
        />
        <AlgoOrdersTable
          renderedInTradingState
          htmlKey='Algos'
          tabtitle={<TabTitle heading={t('tradingStatePanel.algosTab')} count={algoOrdersCount} />}
          activeFilter={activeFilter}
        />
        <BalancesTable
          renderedInTradingState
          htmlKey='Balances'
          tabtitle={t('tradingStatePanel.balancesTab')}
          hideZeroBalances
          activeFilter={activeFilter}
        />
      </Panel>
    </Panel>
  )
}

TradingStatePanel.propTypes = {
  dark: PropTypes.bool,
  moveable: PropTypes.bool,
  onRemove: PropTypes.func,
  removeable: PropTypes.bool,
  getPositionsCount: PropTypes.func,
  getAtomicOrdersCount: PropTypes.func,
  getAlgoOrdersCount: PropTypes.func,
  markets: PropTypes.objectOf(PropTypes.object).isRequired,
  savedState: PropTypes.shape({
    currentMarket: PropTypes.shape({
      base: PropTypes.string,
      quote: PropTypes.string,
    }),
    tab: PropTypes.number,
  }),
  updateState: PropTypes.func.isRequired,
  layoutI: PropTypes.string.isRequired,
  layoutID: PropTypes.string,
}

TradingStatePanel.defaultProps = {
  dark: true,
  moveable: false,
  removeable: false,
  getPositionsCount: () => { },
  getAtomicOrdersCount: () => { },
  getAlgoOrdersCount: () => { },
  onRemove: () => { },
  savedState: {},
  layoutID: '',
}

export default memo(TradingStatePanel)
