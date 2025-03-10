import Decimal from 'decimal.js'
import {FormatNumericRangeToParts} from '../NumberFormat/FormatNumericRangeToParts'
import {getInternalSlots} from './utils'
import {describe, expect, it} from 'vitest'
describe('FormatNumericRangeToParts', () => {
  const numberFormat: Intl.NumberFormat = new Intl.NumberFormat('it')

  it('correctly return numeric range', () => {
    const result = FormatNumericRangeToParts(
      numberFormat,
      new Decimal(3),
      new Decimal(10),
      {
        getInternalSlots,
      }
    )

    expect(result).toMatchObject([
      {result: '0', source: 'startRange', type: 'integer', value: '3'},
      {result: '1', source: 'shared', type: 'literal', value: '-'},
      {result: '2', source: 'endRange', type: 'integer', value: '10'},
    ])
  })

  it('correctly return numeric range with single negative number', () => {
    const result = FormatNumericRangeToParts(
      numberFormat,
      new Decimal(-3),
      new Decimal(10),
      {
        getInternalSlots,
      }
    )

    expect(result).toMatchObject([
      {result: '0', source: 'startRange', type: 'minusSign', value: '-'},
      {result: '1', source: 'startRange', type: 'integer', value: '3'},
      {result: '2', source: 'shared', type: 'literal', value: '-'},
      {result: '3', source: 'endRange', type: 'integer', value: '10'},
    ])
  })

  it('correctly return numeric range with both negative numbers', () => {
    const result = FormatNumericRangeToParts(
      numberFormat,
      new Decimal(-10),
      new Decimal(-3),
      {
        getInternalSlots,
      }
    )

    expect(result).toMatchObject([
      {result: '0', source: 'startRange', type: 'minusSign', value: '-'},
      {result: '1', source: 'startRange', type: 'integer', value: '10'},
      {result: '2', source: 'shared', type: 'literal', value: '-'},
      {result: '3', source: 'endRange', type: 'minusSign', value: '-'},
      {result: '4', source: 'endRange', type: 'integer', value: '3'},
    ])
  })
})
