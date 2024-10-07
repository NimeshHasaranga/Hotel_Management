import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CheckOutPage() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    function getCustomers() {
      axios.get("http://localhost:8070/customer")
        .then((res) => setCustomers(res.data))
        .catch((err) => alert(err.message));
    }

    getCustomers();
  }, []);

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Check-Out</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Contact Number</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Gender</th>
            <th style={tableHeaderStyle}>Nationality</th>
            <th style={tableHeaderStyle}>Address</th>
            <th style={tableHeaderStyle}>NIC/Passport Number</th>
            <th style={tableHeaderStyle}>Check-In Date</th>
            <th style={tableHeaderStyle}>Room Type</th>
            <th style={tableHeaderStyle}>Room Number</th>
            <th style={tableHeaderStyle}>Price</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer._id} style={tableRowStyle}>
              <td style={tableCellStyle}>{customer.name}</td>
              <td style={tableCellStyle}>{customer.contactNumber}</td>
              <td style={tableCellStyle}>{customer.email}</td>
              <td style={tableCellStyle}>{customer.gender}</td>
              <td style={tableCellStyle}>{customer.nationality}</td>
              <td style={tableCellStyle}>{customer.address}</td>
              <td style={tableCellStyle}>{customer.nicPassport}</td>
              <td style={tableCellStyle}>{customer.checkInDate}</td>
              <td style={tableCellStyle}>{customer.roomType}</td>
              <td style={tableCellStyle}>{customer.roomNumber}</td>
              <td style={tableCellStyle}>{customer.price}</td>
              <td style={tableCellStyle}>
                <Link to={`/checkout/${customer._id}`} style={{ textDecoration: 'none' }}>
                  <button
                    style={buttonStyle}
                  >
                    Check-Out
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Styles
const containerStyle = {
  padding: '20px',
  width: 'calc(100% - 250px)',
  boxSizing: 'border-box',
  marginLeft: '250px',
};

const headerStyle = {
  textAlign: 'left',
  fontSize: '24px',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '14px', // Adjust text size here
};

const tableHeaderStyle = {
  backgroundColor: '#800000',
  color: '#fff',
  padding: '8px',
  textAlign: 'left',
  borderBottom: '2px solid #fff',
  fontSize: '14px', // Adjust text size here
};

const tableRowStyle = {
  backgroundColor: '#f2f2f2',
};

const tableCellStyle = {
  padding: '8px',
  borderBottom: '1px solid #ddd',
  borderRight: '1px solid #fff',
  fontSize: '14px', // Adjust text size here
};

const buttonStyle = {
  padding: '5px 10px',
  backgroundColor: '#800000',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  whiteSpace: 'nowrap', // Prevent text from wrapping
  textOverflow: 'ellipsis', // Add ellipsis if text overflows
  overflow: 'hidden', // Hide overflow text
};
