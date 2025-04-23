import { Film } from 'lucide-react';
import './Counter.css';

export const Counter = ({ titulo, items }) => {
    const total = items.length;

    // Clasificación por género
    const genreCount = items.reduce((acc, item) => {
        acc[item.genero] = (acc[item.genero] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="counter">
            <h3 className="counter-title">{titulo}</h3>
            <div className="counter-total">
                <span className="counter-icon">
                    <Film size={24} />
                </span>
                <span className="counter-number">{total}</span>
            </div>
            <ul className="counter-genres">
                {Object.entries(genreCount).map(([genre, count]) => (
                    <li key={genre} className="counter-genre-item">
                        <span className="genre-name">{genre}:</span> <span className="genre-count">{count}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};