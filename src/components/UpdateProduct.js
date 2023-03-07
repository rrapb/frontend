import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, DatePicker, Space, Form, Input } from "antd";
import "../App.css";

const UpdateProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [error, setError] = React.useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await axios(`http://localhost:5000/products/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    // result = await result.json();
    setName(result.data.name);
    setPrice(result.data.price);
    setCategory(result.data.category);
    setCompany(result.data.company);
  };

  const updateProduct = async () => {
    if (!name || !price || !company || !category) {
      setError(true);
      return false;
    }
    let result = await axios.put(
      `http://localhost:5000/products/${params.id}`,
      JSON.stringify({ name, price, category, company }),
      {
        // method:'Put',
        // body: JSON.stringify({name, price, category, company}),
        headers: {
          "Content-Type": "Application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    // result = await result.json();
    if (result.data) {
      alert("Product updated");
      navigate("/");
    }
  };

  const keyUpdateProduct = (event) => {
    if (event.key === "Enter") {
      updateProduct();
    }
  };
  return (
    <div className="product">
      <h1>Update product</h1>
      <Input
        type="text"
        className="inputBox"
        placeholder="Enter product name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        onKeyDown={keyUpdateProduct}
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
        onKeyDown={keyUpdateProduct}
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
        onKeyDown={keyUpdateProduct}
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
        onKeyDown={keyUpdateProduct}
      ></Input>
      {error && !company && (
        <span className="invalid-input">Enter valid company</span>
      )}

      {/* <button onClick ={updateProduct} className='appButton'>Update Product</button> */}
      <Space>
        <DatePicker className="datepicker" />
        <Button
          type="primary"
          onClick={(e) => {
            e.stopPropagation();
            updateProduct();
          }}
        >
          Submit
        </Button>
      </Space>
    </div>
  );
};

export default UpdateProduct;
