import { NavBar } from "./components/NavBar/NavBar"
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { Brand } from "./components/Brand/Brand";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainaer";
import { CartProvider } from "./context/CartContext";
import { CartView } from "./components/CartView/CartView";
import { Checkout } from "./components/CheckOut/CheckOut";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"

function App() {

  return (
    <CartProvider>
      <BrowserRouter>
        <div className="fixed-header">
        <Brand />
        <NavBar />
        </div>
        <div className="content-container">
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/juegos/:categoryId" element={<ItemListContainer />} />
          <Route path="/detail/:itemId" element={ <ItemDetailContainer /> }/>  
          <Route path="/checkout" element={ <Checkout /> }/>
          <Route path="/cart" element={<CartView />} />     
          <Route path="*" element={"PAGINA NO ENCONTRADA ERROR 404"} />
        </Routes>
          </div>
      </BrowserRouter>  
      </CartProvider>
  )
}

export default App
