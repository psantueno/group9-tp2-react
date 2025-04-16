// aca podemos usar una bandera en el caso que no existan elementos para mostrar.
import './List.css';

export const List = ({ list }) => {

    const { subtitle, sentence, empty, icon } = list;

    return (
        <>
            <div className="lista"> {icon}
                <h2>{subtitle}</h2>
                { empty ? <p>{sentence}</p> : "peli 1, peli2, peli3" }
            </div>
        </>
    )
}
