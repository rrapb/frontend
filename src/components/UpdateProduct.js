import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct =()=>{
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, [])

    const getProductDetails = async () => {
        let result = await fetch (`http://localhost:5000/products/${params.id}`, {
            headers: {
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }

    const updateProduct = async () => {
        if(!name || !price || !company || !category){
            setError(true);
            return false;   
        }
        let result = await fetch(`http://localhost:5000/products/${params.id}`, {
            method:'Put',
            body: JSON.stringify({name, price, category, company}),
            headers: {
                'Content-Type': 'Application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        if(result){
            alert('Product updated')
            navigate('/')
        }
    }

    const keyUpdateProduct = (event) => {
        if(event.key === 'Enter'){
            updateProduct();
        }
    }
    return(
        <div  className='product'>
            <h1>Update product</h1>
            <input type='text' className='inputBox' placeholder='Enter product name'
            value ={name} onChange={(e)=>{setName(e.target.value)}} onKeyDown ={keyUpdateProduct}></input>
            {error && !name && <span className='invalid-input'>Enter valid name</span>}
            
            <input type='text' className= 'inputBox' placeholder='Enter product price'
            value ={price} onChange={(e)=>{setPrice(e.target.value)}} onKeyDown ={keyUpdateProduct}></input>
            {error && !price && <span className='invalid-input'>Enter valid price</span>}
            

            <input type='text' className='inputBox' placeholder='Enter product category'
            value ={category} onChange={(e)=>{setCategory(e.target.value)}} onKeyDown ={keyUpdateProduct}></input>
            {error && !category && <span className='invalid-input'>Enter valid category</span>}

            <input type='text' className='inputBox' placeholder='Enter product company'
            value={company} onChange={(e)=>{setCompany(e.target.value)}} onKeyDown ={keyUpdateProduct}></input>
            {error && !company && <span className='invalid-input'>Enter valid company</span>}


            <button onClick ={updateProduct} className='appButton'>Update Product</button>
        </div>
    )
}

export default UpdateProduct;