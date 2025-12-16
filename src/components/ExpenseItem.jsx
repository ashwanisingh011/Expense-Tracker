import React from 'react'
import { formatCurrency, formateDateToLocalString } from '../helper'

const ExpenseItem = ({expense}) => {
  return (
    <>
        <td>{expense.name}</td>
        <td>{formatCurrency(expense.amount)}</td>
        <td>{formateDateToLocalString(expense.createdAt)}</td>
    </>
  )
}

export default ExpenseItem