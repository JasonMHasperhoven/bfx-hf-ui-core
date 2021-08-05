import React from 'react'

const STYLES = {
  amount: { justifyContent: 'flex-end' },
  price: { justifyContent: 'flex-end' },
}

export default (authToken, cancelOrder, gaCancelOrder, { width }) => [{
  label: '',
  dataKey: '',
  width: 15,
  flexGrow: 0.15,
  cellRenderer: ({ rowData = {} }) => ( // eslint-disable-line
    <div className={`row-marker ${rowData.amount < 0 ? 'red' : 'green'} ${width < 700 ? 'stick' : ''} ${width < 450 ? 'stick2' : ''}`} />
  ),
  disableSort: true,
}, {
  label: 'Pair',
  dataKey: 'symbol',
  width: 145,
  flexGrow: 1.45,
  cellRenderer: ({ rowData = {} }) => rowData.uiID,
}, {
  label: 'Type',
  dataKey: 'type',
  width: 120,
  flexGrow: 1.2,
  cellRenderer: ({ rowData = {} }) => rowData.type,
}, {
  label: 'Created',
  dataKey: 'created',
  width: 155,
  flexGrow: 1.5,
  cellRenderer: ({ rowData = {} }) => new Date(+rowData.created).toLocaleString(),
}, {
  label: 'Amount',
  dataKey: 'amount',
  width: 100,
  flexGrow: 1,
  headerStyle: STYLES.amount,
  style: STYLES.amount,
  cellRenderer: ({ rowData = {} }) => ( // eslint-disable-line
    <span className={rowData.amount < 0 ? 'hfui-red' : 'hfui-green'}>{rowData.amount}</span>
  ),
}, {
  label: 'Price',
  dataKey: 'price',
  width: 100,
  flexGrow: 1,
  headerStyle: STYLES.price,
  style: STYLES.price,
  cellRenderer: ({ rowData = {} }) => rowData.price,
}, {
  label: 'Status',
  dataKey: 'status',
  width: 100,
  flexGrow: 1,
  cellRenderer: ({ rowData = {} }) => rowData.status,
}, {
  dataKey: 'cid',
  width: 40,
  flexGrow: 0.4,
  cellRenderer: ({ rowData = {} }) => ( // eslint-disable-line
    <div className='icons-cell'>
      <i
        role='button'
        aria-label='Cancel order'
        tabIndex={0}
        className='icon-cancel'
        onClick={() => {
          cancelOrder(authToken, rowData)
          gaCancelOrder()
        }}
      />
    </div>
  ),
  disableSort: true,
}]
