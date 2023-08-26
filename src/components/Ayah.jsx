import React, { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import quran from "../assets/NicePng_quran-png_8637786.png";
export const Ayah = () => {
  const [ayah, setAyah] = useState("");
  const [surah, setSurah] = useState("");
  const [audio, setAudio] = useState("");
  let num = Math.floor(Math.random() * 6236);
  useEffect(() => {
    fetch(`https://api.alquran.cloud/v1/ayah/${num}/ar`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setSurah(res.data.surah.name + " : " + res.data.surah.number);
        setAyah(res.data.text);
        setAudio(
          `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${num}.mp3`
        );
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="ayah">
      <div className="container">
        <div className="part-one">
          <div className="img">
            <img src={quran} alt="" />
          </div>
        </div>
        <div className="part-two">
          <h1>مَا أَنْزَلْنَا عَلَيْكَ الْقُرْآنَ لِتَشْقَى</h1>
          <div className="random-verse">
            {!ayah ? (
              <p>جار التحميل...</p>
            ) : (
              <>
                <p className="random-verse-p">{ayah}</p>
                <AudioPlayer
                  src={audio}
                />
                <p className="random-surah-p">{surah}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
