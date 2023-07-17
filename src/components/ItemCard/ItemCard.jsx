import "./ItemCard.scss"
import { Link } from "react-router-dom"


export const ItemCard = ({item}) => {

    return (
        <div className='juegos col-3 m-2'>
            <h4>{item.nombre}</h4>
            <img className="imagenJuego" src={item.img} alt={item.nombre}/>
            <p>Precio: ${item.precio}</p>
            <Link to={`/detail/${item.id}`} className='btn btn-primary'>Ver más</Link>
        </div>
    )
}
