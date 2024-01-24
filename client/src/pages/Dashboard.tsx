import { IoCartSharp,IoPeopleSharp  } from "react-icons/io5";
import { FaTruckFast } from "react-icons/fa6";
import { useSelector} from "react-redux";
import profile from "../imgs/profile.png"

export  function Dashboard(){
    const cards =[
        {
            num:202,
            text:"Orders",
            icon:<IoCartSharp />
        },
        {
            num:22,
            text:"Staff",
            icon:<IoPeopleSharp  />
        },
        {
            num:234,
            text:"Clients",
            icon:<IoPeopleSharp  />
        },
        {
            num:30,
            text:"Vans",
            icon:<FaTruckFast  />
        }
    ]
    interface RootState {
        active: {
          isActive: boolean;
        };
    }

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

      const clients = [
        {
            name:"David",
            address:"Mbarara"
        },
        {
            name:"David",
            address:"Mbarara"
        },
        {
            name:"David",
            address:"Mbarara"
        },
        {
            name:"David",
            address:"Mbarara"
        },
        {
            name:"David",
            address:"Mbarara"
        },
        {
            name:"David",
            address:"Mbarara"
        },
      ]

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

    const {isActive} = useSelector((store:RootState)=>store.active)
    return(
        <>
         <div className="grid md:grid-rows-1 md:grid-cols-4 sm:grid-rows-2 sm:grid-cols-2 grid-rows-4 grid-cols-1 m-2 ">
            {cards.map((card,index)=>(
                <div key={index} className={`flex flex-col flex-auto justify-center ${isActive? " ": ""} bg-white space-y-3 m-2 h-36 hover:text-white hover:bg-brightBlue cursor-pointer  shadow-xl p-5 rounded-md transition-all duration-500 ease-in-out `}>
                <div className="flex justify-between">
                    <h4 className="text-2xl sm:text-4xl text-brightBlue  hover:text-white ">{card.num}</h4>
                    <div className="text-3xl sm:text-5xl text-lightGray">{card.icon}</div>
                </div>
                <div className="text-xl sm:text-3xl text-lightGray">{card.text}</div>
            </div>
            ))}
            
         </div> 
        <div className="md:flex grid grid-rows-2 grid-cols-1 my-2">
            <div className="bg-white shadow-xl rounded-md w-auto mx-2 flex-grow">
                <div className="flex justify-between p-2">
                    <h1 className="text-brightBlue sm:text-2xl text-lg">Recent Orders</h1>
                    <button className="bg-brightBlue text-white rounded-md sm:p-2 px-1">View All</button>
                </div>
                <div className="overflow-x-auto">
                <table className="text-left w-full">
                  <thead className="flex w-full">
                    <tr className="flex w-full mb-4">
                      <th className="p-4 w-1/4">One</th>
                      <th className="p-4 w-1/4">Two</th>
                      <th className="p-4 w-1/4">Three</th>
                      <th className="p-4 w-1/4">Four</th>
                    </tr>
                  </thead>
                        <tbody className="bg-grey-light flex flex-col items-center justify-between w-full" >
                        {data.map((item) => (
                            <tr key={item.id} className="flex w-full mb-4">
                            <td className="p-4 w-1/4 border-b">{item.name}</td>
                            <td className="p-4 w-1/4 border-b">${item.price}</td>
                            <td className="p-4 w-1/4 border-b">{item.payment}</td>
                            <td className="p-4 w-1/4 border-b"><span className={`${getStatusColor(item.Status)} text-white p-1 rounded-md`}>{item.Status}</span></td>
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
                        {clients.map((client)=>(
                            <div className="flex hover:bg-brightBlue hover:text-white cursor-pointer">
                                <img className="w-12" src={profile} alt="" />
                                <div className="ml-2">
                                    <h2>{client.name}</h2>
                                    <h2 className="text-lightGray">{client.address}</h2>
                                </div>
                            </div>
                        ))}
                        
                    </div>
                </div>

                <div className="bg-white shadow-xl rounded-md pl-5 md:w-96 mx-2" >
                    <h1 className="text-brightBlue text-2xl my-3">Recent Clients</h1>
                    <div className="space-y-5 ">
                        {clients.map((client)=>(
                            <div className="flex hover:bg-brightBlue hover:text-white cursor-pointer">
                            <img className="w-12" src={profile} alt="" />
                            <div className="ml-2">
                                <h2>{client.name}</h2>
                                <h2 className="text-lightGray">{client.address}</h2>
                            </div>
                        </div>
                        ))}
                        
                    </div>
                </div>
                
            </div>
        </div>
        
        </>
    )
}