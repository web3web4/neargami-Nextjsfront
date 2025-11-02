import { NextResponse } from "next/server";
import { getSitemap } from "@/apiService";


export async function GET() {
  let xmlData = await getSitemap();

  const stylesheetLine = `<?xml-stylesheet type="text/xsl" href="/sitemap-style.xsl"?>\n`;
  xmlData = xmlData.replace(
    /^<\?xml[^>]+\?>/,
    (match) => `${match}\n${stylesheetLine}`
  );

  return new NextResponse(xmlData, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
