import React from 'react';
import './Contador.css';

export const Contador = ({ titulo, items }) => {
  const total = items.length;

  const porGenero = items.reduce((acc, item) => {
    const genero = item.genero || 'Sin género';
    acc[genero] = (acc[genero] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="contador">
      <h3>{titulo}</h3>
      <p>Total: <strong>{total}</strong></p>
      <ul>
        {Object.entries(porGenero).map(([genero, cantidad]) => (
          <li key={genero}>
            {genero}: {cantidad}
          </li>
        ))}
      </ul>
    </div>
  );
};
