import { fetchStatusDataByName } from "../lib/data";
import CustomHeatmap from "./heatmap-table";

export default async function Heatmap() {
  const data = fetchStatusDataByName("Sibas");
  console.log(data);

  return (
    <div>
      <CustomHeatmap />
    </div>
  );
}
