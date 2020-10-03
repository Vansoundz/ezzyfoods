import React, { useState, FormEvent, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductModel } from "../../models/product.model";
import {
  getCategories,
  getProduct,
  updateProduct,
} from "../../data/product.data";
import { useMutation, useQuery } from "react-query";
import Loading from "../layout/Loading";
import { toast } from "react-toastify";

const Edit = () => {
  const { id: pId } = useParams<{ id: string }>();
  const { data: categories } = useQuery("get cateories", getCategories);
  const { data: product, isLoading } = useQuery(
    ["get product by Id", pId],
    getProduct
  );

  // const types = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

  const [formData, setFormdata] = useState<ProductModel>({});
  const [editProduct, { data: editData, isLoading: editLoading }] = useMutation(
    updateProduct
  );

  useEffect(() => {
    if (editData?.errors) {
      editData.errors.forEach(({ msg }: { msg: string }) =>
        toast(msg, { type: "error" })
      );
    }
    if (editData?.product) {
      toast("Product edited successfully", { type: "success" });
    }
  }, [editData]);

  useEffect(() => {
    if (product?.product) setFormdata(product.product);
  }, [product]);

  const { name, price, quantity, category } = formData;

  const onChange = (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormdata({
      ...formData,
      [`${e.currentTarget.id}`]: e.currentTarget.value,
    });
  };

  const editProd = (e: FormEvent) => {
    e.preventDefault();
    const { name, price, quantity, category } = formData;

    if (!name || !name.trim()) {
      toast("Enter a valid product name", { type: "error" });
    } else if (!price || !price.toString().trim()) {
      toast("Enter a valid product price", { type: "error" });
    } else if (!quantity || !quantity.toString().trim()) {
      toast("Enter a valid product quantity", { type: "error" });
    } else if (!category) {
      toast("Enter a valid product category", { type: "error" });
    } else {
      editProduct({ product: formData });
    }
  };

  return (
    <div>
      {(isLoading || editLoading) && <Loading />}
      <div className="create">
        <h4>Edit product</h4>
        <form onSubmit={editProd} id="product">
          <div className="input-field">
            {/**<label htmlFor="name">Product title</label> **/}
            <input
              value={name || ""}
              onChange={onChange}
              type="text"
              id="name"
            />
          </div>
          <div className="input-field">
            {/**<label htmlFor="price">Product price</label>**/}
            <input
              value={price || ""}
              onChange={onChange}
              type="number"
              id="price"
            />
          </div>
          <div className="input-field">
            {/**<label htmlFor="quantity">Product quantity</label>**/}
            <input
              value={quantity || ""}
              onChange={onChange}
              type="text"
              id="quantity"
            />
          </div>
          <div className="input-field">
            {/**<label>Materialize Select</label> **/}
            <select
              value={typeof category === "string" ? category : category?.name}
              onChange={onChange}
              id="category"
            >
              <option disabled>Choose your option</option>
              {categories &&
                categories.categories &&
                categories.categories.map(
                  ({ _id, name }: { name: string; _id: string }) => {
                    return (
                      <option key={_id} value={_id}>
                        {name}
                      </option>
                    );
                  }
                )}
            </select>
          </div>
          <div className="input-field">
            {formData.file ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>Selected: {formData.file.name}</div>
                <div>
                  <div
                    onClick={() =>
                      setFormdata({ ...formData, file: undefined })
                    }
                    className="material-icons"
                  >
                    close
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="">
                  <label htmlFor="file">
                    <i className="material-icons">cloud_upload</i>
                  </label>
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFormdata({ ...formData, file: e.target.files[0] });
                      }
                    }}
                    id="file"
                    style={{ display: "none" }}
                  />
                </div>
              </>
            )}
          </div>
          <div style={{ textAlign: "center" }}>
            <button className="e-button">Edit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
