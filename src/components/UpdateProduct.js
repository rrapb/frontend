import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct =()=>{
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, [])

    const getProductDetails = async () => {
        let result = await fetch (`http://localhost:5000/products/${params.id}`);
        result = await result.json();
        console.warn(result);
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }

    const updateProduct = async () => {
        let result = await fetch(`http://localhost:5000/products/${params.id}`, {
            method:'Put',
            body: JSON.stringify({name, price, category, company}),
            headers: {
                'Content-Type': 'Application/json'
            }
        })
        result = await result.json();
        if(result){
            navigate('/')
        }
    }
    return(
        <div  className='product'>
            <h1>Update product</h1>
            <input type='text' className='inputBox' placeholder='Enter product name'
            value ={name} onChange={(e)=>{setName(e.target.value)}}></input>

            
            <input type='text' className= 'inputBox' placeholder='Enter product price'
            value ={price} onChange={(e)=>{setPrice(e.target.value)}}></input>
            

            <input type='text' className='inputBox' placeholder='Enter product category'
            value ={category} onChange={(e)=>{setCategory(e.target.value)}}></input>

            <input type='text' className='inputBox' placeholder='Enter product company'
            value={company} onChange={(e)=>{setCompany(e.target.value)}}></input>


            <button onClick ={updateProduct} className='appButton'>Update Product</button>
        </div>
    )
}

export default UpdateProduct;