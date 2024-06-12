import { IoAddSharp, IoCloseSharp, IoEyeSharp, IoPencilSharp, IoSearchSharp, IoTrashBinSharp } from "react-icons/io5"
import { Form } from "react-router-dom"
import { useEffect, useState } from "react";

import { addItemAsync, checkoutItemAsync, getItemAsync, getItemInfoAsync, selectError, selectItemById, selectItems } from "../slice/itemSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { addStagedItemAsync, deleteStagedItemAsync, getStagedItemInfoAsync, getStagedItemsAsync, selectStagedItemById, selectStagedItems, selectStagedItemsError, updateStagedItemAsync } from "../slice/stageSlice";


interface Item {
  itemId: string;
  item: string;
  status: string;
  clientId: string;
  name: string;
  address: string;
  contact: number;
  email: string;
}

interface StagedItem {
  itemId: string;
  item: string;
  status: string;
  clientId: string;
  name: string;
  address: string;
  contact: number;
  email: string;
  user: string;
}

interface Checkout{
  itemId:string,
  price:number
}
export default function DashboardCashier() {

  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [receivedviewModal, setreceivedViewModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedReceivedItemId, setSelectedReceivedItemId] = useState<string | null>(null);
  const [selectedClientItemId, setSelectedClientItemId] = useState<string | null>(null);
  const [selectedStagedItemId, setSelectedStagedItemId] = useState<string| null>(null);
  const [receivedItemId, setReceivedItemId] = useState<string | null>(null);
  const [checkoutItem, setCheckoutItem] = useState<Checkout>({itemId:"",price:0});
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [newStageditem, setNewStageditem] = useState<StagedItem>({ itemId: "",item: "",status: "",clientId: "",name: "",address: "",contact: 0,email: "",user: ""});
  const [editClient, setEditClient] = useState<StagedItem>({ itemId: "",item: "",status: "",clientId: "",name: "",address: "",contact: 0,email: "",user: ""});
  const stageerror = useSelector(selectStagedItemsError)
  const receiveerror = useSelector(selectError)
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getStagedItemsAsync());
    dispatch(getItemAsync());
  }, [dispatch]);

  const fetchItems = () => {
    dispatch(getStagedItemsAsync());
    dispatch(getItemAsync());
  };

  const receivedItems = useSelector(selectItems) as Item[]; 
  const receivedItem = useSelector((state: RootState) => selectedReceivedItemId ? selectItemById(selectedReceivedItemId)(state) : undefined);

  const stagedItems = useSelector(selectStagedItems) as StagedItem[]; 
  const stagedItem = useSelector((state: RootState) => selectedStagedItemId ? selectStagedItemById(selectedStagedItemId)(state) : undefined);



  const handleViewStaged = (itemId: string) => {
    dispatch(getStagedItemInfoAsync(itemId));
    setSelectedStagedItemId(itemId);
    setViewModal(true);
  };
  const handleViewReceived = (itemId: string) => {
    dispatch(getItemInfoAsync(itemId));
    setSelectedReceivedItemId(itemId);
    setreceivedViewModal(true);
  };

  const handleEditStaged = (itemId: string) => {
    dispatch(getStagedItemInfoAsync(itemId));
    setSelectedStagedItemId(itemId);
    if (stagedItem) {
      setEditClient(stagedItem);
      setEditModal(true);
    }
    
  };

  const handleSaveEditedStagedItem = () => {
    dispatch(updateStagedItemAsync(editClient));
    setEditClient({ itemId: "",item: "",status: "",clientId: "",name: "",address: "",contact: 0,email: "",user: ""});
    setEditModal(false);
    fetchItems();
  };

  const handleDeleteStaged = (itemId: string,clientId:string) => {
    setSelectedStagedItemId(itemId);
    setSelectedClientItemId(clientId)
    setDeleteModal(true);
  };

  const confirmDeleteStaged = (itemId: string,clientId:string) => {
    dispatch(deleteStagedItemAsync({itemId,clientId}));
    setDeleteModal(false);
    fetchItems();
  };

  const handleAddStaged = () => {
    dispatch(addStagedItemAsync(newStageditem));
    setAddModal(false);
    fetchItems();
    setNewStageditem({ itemId: "",item: "",status: "",clientId: "",name: "",address: "",contact: 0,email: "",user: ""});
  };

  const handleAddReceived = (itemId:string) => {
    dispatch(addItemAsync(itemId));
    fetchItems();
    setReceivedItemId("");
  };
  const handleCheckout = (itemId:string,price:number) => {
    dispatch(checkoutItemAsync({itemId,price}));
    fetchItems();
    setCheckoutItem({itemId:"",price:0});
  };

  const filteredReceivedItems = Array.isArray(receivedItems) ? receivedItems.filter((receivedItems: Item) => {
    if (!filter || !search) return true;
    const value = receivedItems[filter as keyof Item];
    return typeof value === "string" && value.toLowerCase().includes(search.toLowerCase());
  }) : [];

  const filteredStagedItems = Array.isArray(stagedItems) ? stagedItems.filter((stagedItems: StagedItem) => {
    if (!filter || !search) return true;
    const value = stagedItems[filter as keyof StagedItem];
    return typeof value === "string" && value.toLowerCase().includes(search.toLowerCase());
  }) : [];

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



  return (      
    <div>
      
        {/* search section */}
        <div className="flex items-center justify-center">
            <div>Search by: </div>
            <Form className="relative z-0">
              <select
                name="cat"
                className="shadow-xl w-20 md:w-40 rounded-md m-2 p-2 z-0"
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">Select</option>
                <option value="itemId">Item Id</option>
                <option value="item">Item</option>
                <option value="status">Status</option>
                <option value="clientId">Client Id</option>
                <option value="name">Name</option>
                <option value="address">Address</option>
                <option value="email">Email</option>
                <option value="user">Cashier In</option>
              </select>
              <input type="text" name="" placeholder="search" className="bg-gray-200 rounded-2xl p-1 pl-3 w-28 sm:w-auto text-xl" onChange={(e) => setSearch(e.target.value)}/>
              <button className="absolute z-0 top-4 right-3 text-xl"> <IoSearchSharp/></button>              
            </Form>
            
        </div>

        {receiveerror && <div className="text-red-500">{receiveerror}</div>}
      {stageerror && <div className="text-red-500">{stageerror}</div>}

        <div className="lg:flex lg:justify-evenly grid grid-cols-1 grid-rows-2">
            <div className="space-y-2 bg-white rounded-lg shadow-xl p-5 h-40">
                <h2 className="font-semibold">Received Items</h2>
                <Form className="space-y-2">
                    <span>ItemID:</span>
                    <input type="text" className="bg-gray-100 rounded-md p-2 ml-2" placeholder="Enter Item Id" value={receivedItemId!} onChange={(e)=> setReceivedItemId(e.target.value)}/>
                    <button type="submit" className="bg-brightBlue text-white rounded-md sm:p-2 px-1 flex items-center" onClick={()=> handleAddReceived(receivedItemId!)}><span className="text-2xl text-white"><IoAddSharp/></span> Add Item</button>
                </Form>
            </div>
            <div className="space-y-2 bg-white rounded-lg shadow-xl p-5 h-52">
                <h2 className="font-semibold">Checkout</h2>
                <Form className="space-y-2 ">
                    <div className="grid grid-cols-1 grid-rows-2">
                        <div className="m-1">
                        <span>ItemID:</span>
                        <input type="text" className="bg-gray-100 rounded-md p-2 ml-2" placeholder="Enter Item Id" value={checkoutItem.itemId} onChange={(e)=> setCheckoutItem({...checkoutItem,itemId: e.target.value})}/>
                        </div>
                        <div className="m-1">
                        <span>Price:</span>
                        <input type="number" className="bg-gray-100 w-20 rounded-md p-2 ml-2" placeholder="Enter Price" value={checkoutItem.price} onChange={(e)=> setCheckoutItem({...checkoutItem, price: parseInt(e.target.value)})}/>
                        </div>                         
                    </div>
                    <button type="submit" className="bg-brightBlue text-white rounded-md sm:p-2 px-1 flex items-center" onClick={()=> handleCheckout(checkoutItem.itemId,checkoutItem.price)}><span className="text-2xl text-white"><IoAddSharp/></span> Checkout</button>

                </Form>
                
            </div>            
        </div>

        <div className="m-2 lg:flex grid grid-cols-1 grid-rows-2 space-y-2">
            <div className="bg-white shadow-xl rounded-md w-auto lg:w-2/3 mx-2 flex flex-col justify-center">
                    <div className="flex justify-between p-2">
                        <h1 className="text-brightBlue sm:text-2xl text-lg">Staged Items</h1>
                        <button type="button" onClick={() => setAddModal(true)} className="bg-brightBlue text-white rounded-md sm:p-2 px-1 flex items-center"><span className="text-2xl text-white"><IoAddSharp/></span> Add Item</button>
                    </div>
                    <div className="overflow-x-auto">
                    <table className="text-left w-full">
                    <thead className="flex w-full">
                        <tr className="flex w-full mb-4">
                        <th className="p-4 w-1/4">Id</th>
                        <th className="p-4 w-1/4">Item</th>
                        <th className="p-4 w-1/4">Status</th>
                        <th className="p-4 w-1/4">ClientId</th>
                        <th className="p-4 w-1/4">Name</th>
                        <th className="p-4 w-1/4">Address</th>
                        <th className="p-4 w-1/4">Contact</th>
                        <th className="p-4 w-1/4">Email</th>
                        <th className="p-4 w-1/4">Cashier In</th>
                        </tr>
                    </thead>
                            <tbody className="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full h-96" >
                            {filteredStagedItems.map((item:StagedItem) => (
                                <tr key={item.itemId} className="flex w-full mb-4">
                                <td className="p-4 w-1/4 border-b">{item.item}</td>                                
                                <td className="p-4 w-1/4 border-b"><span className={`${getStatusColor(item.status)} text-white p-1 rounded-md`}>{item.status}</span></td>
                                <td className="p-4 w-1/4 border-b">${item.clientId}</td>
                                <td className="p-4 w-1/4 border-b">{item.name}</td>
                                <td className="p-4 w-1/4 border-b">{item.address}</td>
                                <td className="p-4 w-1/4 border-b">{item.contact}</td>
                                <td className="p-4 w-1/4 border-b">{item.email}</td>
                                <td className="p-4 w-1/4 border-b">{item.user}</td>
                                <td className="p-4 w-1/4 border-b">
                                <div className="flex space-x-2">
                                  <button type="button" onClick={() => handleViewStaged(item.itemId)} className="text-blue-700"><IoEyeSharp /></button>
                                  <button type="button" onClick={() => handleEditStaged(item.itemId)} className="text-green-500"><IoPencilSharp /></button>
                                  <button type="button" onClick={() => handleDeleteStaged(item.itemId,item.clientId)} className="text-red-600"><IoTrashBinSharp /></button>
                                </div>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
            </div>
            <div className="bg-white shadow-xl rounded-md w-auto lg:w-1/3 mx-2 flex flex-col justify-center">
                    <div className="flex justify-between p-2">
                        <h1 className="text-brightBlue sm:text-2xl text-lg">Received Items</h1>
                        {/* <button type="button" onClick={() => setaddModal(true)} className="bg-brightBlue text-white rounded-md sm:p-2 px-1 flex items-center"><span className="text-2xl text-white"><IoAddSharp/></span> Add Staff</button> */}
                    </div>
                    <div className="overflow-x-auto">
                    <table className="text-left w-full">
                    <thead className="flex w-full">
                        <tr className="flex w-full mb-4">
                        <th className="p-4 w-1/4">Id</th>
                        <th className="p-4 w-1/4">Item</th>
                        <th className="p-4 w-1/4">Status</th>
                        <th className="p-4 w-1/4">ClientId</th>
                        <th className="p-4 w-1/4">Name</th>
                        <th className="p-4 w-1/4">Address</th>
                        <th className="p-4 w-1/4">Contact</th>
                        <th className="p-4 w-1/4">Email</th>
                        </tr>
                    </thead>
                            <tbody className="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full h-96" >
                            {filteredReceivedItems.map((item:Item) => (
                                <tr key={item.itemId} className="flex w-full mb-4">
                                <td className="p-4 w-1/4 border-b">{item.item}</td>                                
                                <td className="p-4 w-1/4 border-b"><span className={`${getStatusColor(item.status)} text-white p-1 rounded-md`}>{item.status}</span></td>
                                <td className="p-4 w-1/4 border-b">${item.clientId}</td>
                                <td className="p-4 w-1/4 border-b">{item.name}</td>
                                <td className="p-4 w-1/4 border-b">{item.address}</td>
                                <td className="p-4 w-1/4 border-b">{item.contact}</td>
                                <td className="p-4 w-1/4 border-b">{item.email}</td>
                                <td className="p-4 w-1/4 border-b">
                                <div className="flex space-x-2">
                                  <button type="button" onClick={() => handleViewReceived(item.itemId)} className="text-blue-700"><IoEyeSharp /></button>
                                  {/* <button type="button" onClick={() => handleEditClient(client.clientId)} className="text-green-500"><IoPencilSharp /></button>
                                  <button type="button" onClick={() => handleDeleteClient(client.clientId)} className="text-red-600"><IoTrashBinSharp /></button> */}
                                </div>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
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
                    Add Item
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setAddModal(false)
                       fetchItems()}}
                  >
                  <span className="text-red-600"><IoCloseSharp/></span>
                  </button>
                </div>
                {/*body*/}
                <div className="my-2 mx-2 sm:grid sm:grid-cols-2 sm:grid-rows-4">
                  
                  <div className="flex items-center space-x-1">
                    <h1>Item:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="text" placeholder="Item Name"  value={newStageditem.item} onChange={(e) => setNewStageditem({ ...newStageditem, item: e.target.value })} />
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Name:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="text" placeholder="Name" value={newStageditem.name} onChange={(e) => setNewStageditem({ ...newStageditem, name: e.target.value })}/>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Address:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="text" placeholder="address" value={newStageditem.address} onChange={(e) => setNewStageditem({ ...newStageditem, address: e.target.value })}/>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Contact</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="tel" placeholder="Contact" value={newStageditem.contact} onChange={(e) => setNewStageditem({ ...newStageditem, contact: parseInt(e.target.value) })}/>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Email:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="text" placeholder="Email" value={newStageditem.email} onChange={(e) => setNewStageditem({ ...newStageditem, email: e.target.value })}/>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setAddModal(false)
                       fetchItems()}}
                  >                  
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleAddStaged}
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

      {editModal && stagedItem? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Edit Item
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setEditModal(false)
                       fetchItems()}}
                  >
                  <span className="text-red-600"><IoCloseSharp/></span>
                  </button>
                </div>
                {/*body*/}
                <div className="my-2 mx-2 sm:grid sm:grid-cols-2 sm:grid-rows-4">
                  
                  <div className="flex items-center space-x-1">
                    <h1>Item:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="text" placeholder="Item Name"  value={newStageditem.item} onChange={(e) => setNewStageditem({ ...newStageditem, item: e.target.value })} />
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Name:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="text" placeholder="Name" value={newStageditem.name} onChange={(e) => setNewStageditem({ ...newStageditem, name: e.target.value })}/>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Address:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="text" placeholder="address" value={newStageditem.address} onChange={(e) => setNewStageditem({ ...newStageditem, address: e.target.value })}/>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Contact</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="tel" placeholder="Contact" value={newStageditem.contact} onChange={(e) => setNewStageditem({ ...newStageditem, contact: parseInt(e.target.value) })}/>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Email:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="text" placeholder="Email" value={newStageditem.email} onChange={(e) => setNewStageditem({ ...newStageditem, email: e.target.value })}/>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setEditModal(false)
                       fetchItems()}}
                  >                  
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSaveEditedStagedItem}
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

      {viewModal && stagedItem? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Item Details
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setViewModal(false)
                       fetchItems()}}
                  >
                  <span className="text-red-600"><IoCloseSharp/></span>
                  </button>
                </div>
                {/*body*/}
                <div className="my-2 mx-2 sm:grid sm:grid-cols-2 sm:grid-rows-4">
                  <div className="flex items-center space-x-1">
                    <h1>ItemId:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1" >{stagedItem.itemId}</h1>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Item:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1" >{stagedItem.item}</h1>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Status:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1" >{stagedItem.status}</h1>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Client Id:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1" >{stagedItem.clientId}</h1>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Name:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1" >{stagedItem.name}</h1>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Address:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1" >{stagedItem.address}</h1>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Contact:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1" >{stagedItem.contact}</h1>
                  </div>                
                  <div className="flex items-center space-x-1">
                    <h1>Email:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1" >{stagedItem.email}</h1>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>CashierIn:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1" >{stagedItem.user}</h1>
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

      {receivedviewModal && receivedItem? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Item Details
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setreceivedViewModal(false)
                       fetchItems()}}
                  >
                  <span className="text-red-600"><IoCloseSharp/></span>
                  </button>
                </div>
                {/*body*/}
                <div className="my-2 mx-2 sm:grid sm:grid-cols-2 sm:grid-rows-4">
                  <div className="flex items-center space-x-1">
                    <h1>ItemId:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1" >{receivedItem.itemId}</h1>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Item:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1" >{receivedItem.item}</h1>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Status:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1" >{receivedItem.status}</h1>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Client Id:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1" >{receivedItem.clientId}</h1>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Name:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1" >{receivedItem.name}</h1>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Address:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1" >{receivedItem.address}</h1>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Contact:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1" >{receivedItem.contact}</h1>
                  </div>                
                  <div className="flex items-center space-x-1">
                    <h1>Email:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1" >{receivedItem.email}</h1>
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
                       fetchItems()}}
                  >
                    <span className="text-red-600"><IoCloseSharp /></span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Are you sure you want to delete this item?
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setDeleteModal(false)
                       fetchItems()}}
                  >
                    No
                  </button>
                  <button
                    className="bg-brightBlue text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={()=> confirmDeleteStaged(selectedStagedItemId!,selectedClientItemId!)}
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
  )
}
