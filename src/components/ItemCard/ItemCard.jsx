import './ItemCard.css';
import { Star, Clapperboard, Calendar, TvMinimalPlay, User } from 'lucide-react';

const ItemCard = ({ titulo, director, anio, genero, tipo, rating, onStateChange, watched }) => {

    const handleOnClick = (e) => {
        onStateChange({ titulo, director, anio, genero, tipo, rating });
    }

    return (
        <div className="item-card">
            <h3 className="item-title">{titulo}</h3>
            <div className="item-info">
                <User size="16" fill="#4b5563"></User>
                <p><strong>Director:</strong> {director}</p>
            </div>
            <div className="item-info">
                <Calendar size="16" fill="#3b82f6"></Calendar>
                <p><strong>Año:</strong> {anio}</p>
            </div>
            <div className="item-info">
                <Clapperboard size="16" fill="#f472b6"></Clapperboard>
                <p><strong>Género:</strong> {genero}</p>
            </div>
            <div className="item-info">
                <TvMinimalPlay size="16" fill="#34d399"></TvMinimalPlay>
                <p><strong>Tipo:</strong> {tipo}</p>
            </div>
            <div className="item-info">
                <Star size="16" fill="#facc15"></Star>
                <p className="item-rating"><strong>Rating: {rating}</strong></p>
            </div>
            <div className="item-options">
                {watched 
                ? <button className="item-button button-watched" onClick={handleOnClick}>Por ver</button> 
                : <button className="item-button button-watched" onClick={handleOnClick}>Vista</button>
                }
                <button className="item-button button-edit">Editar</button>
                <button className="item-button button-delete">Eliminar</button>
            </div>
        </div>
    );
}

export default ItemCard;