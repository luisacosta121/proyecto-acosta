import { NavBar } from "./components/NavBar/NavBar"
import "./App.css"
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer"
import { Brand } from "./components/Brand/Brand";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {


  return (

      <div>
        <NavBar />
        <Brand />
        <ItemListContainer saludo={"Bienvenidos a Tienda Play"}/> 
        
      </div>

  )
}

export default App
