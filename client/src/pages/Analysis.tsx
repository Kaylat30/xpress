// import { IoAnalytics, IoArrowUpSharp, IoArrowDownSharp, IoWalletSharp, IoCashSharp } from "react-icons/io5";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch } from "../store";
// import { getDeliveryItemsAsync, selectDeliveryItems } from "../slice/deliverySlice";
// import { getClientsAsync, selectClients } from "../slice/clientSlice";
// import { getStaffAsync, selectStaffs } from "../slice/staffSlice";
// import { Link } from "react-router-dom";
// import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,PieChart,Pie,Cell } from 'recharts';

// interface DeliveryItem {
//   itemId: string;
//   item: string;
//   status: string;
//   driverId: string;
//   cashierIn: string;
//   cashierOut: string;
//   clientId: string;
//   price: number;
//   createdAt: string; 
// }

// interface Client {
//   clientId: string;
//   name: string;
//   address: string;
//   contact: string;
//   email: string;
//   createdAt: string; 
// }

// interface Staff {
//   staffId: string;
//   name: string;
//   branch: string;
//   sex: string;
//   role: string;
//   dob: string;
//   contact: number;
//   address: string;
//   email: string;
//   createdAt: string;
// }



// export default function Analysis() {
//   const dispatch = useDispatch<AppDispatch>();
//   const [loading, setLoading] = useState(true);
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [staffChartData, setStaffChartData] = useState<{ name: string; value: number; }[]>([]);
//   const [clientChartData, setClientChartData] = useState<{ name: string; value: number; }[]>([]);
//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF6666"];

//   useEffect(() => {
//     const fetchData = async () => {
//       await Promise.all([
//         dispatch(getDeliveryItemsAsync()),
//         dispatch(getClientsAsync()),
//         dispatch(getStaffAsync()),
//       ]);
//       setLoading(false);
//     };

//     fetchData();
//   }, [dispatch]);

//   const deliveries = useSelector(selectDeliveryItems) as DeliveryItem[];
//   const clients = useSelector(selectClients) as Client[];
//   const staffs = useSelector(selectStaffs) as Staff[];

//   useEffect(() => {
//     if (!loading) {
//       // Prepare data for staff pie chart
//       const newStaffsCurrentMonth = staffs.filter(staff => new Date(staff.createdAt) >= startCurrentMonth && new Date(staff.createdAt) <= endCurrentMonth).length;
//       const newStaffsPreviousMonth = staffs.filter((staff) => new Date(staff.createdAt) >= startPreviousMonth && new Date(staff.createdAt) <= endPreviousMonth).length;
//       const staffChartData1 = [
//         { name: "Current Month", value: newStaffsCurrentMonth },
//         { name: "Previous Month", value: newStaffsPreviousMonth },
//       ];

//       // Prepare data for client pie chart
//       const newClientsCurrentMonth = clients.filter(client => new Date(client.createdAt) >= startCurrentMonth && new Date(client.createdAt) <= endCurrentMonth).length;
//       const newClientsPreviousMonth = clients.filter((client) => new Date(client.createdAt) >= startPreviousMonth && new Date(client.createdAt) <= endPreviousMonth).length;
//       const clientChartData1 = [
//         { name: "Current Month", value: newClientsCurrentMonth },
//         { name: "Previous Month", value: newClientsPreviousMonth },
//       ];

//       // Set chart data into state
//       setStaffChartData(staffChartData1);
//       setClientChartData(clientChartData1);
//     }
//   }, [loading, clients, staffs]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // Helper function to get the start and end dates of the previous and current month
//   const getMonthDateRange = (year: number, month: number) => {
//     const startDate = new Date(year, month, 1);
//     const endDate = new Date(year, month + 1, 0);
//     return { startDate, endDate };
//   };

//   // Get the current and previous month dates
//   const currentDate = new Date();
//   const currentMonth = currentDate.getMonth();
//   const currentYear = currentDate.getFullYear();

//   const { startDate: startCurrentMonth, endDate: endCurrentMonth } = getMonthDateRange(currentYear, currentMonth);
//   const { startDate: startPreviousMonth, endDate: endPreviousMonth } = getMonthDateRange(currentYear, currentMonth - 1);

