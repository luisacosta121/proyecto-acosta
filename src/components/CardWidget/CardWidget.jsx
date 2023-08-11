import { Link } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import cart from "./assets/cart.png"
import "./CardWidget.scss"

export const CardWidget =() => {
    const { totalCantidad } = useContext(CartContext)

    return(
        <Link to="/cart" className="carrito">
            <img src={cart} alt="carrito" className="carrito__icono"/>
            <div className="cantidad-circulo">
                <span className="cantidad">{ totalCantidad() }</span>
            </div>
        </Link>
    )
}