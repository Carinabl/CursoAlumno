package com.curso.cursoalumno.controller;

import com.curso.cursoalumno.entity.Curso;
import com.curso.cursoalumno.repository.CursoRepository;
import com.curso.cursoalumno.service.CursoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cursos")
public class CursoController {

    @Autowired
    private CursoService cursoService;

    @Autowired
    private CursoRepository cursoRepository;

    // Obtener todos los cursos
    @GetMapping
    public List<Curso> listarCursos() {
        return cursoRepository.findAll();
    }

    // Obtener un curso por ID
    @GetMapping("/{id}")
    public ResponseEntity<Curso> obtenerCursoPorId(@PathVariable Long id) {
        Optional<Curso> curso = cursoRepository.findById(id);
        return curso.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear un nuevo curso
    @PostMapping
    public Curso crearCurso(@RequestBody Curso curso) {
        return cursoRepository.save(curso);
    }

    // Actualizar un curso existente
    @PutMapping("/{id}")
    public ResponseEntity<Curso> actualizarCurso(@PathVariable Long id, @RequestBody Curso nuevoCurso) {
        return cursoRepository.findById(id)
                .map(cursoExistente -> {
                    cursoExistente.setNombre(nuevoCurso.getNombre());
                    cursoExistente.setHorario(nuevoCurso.getHorario());
                    cursoExistente.setAula(nuevoCurso.getAula());
                    Curso actualizado = cursoRepository.save(cursoExistente);
                    return ResponseEntity.ok(actualizado);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Eliminar un curso
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCurso(@PathVariable Long id) {
    Optional<Curso> cursoOpt = cursoRepository.findById(id);
    if (cursoOpt.isPresent()) {
        Curso curso = cursoOpt.get();

        // Desasociar los alumnos antes de eliminar
        curso.getAlumnos().forEach(alumno -> alumno.getCursos().remove(curso));
        curso.getAlumnos().clear();
        cursoRepository.save(curso);  // Guardar los cambios antes de eliminar

        cursoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    } else {
        return ResponseEntity.notFound().build();
    }
    }
}