//   // Filter deliveries based on the createdAt date
//   const deliveriesCurrentMonth = deliveries.filter(delivery =>
//     new Date(delivery.createdAt) >= startCurrentMonth && new Date(delivery.createdAt) <= endCurrentMonth
//   );

//   const deliveriesPreviousMonth = deliveries.filter(delivery =>
//     new Date(delivery.createdAt) >= startPreviousMonth && new Date(delivery.createdAt) <= endPreviousMonth
//   );

//   const deliveriesPreviousMonths = deliveries.filter(delivery =>
//     new Date(delivery.createdAt) < startCurrentMonth && new Date(delivery.createdAt) >= startPreviousMonth
//   );

//   const currentMonthCount = deliveriesCurrentMonth.length;
//   const previousMonthCount = deliveriesPreviousMonth.length;
//   const percentageChange = previousMonthCount === 0 ? 0 : ((currentMonthCount - previousMonthCount) / previousMonthCount) * 100;

//   // Calculate the count and percentage change for pending deliveries
//   const pendingDeliveriesCurrentMonth = deliveriesCurrentMonth.filter(delivery => delivery.status === "Pending").length;
//   const pendingDeliveriesPreviousMonth = deliveriesPreviousMonth.filter(delivery => delivery.status === "Pending").length;
//   const pendingPercentageChange = pendingDeliveriesPreviousMonth === 0 ? 0 : ((pendingDeliveriesCurrentMonth - pendingDeliveriesPreviousMonth) / pendingDeliveriesPreviousMonth) * 100;

//   // Calculate the count and percentage change for shipped deliveries
//   const shippedDeliveriesCurrentMonth = deliveriesCurrentMonth.filter(delivery => delivery.status === "Shipped").length;
//   const shippedDeliveriesPreviousMonth = deliveriesPreviousMonth.filter(delivery => delivery.status === "Shipped").length;
//   const shippedPercentageChange = shippedDeliveriesPreviousMonth === 0 ? 0 : ((shippedDeliveriesCurrentMonth - shippedDeliveriesPreviousMonth) / shippedDeliveriesPreviousMonth) * 100;

//   // Calculate the count and percentage change for delivered deliveries
//   const deliveredDeliveriesCurrentMonth = deliveriesCurrentMonth.filter(delivery => delivery.status === "Delivered").length;
//   const deliveredDeliveriesPreviousMonth = deliveriesPreviousMonth.filter(delivery => delivery.status === "Delivered").length;
//   const deliveredPercentageChange = deliveredDeliveriesPreviousMonth === 0 ? 0 : ((deliveredDeliveriesCurrentMonth - deliveredDeliveriesPreviousMonth) / deliveredDeliveriesPreviousMonth) * 100;

//   // Total new clients and staff added this month
//   const newClientsCurrentMonth = clients.filter(client => new Date(client.createdAt) >= startCurrentMonth && new Date(client.createdAt) <= endCurrentMonth).length;
//   const newStaffsCurrentMonth = staffs.filter(staff => new Date(staff.createdAt) >= startCurrentMonth && new Date(staff.createdAt) <= endCurrentMonth).length;
//   ///const newStaffsPreviousMonth = staffs.filter((staff) => new Date(staff.createdAt) >= startPreviousMonth && new Date(staff.createdAt) <= endPreviousMonth).length;
//   //const newClientsPreviousMonth = clients.filter((client) => new Date(client.createdAt) >= startPreviousMonth && new Date(client.createdAt) <= endPreviousMonth).length;
  
//   // Calculate total prices for current and previous months
//   const totalPreviousMonths = deliveriesPreviousMonths.reduce((acc, delivery) => acc + delivery.price, 0);
//   const totalCurrentMonth = deliveriesCurrentMonth.reduce((acc, delivery) => acc + delivery.price, 0);
  
//   // Format the total prices for display
//   const formattedTotalPreviousMonths = totalPreviousMonths.toFixed(2);
//   const formattedTotalCurrentMonth = totalCurrentMonth.toFixed(2);

//   // Calculate monthly sales for the selected year
//   const monthlySales = Array(12).fill(0);
//   deliveries.forEach(delivery => {
//     const deliveryDate = new Date(delivery.createdAt);
//     if (deliveryDate.getFullYear() === year) {
//       const month = deliveryDate.getMonth();
//       monthlySales[month] += delivery.price;
//     }
//   });

