const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaveSchema = new Schema({
    empid:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },
    startdate:{
        type: Date,
        required: true
    },
    enddate:{
        type: Date,
        required: true
    },
    reason:{
        type: String,
        required: true
    },
    
})

const Leave = mongoose.model('Leave', leaveSchema);
module.exports = Leave