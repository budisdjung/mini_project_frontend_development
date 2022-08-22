import React from "react";
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter,
  Outlet,
} from "react-router-dom";

import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import Header from "./component/header";
import Catalog from "./pages/catalog"

import 'bootstrap/dist/css/bootstrap.min.css'
import ProductId from "./pages/product/blyd"

const PrivateAuth = () => {
  const auth = sessionStorage.getItem('access_token')

  if (!auth) {
    return <Navigate to="/"/>
  }

  return (
    <>
    <Header/>
    <Outlet/>
    </>
  )
}

export default function App() {
  
  return (
    <>
      <BrowserRouter>
      <Routes>
        {/*Public Auth*/}
        <Route path='/' element={<Login />} />
        <Route path='/product/:productId' element={<ProductId />} />

        {/*Private Auth*/}
        <Route element={<PrivateAuth />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>

        {/*Not Found*/}
        <Route path='*' element={<>Page Not Found!</>} />
      </Routes>
      </BrowserRouter>
    </>
  );
}
