// aca podemos usar una bandera en el caso que no existan elementos para mostrar.
import './List.css';
import Item from '../Item/Item';

export const List = ({ list }) => {
    const { subtitle, sentence, itemsList, icon, stateChangeAction, editItemAction, deleteItemAction, typeList} = list;
    const empty = itemsList.length === 0;
    console.log(typeList);
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
                            <Item titulo={item.titulo} director={item.director} genero={item.genero} tipo={item.tipo} anio={item.anio} rating={item.rating} listType={item.listType} index={index} onStateChange={stateChangeAction} onEdit={editItemAction} onDelete={deleteItemAction} typeList={typeList}></Item>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

