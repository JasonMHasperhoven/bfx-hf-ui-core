import React from 'react'
import { preparePrice, prepareAmount } from 'bfx-api-node-util'
import { processBalance } from '../../util/ui'

const STYLES = {
  rightAlign: { justifyContent: 'flex-end' },
}

export default ({ authToken, closePosition }) => [{
  label: 'Pair',
  dataKey: 'symbol',
  width: 145,
  flexGrow: 2,
  cellRenderer: ({ rowData = {} }) => rowData.uiID,
}, {
  label: 'Amount',
  dataKey: 'amount',
  width: 120,
  flexGrow: 1.5,
  headerStyle: STYLES.rightAlign,
  style: STYLES.rightAlign,
  cellRenderer: ({ rowData = {} }) => (rowData.amount < 0 // eslint-disable-line
    ? <span className='hfui-red'>{processBalance(prepareAmount(rowData.amount))}</span>
    : <span className='hfui-green'>{processBalance(prepareAmount(rowData.amount))}</span>
  ),
}, {
  label: 'Base Price',
  dataKey: 'basePrice',
  width: 100,
  flexGrow: 1,
  headerStyle: STYLES.rightAlign,
  style: STYLES.rightAlign,
  cellRenderer: ({ rowData = {} }) => processBalance(preparePrice(rowData.basePrice)),
}, {
  label: 'Liq Price',
  dataKey: 'liquidationPrice',
  width: 100,
  flexGrow: 1,
  headerStyle: STYLES.rightAlign,
  style: STYLES.rightAlign,
  cellRenderer: ({ rowData = {} }) => processBalance(preparePrice(rowData.liquidationPrice)),
}, {
  label: 'P/L',
  dataKey: 'pl',
  width: 100,
  flexGrow: 1,
  headerStyle: STYLES.rightAlign,
  style: STYLES.rightAlign,
  cellRenderer: ({ rowData = {} }) => ( // eslint-disable-line
    <span className={rowData.pl < 0 ? 'hfui-red' : 'hfui-green'}>
      {processBalance(preparePrice(rowData.pl))}
    </span>
  ),
}, {
  label: 'P/L %',
  dataKey: 'plPerc',
  width: 100,
  flexGrow: 1,
  headerStyle: STYLES.rightAlign,
  style: STYLES.rightAlign,
  cellRenderer: ({ rowData = {} }) => ( // eslint-disable-line
    <span className={rowData.plPerc && rowData.plPerc < 0 ? 'hfui-red' : 'hfui-green'}>
      {(rowData.plPerc || 0).toFixed(4)}
    </span>
  ),
}, {
  label: 'Funding Cost',
  dataKey: 'marginFunding',
  width: 100,
  flexGrow: 1,
  headerStyle: STYLES.rightAlign,
  style: STYLES.rightAlign,
  cellRenderer: ({ rowData = {} }) => processBalance(preparePrice(rowData.marginFunding)),
}, {
  dataKey: 'order_cid',
  width: 100,
  flexGrow: 1,
  cellRenderer: ({ rowData = {} }) => ( // eslint-disable-line
    <div className='icons-cell'>
      <i
        role='button'
        aria-label='Remove position'
        tabIndex={0}
        className='icon-cancel'
        onClick={() => closePosition(authToken, rowData)}
      />
    </div>
  ),
  disableSort: true,
}]
