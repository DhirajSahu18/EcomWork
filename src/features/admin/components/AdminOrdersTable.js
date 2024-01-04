import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateOrderAsync, fetchAllOrdersAsync, selectAllOrders, selectOrderTotalNUm } from "../../Orders/OrdersSlice";
import Pagination from "../../common/Pagination";
import { ITEMS_PER_PAGE } from "../../../app/const";
import { ArrowDownIcon , ArrowUpIcon } from "@heroicons/react/24/outline";
function AdminOrdersTable() {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  const [sort, setsort] = useState({});
  const [page , setpage] = useState(1);
  const [editOrderId , seteditOrderId] = useState(-1)
  const totalItems = useSelector(selectOrderTotalNUm)
  const [sortOrder , setsortOrder] = useState('asc');
  const [AmountSortOrder , setAmountSortOrder] = useState('asc');
  
  const handlePage = (pagenum) => {
    setpage(pagenum)
  };

  const handleEdit = (statusUpdate , order)=>{
    const newOrder = {...order , status : statusUpdate}
    dispatch(UpdateOrderAsync(newOrder))
    seteditOrderId(-1)
  }
  
  const ChooseColor = (order) => {
    switch (order.status) {
      case 'Processing':
        return 'text-gray-500  bg-gray-100/60'
      case 'Dispatched':
        return 'text-gray-500  bg-orange-100/50'
      case 'Delivered':
        return ' text-emerald-500 bg-emerald-100/60'  
      case 'Cancelled':
        return ' text-red-500 bg-red-100/60'
      default:
        return 'text-gray-500  bg-gray-100/60'
    }
  }

  const handleSort =(e , sortItem)=>{
    let newSort = null
    if (sortItem==='id') {
      sortOrder==='asc' ? setsortOrder('desc') : setsortOrder('asc');
      newSort = {_sort: sortItem , _order: sortOrder } 
    }
    else{
      AmountSortOrder==='asc' ? setAmountSortOrder('desc') : setAmountSortOrder('asc')
      newSort = {_sort: sortItem , _order: AmountSortOrder } 
    }
    setsort(newSort);
  }

  useEffect(() => {
    const pagination = { _page: page , _limit : ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({sort , pagination }));
  }, [dispatch , sort , page]);

  useEffect(()=>{
    setpage(1)
  },[sort])

  return (
    <>
      {/* component */}
      <section className="container px-4 mx-auto">
        <div className="flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        onClick={(e)=>handleSort(e , "id")}
                      >
                        <div className="flex items-center gap-x-3">
                          {/* <input
                        type="checkbox"
                        className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                      /> */}
                          <button className="flex items-center gap-x-2">
                            <span>Order Id</span>
                            {sortOrder==='asc' ? (<ArrowUpIcon/>) : (<ArrowDownIcon/>)}
                          </button>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 cursor-pointer"
                        onClick={(e)=>handleSort(e , "totalAmount")}
                      >
                        Total Amount
                        {AmountSortOrder==='asc' ? (<ArrowUpIcon className="w-4 h-4 inline-block"/>) : (<ArrowDownIcon className="w-4 h-4 inline-block"/>)}
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Customer
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Shipping Address
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {orders.map((order) => (
                      <tr>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <span># {order.id}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          $ {order.totalAmount}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            {!(editOrderId===order.id) ? (
                          <div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${ChooseColor(order)} dark:bg-gray-800`}>
                            <svg
                              width={12}
                              height={12}
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 3L4.5 8.5L2 6"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>

                            <h2 className="text-sm font-normal">{order.status}</h2>
                          </div>
                            ) : (<select onChange={(e)=>{handleEdit(e.target.value , order)}}>
                              <option value={order.status}>{order.status}</option>
                              <option value="Dispatched">Dispatched</option>
                              <option value="Processing">Processing</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                              </select>)}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <div className="flex items-center gap-x-2">
                            <img
                              className="object-cover w-8 h-8 rounded-full"
                              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                              alt=""
                            />
                            <div>
                              <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                                {order.address.name}
                              </h2>
                              <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                                {order.address.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {order.address.address} <br /> {order.address.city} ,
                          {order.address.postalCode}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex item-center justify-center">
                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </div>
                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110" onClick={()=>seteditOrderId(order.id)}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </div>
                            <div
                              className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                              onClick={() => console.log("object")}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex items-center justify-between mt-6">
          <a
            href="#"
            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 rtl:-scale-x-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            <span>previous</span>
          </a>
          <div className="items-center hidden md:flex gap-x-3">
            <a
              href="#"
              className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60"
            >
              1
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              2
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              3
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              ...
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              12
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              13
            </a>
            <a
              href="#"
              className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              14
            </a>
          </div>
          <a
            href="#"
            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <span>Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 rtl:-scale-x-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </a>
        </div> */}
        <Pagination page={page} handlePage={handlePage} totalItems={totalItems}/>
      </section>
    </>
  );
}

export default AdminOrdersTable;

function Cancel() {
  return (
    <div className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
      <svg
        width={12}
        height={12}
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 3L3 9M3 3L9 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h2 className="text-sm font-normal">Cancelled</h2>
    </div>
  );
}

function Refund() {
  return (
    <div className="inline-flex items-center px-3 py-1 text-gray-500  bg-gray-100/60 rounded-full gap-x-2 dark:bg-gray-800">
      <svg
        width={12}
        height={12}
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.5 7L2 4.5M2 4.5L4.5 2M2 4.5H8C8.53043 4.5 9.03914 4.71071"
          stroke="#667085"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h2 className="text-sm font-normal">Refunded</h2>
    </div>
  );
}

function Paid() {
  return (
    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
      <svg
        width={12}
        height={12}
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 3L4.5 8.5L2 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h2 className="text-sm font-normal">Paid</h2>
    </div>
  );
}
