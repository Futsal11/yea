const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const quotesFile = path.join(__dirname, 'data', 'quotes.json');

function sendFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not Found');
      return;
    }
    res.writeHead(200, {'Content-Type': contentType});
    res.end(data);
  });
}

function handleApiQuote(req, res) {
  let body = '';
  req.on('data', chunk => (body += chunk));
  req.on('end', () => {
    try {
      const quote = JSON.parse(body);
      fs.mkdir(path.dirname(quotesFile), { recursive: true }, err => {
        if (err) {
          console.error('Failed to create data directory:', err);
        }
        fs.readFile(quotesFile, 'utf8', (err, data) => {
          const quotes = err ? [] : JSON.parse(data);
          quotes.push({ ...quote, created: new Date().toISOString() });
          fs.writeFile(quotesFile, JSON.stringify(quotes, null, 2), err => {
            if (err) {
              console.error('Failed to write quote:', err);
              res.writeHead(500, {'Content-Type': 'application/json'});
              res.end(JSON.stringify({ success: false }));
            } else {
              res.writeHead(200, {'Content-Type': 'application/json'});
              res.end(JSON.stringify({ success: true }));
            }
          });
        });
      });
    } catch (e) {
      res.writeHead(400, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({ success: false }));
    }
  });
}

const server = http.createServer((req, res) => {
  const url = req.url === '/' ? '/index.html' : req.url;
  if (req.method === 'POST' && url === '/api/quote') {
    handleApiQuote(req, res);
    return;
  }
  const ext = path.extname(url);
  const contentType = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json'
  }[ext] || 'text/plain';
  const filePath = path.join(__dirname, 'public', url);
  sendFile(res, filePath, contentType);
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
