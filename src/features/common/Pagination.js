import React from 'react'
import { ITEMS_PER_PAGE } from '../../app/const'
import { ChevronLeftIcon , ChevronRightIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

export default function Pagination({page , totalItems , handlePage }) {
  return (
    <>
    {/* section of product and filters ends */}
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
    <div className="flex flex-1 justify-between sm:hidden">
      <Link
        to="#"
        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Previous
      </Link>
      <Link
        to="#"
        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Next
      </Link>
    </div>
    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{(page-1)*ITEMS_PER_PAGE+1}</span> to{' '}
          <span className="font-medium">{(page*ITEMS_PER_PAGE)<totalItems ? (page*ITEMS_PER_PAGE) : totalItems}</span> of{' '}
          <span className="font-medium">{totalItems}</span> results
        </p>
      </div>
      <div>
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <div
            onClick={() => page > 1 ? handlePage(page - 1) : handlePage(page)}
            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0 ${page===1? "bg-gray-200" : "bg-white hover:bg-gray-50 cursor-pointer"}`}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </div>
          {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
          {Array.from({ length: Math.ceil(totalItems / ITEMS_PER_PAGE) }).map(
          (el, index) => (
            <div
              key={index}
              onClick={(e) => handlePage(index + 1)}
              className={`relative z-10 inline-flex items-center ${(index+1)===page?"bg-indigo-600 text-white": "text-gray-400 bg-white"} px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer`}
            >
              {index + 1}
            </div>
          )
        )}

          <div
            onClick={() => page < (Math.ceil(totalItems / ITEMS_PER_PAGE)) ? handlePage(page + 1) : handlePage(page)}
            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0 ${(page)===(Math.ceil(totalItems / ITEMS_PER_PAGE))? "bg-gray-200" : "bg-white hover:bg-gray-50 cursor-pointer"}`}
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </div>
        </nav>
      </div>
    </div>
  </div></>
  )
}
