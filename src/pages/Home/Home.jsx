import { useEffect, useState } from 'react';
import { Title } from '../../components/Title/Title';
import { List } from '../../components/List/List';
import { Star } from 'lucide-react';
import { Play } from 'lucide-react';
import './Home.css';

const titlePage = "Gestor de Películas y Series";

export const Home = () => {
    //localStorage.clear();
    const defaultMovie = {
        titulo: "El Padrino",
        director: "Francis Ford Coppola",
        anio: 1972,
        genero: "Drama",
        rating: 9.2,
        tipo: "Pelicula"
    }
    const defualtSerie = {
        titulo: "Breaking Bad",
        director: "Vince Gilligan",
        anio: 2008,
        genero: "Drama",
        rating: 9.5,
        tipo: "Serie"
    }
    localStorage.setItem('toWatchList', JSON.stringify([defaultMovie]));
    localStorage.setItem('watchedList', JSON.stringify([defualtSerie]));
    
    const [search, setSearch] = useState('');

    const [toWatchList, setToWatchList] = useState(JSON.parse(localStorage.getItem('toWatchList')) || []);
    const [watchedList, setWatchedList] = useState(JSON.parse(localStorage.getItem('watchedList')) || []);

    useEffect(() => {
        localStorage.setItem('toWatchList', JSON.stringify(toWatchList));
    }, [toWatchList]);

    useEffect(() => {
        localStorage.setItem('watchedList', JSON.stringify(watchedList));
    }, [watchedList]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const toWatchList = JSON.parse(localStorage.getItem('toWatchList')) || [];
        toWatchList.push(data);
        setToWatchList(toWatchList);
        e.target.reset();
    };

    const changeItemState = (item) => {
        const toWatchList = JSON.parse(localStorage.getItem('toWatchList')) || [];
        const watchedList = JSON.parse(localStorage.getItem('watchedList')) || [];

        if(toWatchList.some((i) => i.titulo === item.titulo)){
            setToWatchList(toWatchList.filter((i) => i.titulo !== item.titulo));
            setWatchedList([...watchedList, item]);
        }else{
            setWatchedList(watchedList.filter((i) => i.titulo !== item.titulo));
            setToWatchList([...toWatchList, item]);
        }
    }

    const toWatchListProps = {
        subtitle: "Por ver",
        sentence: "Añade una serie o película.",
        itemsList: toWatchList,
        icon: <Play fill="lightgreen" strokeWidth={1} size={24} />,
        stateChangeAction: changeItemState
    };
    const watchedListProps = {
        subtitle: "Vistas",
        sentence: "Aún no has añadido una pelicula o serie como vista.",
        itemsList: watchedList,
        icon: <Star fill="yellow" strokeWidth={0.5} size={24} />,
        stateChangeAction: changeItemState
    };

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
                    <option value="aventura">Aventura</option>
                    <option value="terror">Terror</option>
                    <option value="romantica">Románticas</option>
                    <option value="ciencia ficción">Ciencia Ficción</option>
                </select>

                <select className="select">
                    <option value="">Películas y Series</option>
                    <option value="pelicula">Película</option>
                    <option value="serie">Serie</option>
                </select>
            </div>

            {/* Listas */}

            <div className="listas">

                <List list={toWatchListProps} /> //{/* renderiza las pelis por ver */}
                <List list={watchedListProps} /> {/*//  renderiza las pelis ya vistas.*/}

                

            </div>

            {/* Formulario */}
            <div className="formulario">
                <h2>Agregar nueva película o serie</h2>
                <form onSubmit={handleSubmit}>
                    <input className="input" name="titulo" id="titulo" type="text" placeholder="Título" required/>
                    <input className="input" name="director" id="director" type="text" placeholder="Director" required/>
                    <input className="input" name="anio" id="anio" type="number" placeholder="Año" min="0" max="2025" required/>

                    <select className="select" name="genero" id="genero">
                        <option value="">Género</option>
                        <option value="Drama">Drama</option>
                        <option value="Comedia">Comedia</option>
                        <option value="Acción">Acción</option>
                    </select>

                    <input className="input" name="rating" id="rating" type="number" placeholder="Rating (1-10)" min="1" max="10" required/>

                    <select className="select" name="tipo" id="tipo">
                        <option value="">Tipo</option>
                        <option value="Pelicula">Película</option>
                        <option value="Serie">Serie</option>
                    </select>

                    <button className="button" type="submit">Agregar</button>
                </form>
            </div>
        </div>
    );
};

