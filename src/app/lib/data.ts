import postgres from "postgres";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export const fetchStatusDataByName = async (siteName: string) => {
  const site = await sql` 
      SELECT * FROM sites
      WHERE site_name = ${siteName}
    `;

  if (site.length === 0) {
    return {
      site: null,
      status: null,
    };
  }
};
