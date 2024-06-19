import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function Navform() {
  const [showLogin, setShowLogin] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUserName, setLoginUserName] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const result = await axios.post(
          "http://localhost:4000/api/users/register",
          {
            username: registerUsername,
            email: registerEmail,
            password: registerPassword,
          }
        );
        console.log(result.data);
        if (result.data) {
          toast.success("Registration successful! You can now log in.");
          handleRegisterClose(); // Close the registration modal
        }
        handleRegisterClose();
      } catch (error) {
        toast.error(
          "Registration failed. Please check your details and try again."
        );
        console.log("No data Found!");
      }
    })();
    handleRegisterClose();
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const result = await axios.post(
          "http://localhost:4000/api/users/login",
          {
            username: loginUserName,
            email: loginEmail,
            password: loginPassword,
          },
        );
        if (result.data) {
          localStorage.setItem("user", result.data.payload.userId);
          localStorage.setItem("token", result.data.token);
          toast.success("Login successful!");
          handleLoginClose();
        }
      } catch (error) {
        toast.error(
          "Login failed. Please check your credentials and try again."
        );
        console.error(
          "Login error:",
          error.response ? error.response.data : error.message
        );
      }
    })();
    handleLoginClose();
  };

  const handleLoginShow = (e) => {
    e.preventDefault();
    setShowLogin(true);
  };

  const handleRegisterShow = (e) => {
    e.preventDefault();
    setShowRegister(true);
  };
  const handleLoginClose = () => setShowLogin(false);

  const handleRegisterClose = () => setShowRegister(false);

  const switchToRegister = () => {
    handleLoginClose();
    setShowRegister(true);
  };

  const handleLogout = () =>
    {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/");
    }

  return (
    <>
      <nav className="navbar navbar-expand-lg  navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Micro Vita
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                {token ? <Link to="/create">
                  <a className="nav-link" aria-current="page" href="#">
                    +Create Post
                  </a>
                </Link> :
                  ""
                } 
              </li>
            </ul>
            {token?( <ul className="navbar-nav ms-auto">
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
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={handleLogout}
                    >
                        Logout
                    </a>
                  </li>
                  {/* <li>
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
                  </li> */}
                </ul>
              </li>
            </ul>):
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
               </ul>
             </li>
           </ul>
            }
           
          </div>
        </div>
      </nav>

      <Modal show={showLogin} onHide={handleLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group controlId="formLoginName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                value={loginUserName}
                onChange={(e) => setLoginUserName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formLoginEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formLoginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <div className="mt-3">
            <span>Don&apos;t have an account? </span>
            <Button variant="link" onClick={switchToRegister}>
              Register here
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showRegister} onHide={handleRegisterClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRegisterSubmit}>
            <Form.Group controlId="formRegisterUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formRegisterEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formRegisterPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </>
  );
}
