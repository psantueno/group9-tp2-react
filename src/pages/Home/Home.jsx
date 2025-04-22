import { useEffect, useState } from 'react';
import { Title } from '../../components/Title/Title';
import { List } from '../../components/List/List';
import { Counter } from '../../components/Counter/Counter';
import { Star, Play, Search } from 'lucide-react';
import Button from '../../components/Button/Button';
import './Home.css';


const titlePage = "Gestor de Películas y Series";

export const Home = () => {
    //localStorage.clear();
    // const defaultMovie = {
    //     titulo: "El Padrino",
    //     director: "Francis Ford Coppola",
    //     anio: 1972,
    //     genero: "Drama",
    //     rating: 9.2,
    //     tipo: "Pelicula"
    // };
    // const defaultSerie = {
    //     titulo: "Breaking Bad",
    //     director: "Vince Gilligan",
    //     anio: 2008,
    //     genero: "Drama",
    //     rating: 9.5,
    //     tipo: "Serie"
    // };
    // if ((localStorage.getItem('toWatchList') === null && localStorage.getItem('watchedList') === null) || (localStorage.getItem('toWatchList') === "[]" && localStorage.getItem('watchedList') === "[]")) {
    //     localStorage.setItem('toWatchList', JSON.stringify([defaultMovie]));
    //     localStorage.setItem('watchedList', JSON.stringify([defaultSerie]));
    // }

    const [search, setSearch] = useState('');
    const [toWatchList, setToWatchList] = useState(JSON.parse(localStorage.getItem('toWatchList')) || []);
    const [watchedList, setWatchedList] = useState(JSON.parse(localStorage.getItem('watchedList')) || []);
     const [showForm, setShowForm] = useState(false);
    const [genreFilter, setGenreFilter] = useState(''); // Estado para el filtro de género
    const [typeFilter, setTypeFilter] = useState('');  // Estado para el filtro tipo (Peli/Serie)

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

        if (toWatchList.some((i) => i.titulo === item.titulo)) {
            setToWatchList(toWatchList.filter((i) => i.titulo !== item.titulo));
            setWatchedList([...watchedList, item]);
        } else {
            setWatchedList(watchedList.filter((i) => i.titulo !== item.titulo));
            setToWatchList([...toWatchList, item]);
        }
    }

    const editItem = (previousItemTitle, editedItem) => {
        const toWatchList = JSON.parse(localStorage.getItem('toWatchList')) || [];

        if (toWatchList.some((i) => i.titulo === previousItemTitle)) {
            setToWatchList(toWatchList.map((i) => i.titulo === previousItemTitle ? editedItem : i));
        } else {
            setWatchedList(watchedList.map((i) => i.titulo === previousItemTitle ? editedItem : i));
        }
    };

    const deleteItem = (item) => {
        const toWatchList = JSON.parse(localStorage.getItem('toWatchList')) || [];
        const watchedList = JSON.parse(localStorage.getItem('watchedList')) || [];

        if (toWatchList.some((i) => i.titulo === item.titulo)) {
            setToWatchList(toWatchList.filter((i) => i.titulo !== item.titulo));
        } else {
            setWatchedList(watchedList.filter((i) => i.titulo !== item.titulo));
        }
    };

    // Filtrar elementos combinados
    const combinedList = [
        ...toWatchList.map((item) => ({ ...item, listType: "Por Ver" })),
        ...watchedList.map((item) => ({ ...item, listType: "Vistas" }))
    ];

    const filteredList = combinedList.filter((item) => {
        const matchesSearch = search === '' || item.titulo.toLowerCase().includes(search.toLowerCase()) || item.director.toLowerCase().includes(search.toLowerCase());
        const matchesGenre = genreFilter === '' || item.genero.toLowerCase() === genreFilter.toLowerCase();
        const matchesType = typeFilter === '' || item.tipo.toLowerCase() === typeFilter.toLowerCase();
        return matchesSearch && matchesGenre && matchesType;
    });

    const toWatchListProps = {
        subtitle: "POR VER",
        sentence: "Añade una serie o película.",
        itemsList: toWatchList,
        icon: <Play fill="lightgreen" strokeWidth={1} size={24} />,
        stateChangeAction: changeItemState,
        editItemAction: editItem,
        deleteItemAction: deleteItem
    };

    const searchFilterList = {
        subtitle: "Resultados encontrados:",
        sentence: "No se encontraron elementos coincidentes.",
        itemsList: filteredList,
        icon: <Search fill="lightblue" strokeWidth={0.5} size={24} />,
        typeList: "Resultados",
        stateChangeAction: changeItemState,
        editItemAction: editItem,
        deleteItemAction: deleteItem
    };

    const watchedListProps = {
        subtitle: "VISTAS",
        sentence: "Aún no has añadido una pelicula o serie como vista.",
        itemsList: watchedList,
        icon: <Star fill="yellow" strokeWidth={0.5} size={24} />,
        stateChangeAction: changeItemState,
        editItemAction: editItem,
        deleteItemAction: deleteItem
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

                <select
                    className="select"
                    value={genreFilter}
                    onChange={(e) => setGenreFilter(e.target.value)}>
                    <option value="">- Seleecionar género -</option>
                    <option value="drama">Drama</option>
                    <option value="comedia">Comedia</option>
                    <option value="acción">Acción</option>
                    <option value="aventura">Aventura</option>
                    <option value="terror">Terror</option>
                    <option value="romantica">Románticas</option>
                    <option value="ciencia ficción">Ciencia Ficción</option>
                </select>

                <select
                    className="select"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}>
                    <option value="">- Seleccionar tipo -</option>
                    <option value="pelicula">Película</option>
                    <option value="serie">Serie</option>
                </select>

                <button
                    className="button button-primary"
                    onClick={() => {
                        setSearch('');
                        setGenreFilter('');
                        setTypeFilter('');
                    }}
                >
                    Limpiar Filtros
                </button>
            </div>

            {/* Tabla de resultados */}
            <section className="listas">
                {(search !== '' || genreFilter !== '' || typeFilter !== '') && filteredList.length >= 0 && <List list={searchFilterList} />}
            </section>

            {/* Contadores */}
            <section className="contadores">
                <Counter titulo="Total Por Ver" items={toWatchList} />
                <Counter titulo="Total Vistas" items={watchedList} />
            </section>

            {/* Listas */}
            <section className="listas">
                <List list={toWatchListProps} />
                <List list={watchedListProps} />
            </section>

            <button className="button button-primary" onClick={() => setShowForm(!showForm)}>
                {showForm ? "Finalizar" : "Añadir"}
            </button>

            {showForm && (<div className="formulario">
                <h2>Agregar nueva película o serie</h2>
                <form onSubmit={handleSubmit}>
                    <input className="input" name="titulo" id="titulo" type="text" placeholder="Título" required />
                    <input className="input" name="director" id="director" type="text" placeholder="Director" required />
                    <input className="input" name="anio" id="anio" type="number" placeholder="Año" min="0" max="2025" required />

                    <select className="select" name="genero" id="genero">
                        <option value="">Género</option>
                        <option value="Drama">Drama</option>
                        <option value="Comedia">Comedia</option>
                        <option value="Acción">Acción</option>
                        <option value="aventura">Aventura</option>
                        <option value="terror">Terror</option>
                        <option value="romantica">Románticas</option>
                        <option value="ciencia ficción">Ciencia Ficción</option>
                    </select>

                    <input className="input" name="rating" id="rating" type="number" placeholder="Rating (1-10)" min="1" max="10" required />

                    <select className="select" name="tipo" id="tipo">
                        <option value="">Tipo</option>
                        <option value="Pelicula">Película</option>
                        <option value="Serie">Serie</option>
                    </select>

                    <Button type="submit" className="button button-primary" label="Agregar" />
                </form>
            </div>
            )}

        </div>
    )
}