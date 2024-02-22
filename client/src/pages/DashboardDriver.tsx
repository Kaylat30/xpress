import {IoCloseSharp, IoSearchSharp,} from "react-icons/io5"
import { Form } from "react-router-dom"
import { useState } from "react";
export default function DashboardDriver() {

  const [viewModal, setviewModal] = useState(false);
  const [addModal, setaddModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-500";
      case "Return":
        return "bg-red-500";
      case "Pending":
        return "bg-yellow-300";
      default:
        return "bg-gray-200";
    }
  };

  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com',price:1200,payment:"Paid",Status:"Delivered" },
    { id: 2, name: 'John Doe', email: 'john@example.com',price:1200,payment:"Paid",Status:"Pending" },
    { id: 3, name: 'John Doe', email: 'john@example.com',price:1200,payment:"Paid",Status:"Return" },
    { id: 4, name: 'John Doe', email: 'john@example.com',price:1200,payment:"Paid",Status:"Delivered" },
    { id: 5, name: 'John Doe', email: 'john@example.com',price:1200,payment:"Paid",Status:"Delivered" },
    { id: 6, name: 'John Doe', email: 'john@example.com',price:1200,payment:"Paid",Status:"Delivered" },
    { id: 7, name: 'John Doe', email: 'john@example.com',price:1200,payment:"Paid",Status:"Pending" },
    { id: 8, name: 'John Doe', email: 'john@example.com',price:1200,payment:"Paid",Status:"Return" },
    { id: 9, name: 'John Doe', email: 'john@example.com',price:1200,payment:"Paid",Status:"Delivered" },
    { id: 10, name: 'John Doe', email: 'john@example.com',price:1200,payment:"Paid",Status:"Delivered" }
    
  ];


  return (
    <div>
      {/* search section */}
      <div>
        
        <div className="flex items-center justify-center">
            <div>Search by: </div>
            <Form className="relative z-0">
              <select
                name="cat"
                className="shadow-xl w-20 md:w-40 rounded-md m-2 p-2 z-0"
              >
                <option value="">Select</option>
                <option value="id">Id</option>
                <option value="name">Name</option>
                <option value="branch">Branch</option>
                <option value="role">Role</option>
              </select>
              <input type="text" name="" placeholder="search" className="bg-gray-200 rounded-2xl p-1 pl-3 w-28 sm:w-auto text-xl" />
              <button className="absolute z-0 top-4 right-3 text-xl"> <IoSearchSharp/></button>              
            </Form>
            
        </div>

        <div className="bg-white shadow-xl rounded-md w-auto mx-2 flex flex-col justify-center">
                <div className="flex justify-between p-2">
                    <h1 className="text-brightBlue sm:text-2xl text-lg">All Products</h1>
                    {/* <button type="button" onClick={() => setaddModal(true)} className="bg-brightBlue text-white rounded-md sm:p-2 px-1 flex items-center"><span className="text-2xl text-white"><IoAddSharp/></span> Add Staff</button> */}
                </div>
                <div className="overflow-x-auto">
                <table className="text-left w-full">
                  <thead className="flex w-full">
                    <tr className="flex w-full mb-4">
                      <th className="p-4 w-1/4">ItemId</th>
                      <th className="p-4 w-1/4">Item</th>
                      <th className="p-4 w-1/4">PickUp</th>
                      <th className="p-4 w-1/4">DropOff</th>
                      <th className="p-4 w-1/4">Status</th>
                      <th className="p-4 w-1/4">DriverId</th>
                      <th className="p-4 w-1/4"></th>
                    </tr>
                  </thead>
                        <tbody className="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full h-96" >
                        {data.map((item) => (
                            <tr key={item.id} className="flex w-full mb-4">
                            <td className="p-4 w-1/4 border-b">{item.name}</td>
                            <td className="p-4 w-1/4 border-b">${item.price}</td>
                            <td className="p-4 w-1/4 border-b">{item.payment}</td>
                            <td className="p-4 w-1/4 border-b">098778485</td>  
                            <td className="p-4 w-1/4 border-b"><span className={`${getStatusColor(item.Status)} text-white p-1 rounded-md`}>{item.Status}</span></td>                        
                            <td className="p-4 w-1/4 border-b">
                              <div className="flex space-x-2">
                                <button type="button" onClick={() => setviewModal(true)} className="bg-green-500 text-white p-2 rounded-lg">APPROVE</button>
                                {/* <button type="button" onClick={() => setaddModal(true)} className="text-green-500"><IoPencilSharp/></button>
                                <button type="button" onClick={() => setdeleteModal(true)} className="text-red-600">< IoTrashBinSharp/></button> */}
                              </div>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
        </div>

        {addModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add Staff
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setaddModal(false)}
                  >
                  <span className="text-red-600"><IoCloseSharp/></span>
                  </button>
                </div>
                {/*body*/}
                <div className="my-2 mx-2 sm:grid sm:grid-cols-2 sm:grid-rows-4">
                  
                  <div className="flex items-center space-x-1">
                    <h1>Name:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="text" placeholder="Name" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Branch:</h1>
                    <select
                name="cat"
                className="shadow-xl w-20 md:w-40 rounded-md m-2 p-2 z-0"
              >
                <option value="">Select</option>
                <option value="id">Id</option>
                <option value="name">Name</option>
                <option value="branch">Branch</option>
                <option value="role">Role</option>
              </select>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Sex:</h1>
                    <input className="rounded-md p-1 cursor-pointer" type="radio"  name="sex" value="male"  />:Male
                    <input className="rounded-md p-1 cursor-pointer" type="radio" name="sex" value="female" />:Female 
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Role:</h1>
                    <select
                name="cat"
                className="shadow-xl w-20 md:w-40 rounded-md m-2 p-2 z-0"
              >
                <option value="">Select</option>
                <option value="id">Id</option>
                <option value="name">Name</option>
                <option value="branch">Branch</option>
                <option value="role">Role</option>
              </select>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Address:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="text" placeholder="address" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Contact:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="tel" placeholder="tel" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>D.O.B:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="date" placeholder="Name" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Email:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="text" placeholder="Email" />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setaddModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setaddModal(false)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-90 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {viewModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add Staff
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setviewModal(false)}
                  >
                  <span className="text-red-600"><IoCloseSharp/></span>
                  </button>
                </div>
                {/*body*/}
                <div className="my-2 mx-2 sm:grid sm:grid-cols-2 sm:grid-rows-4">
                  
                  <div className="flex items-center space-x-1">
                    <h1>Name:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="text" placeholder="Name" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Branch:</h1>
                    <select
                name="cat"
                className="shadow-xl w-20 md:w-40 rounded-md m-2 p-2 z-0"
              >
                <option value="">Select</option>
                <option value="id">Id</option>
                <option value="name">Name</option>
                <option value="branch">Branch</option>
                <option value="role">Role</option>
              </select>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Sex:</h1>
                    <input className="rounded-md p-1 cursor-pointer" type="radio"  name="sex" value="male"  />:Male
                    <input className="rounded-md p-1 cursor-pointer" type="radio" name="sex" value="female" />:Female 
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Role:</h1>
                    <select
                name="cat"
                className="shadow-xl w-20 md:w-40 rounded-md m-2 p-2 z-0"
              >
                <option value="">Select</option>
                <option value="id">Id</option>
                <option value="name">Name</option>
                <option value="branch">Branch</option>
                <option value="role">Role</option>
              </select>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Address:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="text" placeholder="address" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Contact:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="tel" placeholder="tel" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>D.O.B:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="date" placeholder="Name" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Email:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="text" placeholder="Email" />
                  </div>
                </div>
                {/*footer*/}
                {/* <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setviewModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setviewModal(false)}
                  >
                    Save
                  </button>
                </div> */}
              </div>
            </div>
          </div>
          <div className="opacity-90 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {deleteModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setdeleteModal(false)}
                  >
                    CANCEL
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setdeleteModal(false)}
                  >
                    CONFIRM DELETE
                  </button>
                </div>
            </div>          
          <div className="opacity-90 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
        
      </div>
    </div>
  )
}
