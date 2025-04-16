import { fetchStatusDataByName } from "../lib/data";
import CustomHeatmap from "./heatmap-table";

export default async function Heatmap() {
  const data = fetchStatusDataByName("Sibas");
  console.log(data);

  return (
    <div>
      {/* <h2 className="text-xl font-bold mb-4">Historial de Disponibilidad</h2> */}
      <CustomHeatmap />
    </div>
  );
}
