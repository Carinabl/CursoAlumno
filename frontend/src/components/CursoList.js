import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import CursoModal from './CursoModal';
import { FaEye } from "react-icons/fa";


function CursoList() {
  const [cursos, setCursos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevoCurso, setNuevoCurso] = useState({ nombre: "" , horario: "", aula: "" });
  const [editando, setEditando] = useState(false);
  
      
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/cursos`).then((res) => {
      setCursos(res.data);
    });
  }, []);
  
  const handleCrearCurso = async () => {
  if (!nuevoCurso.nombre.trim()) return;

  try {
    if (editando) {
      // Si estamos editando, enviamos una petición PUT
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/cursos/${nuevoCurso.id}`, nuevoCurso);
      setCursos(cursos && cursos.map(c => c.id === nuevoCurso.id ? response.data : c));
    } else {
      // Si no estamos editando, enviamos una petición POST
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/cursos`, nuevoCurso);
      setCursos([...cursos, response.data]);
    }

    // Resetear
    setNuevoCurso({ nombre: "" , horario: "", aula: ""  });
    setShowModal(false);
    setEditando(false);
  } catch (error) {
    console.error("Error al guardar el curso:", error);
  }
};

  const handleEliminarCurso = (cursoId) => {
  axios.delete(`${process.env.REACT_APP_API_URL}/cursos/${cursoId}`)
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
        <Button
        onClick={() => {
        setNuevoCurso({ nombre: "", horario: "", aula: "" }); // ← limpiamos el formulario
        setEditando(false);                                   // ← aseguramos que no está editando
        setShowModal(true);                                   // ← abrimos el modal
        }}
        >
    Crear Curso
      </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Nombre del curso</th>
            <th>Horario</th>
            <th>Aula</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cursos && cursos.map(curso => (
            <tr key={curso.id}>
              <td>{curso.nombre}</td>
              <td>{curso.horario}</td>
              <td>{curso.aula}</td>
              <td>
                <div className="d-flex gap-2">
                  <Link to={`/curso/${curso.id}`} className="btn btn-sm btn-outline-primary">
                  <FaEye style={{ marginRight: "5px" }} /> Ver
                  </Link>
                  <Button onClick={() => handleEditarCurso(curso)}>✏️ Editar</Button>
                  <Button variant="secondary" onClick={() => handleEliminarCurso(curso.id)}>🗑 Eliminar</Button>
                                    
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

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