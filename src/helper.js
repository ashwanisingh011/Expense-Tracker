import api from "./api/axios.config"

// FORMATTING (keep these as they are local logic)

export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "INR"
  });
};

export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

export const formateDateToLocalString = (epoch) => new Date(epoch).toLocaleDateString();

export const calculateSpentByBudget = (budgetId, expenses = []) => {
  const budgetExpenses = expenses.filter(
    (expenses) => expenses.budgetId === budgetId 
  );
  const amountSpent = budgetExpenses.reduce((acc, expenses) => {
    return (acc += expenses.amount);
  }, 0);
  return amountSpent;
}

export const getAllMatchingItems = ({category, key, value, data}) => {
  if(!data) return [];
  return data.filter((item)=> item[key] === value);
}

// NEW API FUNCTIONS
// Get all budgets
export const fetchBudgets = async () => {
  const response = await api.get('/budgets');
  return response.data;
}

// Create budget
export const createBudget = async ({name, amount}) => {
  // Generate random color locally before sending
  const existingBudgets = await fetchBudgets();
  const color = `${existingBudgets.length * 34} 65% 50%`;
  
  const response = await api.post('/budgets', {name, amount, color});
  return response.data;
};

// Create Expense
export const createExpense = async ({name, amount, budgetId}) => {
  const response = await api.post('/expenses', {name, amount, budgetId});
  return response.data;
}

// Get all expenses
export const fetchExpenses = async () => {
  const response = await api.get('/expenses');
  return response.data;
};


export const deleteBudgetApi = async (id) => {
  const response = await api.delete(`/budgets/${id}`);
  return response.data;
};


export const deleteExpenseApi = async (id) => {
  const response = await api.delete(`/expenses/${id}`);
  return response.data;
};

// AUTH HELPERS
export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login', {email, password});
  if(response.data.token){
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userName', JSON.stringify(response.data.userName));
  }
  return response.data;
};

export const registerUser = async(userName, email, password) => {
  const response = await api.post('/auth/register', {userName, email, password});
  return response.data;
}