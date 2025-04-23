import './Form.css';
import { Button }from '../Button/Button';
import Input from '../Input/Input';
import Select from '../Select/Select';
import { useState } from 'react';

const generos =[
    {label: "Genero", value: ""},
    {label: "Drama", value: "Drama"},
    {label: "Comedia", value: "Comedia"},
    {label: "Acción", value: "Acción"},
    {label: "Aventura", value: "Aventura"},
    {label: "Terror", value: "Terror"},
    {label: "Románticas", value: "Románticas"},
    {label: "Ciencia Ficción", value: "Ciencia Ficción"},
];

const tipos = [
    {label: "Tipo", value: ""},
    {label: "Pelicula", value: "Pelicula"},
    {label: "Serie", value: "Serie"},
]

export const Form = ({ onSubmit, onClose, defaultValues }) => {
    const [titulo, setTitulo] = useState(defaultValues.titulo || '');
    const [director, setDirector] = useState(defaultValues.director || '');
    const [anio, setAnio] = useState(defaultValues.anio || '');
    const [genero, setGenero] = useState(defaultValues.genero || '');
    const [rating, setRating] = useState(defaultValues.rating || '');
    const [tipo, setTipo] = useState(defaultValues.tipo || '');
    const [errorMessages, setErrorMessages] = useState({
        titulo: '',
        director: '',
        anio: '',
        genero: '',
        rating: '',
        tipo: ''
    });

    const changeTitulo = (newTitulo) => {
        setTitulo(newTitulo);
    }
    const changeDirector = (newDirector) => {
        setDirector(newDirector);
    }
    const changeAnio = (newAnio) => {
        setAnio(newAnio);
    }
    const changeGenero = (newGenero) => {
        setGenero(newGenero);
    }
    const changeRating = (newRating) => {
        setRating(newRating);
    }
    const changeTipo = (newTipo) => {
        setTipo(newTipo);
    }

    const formValidation = () => {
        let valid = true;
        const newErrorMessages = {
            titulo: '',
            director: '',
            anio: '',
            genero: '',
            rating: '',
            tipo: ''
        };

        if(!titulo){
            newErrorMessages.titulo = 'El titulo es obligatorio.';
            valid = false;
        }
        if(!director){
            newErrorMessages.director = 'El director es obligatorio.';
            valid = false;
        }
        if(!anio){
            newErrorMessages.anio = 'El año es obligatorio.';
            valid = false;
        }else if (anio < 1 || anio > new Date().getFullYear()){
            newErrorMessages.anio = 'El año debe estar entre 1 y el año actual.';
            valid = false;
        }
        if(!genero){
            newErrorMessages.genero = 'El genero es obligatorio.';
            valid = false;
        }
        if(!rating){
            newErrorMessages.rating = 'El rating es obligatorio.';
            valid = false;
        }else if( rating < 1 || rating > 10){
            newErrorMessages.rating = 'El rating debe estar entre 1 y 10.';
            valid = false;
        }
        if(!tipo){
            newErrorMessages.tipo = 'El tipo es obligatorio.';
            valid = false;
        }
        setErrorMessages(newErrorMessages);
        return valid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = formValidation();
        if(isValid){
            const newItem = {
               titulo: titulo,
                director: director,
                anio: anio,
                genero: genero,
                rating: rating,
                tipo: tipo 
            }
            onSubmit(newItem);
            onClose();
            e.target.reset();
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                <h2>+ Agregar nueva película o serie</h2>
                <form onSubmit={handleSubmit}>
                    <Input
                        name="titulo" 
                        placeholder="Titulo"
                        value={titulo}
                        onChange={changeTitulo}
                        errorMessage={errorMessages.titulo}
                    />
                    <Input 
                        name="director" 
                        placeholder="Director"
                        value={director}
                        onChange={changeDirector}
                        errorMessage={errorMessages.director}
                    />
                    <Input 
                        type="number" 
                        name="anio" 
                        placeholder="Año"
                        value={anio}
                        onChange={changeAnio}
                        errorMessage={errorMessages.anio}
                    />
                    <Select
                        options={generos}
                        name="genero"
                        value={genero}
                        onChange={changeGenero}
                        errorMessage={errorMessages.genero}
                    />
                    <Input
                        type="number" 
                        step="0.1" 
                        name="rating" 
                        placeholder="Rating"
                        value={rating}
                        onChange={changeRating}
                        errorMessage={errorMessages.rating}
                    /> 
                    <Select
                        options={tipos} 
                        name="tipo"
                        value={tipo}
                        onChange={changeTipo}
                        errorMessage={errorMessages.tipo}
                    />
                    <Button type="submit" className="button button-primary" label="Agregar" />
                </form>
            </div>
        </div>
    );
};