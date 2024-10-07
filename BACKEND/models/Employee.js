const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
// validation part for email 
const emailValidator = function(email) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  // validation part for NIC
  const nicValidator = function(nic) {
    const nicRegex = /^([0-9]{9}[vVxX]|[0-9]{12})$/;
    return nicRegex.test(nic);
  };

  // validation part for mobile
  const mobileValidator = function(mobile) {
    return /^[0-9]{10}$/.test(mobile.toString());
  };

  */
const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        //validate: {
        //  validator: emailValidator,
        //  message: props => `${props.value} is not a valid email address!`
        //}
    },  
    mobile: {
        type: Number,
        required: true,
        unique: true,
       // validate: {
       //  validator: mobileValidator,
       // message: props => `${props.value} is not a valid mobile number! It must be a 10-digit number.`
   // }
    },

   nic: {
    type: String,
    required: true,
    unique: true,
   // validate: {
    //  validator: nicValidator,
    //  message: props => `${props.value} is not a valid NIC number!`
    //}
    },

    designation:{
        type: String,
        required: true
    },

    basicsal:{
        type: Number,
        required: true
    },

    empid:{
        type: String,
        required: true,
        unique: true
    }
    


})

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee