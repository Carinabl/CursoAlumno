import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AlumnoModal from './AlumnoModal'; 
import { useNavigate } from 'react-router-dom';

const CursoDetalle = () => {
  const { id } = useParams();
  const [curso, setCurso] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [nuevoAlumno, setNuevoAlumno] = useState({ nombre: '' });
  const navigate = useNavigate();

  const volver = () => {
  navigate(-1); // -1 significa "volver atrás"
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/cursos/${id}`)
      .then(res => setCurso(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleCrearAlumno = () => {
    
    axios.post('http://localhost:8080/alumnos', nuevoAlumno)
      .then(res => {
        const alumnoCreado = res.data;
        // Inscribir el alumno al curso
        return axios.post(`http://localhost:8080/alumnos/${alumnoCreado.id}/cursos/${id}`);
      })
      .then(() => {
        // Recargar curso con nuevos alumnos
        return axios.get(`http://localhost:8080/cursos/${id}`);
      })
      .then(res => {
        setCurso(res.data);
        setNuevoAlumno({ nombre: '' });
        setShowModal(false);
      })
      .catch(err => console.error(err));
  };
  

  if (!curso) return <p>Cargando...</p>;

  return (
    <div className="container mt-4">
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>{curso.nombre}</h2>
      <p><strong>Horario:</strong> {curso.horario || "Sin definir"}</p>
      <p><strong>Aula:</strong> {curso.aula || "Sin asignar"}</p>
      </div>
      <h4>Alumnos:</h4>
      <ul>
        {curso && curso.alumnos && curso.alumnos.map(alumno => (
          <li key={alumno.id}>{alumno.nombre}</li>
        ))}
      </ul>

      <button onClick={() => setShowModal(true)} className="btn btn-primary mt-3" style={{ marginRight: '10px' }}>
        ➕ Agregar Alumno
      </button>
      <button onClick={volver} className="btn btn-secondary mt-3">
        Volver
      </button> 

      <AlumnoModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        nuevoAlumno={nuevoAlumno}
        setNuevoAlumno={setNuevoAlumno}
        handleCrearAlumno={handleCrearAlumno}
      />
    </div>
  );
};

export default CursoDetalle;