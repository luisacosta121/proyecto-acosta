import "./NavBar.scss"
import Playstation from "./assets/play.png"
import { CardWidget } from "../CardWidget/CardWidget"


export const NavBar = () => {

    return(
        <header className="header">
            <div className="header__container">
                <img className="header__logo" src={Playstation} alt="imagen desde assets"/>

                
                <nav className="navbar">
                    <a className="navbar__link" href="#">Juegos Playstation 4</a>
                    <a className="navbar__link" href="#">Accesorios PS4</a>
                    <a className="navbar__link" href="#">Juegos Playstation 5</a>
                    <a className="navbar__link" href="#">Accesorios PS5</a>
                </nav>
                <CardWidget />
            </div>
        </header>
    )
}