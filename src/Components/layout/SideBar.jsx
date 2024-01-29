import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineAdminPanelSettings } from "react-icons/md";



const SideBar = () => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="#" className="brand-link">
        <img src="/src/resources/dist/img/LOGO_TT_.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
        <span className="brand-text font-weight-light">Service TT</span>
      </a>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
          <MdOutlineAdminPanelSettings  style={{width: '100%'}} />
          </div>
          <div className="info">
            <a href="#" className="d-block">Admin</a>
          </div>
        </div>

        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>
                  Dashboard
                </p>
              </a>
            </li>
            <li className="nav-item">
            
            <Link to={"/client" }className="nav-link">
            <i className="fa fa-user-tie nav-icon fas"></i>
                <p>
                  Client
                </p>
              </Link>
            </li>
            <li className="nav-item">
                          
           <Link to={"/employees"} className="nav-link">
             <i className="fa fa-user nav-icon fas"></i>
              <p>
                Employee
              </p>
            </Link>

            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>

  )
}

export default SideBar