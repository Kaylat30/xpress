import React, { useState, useEffect } from 'react';
import { IoAddSharp, IoCloseSharp, IoEyeSharp, IoPencilSharp, IoSearchSharp, IoTrashBinSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getClientsAsync, deleteClientAsync, addClientAsync, selectClients, selectClientById, getClientInfoAsync, updateClientAsync } from "../slice/clientSlice";
import { AppDispatch, RootState } from "../store";

interface Client {
  clientId: string;
  name: string;
  address: string;
  contact: string;
  email: string;
}

const Clients: React.FC = () => {

  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [newClient, setNewClient] = useState<Client>({ clientId: "", name: "", address: "", contact: "", email: "" });
  const [editClient, setEditClient] = useState<Client>({clientId: "",name: "",address: "",contact: "",email: "",});

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getClientsAsync());
  }, [dispatch]);

  const fetchClients = () => {
    dispatch(getClientsAsync());
  };

  const clients = useSelector(selectClients) as Client[]; 
  const client = useSelector((state: RootState) => selectedClientId ? selectClientById(selectedClientId)(state) : undefined);



  const handleViewClient = (clientId: string) => {
    dispatch(getClientInfoAsync(clientId));
    setSelectedClientId(clientId);
    setViewModal(true);
  };

  const handleEditClient = (clientId: string) => {
    dispatch(getClientInfoAsync(clientId));
    setSelectedClientId(clientId);
    if (client) {
      setEditClient(client);
      setEditModal(true);
    }
    
  };

  const handleSaveEditedClient = () => {
    dispatch(updateClientAsync(editClient));
    setEditClient({ clientId: "", name: "", address: "", contact: "", email: "" });
    setEditModal(false);
    fetchClients();
  };

  const handleDeleteClient = (clientId: string) => {
    setSelectedClientId(clientId);
    setDeleteModal(true);
  };

  const confirmDeleteClient = (clientId: string) => {
    dispatch(deleteClientAsync(clientId));
    setDeleteModal(false);
    fetchClients();
  };

  const handleAddClient = () => {
    dispatch(addClientAsync(newClient));
    setAddModal(false);
    fetchClients();
    setNewClient({ clientId: "", name: "", address: "", contact: "", email: "" });
  };

  const filteredClients = Array.isArray(clients) ? clients.filter((clients: Client) => {
    if (!filter || !search) return true;
    return clients[filter as keyof Client]?.toLowerCase().includes(search.toLowerCase());
  }) : [];

  return (
    <div>
      <div className="flex items-center justify-center">
        <div>Search by:</div>
        <div className="relative z-0">
          <select name="cat" className="shadow-xl w-20 md:w-40 rounded-md m-2 p-2 z-0" onChange={(e) => setFilter(e.target.value)}>
            <option value="">Select</option>
            <option value="clientId">Id</option>
            <option value="name">Name</option>
            <option value="address">Address</option>
            <option value="contact">Contact</option>
            <option value="email">Email</option>
          </select>
          <input type="text" placeholder="search" className="bg-gray-200 rounded-2xl p-1 pl-3 w-28 sm:w-auto text-xl" onChange={(e) => setSearch(e.target.value)} />
          <button className="absolute z-0 top-4 right-3 text-xl"> <IoSearchSharp /></button>
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-md w-auto mx-2 flex flex-col justify-center">
        <div className="flex justify-between p-2">
          <h1 className="text-brightBlue sm:text-2xl text-lg">All Clients</h1>
          <button type="button" onClick={() => setAddModal(true)} className="bg-brightBlue text-white rounded-md sm:p-2 px-1 flex items-center">
            <span className="text-2xl text-white"><IoAddSharp /></span> Add Client
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="text-left w-full">
            <thead className="flex w-full">
              <tr className="flex w-full mb-4">
                <th className="p-4 w-1/4">Id</th>
                <th className="p-4 w-1/4">Name</th>
                <th className="p-4 w-1/4">Contact</th>
                <th className="p-4 w-1/4">Email</th>
                <th className="p-4 w-1/4">Location</th>
                <th className="p-4 w-1/4"></th>
              </tr>
            </thead>
            <tbody className="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full h-96">
              {filteredClients.map((client: Client) => (
                <tr key={client.clientId} className="flex w-full mb-4">
                  <td className="p-4 w-1/4 border-b">{client.clientId}</td>
                  <td className="p-4 w-1/4 border-b">{client.name}</td>
                  <td className="p-4 w-1/4 border-b">{client.contact}</td>
                  <td className="p-4 w-1/4 border-b">{client.email}</td>
                  <td className="p-4 w-1/4 border-b">{client.address}</td>
                  <td className="p-4 w-1/4 border-b">
                    <div className="flex space-x-2">
                      <button type="button" onClick={() => handleViewClient(client.clientId)} className="text-blue-700"><IoEyeSharp /></button>
                      <button type="button" onClick={() => handleEditClient(client.clientId)} className="text-green-500"><IoPencilSharp /></button>
                      <button type="button" onClick={() => handleDeleteClient(client.clientId)} className="text-red-600"><IoTrashBinSharp /></button>
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
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add Client</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setAddModal(false)
                       fetchClients()}}
                  >
                    <span className="text-red-600"><IoCloseSharp /></span>
                  </button>
                </div>
                <div className="m-2 sm:grid sm:grid-cols-2 sm:grid-rows-2 space-y-1">
                  <div className="flex items-center space-x-1">
                    <h1>Name:</h1>
                    <input
                      className="bg-gray-200 rounded-md p-1"
                      type="text"
                      placeholder="Name"
                      value={newClient.name}
                      onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Address:</h1>
                    <input
                      className="bg-gray-200 rounded-md p-1"
                      type="text"
                      placeholder="Address"
                      value={newClient.address}
                      onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Contact:</h1>
                    <input
                      className="bg-gray-200 rounded-md p-1"
                      type="text"
                      placeholder="Contact"
                      value={newClient.contact}
                      onChange={(e) => setNewClient({ ...newClient, contact: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Email:</h1>
                    <input
                      className="bg-gray-200 rounded-md p-1"
                      type="email"
                      placeholder="email"
                      value={newClient.email}
                      onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() =>{
                      setAddModal(false)
                       fetchClients()}}
                  >
                    Close
                  </button>
                  <button
                    className="bg-brightBlue text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleAddClient}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {editModal && client ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit Client</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setEditModal(false)
                       fetchClients()}}
                  >
                    <span className="text-red-600"><IoCloseSharp /></span>
                  </button>
                </div>
                <div className="m-2 sm:grid sm:grid-cols-2 sm:grid-rows-2 space-y-1">
                  <div className="flex items-center space-x-1">
                    <h1>Name:</h1>
                    <input
                      className="bg-gray-200 rounded-md p-1"
                      type="text"
                      placeholder="Name"
                      value={editClient.name}
                      onChange={(e) => setEditClient({ ...editClient, name: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Address:</h1>
                    <input
                      className="bg-gray-200 rounded-md p-1"
                      type="text"
                      placeholder="Address"
                      value={editClient.address}
                      onChange={(e) => setEditClient({ ...editClient, address: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Contact:</h1>
                    <input
                      className="bg-gray-200 rounded-md p-1"
                      type="text"
                      placeholder="Contact"
                      value={editClient.contact}
                      onChange={(e) => setEditClient({ ...editClient, contact: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Email:</h1>
                    <input
                      className="bg-gray-200 rounded-md p-1"
                      type="email"
                      placeholder="email"
                      value={editClient.email}
                      onChange={(e) => setEditClient({ ...editClient, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setEditModal(false)
                       fetchClients()}}
                  >
                    Close
                  </button>
                  <button
                    className="bg-brightBlue text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSaveEditedClient}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {viewModal && client ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Client Details</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setViewModal(false)
                       fetchClients()}}
                  >
                    <span className="text-red-600"><IoCloseSharp /></span>
                  </button>
                </div>
                <div className="m-2 sm:grid sm:grid-cols-2 sm:grid-rows-2 space-y-1">
                  <div className="flex items-center space-x-1">
                    <h1>Name:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1">{client.name}</h1>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Location:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1">{client.address}</h1>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Contact:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1">{client.contact}</h1>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Email:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1">{client.email}</h1>
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setViewModal(false)
                       fetchClients()}}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
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
                       fetchClients()}}
                  >
                    <span className="text-red-600"><IoCloseSharp /></span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Are you sure you want to delete this client?
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setDeleteModal(false)
                       fetchClients()}}
                  >
                    No
                  </button>
                  <button
                    className="bg-brightBlue text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => confirmDeleteClient(selectedClientId!)}
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
  );
}

export default Clients;


  



