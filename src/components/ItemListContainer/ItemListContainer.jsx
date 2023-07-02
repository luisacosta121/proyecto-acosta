import "./ItemListContainer.scss"


export const ItemListContainer = ({ saludo }) => {

    return(
        <div className="catalogo__contenedor">
            <h2 className="catalogo__contenedor-h2">Item List Container</h2>
            <p className="catalogo__contenedor-p">{ saludo }</p>
        </div>
    )
}