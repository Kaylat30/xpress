import { IoSearchSharp,} from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-router-dom"
import { AppDispatch } from "../store";
import { useEffect, useState } from "react";
import { approvePackItemAsync, getPackItemsAsync, selectPackItems } from "../slice/packSlice";

interface PackItem {
  DriverId?: string;
    itemId: string;
    item: string;
    pickup: string;
    dropoff: string;
    status: string;
}


export default function DashboardDriver() {

  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  //const status = useSelector(selectStatus)

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getPackItemsAsync());
  }, [dispatch]);

  const packs = useSelector(selectPackItems) as PackItem[]; 


  const handleApprovePack = (itemId: string) => {
    dispatch(approvePackItemAsync(itemId));
  }

  const filteredPacks = Array.isArray(packs) ? packs.filter((packs: PackItem) => {
    if (!filter || !search) return true;
    return packs[filter as keyof PackItem]?.toLowerCase().includes(search.toLowerCase());
  }) : [];



  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500";
      case "pending":
        return "bg-red-500";
      case "shipped":
        return "bg-yellow-300";
      default:
        return "bg-gray-200";
    }
  };


  return (
    <div>
      {/* search section */}
      <div>
        
        <div className="flex items-center justify-center">
            <div>Search by: </div>
            <Form className="relative z-0">
              <select
              onChange={(e) => setFilter(e.target.value)}
                name="cat"
                className="shadow-xl w-20 md:w-40 rounded-md m-2 p-2 z-0"
              >
                <option value="">Select</option>
                <option value="itemId">Item Id</option>
                <option value="item">Name</option>
                <option value="pickup">Pick up</option>
                <option value="dropoff">Drop off</option>
                <option value="status">Status</option>
                <option value="driverId">Driver id</option>
              </select>
              <input type="text" name="" placeholder="search" className="bg-gray-200 rounded-2xl p-1 pl-3 w-28 sm:w-auto text-xl" onChange={(e) => setSearch(e.target.value)} />
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
                        {filteredPacks.map((item) => (
                            <tr key={item.itemId} className="flex w-full mb-4">
                            <td className="p-4 w-1/4 border-b">{item.itemId}</td>
                            <td className="p-4 w-1/4 border-b">{item.item}</td>
                            <td className="p-4 w-1/4 border-b">{item.pickup}</td>
                            <td className="p-4 w-1/4 border-b">{item.dropoff}</td>  
                            <td className="p-4 w-1/4 border-b"><span className={`${getStatusColor(item.status)} text-white p-1 rounded-md`}>{item.status}</span></td> 
                            <td className="p-4 w-1/4 border-b">{item.DriverId}</td>                       
                            <td className="p-4 w-1/4 border-b">
                              <div className="flex space-x-2">
                                <button type="button" onClick={() => handleApprovePack(item.itemId)} className="bg-green-500 text-white p-2 rounded-lg">APPROVE</button>
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

        

        
        
      </div>
    </div>
  )
}