//   // Calculate monthly clients for the selected year
//   const monthlyClients = Array(12).fill(0);
//   clients.forEach(client => {
//     const clientDate = new Date(client.createdAt);
//     if (clientDate.getFullYear() === year) {
//       const month = clientDate.getMonth();
//       monthlyClients[month]++;
//     }
//   });

//   const salesData = monthlySales.map((sales, index) => ({
//     month: new Date(0, index).toLocaleString('default', { month: 'short' }),
//     sales
//   }));

//   const clientsData = monthlyClients.map((clients, index) => ({
//     month: new Date(0, index).toLocaleString('default', { month: 'short' }),
//     clients
//   }));



//   const board = [
//     {
//       name: "Orders",
//       num: currentMonthCount,
//       icon: <IoAnalytics />,
//       rate: percentageChange
//     },
//     {
//       name: "Pending",
//       num: pendingDeliveriesCurrentMonth,
//       icon: <IoAnalytics />,
//       rate: pendingPercentageChange
//     },
//     {
//       name: "Delivered",
//       num: deliveredDeliveriesCurrentMonth,
//       icon: <IoAnalytics />,
//       rate: deliveredPercentageChange
//     },
//     {
//       name: "Shipped",
//       num: shippedDeliveriesCurrentMonth,
//       icon: <IoAnalytics />,
//       rate: shippedPercentageChange
//     },
//   ];

//   const getRateColor = (rate: number) => {
//     if (rate > 0) {
//       return "text-green-500";
//     } else if (rate < 0) {
//       return "text-red-500";
//     } else {
//       return "text-gray-200";
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "Delivered":
//         return "bg-green-500";
//       case "Shipped":
//         return "bg-red-500";
//       case "Pending":
//         return "bg-yellow-300";
//       default:
//         return "bg-gray-200";
//     }
//   };

//   return (
//     <div>
//       <div className="grid sm:grid-cols-1 sm:grid-rows-2 md:flex">
//         <div className="grid grid-cols-2 grid-rows-2 w-auto h-auto sm:h-64">
//           {board.map((board, index) => (
//             <div key={index} className="mx-1 my-1 sm:w-40 md:w-52 h-28 bg-white shadow-xl rounded-lg p-3">
//               <div className="flex justify-between">
//                 <h3 className="font-semibold">{board.name}</h3>
//                 {board.icon}
//               </div>
//               <h3 className="text-3xl font-bold">{board.num}</h3>
//               <div className="flex items-center text-xs space-x-1">
//                 <span className={`flex items-center ${getRateColor(board.rate)}`}>{board.rate > 0 ? <IoArrowUpSharp /> : board.rate < 0 ? <IoArrowDownSharp /> : null} {Math.abs(board.rate)}% </span>
//                 <span className="text-xs text-lightGray">from last month </span>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 w-auto ">
//           {/* <div className={`h-64 bg-white shadow-xl ${isActive ? "md:w-60 sm:w-44" : "md:w-60"} mx-2 rounded-xl p-5 transition-all duration-500 ease-in-out`}>
//             <h1 className="font-semibold">Staffs</h1>
//             <div>
//               <h3 className="text-3xl font-bold">{newStaffsCurrentMonth}</h3>
//               <span className="text-xs text-lightGray">from this month</span>
//             </div>
//           </div>
//           <div className={`h-64 bg-white shadow-xl ${isActive ? "md:w-60 sm:w-44" : "md:w-60"} mx-2 rounded-xl p-5 transition-all duration-500 ease-in-out`}>
//             <h1 className="font-semibold">Clients</h1>
//             <div>
//               <h3 className="text-3xl font-bold">{newClientsCurrentMonth}</h3>
//               <span className="text-xs text-lightGray">from this month</span>
//             </div>
//           </div> */}
//           <div className="h-64 bg-white shadow-xl md:w-60 sm:w-44 mx-2 rounded-xl p-5 transition-all duration-500 ease-in-out">
//             <h1 className="font-semibold">Staffs</h1>
//             <PieChart width={200} height={200}>
//               <Pie
//                 dataKey="value"
//                 isAnimationActive={true}
//                 data={staffChartData}
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={50}
//                 fill="#8884d8"
//                 label
//               >
//                 {staffChartData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//             <div>
//               <h3 className="text-3xl font-bold">{newStaffsCurrentMonth}</h3>
//               <span className="text-xs text-lightGray">from this month</span>
//             </div>
//           </div>

