import postgres from "postgres";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

type Site = {
  id: number;
  site_name: string;
  site_url: string;
};

type Status = {
  id: number;
  status: number;
  duration: number;
  id_site: number;
  created_at: Date;
  error_msg: string | null;
};

export const fetchStatusDataByName = async (siteName: string) => {
  try {
    const site = await sql<Site[]>` 
      SELECT * FROM sites
      WHERE site_name = ${siteName}
    `;
    if (site.length === 0) {
      return { site: null, status: [] };
    }

    const status_info = await sql<Status[]>`
      SELECT * FROM site_status
      WHERE id_site = ${site[0].id}
      ORDER BY id DESC
      LIMIT 90
    `;
    if (status_info.length === 0) {
      return { site: site[0], status: [] };
    }

    console.log(status_info);

    return {
      site: site[0],
      status: status_info,
    };
  } catch (error) {
    console.log(error);
    return { site: {}, status: [] };
  }
};
