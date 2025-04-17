import { Suspense } from "react";
import SiteStatusHistory from "./ui/site-status-history";

export default function Home() {
  return (
    <main className="container mx-auto w-fit max-w-screen-mds">
      <h2 className="text-3xl py-8">Sensor</h2>
      <div className="grid border divide-gray-200 divide-y border-gray-200 rounded-lg ">
        <Suspense fallback={<div>Loading...</div>}>
          <SiteStatusHistory siteName="Sibas" />
          <SiteStatusHistory siteName="Saberes" />
          <SiteStatusHistory siteName="Beneficios" />
        </Suspense>
      </div>
    </main>
  );
}
