import React from 'react'
import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import PrivateComponent from './components/PrivateComponent';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
     {/* Required Auth Route */}
      <Routes>
        <Route element={<PrivateComponent />}>
        <Route path = '/' element = {<ProductList></ProductList>}></Route>
        <Route path = '/add' element = {<AddProduct></AddProduct>}></Route>
        <Route path = '/update/:id' element = {<UpdateProduct></UpdateProduct>}></Route>
        <Route path = '/logout' element = {<h1>Logout Component</h1>}></Route>
        {/* <Route path = '/profile' element = {<h1>Profile Component</h1>}></Route> */}
        </Route>
             {/* Required Non auth Route */}

        <Route path = '/signup' element = {<SignUp />}></Route> 
        <Route path = '/login' element = {<Login/>}></Route>
      </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
