import paginaConstruccion from "./assets/paginaconstruccion.jpg"
import "./Inicio.scss"

export const Inicio = () => {

    return(
        <div className="pagina__inicio">
            <h1>PAGINA EN CONSTRUCCION</h1>
            <img src={paginaConstruccion} alt="pagina en construccion" className="paginaconstruccion" />
        </div>
    )
}