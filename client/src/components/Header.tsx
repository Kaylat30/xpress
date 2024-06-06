import profile from "../imgs/profile.png" 
import { useSelector} from "react-redux";
import { selectFirstName } from "../slice/userSlice";

export default function Header() {
  const firstName = useSelector(selectFirstName);

  interface RootState {
    active: {
      isActive: boolean;
    };
    activelink: {
      activeLink: boolean;
    };
    
  }
const {isActive} = useSelector((store:RootState)=>store.active)
const {activeLink} = useSelector((state:RootState) => state.activelink);
  return (<> 
    
    <div className={`fixed top-0 right-0 ${isActive?"main-active":"main"} z-20 transition-all duration-500 ease-in-out  bg-white flex justify-between items-center w-auto h-20 px-2 pl-5 sm:pl-5 border-b-2 border-blue-50`}>
      <h2 className="sm:text-2xl font-bold">{activeLink}</h2>
      <div className="flex items-center space-x-1">        
        <img className=" w-6 sm:w-12 bg-white rounded-full" src={profile} alt="" />        
        <div className="sm:text-xl">{firstName}</div>
      </div>
    </div>
    </>
  )
}
