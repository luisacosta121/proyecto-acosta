import loader from "./assets/loader.png"
import "./Loader.scss"

export const Loader = () => {

    return(
        <div className="loader">
            <img src={loader} alt="loader" className="loader__img"/>
        </div>
    )
}