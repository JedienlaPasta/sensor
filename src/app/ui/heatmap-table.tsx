"use client";

import { checkSitesByName } from "../lib/actions";

// type DayEntry = {
//   day: string; // formato YYYY-MM-DD
//   successful: number;
// };

export default function CustomHeatmap() {
  // Transforma los datos en un mapa por fecha
  // const dateMap = new Map<string, number>();
  // data.forEach(({ day, successful }) => {
  //   dateMap.set(day, successful);
  // });

  // const today = new Date();
  // const startDate = new Date(today.getFullYear(), 0, 1);
  // const days: { date: Date; count: number }[] = [];

  // for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
  //   const dateStr = d.toISOString().split("T")[0]; // YYYY-MM-DD
  //   days.push({
  //     date: new Date(d),
  //     count: dateMap.get(dateStr) || 0,
  //   });
  // }

  // const getColor = (count: number) => {
  //   if (count >= 3) return "bg-green-700";
  //   if (count === 2) return "bg-green-500";
  //   if (count === 1) return "bg-green-300";
  //   return "bg-gray-200";
  // };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Historial de Disponibilidad</h2>
      <div className="grid grid-cols-53 gap-1 text-[0]">
        {/* {days.map(({ date, count }) => (
          <div
            key={date.toISOString()}
            title={`${date
              .toISOString()
              .slice(0, 10)}: ${count} sitios activos`}
            className={`w-3 h-3 ${getColor(count)} rounded-sm`}
          />
        ))} */}
      </div>
      {/* <div className="mt-2 text-sm text-gray-600">
        Cada cuadro representa un día desde enero
      </div> */}
      <button
        onClick={() => checkSitesByName("Sibas")}
        className="px-8 py-2 bg-amber-500 rounded-lg"
      >
        Action
      </button>
    </div>
  );
}
