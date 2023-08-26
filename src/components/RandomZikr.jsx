import { useEffect, useState } from "react";
import { All } from "./All";

export const RandomZikr = () => {
  const [type, setType] = useState("ذكر عشوائي");
  const [text, setText] = useState("جاري التحميل....");
  const [count, setCount] = useState("ذكر عشوائي");
  const [azkarCount, setAzkarCount] = useState('');
  useEffect(() => {
    fetch(
      "https://ayah.nawafdev.com/api/dekr",
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setType(res.category);
        setText(res.content);
        setCount(res.count);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="zikrtype">
        <p>{type}</p>
      </div>
      <div className="azkarCollectionRand">
          {count > 0 ? <div
          className="randZikrPS"
            onClick={() => setTimeout(() => {
              setCount(count => count - 1)
              localStorage.getItem('azkarCount') ? localStorage.setItem('azkarCount' , parseInt(localStorage.getItem('azkarCount')) + 1) : localStorage.setItem('azkarCount' , 0) 
              setAzkarCount(localStorage.getItem('azkarCount'));
            } , 40)}
        >
          <p>{text}</p>
          <p className="repeats">{count}</p>
        </div> : <p className="noNo"> تم الانتهاء بحمد الله من {azkarCount} ذكر</p>}
      </div>
    </>
  );
};
