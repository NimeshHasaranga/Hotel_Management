const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors"); 
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config();


const PORT = process.env.PORT||8070;

app.use(cors());
app.use(bodyParser.json());


const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  //useNewUrlParser: true,
  // useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection success!");
})

const EmployeeRouter = require("./routes/Employees.js");
app.use("/employee", EmployeeRouter);

const LeaveRouter = require("./routes/Leaves.js");
app.use("/leave", LeaveRouter);

const customerRouter = require("./routes/customers.js");
const roomRouter = require("./routes/rooms.js");

app.use("/customer",customerRouter);
app.use("/room", roomRouter);

app.use("/api/items",require("./routes/itemRoutes"));
app.use("/api/users",require("./routes/userRoutes"));
app.use("/api/bills",require("./routes/billsRoutes"));


app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})  