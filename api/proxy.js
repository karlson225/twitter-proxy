export default async function handler(request) {
  const url = new URL(request.url);
  const path = url.searchParams.get('path');
  if (!path) {
    return new Response(JSON.stringify({error: 'missing path param'}), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
  const twitterUrl = 'https://api.twitter.com' + path;
  const resp = await fetch(twitterUrl, {
    headers: {
      'Authorization': request.headers.get('Authorization') || '',
      'User-Agent': 'TwitterProxy/1.0'
    }
  });
  const data = await resp.text();
  return new Response(data, {
    status: resp.status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}
