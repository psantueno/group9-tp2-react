import { Check, Edit, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import "./Item.css";
import Input from '../Input/Input';
import Select from '../Select/Select';

const Item = ({ titulo, director, genero, tipo, anio, rating, listType, index, onStateChange, onEdit, onDelete, typeList }) =>{
    const [editMode, setEditMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const [newTitulo, setNewTitulo] = useState(titulo);
    const [newDirector, setNewDirector] = useState(director);
    const [newGenero, setNewGenero] = useState(genero);
    const [newTipo, setNewTipo] = useState(tipo);
    const [newAnio, setNewAnio] = useState(anio);
    const [newRating, setNewRating] = useState(rating);
    const [errorMessages, setErrorMessages] = useState({
        titulo: "",
        director: "",
        genero: "", 
        tipo: "",
        anio: "",
        rating: ""
    });

    const generos = [
        {label: "Géneros", value: ""},
        {label: "Drama", value: "Drama"},
        {label: "Comedia", value: "Comedia"},
        {label: "Acción", value: "Accion"},
        {label: "Aventura", value: "Aventura"},
        {label: "Terror", value: "Terror"},
        {label: "Romantica", value: "Romance"},
        {label: "Ciencia Ficción", value: "Ciencia Ficcion"}
    ];

    const tipos = [
        {label: "Tipo", value: ""},
        {label: "Pelicula", value: "Pelicula"},
        {label: "Serie", value: "Serie"}
    ]

    const tituloChangeHandler = (changedTitulo) => {
        setNewTitulo(changedTitulo);
    }
    const directorChangeHandler = (changedDirector) => {
        setNewDirector(changedDirector);
    }
    const generoChangeHandler = (changedGenero) => {
        setNewGenero(changedGenero);
    }
    const tipoChangeHandler = (changedTipo) => {
        setNewTipo(changedTipo);
    }
    const anioChangeHandler = (changedAnio) => {
        setNewAnio(changedAnio);
    }
    const ratingChangeHandler = (changedRating) => {
        setNewRating(changedRating);
    }

    const onStateChangeHandler = () => {
        onStateChange(titulo);
    }

    const onEditButtonClickHandler = () => {
        setEditMode(true);
    }

    const onCancelEditHandler = () =>{
        setNewTitulo(titulo);
        setNewDirector(director);
        setNewGenero(genero);
        setNewTipo(tipo);
        setNewAnio(anio);
        setNewRating(rating);
        setErrorMessages({
            titulo: "",
            director: "",
            genero: "",
            tipo: "",
            anio: "",
            rating: ""
        });
        setEditMode(false);
    }

    const onConfirmEditHandler = () => {
        if(formValidation()){
            const editedItem = {
                titulo: newTitulo,
                director: newDirector,
                genero: newGenero,
                tipo: newTipo,
                anio: newAnio,
                rating: newRating
            }
            onEdit(titulo, editedItem);
            setEditMode(false);
            setErrorMessages({
                titulo: "",
                director: "",
                genero: "",
                tipo: "",
                anio: "",
                rating: ""
            });
        }
    }

    const formValidation = () => {
        let isValid = true;
        const newErrorMessages = {
            titulo: "",
            director: "",
            genero: "",
            tipo: "",
            anio: "",
            rating: ""
        };

        if(newTitulo.trim() === ""){
            newErrorMessages.titulo = "El título es requerido";
            isValid = false;
        }
        if(newDirector.trim() === ""){
            newErrorMessages.director = "El director es requerido";
            isValid = false;
        }
        if(newGenero.trim() === ""){
            newErrorMessages.genero = "El género es requerido";
            isValid = false;
        }
        if(newTipo.trim() === ""){
            newErrorMessages.tipo = "El tipo es requerido";
            isValid = false;
        }
        if(newAnio <= 0){
            newErrorMessages.anio = "El año debe ser mayor a 0";
            isValid = false;
        }
        if(newAnio > new Date().getFullYear()){
            newErrorMessages.anio = "El año debe ser menor al año actual";
            isValid = false;
        }
        if(newRating < 1 || newRating > 10){
            newErrorMessages.rating = "El rating debe estar entre 1 y 10";
            isValid = false;
        }

        setErrorMessages(newErrorMessages);
        return isValid;
    }

    const onDeleteButtonClickHandler = () => {
        setDeleteMode(true);
    }

    const onCancelDeleteHandler = () => {
        setDeleteMode(false);
    }

    const onConfirmDeleteHandler = () => {
        onDelete(titulo);
        setDeleteMode(false);
    }

    if(editMode){
        return(
            <tr key={index}>
                <td className="text-width">
                    <Input 
                        value={newTitulo} 
                        onChange={tituloChangeHandler} 
                        errorMessage={errorMessages.titulo}
                    />
                </td>
                <td className="text-width">
                    <Input 
                        value={newDirector} 
                        onChange={directorChangeHandler} 
                        errorMessage={errorMessages.director}
                    />
                </td>
                <td className="text-width">
                    <Select 
                        options={generos} 
                        value={newGenero} 
                        onChange={generoChangeHandler} 
                        errorMessage={errorMessages.genero}
                    />
                </td>
                <td className="text-width">
                    <Select 
                        options={tipos} 
                        value={newTipo} 
                        onChange={tipoChangeHandler} 
                        errorMessage={errorMessages.tipo}
                    />
                </td>
                <td className="number-width">
                    <Input 
                        type="number" 
                        step="1" 
                        value={newAnio} 
                        onChange={anioChangeHandler} 
                        errorMessage={errorMessages.anio}
                    />
                </td>
                <td className="number-width">
                    <Input 
                        type="number" 
                        step="0.1" 
                        value={newRating} 
                        onChange={ratingChangeHandler}
                        errorMessage={errorMessages.rating}
                    />
                </td>
                <td className="edit-mode">
                    <p>Confirmar edición</p>
                    <div className="edit-confirmation-buttons">
                        <button onClick={onConfirmEditHandler} title="Marcar como vista/no vista">
                            <Check size={18} strokeWidth={2} />
                        </button>
                        <button onClick={onCancelEditHandler} title="Eliminar">
                            <X size={18} strokeWidth={2}></X>
                        </button>
                    </div>
                </td>
            </tr>
        );
    }

    return (
        <tr key={index}>
            <td>{titulo}</td>
            <td>{director}</td>
            <td>{genero}</td>
            <td>{tipo}</td>
            <td>{anio}</td>
            <td>{rating}</td>
            {typeList !== 'Resultados'
                ? 
                <td>
                    {deleteMode 
                    ?
                    <div className="delete-mode">
                        <p>Confirmar eliminación</p>
                        <div className="delete-confirmation-buttons">
                            <button onClick={onConfirmDeleteHandler}>
                                <Check size={18} strokeWidth={2} />
                            </button>
                            <button onClick={onCancelDeleteHandler}>
                                <X size={18} strokeWidth={2}></X>
                            </button>
                        </div>
                    </div>
                    :
                    <div className="acciones">
                        <button onClick={onStateChangeHandler} title="Marcar como vista/no vista">
                            <Check size={18} strokeWidth={2} />
                        </button>
                        <button onClick={onEditButtonClickHandler} title="Editar">
                            <Edit size={18} strokeWidth={2} />
                        </button>
                        <button onClick={onDeleteButtonClickHandler} title="Eliminar">
                            <Trash2 size={18} strokeWidth={2} />
                        </button>
                    </div>
                    }
                </td>
                : <td>{listType}</td>
            }
        </tr>
    );
};

export default Item;