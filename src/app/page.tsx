import { Suspense } from "react";
import SiteStatusHistory from "./ui/site-status-history";
import { righteous } from "./ui/fonts";

export default function Home() {
  return (
    <main className="containers mx-auto min-w-fit w-fit px-4">
      <h2
        className={`text-3xl py-8 font-semibold w-[875px] max-w-full text-slate-700 ${righteous.className}`}
      >
        Signal
      </h2>
      <div className="grid border divide-gray-200 divide-y border-gray-200 rounded-lg">
        <Suspense
          fallback={
            <div className="p-6 text-slate-700 text-sm font-medium">
              Cargando...
            </div>
          }
        >
          <SiteStatusHistory siteName="Sibas" />
        </Suspense>
        <Suspense
          fallback={
            <div className="p-6 text-slate-700 text-sm font-medium">
              Cargando...
            </div>
          }
        >
          <SiteStatusHistory siteName="Saberes" />
        </Suspense>
        <Suspense
          fallback={
            <div className="p-6 text-slate-700 text-sm font-medium">
              Cargando...
            </div>
          }
        >
          <SiteStatusHistory siteName="Beneficios" />
        </Suspense>
      </div>
    </main>
  );
}
