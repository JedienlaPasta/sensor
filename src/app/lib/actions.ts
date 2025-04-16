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

  await Promise.all(
    sites.map(async (site) => {
      const start = Date.now();
      try {
        const response = await fetch(site.site_url, { method: "GET" });
        const duration = Date.now() - start;

        await sql`
          INSERT INTO site_status (id_site, status, duration, error_msg)
          VALUES (${site.id}, ${response.status}, ${duration}, ${null})
        `;
      } catch (error: unknown) {
        let errorMsg = "Unknown error";
        if (error instanceof Error) {
          errorMsg = error.message;
        }

        await sql`
          INSERT INTO site_status (id_site, status, duration, error_msg)
          VALUES (${site.id}, ${500}, ${null}, ${errorMsg})
        `;
      }
    })
  );

  return { ok: true };
}
