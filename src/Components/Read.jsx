import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonGroup, Button } from "react-bootstrap";

const URL = "https://full-rest-api-with-node-express.onrender.com/api/users";

const Read = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { username, email, phone } = user;

  const getUser = async () => {
    try {
      const res = await axios.get(URL + `/${id}`);
      setUser(res.data.man);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
        {isLoading && <h2>Loading...</h2>}
        {error && <p>{error}</p>}

        <h1>Detail of a Selected User</h1>
        <div className="w-75 rounded bg-white border shadow p-4">
          <h3>Name: {username}</h3>
          <h3>Email: {email}</h3>
          <h3>Phone_No: {phone}</h3>
          <ButtonGroup>
            <Button variant="success" onClick={() => navigate(`/update/${id}`)}>
              Edit
            </Button>
            <Button variant="primary" onClick={() => navigate("/")}>
              Back
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </>
  );
};

export default Read;
