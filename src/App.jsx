import { NavBar } from "./components/NavBar/NavBar"
import "./App.css"
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { Brand } from "./components/Brand/Brand";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Inicio } from "./components/Inicio/Inicio";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainaer";

function App() {


  return (
      <BrowserRouter>

        <Brand />
        <NavBar />

        <Routes>
  
        <Route path="/" element={<Inicio />} />
        <Route path="/juegos/:categoryId" element={<ItemListContainer />} />
        <Route path="/detail/:itemId" element={ <ItemDetailContainer /> }/>       
        <Route path="*" element={"PAGINA NO ENCONTRADA ERROR 404"} />

        </Routes>

      </BrowserRouter>  


  )
}

export default App
