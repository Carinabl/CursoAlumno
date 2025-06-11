import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import CursoModal from './CursoModal';

function CursoList() {
  const [cursos, setCursos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevoCurso, setNuevoCurso] = useState({ nombre: "" });
  const [editando, setEditando] = useState(false);
      
  useEffect(() => {
    axios.get("http://localhost:8080/cursos").then((res) => {
      setCursos(res.data);
    });
  }, []);
  
  const handleCrearCurso = async () => {
  if (!nuevoCurso.nombre.trim()) return;

  try {
    if (editando) {
      // Si estamos editando, enviamos una petición PUT
      const response = await axios.put(`http://localhost:8080/cursos/${nuevoCurso.id}`, nuevoCurso);
      setCursos(cursos.map(c => c.id === nuevoCurso.id ? response.data : c));
    } else {
      // Si no estamos editando, enviamos una petición POST
      const response = await axios.post("http://localhost:8080/cursos", nuevoCurso);
      setCursos([...cursos, response.data]);
    }

    // Resetear
    setNuevoCurso({ nombre: "" });
    setShowModal(false);
    setEditando(false);
  } catch (error) {
    console.error("Error al guardar el curso:", error);
  }
};

  const handleEliminarCurso = (cursoId) => {
  axios.delete(`http://localhost:8080/cursos/${cursoId}`)
    .then(() => {
      setCursos(cursos.filter(curso => curso.id !== cursoId));
    })
    .catch(err => {
      console.error("Error al eliminar curso:", err);
      alert("Ocurrió un error al eliminar el curso.");
    });
  };

  const handleEditarCurso = (curso) => {
  setNuevoCurso({ ...curso });
  setEditando(true);
  setShowModal(true);
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
                  <Button onClick={() => handleEditarCurso(curso)}>✏️ Editar</Button>
                  <Button variant="secondary" onClick={() => handleEliminarCurso(curso.id)}>🗑 Eliminar</Button>
                                    
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