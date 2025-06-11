package com.curso.cursoalumno.service;

import com.curso.cursoalumno.entity.Curso;
import com.curso.cursoalumno.repository.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CursoService {

    @Autowired
    private CursoRepository cursoRepository;

    // Crear un curso
    public Curso crearCurso(Curso curso) {
        return cursoRepository.save(curso);
    }

    // Listar todos los cursos
    public List<Curso> listarCursos() {
        return cursoRepository.findAll();
    }

    // Obtener un curso por ID
    public Optional<Curso> obtenerCursoPorId(Long id) {
        return cursoRepository.findById(id);
    }

    // Actualizar un curso existente
    public Optional<Curso> actualizarCurso(Long id, Curso nuevoCurso) {
        return cursoRepository.findById(id).map(cursoExistente -> {
            cursoExistente.setNombre(nuevoCurso.getNombre());
            return cursoRepository.save(cursoExistente);
        });
    }

    // Eliminar un curso
    public boolean eliminarCurso(Long id) {
        if (cursoRepository.existsById(id)) {
            cursoRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
