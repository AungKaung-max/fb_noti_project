import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Login({ show, handleClose, switchToRegister }) {
  const navigate = useNavigate();
  const [loginUserName, setLoginUserName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

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
          }
        );
        if (result.data) {
          localStorage.setItem("user", result.data.payload.userId);
          localStorage.setItem("token", result.data.token);
          toast.success('Login successful!');
          navigate('/')
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
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
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
            <span>Dont have an account? </span>
            <Button variant="link" onClick={switchToRegister}>
              Register here
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
