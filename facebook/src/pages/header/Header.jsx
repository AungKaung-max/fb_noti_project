import { Link } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Login from "../auth/login/Login";
import Register from "../auth/register/Register";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLoginShow = () => setShowLogin(true);
  const handleRegisterShow = () => setShowRegister(true);
  const handleLoginClose = () => setShowLogin(false);
  const handleRegisterClose = () => setShowRegister(false);

  const switchToRegister = () => {
    handleLoginClose();
    setShowRegister(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");

  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Micro Vita
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                {token ? (
                  <Link to="/create">
                    <a className="nav-link" aria-current="page" href="#">
                      +Create Post
                    </a>
                  </Link>
                ) : (
                  ""
                )}
              </li>
            </ul>
            {token ? (
              <ul className="navbar-nav ms-auto">
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
                    <li>
                      <a className="dropdown-item" href="#" onClick={handleLogout}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ms-auto">
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
                    <li>
                      <a className="dropdown-item" href="#" onClick={handleLoginShow}>
                        Login
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#" onClick={handleRegisterShow}>
                        Register
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>

      <Login show={showLogin} handleClose={handleLoginClose} switchToRegister={switchToRegister} />
      <Register show={showRegister} handleClose={handleRegisterClose} />

      <ToastContainer />
    </>
  );
}
