import React from 'react';

const AddProduct =()=>{
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);

    const addProduct = async () => {
        if(!name || !price || !company || !category){
            setError(true);
            return false;   
        }

        console.warn(name, price, category, company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        console.warn(userId);
        let result = await fetch('http://localhost:5000/add-product', {
            method:'post',
            body: JSON.stringify({name, price, category, company, userId}),
            headers: {
                "Content-Type": "application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        })
        result = await result.json();
        console.warn(result);

        // const  submitHandler = async()=> {
        //     this.clear();
        //     }
        //     const clear = async () =>{
        //         this.setState({
        //           setName: ""//simply you can clear Templatecode
        //         });
        //       }
            
    }
    return(
        <div  className='product'>
            <h1>Add product</h1>
            <input type='text' className='inputBox' placeholder='Enter product name'
            value ={name} onChange={(e)=>{setName(e.target.value)}}></input>

            {error && !name && <span className='invalid-input'>Enter valid name</span>}
            
            <input type='text' className= 'inputBox' placeholder='Enter product price'
            value ={price} onChange={(e)=>{setPrice(e.target.value)}}></input>

            {error && !price && <span className='invalid-input'>Enter valid price</span>}

            <input type='text' className='inputBox' placeholder='Enter product category'
            value ={category} onChange={(e)=>{setCategory(e.target.value)}}></input>

            {error && !category && <span className='invalid-input'>Enter valid category</span>}

            <input type='text' className='inputBox' placeholder='Enter product company'
            value={company} onChange={(e)=>{setCompany(e.target.value)}}></input>

            {error && !company && <span className='invalid-input'>Enter valid company</span>}

            <button  onClick ={addProduct} className='appButton'>Add Product</button>
        </div>
    )
}

export default AddProduct;