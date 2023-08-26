import { ZikrType } from "./ZikrType";

export const Types = () => {
  return (
    <div className="before-types">
      <h1>
        مَثَلُ الذي يَذْكُرُ رَبَّهُ والذي لا يَذْكُرُ رَبَّهُ، مَثَلُ الحَيِّ
        والمَيِّتِ.
      </h1>
      <div className="types">
        <ZikrType text="اذكار الصباح" link="morning" />
        <ZikrType text="اذكار المساء" link="night" />
        <ZikrType text="اذكار النوم" link="sleeping" />
        <ZikrType text="ذكر عشوائي" link="random" />
      </div>
    </div>
  );
};
