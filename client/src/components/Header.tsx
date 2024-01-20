import profile from "../imgs/profile.png" 

export default function Header() {

  return (<>
    
    <div className="flex justify-between items-center w-auto h-20 px-2">
      <h2 className="sm:text-2xl font-bold">Dashboard</h2>
      <div className="flex items-center space-x-1">        
        <img className=" w-6 sm:w-12 bg-white rounded-full" src={profile} alt="" />        
        <div className="sm:text-xl">Kayondo Abdulatif</div>
      </div>
    </div>
    </>
  )
}
