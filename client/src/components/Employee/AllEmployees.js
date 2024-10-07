import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function AllEmployees() {
  const [employees, setEmployees] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmDialogData, setConfirmDialogData] = useState(null);

  useEffect(() => {
    function getEmployees() {
      axios
        .get("http://localhost:8070/employee/")
        .then((res) => setEmployees(res.data))
        .catch((err) => alert(err.message));
    }
    getEmployees();
  }, []);

  const handleDeleteClick = (employee) => {
    setConfirmDialogData(employee);
    setShowConfirmDialog(true);
  };

  const handleDelete = () => {
    if (confirmDialogData) {
      axios
        .delete(
          `http://localhost:8070/employee/delete/${confirmDialogData._id}`
        )
        .then(() => {
          setAlertMessage("Employee deleted successfully!");
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000); // Hide after 3 seconds
          setEmployees(
            employees.filter((employee) => employee._id !== confirmDialogData._id)
          );
        })
        .catch((err) => {
          setAlertMessage("Error deleting employee.");
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
        });
      setShowConfirmDialog(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
  };

  // Filter Employee based on search query
  const filteredemployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Employee Report", 14, 22);

    const headers = [["Name", "Email", "Contact Number", "NIC"]];

    const data = filteredemployees.map((employee) => [
      employee.name,
      employee.email,
      employee.mobile,
      employee.nic,
    ]);

    doc.autoTable({
      head: headers,
      body: data,
      startY: 30, // Starting position of the table
    });

    doc.save("Employee_report.pdf"); // Name of the file to save
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>All Employees</h1>

      <div style={headerContainerStyle}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={searchInputStyle}
        />
      </div>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Contact Number</th>
            <th style={tableHeaderStyle}>NIC</th>
            <th style={tableHeaderStyle}>Designation</th>
            <th style={tableHeaderStyle}>Basic Salary</th>
            <th style={tableHeaderStyle}>Empid</th>
            <th style={tableHeaderStyle}>View Profile</th> {/* Column for View Profile */}
            <th style={tableHeaderStyle}>Delete</th> {/* Column for Delete */}
          </tr>
        </thead>
        <tbody>
          {filteredemployees.map((employee) => (
            <tr key={employee._id} style={tableRowStyle}>
              <td style={tableCellStyle}>{employee.name}</td>
              <td style={tableCellStyle}>{employee.email}</td>
              <td style={tableCellStyle}>{employee.mobile}</td>
              <td style={tableCellStyle}>{employee.nic}</td>
              <td style={tableCellStyle}>{employee.designation}</td>
              <td style={tableCellStyle}>{employee.basicsal}</td>
              <td style={tableCellStyle}>{employee.empid}</td>
              <td style={tableCellStyle}>
                <Link
                  to={`/employee/${employee._id}`}
                  style={{ color: "#800000", textDecoration: "none" }}
                >
                  View Profile
                </Link>
              </td>
              <td style={tableCellStyle}>
                <button
                  onClick={() => handleDeleteClick(employee)}
                  style={deleteButtonStyle}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button to Export PDF */}
      <button onClick={exportPDF} style={buttonStyle}>
        Export as PDF
      </button>

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

      {/* Custom Confirmation Dialog */}
      {showConfirmDialog && (
        <div style={confirmDialogOverlayStyle}>
          <div style={confirmDialogStyle}>
            <h2 style={confirmDialogTitleStyle}>Confirm Deletion</h2>
            <p>Are you sure you want to delete this employee?</p>
            <div style={confirmDialogButtonContainerStyle}>
              <button onClick={handleDelete} style={confirmDialogButtonStyle}>
                Confirm
              </button>
              <button onClick={handleCancel} style={confirmDialogButtonStyle}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles
const containerStyle = {
  padding: "20px",
  width: "calc(100% - 260px)",
  backgroundColor: "#ffffff", // Ensuring the white background area
  boxSizing: "border-box",
  marginLeft: "260px",
};

const headerContainerStyle = {
  marginBottom: "20px",
  textAlign: "right", // Align the search box to the right
};

const headerStyle = {
  fontSize: "24px",
  textAlign: "left",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "14px",
};

const tableHeaderStyle = {
  backgroundColor: "#800000",
  color: "#fff",
  padding: "8px",
  textAlign: "left",
  borderBottom: "2px solid #fff",
};

const tableRowStyle = {
  backgroundColor: "#f2f2f2",
  height: "50px",
};

const tableCellStyle = {
  padding: "8px",
  borderBottom: "1px solid #ddd",
  borderRight: "1px solid #fff",
  fontSize: "14px",
};

const buttonStyle = {
  backgroundColor: "#b30000",
  color: "#ffffff",
  border: "none",
  padding: "5px 10px",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "20px",
};

const deleteButtonStyle = {
  backgroundColor: "#b30000",
  color: "#ffffff",
  border: "none",
  padding: "5px 10px",
  borderRadius: "5px",
  cursor: "pointer",
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

const confirmDialogOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const confirmDialogStyle = {
  backgroundColor: "#ffffff",
  color: "#800000",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  textAlign: "center",
  width: "400px",
};

const confirmDialogTitleStyle = {
  fontSize: "18px",
  marginBottom: "10px",
};

const confirmDialogButtonContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
};

const confirmDialogButtonStyle = {
  backgroundColor: "#b30000",
  color: "#ffffff",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
};

const searchInputStyle = {
  padding: "5px",
  fontSize: "14px",
  borderRadius: "5px",
  border: "1px solid #ddd",
};
