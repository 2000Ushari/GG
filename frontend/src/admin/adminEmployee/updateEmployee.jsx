// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'

// function UpdateEmployee() {
//     const [employeeFirstName, setEmployeeFirstName] = useState("");
//     const [employeeLastName, setEmployeeLastName] = useState("");
//     const [employeeContact, setEmployeeContact] = useState("");
//     const [employeeGender, setEmployeeGender] = useState("");
//     const [employeeNIC, setEmployeeNIC] = useState("");
//     const [employeeAddress, setEmployeeAddress] = useState("");
//     const [workingStatus, setWorkingStatus] = useState("");

//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//   // Authentication check
//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/api/auth/authenticated", {
//         withCredentials: true,
//       })
//       .then((res) => {
//         if (res.data.authenticated && res.data.user.role === "admin") {
//           // setUser(res.data.user); // Set user data if authenticated
//           // customerId(res.data.user.id);
//         } else {
//           navigate("/login"); // Redirect to login if not authenticated
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [navigate]);

//     const genderOptions = ["Female", "Male", "Preferred not to mention"];
//     const workingStatusOptions = ["Active", "Inactive"];

//     const handleFirstNameChange = (event) => {
//       setEmployeeFirstName(event.target.value);
//     };

//     const handleLastNameChange = (event) => {
//       setEmployeeLastName(event.target.value);
//     };

//     const handleContactChange = (event) => {
//       setEmployeeContact(event.target.value);
//     };

//     // const handleGenderChange = (event) => {
//     //   setEmployeeGender(event.target.value);
//     // };

//     const handleNICChange = (event) => {
//       setEmployeeNIC(event.target.value);
//     };

//     const handleAddressChange = (event) => {
//       setEmployeeAddress(event.target.value);
//     };

//     // const handleWorkingStatusChange = (event) => {
//     //   setWorkingStatus(event.target.value);
//     // };

//     const handleSubmit = () => {
//         // Validation
//         if (!employeeFirstName || !employeeLastName || !employeeContact || !employeeGender || !employeeNIC || !employeeAddress || !workingStatus) {
//           setError("Please fill out all fields.");
//           return;
//         }

//     const getEmployee = async () => {
//         try {
//           const response = await axios.get(
//             `http://localhost:3001/api/employee/getEmployee/${employeeId}`,
//             { withCredentials: true }
//           );
//           setEmployeeFirstName(response.data.employeeFirstName);
//           setEmployeeLastName(response.data.employeeLastName);
//           setEmployeeContact(response.data.employeeContact);
//           setEmployeeGender(response.data.employeeGender);
//           setEmployeeNIC(response.data.employeeNIC);
//           setEmployeeAddress(response.data.employeeAddress);
//           setWorkingStatus(response.data.workingStatus);
//         } catch (error) {
//           console.error("Error fetching employee details:", error);
//         }
//       };

//       getEmployee();

//   return (
//     <div>updateEmployee</div>
//   )
// }

// }
// export default UpdateEmployee;
