import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import EmployeeNavbar from "./employeeComponents/EmployeeNavbar";
import EmployeeSidenav from "./employeeComponents/EmployeeSidenav";

const EmployeeProfile = ({ userDetails, onSave }) => {
  const [employeeDetails, setEmployeeDetails] = useState(
    userDetails.roleDetails
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails({ ...employeeDetails, [name]: value });
  };

  const handleSave = () => {
    onSave(employeeDetails);
  };

  return (
    <>
      <EmployeeNavbar />
      <Box height={30} />
      <Box>
        <EmployeeSidenav />
        <Box marginLeft={50}>
          <Box>
            <h3>Your Details</h3>
            <TextField
              label="First Name"
              name="employeeFirstName"
              value={employeeDetails.employeeFirstName}
              onChange={handleChange}
            />
            <TextField
              label="Last Name"
              name="employeeLastName"
              value={employeeDetails.employeeLastName}
              onChange={handleChange}
            />
            <TextField
              label="Date of Birth"
              name="employeeDob"
              value={employeeDetails.employeeDob || ""}
              onChange={handleChange}
            />
            <TextField
              label="Contact"
              name="employeeContact"
              value={employeeDetails.employeeContact || ""}
              onChange={handleChange}
            />
            <TextField
              label="NIC"
              name="employeeNIC"
              value={employeeDetails.employeeNIC || ""}
              onChange={handleChange}
            />
            <TextField
              label="Gender"
              name="employeeGender"
              value={employeeDetails.employeeGender || ""}
              onChange={handleChange}
            />
            <TextField
              label="Address"
              name="employeeAddress"
              value={employeeDetails.employeeAddress || ""}
              onChange={handleChange}
            />
            <TextField
              label="Working Status"
              name="workingStatus"
              value={employeeDetails.workingStatus || ""}
              onChange={handleChange}
            />
            <TextField
              label="Start Date"
              name="startDate"
              value={employeeDetails.startDate || ""}
              onChange={handleChange}
            />
            <TextField
              label="End Date"
              name="endDate"
              value={employeeDetails.endDate || ""}
              onChange={handleChange}
            />
            <Button onClick={handleSave}>Save</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EmployeeProfile;
