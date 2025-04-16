"use server";

import postgres from "postgres";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

type Site = {
  id: number;
  site_name: string;
  site_url: string;
};

export async function checkSites() {
  const sites = await sql<Site[]>`
    SELECT * FROM sites
    ORDER BY id DESC
    LIMIT 3
  `;
  console.log(sites);

  await Promise.all(
    sites.map(async (site) => {
      const start = Date.now();
      try {
        const response = await fetch(site.site_url, { method: "GET" });
        const duration = Date.now() - start;
        console.log("id_site: ", site.id);

        await sql`
          INSERT INTO site_status (status, duration, id_site, error_msg)
          VALUES (${response.status}, ${duration}, ${site.id}, ${null})
        `;
        console.log(
          `Checked ${site.site_url} in ${duration}ms with status ${response.status}`
        );
      } catch (error: unknown) {
        let errorMsg = "Unknown error";
        if (error instanceof Error) {
          errorMsg = error.message;
        }

        await sql`
          INSERT INTO site_status (status, duration, id_site, error_msg)
          VALUES (${500}, ${null}, ${site.id}, ${errorMsg})
        `;
        console.log(`Error checking ${site.site_url}: ${errorMsg}`);
      }
    })
  );

  return { ok: true };
}