//           <div className="h-64 bg-white shadow-xl md:w-60 sm:w-44 mx-2 rounded-xl p-5 transition-all duration-500 ease-in-out">
//             <h1 className="font-semibold">Clients</h1>
//             <PieChart width={200} height={200}>
//               <Pie
//                 dataKey="value"
//                 isAnimationActive={true}
//                 data={clientChartData}
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={50}
//                 fill="#8884d8"
//                 label
//               >
//                 {clientChartData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//             <div>
//               <h3 className="text-3xl font-bold">{newClientsCurrentMonth}</h3>
//               <span className="text-xs text-lightGray">from this month</span>
//             </div>
//           </div>

//         </div>
//       </div>

//       <div className="m-2 md:flex grid grid-cols-1 grid-rows-2">
//         <div className="flex-grow mx-1">
//           <div className="my-2">
//             <div className="flex justify-between h-72 p-5 bg-white shadow-xl rounded-xl">
//               <h2 className="font-semibold">Yearly Sales</h2>
//               <h2 className="rounded-xl">
//                 <input
//                   className="w-14 bg-gray-100 rounded-lg p-1"
//                   type="number"
//                   value={year}
//                   onChange={(e) => setYear(Number(e.target.value))}
//                 />
//               </h2>
//               <LineChart
//               width={500}
//               height={300}
//               data={salesData}
//               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="sales" stroke="#8884d8" />
//             </LineChart>
//             </div>
            
//           </div>
//           <div className="my-2">
//             <div className="flex justify-between h-72 p-5 bg-white shadow-xl rounded-xl">
//               <h2 className="font-semibold">Clients</h2>
//               <h2 className="rounded-xl">
//                 <input
//                   className="w-14 bg-gray-100 rounded-lg p-1"
//                   type="number"
//                   value={year}
//                   onChange={(e) => setYear(Number(e.target.value))}
//                 />
//               </h2>
//               <BarChart
//               width={500}
//               height={300}
//               data={clientsData}
//               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="clients" fill="#82ca9d" />
//             </BarChart>
//             </div>
            
//           </div>
//         </div>
//         <div>
//           <div className="flex my-2">
//             <div className="md:w-48 mx-1 bg-white rounded-xl shadow-xl p-5 h-36">
//               <div className="flex justify-between mb-4">
//                 <span className="text-2xl"><IoWalletSharp /></span>
//                 <span className="text-2xl"><IoCashSharp /></span>
//               </div>
//               <div>
//                 <h2 className="text-lightGray">Paid Invoices</h2>
//                 <h3 className="text-2xl font-bold">${formattedTotalPreviousMonths}</h3>
//                 <h4 className="text-lightGray text-xs">From last months</h4>
//               </div>
//             </div>
//             <div className="md:w-48 mx-1 bg-white rounded-xl shadow-xl p-5 h-36">
//               <div className="flex justify-between mb-4">
//                 <span className="text-2xl"><IoWalletSharp /></span>
//                 <span className="text-2xl"><IoCashSharp /></span>
//               </div>
//               <div>
//                 <h2 className="text-lightGray">Paid Invoices</h2>
//                 <h3 className="text-2xl font-bold">${formattedTotalCurrentMonth}</h3>
//                 <h4 className="text-lightGray text-xs">Current month</h4>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white shadow-xl rounded-md w-auto mx-2 flex-grow">
//             <div className="flex justify-between p-2">
//               <h1 className="text-brightBlue sm:text-2xl text-lg">Recent Orders</h1>
//               <Link to="deliveries" className="bg-brightBlue text-white rounded-md sm:p-2 px-1">View All</Link>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="min-w-full bg-white">
//                 <thead>
//                   <tr>
//                     <th className="py-2 px-4">Item Id</th>
//                     <th className="py-2 px-4">Item</th>
//                     <th className="py-2 px-4">Client Id</th>
//                     <th className="py-2 px-4">Cashier Out</th>
//                     <th className="py-2 px-4">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {deliveries.slice(-10).map((item) => (
//                     <tr key={item.itemId} className="my-2">
//                       <td className="py-4 px-4 border-b">{item.itemId}</td>
//                       <td className="py-4 px-4 border-b">{item.item}</td>
//                       <td className="py-4 px-4 border-b">{item.clientId}</td>
//                       <td className="py-4 px-4 border-b">{item.cashierOut}</td>
//                       <td className="py-4 px-4 border-b"><span className={`${getStatusColor(item.status)} text-white p-1 rounded-md`}>{item.status}</span></td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }








