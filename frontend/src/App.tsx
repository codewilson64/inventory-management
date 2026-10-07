import { BrowserRouter, Route, Routes } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import Categories from "./pages/Categories"
import Transactions from "./pages/Transactions"
import CreateProduct from "./pages/CreateProduct"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/create" element={<CreateProduct />}/>
        <Route path="/categories" element={<Categories />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
