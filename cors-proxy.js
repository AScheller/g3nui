// Minimaler CORS-Proxy für g3nui → n8n (file:// Nutzung)
// Start: node cors-proxy.js
// Dann in g3nui unter "CORS Proxy" eingeben: http://localhost:8090

const http = require('http');
const https = require('https');

const PORT = process.env.PORT || 8090;

http.createServer((req, res) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    });
    return res.end();
  }

  // Target URL = alles nach dem ersten /
  const targetUrl = req.url.slice(1);
  if (!targetUrl) {
    res.writeHead(400, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
    return res.end('Usage: http://localhost:' + PORT + '/<target-url>');
  }

  let parsedUrl;
  try { parsedUrl = new URL(targetUrl); } catch {
    res.writeHead(400, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
    return res.end('Invalid target URL: ' + targetUrl);
  }

  // Collect request body
  const chunks = [];
  req.on('data', c => chunks.push(c));
  req.on('end', () => {
    const body = Buffer.concat(chunks);
    const client = parsedUrl.protocol === 'https:' ? https : http;

    const proxyReq = client.request(parsedUrl, {
      method: req.method,
      headers: {
        'Content-Type': req.headers['content-type'] || 'application/json',
        'Content-Length': body.length
      }
    }, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, {
        ...proxyRes.headers,
        'Access-Control-Allow-Origin': '*'
      });
      proxyRes.pipe(res);
    });

    proxyReq.on('error', (e) => {
      res.writeHead(502, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
      res.end('Proxy error: ' + e.message);
    });

    proxyReq.end(body);
  });
}).listen(PORT, () => {
  console.log(`CORS Proxy läuft auf http://localhost:${PORT}`);
  console.log(`In g3nui "CORS Proxy" Feld eingeben: http://localhost:${PORT}`);
});
