import { connect } from 'react-redux'
import Debug from 'debug'

import { getAuthToken } from '../../redux/selectors/ws'
import WSActions from '../../redux/actions/ws'
import GAActions from '../../redux/actions/google_analytics'

import AtomicOrdersTable from './AtomicOrdersTable'
import { getFilteredAtomicOrders } from '../../redux/selectors/ui'

const debug = Debug('hfui:c:atomic-orders-table')

const mapStateToProps = (state = {}) => ({
  authToken: getAuthToken(state),
  filteredAtomicOrders: getFilteredAtomicOrders(state),
})

const mapDispatchToProps = dispatch => ({
  cancelOrder: (authToken, order) => {
    const { id, symbol } = order

    debug('cancelling order %d [%s]', id, symbol)
    dispatch(WSActions.send(['order.cancel', authToken, 'bitfinex', symbol, id]))
  },
  gaCancelOrder: () => {
    dispatch(GAActions.cancelAtomicOrder())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AtomicOrdersTable)
