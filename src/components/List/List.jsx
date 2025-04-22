// aca podemos usar una bandera en el caso que no existan elementos para mostrar.
import { Check, Edit, Trash2 } from 'lucide-react';
import './List.css';

export const List = ({ list }) => {
    const { subtitle, sentence, itemsList, icon, stateChangeAction, editItemAction, deleteItemAction, typeList } = list;
    const empty = itemsList.length === 0;
    const watched = subtitle === "Vistas" ? true : false;


    return (
        <div className="lista">
            <div className="header">
                {icon}
                <h2>{subtitle}</h2>
            </div>
            {empty ? (
                <p>{sentence}</p>
            ) : (
                <table className="item-table">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Director</th>
                            <th>Género</th>
                            <th>Tipo</th>
                            <th>Año</th>
                            <th>Rating</th>
                            {typeList !== 'Resultados'
                            ? <th>Acciones</th>
                            : <th>Lista</th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {itemsList.map((item, index) => (
                            <tr key={index}>
                                <td>{item.titulo}</td>
                                <td>{item.director}</td>
                                <td>{item.genero}</td>
                                <td>{item.tipo}</td>
                                <td>{item.anio}</td>
                                <td>{item.rating}</td>
                                {typeList !== 'Resultados'
                                    ? <td className="acciones">
                                        <button onClick={() => stateChangeAction(item)} title="Marcar como vista/no vista">
                                            <Check size={18} strokeWidth={2} />
                                        </button>
                                        <button onClick={() => editItemAction(item)} title="Editar">
                                            <Edit size={18} strokeWidth={2} />
                                        </button>
                                        <button onClick={() => deleteItemAction(item)} title="Eliminar">
                                            <Trash2 size={18} strokeWidth={2} />
                                        </button>
                                    </td>
                                    : <td>{item.listType}</td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

