import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Introduction, History, Applications, Orbita, FunctionalGroups, Conclusion } from './Sections';
import Carousel from './Carousel';
import api from './api';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [compostos, setCompostos] = useState([]);
  const [usos, setUsos] = useState([]);
  const [propriedades, setPropriedades] = useState([]);
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    api.get('usuarios').then(res => {
      console.log('Usuarios:', res.data);
      setUsuarios(res.data);
    });
    api.get('compostos').then(res => {
      console.log('Compostos:', res.data);
      setCompostos(res.data);
    });
    api.get('usos').then(res => {
      console.log('Usos:', res.data);
      setUsos(res.data);
    });
    api.get('propriedades').then(res => {
      console.log('Propriedades:', res.data);
      setPropriedades(res.data);
    });
    api.get('grupos').then(res => {
      console.log('Grupos:', res.data);
      setGrupos(res.data);
    });
  }, []);

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
            <li><Link to="#conclusao">Conclusão</Link></li>
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
        
        <section id="usuarios">
          <h2>Usuários</h2>
          <ul>
            {usuarios.map(usuario => (
              <li key={usuario.id}>{usuario.nome}</li>
            ))}
          </ul>
        </section>

        <section id="compostos">
          <h2>Compostos e Usos</h2>
          {compostos.map(composto => (
            <div key={composto.id}>
              <h3>{composto.nome}</h3>
              <ul>
                {usos.filter(uso => {
                  console.log('Comparando:', uso.composto, 'com', composto.id);
                  return uso.composto === composto.id;
                }).map(uso => (
                  <li key={uso.id}>{uso.descricao}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section id="propriedades">
          <h2>Propriedades</h2>
          <ul>
            {propriedades.map(propriedade => (
              <li key={propriedade.id}>{propriedade.nome}</li>
            ))}
          </ul>
        </section>

        <section id="grupos">
          <h2>Grupos</h2>
          <ul>
            {grupos.map(grupo => (
              <li key={grupo.id}>{grupo.nome}</li>
            ))}
          </ul>
        </section>

      </main>

      <footer>
        <p>&copy; 2024 Química Orgânica. Todos os direitos reservados.</p>
      </footer>
    </Router>
  );
}

export default App;
