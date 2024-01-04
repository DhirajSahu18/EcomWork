import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { selectUser } from "../Auth/AuthSlice";
import {
  deleteUserItemAsync,
  fetchCardbyUserIDAsync,
  selectCartItems,
  selectUserItems,
  updateItemAsync,
} from "../Cart/CartSlice";
import { fetchUserOrderAsync, selectOrders } from "./OrdersSlice";

export default function Orders() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const orders = useSelector(selectOrders);

  useEffect(() => {
    dispatch(fetchUserOrderAsync(user.id));
  }, [dispatch]);

  return (
    <>
      {orders && (
        <>
          <h2 className="text-center underline text-4xl font-serif">
            My Orders
          </h2>
          {orders.map((order) => (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white m-5 py-2">
              <h2 className="text-weight-500 text-3xl font-serif">
                Order Number : {order.id}
              </h2>
              <div className="mt-8">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {order.products.map((product) => (
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
                                  <p className="ml-4">
                                    $ {product.price * product.quantity}
                                  </p>
                                </div>
                              </div>
                            </div>
                            {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex">
                              <p className="text-gray-500 mr-2">
                                Qty : {product.quantity}
                              </p>
                            </div>

                            <div className="flex"></div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900 my-2">
                  <p>Subtotal</p>
                  <p>${order.totalAmount}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900 my-2">
                  <p>Payment Mode :</p>
                  <p>{order.paymentMethod}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900 my-2">
                  <p>Status :</p>
                  <p className="text-2xl">{order.status}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900 my-2">
                  <p>Mobile Number  :</p>
                  <p>{order.address.MobNum}</p>
                </div>
                <div className="flex text-base font-medium text-gray-900 my-2">
                  <p>Shipped to :</p>
                  <div className="flex items-center gap-x-3 border-solid border-2 p-2 border-grey text-xl">
                    <div>
                      <p>{order.address.name},
                        {order.address.address}{" "} , {order.address.city}{" "} , {order.address.country}{" "} ,
                        {order.address.postalCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
