import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonGroup, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const URL = "https://full-rest-api-with-node-express.onrender.com/api/users";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "", phone: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { username, email, phone } = user;

  const getUser = async () => {
    try {
      const res = await axios.get(URL + `/${id}`);
      setUser(res.data.man);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUsers = async () => {
    try {
      await axios.put(URL + `/${id}`, user);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUsers();
    toast("A Selected User has been Updated Successfully.");
    setUser({ username: "", email: "", phone: "" });
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center bg-light w-100 vh-100">
        {loading && <h2>Loading...</h2>}
        {error && <p>{error}</p>}
        <ToastContainer />
        <h1 style={{ color: "goldenrod" }} className="m-3">
          Update a Selected User
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
                Update Data
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

export default Update;
