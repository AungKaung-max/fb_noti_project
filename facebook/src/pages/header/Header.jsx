/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Login from "../auth/login/Login";
import Register from "../auth/register/Register";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
import { Dropdown, ListGroup, Badge } from "react-bootstrap";
import "./Header.css"; // Import the custom CSS file

const SOCKET_URL = "http://localhost:4000";
const socket = io(SOCKET_URL);

export default function Header({ handleLogout }) {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user");
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (userId) {
      socket.emit("registerUser", userId);
    }

    const handleNewPost = (post) => {
      const newNotification = {
        _id: post._id,
        username: post.username,
        title: post.title,
      };
      setNotifications((prev) => [...prev, newNotification]);
      setUnreadCount((prev) => prev + 1);
    };

    socket.on("newPost", handleNewPost);

    return () => {
      socket.off("newPost", handleNewPost);
    };
  }, [userId]);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginShow = () => setShowLogin(true);
  const handleRegisterShow = () => setShowRegister(true);
  const handleLoginClose = () => setShowLogin(false);
  const handleRegisterClose = () => setShowRegister(false);

  const handleNotificationShow = () => {
    setUnreadCount(0);
  };

  const switchToRegister = () => {
    handleLoginClose();
    setShowRegister(true);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Micro Vita
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {token && (
                  <Link to="/create" className="nav-link" aria-current="page">
                    +Create Post
                  </Link>
                )}
              </li>
            </ul>

            <ul className="navbar-nav ms-auto">
              {token && (
                <li className="nav-item dropdown">
                  <Dropdown onToggle={handleNotificationShow}>
                    <Dropdown.Toggle as="div" className="nav-link notification-toggle">
                      <i className="fa-solid fa-bell"></i>
                      {unreadCount > 0 && (
                        <Badge bg="danger" className="notification-badge">{unreadCount}</Badge>
                      )}
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="end" className="notification-dropdown">
                      <Dropdown.Header>Notifications</Dropdown.Header>
                      <ListGroup variant="flush" className="notification-list">
                        {notifications.map((notification) => (
                          <ListGroup.Item key={notification._id} className="notification-item">
                            <div className="notification-content">
                              <span className="notification-username">{notification.username}</span> 
                              <span>created a new post:</span>
                              <div className="notification-title">{notification.title}</div>
                            </div>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={() => setUnreadCount(0)} className="mark-read">
                        Mark all as read
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              )}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Account
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  {token ? (
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={handleLogout}
                      >
                        Logout
                      </a>
                    </li>
                  ) : (
                    <>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={handleLoginShow}
                        >
                          Login
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={handleRegisterShow}
                        >
                          Register
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Login
        show={showLogin}
        handleClose={handleLoginClose}
        switchToRegister={switchToRegister}
      />
      <Register show={showRegister} handleClose={handleRegisterClose} />
      <ToastContainer />
    </>
  );
}
