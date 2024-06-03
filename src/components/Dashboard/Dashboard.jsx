import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom'; // Import Link
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faNewspaper, faGear, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import BlogPost from '../BlogPost/BlogPost.jsx';
import Profile from '../Profile/Profile.jsx'

const Dashboard = () => {
    return (
        <div className='dashcontainer'>
            <div className='leftsidebar'>
                <div className="sidebar-content">
                    <h1>Dashboard</h1>
                    
                    <Link to="/profile" className="sidebar-link"><FontAwesomeIcon icon={faUser} className="icon" />Profile</Link><br></br>
                    <Link to="/blogpost" className="sidebar-link"><FontAwesomeIcon icon={faNewspaper} className="icon" />Blog</Link><br></br>
                </div>
                <div className="logout-container">
                    <Link to="/logout" className="logoutlink">Log out<FontAwesomeIcon icon={faArrowRightFromBracket} className="icon" /></Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
