import { fetchStatusDataByName } from "../lib/data";
import { formatDate } from "../lib/utils";
import StatusTile from "./status-tile";

// Define the Site type
type Site = {
  id: number;
  site_name: string;
  site_url: string;
};

export type Status = {
  id: number;
  status: number;
  duration: number;
  id_site: number;
  created_at: Date;
  error_msg: string | null;
};

type Props = {
  siteName: string;
};

export default async function SiteStatusHistory({ siteName }: Props) {
  const { site, status } = (await fetchStatusDataByName(siteName)) as {
    site: Site | null;
    status: Status[];
  };

  if (!site) {
    return (
      <div className="p-6 rounded-lg bg-white shadow-md border border-gray-100">
        <h2 className="text-lg font-bold mb-2 text-gray-700">{siteName}</h2>
        <p className="text-rose-500 text-sm flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          Sitio no encontrado.
        </p>
      </div>
    );
  }

  const totalTiles = 90;
  const placeholderCount = totalTiles - status.length;
  const paddedStatus: (Status | null)[] = [
    ...Array(placeholderCount).fill(null),
    ...status.slice(0, totalTiles),
  ];

  const currentStatus = status[0].status;
  const currentTime = status[0].created_at;
  console.log(siteName, currentStatus, "-", formatDate(currentTime));

  return (
    <div className="p-6 flex flex-col gap-3 rounded-lg bg-white shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          {site?.site_name || "Unknown Site"}
          <span className="ml-2 text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
            {site?.site_url.replace(/(^\w+:|^)\/\//, "").split("/")[0]}
          </span>
        </h2>
        <p
          className={`text-sm font-medium px-2 py-1 rounded-full ${
            currentStatus === 200
              ? "bg-teal-50s text-teal-600"
              : "bg-rose-50s text-rose-600"
          }`}
        >
          {currentStatus === 200 ? "Normal" : "Interrumpido"}
        </p>
      </div>

      <div className="flex flex-row-reverse relative gap-[3px] bg-gray-100 p-2 rounded-md">
        {paddedStatus.map((interval, index) => (
          <StatusTile key={index} interval={interval} index={index} />
        ))}
      </div>

      <div className="flex items-baseline justify-between mt-1">
        <p className="text-xs text-gray-500 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Últimos {status.length} checks
        </p>
        <p className="text-xs text-gray-500 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Hoy
        </p>
      </div>
    </div>
  );
}
