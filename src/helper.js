export const wait = () => new Promise(res => setTimeout(res, Math.random() * 2000))

// colors
const generateRandomColor = () => {
    const exisitingBudgetLength = fetchData("budgets") ?. length ?? 0;
    return `${exisitingBudgetLength * 34} 65% 50%`
}



// Local storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

// create budget
export const createBudget = ({
    name, amount
}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor() 
    }
    const exisitingBudgets = fetchData("budgets") ?? []
    return localStorage.setItem("budgets", JSON.stringify([...exisitingBudgets, newItem]))
}


// delete item
export const deleteItem = ({key})=>{
    return localStorage.removeItem(key)
}
