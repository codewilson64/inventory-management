import { BrowserRouter, Route, Routes } from "react-router-dom"

import Dashboard from "./pages/dashboard/Dashboard"
import Products from "./pages/products/Products"
import Categories from "./pages/categories/Categories"
import Transactions from "./pages/transactions/Transactions"
import CreateProduct from "./pages/products/CreateProduct"
import CreateCategory from "./pages/categories/CreateCategory"
import CreateTransaction from "./pages/transactions/CreateTransaction"
import UpdateProduct from "./pages/products/UpdateProduct"
import UpdateCategory from "./pages/categories/UpdateCategory"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/transactions" element={<Transactions />} />

        <Route path="/products/create" element={<CreateProduct />}/>
        <Route path="/products/update/:id" element={<UpdateProduct />}/>

        <Route path="/categories/create" element={<CreateCategory />}/>
        <Route path="/categories/update/:id" element={<UpdateCategory />}/>

        <Route path="/transactions/create" element={<CreateTransaction />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
