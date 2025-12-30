import React from 'react'
import { useLoaderData } from 'react-router-dom';
import { createExpense, deleteBudgetApi, deleteExpenseApi, fetchBudgets, fetchExpenses } from '../helper';
import BudgetItem from '../components/BudgetItem';
import AddExpenseForm from '../components/AddExpenseForm';
import Table from '../components/Table';
import { toast } from 'react-toastify';
// loader
export async function budgetLoader({params}){
   try {
    // 1. Fetch all data from the backend
    const budgets = await fetchBudgets();
    const expenses = await fetchExpenses();
    
    // 2. Find the specific budget by its MongoDB _id (params.id)
    const budget = budgets.find((b) => b._id === params.id);

    // 3. Filter expenses that belong to this budget
    const budgetExpenses = expenses.filter((e) => e.budgetId === params.id);

    if(!budget){
      throw new Error("The budget you are trying to find doesn't exist");
    }
    return {budget, expenses: budgetExpenses};
   } catch (e) {
    throw new Error("There was a problem loading your budget.");
   }
}

// action
export async function budgetAction({request}) {
  const data = await request.formData();
  const {_action, ...values} = Object.fromEntries(data)

    if (_action === "createExpense") {
    try {
      await createExpense({
       name: values.newExpense,
       amount: values.newExpenseAmount,
       budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created!`)
    } catch (e) {
      throw new Error("There was a problem creating your expense.")
    }
  }

    if (_action === "deleteBudget") {
      try {
        await deleteBudgetApi(values.budgetId);
        return toast.success("Budget deleted successfully!");
      } catch (e) {
        throw new Error("There was a problem deleting your budget.")
      }
    }

    if (_action === "deleteExpense") {
      try {
        await deleteExpenseApi(values.expenseId);
        return toast.success("Expense deleted!");
      } catch (e) {
        throw new Error("There was a problem deleting your expense.")
      }
    }
}
const BudgetPage = () => {
    const {budget, expenses} = useLoaderData();
  return (
    <div className='grid-lg'
     style={{
        "--accent": budget.color,
     }}
    >
        <h1 className='h2'>
            <span className='accent'>{budget.name} </span>
             Overview
        </h1>
        <div className='flex-lg'>
            <BudgetItem budget={budget} showDelete={true}/>
            <AddExpenseForm budgets={[budget]}/>
        </div>
        {
            expenses && expenses.length > 0 && (
                <div className='grid-md'>
                    <h2>
                        <span className='accent'>{budget.name} </span>
                        Expenses
                    </h2>
                    <Table expenses={expenses} showBudget={false}/>
                </div>
            )
        }
    </div>
  )
}

export default BudgetPage