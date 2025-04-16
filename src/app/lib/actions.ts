"use server";

import postgres from "postgres";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

type Site = {
  id: number;
  site_name: string;
  site_url: string;
};

type SiteStatus = {
  id_site: number;
  status: number;
  duration: number | null;
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
        INSERT INTO site_status (id_site, status, duration)
        VALUES (${site.id}, ${response.status}, ${duration})
    `;
      } catch (error) {
        console.log(error);
        await sql<SiteStatus[]>`
        INSERT INTO site_status (id_site, status, duration)
        VALUES (${site.id}, ${500}, null)
    `;
      }
    })
  );

  return { ok: true };
}
