import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUserAsync, selectUser } from "../../Auth/AuthSlice";
import {} from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import {useAlert} from 'react-alert'
import Modal from '../../common/Modal'


function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();
  const alert = useAlert()
  const [openModal, setOpenModal] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [Add, setAdd] = useState(false);
  const [currentIndex, setcurrentIndex] = useState(-1);
  const handleAdd = () => {
    setAdd(true);
    setValue('name' , '')
    setValue('MobNum' , '')
    setValue('city' , '')
    setValue('address' , '')
    setValue('country' , '')
    setValue('email' , '')
    setValue('postalCode' , '')
    setValue('city' , '')
    setValue('state' , '')
  };
  const executeEdit = (AddressData)=>{
    const newUser = { ...user, Addresses: [...user.Addresses] };
    newUser.Addresses.splice(currentIndex, 1 , AddressData);
    dispatch(UpdateUserAsync(newUser));
    alert.success("Address Updated Successfully")
    setcurrentIndex(-1)
  }
  const handleEdit = (index) => {
    setcurrentIndex(index);
    const address = user.Addresses[index]
    setValue('name' , address.name)
    setValue('MobNum' , address.MobNum)
    setValue('city' , address.city)
    setValue('address' , address.address)
    setValue('country' , address.country)
    setValue('email' , address.email)
    setValue('postalCode' , address.postalCode)
    setValue('city' , address.city)
    setValue('state' , address.state)
  };
  const handleCancel = () => {
    setcurrentIndex(-1);
    setAdd(false);
  };
  const handleDelete = (index) => {
    console.log(index);
    const newUser = { ...user, Addresses: [...user.Addresses] };
    newUser.Addresses.splice(index, 1);
    dispatch(UpdateUserAsync(newUser));
  };
  return (
    <div>
      <h1 className="text-2xl text-center">Your Profile</h1>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white m-5 py-2">
        <h2 className="text-weight-500 text-3xl font-serif">
          Your Name : {user.name ? user.name : "Guest User"}
        </h2>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900 my-2">
            <p>Email : {user.email}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900 my-2">
            <p>Password : {user.password}</p>
          </div>
          {user.role==='admin' && <div className="flex justify-between text-base font-medium text-gray-900 my-2">
            <p>Role : {user.role}</p>
          </div>}
          <div className="flex text-base font-medium text-gray-900 my-2">
            <p>Your Addresses :</p>
          </div>
          <div className="flex-col">
            {user.Addresses.map((address, index) => (
              <div className="flex items-center gap-x-3 border-solid border-2 p-2 border-grey m-2">
                {(currentIndex===index) ? 
                <form className='px-10' onSubmit={handleSubmit((AddressData)=>{
                    console.log(AddressData)
                    executeEdit(AddressData)
                  })}>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  {...register("name") }
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Mobile Number :
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="MobNum"
                  id="MobNum"
                  {...register("MobNum") }
                  autoComplete="tel-local"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  {...register("email") }
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  {...register("country") }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>India</option>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Society address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="address"
                  id="address"
                  {...register("address") }
                  autoComplete="address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  {...register("city") }
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="region"
                  id="region"
                  {...register("state") }
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  {...register("postalCode") }
                  autoComplete="postal_code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
          <button className="rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-3" onClick={()=>handleCancel()}>Cancel</button>
        <button type="reset" className="text-sm font-semibold leading-6 text-gray-900">
          Reset
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
        </div>
                </form> : 
                <div>
                  <div>
                    <label
                      htmlFor="block Cash-on-delivery"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      {address.name}
                    </label>
                    <p>
                      {address.address} {address.city} {address.State}{" "}
                      {address.Country} {address.Zipcode} {address.MobNum}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      className="rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-3"
                      onClick={() => handleEdit(index)}
                    >
                      Edit Address
                    </button>
                    <Modal
                            title={`Delete ${address.name}`}
                            message="Are you sure you want to delete this Address ?"
                            dangerOption="Delete"
                            cancelOption="Cancel"
                            dangerAction={(e) => handleDelete(index)}
                            cancelAction={()=>setOpenModal(null)}
                            showModal={openModal === index}
                          ></Modal>
                    <button
                      className="rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  my-3"
                      onClick={() => setOpenModal(index)}
                    >
                      Delete Address
                    </button>
                  </div>
                </div>}
              </div>
            ))}
          </div>

          {Add && (
            <form
              className="px-10"
              onSubmit={handleSubmit((AddressData) => {
                console.log(AddressData);
                dispatch(
                  UpdateUserAsync({
                    ...user,
                    Addresses: [...user.Addresses, AddressData],
                  })
                );
                alert.success("New Address Added!")
                setAdd(false);
              })}
            >
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      {...register("name")}
                      autoComplete="name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Mobile Number :
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="MobNum"
                      id="MobNum"
                      {...register("MobNum")}
                      autoComplete="tel-local"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      {...register("email")}
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      {...register("country")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>India</option>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Society address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      {...register("address")}
                      autoComplete="address"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      {...register("city")}
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="region"
                      id="region"
                      {...register("state") }
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="postalCode"
                      id="postalCode"
                      {...register("postalCode")}
                      autoComplete="postal_code"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  className="rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-3"
                  onClick={() => handleCancel()}
                >
                  Cancel
                </button>
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
            </form>
          )}
          <button
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-[90%] my-3"
            onClick={() => handleAdd()}
          >
            Add Address
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
