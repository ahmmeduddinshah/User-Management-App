import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const URL = "https://full-rest-api-with-node-express.onrender.com/api/users";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get(URL);
      setData(res.data.men);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Would You Like to Delete?")) {
        await axios.delete(URL + `/${id}`);
        toast("A Selected User has been Deleted Successfully.");
      }
      getUsers();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light">
      {isLoading && <h2>Loading...</h2>}
      {error && <p>{error}</p>}
      <ToastContainer />
      <h1 style={{ color: "goldenrod" }} className="m-3">
        List of Users
      </h1>
      <div className="w-75 rounded bg-white border shadow p-4">
        <div className="d-flex justify-content-end mb-2">
          <Button variant="success" onClick={() => navigate("/create")}>
            Add User +
          </Button>
        </div>
        <Table striped bordered hover>
          <thead className="text-center">
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, username, email, phone }) => (
              <tr key={uuidv4()}>
                <td>{id}</td>
                <td>{username}</td>
                <td>{email}</td>
                <td>{phone}</td>
                <td>
                  <ButtonGroup>
                    <Button
                      variant="warning"
                      onClick={() => navigate(`/read/${id}`)}
                    >
                      Read
                    </Button>
                    <Button
                      variant="info"
                      onClick={() => navigate(`/update/${id}`)}
                    >
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(id)}>
                      Delete
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Home;
