import "./Brand.scss"
import controlador from "./assets/controlador.png"

export const Brand = () => {

    return(
        <div className="brand">
            <h1 className="brand__titulo">EL PIBE PLAY</h1>
            <img src={controlador} alt="controlador" className="controlador"/>
        </div>
    )
}