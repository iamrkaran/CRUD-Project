import React from "react";
import axios from "axios";

import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Navigate } from "react-router-dom";
import Stack from "react-bootstrap/Stack";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";



const Liststudent = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState([]);

  const [state, setState] = useState({
    ufirstname: "",
    ulastname: "",
    uplace: "",
    uid: "",
  });

  const getStudents = () => {
    axios.get("http://localhost:5000/").then((res) => {
      console.log(res);
      setData(() => res.data);
    });
  };
  useEffect(() => {
    getStudents();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/students/${id}`).then((res) => {
      console.log(res);
      window.location = "/";
    });
  };

  const handleUpdate = (id, firstname, lastname, place) => {
    setState(() => {
      return {
        uid: id,
        ufirstname: firstname,
        ulastname: lastname,
        uplace: place,
      };
    });
    console.log(state);
    handleShow();
  };
  const updateField = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(state);
  };

  const handleModalUpdate = () => {
    axios
      .put(`http://localhost:5000/students/${state.uid}`, {
        firstname: state.ufirstname,
        lastname: state.ulastname,
        place: state.uplace,
      })
      .then((res) => {
        console.log(res);
        {
          () => setState({ ufirstname: "", ulastname: "", uplace: "" });
        }
        window.location = "/";
      });
  };

  return (
    <>
      {data.map((std) => (
        <div key={std._id} className="card" id="card">
          <div className="card-body">
            <h4>
              First Name: <span className="green-color">{std.firstname}</span>
            </h4>
            <h4>
              Last Name:
              <span className="green-color">{std.lastname}</span>
            </h4>
            <h4>
              Place: <span className="green-color">{std.place}</span>
            </h4>

            <div className="container" style={{ display: "inline" }}>
              <Button
              
                variant="primary"
                onClick={() =>
                  handleUpdate(std._id, std.firstname, std.lastname, std.place)
                }
              >
                UPDATE
              </Button>

              <button
                style={{ marginLeft: "20px" }}
                onClick={() => handleDelete(std._id)}
                className="btn btn-danger"
              >
                DELETE
              </button>
            </div>
          </div>

          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    name="ufirstname"
                    value={state.ufirstname}
                    onChange={updateField}
                  />

                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="ulastname"
                    value={state.ulastname}
                    onChange={updateField}
                  />

                  <Form.Label>Place Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Place"
                    name="uplace"
                    value={state.uplace}
                    onChange={updateField}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>

            <div className="d-grid gap-5">
              <Stack className="col-md-12">
                <Button variant="primary" size="lg" onClick={handleModalUpdate}>
                  Submit
                </Button>
              </Stack>
            </div>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
        </div>
      ))}
    </>
  );
};

export default Liststudent;
