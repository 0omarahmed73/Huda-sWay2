import had from '../assets/sahih-x500.png'
import { useEffect } from 'react'
import { useState } from 'react'
export const Hadith = () => {
  let randomNum = Math.floor(Math.random() * 7000)
  const [hadith , setHadith] = useState('')
  useEffect(() => {
    fetch(`https://api.hadith.gading.dev/books/bukhari/${randomNum}`)
    .then(res => res.json())
    .then(res => setHadith(res.data.contents.arab))
    .catch(err => console.log(err))
  }, [])
  return (
    <div className="hadith">
      <div className="container">
        <div className="part-one">
          <div className="img">
            <img src={had} alt="" />
          </div>
        </div>
        <div className="part-two">
          <h1>حديث اليوم</h1>
          <div className="hadith-text">
          {hadith ? <p className='setHadith'>{hadith}</p> : <p className='setHadith'>جار التحميل...</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
