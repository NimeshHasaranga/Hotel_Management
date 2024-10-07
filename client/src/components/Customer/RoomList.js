import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [availability, setAvailability] = useState({ checkIn: "", checkOut: "", adults: 1, children: 0 });

  useEffect(() => {
    fetchRooms();
  }, [availability]);

  const fetchRooms = () => {
    axios.get("http://localhost:8070/room/", { params: availability })
      .then((res) => {
        setRooms(res.data);
        setAlertMessage("Rooms Fetched Successfully");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      })
      .catch((err) => {
        console.error("Error fetching rooms:", err.message);
        setAlertMessage("Error Fetching Rooms");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Available":
        return { color: 'green' };
      case "Reserved":
        return { color: 'blue' };
      case "Booked":
        return { color: 'red' };
      default:
        return {};
    }
  };

  const handleDelete = (id) => {
    setRoomToDelete(id);
    setShowConfirmDialog(true);
  };

  const confirmDelete = () => {
    axios.delete(`http://localhost:8070/room/delete/${roomToDelete}`)
      .then((res) => {
        setRooms(rooms.filter(room => room._id !== roomToDelete));
        setAlertMessage("Room Deleted Successfully");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      })
      .catch((err) => {
        console.error("Error deleting room:", err.message);
        setAlertMessage("Error Deleting Room");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      })
      .finally(() => {
        setShowConfirmDialog(false);
        setRoomToDelete(null);
      });
  };

  const handleAvailabilityChange = (e) => {
    const { name, value } = e.target;
    setAvailability(prevState => ({ ...prevState, [name]: value }));
  };

  const handleGuestChange = (e) => {
    const { name, value } = e.target;
    setAvailability(prevState => ({ ...prevState, [name]: parseInt(value, 10) }));
  };

  return (
    <div style={containerStyle}>
      

      <h1 style={titleStyle}>Room List</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Room Name</th>
            <th style={thStyle}>Price</th>
            <th style={thStyle}>Room Number</th>
            <th style={thStyle}>Facilities</th>
            <th style={thStyle}>Bed Type</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room._id}>
              <td style={tdStyle}>{room.roomType}</td>
              <td style={tdStyle}>{room.price}</td>
              <td style={tdStyle}>{room.roomNumber}</td>
              <td style={tdStyle}>{room.facilities}</td>
              <td style={tdStyle}>{room.bedType}</td>
              <td style={{ ...tdStyle, ...getStatusStyle(room.status) }}>{room.status}</td>
              <td style={tdStyle}>
                <button style={confirmDialogButtonStyle} onClick={() => handleDelete(room._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAlert && (
        <div style={alertStyle}>
          {alertMessage}
        </div>
      )}

      {showConfirmDialog && (
        <div style={confirmDialogOverlayStyle}>
          <div style={confirmDialogStyle}>
            <h2 style={confirmDialogTitleStyle}>Confirm Delete</h2>
            <p>Are you sure you want to delete this room?</p>
            <div style={confirmDialogButtonContainerStyle}>
              <button style={confirmDialogButtonStyle} onClick={confirmDelete}>Yes</button>
              <button style={confirmDialogButtonStyle} onClick={() => setShowConfirmDialog(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles
const containerStyle = {
  padding: '50px',
  width: 'calc(100% - 250px)',
  boxSizing: 'border-box',
  marginLeft: '250px',
};

const filterContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#f0f0f0',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '20px',
};

const buttonGroupStyle = {
  display: 'flex',
  gap: '10px',
  marginBottom: '20px',
};

const buttonStyle = {
  padding: '8px 15px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#fff',
  cursor: 'pointer',
};

const dateInputContainerStyle = {
  display: 'flex',
  gap: '20px',
  marginBottom: '20px',
};

const dateInputStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

const guestInputContainerStyle = {
  display: 'flex',
  gap: '20px',
  marginBottom: '20px',
};

const guestInputStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const addCustomerButtonStyle = {
  backgroundColor: '#800000',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  alignSelf: 'flex-end',
};

const titleStyle = {
  textAlign: 'left',
  marginBottom: '20px',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const thStyle = {
  padding: '10px',
  backgroundColor: '#800000',
  color: '#fff',
  textAlign: 'left',
};

const tdStyle = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
  textAlign: 'left',
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
  right: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  zIndex: 1000,
  width: '300px',
};

const confirmDialogOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const confirmDialogStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  width: '400px',
  textAlign: 'center',
};

const confirmDialogTitleStyle = {
  marginBottom: '10px',
  fontSize: '18px',
};

const confirmDialogButtonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: '20px',
};

const confirmDialogButtonStyle = {
  padding: '8px 15px',
  backgroundColor: '#800000',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};
