import postgres from "postgres";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export const fetchStatusDataByName = async (siteName: string) => {
  try {
    const site = await sql` 
      SELECT * FROM sites
      WHERE site_name = ${siteName}
    `;
    const status = await sql`
      SELECT * FROM site_status
      WHERE id_site = ${site[0].id}
      ORDER BY id DESC
      LIMIT 3
    `;
    return {
      site: site[0],
      status: status,
    };
  } catch (error) {
    console.log(error);
    return { site: {}, status: [] };
  }
};
