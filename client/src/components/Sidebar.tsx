import { Link } from "react-router-dom";
import logo from "../imgs/logo.png"
import { IoHome, IoSettings,  } from "react-icons/io5";

export default function Sidebar() {
//   const [hovered, setHovered] = useState(false);
  

//   const handleMouseOver = () => {
//     setHovered(true);
//   };

//   const handleMouseOut = () => {
//     setHovered(false);
//   };

// const [isActive, setIsActive] = useState(false);

//     const handleClick = () => {
//         setIsActive(!isActive);
//     };
 
const navigations =[
    {
        icon: <IoHome/>,
        name: "Dashboard",
        to:"/",
    },
    {
      icon: <IoSettings/>,
      name: "Settings",
      to:"",
  }
]
  return (
    <> 
      <div className="fixed bg-blue-400 w-72 h-full transition-all duration-500 ease-in-out overflow-hidden">
        
        <div className="flex items-center">
            <img className=" w-16 sm:w-24" src={logo} alt="" />
            <h1 className="font-bold text-xl sm:text-2xl">Xpress</h1>
        </div>
        <nav className="space-y-1">
            {navigations.map((nav,index)=>(
                <Link key={index} to={nav.to} className="w-full h-14 flex items-center space-x-6 pl-5 sm:pl-7 no-underline text-black hover:bg-white hover:rounded-l-full hover:rounded-t-xl">
                <div className="text-xl sm:text-3xl">{nav.icon}</div>
                <h3 className="sm:text-xl">{nav.name}</h3>
                </Link>
            ))}
            
            
        </nav>
      </div>
    </>
  );
}
