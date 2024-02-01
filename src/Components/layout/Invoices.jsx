import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import axios from "axios";

const Invoices = () => {
    let {clientId} = useParams();
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        // Fetch data when the component mounts
        fetchInvoices();
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    const fetchInvoices = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/clients/${clientId}/invoices`);
            setInvoices(response.data); // Assuming response.data is an array of invoices
        } catch (error) {
            console.error("Error fetching invoices:", error);
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
                                <div
                                    id="example1_wrapper"
                                    className="dataTables_wrapper dt-bootstrap4"
                                >
                                    <div className="row">
                                        {/* Buttons section */}
                                        <div className="col-sm-12 col-md-6">
                                            <div className="dt-buttons btn-group flex-wrap">
                                                <button className="btn btn-secondary buttons-copy buttons-html5"
                                                        tabIndex={0} aria-controls="example1" type="button">
                                                    <span>Copy</span>
                                                </button>
                                                {/* Add other buttons here */}
                                            </div>
                                        </div>
                                        {/* Search input */}
                                        <div className="col-sm-12 col-md-6">
                                            <div id="example1_filter" className="dataTables_filter">
                                                <label>
                                                    Search:
                                                    <input type="search" className="form-control form-control-sm"
                                                           placeholder="Search" aria-controls="example1"/>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Table */}
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <table
                                                id="example1"
                                                className="table table-bordered table-striped dataTable dtr-inline"
                                                aria-describedby="example1_info"
                                            >
                                                <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>User ID</th>
                                                    <th>Total Amount</th>
                                                    <th>Paid Amount</th>
                                                    <th>End Time</th>
                                                    <th>Created At</th>
                                                    <th>Updated At</th>
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
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Invoices;


