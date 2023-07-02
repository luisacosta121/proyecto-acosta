import cart from "./assets/cart.png"
import "./CardWidget.scss"

export const CardWidget =() => {

    return(
        <div className="carrito">
            <img src={cart} alt="carrito" className="carrito__icono"/>
            <p className="carrito__cantidad">0</p>
        </div>
    )
}