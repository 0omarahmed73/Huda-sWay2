import { useEffect } from "react"
import { Outlet } from "react-router-dom"

export const Azkar = () => {
  useEffect(() => {
    if (!localStorage.getItem('azkarCount')){
      localStorage.setItem('azkarCount' , 0);
    }
  },[])
  return (
    <div className="azkar">
      <div className="container">
      <div className="showAzkar">
      <Outlet />
      </div>
      </div>
    </div>
  )
}
