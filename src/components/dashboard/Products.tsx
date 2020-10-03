import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { getProducts, deleteProduct } from "../../data/product.data";
import { ProductModel } from "../../models/product.model";
import Loading from "../layout/Loading";

const Products = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);

  const { data, isLoading } = useQuery("get products", getProducts);
  const [deleteProd] = useMutation(deleteProduct);

  useEffect(() => {
    if (data?.products) {
      setProducts(data.products);
    }
  }, [data]);

  return (
    <div className="d-products">
      {isLoading && <Loading />}
      <h4>All products</h4>
      <>
        <div className="d-product" id="dphead">
          <span>Name</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Category</span>
          <span>Edit</span>
          <span>Delete</span>
        </div>

        <>
          {products &&
            products.map((product) => {
              const { name, price, quantity, category, _id } = product;
              return (
                <div className="d-product" key={_id}>
                  <span>{name}</span>
                  <span>{price}</span>
                  <span>{quantity}</span>
                  <span>{typeof category === "object" && category.name}</span>
                  <span>
                    <Link to={`/edit/${_id}`}>
                      <i className="material-icons">edit</i>
                    </Link>
                  </span>
                  <span>
                    <i
                      onClick={async () => {
                        // eslint-disable-next-line
                        let c = confirm(`Do you want to delete ${name}`);
                        if (c) await deleteProd({ id: _id! });
                      }}
                      className="material-icons red-text"
                    >
                      close
                    </i>
                  </span>
                </div>
              );
            })}
        </>
      </>
    </div>
  );
};

export default Products;
