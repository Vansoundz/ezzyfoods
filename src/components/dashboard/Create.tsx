import React, { useState, FormEvent, useEffect } from "react";
import { ProductModel } from "../../models/product.model";
import { useMutation, useQuery } from "react-query";
import {
  createCategory,
  createProduct,
  getCategories,
} from "../../data/product.data";
import { toast } from "react-toastify";
import Loading from "../layout/Loading";

const Create = () => {
  const types = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  const [newCategory, setNewCategory] = useState("");
  const [createNewProduct, { data, isLoading }] = useMutation(createProduct);
  const [
    createNewCategory,
    { data: categoryData, isLoading: categoryLoading },
  ] = useMutation(createCategory);

  const { data: categories, refetch: refetchCategories } = useQuery(
    "get categories",
    getCategories
  );

  useEffect(() => {
    if (categoryData?.errors) {
      categoryData.errors.forEach(({ msg }: { msg: string }) =>
        toast(msg, { type: "error" })
      );
    }

    if (categoryData?.category) {
      toast("Category created successfully", { type: "success" });
      refetchCategories();
    }
  }, [categoryData, refetchCategories]);

  useEffect(() => {
    if (data?.errors) {
      data.errors.forEach(({ msg }: { msg: string }) =>
        toast(msg, { type: "error" })
      );
    }

    if (data?.product) {
      toast("Product created successfully", { type: "success" });
    }
  }, [data]);

  const [formData, setFormdata] = useState<ProductModel>({});
  const { quantity, price, name } = formData;

  const onChange = (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormdata({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const createCat = async (e: FormEvent) => {
    e.preventDefault();
    await createNewCategory({ name: newCategory });
    const el = document.getElementById("newCategory") as HTMLInputElement;
    el.value = "";
  };

  const createProd = async (e: FormEvent) => {
    e.preventDefault();
    const { name, price, category, file } = formData;

    if (!name || !name.trim()) {
      toast("Enter a valid product name", { type: "error" });
    } else if (!price || !price.trim()) {
      toast("Enter a valid product price", { type: "error" });
    } else if (!category) {
      toast("Enter a valid product category", { type: "error" });
    } else if (!file || !types.includes(file.type)) {
      toast("Please a valid product image", { type: "error" });
    } else {
      await createNewProduct({ product: formData });

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
    <div>
      {(categoryLoading || isLoading) && <Loading />}
      <div className="create">
        <h6>Create a product category</h6>
        <form onSubmit={createCat} className="row" id="fcategory">
          <div className="input-field left col s10">
            <label htmlFor="category">Category</label>
            <input
              onChange={(e) => {
                if (!e.target.value.match(/\s/g))
                  setNewCategory(e.target.value);
              }}
              type="text"
              id="newCategory"
            />
          </div>
          <button className=" right col s2">
            <i className="material-icons">add</i>
          </button>
        </form>
      </div>
      <div style={{ marginTop: "24px" }} className="create">
        <h6>Create a product</h6>
        <form onSubmit={createProd} id="product">
          <div className="input-field">
            <label htmlFor="name">Product title</label>
            <input
              value={name || ""}
              onChange={onChange}
              type="text"
              id="name"
            />
          </div>
          <div className="input-field">
            <label htmlFor="price">Product price</label>
            <input
              value={price || ""}
              onChange={onChange}
              type="number"
              id="price"
            />
          </div>
          <div className="input-field">
            <label htmlFor="quantity">Product quantity</label>
            <input
              value={quantity || ""}
              onChange={onChange}
              type="number"
              id="quantity"
            />
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
            <button className="e-button">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
