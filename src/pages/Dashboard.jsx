// rrd imports
import { Link, useLoaderData, useNavigation } from "react-router-dom";

// library imports
import { toast } from "react-toastify";

// components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

//  helper functions
import { createBudget, createExpense, deleteExpenseApi, fetchBudgets, fetchExpenses, loginUser,} from "../helper"

// loader
export async function dashboardLoader() {
  const userName = JSON.parse(localStorage.getItem("userName"));
  const token = localStorage.getItem("token");
// If no token exists, the user isn't logged in, so we show the Intro
  if(!token) return {userName: null};

  try {
    // Fetch live data from MongoDB via the helpers we created
    const budgets = await fetchBudgets();
    const expenses = await fetchExpenses();
    return {userName, budgets, expenses};
  } catch (e) {
    // If the token is invalid or expired, clear storage to force a re-login
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    return {userName: null};
  }
}

// action
export async function dashboardAction({ request }) {

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data)

  // 1. Handle Login
  if (_action === "login") {
    try {
      await loginUser(values.email, values.password);
      return toast.success(`Welcome back!`);
    } catch (e) {
      return toast.error(e.response?.data?.msg || "Invalid credentials.");
    }
  }
// 2. Handle Registration
  if (_action === "register") {
    try {
      await registerUser(values.userName, values.email, values.password);
      return toast.success(`Account created! Please login.`);
    } catch (e) {
      return toast.error(e.response?.data?.msg || "Registration failed.");
    }
  }
// 3. Create Budget
  if (_action === "createBudget") {
    try {
      await createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Budget created!");
    } catch (e) {
      throw new Error("There was a problem creating your budget.")
    }
  }
// 4. Create Expense
  if (_action === "createExpense") {
    try {
      await createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (e) {
      throw new Error("There was a problem creating your expense.")
    }
  }
  // 5. Delete Expense
  if (_action === "deleteExpense") {
    try {
      await deleteExpenseApi(values.expensesId);
      return toast.success("Expense Deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.")
    }
  }
}

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData()
  const navigation = useNavigation();
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>Welcome back, <span className="accent">{userName}</span></h1>
          <div className="grid-sm">
            {
              budgets && budgets.length > 0
                ? (
                  <div className="grid-lg">
                    <div className="flex-lg">
                      <AddBudgetForm />
                      <AddExpenseForm budgets={budgets} />
                    </div>
                    <h2>Existing Budgets</h2>
                    <div className="budgets">
                      {
                        budgets.map((budget) => (
                          <BudgetItem key={budget._id} budget={budget} />
                        ))
                      }
                    </div>
                    {
                      expenses && expenses.length > 0 && (
                        <div className="grid-md">
                          <h2>Recent Expenses</h2>
                          <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt).slice(0, 8)}
                          />
                          {expenses.length > 8 && (
                            <Link
                              to="expenses"
                              className="btn btn--dark"
                            >
                            View all expenses
                            </Link>
                          )}
                        </div>
                      )
                    }
                  </div>
                )
                : (
                  <div className="grid-sm">
                    <p>Personal budgeting is the secret to financial freedom.</p>
                    <p>Create a budget to get started!</p>
                    <AddBudgetForm />
                  </div>
                )
            }
          </div>
        </div>
      ) : <Intro />}
    </>
  )
}
export default Dashboard