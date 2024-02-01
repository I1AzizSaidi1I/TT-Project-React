import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();

    // Move the useState hook outside the handleLogout function
    const [notifications, setNotifications] = useState([
        {id: 1, message: 'New notification 1'},

        // Add more notifications as needed
    ]);

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
            navigate("/login");
        } catch (error) {
            console.error('Error logging out:', error);
        }

        // Clear notifications on logout
        setNotifications([]);

        // Additional logic for handling notifications can be added here
    };

    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button">
                        <i className="fas fa-bars"/>
                    </a>
                </li>
            </ul>
            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto">
                {/* Notifications Dropdown Menu */}
                <li className="nav-item dropdown">
                    <a className="nav-link mr-4" data-toggle="dropdown" href="#notifications">
                        <i className="far fa-bell"/>
                        <span className="badge badge-warning navbar-badge">
              {notifications.length}
            </span>
                    </a>

                    <div
                        className="dropdown-menu dropdown-menu-lg dropdown-menu-right"
                        style={{left: "inherit", right: 0}}
                    >
            <span className="dropdown-item dropdown-header">
              15 Notifications
            </span>
                        <div className="dropdown-divider"/>
                        <a href="#" className="dropdown-item">
                            <i className="fas fa-envelope mr-2"/> 4 new messages
                            <span className="float-right text-muted text-sm">3 mins</span>
                        </a>
                        <div className="dropdown-divider"/>
                        <a href="#" className="dropdown-item">
                            <i className="fas fa-users mr-2"/> 8 friend requests
                            <span className="float-right text-muted text-sm">12 hours</span>
                        </a>
                        <div className="dropdown-divider"/>
                        <a href="#" className="dropdown-item">
                            <i className="fas fa-file mr-2"/> 3 new reports
                            <span className="float-right text-muted text-sm">2 days</span>
                        </a>
                        <div className="dropdown-divider"/>
                        <a href="#" className="dropdown-item dropdown-footer">
                            See All Notifications
                        </a>
                    </div>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <h2>Notifications</h2>
                        <ul>
                            {notifications.map((notification) => (
                                <li key={notification.id}>{notification.message}</li>
                            ))}
                        </ul>
                    </div>
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
    );
};

export default NavBar;
