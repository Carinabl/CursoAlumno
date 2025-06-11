import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import CursoModal from './CursoModal';

function CursoList() {
  const [cursos, setCursos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevoCurso, setNuevoCurso] = useState({ nombre: "" });
  
  useEffect(() => {
    axios.get("http://localhost:8080/cursos").then((res) => {
      setCursos(res.data);
    });
  }, []);
  
  const handleCrearCurso = async () => {
  try {
    const response = await axios.post("http://localhost:8080/cursos", nuevoCurso);
    setCursos([...cursos, response.data]); // actualiza la lista de cursos
    setNuevoCurso({ nombre: "" });
    setShowModal(false);
  } catch (error) {
    console.error("Error al crear curso", error);
  }
};

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Cursos</h2>
        <Button onClick={() => setShowModal(true)}>Crear Curso</Button>
      </div>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Nombre del curso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map(curso => (
            <tr key={curso.id}>
              <td>{curso.nombre}</td>
              <td>
                <div className="d-flex gap-2">
                  <Link to={`/curso/${curso.id}`} className="btn btn-sm btn-outline-primary">👁 Ver</Link>
                  <Button variant="outline-secondary" size="sm">✏️ Editar</Button>
                  <Button variant="outline-danger" size="sm">🗑 Eliminar</Button>
                  
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal separado como componente */}
    <CursoModal
      show={showModal}
      handleClose={() => setShowModal(false)}
      nuevoCurso={nuevoCurso}
      setNuevoCurso={setNuevoCurso}
      handleCrearCurso={handleCrearCurso}
    />
    </div>
  );
}

export default CursoList;