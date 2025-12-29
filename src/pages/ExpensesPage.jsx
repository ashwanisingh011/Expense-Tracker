/* eslint-disable react-refresh/only-export-components */
// rrd imports
import { useLoaderData } from "react-router-dom";

// component imports
import Table from "../components/Table";

// helpers
import { deleteExpenseApi, fetchExpenses } from "../helper";
import { toast } from "react-toastify";

// loader
export async function expensesLoader() {
  try {
    // Fetching all expenses from the backend API
    const expenses = await fetchExpenses();
    return {expenses}
  } catch (e) {
    throw new Error("Could not load expenses.");
  }
}

// action
export async function expensesAction({request}) {
  const data = await request.formData();
  const {_action, ...values} = Object.fromEntries(data)


    if (_action === "deleteExpense") {
      try {
        // Calling the backend API to delete the specific expense by its MongoDB _id
        await deleteExpenseApi(values.expensesId);
        return toast.success("Expense Deleted");
      } catch (e) {
        throw new Error("There was a problem deleting your expense.");
      }
    }
}

const ExpensesPage = () => {
  const { expenses } = useLoaderData();

  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>No Expenses to show</p>
      )}
    </div>
  );
};

export default ExpensesPage;