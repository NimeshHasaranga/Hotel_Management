import React, {useState} from "react";
import axios from 'axios';
import{motion,AnimatePresence} from 'framer-motion';

export default function AddEmployee(){

    const formContainerStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '900px',
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      };
    
      const formGridStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr', // Two columns
        gap: '15px',
      };
    
      const labelStyle = {
        color: '#333333',
        fontWeight: 'bold',
      };
    
      const inputStyle = {
        backgroundColor: '#f2f2f2',
        border: '1px solid #cccccc',
        borderRadius: '5px',
        padding: '10px',
        color: '#333333',
        width: '100%',
      };
    
      const buttonStyle = {
        backgroundColor: '#800000',
        color: '#ffffff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '15px',
        alignSelf: 'flex-end', // Align button to the right
      };
    
      const buttonHoverStyle = {
        backgroundColor: '#b30000',
      };
    
      const alertStyle = {
        backgroundColor: '#ffffff',
        color: '#800000',
        padding: '10px',
        borderRadius: '5px',
        marginTop: '20px',
        textAlign: 'center',
        position: 'fixed',
        top: '20px',
        right: '20px', // Positioned from the right side
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        zIndex: 1000, // Ensure it's on top of other elements
        width: '300px',};

        const[isHovering, setIsHovering] = useState(false);
        const[showAlert, setShowAleart] = useState(false);
        const[alertMessage, setAlertMessage] = useState("");





    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[mobile, setMobile] = useState("");
    const[nic, setNic] = useState("");
    const[designation, setDesignation] = useState("");
    const[basicsal, setBasicsal] = useState("");
    const[empid, setEmpid] = useState("");

    function sendData(e){
        e.preventDefault();

        if (!/^[A-Za-z]+$/.test(name)) {
          setAlertMessage("Name can only contain letters.");
          setShowAleart(true);
          setTimeout(() => setShowAleart(false), 3000);
          return; // Stop the form submission
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
          setAlertMessage("Please enter a valid email address.");
          setShowAleart(true);
          setTimeout(() => setShowAleart(false), 3000);
          return; // Stop the form submission
      }

      if (!/^\d{10}$/.test(mobile)) {
        setAlertMessage("Mobile number must contain exactly 10 digits and cannot include letters, symbols, or decimals.");
        setShowAleart(true);
        setTimeout(() => setShowAleart(false), 3000);
        return; // Stop the form submission
    }

    if (!/^(?:\d{9}[vV]|\d{12})$/.test(nic)) {
      setAlertMessage("NIC must be in the format 000000000V or 000000000000, with no letters or symbols.");
      setShowAleart(true);
      setTimeout(() => setShowAleart(false), 3000);
      return; // Stop the form submission
  }
  if (!Number.isInteger(Number(basicsal)) || basicsal <= 0) {
    setAlertMessage("Basic salary must be a positive whole number without letters or symbols.");
    setShowAleart(true);
    setTimeout(() => setShowAleart(false), 3000);
    return; // Stop the form submission
}

        const newEmployee = {
            name,
            email,
            mobile,
            nic,
            designation,
            basicsal,
            empid
        }

        axios.post("http://localhost:8070/employee/add", newEmployee).then(()=>{
            setAlertMessage("Employee Added Successfully"); 
            setShowAleart(true);

            setName("");
            setEmail("");
            setMobile("");
            setNic("");
            setDesignation("");
            setBasicsal("");
            setEmpid("");


            setTimeout(()=> setShowAleart(false), 3000); //hide after 3 seconds
        }).catch((err)=>{
            setAlertMessage("Error Adding Employee");
            setShowAleart(true);
            setTimeout(()=> setShowAleart(false), 3000); //hide after 3 seconds

        })

    }
    return(
        <div style={{ padding: '50px', marginLeft: '250px', marginTop: '60px', boxSizing: 'border-box', width: 'calc(100% - 250px)', height: 'calc(100vh - 60px)' }}>
      <form style={formContainerStyle} onSubmit={sendData}>
      <div style={formGridStyle}>

  <div class="mb-3">
    <label for="EmployeeName" class="form-label">Name</label>
    <input type="text" class="form-control" id="name" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)}/>
  </div>

  <div className="mb-3">
    <label for="Email" class="form-label">Email</label>
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)}/>
  </div>

  <div className="mb-3">
    <label for="Mobile" class="form-label">Mobile-No</label>
    <input type="Number" class="form-control" id="mobileno" placeholder="Enter Mobile" value={mobile} onChange={e => setMobile(e.target.value)}/>
  </div>

  <div className="mb-3">
    <label for="NIC" class="form-label">NIC</label>
    <input type="text" class="form-control" id="nic" placeholder="Enter NIC" value={nic} onChange={e => setNic(e.target.value)}/>
  </div>

  <div className="mb-3">
    <label for="designation" class="form-label">Designation</label>
    <input type="text" class="form-control" id="desigantion" placeholder="Enter Designation" value={designation} onChange={e => setDesignation(e.target.value)}/>
  </div>

  <div className="mb-3">
    <label for="basisal" class="form-label">Basic Salary</label>
    <input type="Number" class="form-control" id="bsalary" placeholder="Enter basic salary" value={basicsal} onChange={e => setBasicsal(e.target.value)}/>
  </div>

  <div className="mb-3">
    <label for="EmployeeID" class="form-label">Employee-ID</label>
    <input type="text" class="form-control" id="empid" placeholder="Enter Employee-ID" value={empid} onChange={e => setEmpid(e.target.value)} />
  </div>

  </div>
  

  <button type="submit" style={{ ...buttonStyle, ...(isHovering ? buttonHoverStyle : {} )}} 
  onMouseEnter={() => setIsHovering(true)}
   onMouseLeave={() => setIsHovering(false)}>Submit</button>
</form>
<AnimatePresence>
        {showAlert && (
          <motion.div style={alertStyle} initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: '0%' }} exit={{ opacity: 0, x: '100%' }}>
            {alertMessage}
          </motion.div>
        )}
      </AnimatePresence>

</div>

    )

}
