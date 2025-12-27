const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget.js');
const auth = require('../middleware/auth.js');



// @route GET api/budgets
// @desc Get all budgets for the logged in user

router.get('/', auth, async(req, res)=>{
    try {
        const budgets = await Budget.find({user: req.user.id}).sort({createdAt: -1});
        res.json(budgets);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route POST api/budgets
// @desc Create a new budget
router.post('/', auth, async (req, res)=> {
    const {name, amount, color} = req.body;

    try {
        const newBudget = new Budget({
            name,
            amount,
            color,
            user: req.user.id 
        });
        const budget = await newBudget.save();
        res.json(budget)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route Delete api/budgets/:id
// @desc Delete a budget and all its associated expenses

router.delete('/:id', auth, async(req, res)=>{
    try {
        const budget = await Budget.findById(req.params.id);
        if(!budget){
            return res.status(404).json({msg: "Budget not found"})
        }
        // Check user ownership
        if(budget.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'User not authorized'});
        }
        // Delete associated expense first
        await Expense.deleteMany({budgetId: req.params.id });

        // Delete budget
        await budget.deleteOne();
        res.json({msg: 'Budget and associated expenses removed'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


module.exports = router;