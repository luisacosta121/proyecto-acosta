import Playstation from "./assets/play.png"
import { CardWidget } from "../CardWidget/CardWidget"
import { Link } from "react-router-dom"
import "./NavBar.scss"

export const NavBar = () => {

    return(
        <header className="header">
            <div className="header__container">
            <Link className="navbar__link" to="/"><img className="header__logo" src={Playstation} alt="imagen desde assets"/></Link>
                <nav className="navbar">
                    <Link className="navbar__link" to="juegos/PS3">Juegos Playstation 3</Link>
                    <Link className="navbar__link" to="juegos/PS4">Juegos Playstation 4</Link>
                    <Link className="navbar__link" to="juegos/PS5">Juegos Playstation 5</Link>
                </nav>
                <CardWidget />
            </div>
        </header>
    )
}