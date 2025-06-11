import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CursoList from './components/CursoList';
import CursoDetalle from './components/CursoDetalle';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Administración de Cursos</h1>
        <Routes>
          <Route path="/" element={<CursoList />} />
          <Route path="/curso/:id" element={<CursoDetalle />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;