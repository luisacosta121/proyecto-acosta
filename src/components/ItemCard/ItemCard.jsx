import { Link } from "react-router-dom"
import "./ItemCard.scss"

export const ItemCard = ({item}) => {

    return (
        <div className='juegos col-3 m-2'>
            <div></div>
            <h4>{item.nombre}</h4>
            <img className="imagenJuego" src={item.img} alt={item.nombre}/>
            {item.stock === 0 ? (
            <p className="sinstock__itemcard">PRODUCTO SIN STOCK!</p>
            ) : item.stock === 1 ? (
                <p>Precio: ${item.precio} <span className="ultimaunidad">¡Última unidad!</span></p>
            ) : (
                <p>Precio: ${item.precio}</p>
            )}
            <Link to={`/detail/${item.id}`} className='btn btn-primary'>Ver más</Link>
        </div>
    )
}
