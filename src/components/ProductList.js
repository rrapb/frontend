import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space, Table, List, Button } from "antd";

const { Column, ColmnGroup } = Table;

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);
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
    let result = await axios("http://localhost:5000/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    // result = await result.json();
    setProducts(result.data);
  };

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

  let deleteProduct = (id) => {
    let result = axios
      .delete(`http://localhost:5000/products/${id}`, {
        headers: {
          Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then(() => {
        alert("You want to delete this product");
        getProducts();
      });
  };
  //   if (result.data) {
  //     alert("You want to delete this product!");
  //     getProducts();
  //   }

  const searchHandler = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await axios(`http://localhost:5000/search/${key}`, {
        headers: {
          Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      //  result = await result.json();

      if (result) {
        setProducts(result.data);
      }
    } else {
      getProducts();
    }
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
  ];

  return (
    <div className="product-list">
      <h3>Product List</h3>
      {/* <input
        type="text"
        className="search-product-box"
        onChange={searchHandler}
        placeholder="Search Product"
      ></input> */}
      <Space direction="vertical">
        <Search
          className="search-space"
          placeholder="Search Product"
          onChange={searchHandler}
          //   onClick={(e) => {
          //     e.stopPropagation();
          //     searchHandler();
          //   }}
          style={{ width: 400 }}
        />
      </Space>
      {/* <ul>
        <li>S. No.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul> */}
      <Table pagination={false} size="small" dataSource={[...products]}>
        <Column
          width={50}
          align={"center"}
          title="Name"
          key="name"
          render={(product, index) => (
            <ul key={product._id}>
              <List.Item className="list">{product.name}</List.Item>
            </ul>
          )}
        />
        <Column
          title="Price"
          key="price"
          width={50}
          align={"center"}
          render={(product, index) => (
            <ul key={product._id}>
              <List.Item className="list">{product.price}</List.Item>
            </ul>
          )}
        />
        <Column
          title="Category"
          key="category"
          width={50}
          align={"center"}
          render={(product, index) => (
            <ul key={product.category}>
              <List.Item className="list">{product.category}</List.Item>
            </ul>
          )}
        />
        <Column
          title="Action"
          key="action"
          width={50}
          align={"center"}
          render={(product, index) => (
            <ul key={product._id}>
              <List.Item>
                <Button
                  type="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteProduct(product._id);
                  }}
                >
                  Delete
                </Button>
                <Button className="update-button" type="primary">
                  <Link to={"/update/" + product._id}> Update </Link>
                </Button>
              </List.Item>
            </ul>
          )}
        />
      </Table>
      {/* {products.length > 0 ? (
        products.map((product, index) => (
          <ul key={product._id}>
            <li>{index + 1}</li>
            <li>{product.name}</li>
            <li>{product.price}</li>
            <li>{product.category}</li>
            <li>
              <button onClick={() => deleteProduct(product._id)}>Delete</button>
              <button>
                <Link to={"/update/" + product._id}> Update </Link>
              </button>
            </li>
          </ul>
        ))
      ) : (
        <h1>No Result Found</h1>
      )}  */}
    </div>
  );
};

export default ProductList;
