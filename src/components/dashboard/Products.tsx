import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../store/actions/product";
import { RootReducer } from "../../store/reducers/root";

const Products = () => {
  const { products } = useSelector((state: RootReducer) => ({
    products: state.product.products,
  }));

  const dispatch = useDispatch();

  return (
    <Fragment>
      <h4>All products</h4>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {products &&
            products.map((product) => {
              const { name, price, store, category, id } = product;
              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{price}</td>
                  <td>{store}</td>
                  <td>{category}</td>
                  <td>
                    <Link to={`/edit/${id}`}>
                      <i className="material-icons">edit</i>
                    </Link>
                  </td>
                  <td>
                    <i
                      onClick={() => {
                        // eslint-disable-next-line
                        let c = confirm(`Do you want to delete ${name}`);
                        if (c) dispatch(deleteProduct(id!));
                      }}
                      className="material-icons red-text"
                    >
                      close
                    </i>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Products;
