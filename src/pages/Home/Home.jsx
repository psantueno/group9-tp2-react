import { useEffect, useState } from 'react';
import { Title } from '../../components/Title/Title';
import { List } from '../../components/List/List';
import { Counter } from '../../components/Counter/Counter';
import { Form } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { Star, Play, Search } from 'lucide-react';
import './Home.css';
import Select from '../../components/Select/Select';
import Input from '../../components/Input/Input';

const titlePage = " GESTOR DE PELICULAS Y SERIES";

const generos = [
    {label: "- Seleccione un género -", value: ""},
    {label: "Drama", value: "Drama"},
    {label: "Comedia", value: "Comedia"},
    {label: "Acción", value: "Accion"},
    {label: "Aventura", value: "Aventura"},
    {label: "Terror", value: "Terror"},
    {label: "Romantica", value: "Romance"},
    {label: "Ciencia Ficción", value: "Ciencia Ficcion"}
];

const tipos = [
    {label: "- Seleccione un tipo -", value: ""},
    {label: "Pelicula", value: "Pelicula"},
    {label: "Serie", value: "Serie"}
]

const ordenamiento = [
    {label: "- Seleccione un orden -", value: ""},
    {label: "Año (Ascendente)", value: "year-asc"},
    {label: "Año (Descendente)", value: "year-desc"},
    {label: "Rating (Ascendente)", value: "rating-asc"},
    {label: "Rating (Descendente)", value: "rating-desc"}
]

export const Home = () => {


    const [search, setSearch] = useState('');
    const [toWatchList, setToWatchList] = useState(JSON.parse(localStorage.getItem('toWatchList')) || []);
    const [watchedList, setWatchedList] = useState(JSON.parse(localStorage.getItem('watchedList')) || []);
    const [showForm, setShowForm] = useState(false);
    const [genreFilter, setGenreFilter] = useState(''); // Estado para el filtro de género
    const [typeFilter, setTypeFilter] = useState('');  // Estado para el filtro tipo (Peli/Serie)
    const [sortCriteria, setSortCriteria] = useState(''); // Estado para el criterio de ordenamiento

    //Estos dos podrian ser un solo useEffect
    useEffect(() => {
        localStorage.setItem('toWatchList', JSON.stringify(toWatchList));
    }, [toWatchList]);

    useEffect(() => {
        localStorage.setItem('watchedList', JSON.stringify(watchedList));
    }, [watchedList]);


    /*  
    Se encarga de manejar el evento submit del formulario, obteniendo los datos y actualizando la lista de películas/series por ver
    */
    const handleSubmit = (newItem) => {
        const toWatchList = JSON.parse(localStorage.getItem('toWatchList')) || [];
        toWatchList.push(newItem);
        setToWatchList(toWatchList);
    };

    const changeItemState = (titulo) => {
        const toWatchList = JSON.parse(localStorage.getItem('toWatchList')) || [];
        const watchedList = JSON.parse(localStorage.getItem('watchedList')) || [];

        const item = toWatchList.find((i) => i.titulo === titulo);
        if (item) {
            setWatchedList([...watchedList, item]);
            setToWatchList(toWatchList.filter((i) => i.titulo !== titulo));
        } else {
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

    /* Ordena la busqueda según el criterio seleccionado */
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
        return list;
    };


    // Se aplica el criterio de ordenamiento a la lista filtrada
    const sortedFilteredList = sortList(filteredList);


    return (

        <div className="container">

            <Title text={titlePage} />

            {/* Buscador y Filtros */}
            <div className="filters">
                <Input
                    placeholder="Buscar por título o director"
                    value={search}
                    onChange={(newSearch) => setSearch(newSearch)}
                ></Input>

                <Select
                    options={generos} 
                    value={genreFilter} 
                    onChange={(newGenre) => setGenreFilter(newGenre)}
                />

                <Select 
                    options={tipos} 
                    value={typeFilter} 
                    onChange={(newType) => setTypeFilter(newType)}
                />

                <Select
                    options={ordenamiento} 
                    value={sortCriteria} 
                    onChange={(newSort) => setSortCriteria(newSort)}
                />
            </div>

            {/* Botón para limpiar filtros */}
            <Button
                className="button button-primary"
                onClick={() => {
                    setSearch('');
                    setGenreFilter('');
                    setTypeFilter('');
                    setSortCriteria('');
                }}
                label="Limpiar Filtros"
            />


            {/* Tabla de resultados de busqueda o aplicacion de filtros */}
            <section className="listas">
                {(search !== '' || genreFilter !== '' || typeFilter !== '') && filteredList.length >= 0 && <List list={{ ...searchFilterList, itemsList: sortedFilteredList }} />}
            </section>

            {/* Contadores */}
            <section className="contadores">
                <Counter titulo="Total Por Ver" items={toWatchList} />
                <Counter titulo="Total Vistas" items={watchedList} />
            </section>

            {/* Botón para abrir el formulario */}
            {
                !showForm && <Button
                    className={`button button-primary ${showForm ? "button-open" : ""}`}
                    onClick={() => setShowForm(!showForm)}
                    label="Agregar una Pelicula o Serie"
                />
            }

            {/* Formulario para agregar una película o serie */}
            {showForm && (
                <Form
                    onSubmit={handleSubmit}
                    onClose={() => setShowForm(false)} // Función para cerrar el modal
                    defaultValues={{}}
                />
            )}


            {/* Listas */}
            <section className="listas">
                <List list={toWatchListProps} />
                <List list={watchedListProps} />
            </section>

        </div>
    )
}