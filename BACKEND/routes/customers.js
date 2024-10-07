const router = require('express').Router();
let Customer = require('../models/customer');

router.route("/add").post((req, res) => {
    const {
        name, contactNumber, email, gender, nationality, address,
        nicPassport, checkInDate, roomType, roomNumber, price
    } = req.body;

    const newCustomer = new Customer({
        name,
        contactNumber,
        email,
        gender,
        nationality,
        address,
        nicPassport,
        checkInDate,
        roomType,
        roomNumber,
        price
    });

    newCustomer.save()
        .then(() => res.json("Customer Added"))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").get((req, res) => {
    Customer.find()
        .then(customers => res.json(customers))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    const {
        name, contactNumber, email, gender, nationality, address,
        nicPassport, checkInDate, roomType, roomNumber, price
    } = req.body;

    const updateCustomer = {
        name,
        contactNumber,
        email,
        gender,
        nationality,
        address,
        nicPassport,
        checkInDate,
        roomType,
        roomNumber,
        price
    };

    await Customer.findByIdAndUpdate(userId, updateCustomer)
        .then(() => res.status(200).send({status: "Customer Updated"}))
        .catch((err) => res.status(400).send({status:"Error updating customer", error: err.message}));
});

router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Customer.findByIdAndDelete(userId)
        .then(() => res.status(200).send({status: "Customer deleted"}))
        .catch((err) => res.status(500).send({status: "Error deleting customer", error: err.message}));
});

router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    await Customer.findById(userId)
        .then((customer) => res.status(200).send({status: "Customer fetched", customer}))
        .catch((err) => res.status(500).send({status: "Error fetching customer", error: err.message}));
});

module.exports = router;
