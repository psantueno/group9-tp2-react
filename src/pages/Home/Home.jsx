import { useEffect, useState } from 'react';
import { Title } from '../../components/Title/Title';
import { List } from '../../components/List/List';
import { Counter } from '../../components/Counter/Counter';
import { Star, Play, Search } from 'lucide-react';
import Button from '../../components/Button/Button';
import './Home.css';


const titlePage = "Gestor de Películas y Series";

export const Home = () => {


    const [search, setSearch] = useState('');
    const [toWatchList, setToWatchList] = useState(JSON.parse(localStorage.getItem('toWatchList')) || []);
    const [watchedList, setWatchedList] = useState(JSON.parse(localStorage.getItem('watchedList')) || []);
    const [showForm, setShowForm] = useState(false);
    const [genreFilter, setGenreFilter] = useState(''); // Estado para el filtro de género
    const [typeFilter, setTypeFilter] = useState('');  // Estado para el filtro tipo (Peli/Serie)
    const [sortCriteria, setSortCriteria] = useState(''); // Estado para el criterio de ordenamiento

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

    const changeItemState = (titulo) => {
        const toWatchList = JSON.parse(localStorage.getItem('toWatchList')) || [];
        const watchedList = JSON.parse(localStorage.getItem('watchedList')) || [];

        const item = toWatchList.find((i) => i.titulo === titulo);
        if(item){
            setWatchedList([...watchedList, item]);
            setToWatchList(toWatchList.filter((i) => i.titulo !== titulo));
        }else{
            const item = watchedList.find((i) => i.titulo === titulo);
            setToWatchList([...toWatchList, item]);
            setWatchedList(watchedList.filter((i) => i.titulo !== titulo));
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

    const deleteItem = (titulo) => {
        const toWatchList = JSON.parse(localStorage.getItem('toWatchList')) || [];
        const watchedList = JSON.parse(localStorage.getItem('watchedList')) || [];

        if (toWatchList.some((i) => i.titulo === titulo)) {
            setToWatchList(toWatchList.filter((i) => i.titulo !== titulo));
        } else {
            setWatchedList(watchedList.filter((i) => i.titulo !== titulo));
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
        typeList: "Por Ver",
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
        typeList: "Vistas",
        stateChangeAction: changeItemState,
        editItemAction: editItem,
        deleteItemAction: deleteItem
    };

    const sortList = (list) => {
        if (sortCriteria === 'year-asc') {
            return [...list].sort((a, b) => a.anio - b.anio); // Ordenar por año ascendente
        }
        if (sortCriteria === 'year-desc') {
            return [...list].sort((a, b) => b.anio - a.anio); // Ordenar por año descendente
        }
        if (sortCriteria === 'rating-asc') {
            return [...list].sort((a, b) => a.rating - b.rating); // Ordenar por rating ascendente
        }
        if (sortCriteria === 'rating-desc') {
            return [...list].sort((a, b) => b.rating - a.rating); // Ordenar por rating descendente
        }
        return list; // Si no hay criterio, devolver la lista sin cambios
    };

    const sortedFilteredList = sortList(filteredList);


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

                <select
                    className="select"
                    value={sortCriteria}
                    onChange={(e) => setSortCriteria(e.target.value)}
                >
                    <option value="">- Ordenar por -</option>
                    <option value="year-asc">Año (Ascendente)</option>
                    <option value="year-desc">Año (Descendente)</option>
                    <option value="rating-asc">Rating (Ascendente)</option>
                    <option value="rating-desc">Rating (Descendente)</option>
                </select>

                <button
                    className="button button-primary"
                    onClick={() => {
                        setSearch('');
                        setGenreFilter('');
                        setTypeFilter('');
                        setSortCriteria('');
                    }}
                >
                    Limpiar Filtros
                </button>
            </div>

            {/* Tabla de resultados */}
            <section className="listas">
                {(search !== '' || genreFilter !== '' || typeFilter !== '') && filteredList.length >= 0 && <List list={{...searchFilterList, itemsList: sortedFilteredList}} />}
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

            <button className={`button ${showForm ? "button-open" : ""}`} 
             onClick={() => setShowForm(!showForm)}>
                {showForm ? "Cerrar Formulario" : "Añadir Pelicula o serie"}
            </button>

            {showForm && (<div className="formulario">
                <h2>Agregar nueva película o serie</h2>
                <form onSubmit={handleSubmit}>
                    <input className="input" name="titulo" id="titulo" type="text" placeholder="Título" required />
                    <input className="input" name="director" id="director" type="text" placeholder="Director" required />
                    <input className="input" name="anio" id="anio" type="number" placeholder="Año" min="0" max="2025" required />

                    <select className="select" name="genero" id="genero"  required>
                        <option value="Género" disabled hidden>Género</option>
                        <option value="Drama">Drama</option>
                        <option value="Comedia">Comedia</option>
                        <option value="Acción">Acción</option>
                        <option value="aventura">Aventura</option>
                        <option value="terror">Terror</option>
                        <option value="romantica">Románticas</option>
                        <option value="ciencia ficción">Ciencia Ficción</option>
                    </select>

                    <input className="input" name="rating" id="rating" type="number" placeholder="Rating (1-10)" min="1" max="10" step="0.1" required />

                    <select className="select" name="tipo" id="tipo" required>
                        <option value="Tipo" disabled hidden>Tipo</option>
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