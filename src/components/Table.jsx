// component import
import ExpenseItem from "./ExpenseItem"

const Table = ({ expenses, budgets = [], showBudget = true }) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {
              ["Name", "Amount", "Date", showBudget ? "Budget" : "", ""].map((i, index) => (
                <th key={index}>{i}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense) => (
              <tr key={expense._id}>
                <ExpenseItem expense={expense} budgets={budgets} showBudget={showBudget}/>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
export default Table