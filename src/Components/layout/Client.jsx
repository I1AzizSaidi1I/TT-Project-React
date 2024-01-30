import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
function Client() {
  // State to manage the list of clients
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // State variables for creating a new client
  const [newClientFirstName, setNewClientFirstName] = useState("");
  const [newClientLastName, setNewClientLastName] = useState("");
  const [newClientTel, setNewClientTel] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");
  const [newClientAddress, setNewClientAddress] = useState("");
  const [newClientPassword, setNewClientPassword] = useState("");

  const [updateNewClientLastName, setUpdateNewClientLastName] = useState("");
  const [updateNewClientFirstName, setUpdateNewClientFirstName] = useState("");
  const [updateNewClientTel, setUpdateNewClientTel] = useState("");
  const [updateNewClientEmail, setUpdateNewClientEmail] = useState("");
  const [updateNewClientAddress, setUpdateNewClientAddress] = useState("");

  const [selectedClientId, setSelectedClientId] = useState(null);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [loader, setloader] = useState(false);



  // Fetch the list of clients when the component mounts
  useEffect(() => {
    fetchClients();
  }, []);

  // Function to fetch the list of clients
  const fetchClients = async () => {
    setloader(true);
    try {
      const response = await axios.get("http://localhost:8000/api/clients");
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setloader(false);
    }
  };

  // Function to handle creating a new client
  // Function to handle creating a new client
  const handleCreateClient = async () => {
    try {
      // Validate input
      if (
        !newClientFirstName ||
        !newClientLastName ||
        !newClientTel ||
        !newClientEmail ||
        !newClientAddress ||
        !newClientPassword
      ) {
        console.error("All fields are required");
        return;
      }

      const response = await axios.post("http://localhost:8000/api/clients", {
        first_name: newClientFirstName,
        last_name: newClientLastName,
        phone: newClientTel,
        address: newClientAddress,
        email: newClientEmail,
        password: newClientPassword,
        role_id: 2,
      });

      console.log("Client created successfully:", response.data);

      setClients((prevClients) => [...prevClients, response.data]);
      // Clear the input fields
      setNewClientLastName("");
      setNewClientFirstName("");
      setNewClientTel("");
      setNewClientEmail("");
      setNewClientAddress("");
      setNewClientPassword("");
      setShowModal(false);
      fetchClients();

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Client created successfully.",
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

  // Function to handle deleting a client
  const handleDeleteClient = async (clientId) => {
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
        await axios.delete(`http://localhost:8000/api/clients/${clientId}`);
        setClients((prevClients) =>
          prevClients.filter((client) => client.id !== clientId)
        );
        console.log("Client deleted successfully");

        // Show a success alert
        Swal.fire("Deleted!", "The client has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting client:", error);
      // Show an error alert
      Swal.fire(
        "Error!",
        "An error occurred while deleting the client.",
        "error"
      );
    }
  };

  const handleSelectClientForUpdate = (client) => {
    setUpdateNewClientLastName(client.first_name);
    setUpdateNewClientFirstName(client.last_name);
    setUpdateNewClientTel(client.phone);
    setUpdateNewClientEmail(client.email);
    setUpdateNewClientAddress(client.address);
    setSelectedClientId(client.id);
    setShowUpdateModal(true);
    console.log(client.id);
  };

  const handleUpdateClient = async () => {
    try {
      if (
        !updateNewClientLastName ||
        !updateNewClientFirstName ||
        !updateNewClientTel ||
        !updateNewClientEmail ||
        !updateNewClientAddress ||
        selectedClientId === null
      ) {
        console.error("All fields are required");
        return;
      }

      const response = await axios.put(
        `http://localhost:8000/api/clients/${selectedClientId}`,
        {
          first_name: updateNewClientLastName,
          last_name: updateNewClientFirstName,
          phone: updateNewClientTel,
          email: updateNewClientEmail,
          address: updateNewClientAddress,
        }
      );

      console.log("Client updated successfully:", response.data);
      Swal.fire("Updated!", "The client has been updated.", "success");
      setUpdateNewClientLastName("");
      setUpdateNewClientFirstName("");
      setUpdateNewClientTel("");
      setUpdateNewClientEmail("");
      setUpdateNewClientAddress("");
      setSelectedClientId(null);
      setShowUpdateModal(false);
      fetchClients();
    } catch (error) {
      console.error("Error updating client:", error);

      if (error.response && error.response.data) {
        console.error("Validation errors:", error.response.data);
      }
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    
    <>
    <NavBar/>
    <SideBar/>
    <div className="warpper">
      <section>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Manage Clients</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Manage Clients</li>
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
                  <h5 className="modal-title">Add New Client</h5>
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
                  {/* Input fields for creating a new client */}
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newClientLastName}
                      onChange={(e) => setNewClientLastName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newClientFirstName}
                      onChange={(e) => setNewClientFirstName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newClientTel}
                      onChange={(e) => setNewClientTel(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      value={newClientEmail}
                      onChange={(e) => setNewClientEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Password : </label>
                    <input
                      type="password"
                      className="form-control"
                      value={newClientPassword}
                      onChange={(e) => setNewClientPassword(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Address:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newClientAddress}
                      onChange={(e) => setNewClientAddress(e.target.value)}
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
                    onClick={handleCreateClient}
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
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Update Client</h5>
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
                          value={updateNewClientLastName}
                          onChange={(e) =>
                            setUpdateNewClientLastName(e.target.value)
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
                          value={updateNewClientFirstName}
                          onChange={(e) =>
                            setUpdateNewClientFirstName(e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Phone:</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          value={updateNewClientTel}
                          onChange={(e) => setUpdateNewClientTel(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Email:</label>
                      <div className="col-sm-9">
                        <input
                          type="email"
                          className="form-control"
                          value={updateNewClientEmail}
                          onChange={(e) =>
                            setUpdateNewClientEmail(e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Address:</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          value={updateNewClientAddress}
                          onChange={(e) =>
                            setUpdateNewClientAddress(e.target.value)
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
                    onClick={handleUpdateClient}
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
        {/* Table to display the list of clients */}
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
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.first_name}</td>
                <td>{client.last_name}</td>
                <td>{client.phone}</td>
                <td>{client.email}</td>
                <td className="text-center">{client.address}</td>
                <td className="project-actions text-right">
                  <button
                    className="btn btn-primary mr-2 btn-sm"
                    onClick={() => handleSelectClientForUpdate(client)}
                  >
                    <i className="fas fa-pencil-alt mr-1"></i> Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteClient(client.id)}
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

export default Client;
