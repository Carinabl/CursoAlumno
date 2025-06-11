package com.curso.cursoalumno.controller;

import com.curso.cursoalumno.entity.Alumno;
import com.curso.cursoalumno.entity.Curso;
import com.curso.cursoalumno.repository.AlumnoRepository;
import com.curso.cursoalumno.repository.CursoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/alumnos")
public class AlumnoController {

    @Autowired
    private AlumnoRepository alumnoRepository;

    @Autowired
    private CursoRepository cursoRepository;

    @PostMapping("/{alumnoId}/cursos/{cursoId}")
    public ResponseEntity<?> inscribirAlumnoACurso(@PathVariable Long alumnoId, @PathVariable Long cursoId) {
        Alumno alumno = alumnoRepository.findById(alumnoId).orElseThrow();
        Curso curso = cursoRepository.findById(cursoId).orElseThrow();

        alumno.getCursos().add(curso);
        alumnoRepository.save(alumno);

        return ResponseEntity.ok().build();
    }
}
