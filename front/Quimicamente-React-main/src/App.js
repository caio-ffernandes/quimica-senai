import React, {useState,useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Introduction, History, Applications, Orbita , FunctionalGroups, Conclusion} from './Sections';
import Carousel from './Carousel';
import api from './api';
import axios from 'axios';

function App() {

  useEffect(()=>{
api.get('usuarios').then(res=>{
  console.log(res.data)
})
api.get('compostos').then(res=>{
  console.log(res.data)
})
api.get('usos').then(res=>{
  console.log(res.data)
})
api.get('propriedades').then(res=>{
  console.log(res.data)
})
api.get('grupos').then(res=>{
  console.log(res.data)
})
  },[])

  return (
    <Router>
      <header>
        <h1>Química Orgânica</h1>
        <nav>
          <ul>
            <li><Link to="#introducao">Introdução</Link></li>
            <li><Link to="#historico">Histórico</Link></li>
            <li><Link to="#estruturas">Estruturas</Link></li>
            <li><Link to="#aplicacoes">Aplicações</Link></li>
            <li><Link to="#carrossel">Galeria</Link></li>
            <li><Link to="#conclusao">Conclusão</Link>
            </li>
          </ul>
          <ul>
            <li><Link to="/compostos">Compostos</Link></li>
            
          </ul>
        </nav>
      </header>

      <main>
        <section id="introducao">
          <Introduction />
        </section>
        <section id="historico">
          <History />
        </section>
        <section id="aplicacoes">
          <Applications />
        </section>
        <section id="grupos">
          <FunctionalGroups />
        </section>
        <Orbita />
        <section id="carrossel">
          <Carousel />
        </section>
        <section id="conclusao">
          <Conclusion />
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Química Orgânica. Todos os direitos reservados.</p>
      </footer>
    </Router>
    
  );
}

export default App;
