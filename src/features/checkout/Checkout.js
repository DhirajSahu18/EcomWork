import React, { useEffect, useState }  from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItemAsync, deleteUserItemAsync, fetchCardbyUserIDAsync, selectCartItems, selectUserItems, updateItemAsync } from '../Cart/CartSlice';
import { UpdateUserAsync, selectUser } from '../Auth/AuthSlice';
import { useForm } from "react-hook-form"
import { createOrderAsync, selectCurrentOrder } from '../Orders/OrdersSlice';


function Checkout() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const products = useSelector(selectUserItems)
  const [addressorder , setaddressorder ] = useState(null)
  const [payment , setpayment] = useState(null)
  const currentOrder = useSelector(selectCurrentOrder)
  const userId = user.id;

  const totalAmount = products.reduce((amount, item) => {
    const itemTotal = item.price * item.quantity;
    return amount + itemTotal;
  }, 0);

  useEffect(()=>{
    dispatch(fetchCardbyUserIDAsync(user.id))
  },[dispatch])

  const handleRemove = (id) =>{
    console.log(id)
    dispatch(deleteItemAsync(id))
    dispatch(fetchCardbyUserIDAsync(user.id))
  }
  
  useEffect(()=>{
    console.log(addressorder)
    console.log(payment)
  },[addressorder , payment])
  
  const handlequantity = (e , product) => {
    console.log({ ...product, quantity: +e.target.value })
    dispatch(updateItemAsync({ ...product, quantity: +e.target.value }));
    dispatch(fetchCardbyUserIDAsync(user.id))
  };
  
  const handleCheckout=()=>{
    dispatch(createOrderAsync({products : products ,user : user.id, address : addressorder , totalAmount ,paymentMethod : payment , status : 'Processing'}))
  }

  return (
    <>
    {currentOrder.id && <Navigate to={`/orderSuccess/${currentOrder.id}`} ></Navigate>}
    {!products.length>0 && <Navigate to={`/`} ></Navigate>}
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className='lg:col-span-3 bg-white p-3 mt-5'>
    <form onSubmit={handleSubmit((AddressData)=>{
            console.log(AddressData)
            dispatch(UpdateUserAsync({...user , Addresses : [ ...user.Addresses ,AddressData] }))
          })}>
      <div className="space-y-12">
    <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive Delivery.</p>

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
        </div>
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 space-y-10">
          <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Address</legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">Choose from previous addresses</p>
              <div className="mt-6 space-y-6">
                {user.Addresses.map((address)=>(
                    <div className="flex items-center gap-x-3 border-solid border-2 p-2 border-grey">
                    <input
                      id={address.email}
                      name="address"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      onClick={()=>setaddressorder(address)}
                    />
                    <div>
                    <label htmlFor="block Cash-on-delivery" className="block text-sm font-medium leading-6 text-gray-900">
                    {address.name} 
                    </label>
                    <p>{address.address} {address.city} {address.State} {address.Country} {address.Zipcode} {address.MobNum}</p>
                    </div>
                  </div>
                ))
                }
                
              </div>
            </fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Method</legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">Choose your preffered payment Method</p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="CashOnDelivery"
                    name="paymentMethod"
                    type="radio"
                    onClick={()=>setpayment("cashOnDelivery")}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="Cash-on-delivery" className="block text-sm font-medium leading-6 text-gray-900">
                  Cash-on-delivery
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="card"
                    name="paymentMethod"
                    type="radio"
                    onClick={()=>setpayment("Card")}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                    Card
                  </label>
                </div>
              </div>
          </div>
        </div>
      </div>

      
    </form>
    </div>
    <div className=" max-w-7xl sm:px-6 lg:px-8 bg-white m-5 lg:col-span-2 p-3">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Order Summary</h2>
    <div className="mt-8">
    <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {products.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.thumbnail}
                                    alt={product.description}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <Link to={product.href}>{product.title}</Link>
                                      </h3>
                                      <p className="ml-4">$ {product.price}</p>
                                    </div>
                                    {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="flex">
                                    <p className="text-gray-500 mr-2">Qty</p>
                                    <select onChange={(e)=>handlequantity(e , product)}>
                                      <option value={product.quantity}>{product.quantity}</option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                    </select>
                                    </div>
                                    

                                    <div className="flex">
                                      <button
                                        type="button"
                                        onClick={()=>handleRemove(product.id)}
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${totalAmount}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6" onClick={()=>handleCheckout()}>
                        <div
                          className="flex items-center justify-center rounded-md border border-transparent cursor-pointer bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Pay and checkout
                        </div>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <Link to="/">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                          </Link>
                        </p>
                      </div>
                    </div>
    </div>
    </div>
    </>
  )
}

export default Checkout
