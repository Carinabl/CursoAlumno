import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CursoModal = ({ show, handleClose, nuevoCurso, setNuevoCurso, handleCrearCurso }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Curso</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre del curso"
              value={nuevoCurso.nombre}
              onChange={(e) => setNuevoCurso({ ...nuevoCurso, nombre: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
        <Button variant="primary" onClick={handleCrearCurso}>Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CursoModal;