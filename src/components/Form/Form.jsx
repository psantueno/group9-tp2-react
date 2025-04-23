import { Button }from '../Button/Button';
import './Form.css';

export const Form = ({ onSubmit, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                <h2>+ Agregar nueva película o serie</h2>
                <form onSubmit={onSubmit}>
                    <input
                        className="input"
                        name="titulo"
                        id="titulo"
                        type="text"
                        placeholder="Título"
                        required
                    />
                    <input
                        className="input"
                        name="director"
                        id="director"
                        type="text"
                        placeholder="Director"
                        required
                    />
                    <input
                        className="input"
                        name="anio"
                        id="anio"
                        type="number"
                        placeholder="Año"
                        min="1880"
                        max="2025"
                        required
                    />

                    <select className="select" name="genero" id="genero" required>
                        <option value="" hidden >Género</option>
                        <option value="Drama">Drama</option>
                        <option value="Comedia">Comedia</option>
                        <option value="Acción">Acción</option>
                        <option value="aventura">Aventura</option>
                        <option value="terror">Terror</option>
                        <option value="romantica">Románticas</option>
                        <option value="ciencia ficción">Ciencia Ficción</option>
                    </select>

                    <input
                        className="input"
                        name="rating"
                        id="rating"
                        type="number"
                        placeholder="Rating (1-10)"
                        min="1"
                        max="10"
                        step="0.1"
                        required
                    />

                    <select className="select" name="tipo" id="tipo" required>
                        <option value="" hidden >
                            Tipo
                        </option>
                        <option value="Pelicula">Película</option>
                        <option value="Serie">Serie</option>
                    </select>

                    <Button type="submit" className="button button-primary" label="Agregar" />
                </form>
            </div>
        </div>
    );
};