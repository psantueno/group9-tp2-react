import { useState } from 'react';
import { Title } from '../../components/Title/Title';
import { List } from '../../components/List/List';
import { Star } from 'lucide-react';
import { Play } from 'lucide-react';
import './Home.css';


const titlePage = "Gestor de Películas y Series";

const forSeeList = {
    subtitle: "Por ver",
    sentence: "Añade una serie o película.",
    empty: true,
    icon: <Play fill="lightgreen" strokeWidth={1} size={24}/>
  };
  
  const viewList = {
    subtitle: "Vistas",
    sentence: "Aún no has añadido una pelicula o serie como vista.",
    empty: true,
    icon: <Star fill="yellow" strokeWidth={0.5} size={24}/>
  };

export const Home = () => {

  const [search, setSearch] = useState('');

  return (
    <div className="container">
        <Title text={titlePage} />


      {/* Buscador y Filtros */}
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar por título o director"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input"
        />

        <select className="select">
          <option value="">Todos los géneros</option>
          <option value="drama">Drama</option>
          <option value="comedia">Comedia</option>
          <option value="acción">Acción</option>
        </select>

        <select className="select">
          <option value="">Películas y Series</option>
          <option value="pelicula">Película</option>
          <option value="serie">Serie</option>
        </select>
      </div>

      {/* Listas */}

      <div className="listas">
        <List list= {forSeeList} /> // renderiza las pelis por ver.
        <List list= {viewList} /> // renderiza las pelis ya vistas.
      </div>

      {/* Formulario */}
      <div className="formulario">
        <h2>Agregar nueva película o serie</h2>
        <form>
          <input className="input" type="text" placeholder="Título" required />
          <input className="input" type="text" placeholder="Director" required />
          <input className="input" type="number" placeholder="Año" required />

          <select className="select" required>
            <option value="">Género</option>
            <option value="drama">Drama</option>
            <option value="comedia">Comedia</option>
            <option value="acción">Acción</option>
          </select>

          <input className="input" type="number" placeholder="Rating (1-10)" min="1" max="10" />

          <select className="select" required>
            <option value="">Tipo</option>
            <option value="pelicula">Película</option>
            <option value="serie">Serie</option>
          </select>

          <button className="button" type="submit">Agregar</button>
        </form>
      </div>
    </div>
  );
};
