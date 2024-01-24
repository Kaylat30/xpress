import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5"
import { useSelector,useDispatch } from "react-redux";
import { setActive } from "../slice/activeSlice";
import SidebarDriver from "./SidebarDriver";

export default function LayoutDriver()
{
    interface RootState {
        active: {
          isActive: boolean;
        };
        
      }

    const dispatch = useDispatch()
    const {isActive} = useSelector((store:RootState)=>store.active)
    
    return(
        <div className="relative w-full"> 
            <SidebarDriver /> 
            <div className={`absolute min-h-screen bg-white transition-all duration-500 ease-in-out ${isActive ? 'main-active pl-3' : 'main'}`}>
                <div className="relative">
                    <button onClick={()=>dispatch(setActive())} className={`fixed transition-all duration-500 ease-in-out z-30 sm:text-2xl text-xl bg-white rounded-full p-1 sm:p-2 top-5 ${isActive ? 'menu-btn-active' : 'menu-btn'}  `}>{isActive?<IoChevronForwardOutline />:<IoChevronBackOutline />}</button>
                </div>
                <Header/>
                <main className="mt-20 bg-gray-50">
                    <Outlet />
                </main>
                <Footer /> 
            </div>      
                     
        </div>
    )
}