import { IoAnalytics, IoArrowUpSharp, IoArrowDownSharp, IoWalletSharp, IoCashSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

// Interfaces
interface DeliveryItem {
  itemId: string;
  item: string;
  status: string;
  driverId: string;
  cashierIn: string;
  cashierOut: string;
  clientId: string;
  price: number;
  createdAt: string;
}

interface Client {
  clientId: string;
  name: string;
  address: string;
  contact: string;
  email: string;
  createdAt: string;
}

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
  createdAt: string;
}

// Random data generator functions
// const generateRandomString = (length: number): string => {
//   let result = '';
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   const charactersLength = characters.length;
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// };

const generateRandomDate = (): string => {
  const year = 2025 - Math.floor(Math.random() * 5); // Random year between 2019 and 2023
  const month = Math.floor(Math.random() * 12); // Random month between 0 and 11
  const day = Math.floor(Math.random() * 28) + 1; // Random day between 1 and 28
  return new Date(year, month, day).toISOString();
};

const generateRandomData = (numItems: number): { deliveries: DeliveryItem[], clients: Client[], staffs: Staff[] } => {
  const deliveries: DeliveryItem[] = [];
  const clients: Client[] = [];
  const staffs: Staff[] = [];

  // Generate random delivery items
  for (let i = 1; i <= numItems; i++) {
    const deliveryItem: DeliveryItem = {
      itemId: `I${i}`,
      item: `Item ${i}`,
      status: ['Delivered', 'Shipped', 'Pending'][Math.floor(Math.random() * 3)], // Random status
      driverId: `D${Math.floor(Math.random() * 5) + 1}`, // Random driverId between D1 and D5
      cashierIn: `C${Math.floor(Math.random() * 5) + 1}`, // Random cashierIn between C1 and C5
      cashierOut: `C${Math.floor(Math.random() * 5) + 1}`, // Random cashierOut between C1 and C5
      clientId: `C${Math.floor(Math.random() * 5) + 1}`, // Random clientId between C1 and C5
      price: parseFloat((Math.random() * 100).toFixed(2)), // Random price between 0 and 100
      createdAt: generateRandomDate(),
    };
    deliveries.push(deliveryItem);
  }

  // Generate random clients
  for (let i = 1; i <= numItems; i++) {
    const client: Client = {
      clientId: `C${i}`,
      name: `Client ${i}`,
      address: `Address ${i}`,
      contact: `${Math.floor(Math.random() * 9000000000) + 1000000000}`, 
      email: `client${i}@example.com`,
      createdAt: generateRandomDate(),
    };
    clients.push(client);
  }

  // Generate random staff
  const genders = ['Male', 'Female', 'Other'];
  const roles = ['Manager', 'Cashier', 'Driver'];
  for (let i = 1; i <= 5; i++) {
    const staffMember: Staff = {
      staffId: `S${i}`,
      name: `Staff ${i}`,
      branch: `Branch ${Math.floor(Math.random() * 3) + 1}`, // Random branch between Branch 1 and Branch 3
      sex: genders[Math.floor(Math.random() * 3)], // Random gender
      role: roles[Math.floor(Math.random() * 3)], // Random role
      dob: generateRandomDate(),
      contact: Math.floor(Math.random() * 9000000000) + 1000000000, // Random 10-digit number
      address: `Address ${i}`,
      email: `staff${i}@example.com`,
      createdAt: generateRandomDate(),
    };
    staffs.push(staffMember);
  }

  return { deliveries, clients, staffs };
};

