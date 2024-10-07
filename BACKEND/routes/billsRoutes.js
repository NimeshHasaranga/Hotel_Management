const express = require('express');
const router = express.Router();
const { 
    addBillsController, 
    getBillsController, 
    deleteBillController 
} = require('../controllers/billsController');

// Route to add a bill
router.post("/add-bills", addBillsController);

// Route to get all bills
router.get("/get-bills", getBillsController);

// Route to delete a bill by ID
router.delete("/delete-bills/:id", deleteBillController);

module.exports = router;
