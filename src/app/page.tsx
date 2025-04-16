import { Suspense } from "react";
import Heatmap from "./ui/heatmap";

export default function Home() {
  return (
    <div>
      Sensor
      <Suspense fallback={<div>Loading...</div>}>
        <Heatmap />
      </Suspense>
    </div>
  );
}
