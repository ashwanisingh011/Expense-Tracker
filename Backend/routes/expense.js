const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Expense = require('../models/Expense');


// @route GET api/expenses
// @desc Get all expenses for the logged in user

router.get('/', auth, async(req, res) => {
    try {
        // We sort by createdAt: -1 to show the most recent expenses first
        const expenses = await Expense
        .find({user: req.user.id})
        .sort({createdAt: -1});
        res.json(expenses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route POST api/expenses
// @desc Create a new expense

router.post('/', auth, async(req, res) => {
    const {name, amount, budgetId} = req.body;

    try {
        const newExpense = new Expense({
            name,
            amount,
            budgetId,
            user: req.user.id 
        });
        const expense = await newExpense.save();
        res.json(expense);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route DELETE api/expenses/:id
// @desc Delete an expense

router.delete('/:id', auth, async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if(!expense){
            return res.status(404).json({msg: 'Expense not found'});
        }
        // Security Check: Ensure the user deleteing the expense is the owner
        if(expense.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'User not authorized'});
        }
        await expense.deleteOne();
        res.json({msg: 'Expense removed'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;