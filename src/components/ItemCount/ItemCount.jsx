import "./ItemCount.scss"

export const ItemCount = ({max, counter, setCounter, agregar}) => {
    const handleRestar = () => {
        counter > 1 && setCounter ( counter - 1 )
    }

    const handleSumar = () => {
        counter < max && setCounter ( counter + 1 )
    }

    return(
        <div>
            <button className={counter === 1 ? "restar btn btn-outline-danger" 
            : "btn btn-outline-primary"} 
            onClick={ handleRestar } 
            disabled={counter === 1}>-</button>

            <span className="counter">{ counter }</span>

            <button className={counter === max ? "sumar btn btn-outline-danger" 
            : "btn btn-outline-primary"} 
            onClick={ handleSumar } 
            disabled={counter === max}>+</button>

            <br/>

            {counter === 0 ? <button className="agregar btn btn-success" onClick={agregar} disabled>AGREGAR AL CARRITO</button> : <button className="agregar btn btn-success" onClick={agregar}>AGREGAR AL CARRITO</button>}
        </div>
    )
}