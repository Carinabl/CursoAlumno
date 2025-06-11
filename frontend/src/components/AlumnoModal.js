import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AlumnoModal = ({ show, handleClose, nuevoAlumno, setNuevoAlumno, handleCrearAlumno }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Alumno</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="nombre">
            <Form.Label>Nombre del Alumno</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre"
              value={nuevoAlumno.nombre}
              onChange={(e) => setNuevoAlumno({ ...nuevoAlumno, nombre: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleCrearAlumno}>
          Agregar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlumnoModal;