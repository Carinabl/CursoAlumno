package com.curso.cursoalumno.service;

import com.curso.cursoalumno.entity.Alumno;
import com.curso.cursoalumno.repository.AlumnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlumnoService {

    @Autowired
    private AlumnoRepository alumnoRepository;

    // Crear un alumno
    public Alumno crearAlumno(Alumno alumno) {
        return alumnoRepository.save(alumno);
    }

    // Obtener todos los alumnos
    public List<Alumno> listarAlumnos() {
        return alumnoRepository.findAll();
    }

    // Obtener un alumno por ID
    public Optional<Alumno> obtenerAlumnoPorId(Long id) {
        return alumnoRepository.findById(id);
    }

    // Actualizar un alumno
    public Optional<Alumno> actualizarAlumno(Long id, Alumno nuevoAlumno) {
        return alumnoRepository.findById(id).map(alumnoExistente -> {
            alumnoExistente.setNombre(nuevoAlumno.getNombre());
            return alumnoRepository.save(alumnoExistente);
        });
    }

    // Eliminar un alumno
    public boolean eliminarAlumno(Long id) {
        if (alumnoRepository.existsById(id)) {
            alumnoRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
