import { IoAddSharp, IoCloseSharp, IoEyeSharp, IoPencilSharp, IoSearchSharp, IoTrashBinSharp } from "react-icons/io5"
import { Form } from "react-router-dom"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { addStaffAsync, deleteStaffAsync, getStaffAsync, getStaffInfoAsync, selectStaffById, selectStaffs, updateStaffAsync } from "../slice/staffSlice";


interface Staff {
  staffId: string;
  name: string;
  branch: string;
  sex: string;
  role: string;
  dob: string;
  contact: number;
  address: string;
  email: string;
}

export default function Staff() {

  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [newStaff, setNewStaff] = useState<Staff>({staffId: "",name: "",branch: "",sex: "",role: "",dob: "",contact:0 ,address: "",email: ""});
  const [editStaff, setEditStaff] = useState<Staff>({staffId: "",name: "",branch: "",sex: "",role: "",dob: "",contact:0,address: "",email: ""});

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getStaffAsync());
  }, [dispatch]);

  const fetchStaffs = () => {
    dispatch(getStaffAsync());
  };

  const staffs = useSelector(selectStaffs) as Staff[]; 
  const staff = useSelector((state: RootState) => selectedStaffId ? selectStaffById(selectedStaffId)(state) : undefined);



  const handleViewStaff = (StaffId: string) => {
    dispatch(getStaffInfoAsync(StaffId));
    setSelectedStaffId(StaffId);
    setViewModal(true);
  };

  const handleEditStaff = (StaffId: string) => {
    dispatch(getStaffInfoAsync(StaffId));
    setSelectedStaffId(StaffId);
    if (staff) {
      setEditStaff(staff);
      setEditModal(true);
    }
    
  };

  const handleSaveEditedStaff = () => {
    dispatch(updateStaffAsync(editStaff));
    setEditStaff({staffId: "",name: "",branch: "",sex: "",role: "",dob: "",contact:0,address: "",email: ""});
    setEditModal(false);
    fetchStaffs();
  };

  const handleDeleteStaff = (StaffId: string) => {
    setSelectedStaffId(StaffId);
    setDeleteModal(true);
  };

  const confirmDeleteStaff = (StaffId: string) => {
    dispatch(deleteStaffAsync(StaffId));
    setDeleteModal(false);
    fetchStaffs();
  };

  const handleAddStaff = () => {
    dispatch(addStaffAsync(newStaff));
    setAddModal(false);
    fetchStaffs();
    setNewStaff({staffId: "",name: "",branch: "",sex: "",role: "",dob: "",contact:0,address: "",email: ""});
  };

  const filteredStaffs = Array.isArray(staffs)
    ? staffs.filter((staff: Staff) => {
        if (!filter || !search) return true;
        const value = staff[filter as keyof Staff];
        return typeof value === "string" && value.toLowerCase().includes(search.toLowerCase());
      })
    : [];



  const getStatusColor = (status: string) => {
    switch (status) {
      case "cashier":
        return "bg-green-500";
      case "admin":
        return "bg-red-500";
      case "driver":
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
              <input type="text" name="" placeholder="search" className="bg-gray-200 rounded-2xl p-1 pl-3 w-28 sm:w-auto text-xl" onChange={(e) => setSearch(e.target.value)}/>
              <button className="absolute z-0 top-4 right-3 text-xl"> <IoSearchSharp/></button>              
            </Form>
            
        </div>

        <div className="bg-white shadow-xl rounded-md w-auto mx-2 flex flex-col justify-center">
                <div className="flex justify-between p-2">
                    <h1 className="text-brightBlue sm:text-2xl text-lg">All staff</h1>
                    <button type="button" onClick={() => setAddModal(true)} className="bg-brightBlue text-white rounded-md sm:p-2 px-1 flex items-center"><span className="text-2xl text-white"><IoAddSharp/></span> Add Staff</button>
                </div>
                <div className="overflow-x-auto">
                <table className="text-left w-full">
                  <thead className="flex w-full">
                    <tr className="flex w-full mb-4">
                      <th className="p-4 w-1/4">Id</th>
                      <th className="p-4 w-1/4">Name</th>
                      <th className="p-4 w-1/4">Sex</th>
                      <th className="p-4 w-1/4">Branch</th>
                      <th className="p-4 w-1/4">Contact</th>
                      <th className="p-4 w-1/4">Role</th>
                      <th className="p-4 w-1/4">Email</th>
                      <th className="p-4 w-1/4">Address</th>
                      <th className="p-4 w-1/4">D.O.B</th>
                    </tr>
                  </thead>
                        <tbody className="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full h-96" >
                        {filteredStaffs.map((staff) => (
                            <tr key={staff.staffId} className="flex w-full mb-4">
                              <td className="p-4 w-1/4 border-b">{staff.staffId}</td>
                            <td className="p-4 w-1/4 border-b">{staff.name}</td>
                            <td className="p-4 w-1/4 border-b">{staff.sex}</td>
                            <td className="p-4 w-1/4 border-b">{staff.branch}</td>
                            <td className="p-4 w-1/4 border-b">{staff.contact}</td>
                            <td className="p-4 w-1/4 border-b"><span className={`${getStatusColor(staff.role)} text-white p-1 rounded-md`}>{staff.role}</span></td>
                            <td className="p-4 w-1/4 border-b">{staff.email}</td>
                            <td className="p-4 w-1/4 border-b">{staff.address}</td>
                            <td className="p-4 w-1/4 border-b">{staff.dob}</td>
                            <td className="p-4 w-1/4 border-b">
                            <div className="flex space-x-2">
                              <button type="button" onClick={() => handleViewStaff(staff.staffId)} className="text-blue-700"><IoEyeSharp /></button>
                              <button type="button" onClick={() => handleEditStaff(staff.staffId)} className="text-green-500"><IoPencilSharp /></button>
                              <button type="button" onClick={() => handleDeleteStaff(staff.staffId)} className="text-red-600"><IoTrashBinSharp /></button>
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
                    onClick={() => {
                      setAddModal(false)
                       fetchStaffs()}}
                  >
                  <span className="text-red-600"><IoCloseSharp/></span>
                  </button>
                </div>
                {/*body*/}
                <div className="my-2 mx-2 sm:grid sm:grid-cols-2 sm:grid-rows-4">
                  
                  <div className="flex items-center space-x-1">
                    <h1>Name:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="text" placeholder="Name" value={newStaff.name} onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}/>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Branch:</h1>
                    <select
                    name="cat"
                    className="shadow-xl w-20 md:w-40 rounded-md m-2 p-2 z-0"
                    onChange={(e) => setNewStaff({...newStaff,branch: e.target.value})}
                  >
                    <option value="">Select</option>
                    <option value="kampala">Kampala</option>
                    <option value="mbarara">Mbarar</option>
                    <option value="jinja">Jinja</option>
                    <option value="gulu">Gulu</option>
                  </select>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Sex:</h1>
                    <input className="rounded-md p-1 cursor-pointer" type="radio"  name="sex" value="male" onChange={(e) => setNewStaff({ ...newStaff, sex: e.target.value })} />:Male
                    <input className="rounded-md p-1 cursor-pointer" type="radio" name="sex" value="female" onChange={(e) => setNewStaff({ ...newStaff, sex: e.target.value })}/>:Female 
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Role:</h1>
                    <select
                name="cat"
                className="shadow-xl w-20 md:w-40 rounded-md m-2 p-2 z-0"
              >
                <option value="">Select</option>
                <option value="admin">Admin</option>
                <option value="cashier">Cashier</option>
                <option value="driver">Driver</option>
                {/* <option value="role">Role</option> */}
              </select>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Address:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="text" placeholder="address" value={newStaff.address} onChange={(e) => setNewStaff({ ...newStaff, address: e.target.value })}/>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Contact:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="tel" placeholder="tel" value={newStaff.contact} onChange={(e) => setNewStaff({ ...newStaff, contact: parseInt(e.target.value) })}/>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>D.O.B:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="date" placeholder="D.O.B"  value={newStaff.dob} onChange={(e) => setNewStaff({ ...newStaff, dob: e.target.value })}/>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Email:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="text" placeholder="Email" value={newStaff.email} onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}/>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setAddModal(false)
                      fetchStaffs()}}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleAddStaff}
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

      {editModal && staff ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Edit Staff
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setEditModal(false)
                       fetchStaffs()}}
                  >
                  <span className="text-red-600"><IoCloseSharp/></span>
                  </button>
                </div>
                {/*body*/}
                <div className="my-2 mx-2 sm:grid sm:grid-cols-2 sm:grid-rows-4">
                  
                  <div className="flex items-center space-x-1">
                    <h1>Name:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="text" placeholder="Name" value={editStaff.name} onChange={(e) => setEditStaff({ ...newStaff, name: e.target.value })}/>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Branch:</h1>
                    <select
                    name="cat"
                    className="shadow-xl w-20 md:w-40 rounded-md m-2 p-2 z-0"
                    onChange={(e) => setNewStaff({...editStaff,branch: e.target.value})}
                  >
                    <option value="">Select</option>
                    <option value="kampala">Kampala</option>
                    <option value="mbarara">Mbarar</option>
                    <option value="jinja">Jinja</option>
                    <option value="gulu">Gulu</option>
                  </select>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Sex:</h1>
                    <input className="rounded-md p-1 cursor-pointer" type="radio"  name="sex" value="male" onChange={(e) => setEditStaff({ ...editStaff, sex: e.target.value })} />:Male
                    <input className="rounded-md p-1 cursor-pointer" type="radio" name="sex" value="female" onChange={(e) => setEditStaff({ ...editStaff, sex: e.target.value })}/>:Female 
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Role:</h1>
                    <select
                name="cat"
                className="shadow-xl w-20 md:w-40 rounded-md m-2 p-2 z-0"
              >
                <option value="">Select</option>
                <option value="admin">Admin</option>
                <option value="cashier">Cashier</option>
                <option value="driver">Driver</option>
                {/* <option value="role">Role</option> */}
              </select>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Address:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="text" placeholder="address" value={editStaff.address} onChange={(e) => setEditStaff({ ...editStaff, address: e.target.value })}/>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Contact:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="tel" placeholder="tel" value={editStaff.contact} onChange={(e) => setEditStaff({ ...editStaff, contact: parseInt(e.target.value) })}/>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>D.O.B:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="date" placeholder="D.O.B"  value={editStaff.dob} onChange={(e) => setEditStaff({ ...editStaff, dob: e.target.value })}/>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Email:</h1>
                    <input className="bg-gray-200 rounded-md p-1" type="text" placeholder="Email" value={editStaff.email} onChange={(e) => setEditStaff({ ...editStaff, email: e.target.value })}/>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setEditModal(false)
                       fetchStaffs()}}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSaveEditedStaff}
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

      {viewModal && staff ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Staff Details
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setViewModal(false)
                       fetchStaffs()}}
                  >
                  <span className="text-red-600"><IoCloseSharp/></span>
                  </button>
                </div>
                {/*body*/}
                <div className="my-2 mx-2 sm:grid sm:grid-cols-2 sm:grid-rows-4">
                  
                  <div className="flex items-center space-x-1">
                    <h1>Name:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1" >{staff.name}</h1>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Branch:</h1>
                    <h1>{staff.branch}</h1>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Sex:</h1>
                    <h1>{staff.sex}</h1>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Role:</h1>
                    <h1>{staff.role}</h1>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Address:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1" >{staff.address}</h1>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Contact:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1" >{staff.contact}</h1>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>D.O.B:</h1>
                    <h1 className="bg-gray-200 rounded-md p-1" >{staff.dob}</h1>
                  </div>
                  <div className="flex items-center space-x-1">
                    <h1>Email:</h1>
                    <h1>{staff.email}</h1>
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
                       fetchStaffs()}}
                  >
                    <span className="text-red-600"><IoCloseSharp /></span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Are you sure you want to delete this staff?
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setDeleteModal(false)
                       fetchStaffs()}}
                  >
                    No
                  </button>
                  <button
                    className="bg-brightBlue text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => confirmDeleteStaff(selectedStaffId!)}
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
