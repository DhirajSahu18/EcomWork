import React, { useState , useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link , Navigate} from 'react-router-dom';
import { selectUser } from '../Auth/AuthSlice';
import { deleteItemAsync, fetchCardbyUserIDAsync, selectCartItems, selectUserItems, updateItemAsync } from './CartSlice';



export default function Cart() {
  
  const [open, setOpen] = useState(true)
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const products = useSelector(selectUserItems)

  useEffect(()=>{
    dispatch(fetchCardbyUserIDAsync(user.id))
  },[dispatch])
  
  const totalAmount = products.reduce((amount, item) => {
    const itemTotal = item.price * item.quantity;
    return amount + itemTotal;
  }, 0);
  
  const handleRemove = (id) =>{
    console.log(id)
    const productId =id;
    dispatch(deleteItemAsync(productId))
    dispatch(fetchCardbyUserIDAsync(user.id))
  }
  
  const handlequantity = (e , product) => {
    console.log({ ...product, quantity: +e.target.value })
    dispatch(updateItemAsync({ ...product, quantity: +e.target.value }));
    dispatch(fetchCardbyUserIDAsync(user.id))
  };

  return (
    <>
    {!products.length>0 && <Navigate to={`/`} ></Navigate>}
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white m-5">
      <h2 className="text-center underline text-3xl font-serif">Cart</h2>
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
                                      <div className="flex flex-col">
                                      <div className="flex">
                                      <p className="ml-4">Price per piece</p>
                                      <p className="ml-4">$ {product.price}</p>
                                      </div>
                                      <div className="flex">
                                      <p className="ml-4">Price Overall</p>
                                      <p className="ml-4">$ {product.price * product.quantity}</p>
                                      </div>
                                      </div>
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
                      <div className="mt-6">
                        <Link
                          to="/checkout"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <Link to="/">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                          </Link>
                        </p>
                      </div>
                    </div>
    </div>
    </>
  );
}
