import { Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar"

export const RootLayout = () => {
  return (
    <div className="root-layout">
      <Navbar />
      <div className="main">
        <Outlet />
      </div>
    </div>
  )
}
