import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { All } from "./All";

export const ShowAzkar = () => {
  const getParams = useParams();
  const [type, setType] = useState("");
  const [azkar, setAzkar] = useState("");
  const [azkarCount, setAzkarCount] = useState('');
  const [noAzkar , setNo] = useState(localStorage.getItem('noAzkar') ? localStorage.getItem('noAzkar') : '')
  const onAction = () => {
    if (Array.from(document.querySelectorAll('.azkarCollection .hide')).length === azkar.length-1){
      getParams.zikr === "morning"
      ? localStorage.setItem('noAzkar' , 'اسعد الله صباحك بكل خير')
      : getParams.zikr === "night"
      ? localStorage.setItem('noAzkar' , 'اسعد الله مسائك بكل خير')
      : getParams.zikr === "sleeping"
      ? localStorage.setItem('noAzkar' , 'نوماً هنيئاً')
      : ''
      document.querySelector('.no').style.display = 'block'
      document.querySelector('.noNo2').style.display = 'block'
      setNo(localStorage.getItem('noAzkar'));
      setAzkarCount(parseInt(localStorage.getItem('azkarCount')) + 1)
    }
  };
  useEffect(() => {
    setType((type) => {
      return (type =
        getParams.zikr === "morning"
          ? "أذكار الصباح"
          : getParams.zikr === "night"
          ? "أذكار المساء"
          : getParams.zikr === "sleeping"
          ? "أذكار النوم"
          : "أذكار متفرقة");
    });
    let link =
      getParams.zikr === "morning"
        ? "https://ahegazy.github.io/muslimKit/json/azkar_sabah.json"
        : getParams.zikr === "night"
        ? "https://ahegazy.github.io/muslimKit/json/azkar_massa.json"
        : "/adhkar.json";
    fetch(link)
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("azkar", JSON.stringify(res.content));
        setAzkar(res.content);
        return;
      })
      .catch((err) => console.log(err));
      localStorage.setItem('noAzkar' , '')

  }, [type]);

  return (
    <>
      <div className="zikrtype">
        <p>{type}</p>
      </div>
        <p className="no">{noAzkar ? noAzkar : ''}</p>
        <p className="noNo2">{azkarCount ? ` تم بحمد الله الانتهاء من ` + azkarCount + ' ذكر ' : ''}</p>
      <div className="azkarCollection">
        {azkar
          ? azkar.map((el) => (
              // eslint-disable-next-line react/jsx-key
              <All onAction={onAction} text={el.zekr} count={el.repeat} />
            ))
          : ''}
      </div>
    </>
  );
};
