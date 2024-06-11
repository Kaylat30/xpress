import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoCartSharp, IoPeopleSharp, IoPricetagSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AppDispatch } from "../store";
import { getDeliveryItemsAsync, selectDeliveryItems } from "../slice/deliverySlice";
import { getClientsAsync, selectClients } from "../slice/clientSlice";
import { getStaffAsync, selectStaffs } from "../slice/staffSlice";
import profile from "../imgs/profile.png";

interface RootState {
  active: {
    isActive: boolean;
  };
}

interface DeliveryItem {
  itemId: string;
  item: string;
  status: string;
  driverId: string;
  cashierIn: string;
  cashierOut: string;
  clientId: string;
  price: number;
}

export function Dashboard() {
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

  const { isActive } = useSelector((store: RootState) => store.active);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getDeliveryItemsAsync());
    dispatch(getClientsAsync());
    dispatch(getStaffAsync());
  }, [dispatch]);

  const clients = useSelector(selectClients) || [];
const staffs = useSelector(selectStaffs) || [];
const deliveries = useSelector(selectDeliveryItems) as DeliveryItem[] || [];


  const totalSales = Array.isArray(deliveries) && deliveries.reduce((acc, delivery) => acc + delivery.price, 0);

  const cards = [
    {
      num: deliveries.length > 0 ? deliveries.length : 0,
      text: "Orders",
      icon: <IoCartSharp />,
    },
    {
      num: staffs.length > 0 ? staffs.length : 0,
      text: "Staff",
      icon: <IoPeopleSharp />,
    },
    {
      num: clients.length > 0 ? clients.length : 0,
      text: "Clients",
      icon: <IoPeopleSharp />,
    },
    {
      num: `$${totalSales}`,
      text: "Sales",
      icon: <IoPricetagSharp />,
    },
  ];

  return (
    <>
      <div className="grid md:grid-rows-1 md:grid-cols-4 sm:grid-rows-2 sm:grid-cols-2 grid-rows-4 grid-cols-1 m-2 ">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`flex flex-col flex-auto justify-center ${
              isActive ? " " : ""
            } bg-white space-y-3 m-2 h-36 hover:text-white hover:bg-brightBlue cursor-pointer  shadow-xl p-5 rounded-md transition-all duration-500 ease-in-out `}
          >
            <div className="flex justify-between">
              <h4 className="text-2xl sm:text-4xl text-brightBlue  hover:text-white ">
                {card.num}
              </h4>
              <div className="text-3xl sm:text-5xl text-lightGray">
                {card.icon}
              </div>
            </div>
            <div className="text-xl sm:text-3xl text-lightGray">
              {card.text}
            </div>
          </div>
        ))}
      </div>
      <div className="md:flex grid grid-rows-2 grid-cols-1 my-2">
        <div className="bg-white shadow-xl rounded-md w-auto mx-2 flex-grow">
          <div className="flex justify-between p-2">
            <h1 className="text-brightBlue sm:text-2xl text-lg">Recent Orders</h1>
            <Link to="deliveries" className="bg-brightBlue text-white rounded-md sm:p-2 px-1">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="text-left w-full">
              <thead className="flex w-full">
                <tr className="flex w-full mb-4">
                  <th className="p-4 w-1/4">Item Id</th>
                  <th className="p-4 w-1/4">Item</th>
                  <th className="p-4 w-1/4">Client Id</th>
                  <th className="p-4 w-1/4">Cashier Out</th>
                  <th className="p-4 w-1/4">Status</th>
                </tr>
              </thead>
              <tbody className="bg-grey-light flex flex-col items-center justify-between w-full">
                {Array.isArray(deliveries) &&
                  deliveries.slice(-10).map((item) => (
                    <tr key={item.itemId} className="flex w-full mb-4">
                      <td className="p-4 w-1/4 border-b">{item.itemId}</td>
                      <td className="p-4 w-1/4 border-b">{item.item}</td>
                      <td className="p-4 w-1/4 border-b">{item.clientId}</td>
                      <td className="p-4 w-1/4 border-b">{item.cashierOut}</td>
                      <td className="p-4 w-1/4 border-b">
                        <span className={`${getStatusColor(item.status)} text-white p-1 rounded-md`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="bg-white shadow-xl rounded-md pl-5 md:w-96 mx-2">
            <h1 className="text-brightBlue text-2xl my-2">Recent Clients</h1>
            <div className="space-y-5 ">
              {Array.isArray(clients) &&
                clients.slice(-3).map((client) => (
                  <div className="flex hover:bg-brightBlue hover:text-white cursor-pointer" key={client.clientId}>
                    <img className="w-12" src={profile} alt="" />
                    <div className="ml-2">
                      <h2>{client.name}</h2>
                      <h2 className="text-lightGray">{client.address}</h2>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="bg-white shadow-xl rounded-md pl-5 md:w-96 mx-2">
            <h1 className="text-brightBlue text-2xl my-3">Recent Staff</h1>
            <div className="space-y-5 ">
              {Array.isArray(staffs) &&
                staffs.slice(-3).map((staff) => (
                  <div className="flex hover:bg-brightBlue hover:text-white cursor-pointer" key={staff.staffId}>
                    <img className="w-12" src={profile} alt="" />
                    <div className="ml-2">
                      <h2>{staff.name}</h2>
                      <h2 className="text-lightGray">{staff.address}</h2>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
