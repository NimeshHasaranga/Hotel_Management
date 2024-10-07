const router =  require('express').Router();
let Leave = require('../models/Leave');

router.route("/add").post((req,res)=>{

    const empid = req.body.empid;
    const email = req.body.email;
    const startdate = Date.parse(req.body.startdate);
    const enddate = Date.parse(req.body.enddate);
    const reason = req.body.reason;


const newLeave = new Leave({
    
    empid,
    email,
    startdate,
    enddate,
    reason
})

    newLeave.save().then(()=>{

    res.json("Leave Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{

    Leave.find().then((leaves)=>{
        res.json(leaves)
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/update/:id").put(async(req,res)=>{

    let leaveID = req.params.id;
    const {empid,email,startdate,enddate,reason} = req.body;

    const updateLeave = {
        empid,
        email,
        startdate,
        enddate,
        reason
    }

    const update = await Leave.findByIdAndUpdate(leaveID,updateLeave).then(()=>{

        res.status(200).send({status:"Leave Updated"});

    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message});
        
    })
   
})

router.route("/delete/:id").delete(async(req,res)=>{

    let leaveID = req.params.id;

    await Leave.findByIdAndDelete(leaveID).then(()=>{
        res.status(200).send({status:"Leave Deleted"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with deleting leave",error:err.message});
    })

})

router.route("/get/:id").get(async(req,res)=>{

    let leaveID = req.params.id;
    const leave = await Leave.findById(leaveID).then((leave)=>{
        res.status(200).send({status:"Leave fetched",leave})

    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with get leave",error:err.message});
    })

})
module.exports = router