import React from 'react'
import axios from 'axios'; 
import { Link, useNavigate } from "react-router-dom";


const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const jwtToken = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    };
    try {
      const response = await axios.post("http://localhost:8000/api/logout", {}, config);
      console.log(response.data); 
      localStorage.removeItem('token');
      navigate("/login")
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="pushmenu"
                href="#"
                role="button"
              >
                <i className="fas fa-bars" />
              </a>
            </li>
          </ul>
          {/* Right navbar links */}
          <ul className="navbar-nav ml-auto">
            {/* Notifications Dropdown Menu */}
            <li className="nav-item dropdown">
              <a className="nav-link" data-toggle="dropdown" href="#">
                <i className="far fa-bell" />
                <span className="badge badge-warning navbar-badge">15</span>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right"></div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="fullscreen"
                href="#"
                role="button"
              >
                <i className="fas fa-expand-arrows-alt" />
              </a>
            </li>
            <li className="nav-item">
              {/* Logout Button */}
              <div className="logout-button d-flex justify-content-center mt-auto">
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </li>
          </ul>
        </nav>
  )
}

export default NavBar