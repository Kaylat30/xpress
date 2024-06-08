import {  IoCloseSharp, IoEyeSharp, IoPencilSharp, IoSearchSharp, IoTrashBinSharp } from "react-icons/io5"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { deleteDeliveryItemAsync, getDeliveryInfoAsync, getDeliveryItemsAsync, selectDeliveryById, selectDeliveryItems, updateDeliveryItemAsync } from "../slice/deliverySlice";


interface DeliveryItem {
  itemId: string;
  item: string;
  status: string;
  driverId: string;
  cashierIn: string;
  cashierOut: string;
  clientId: string;
}
export default function Deliveries() {

  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [newDelivery, setNewDelivery] = useState<DeliveryItem>({ itemId: "", item: "", cashierOut: "", cashierIn: "", driverId: "",clientId:"",status: ""});
  const [editDelivery, setEditDelivery] = useState<DeliveryItem>({ itemId: "", item: "", cashierOut: "", cashierIn: "", driverId: "",clientId:"",status: "" });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500";
      case "return":
        return "bg-red-500";
      case "pending":
        return "bg-yellow-300";
      default:
        return "bg-gray-200";
    }
  };


  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getDeliveryItemsAsync());
  }, [dispatch]);

  const fetchDeliverys = () => {
    dispatch(getDeliveryItemsAsync());
  };

  const deliveries = useSelector(selectDeliveryItems) as DeliveryItem[]; 
  const delivery = useSelector((state: RootState) => selectedDeliveryId ? selectDeliveryById(selectedDeliveryId)(state) : undefined);



  const handleViewDelivery = (itemId: string) => {
    dispatch(getDeliveryInfoAsync(itemId));
    setSelectedDeliveryId(itemId);
    setViewModal(true);
  };

  const handleEditDelivery = (itemId: string) => {
    dispatch(getDeliveryInfoAsync(itemId));
    setSelectedDeliveryId(itemId);
    if (delivery) {
      setEditDelivery(delivery);
      setEditModal(true);
    }
    
  };

  const handleSaveEditedDelivery = () => {
    dispatch(updateDeliveryItemAsync(editDelivery));
    setEditDelivery({ itemId: "", item: "", cashierOut: "", cashierIn: "", driverId: "",clientId:"",status: "" });
    setEditModal(false);
    fetchDeliverys();
  };

  const handleDeleteDelivery = (itemId: string) => {
    setSelectedDeliveryId(itemId);
    setDeleteModal(true);
  };

  const confirmDeleteDelivery = (itemId: string) => {
    dispatch(deleteDeliveryItemAsync(itemId));
    setDeleteModal(false);
    fetchDeliverys();
  };

  const handleAddDelivery = () => {
    //dispatch(addDeliveryAsync(newDelivery));
    setAddModal(false);
    fetchDeliverys();
    setNewDelivery({ itemId: "", item: "", cashierOut: "", cashierIn: "", driverId: "",clientId:"",status: "" });
  };

  const filteredDeliverys = Array.isArray(deliveries) ? deliveries.filter((deliveries: DeliveryItem) => {
    if (!filter || !search) return true;
    return deliveries[filter as keyof DeliveryItem]?.toLowerCase().includes(search.toLowerCase());
  }) : [];


  return (
    <div>
     
      <div>
         {/* search section */}
        <div className="flex items-center justify-center">
            <div>Search by: </div>
            <div className="relative z-0" >
              <select
                name="cat"
                className="shadow-xl w-20 md:w-40 rounded-md m-2 p-2 z-0"
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">Select</option>
                <option value="id">Id</option>
                <option value="name">Name</option>
                <option value="branch">Branch</option>
                <option value="role">Role</option>
              </select>
              <input type="text" name="" placeholder="search" className="bg-gray-200 rounded-2xl p-1 pl-3 w-28 sm:w-auto text-xl" onChange={(e) => setSearch(e.target.value)} />
              <button className="absolute z-0 top-4 right-3 text-xl"> <IoSearchSharp/></button>              
            </div>
            
        </div>

        <div className="bg-white shadow-xl rounded-md w-auto mx-2 flex flex-col justify-center">
                <div className="flex justify-between p-2">
                    <h1 className="text-brightBlue sm:text-2xl text-lg">All Deliveries</h1>
                    {/* <button type="button" onClick={() => setaddModal(true)} className="bg-brightBlue text-white rounded-md sm:p-2 px-1 flex items-center"><span className="text-2xl text-white"><IoAddSharp/></span> Add Staff</button> */}
                </div>
                <div className="overflow-x-auto">
                <table className="text-left w-full">
                  <thead className="flex w-full">
                    <tr className="flex w-full mb-4">
                      <th className="p-4 w-1/4">Id</th>
                      <th className="p-4 w-1/4">Item</th>
                      <th className="p-4 w-1/4">Driver</th>
                      <th className="p-4 w-1/4">Status</th>
                      <th className="p-4 w-1/4">Client</th>
                      <th className="p-4 w-1/4">CashierIn</th>
                      <th className="p-4 w-1/4">CashierOut</th>
                      <th className="p-4 w-1/4"></th>
                    </tr>
                  </thead>
                        <tbody className="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full h-96" >
                        {filteredDeliverys.map((item:DeliveryItem) => (
                            <tr key={item.itemId} className="flex w-full mb-4">
                            <td className="p-4 w-1/4 border-b">{item.item}</td>
                            <td className="p-4 w-1/4 border-b">${item.driverId}</td>
                            <td className="p-4 w-1/4 border-b"><span className={`${getStatusColor(item.status)} text-white p-1 rounded-md`}>{item.status}</span></td>
                            <td className="p-4 w-1/4 border-b">{item.clientId}</td>
                            <td className="p-4 w-1/4 border-b">{item.cashierIn}</td>
                            <td className="p-4 w-1/4 border-b">{item.cashierOut}</td>
                            {/* <td className="p-4 w-1/4 border-b">jnjgnejfg@gnfj.com</td> */}
                            <td className="p-4 w-1/4 border-b">
                            <div className="flex space-x-2">
                              <button type="button" onClick={() => handleViewDelivery(item.itemId)} className="text-blue-700"><IoEyeSharp /></button>
                              <button type="button" onClick={() => handleEditDelivery(item.itemId)} className="text-green-500"><IoPencilSharp /></button>
                              <button type="button" onClick={() => handleDeleteDelivery(item.itemId)} className="text-red-600"><IoTrashBinSharp /></button>
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
                    Add Deliveries
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setAddModal(false)
                       fetchDeliverys()}}
                  >
                  <span className="text-red-600"><IoCloseSharp/></span>
                  </button>
                </div>
                {/*body*/}
                <div className="my-2 mx-2 sm:grid sm:grid-cols-2 sm:grid-rows-3">
                  
                  <div className="flex items-center space-x-1">
                    <h1>Item:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="text" value={newDelivery.item} onChange={(e) => setNewDelivery({ ...newDelivery, item: e.target.value })} placeholder="Name" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Status:</h1>
                    <select
                      name="cat"
                      className="shadow-xl w-20 md:w-40 rounded-md m-2 p-2 z-0"
                      onChange={(e) => setNewDelivery({ ...newDelivery, status: e.target.value })}
                    >
                      <option value="">Select</option>
                      <option value="delivered">Delivered</option>
                      <option value="return">Return</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>DriverId:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="text" placeholder="Name" value={newDelivery.driverId} onChange={(e) => setNewDelivery({ ...newDelivery, driverId: e.target.value })} />
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Client:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="text" placeholder="address" value={newDelivery.clientId} onChange={(e) => setNewDelivery({ ...newDelivery, clientId: e.target.value })}/>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>CashierIn:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="text" placeholder="address" value={newDelivery.cashierIn} onChange={(e) => setNewDelivery({ ...newDelivery, cashierIn: e.target.value })}/>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>CashierOut:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="tel" placeholder="Cashier Out" value={newDelivery.cashierOut} onChange={(e) => setNewDelivery({ ...newDelivery, cashierOut: e.target.value })}/>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setAddModal(false)
                       fetchDeliverys()}}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleAddDelivery}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-90 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {editModal && delivery ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Edit Deliveries
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setEditModal(false)
                       fetchDeliverys()}}
                  >
                  <span className="text-red-600"><IoCloseSharp/></span>
                  </button>
                </div>
                {/*body*/}
                <div className="my-2 mx-2 sm:grid sm:grid-cols-2 sm:grid-rows-3">
                  
                  <div className="flex items-center space-x-1">
                    <h1>Item:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="text" value={newDelivery.item} onChange={(e) => setNewDelivery({ ...newDelivery, item: e.target.value })} placeholder="Name" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Status:</h1>
                    <select
                      name="cat"
                      className="shadow-xl w-20 md:w-40 rounded-md m-2 p-2 z-0"
                      onChange={(e) => setNewDelivery({ ...newDelivery, status: e.target.value })}
                    >
                      <option value="">Select</option>
                      <option value="delivered">Delivered</option>
                      <option value="return">Return</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>DriverId:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="text" placeholder="Name" value={newDelivery.driverId} onChange={(e) => setNewDelivery({ ...newDelivery, driverId: e.target.value })} />
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Client:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="text" placeholder="address" value={newDelivery.clientId} onChange={(e) => setNewDelivery({ ...newDelivery, clientId: e.target.value })}/>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>CashierIn:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="text" placeholder="address" value={newDelivery.cashierIn} onChange={(e) => setNewDelivery({ ...newDelivery, cashierIn: e.target.value })}/>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>CashierOut:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="tel" placeholder="Cashier Out" value={newDelivery.cashierOut} onChange={(e) => setNewDelivery({ ...newDelivery, cashierOut: e.target.value })}/>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setEditModal(false)
                       fetchDeliverys()}}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSaveEditedDelivery}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-90 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {viewModal && delivery ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    View Delivery
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setViewModal(false)
                       fetchDeliverys()}}
                  >
                  <span className="text-red-600"><IoCloseSharp/></span>
                  </button>
                </div>
                {/*body*/}
                <div className="my-2 mx-2 sm:grid sm:grid-cols-2 sm:grid-rows-4">
                <div className="flex items-center space-x-1">
                    <h1>ItemId:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1" >{delivery.itemId}</h1>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Item:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1" >{delivery.item}</h1>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Status:</h1>
                    <h1>{delivery.status}</h1>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>DriverId:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1" >{delivery.driverId}</h1>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Client:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1" >{delivery.clientId}</h1>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>CashierIn:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1" >{delivery.cashierIn}</h1>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>CashierOut:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1" >{delivery.cashierOut}</h1>
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
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Delete Client</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => {
                        setDeleteModal(false)
                        fetchDeliverys()}}
                    >
                      <span className="text-red-600"><IoCloseSharp /></span>
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                      Are you sure you want to delete this Delivery?
                    </p>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setDeleteModal(false)
                        fetchDeliverys()}}
                    >
                      No
                    </button>
                    <button
                      className="bg-brightBlue text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => confirmDeleteDelivery(selectedDeliveryId!)}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
      ) : null}
        
      </div>
    </div>
  )
}
