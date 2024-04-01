import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {MdOutlineAdminPanelSettings} from "react-icons/md";

const SideBar = () => {
    const [role_id, setRoleId] = useState("");
    const [Employee_id, setEmployeeId] = useState(false);
    const [Admin_id, setAdminId] = useState(false);

    useEffect(() => {
        // Fetch the role_id from local storage when the component mounts
        const storedUser = JSON.parse(localStorage.getItem('user'));
        console.log("Stored User:", storedUser);

        if (storedUser !== null && 'user' in storedUser && 'role_id' in storedUser.user) {
            // Access the role_id property
            const storedRoleId = storedUser.user.role_id;
            console.log("Stored Role ID:", storedRoleId);

            // Check the role_id and update state accordingly
            if (storedRoleId === 3) {
                setEmployeeId(true);
                setAdminId(false);
            } else if (storedRoleId === 1) {
                setAdminId(true);
                setEmployeeId(false);
            } else {
                setEmployeeId(false);
                setAdminId(false);
            }
        } else {
            console.log("User object or role ID not stored in local storage.");
        }
    }, []); 


    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <a  className="brand-link">
                <img
                    src="/src/resources/dist/img/LOGO_TT_.png"
                    alt="AdminLTE Logo"
                    className="brand-image img-circle elevation-3"
                    style={{opacity: ".8"}}
                />
                <span className="brand-text font-weight-light">Service TT</span>
            </a>
            {/* Sidebar */}
            <div className="sidebar">
                {/* Sidebar user (optional) */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <MdOutlineAdminPanelSettings style={{width: "100%", color: "white"}}/>
                    </div>
                    <div className="info">
                        <a className="d-block">
                        {Employee_id ? "Employee" : "Admin"}
                        </a>
                    </div>
                </div>

                {/* Sidebar Menu */}
                <nav className="mt-2">
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                    >
                       
                        {Admin_id && (
                            <>
                                <li className="nav-item">
                                    <Link to="/employees" className="nav-link">
                                        <i className="fa fa-user nav-icon fas"></i>
                                        <p>Employee</p>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to="/client" className="nav-link">
                                        <i className="fa fa-user-tie nav-icon fas"></i>
                                        <p>Client</p>
                                    </Link>
                                </li>
                            </>
                        )}

                        {Employee_id && (
                            <li className="nav-item">
                                <Link to="/client" className="nav-link">
                                    <i className="fa fa-user-tie nav-icon fas"></i>
                                    <p>Client</p>
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
                {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
        </aside>
    );
};

export default SideBar;
