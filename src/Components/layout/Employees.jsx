import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SideBar from "./SideBar";
import NavBar from "./NavBar";

function Employees() {
  // State to manage the list of employees
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // State variables for creating a new employee
  const [newEmployeeFirstName, setNewEmployeeFirstName] = useState("");
  const [newEmployeeLastName, setNewEmployeeLastName] = useState("");
  const [newEmployeeTel, setNewEmployeeTel] = useState("");
  const [newEmployeeEmail, setNewEmployeeEmail] = useState("");
  const [newEmployeeAddress, setNewEmployeeAddress] = useState("");
  const [newEmployeePassword, setNewEmployeePassword] = useState("");

  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [loader, setLoader] = useState(false);

  // Fetch the list of employees when the component mounts
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Function to fetch the list of employees
  const fetchEmployees = async () => {
    setLoader(true);
    try {
      const response = await axios.get("http://localhost:8000/api/employe");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoader(false);
    }
  };

  // Function to handle creating a new employee
  const handleCreateEmployee = async () => {
    try {
      // Validate input
      if (
        !newEmployeeFirstName ||
        !newEmployeeLastName ||
        !newEmployeeTel ||
        !newEmployeeEmail ||
        !newEmployeeAddress ||
        !newEmployeePassword
      ) {
        console.error("All fields are required");
        return;
      }

      const response = await axios.post("http://localhost:8000/api/employe", {
        first_name: newEmployeeFirstName,
        last_name: newEmployeeLastName,
        phone: newEmployeeTel,
        address: newEmployeeAddress,
        email: newEmployeeEmail,
        password: newEmployeePassword,
        role_id: 3, // Assuming role_id for employee
      });

      console.log("Employee created successfully:", response.data);

      setEmployees((prevEmployees) => [...prevEmployees, response.data]);
      // Clear the input fields
      setNewEmployeeLastName("");
      setNewEmployeeFirstName("");
      setNewEmployeeTel("");
      setNewEmployeeEmail("");
      setNewEmployeeAddress("");
      setNewEmployeePassword("");
      setShowModal(false);
      fetchEmployees();

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Employee created successfully.",
      });
    } catch (error) {
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
    }
  };

  // Function to handle deleting an employee
  const handleDeleteEmployee = async (employeeId) => {
    try {
      // Show a confirmation alert
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      // If the user clicks "Yes"
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:8000/api/employe/${employeeId}`);
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.id !== employeeId)
        );
        console.log("Employee deleted successfully");

        // Show a success alert
        Swal.fire("Deleted!", "The employee has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      // Show an error alert
      Swal.fire(
        "Error!",
        "An error occurred while deleting the employee.",
        "error"
      );
    }
  };

  const handleSelectEmployeeForUpdate = (employee) => {
    setNewEmployeeLastName(employee.first_name);
    setNewEmployeeFirstName(employee.last_name);
    setNewEmployeeTel(employee.phone);
    setNewEmployeeEmail(employee.email);
    setNewEmployeeAddress(employee.address);
    setSelectedEmployeeId(employee.id);
    setShowUpdateModal(true);
    console.log(employee.id);
  };

  const handleUpdateEmployee = async () => {
    try {
      if (
        !newEmployeeLastName ||
        !newEmployeeFirstName ||
        !newEmployeeTel ||
        !newEmployeeEmail ||
        !newEmployeeAddress ||
        selectedEmployeeId === null
      ) {
        console.error("All fields are required");
        return;
      }

      const response = await axios.put(
        `http://localhost:8000/api/employe/${selectedEmployeeId}`,
        {
          first_name: newEmployeeLastName,
          last_name: newEmployeeFirstName,
          phone: newEmployeeTel,
          email: newEmployeeEmail,
          address: newEmployeeAddress,
        }
      );

      console.log("Employee updated successfully:", response.data);
      Swal.fire("Updated!", "The employee has been updated.", "success");
      setNewEmployeeLastName("");
      setNewEmployeeFirstName("");
      setNewEmployeeTel("");
      setNewEmployeeEmail("");
      setNewEmployeeAddress("");
      setSelectedEmployeeId(null);
      setShowUpdateModal(false);
      fetchEmployees();
    } catch (error) {
      console.error("Error updating employee:", error);

      if (error.response && error.response.data) {
        console.error("Validation errors:", error.response.data);
      }
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <NavBar />
      <SideBar />
      <div className="warpper">
        <section>
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0">Manage Employees</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="#">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item active">
                      Manage Employees
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-12">
                <button
                  className="btn btn-success float-right mr-3"
                  onClick={handleShowModal}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}

          {/* Modal */}
          {showModal && (
            <div
              className="modal fade show"
              tabIndex="-1"
              role="dialog"
              style={{ display: "block" }}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add New Employee</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={handleCloseModal}
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    {/* Input fields for creating a new employee */}
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newEmployeeLastName}
                        onChange={(e) => setNewEmployeeLastName(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newEmployeeFirstName}
                        onChange={(e) => setNewEmployeeFirstName(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newEmployeeTel}
                        onChange={(e) => setNewEmployeeTel(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Email:</label>
                      <input
                        type="email"
                        className="form-control"
                        value={newEmployeeEmail}
                        onChange={(e) => setNewEmployeeEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Password : </label>
                      <input
                        type="password"
                        className="form-control"
                        value={newEmployeePassword}
                        onChange={(e) => setNewEmployeePassword(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Address:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newEmployeeAddress}
                        onChange={(e) => setNewEmployeeAddress(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleCreateEmployee}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/*Update modal */}
          {showUpdateModal && (
            <div
              className="modal fade show"
              tabIndex="-1"
              role="dialog"
              style={{ display: "block" }}
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Update Employee</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={() => setShowUpdateModal(false)}
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">
                          Last Name:
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            value={newEmployeeLastName}
                            onChange={(e) =>
                              setNewEmployeeLastName(e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">
                          First Name:
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            value={newEmployeeFirstName}
                            onChange={(e) =>
                              setNewEmployeeFirstName(e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">
                          Phone:
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            value={newEmployeeTel}
                            onChange={(e) => setNewEmployeeTel(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">
                          Email:
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="email"
                            className="form-control"
                            value={newEmployeeEmail}
                            onChange={(e) => setNewEmployeeEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">
                          Address:
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            value={newEmployeeAddress}
                            onChange={(e) =>
                              setNewEmployeeAddress(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowUpdateModal(false)}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleUpdateEmployee}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Read Operation */}
          <div>
            {loader && (
              <div
                className="overlay"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <i className="fas fa-3x fa-sync-alt fa-spin"></i>
                <div className="text-bold pt-2 ml-2">Loading...</div>
              </div>
            )}
          </div>
          {/* Table to display the list of employees */}
          <table className="table table-striped projects ">
            <thead className="card-header">
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, i) => (
                <tr key={i}>
                  <td>{employee.id}</td>
                  <td>{employee.first_name}</td>
                  <td>{employee.last_name}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.email}</td>
                  <td className="text-center">{employee.address}</td>
                  <td className="project-actions text-right">
                    <button
                      className="btn btn-primary mr-2 btn-sm"
                      onClick={() => handleSelectEmployeeForUpdate(employee)}
                    >
                      <i className="fas fa-pencil-alt mr-1"></i> Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteEmployee(employee.id)}
                    >
                      <i className="fas fa-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}

export default Employees;
