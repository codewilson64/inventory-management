import { BrowserRouter, Route, Routes } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import Categories from "./pages/Categories"
import Transactions from "./pages/Transactions"
import CreateProduct from "./pages/CreateProduct"
import CreateCategory from "./pages/CreateCategory"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/transactions" element={<Transactions />} />

        <Route path="/products/create" element={<CreateProduct />}/>
        <Route path="/categories/create" element={<CreateCategory />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
