// aca podemos usar una bandera en el caso que no existan elementos para mostrar.
import './List.css';
import ItemCard from '../../components/ItemCard/ItemCard';

export const List = ({ list }) => {
    const { subtitle, sentence, itemsList, icon, stateChangeAction, editItemAction, deleteItemAction } = list;
    const empty = itemsList.length === 0;
    const watched = subtitle === "Vistas" ? true : false;

    return (
        <>
            <div className="lista"> {icon}
                <h2>{subtitle}</h2>
                {empty 
                    ? <p>{sentence}</p> 
                    : itemsList.map((item) =>{
                        return <ItemCard titulo={item.titulo} director={item.director} genero={item.genero} tipo={item.tipo} anio={item.anio} rating={item.rating} onStateChange={stateChangeAction} onEdit={editItemAction} onDelete={deleteItemAction} watched={watched} key={item.titulo}></ItemCard>
                    })
                }
            </div>
        </>
    )
}
