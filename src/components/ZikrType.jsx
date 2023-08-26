import * as icons from "react-icons/bi";
import { Link } from "react-router-dom";

export const ZikrType = ({text , link}) => {
  return (
    <Link to={link} > <div className="zikrtype">
      {text === 'اذكار الصباح' ? <icons.BiSolidSun /> : text === 'اذكار المساء' ? <icons.BiSolidMoon /> : text === 'اذكار النوم' ? <icons.BiSolidBed   /> : <icons.BiWorld/>}
       <p>{text}</p></div></Link>
  )
}
