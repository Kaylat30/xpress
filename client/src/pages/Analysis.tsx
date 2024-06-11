import { IoAnalytics, IoArrowUpSharp,IoArrowDownSharp, IoWalletSharp, IoCashSharp } from "react-icons/io5";
import { useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import {  getDeliveryItemsAsync, selectDeliveryItems, } from "../slice/deliverySlice";
import { getClientsAsync, } from "../slice/clientSlice";
import { getStaffAsync, } from "../slice/staffSlice";
import { Link } from "react-router-dom";


export default function Analysis() {

  interface RootState {
    active: {
      isActive: boolean;
    };
}
  const board =[
    {
      name:"Orders",
      num:201,
      icon:<IoAnalytics/>,
      rate:0.2
    },
    {
      name:"Pending",
      num:50,
      icon:<IoAnalytics/>,
      rate:0.2
    },
    {
      name:"Returned",
      num:2,
      icon:<IoAnalytics/>,
      rate:-0.2
    },
    {
      name:"Shipped",
      num:23,
      icon:<IoAnalytics/>,
      rate:0.2
    },
  ]

  const getRateColor = (rate: number) => {
    if (rate > 0) {
      return "text-green-500";
    } else if (rate < 0) {
      return "text-red-500";
    } else {
      return "text-gray-200";
    }
  };
  const {isActive} = useSelector((store:RootState)=>store.active)



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

  const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
      dispatch(getDeliveryItemsAsync());
      dispatch(getClientsAsync())
      dispatch(getStaffAsync())
    }, [dispatch]);

    //const clients = useSelector(selectClients)
    //const staffs = useSelector(selectStaffs)
    const deliveries = useSelector(selectDeliveryItems)
  
  return (
    <div>
      

      <div className="grid sm:grid-cols-1 sm:grid-rows-2 md:flex">
        <div className="grid grid-cols-2 grid-rows-2 w-auto h-auto sm:h-64">
          {board.map((board,index)=>(
            <div key={index} className="mx-1 my-1  sm:w-40 md:w-52 h-28 bg-white shadow-xl rounded-lg p-3">
            <div className="flex  justify-between">
              <h3 className="font-semibold">{board.name}</h3>
              {board.icon}
            </div>
            <h3 className="text-3xl font-bold">{board.num}</h3>
            <div className="flex items-center text-xs space-x-1">
              <span className={`flex items-center ${getRateColor(board.rate)}`}>{board.rate > 0 ? <IoArrowUpSharp/> : board.rate < 0 ? <IoArrowDownSharp/> : null} {Math.abs(board.rate)}% </span> <span className="text-xs text-lightGray">from last month </span>
            </div>
          </div>
          ))}
          
        </div>
        <div className="grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1  w-auto ">
          <div className={`h-64 bg-white shadow-xl ${isActive?"md:w-60 sm:w-44":"md:w-60 "} mx-2 rounded-xl p-5 transition-all duration-500 ease-in-out`}>
            <h1 className="font-semibold">Users</h1>
            <div>
              <h3 className="text-3xl font-bold">4890</h3>
              <span className="text-xs text-lightGray">from this month</span>
            </div>
          </div>
          <div className={`h-64 bg-white shadow-xl ${isActive?"md:w-60 sm:w-44":"md:w-60"} mx-2 rounded-xl p-5 transition-all duration-500 ease-in-out`}>
            <h1 className="font-semibold">Users</h1>
            <div>
              <h3 className="text-3xl font-bold">4890</h3>
              <span className="text-xs text-lightGray">from this month</span>
            </div>
          </div>
        </div>
      </div>

      <div className="m-2 md:flex grid grid-cols-1 grid-rows-2"> 
              
        <div className="flex-grow mx-1">
          <div className="my-2">
            <div className="flex justify-between h-72 p-5 bg-white shadow-xl rounded-xl">
              <h2 className="font-semibold">Deliveries dynamics</h2>
              <h2 className="rounded-xl"><input className="w-14 bg-gray-100 rounded-lg p-1" type="number" value="2024" /></h2>
            </div>
          </div>
          <div className="my-2">
            <div className="flex justify-between h-72 p-5 bg-white shadow-xl rounded-xl">
              <h2 className="font-semibold">Deliveries dynamics</h2>
              <h2 className="rounded-xl"><input className="w-14 bg-gray-100 rounded-lg p-1" type="number" value="2024" /></h2>
            </div>
          </div>
        </div>
        <div >
          <div className="flex my-2">
            <div className="md:w-48 mx-1 bg-white rounded-xl shadow-xl p-5 h-36">
              <div className="flex justify-between mb-4 ">
                <span className="text-2xl"><IoWalletSharp/></span>
                <span className="text-2xl"><IoCashSharp/></span>
              </div>
              <div>
                <h2 className="text-lightGray">Paid Invoices</h2>
                <h3 className="text-2xl font-bold">$23432.23</h3>
                <h4 className="text-lightGray text-xs">Current selected month</h4>
              </div>
            </div>
            <div className="md:w-48 mx-1 bg-white rounded-xl shadow-xl p-5 h-36">
              <div className="flex justify-between mb-4 ">
                <span className="text-2xl"><IoWalletSharp/></span>
                <span className="text-2xl"><IoCashSharp/></span>
              </div>
              <div>
                <h2 className="text-lightGray">Paid Invoices</h2>
                <h3 className="text-2xl font-bold">$23432.23</h3>
                <h4 className="text-lightGray text-xs">Current selected month</h4>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-xl rounded-md w-auto mx-2 flex-grow">
                  <div className="flex justify-between p-2">
                      <h1 className="text-brightBlue sm:text-2xl text-lg">Recent Orders</h1>
                      <Link to="deliveries" className="bg-brightBlue text-white rounded-md sm:p-2 px-1">View All</Link>
                  </div>
                  <div className="overflow-x-auto">
                      <table className="min-w-full bg-white">
                          <thead>
                          <tr>
                              <th className="py-2 px-4">Name</th>
                              <th className="py-2 px-4">Item Id</th>
                              <th className="py-2 px-4">Item</th>
                              <th className="py-2 px-4">Client Id</th>
                              <th className="py-2 px-4">Cashier Out</th>
                              <th className="py-2 px-4">Status</th>
                          </tr>
                          </thead>
                          <tbody >
                          {Array.isArray(deliveries) &&
                              deliveries.slice(-10).map((item) => (
                              <tr key={item.itemId} className="my-2">
                              <td className="py-4 px-4 border-b">{item.itemId}</td>    
                              <td className="py-4 px-4 border-b">{item.item}</td>
                              <td className="py-4 px-4 border-b">{item.clientId}</td>
                              <td className="py-4 px-4 border-b">{item.cashierOut}</td>
                              <td className="py-4 px-4 border-b"><span className={`${getStatusColor(item.status)} text-white p-1 rounded-md`}>{item.status}</span></td>
                              </tr>
                          ))}
                          </tbody>
                      </table>
                  </div>
          </div>
        </div>    
      </div>
      
    </div>
  )
}
