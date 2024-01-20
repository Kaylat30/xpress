import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5"
import { useState } from "react";

export default function Layout()
{
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };
    return(
        <div className="relative w-full"> 
            <Sidebar /> 
            <div className={`absolute min-h-screen bg-white transition-all duration-500 ease-in-out ${isActive ? 'main-active pl-3' : 'main'}`}>
                <div className="relative">
                    <button onClick={()=>handleClick()} className={`absolute sm:text-2xl bg-white rounded-full p-1 sm:p-2 top-5 ${isActive ? 'sm:-left-8 -left-6' : 'sm:-left-8 -left-3'}  `}>{isActive?<IoChevronForwardOutline />:<IoChevronBackOutline />}</button>
                </div>
                <Header />
                <main className="">
                    <Outlet />
                </main>
                <Footer /> 
            </div>      
                     
        </div>
    )
}