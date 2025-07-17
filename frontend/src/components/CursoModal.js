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
          <Form.Group className="mb-3">
            <Form.Label>Horario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Lunes 10:00 - 12:00"
              value={nuevoCurso.horario}
              onChange={(e) =>
                setNuevoCurso({ ...nuevoCurso, horario: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Aula</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Aula 204"
              value={nuevoCurso.aula}
              onChange={(e) =>
                setNuevoCurso({ ...nuevoCurso, aula: e.target.value })
              }
            />
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
        <Button variant="primary" onClick={handleCrearCurso}>{nuevoCurso.id ? "Actualizar" : "Guardar"}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CursoModal;