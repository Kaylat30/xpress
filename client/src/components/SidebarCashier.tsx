import { NavLink } from "react-router-dom";
import logo from "../imgs/logo.png"
import { IoHome, IoLogOutSharp, IoSettings  } from "react-icons/io5";
import { useDispatch} from "react-redux";
import { setActive } from "../slice/activeLinkSlice";

export default function SidebarCashier() {
 
  const dispatch = useDispatch();

const navigations =[
    {
        icon: <IoHome/>,
        name: "Dashboard",
        to:"/cashier",
    },
    // {
    //   icon: <IoPeopleSharp/>,
    //   name: "Staff",
    //   to:"staff",
    // },
    // {
    //   icon: <IoPieChartSharp />,
    //   name: "Analysis",
    //   to:"analysis",
    // },
    // {
    //   icon: <IoPeopleSharp/>,
    //   name: "Clients",
    //   to:"clients",
    // },
    // {
    //   icon: <FaTruckFast />,
    //   name: "Deliveries",
    //   to:"deliveries",
    // },
    {
      icon: <IoSettings/>,
      name: "Settings",
      to:"settings",
    },
]
const activeStyles: React.CSSProperties = {
  fontWeight: "bold",
  color: "",
}

// interface RootState {
//   activelink: {
//     activeLink: boolean;
//   };
  
// }

//const activeLink = useSelector((state:RootState) => state.activelink.activeLink);

  const handleNavLinkClick = (name:string) => {
    dispatch(setActive(name));
  };
  return (
    <> 
      <div className="fixed bg-brightBlue w-72 h-full transition-all duration-500 ease-in-out overflow-hidden">
        
        <div className="flex items-center">
            <img className=" w-16 sm:w-24" src={logo} alt="" />
            <h1 className="font-bold text-xl sm:text-2xl text-white">Xpress</h1>
        </div>
        <nav className="space-y-1">
            {navigations.map((nav,index)=>(
                <NavLink 
                key={index} 
                to={nav.to}                
                onClick={() => handleNavLinkClick(nav.name)}
                style={({isActive}) => isActive ? activeStyles : undefined}
                className="w-full h-14 flex items-center space-x-6 pl-5 sm:pl-7 no-underline text-white hover:bg-white hover:text-brightBlueLight hover:rounded-l-full">
                <div className="text-xl sm:text-3xl">{nav.icon}</div>
                <h3 className="sm:text-xl">{nav.name}</h3>
                </NavLink>
            ))}
            
            
        </nav>

        <div className="relative">
          <button className=" absolute -bottom-24 w-56  h-14 flex items-center space-x-6 pl-5 sm:pl-7 no-underline text-white rounded-3xl">
            <div className="text-xl sm:text-3xl"><IoLogOutSharp/></div>
            <h3 className="sm:text-xl">Sign Out</h3>
          </button>
        </div>        
      </div>
    </>
  );
}
