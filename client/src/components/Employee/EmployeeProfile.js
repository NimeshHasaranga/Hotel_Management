import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function UpdateEmployeeProfile() {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    mobile: "",
    nic: "",
    designation: "",
    basicsal: "",
    empid: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8070/employee/get/${id}`)
      .then((res) => {
        setEmployee(res.data.employee);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setEmployee((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .put(`http://localhost:8070/employee/update/${id}`, employee)
      .then(() => {
        setAlertMessage("Employee updated successfully!");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000); // Hide after 3 seconds
        // Remove navigation to another page here
      })
      .catch((err) => {
        setAlertMessage("Error updating employee.");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      });
  }

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "20px",
  };

  const formStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
  };

  const labelStyle = {
    color: "#333333",
    fontWeight: "bold",
  };

  const inputStyle = {
    backgroundColor: "#f2f2f2",
    border: "1px solid #cccccc",
    borderRadius: "5px",
    padding: "10px",
    color: "#333333",
    width: "100%",
  };

  const buttonStyle = {
    backgroundColor: "#800000",
    color: "#ffffff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "15px",
  };

  const alertStyle = {
    backgroundColor: "#ffffff",
    color: "#800000",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    position: "fixed",
    top: "80px",
    right: "20px",
    zIndex: 1000,
    width: "300px",
    transform: "translateX(100%)",
  };

  return (
    <div
      style={{
        padding: "50px",
        width: "calc(100% - 250px)",
        boxSizing: "border-box",
        marginLeft: "250px",
      }}
    >
      <h1>Update Employee Profile</h1>
      <div style={formStyle}>
        <form onSubmit={handleSubmit}>
          <div style={containerStyle}>
            <div className="form-group">
              <label htmlFor="name" style={labelStyle}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={employee.name}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" style={labelStyle}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={employee.email}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobile" style={labelStyle}>
                Mobile No
              </label>
              <input
                type="number"
                id="mobile"
                name="mobile"
                value={employee.mobile}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="form-group">
              <label htmlFor="nic" style={labelStyle}>
                NIC
              </label>
              <input
                type="text"
                id="nic"
                name="nic"
                value={employee.nic}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="form-group">
              <label htmlFor="designation" style={labelStyle}>
                Designation
              </label>
              <input
                type="text"
                id="designation"
                name="designation"
                value={employee.designation}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="form-group">
              <label htmlFor="basicsal" style={labelStyle}>
                Basic Salary
              </label>
              <input
                type="number"
                id="basicsal"
                name="basicsal"
                value={employee.basicsal}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="form-group">
              <label htmlFor="empid" style={labelStyle}>
                Employee ID
              </label>
              <input
                type="text"
                id="empid"
                name="empid"
                value={employee.empid}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          <button type="submit" style={buttonStyle}>
            Update
          </button>
        </form>
      </div>

      <AnimatePresence>
        {showAlert && (
          <motion.div
            style={alertStyle}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
          >
            {alertMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
