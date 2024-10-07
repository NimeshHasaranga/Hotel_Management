const router =  require('express').Router();
let Employee = require('../models/Employee');


//create part
//psot() -a http request method
// we dont use get method because lack of security



router.route("/add").post((req,res)=>{
// when this method called the things inside will esecute

    const name = req.body.name;
    const email = req.body.email;
    const mobile = Number(req.body.mobile);
    const nic = req.body.nic;
    const designation = req.body.designation;
    const basicsal = Number(req.body.basicsal);
    const empid = req.body.empid;


    const newEmployee = new Employee({

        name,
        email,
        mobile,
        nic,
        designation,
        basicsal,
        empid
    })

    //exception handling
    newEmployee.save().then(()=>{
        res.json("Employee Added")
    }).catch((err)=>{
        console.log(err);

    })

})


router.route("/").get((req,res)=>{

    Employee.find().then((employees)=>{
        res.json(employees)
    }).catch((err)=>{
        console.log(err);
    })
})
    


router.route("/update/:id").put(async(req,res)=>{

    let userID = req.params.id;

    //destructure
    const {name,email,mobile,nic,designation,basicsal,empid} = req.body;

    const updateEmployee = {
        name,
        email,
        mobile,
        nic,
        designation,
        basicsal,
        empid
    }

    //await function will wait for that function to finish
    const update = await Employee.findByIdAndUpdate(userID,updateEmployee).then(()=>{

        res.status(200).send({status:"Employee Updated"});

    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message});
        
    })
   
})

router.route("/delete/:id").delete(async(req,res)=>{
    let userID = req.params.id;
    await Employee.findByIdAndDelete(userID).then(()=>{
        res.status(200).send({status:"Employee Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with deleting employee",error:err.message});
    })
})  

router.route("/get/:id").get(async(req,res)=>{
    let userID = req.params.id;
    const user = await Employee.findById(userID)
        .then((employee)=>{
            res.status(200).send({status:"Employee fetched",employee})
        }).catch(()=>{
        console.log(err.message);    
            res.status(500).send({status:"Error with get employee",error:err.message});
    })
})
// Assuming you are adding this to the existing router file

router.route("/login").post(async (req, res) => {
    const { email, mobile } = req.body;
  
    try {
      // Find the employee by email
      const employee = await Employee.findOne({ email });
  
      // Check if employee exists and if mobile matches
      if (employee && employee.mobile === Number(mobile)) {
        return res.status(200).json({ employee });
      } else {
        return res.status(404).json({ message: 'Invalid email or mobile number' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports = router