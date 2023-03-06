import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import api from "./api";
const baseURL = "https://jsonplaceholder.typicode.com/products";
const ProductList = () => {

    const [products, setProducts] = useState([]);

    // React.useEffect(() => {
    //     axios.get(baseURL).then((response) => {
    //       setPost(response.data);
    //     });
    //   }, []);
    

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await axios('http://localhost:5000/products', {
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        // result = await result.json();
        setProducts(result.data);
    }

    // const deleteProduct = async (id) => {
    //     let result = await fetch(`http://localhost:5000/products/${id}`, {
    //         method: 'Delete',
    //         headers: {
    //             "Content-Type": "application/json",
    //             authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
    //         }
    //     })
    //     result = await result.json();
        
    //     if(result){
    //        alert('You want to delete this product!')
    //        getProducts();
    //     }

    // }

    const deleteProduct = (id) => {
        let result = axios.delete(`http://localhost:5000/products/${id}`, {
    headers: {
    Authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
    }

    })
    if(result){
        alert('You want to delete this product!')
        getProducts();
    }
 }
    
    


    const searchHandler = async (event) => {
        let key = event.target.value;
        if(key){
            let result = await axios(`http://localhost:5000/search/${key}`, {
                headers: {
                    Authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                    }
            })
            
        //  result = await result.json();
       
        if(result){
            setProducts(result.data);
        }
    }else{
        getProducts();
    }   
}


        


    return(
        <div className="product-list">
            <h3>Product List</h3>
            <input type='text' className='search-product-box' onChange={searchHandler} placeholder="Search Product"></input>
            <ul>
                <li>S. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {
               products.length>0 ? products.map((product, index) => 
                    <ul key={product._id}>
                    <li>{index+1}</li>
                    <li>{product.name}</li>
                    <li>{product.price}</li>
                    <li>{product.category}</li>
                    <li>
                        <button onClick={()=>deleteProduct(product._id)}>Delete</button>
                        <button><Link to ={'/update/'+product._id}> Update </Link></button></li>
                </ul>
                )
                :<h1>No Result Found</h1>
            }
        </div>
    )
}

export default ProductList;