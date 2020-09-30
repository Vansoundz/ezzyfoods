import React, { Fragment, useState, FormEvent } from "react";

import { useSelector } from "react-redux";
import {
  createCategory,
  createProduct,
  load,
} from "../../store/actions/product";
import { RootReducer } from "../../store/reducers/root";
import { ProductModel } from "../../models/product.model";

const Create = () => {
  const types = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

  const { categories, loading } = useSelector((state: RootReducer) => ({
    categories: state.product.categories,
    loading: state.product.loading,
  }));

  const [formData, setFormdata] = useState<ProductModel>({});

  const { name, price, store } = formData;

  // const [create, setCreate] = useState(true)

  const onChange = (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormdata({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  // const selectChange = (e: FormEvent<HTMLSelectElement>) => {
  //   setFormdata({
  //     ...formData,
  //     category: e.currentTarget.value
  //   })
  // }

  const createCat = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.category?.trim()) {
      // setAlert({ msg: "Enter a valid category name", type: "red" });
    } else {
      createCategory(formData?.category?.toLowerCase());
      // document.forms['fcategory'].reset()
    }
  };

  const createProd = (e: FormEvent) => {
    e.preventDefault();
    const { name, price, store, category } = formData;
    const el = document.getElementById("file") as HTMLInputElement;
    const file = el.files ? el?.files[0] : undefined;

    if (!name || !name.trim()) {
      // setAlert({ msg: "Enter a valid product name", type: "red" });
    } else if (!price || !price.trim()) {
      // setAlert({ msg: "Enter a valid product price", type: "red" });
    } else if (!store || !store?.toString().trim()) {
      // setAlert({ msg: "Enter a valid product quantity", type: "red" });
    } else if (!category || !category.trim()) {
      // setAlert({ msg: "Enter a valid product category", type: "red" });
    } else if (!file || !types.includes(file.type)) {
      // setAlert({ msg: "Please a valid product image", type: "red" });
    } else {
      const img = file.name;
      let product = {
        name,
        price,
        store,
        category,
        file,
        img,
      };
      load();
      createProduct(product);
      setFormdata({
        name: "",
        price: "",
        store: "",
        category: "",
        file: undefined,
      });
      // document.forms['product'].reset()
    }
  };

  return (
    <Fragment>
      <div>
        <h6>Create a product category</h6>
        <form onSubmit={createCat} className="row" id="fcategory">
          <div className="input-field left col s10">
            <label htmlFor="category">Category</label>
            <input onChange={onChange} type="text" id="category" />
          </div>
          <button className="btn orange right col s2">
            <i className="material-icons">add</i>
          </button>
        </form>
      </div>
      <div>
        <h6>Create a product</h6>
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
          <form onSubmit={createProd} id="product">
            <div className="input-field">
              <label htmlFor="name">Product title</label>
              <input value={name} onChange={onChange} type="text" id="name" />
            </div>
            <div className="input-field">
              <label htmlFor="price">Product price</label>
              <input
                value={price}
                onChange={onChange}
                type="number"
                id="price"
              />
            </div>
            <div className="input-field">
              <label htmlFor="store">Product quantity</label>
              <input value={store} onChange={onChange} type="text" id="store" />
            </div>
            <div className="input-field">
              <select
                defaultValue="Choose your option"
                onChange={onChange}
                id="category"
              >
                <option defaultValue="Choose your option" disabled>
                  Choose your option
                </option>
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
            <button className="btn orange">Create</button>
          </form>
        )}
      </div>
    </Fragment>
  );
};

export default Create;
