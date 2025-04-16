import { fetchStatusDataByName } from "../lib/data";

export default async function Heatmap() {
  const data = fetchStatusDataByName("Sibas");
  console.log(data);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Historial de Disponibilidad</h2>
    </div>
  );
}
