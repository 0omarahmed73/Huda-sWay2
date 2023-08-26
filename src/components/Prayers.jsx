import { useEffect, useState } from "react";
import mosque from "../assets/pngtree-islamic-ramadan-kareem-3d-golden-mosque-png-image_6661585.png";
export const Prayers = () => {
  //Google translate
  const [remainedTime , setTime] = useState(()=> {
    return localStorage.getItem('remain2') ? JSON.parse(localStorage.getItem('remain2'))[0] : 'لا يوجد'
  })
  const [value, setValue] = useState("");
  const [saveOld, setSaveOld] = useState("");
  const [prayers, setPrayers] = useState({});
  useEffect(() => {
    if (localStorage.getItem("transCity")) {
      const url = `https://muslimsalat.p.rapidapi.com/${localStorage.getItem('transCity')}.json`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "e4c1a203f0msh5cfe7f2ea906e72p18a7d7jsn280113301333",
          "X-RapidAPI-Host": "muslimsalat.p.rapidapi.com",
        },
      };
      // eslint-disable-next-line no-unused-vars
      const response = fetch(url, options)
        .then((res) => res.json())
        .then((res) => {
          localStorage.setItem("prayers", JSON.stringify(res.items[0]));
          localStorage.setItem('newPrayers' , JSON.stringify(Object.values(JSON.parse(localStorage.getItem('prayers'))).slice(1).map(el => {
            if(el.includes('pm')){
              return `${parseInt(el)+12}${el.slice(1 , -3)}`
            }
            else return el.slice(0 , -3)
          })))
          if (localStorage.getItem('newPrayers')){
            let nowDate = new Date();
            localStorage.setItem( 'remain' , JSON.stringify(JSON.parse(localStorage.getItem('newPrayers')).map(el => {
              return `${el.split(':')[0] - nowDate.getHours()} : ${ el.split(':')[1] - nowDate.getMinutes()}`
            })));
          }            
            if (localStorage.getItem('remain')) {
              localStorage.setItem( 'remain' ,  JSON.stringify(JSON.parse(localStorage.getItem('remain')).filter(el => el.split(':')[0] > -1))
              )
              localStorage.setItem( 'remain2' ,  JSON.stringify(JSON.parse(localStorage.getItem('remain')).map(el => `${Math.abs(parseInt(el.split(':')[0]))}:${Math.abs(parseInt(el.split(':')[1]))}`)))            
            }
        })
        .catch((err) => console.log(err));

      }
  },[]);
  useEffect(() => {
    if (localStorage.getItem('remain2')) {
      setInterval(() => {
        if (localStorage.getItem('newPrayers')){
          let nowDate = new Date();
          localStorage.setItem( 'remain' , JSON.stringify(JSON.parse(localStorage.getItem('newPrayers')).map(el => {
            return `${el.split(':')[0] - nowDate.getHours()} : ${ el.split(':')[1] - nowDate.getMinutes()}`
          })));
        }            
          if (localStorage.getItem('remain')) {
            localStorage.setItem( 'remain' ,  JSON.stringify(JSON.parse(localStorage.getItem('remain')).filter(el => el.split(':')[0] > -1))
            )
            localStorage.setItem( 'remain2' ,  JSON.stringify(JSON.parse(localStorage.getItem('remain')).map(el => `${Math.abs(parseInt(el.split(':')[0]))}:${Math.abs(parseInt(el.split(':')[1]))}`)))            
          }
        setTime(JSON.parse(localStorage.getItem('remain2'))[0])
        console.log('Hello');
      },5000)
    }
  })
  const startTranslate = () => {
    const url = "https://text-translator2.p.rapidapi.com/translate";
    try {
      const response = fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key":
            "e4c1a203f0msh5cfe7f2ea906e72p18a7d7jsn280113301333",
          "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
        },
        body: new URLSearchParams({
          source_language: "ar",
          target_language: "en",
          text: value,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          localStorage.setItem("transCity", res.data.translatedText);
          const url = `https://muslimsalat.p.rapidapi.com/${res.data.translatedText}.json`;
          const options = {
            method: "GET",
            headers: {
              "X-RapidAPI-Key":
                "e4c1a203f0msh5cfe7f2ea906e72p18a7d7jsn280113301333",
              "X-RapidAPI-Host": "muslimsalat.p.rapidapi.com",
            },
          };

          const response = fetch(url, options)
            .then((res) => res.json())
            .then((res) => {
              setPrayers(res);
              localStorage.setItem("prayers", JSON.stringify(res.items[0]));
              localStorage.setItem('newPrayers' , JSON.stringify(Object.values(JSON.parse(localStorage.getItem('prayers'))).slice(1).map(el => {
                if(el.includes('pm')){
                  return `${parseInt(el)+12}${el.slice(1 , -3)}`
                }
                else return el.slice(0 , -3)
              })))
              if (localStorage.getItem('newPrayers')){
                let nowDate = new Date();
                localStorage.setItem( 'remain' , JSON.stringify(JSON.parse(localStorage.getItem('newPrayers')).map(el => {
                  return `${el.split(':')[0] - nowDate.getHours()} : ${ el.split(':')[1] - nowDate.getMinutes()}`
                })));
              }    
              if (localStorage.getItem('remain')) {
                localStorage.setItem( 'remain' ,  JSON.stringify(JSON.parse(localStorage.getItem('remain')).filter(el => el.split(':')[0] > -1))
                )
                localStorage.setItem( 'remain2' ,  JSON.stringify(JSON.parse(localStorage.getItem('remain')).map(el => `${Math.abs(parseInt(el.split(':')[0]))}:${Math.abs(parseInt(el.split(':')[1]))}`)))
              }
  
            })
            .catch((err) => console.log(err));
        });
    } catch (error) {
      console.error(error);
    }
    setSaveOld(value);
    setValue("");

  };
  console.log();
  return (
    <div className="prayers">
      <div className="container">
        <div className="part-one">
          <div className="img">
            <img src={mosque} alt="" />
          </div>
        </div>
        <div className="part-two">
          <h1>مواقيت الصلاة</h1>
          <div className="button-input">
            <input
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                localStorage.setItem("city", e.target.value);
              }}
              type="text"
              name="city"
              id="city"
              placeholder="المدينة"
            />
            <button onClick={startTranslate}>بحث</button>
          </div>
          <div className="bottom-part">
            <div className="prayer-times">
              { prayers.items ? (
                <>
                  <div className="prayer">
                    <p>مدينة : {saveOld}</p>
                  </div>
                  <div className="prayer">
                    <p>الظهر :</p>
                    <p>{prayers.items[0].dhuhr}</p>
                  </div>
                  <div className="prayer">
                    <p>العصر :</p>
                    <p>{prayers.items[0].asr}</p>
                  </div>
                  <div className="prayer">
                    <p>المغرب :</p>
                    <p>{prayers.items[0].maghrib}</p>
                  </div>
                  <div className="prayer">
                    <p>العشاء :</p>
                    <p>{prayers.items[0].isha}</p>
                  </div>
                  <div className="prayer">
                    <p>الفجر :</p>
                    <p>{prayers.items[0].fajr}</p>
                  </div>
                </>
              ) : localStorage.getItem("prayers") &&
                localStorage.getItem("transCity")  &&
                localStorage.getItem("city")? (
                <>
                  <div className="prayer">
                    <p>مدينة : {localStorage.getItem("city").toString()}</p>
                  </div>
                  <div className="prayer">
                    <p>الظهر :</p>
                    <p>{JSON.parse(localStorage.getItem("prayers")).dhuhr}</p>
                  </div>
                  <div className="prayer">
                    <p>العصر :</p>
                    <p>{JSON.parse(localStorage.getItem("prayers")).asr}</p>
                  </div>
                  <div className="prayer">
                    <p>المغرب :</p>
                    <p>{JSON.parse(localStorage.getItem("prayers")).maghrib}</p>
                  </div>
                  <div className="prayer">
                    <p>العشاء :</p>
                    <p>{JSON.parse(localStorage.getItem("prayers")).isha}</p>
                  </div>
                  <div className="prayer">
                    <p>الفجر :</p>
                    <p>{JSON.parse(localStorage.getItem("prayers")).fajr}</p>
                  </div>
                </>
              ) : (
                <p style={{ textAlign: "center" }}>لا يوجد نتائج</p>
              )}
            </div>
            <div className="time">
              <p >الوقت المتبقي على الصلاة القادمة </p>
              {localStorage.getItem('remain2') ? <>
                {
                  <p className="rem">{remainedTime}</p>
                }
              </> : <p className="rem">لا يوجد نواتج</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
