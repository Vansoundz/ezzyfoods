import React, { Fragment, useState, FormEvent } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editProduct, load } from "../../store/actions/product";
import { RootReducer } from "../../store/reducers/root";
import { ProductModel } from "../../models/product.model";

const Edit = () => {
  const { id: pId } = useParams<{ id: string }>();

  const { categories, loading, product } = useSelector(
    (state: RootReducer) => ({
      categories: state.product.categories,
      product: state.product.products.find((prd) => prd.id === pId),
      loading: state.product.loading,
    })
  );

  // const types = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

  const [formData, setFormdata] = useState<ProductModel>(product!);

  const { name, price, store, category } = formData;

  const onChange = (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormdata({
      ...formData,
      [`t${e.currentTarget.id}`]: e.currentTarget.value,
    });
  };

  const editProd = (e: FormEvent) => {
    e.preventDefault();
    const el = document.getElementById("file") as HTMLInputElement;
    // @ts-ignore
    const file = el?.files[0];
    const { name, price, store, category, id } = formData;

    if (!name || !name.trim()) {
      // setAlert({ msg: "Enter a valid product name", type: "red" });
    } else if (!price || !price.toString().trim()) {
      // setAlert({ msg: "Enter a valid product price", type: "red" });
    } else if (!store || !store.toString().trim()) {
      // setAlert({ msg: "Enter a valid product quantity", type: "red" });
    } else if (!category || !category.trim()) {
      // setAlert({ msg: "Enter a valid product category", type: "red" });
    } else {
      let newProduct = file
        ? {
            name: name,
            price: price,
            store: store,
            category: category,
            quantity: 1,
            id,
            file,
            img: file.name,
          }
        : {
            name: name,
            price: price,
            store: store,
            category: category,
            quantity: 1,
            id,
          };
      load();
      editProduct(newProduct);
      setFormdata({
        name: "",
        price: "",
        store: "",
        category: "",
        id: "",
      });
      // document.forms["product"].reset();
    }
  };

  return (
    <Fragment>
      <div>
        <h6>Edit product</h6>
        {loading ? (
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={editProd} id="product">
            <div className="input-field">
              {/**<label htmlFor="name">Product title</label> **/}
              <input value={name} onChange={onChange} type="text" id="name" />
            </div>
            <div className="input-field">
              {/**<label htmlFor="price">Product price</label>**/}
              <input
                value={price}
                onChange={onChange}
                type="number"
                id="price"
              />
            </div>
            <div className="input-field">
              {/**<label htmlFor="store">Product quantity</label>**/}
              <input value={store} onChange={onChange} type="text" id="store" />
            </div>
            <div className="input-field">
              {/**<label>Materialize Select</label> **/}
              <select value={category} onChange={onChange} id="category">
                <option disabled>Choose your option</option>
                {categories &&
                  categories.map((c, i) => {
                    return (
                      <option key={i} value={c}>
                        {c}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="file-field input-field">
              <div className="btn orange">
                <i className="material-icons">cloud_upload</i>
                <input type="file" id="file" />
              </div>

              <div className="file-path-wrapper">
                <input
                  className="file-path validate"
                  type="text"
                  id="img"
                  placeholder="Upload file"
                />
              </div>
            </div>
            <button className="btn orange">Edit</button>
          </form>
        )}
      </div>
    </Fragment>
  );
};

export default Edit;
