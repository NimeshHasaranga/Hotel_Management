import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function UpdateCustomerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    name: "",
    contactNumber: "",
    email: "",
    gender: "",
    nationality: "",
    address: "",
    nicPassport: "",
    checkInDate: "",
    roomType: "",
    roomNumber: "",
    price: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8070/customer/get/${id}`)
      .then((res) => {
        setCustomer(res.data.customer);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setCustomer((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios.put(`http://localhost:8070/customer/update/${id}`, customer)
      .then(() => {
        setAlertMessage("Customer updated successfully!");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000); // Hide after 3 seconds
        navigate(`/customer/${id}`);
      })
      .catch((err) => {
        setAlertMessage("Error updating customer.");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      });
  }

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '20px'
  };

  const formStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
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
  };

  const alertStyle = {
    backgroundColor: '#ffffff',
    color: '#800000',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    position: 'fixed',
    top: '80px',
    right: '20px',
    zIndex: 1000,
    width: '300px',
    transform: 'translateX(100%)',
  };

  return (
    <div style={{ padding: '50px', width: 'calc(100% - 250px)', boxSizing: 'border-box', marginLeft: '250px' }}>
      <h1>Update Customer Profile</h1>
      <div style={formStyle}>
        <form onSubmit={handleSubmit}>
          <div style={containerStyle}>
            <div className="form-group">
              <label htmlFor="name" style={labelStyle}>Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={customer.name}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactNumber" style={labelStyle}>Contact Number</label>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                value={customer.contactNumber}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" style={labelStyle}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={customer.email}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender" style={labelStyle}>Gender</label>
              <select
                id="gender"
                name="gender"
                value={customer.gender}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="nationality" style={labelStyle}>Nationality</label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={customer.nationality}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address" style={labelStyle}>Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={customer.address}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="form-group">
              <label htmlFor="nicPassport" style={labelStyle}>NIC/Passport Number</label>
              <input
                type="text"
                id="nicPassport"
                name="nicPassport"
                value={customer.nicPassport}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="form-group">
              <label htmlFor="checkInDate" style={labelStyle}>Check-In Date</label>
              <input
                type="date"
                id="checkInDate"
                name="checkInDate"
                value={customer.checkInDate}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="form-group">
              <label htmlFor="roomType" style={labelStyle}>Room Type</label>
              <input
                type="text"
                id="roomType"
                name="roomType"
                value={customer.roomType}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="form-group">
              <label htmlFor="roomNumber" style={labelStyle}>Room Number</label>
              <input
                type="number"
                id="roomNumber"
                name="roomNumber"
                value={customer.roomNumber}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="form-group">
              <label htmlFor="price" style={labelStyle}>Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={customer.price}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          <button
            type="submit"
            style={buttonStyle}
          >
            Update
          </button>
        </form>
      </div>

      <AnimatePresence>
        {showAlert && (
          <motion.div
            style={alertStyle}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: '0%' }}
            exit={{ opacity: 0, x: '100%' }}
          >
            {alertMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
