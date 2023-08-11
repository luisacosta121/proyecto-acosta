import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { Link } from "react-router-dom"
import triste from "./assets/triste.png"
import "./CartView.scss"


export const CartView = () => {
    const {cart, totalCompra, vaciarCarrito, removerDelCarrito} = useContext(CartContext)

    if (cart.length === 0){
        return (
            <div className="container__carritoVacio my-5">
                <h2>Tu carrito esta vacio</h2>
                <img src={triste} alt="triste" />
                <br/>
                <Link to="/" className="btn btn-success">IR AL INICIO</Link>


            </div>
        )
    }

    return (
        <div className="container__CartView my-5">
            <>
            <h2>Detalle de tu compra</h2>
            <h4>Total: ${totalCompra()}</h4>
            <div className="cart-summary">
                <button onClick={vaciarCarrito} className="btn btn-danger">VACIAR CARRITO</button>
                <Link className="btn btn-success" to="/">SEGUIR COMPRANDO</Link>
                <Link className="btn btn-primary" to="/checkout">FINALIZAR COMPRA</Link>
            </div>
            <hr/>
            {
                cart.map((item) => (
                    <div key={item.id} className="cart-item">
                        <div className="cart-item-left">
                            <img src={item.img} alt={item.nombre} />
                        </div>
                        <div className="cart-item-right">
                            <h3>{item.nombre}</h3>
                            <p>Precio unitario: ${item.precio}</p>
                            <p>Cantidad: {item.cantidad}</p>
                            <p>Precio total: ${item.precio * item.cantidad}</p>
                            <button onClick={() => removerDelCarrito(item.id)} className="btn btn-danger">QUITAR DEL CARRITO</button>
                        </div>
                    </div>
                ))
            }
            <hr/>
            <div className="cart-summary">
                <button onClick={vaciarCarrito} className="btn btn-danger">VACIAR CARRITO</button>
                <Link className="btn btn-success" to="/">SEGUIR COMPRANDO</Link>
                <Link className="btn btn-primary" to="/checkout">FINALIZAR COMPRA</Link>
            </div>
            </>
        </div>
    )
}