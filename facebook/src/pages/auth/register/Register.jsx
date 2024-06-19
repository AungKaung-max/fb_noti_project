import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
export default function Register({ show, handleClose }) {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

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
          handleClose(); // Close the registration modal
        }
        handleClose();
      } catch (error) {
        toast.error("Registration failed. Please check your details and try again.");
        console.log("No data Found!");
      }
    })();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
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
  );
}
