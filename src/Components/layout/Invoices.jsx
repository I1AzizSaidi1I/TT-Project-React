import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Invoices = () => {
  let { clientId } = useParams();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    total_amount: "",
    paid_amount: "",
    end_time: "",
  });

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/clients/${clientId}/invoices`
      );
      setInvoices(response.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "paid_amount" ? parseFloat(value) : value,
    }));
  };

  const deleteInvoice = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this invoice!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:8000/api/invoices/${id}`);
        fetchInvoices(); // Refresh invoices after deleting one
        Swal.fire("Deleted!", "Your invoice has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting invoice:", error);
      Swal.fire(
        "Error!",
        "An error occurred while deleting the invoice.",
        "error"
      );
    }
  };

  const handleOpenUpdateModal = (invoice) => {
    setSelectedInvoiceId(invoice.id);
    setUpdatedData(invoice);
    setShowUpdateModal(true);
  };

  const handleUpdateInvoice = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/invoices/${selectedInvoiceId}`,
        updatedData
      );
      fetchInvoices(); // Refresh invoices after updating one
      setShowUpdateModal(false); // Close the modal
      Swal.fire("Updated!", "Your invoice has been updated.", "success");
    } catch (error) {
      console.error("Error updating invoice:", error);
    }
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8000/api/invoices`, {
        user_id: clientId,
        ...formData,
      });
      fetchInvoices(); // Refresh invoices after adding a new one
      toggleModal(); // Close the modal
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Invoice created successfully!',
      });
    } catch (error) {
      console.error("Error creating invoice:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to create invoice.',
      });
    }
  };
  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">DataTable with default features</h3>
              </div>
              <div className="card-body">
                <button className="btn btn-primary" onClick={toggleModal}>
                  Add Invoice
                </button>
                <table className="table table-bordered table-striped dataTable dtr-inline">
                  <thead>
                    <tr className="text-center">
                      <th>ID</th>
                      <th>User ID</th>
                      <th>Total Amount</th>
                      <th>Paid Amount</th>
                      <th>End Time</th>
                      <th>Created At</th>
                      <th>Updated At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice, index) => (
                      <tr key={index}>
                        <td>{invoice.id}</td>
                        <td>{invoice.user_id}</td>
                        <td>{invoice.total_amount}</td>
                        <td>{invoice.paid_amount}</td>
                        <td>{invoice.end_time}</td>
                        <td>{invoice.created_at}</td>
                        <td>{invoice.updated_at}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-primary mr-2"
                            onClick={() => handleOpenUpdateModal(invoice)}
                          >
                            Update
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteInvoice(invoice.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Invoice</h5>
                <button type="button" className="close" onClick={toggleModal}>
                  <span>&times;</span>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="total_amount">Total Amount:</label>
                    <input
                      type="number"
                      id="total_amount"
                      name="total_amount"
                      value={formData.total_amount}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="paid_amount">Paid Amount:</label>
                    <input
                      type="text"
                      id="paid_amount"
                      name="paid_amount"
                      value={formData.paid_amount}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="end_time">End Time:</label>
                    <input
                      type="datetime-local"
                      id="end_time"
                      name="end_time"
                      value={formData.end_time}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Add Invoice
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={toggleModal}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showUpdateModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Invoice</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowUpdateModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <form>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="total_amount">Total Amount:</label>
                    <input
                      type="number"
                      id="total_amount"
                      name="total_amount"
                      value={updatedData.total_amount}
                      onChange={handleUpdateChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="paid_amount">Paid Amount:</label>
                    <input
                      type="text"
                      id="paid_amount"
                      name="paid_amount"
                      value={updatedData.paid_amount}
                      onChange={handleUpdateChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="end_time">End Time:</label>
                    <input
                      type="datetime-local"
                      id="end_time"
                      name="end_time"
                      value={updatedData.end_time}
                      onChange={handleUpdateChange}
                      className="form-control"
                    />
                  </div>
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
                    onClick={handleUpdateInvoice}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Invoices;
