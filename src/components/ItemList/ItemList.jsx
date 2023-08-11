import { ItemCard } from "../ItemCard/ItemCard"
import "./ItemList.scss"

export const ItemList = ({productos}) => {

    return (
        <div className="container">         
           <div className='row'>
            {
            productos.map((prod) => <ItemCard key={prod.id} item={prod}/>)
            }
           </div>
        </div>
    )
}
