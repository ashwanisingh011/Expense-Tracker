import React from 'react'
import { formatCurrency, formateDateToLocalString, getAllMatchingItems } from '../helper'
import { Link, useFetcher } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/solid';

const ExpenseItem = ({expense, budgets = [], showBudget}) => {
  const fetcher = useFetcher();

  const { _id, name, amount, createdAt, budgetId} = expense;

  const budget = budgets.find((b) => b._id === budgetId);
  return (
    <>
        <td>{name}</td>
        <td>{formatCurrency(amount)}</td>
        <td>{formateDateToLocalString(createdAt)}</td>
        {showBudget && (
           <td>
          <Link 
            to={`/budget/${budget._id}`}
            style={{
              "--accent": budget.color
            }}
          >
            {budget.name}
          </Link>
        </td>
        )}
       
        <td>
          <fetcher.Form method="post">
            <input type="hidden" name='_action' value="deleteExpense" />
            <input type="hidden" name='expenseId' value={_id} />
            <button
              type='submit'
              className='btn btn--warning'
              aria-label={`Delete ${name} expense`}
            >
              <TrashIcon width={20}/>
            </button>
          </fetcher.Form>
        </td>
    </>
  )
}

export default ExpenseItem