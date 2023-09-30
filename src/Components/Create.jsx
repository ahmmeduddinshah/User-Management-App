import React, { useState } from "react";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const URL = "https://full-rest-api-with-node-express.onrender.com/api/users";

const Create = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "", phone: "" });
  const [error, setError] = useState(null);
  const { username, email, phone } = user;

  const createUsers = async () => {
    try {
      await axios.post(URL, user);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUsers();
    toast("A New User has been Created Successfully.");
    setUser({ username: "", email: "", phone: "" });
  };

  return (
    <>
      <ToastContainer />
      <div className="d-flex flex-column justify-content-center align-items-center bg-light w-100 vh-100">
        {error && <p>{error}</p>}
        <h1 style={{ color: "goldenrod" }} className="m-3">
          Add User
        </h1>
        <div className="w-50 rounded bg-white border shadow p-4">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="username">User Name</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={username}
                onChange={(e) =>
                  setUser({ ...user, [e.target.name]: e.target.value })
                }
                placeholder="Enter User Name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={(e) =>
                  setUser({ ...user, [e.target.name]: e.target.value })
                }
                placeholder="Enter Email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="phone">Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={phone}
                onChange={(e) =>
                  setUser({ ...user, [e.target.name]: e.target.value })
                }
                placeholder="Enter Phone"
                required
              />
            </Form.Group>
            <ButtonGroup>
              <Button variant="primary" type="submit">
                Submit Data
              </Button>
              <Button variant="secondary" onClick={() => navigate("/")}>
                Back
              </Button>
            </ButtonGroup>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Create;
