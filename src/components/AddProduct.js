import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { createRoot } from "react-dom/client";
import { Button, DatePicker, Space, Form, Input } from "antd";
import "../App.css";

const AddProduct = (props) => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [error, setError] = React.useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const addProduct = async () => {
    if (!name || !price || !company || !category) {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;

    let result = await axios.post(
      "http://localhost:5000/add-product",
      JSON.stringify({ name, price, category, company, userId }),
      {
        // method: 'post',
        // body: JSON.stringify({name, price, category, company, userId}),
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    // result = await result.json();
    if (result.data) {
      alert("Product added successfully");
    }
    setName("");
    setPrice("");
    setCategory("");
    setCompany("");
    setError(false);
    // if(result){
    //     navigate('/');
    // }
  };

  const handleKeyPress = (event) => {
    if (event.code === "Enter") {
      addProduct();
    }
  };

  return (
    <div className="product">
      <h1>Add product</h1>
      <Input
        type="text"
        className="inputBox"
        placeholder="Enter product name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        onKeyDown={handleKeyPress}
      ></Input>

      {error && !name && (
        <span className="invalid-input">Enter valid name</span>
      )}

      <Input
        type="text"
        className="inputBox"
        placeholder="Enter product price"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        onKeyDown={handleKeyPress}
      ></Input>

      {error && !price && (
        <span className="invalid-input">Enter valid price</span>
      )}

      <Input
        type="text"
        className="inputBox"
        placeholder="Enter product category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        onKeyDown={handleKeyPress}
      ></Input>

      {error && !category && (
        <span className="invalid-input">Enter valid category</span>
      )}

      <Input
        type="text"
        className="inputBox"
        placeholder="Enter product company"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
        onKeyDown={handleKeyPress}
      ></Input>

      {error && !company && (
        <span className="invalid-input">Enter valid company</span>
      )}

      {/* <button type='submit' onClick={addProduct} className='appButton'>Add Product</button> */}
      <Space>
        <DatePicker className="datepicker" />
        <Button
          type="primary"
          onClick={(e) => {
            e.stopPropagation();
            addProduct();
          }}
        >
          Submit
        </Button>
      </Space>
    </div>
  );
};

export default AddProduct;
