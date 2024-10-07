import "antd/dist/antd.min.css";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Bar Management imported Componenets
import CartPage from "./components/Bar/CartPage";
import Homepage from "./components/Bar/Homepage";
import ItemsPage from "./components/Bar/ItemsPage";
import BillsPage from "./components/Bar/BillsPage";
import BarLogin from "./components/Bar/BarLogin";


//Customer Management imported Components
import CusLogin from "./components/Customer/CusLogin";
import DashBoard from "./components/DashBoard";
import AllCustomers from "./components/Customer/AllCustomers";
import AddCustomer from "./components/Customer/AddCustomer";
import CustomerProfile from "./components/Customer/CustomerProfile";
import CheckOutPage from "./components/Customer/CheckOutPage";
import CheckOutProfile from "./components/Customer/CheckOutProfile";
import AddRoom from "./components/Customer/AddRoom";
import RoomList from "./components/Customer/RoomList";
import Header from "./components/header";  // Assuming a shared header component


//Employee Management imported Components
import Employeeheader from './components/Employee/Employeeheader';
import Empheader from './components/Employee/Empheader';
import AddEmployee from './components/Employee/AddEmployee';
import EmployeeProfiles from './components/Employee/EmployeeProfile';
import AllEmployees from './components/Employee/AllEmployees';
import AddLeaveForm from './components/Employee/AddLeaveForm';
import AllLeaves from "./components/Employee/AllLeaves";
import Login from "./components/Employee/Login";
import EmpProfile from "./components/Employee/EmpProfile";
import UpdateEmpProfile from "./components/Employee/EmpProfile";
import AdminLogin from "./components/Employee/AdminLogin";
import LoginAs from "./components/Employee/LoginAs";


// Protected Route for authenticated access
export function ProtectedRoute({ children }) {
  if (localStorage.getItem("auth")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

function App() {
  const location = useLocation();

  function LayoutWithHeader({ children }) {
    return (
      <div>
        <Employeeheader />
        {children}
      </div>
    );
  }
  function LayoutWithEmpHeader({ children }) {
    return (
      <div>
        <Empheader />
        {children}
      </div>
    );
  }

  return (
    <div>
      {/* Conditionally render Header based on the current path */}
      {location.pathname !== "/cuslogin" && location.pathname !== "/" &&  location.pathname !== "/LoginChoose"  &&  location.pathname !== "/Admin_Login"  &&  location.pathname !== "/Emp_Login" && location.pathname !== "/barlogin" &&  <Header />}
      <Routes>
      <Route path="/" element={<DashBoard />} />

        {/* Public Routes */}
        <Route path="/home" element={<Homepage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/bills" element={<BillsPage />} />
        <Route path="/barlogin" element={<BarLogin />} />     
        {/* Customer Management Routes */}
        <Route path="/customers" element={<AllCustomers />} />
        <Route path="/customers/add" element={<AddCustomer />} />
        <Route path="/customer/:id" element={<CustomerProfile />} />
        <Route path="/checkout" element={<CheckOutPage />} />
        <Route path="/checkout/:id" element={<CheckOutProfile />} />
        <Route path="/cuslogin" element={<CusLogin />} />
        
        {/* Room Management Routes */}
        <Route path="/rooms/add" element={<AddRoom />} />
        <Route path="/rooms" element={<RoomList />} />

       {/*Employee Management*/}
       <Route path="/Employee" element={<LayoutWithHeader><AllEmployees /></LayoutWithHeader>} />
       <Route path="/Employee/add" element={<LayoutWithHeader><AddEmployee /></LayoutWithHeader>} />
        <Route path="/employee/:id" element={<LayoutWithHeader><EmployeeProfiles /></LayoutWithHeader>} />
        <Route path="/leaves" element={<LayoutWithHeader><AllLeaves /></LayoutWithHeader>} /> 
        <Route path="/profile" element={<LayoutWithEmpHeader><EmpProfile /></LayoutWithEmpHeader>} /> 
        <Route path="/leave/add" element={<LayoutWithEmpHeader><AddLeaveForm /></LayoutWithEmpHeader>} />
        <Route path="/employee/update/:id" element={<LayoutWithEmpHeader><UpdateEmpProfile /></LayoutWithEmpHeader>} />
        <Route path="/LoginChoose" element={<LoginAs />} />
        <Route path="/Admin_Login" element={<AdminLogin />} />  
        <Route path="/Emp_Login" element={<Login />} /> 

      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
