"use server";

import postgres from "postgres";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

type Site = {
  id: number;
  site_name: string;
  site_url: string;
};

export async function checkSitesByName(siteName: string) {
  try {
    const site = await sql<Site[]>`
      SELECT * FROM sites
      WHERE LOWER(site_name) = ${siteName.toLowerCase()}
    `;

    if (site.length === 0) {
      return { ok: false, error: "Site not found" };
    }

    const target = site[0];
    const start = Date.now();

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch(target.site_url, {
        method: "GET",
        signal: controller.signal,
      });
      clearTimeout(timeout);
      const duration = Date.now() - start;

      await sql`
        INSERT INTO site_status (status, duration, id_site, error_msg)
        VALUES (${response.status}, ${duration}, ${target.id}, ${null})
      `;

      console.log(`✔️ Guardado: ${target.site_url} (${response.status})`);
      return {
        ok: true,
        site: target.site_name,
        status: response.status,
        duration: duration,
      };
    } catch (error: unknown) {
      clearTimeout(timeout);
      let message = "Unknown error";
      if (error instanceof Error) {
        message = error.message;
      }

      await sql`
        INSERT INTO site_status (status, duration, id_site, error_msg)
        VALUES (${500}, ${null}, ${target.id}, ${message})
      `;

      console.log(`❌ Error checking ${target.site_url}: ${message}`);
      return { ok: false, site: target.site_name, error: message };
    }
  } catch (error) {
    console.log(error);
    return { ok: false, error: "Internal server error" };
  }
}
