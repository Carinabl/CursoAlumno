package com.curso.cursoalumno.repository;

import com.curso.cursoalumno.entity.Curso;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CursoRepository extends JpaRepository<Curso, Long> {
}