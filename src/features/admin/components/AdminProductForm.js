import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../Auth/AuthSlice";
import { UpdateProductAsync, clearSelectedProduct, createProductAsync, fetchAllSelectedProductAsync, selectAllBrands, selectAllCategories, selectSelectedProduct } from "../../Product/ProductSlice";
import { Navigate, useParams } from "react-router-dom";
import {useAlert} from 'react-alert'

export default function AdminProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm();
  const alert = useAlert()
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const categories = useSelector(selectAllCategories)
  const brands = useSelector(selectAllBrands)
  const params = useParams()
  const product = useSelector(selectSelectedProduct)
  
  useEffect(() => {
    if (params.id) {
      dispatch(fetchAllSelectedProductAsync(params.id))
    }
    else{
      dispatch(clearSelectedProduct())
    }
  }, [dispatch, params.id]);
  
  useEffect(() => {
    if (product && params.id) {
      setValue('title', product.title);
      setValue('description', product.description);
      setValue('price', product.price);
      setValue('discountPercentage', product.discountPercentage);
      setValue('category', product.category);
      setValue('brand', product.brand);
      setValue('thumbnail', product.thumbnail);
      setValue('image1', product.images[0]);
      setValue('image2', product.images[1]);
      setValue('image3', product.images[2]);
      setValue('image4', product.images[3]);
      setValue('stock', product.stock);
    }
  }, [product, setValue , params.id]);
  
  
  
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen mt-32">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <form
          onSubmit={handleSubmit((productData) => {
            console.log(productData);
            const images = [productData.image1 , productData.image2 , productData.image3 , productData.image4 ]
            delete productData.image1
            delete productData.image2
            delete productData.image3
            delete productData.image4
            productData.rating = 0 ;
            if (params.id) {
              productData.id = params.id;
              productData.rating = product.rating ;
              dispatch(UpdateProductAsync({...productData , images : images}))
              alert.success("Update Successful")
              reset()
            }else{
              dispatch(createProductAsync({...productData , images : images}))
              alert.success("Product Created Successfully")
              reset()
            }
          })}
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Product Details
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Enter the details of the Product
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-3">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Product Title
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      {...register("title")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-3">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price :
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="price"
                      id="price"
                      {...register("price")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-3">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description :
                  </label>
                  <div className="mt-2">
                    <input
                      id="description"
                      name="description"
                      type="description"
                      {...register("description")}
                      autoComplete="description"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-3">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Category :
                  </label>
                  <div className="mt-2">
                    <select
                      id="category"
                      name="category"
                      {...register("category")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>-select-Category-</option>
                      {categories.map((category)=>(
                        <option value={category.value}>{category.label}</option>
                      )) }
                    </select>
                  </div>
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Brand :
                  </label>
                  <div className="mt-2">
                    <select
                      id="brand"
                      name="brand"
                      {...register("brand")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>-select-Brand-</option>
                      {brands.map((brand)=>(
                        <option value={brand.value}>{brand.label}</option>
                      )) }
                    </select>
                  </div>
                </div>
                
                <div className="col-span-3">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Discount percentage
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="discountPercentage"
                      id="discountPercentage"
                      {...register("discountPercentage")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                
                <div className="col-span-3">
                  <label
                    htmlFor="street-stock"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Stock :
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="stock"
                      id="stock"
                      {...register("stock")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-3">
                  <label
                    htmlFor="thumbnail"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Thumbnail :
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="thumbnail"
                      id="thumbnail"
                      {...register("thumbnail")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="image4"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image :
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="image4"
                      id="image4"
                      {...register("image4")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                

                <div className="col-span-3">
                  <label
                    htmlFor="image1"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image1
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="image1"
                      id="image1"
                      {...register("image1")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-3">
                  <label
                    htmlFor="image2"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image 2
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="image2"
                      id="image2"
                      {...register("image2")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-3">
                  <label
                    htmlFor="postal-image3"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image 3
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="image3"
                      id="image3"
                      {...register("image3")}
                      autoComplete="postal_code"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="reset"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

