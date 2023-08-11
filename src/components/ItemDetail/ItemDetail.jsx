import { useContext, useState } from "react";
import { ItemCount } from "../ItemCount/ItemCount"
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "./ItemDetail.scss"

export const ItemDetail = ({item}) => {
    const {agregarAlCarrito, isInCart} = useContext(CartContext)

    const [cantidad, setCantidad] = useState(0)

    const agregarCantidad = () => {
        const newItem = {
            ...item,
            cantidad
        }
        agregarAlCarrito(newItem)
    }

    return (
        <div className="container__item-detail my-5">
            <div className="item-detail-left">
                <img src={item.img} alt={item.nombre}/>
            </div>
            <div className="item-detail-right">
                <h2>{item.nombre}</h2>
                <p>{item.descripcion}</p>
                <p>Precio unitario: $ {item.precio}</p>
                <p>Precio total: $ {item.precio * cantidad}</p>               
                {
                item.stock === 1 && 
                <p className="sinstock">ULTIMA UNIDAD DISPONIBLE!</p>
                }
                {
                item.stock === 0 && 
                <>
                <p className="sinstock">PRODUCTO SIN STOCK!</p>
                <Link className="seguir btn btn-success" to="/">SEGUIR COMPRANDO</Link>
                </>
                }

                {isInCart(item.id) ? (
                    <>
                    <Link className="btn btn-primary" to="/cart">FINALIZAR COMPRA</Link>
                    <br/>
                    <br/>
                    <Link className="btn btn-success" to="/">SEGUIR COMPRANDO</Link>
                    </>
                    ) : (
                    <div className="item-detail-quantity">
                        <ItemCount
                            max={item.stock}
                            counter={cantidad}
                            setCounter={setCantidad}
                            agregar={agregarCantidad}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}