export default function Analysis() {
  const [loading, setLoading] = useState(false); // No need to set loading state to true initially
  const [year, setYear] = useState(new Date().getFullYear());
  const [staffChartData, setStaffChartData] = useState<{ name: string; value: number; }[]>([]);
  const [clientChartData, setClientChartData] = useState<{ name: string; value: number; }[]>([]);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF6666"];

  // Generate random data
  const { deliveries, clients, staffs } = generateRandomData(100);

  

  

  // Helper function to get the start and end dates of the previous and current month
  const getMonthDateRange = (year: number, month: number) => {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    return { startDate, endDate };
  };

  // Get the current and previous month dates
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const { startDate: startCurrentMonth, endDate: endCurrentMonth } = getMonthDateRange(currentYear, currentMonth);
  const { startDate: startPreviousMonth, endDate: endPreviousMonth } = getMonthDateRange(currentYear, currentMonth - 1);

  // Filter deliveries based on the createdAt date
  const deliveriesCurrentMonth = deliveries.filter(delivery =>
    new Date(delivery.createdAt) >= startCurrentMonth && new Date(delivery.createdAt) <= endCurrentMonth
  );

  const deliveriesPreviousMonth = deliveries.filter(delivery =>
    new Date(delivery.createdAt) >= startPreviousMonth && new Date(delivery.createdAt) <= endPreviousMonth
  );

  const deliveriesPreviousMonths = deliveries.filter(delivery =>
    new Date(delivery.createdAt) < startCurrentMonth && new Date(delivery.createdAt) >= startPreviousMonth
  );

  const currentMonthCount = deliveriesCurrentMonth.length;
  const previousMonthCount = deliveriesPreviousMonth.length;
  const percentageChange = previousMonthCount === 0 ? 0 : ((currentMonthCount - previousMonthCount) / previousMonthCount) * 100;

  // Calculate the count and percentage change for pending deliveries
  const pendingDeliveriesCurrentMonth = deliveriesCurrentMonth.filter(delivery => delivery.status === "Pending").length;
  const pendingDeliveriesPreviousMonth = deliveriesPreviousMonth.filter(delivery => delivery.status === "Pending").length;
  const pendingPercentageChange = pendingDeliveriesPreviousMonth === 0 ? 0 : ((pendingDeliveriesCurrentMonth - pendingDeliveriesPreviousMonth) / pendingDeliveriesPreviousMonth) * 100;

  // Calculate the count and percentage change for shipped deliveries
  const shippedDeliveriesCurrentMonth = deliveriesCurrentMonth.filter(delivery => delivery.status === "Shipped").length;
  const shippedDeliveriesPreviousMonth = deliveriesPreviousMonth.filter(delivery => delivery.status === "Shipped").length;
  const shippedPercentageChange = shippedDeliveriesPreviousMonth === 0 ? 0 : ((shippedDeliveriesCurrentMonth - shippedDeliveriesPreviousMonth) / shippedDeliveriesPreviousMonth) * 100;

  // Calculate the count and percentage change for delivered deliveries
  const deliveredDeliveriesCurrentMonth = deliveriesCurrentMonth.filter(delivery => delivery.status === "Delivered").length;
  const deliveredDeliveriesPreviousMonth = deliveriesPreviousMonth.filter(delivery => delivery.status === "Delivered").length;
  const deliveredPercentageChange = deliveredDeliveriesPreviousMonth === 0 ? 0 : ((deliveredDeliveriesCurrentMonth - deliveredDeliveriesPreviousMonth) / deliveredDeliveriesPreviousMonth) * 100;

  // Total new clients and staff added this month
  const newClientsCurrentMonth = clients.filter(client => new Date(client.createdAt) >= startCurrentMonth && new Date(client.createdAt) <= endCurrentMonth).length;
  const newStaffsCurrentMonth = staffs.filter(staff => new Date(staff.createdAt) >= startCurrentMonth && new Date(staff.createdAt) <= endCurrentMonth).length;
  const newStaffsPreviousMonth = staffs.filter((staff) => new Date(staff.createdAt) >= startPreviousMonth && new Date(staff.createdAt) <= endPreviousMonth).length;
  const newClientsPreviousMonth = clients.filter((client) => new Date(client.createdAt) >= startPreviousMonth && new Date(client.createdAt) <= endPreviousMonth).length;
  
  useEffect(() => {
    

    // Prepare data for staff pie chart
    //const newStaffsCurrentMonth = staffs.length;
    const staffChartData1 = [
      { name: "Current Month", value: newStaffsCurrentMonth },
      { name: "Previous Month", value: newStaffsPreviousMonth }, // Placeholder for previous month data
    ];

    // Prepare data for client pie chart
    //const newClientsCurrentMonth = clients.length;
    const clientChartData1 = [
      { name: "Current Month", value: newClientsCurrentMonth },
      { name: "Previous Month", value: newClientsPreviousMonth }, // Placeholder for previous month data
    ];

    // Set chart data into state
    setStaffChartData(staffChartData1);
    setClientChartData(clientChartData1);

    setLoading(false); // Set loading state to false after generating data
  }, [newClientsCurrentMonth,newClientsPreviousMonth,newStaffsCurrentMonth,newStaffsPreviousMonth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Calculate total prices for current and previous months
  const totalPreviousMonths = deliveriesPreviousMonths.reduce((acc, delivery) => acc + delivery.price, 0);
  const totalCurrentMonth = deliveriesCurrentMonth.reduce((acc, delivery) => acc + delivery.price, 0);
  
  // Format the total prices for display
  const formattedTotalPreviousMonths = totalPreviousMonths.toFixed(2);
  const formattedTotalCurrentMonth = totalCurrentMonth.toFixed(2);

  // Calculate monthly sales for the selected year
  const monthlySales = Array(12).fill(0);
  deliveries.forEach(delivery => {
    const deliveryDate = new Date(delivery.createdAt);
    if (deliveryDate.getFullYear() === year) {
      const month = deliveryDate.getMonth();
      monthlySales[month] += delivery.price;
    }
  });

  // Calculate monthly clients for the selected year
  const monthlyClients = Array(12).fill(0);
  clients.forEach(client => {
    const clientDate = new Date(client.createdAt);
    if (clientDate.getFullYear() === year) {
      const month = clientDate.getMonth();
      monthlyClients[month]++;
    }
  });

  const salesData = monthlySales.map((sales, index) => ({
    month: new Date(0, index).toLocaleString('default', { month: 'short' }),
    sales
  }));

  const clientsData = monthlyClients.map((clients, index) => ({
    month: new Date(0, index).toLocaleString('default', { month: 'short' }),
    clients
  }));



  const board = [
    {
      name: "Orders",
      num: currentMonthCount,
      icon: <IoAnalytics />,
      rate: percentageChange
    },
    {
      name: "Pending",
      num: pendingDeliveriesCurrentMonth,
      icon: <IoAnalytics />,
      rate: pendingPercentageChange
    },
    {
      name: "Delivered",
      num: deliveredDeliveriesCurrentMonth,
      icon: <IoAnalytics />,
      rate: deliveredPercentageChange
    },
    {
      name: "Shipped",
      num: shippedDeliveriesCurrentMonth,
      icon: <IoAnalytics />,
      rate: shippedPercentageChange
    },
  ];

  const getRateColor = (rate: number) => {
    if (rate > 0) {
      return "text-green-500";
    } else if (rate < 0) {
      return "text-red-500";
    } else {
      return "text-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-500";
      case "Shipped":
        return "bg-red-500";
      case "Pending":
        return "bg-yellow-300";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div>
      <div className="grid sm:grid-cols-1 sm:grid-rows-2 md:flex">
        <div className="grid grid-cols-2 grid-rows-2 w-auto h-auto sm:h-64">
          {board.map((board, index) => (
            <div key={index} className="mx-1 my-1 sm:w-40 md:w-52 h-28 bg-white shadow-xl rounded-lg p-3">
              <div className="flex justify-between">
                <h3 className="font-semibold">{board.name}</h3>
                {board.icon}
              </div>
              <h3 className="text-3xl font-bold">{board.num}</h3>
              <div className="flex items-center text-xs space-x-1">
                <span className={`flex items-center ${getRateColor(board.rate)}`}>{board.rate > 0 ? <IoArrowUpSharp /> : board.rate < 0 ? <IoArrowDownSharp /> : null} {Math.abs(board.rate)}% </span>
                <span className="text-xs text-lightGray">from last month </span>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 w-auto ">
          <div className="h-64 bg-white shadow-xl md:w-60 sm:w-44 mx-2 rounded-xl p-5 transition-all duration-500 ease-in-out">
            <h1 className="font-semibold">Staffs</h1>
            <PieChart width={200} height={180}>
              <Pie
                dataKey="value"
                isAnimationActive={true}
                data={staffChartData}
                cx="50%"
                cy="50%"
                outerRadius={50}
                fill="#8884d8"
                label
              >
                {staffChartData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
            <div>
              {/* <h3 className="text-3xl font-bold">{newStaffsCurrentMonth}</h3> */}
              <span className="text-xs text-lightGray">from this month</span>
            </div>
          </div>

          <div className="h-64 bg-white shadow-xl md:w-60 sm:w-44 mx-2 rounded-xl p-5 transition-all duration-500 ease-in-out">
            <h1 className="font-semibold">Clients</h1>
            <PieChart width={200} height={180}>
              <Pie
                dataKey="value"
                isAnimationActive={true}
                data={clientChartData}
                cx="50%"
                cy="50%"
                outerRadius={50}
                fill="#8884d8"
                label
              >
                {clientChartData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
            <div>
              {/* <h3 className="text-3xl font-bold">{newClientsCurrentMonth}</h3> */}
              <span className="text-xs text-lightGray">from this month</span>
            </div>
          </div>

        </div>
      </div>

      <div className="m-2 md:flex grid grid-cols-1 grid-rows-2">
        <div className="flex-grow mx-1">
          <div className="my-2">
            <div className="flex flex-col h-80 p-5 bg-white shadow-xl rounded-xl">
              <div className="flex justify-between">
              <h2 className="font-semibold">Yearly Sales</h2>
              <h2 className="rounded-xl">
                <input
                  className="w-14 bg-gray-100 rounded-lg p-1"
                  type="number"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                />
              </h2>
              </div>
              
              <LineChart
              width={500}
              height={270}
              data={salesData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            </LineChart>
            </div>
            
          </div>
          <div className="my-2">
            <div className="flex flex-col h-80 p-5 bg-white shadow-xl rounded-xl">
            <div className="flex justify-between">
              <h2 className="font-semibold">Clients</h2>
              <h2 className="rounded-xl">
                <input
                  className="w-14 bg-gray-100 rounded-lg p-1"
                  type="number"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                />
              </h2>
              </div>
              <BarChart
              width={500}
              height={270}
              data={clientsData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="clients" fill="#82ca9d" />
            </BarChart>
            </div>
            
          </div>
        </div>
        <div>
          <div className="flex my-2">
            <div className="md:w-48 mx-1 bg-white rounded-xl shadow-xl p-5 h-36">
              <div className="flex justify-between mb-4">
                <span className="text-2xl"><IoWalletSharp /></span>
                <span className="text-2xl"><IoCashSharp /></span>
              </div>
              <div>
                <h2 className="text-lightGray">Paid Invoices</h2>
                <h3 className="text-2xl font-bold">${formattedTotalPreviousMonths}</h3>
                <h4 className="text-lightGray text-xs">From last months</h4>
              </div>
            </div>
            <div className="md:w-48 mx-1 bg-white rounded-xl shadow-xl p-5 h-36">
              <div className="flex justify-between mb-4">
                <span className="text-2xl"><IoWalletSharp /></span>
                <span className="text-2xl"><IoCashSharp /></span>
              </div>
              <div>
                <h2 className="text-lightGray">Paid Invoices</h2>
                <h3 className="text-2xl font-bold">${formattedTotalCurrentMonth}</h3>
                <h4 className="text-lightGray text-xs">Current month</h4>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-xl rounded-md w-auto mx-2 flex-grow">
            <div className="flex justify-between p-2">
              <h1 className="text-brightBlue sm:text-2xl text-lg">Recent Orders</h1>
              <Link to="/admin/deliveries" className="bg-brightBlue text-white rounded-md sm:p-2 px-1">View All</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4">Item Id</th>
                    <th className="py-2 px-4">Item</th>
                    <th className="py-2 px-4">Client Id</th>
                    <th className="py-2 px-4">Cashier Out</th>
                    <th className="py-2 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveries.slice(-5).map((item) => (
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
  );
}








