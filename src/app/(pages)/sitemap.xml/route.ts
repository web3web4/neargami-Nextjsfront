const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET() {
  const backendUrl = `${API_BASE_URL}/sitemap.xml`; 

  const response = await fetch(backendUrl);

  if (!response.ok) {
    return new Response('Failed to fetch sitemap from backend', { status: 500 });
  }

  const xml = await response.text();

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
