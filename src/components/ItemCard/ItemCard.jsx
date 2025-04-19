import './ItemCard.css';
import { Star, Clapperboard, Calendar, TvMinimalPlay, User, Film } from 'lucide-react';
import { useState } from 'react';
import InputCardForm from '../InputCardForm/InputCardForm';
import SelectCardForm from '../SelectCardForm/SelectCardForm';
import Button from '../Button/Button';

const generos = [
    {label: "Genero", value: ""},
    {label: "Drama", value: "Drama"},
    {label: "Comedia", value: "Comedia"},
    {label: "Acción", value: "Acción"},
    {label: "Aventura", value: "Aventura"},
    {label: "Terror", value: "Terror"},
    {label: "Romanticas", value: "Romanticas"},
    {label: "Ciencia Ficcion", value: "Ciencia Ficcion"}
]

const tipos = [
    {label: "Tipo", value: ""},
    {label: "Pelicula", value: "Pelicula"},
    {label: "Serie", value: "Serie"}
]


const ItemCard = ({ titulo, director, anio, genero, tipo, rating, onStateChange, onDelete, onEdit, watched }) => {
    const [editMode, setEditMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const [errorMessages, setErrorMessages] = useState({
        titulo: "",
        director: "",
        anio: "",
        genero: "",
        tipo: "",
        rating: ""
    });

    const handleStateChange = () => {
        onStateChange({ titulo, director, anio, genero, tipo, rating });
    };

    const handleDelete = () => {
        setDeleteMode(true);
    };

    const handleCancelDelete = () => {
        setDeleteMode(false);
    };

    const handleConfirmDelete = () => {
        onDelete({ titulo, director, anio, genero, tipo, rating });
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setErrorMessages({
            titulo: "",
            director: "",
            anio: "",
            genero: "",
            tipo: "",
            rating: ""
        });
    };

    const formValidation = (form) => {
        const errors = {};
        if(!form.titulo.value) errors.titulo = "El título es obligatorio.";
        if(!form.director.value) errors.director = "El director es obligatorio.";
        if(!form.anio.value) errors.anio = "El año es obligatorio.";
        if(form.anio.value < 1 || form.anio.value > 2025) errors.anio = "El año debe estar entre 1 y 2025.";
        if(!form.genero.value) errors.genero = "El género es obligatorio.";
        if(!form.tipo.value) errors.tipo = "El tipo es obligatorio.";
        if(!form.rating.value) errors.rating = "El rating es obligatorio.";
        if(form.rating.value < 1 || form.rating.value > 10) errors.rating = "El rating debe estar entre 1 y 10.";
        return errors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const errors = formValidation(form);
        if(Object.keys(errors).length > 0){
            setErrorMessages(errors);
        }else{
            const updatedItem = {
                titulo: form.titulo.value,
                director: form.director.value,
                anio: form.anio.value,
                genero: form.genero.value,
                tipo: form.tipo.value,
                rating: form.rating.value
            };
            onEdit(titulo, updatedItem);
            handleCancelEdit();
        }
    };

    if(editMode){
        return( 
            <form className="item-card-form" onSubmit={handleSubmit}>
                <InputCardForm icon={<Film size="18" fill="#fbbf24"></Film>} label="Titulo" value={titulo} name="titulo" errorMessage={errorMessages.titulo}/>
                <InputCardForm icon={<User size="18" fill="#4b5563"></User>} label="Director" value={director} name="director" errorMessage={errorMessages.director}></InputCardForm>
                <InputCardForm icon={<Calendar size="18" fill="#3b82f6"></Calendar>} label="Año" type="number" value={anio} name="anio" errorMessage={errorMessages.anio}></InputCardForm>
                <SelectCardForm icon={<Clapperboard size="18" fill="#f472b6"></Clapperboard>} label="Genero" options={generos} name="genero" value={genero} errorMessage={errorMessages.genero}></SelectCardForm>
                <SelectCardForm icon={<TvMinimalPlay size="18" fill="#34d399"></TvMinimalPlay>} label="Tipo" options={tipos} name="tipo" value={tipo} errorMessage={errorMessages.tipo}></SelectCardForm>
                <InputCardForm icon={<Star size="18" fill="#facc15"></Star>} label="Rating" type="number" step="0.1" value={rating} name="rating" errorMessage={errorMessages.rating}></InputCardForm>
                <div className="item-options">
                    <Button className="button button-gray" label="Cancelar" onClick={handleCancelEdit}></Button>
                    <Button type="submit" className="button button-confirm" label="Confirmar"></Button>
                </div>
            </form>
        )
    };

    return (
        <div className="item-card">
            <h3 className="item-title">{titulo}</h3>
            <div className="item-info">
                <User size="18" fill="#4b5563"></User>
                <p><strong>Director:</strong> {director}</p>
            </div>
            <div className="item-info">
                <Calendar size="18" fill="#3b82f6"></Calendar>
                <p><strong>Año:</strong> {anio}</p>
            </div>
            <div className="item-info">
                <Clapperboard size="18" fill="#f472b6"></Clapperboard>
                <p><strong>Género:</strong> {genero}</p>
            </div>
            <div className="item-info">
                <TvMinimalPlay size="18" fill="#34d399"></TvMinimalPlay>
                <p><strong>Tipo:</strong> {tipo}</p>
            </div>
            <div className="item-info">
                <Star size="18" fill="#facc15"></Star>
                <p className="item-rating"><strong>Rating: {rating}</strong></p>
            </div>
            {deleteMode 
            ? 
                <div className="delete-options">
                    <h3>¿Estas seguro que quieres eliminar {titulo} de esta lista?</h3>
                    <div className="delete-buttons">
                        <Button className="button button-gray" label="Cancelar" onClick={handleCancelDelete}></Button>
                        <Button className="button button-red" label="Eliminar" onClick={handleConfirmDelete}></Button>
                    </div>
                </div>
            :
                <div className="item-options">
                    {watched 
                    ?
                        <Button label="Por ver" className="button button-green" onClick={handleStateChange}></Button>
                    : 
                        <Button label="Visto" className="button button-green" onClick={handleStateChange}></Button>
                    }
                    <Button label="Editar" className="button button-blue" onClick={handleEdit}></Button>
                    <Button label="Eliminar" className="button button-red" onClick={handleDelete}></Button>
                </div>
            }
        </div>
    );
}

export default ItemCard;