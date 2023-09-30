import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "react-bootstrap";

//Pages
import Home from "./Home";
import Create from "./Create";
import Read from "./Read";
import Update from "./Update";
import Error from "./Error";

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar className="justify-content-center bg-primary">
        <Navbar.Brand className="text-white">
          <h1>User Management App</h1>
        </Navbar.Brand>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/read/:id" element={<Read />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
