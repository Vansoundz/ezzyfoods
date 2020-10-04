import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { getProducts, deleteProduct } from "../../data/product.data";
import { ProductModel } from "../../models/product.model";
import Loading from "../layout/Loading";
import { toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const { data, isLoading, refetch } = useQuery("get products", getProducts);
  const [deleteProd, { data: deleted, isLoading: deleteLoading }] = useMutation(
    deleteProduct
  );

  const [sortIndexes, setSortIndexes] = useState({
    name: {
      asc: false,
      current: false,
      value: "name",
    },
    price: {
      asc: false,
      current: false,
      value: "price",
    },
    quantity: {
      asc: false,
      current: false,
      value: "quantity",
    },
    category: {
      asc: false,
      current: false,
      value: "[name]",
    },
  });

  const sortProductBy = (criteria: string) => {
    console.log(products);
    let prods = products.sort((a, b) => {
      // @ts-ignore
      let first = a[sortIndexes[criteria].value];
      // @ts-ignore
      let second = b[sortIndexes[criteria].value];

      console.log(first, second);
      // @ts-ignore
      if (sortIndexes[criteria].asc) {
        if (
          typeof first && typeof second === "number"
            ? first > second
            : first?.toLowerCase()?.localeCompare(second?.toLowerCase())
        )
          return 1;
        return -1;
      } else {
        // @ts-ignore
        if (
          typeof first && typeof second === "number"
            ? second > first
            : second?.toLowerCase()?.localeCompare(first?.toLowerCase())
        )
          return 1;
        return -1;
      }
    });

    setSortIndexes({
      ...sortIndexes,
      [criteria]: {
        // @ts-ignore
        asc: !sortIndexes[criteria].asc,
      },
    });

    return prods;
  };

  useEffect(() => {
    if (deleted?.product) {
      toast("Product deleted successfully", { type: "info" });
      refetch();
    }
  }, [deleted, refetch]);

  useEffect(() => {
    if (data?.products) {
      setProducts(data.products);
    }
  }, [data]);

  return (
    <div className="d-products">
      {(isLoading || deleteLoading) && <Loading />}
      <h4>All products</h4>
      <>
        <div className="d-product" id="dphead">
          <span
            onClick={() => {
              setProducts(sortProductBy("name"));
            }}
          >
            Name
          </span>
          <span
            onClick={() => {
              setProducts(sortProductBy("price"));
            }}
          >
            Price
          </span>
          <span
            onClick={() => {
              setProducts(sortProductBy("quantity"));
            }}
          >
            Quantity
          </span>
          <span
            onClick={() => {
              setProducts(sortProductBy("category"));
            }}
          >
            Category
          </span>
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
