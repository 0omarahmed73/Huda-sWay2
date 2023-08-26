import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { useEffect } from "react";
export const Navbar = () => {
  const showX = () => {
    document.querySelector('.burger').classList.toggle('xSign')
    document.querySelector('.links').classList.toggle('show');
    document.querySelector('.overlay').classList.toggle('hide')
  }
  useEffect(() => {
    window.onload = console.log('Hello');
  })
  return (
    <nav>
      <div className="container-nav">
        <div className="overlay hide">
        </div>
        <div className="allLogo">
          <div className="logo">
            <Link to="/">
              {" "}
              <img src={logo} alt="" />
            </Link>
          </div>
          <p>طريق الهدى</p>
        </div>
        <div className="links">
          <NavLink onClick={showX} to="/">الرئيسية</NavLink>
          <NavLink onClick={showX} to="/about">من نحن ؟</NavLink>
          <NavLink onClick={showX} to="/prayers">مواقيت الصلاة</NavLink>
          <NavLink onClick={showX} to="/azkar">اذكار المسلم</NavLink>
          <NavLink onClick={showX} to="/hadith">حديث اليوم</NavLink>
          <NavLink onClick={showX} to="/ayah">آية اليوم</NavLink>
        </div>
        <div onClick={showX} className="burger">
          <span></span><span></span><span></span>
        </div>
      </div>
    </nav>
  );
};
