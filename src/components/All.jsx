import { useEffect, useState } from "react"

// eslint-disable-next-line no-unused-vars
export const All = ({text , count , onAction }) => {
  const key = `z${Math.floor(Math.random() * 100000)}`;
  const [count2 , setCount] = useState(count)

  return (
    <>
    {count2 > 0 ? (<div key={key} id={`z${key}`} className="zikrPs" onClick={(e) => setTimeout(() => {
      setCount(count => count - 1)
      onAction(text , count2 )
      localStorage.setItem('azkarCount' , parseInt(localStorage.getItem('azkarCount')) + 1)
    } , 40)}>
    <p>{text}</p>
    <p className={`repeats${key} repeats`}>عدد التكرارات : {count2}</p>
  </div>) : (
    <div key={key} id={`z${key}`}  className="zikrPs hide" >
    <p>{text}</p>
    <p className={`repeats${key} repeats`}>عدد التكرارات : {count2}</p>
  </div>
  )
  }
    </>
  )
}
