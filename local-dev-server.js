const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = process.env.PORT || 3000;
const baseDir = path.join(__dirname, 'raper-2.webflow');

// MIME types mapping
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

const server = http.createServer((req, res) => {
  // Parse URL
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;
  
  // Default to index.html
  if (pathname === '/') {
    pathname = '/index.html';
  }
  
  // Construct file path
  const filePath = path.join(baseDir, pathname);
  
  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File not found
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>404 - Not Found</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; background: #000; color: #fff; }
            h1 { color: #5fa4ff; }
          </style>
        </head>
        <body>
          <h1>404 - Page Not Found</h1>
          <p>The requested page <code>${pathname}</code> was not found.</p>
          <a href="/" style="color: #5fa4ff;">Go to Homepage</a>
        </body>
        </html>
      `);
      return;
    }
    
    // Get file extension and MIME type
    const ext = path.extname(filePath);
    const mimeType = mimeTypes[ext] || 'application/octet-stream';
    
    // Read and serve file
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
        return;
      }
      
      // Set headers for performance
      res.setHeader('Content-Type', mimeType);
      res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour cache
      
      // Performance monitoring headers
      if (req.url.includes('performance') || req.url.includes('team')) {
        res.setHeader('X-Performance-Test', 'true');
      }
      
      res.statusCode = 200;
      res.end(data);
    });
  });
});

server.listen(port, () => {
  console.log(`
🚀 RAPER Development Server Running!
====================================
📍 Local:    http://localhost:${port}
📁 Serving:  ${baseDir}

🎯 Performance Testing:
- Navigate to: http://localhost:${port}
- Check team section for optimizations
- Open DevTools > Performance tab to measure improvements

📊 Performance Tips:
1. Use Chrome DevTools Performance tab
2. Record while scrolling to team section
3. Look for reduced FPS drops
4. Check for improved paint times

💡 To test on mobile, use device emulation in DevTools

Press Ctrl+C to stop the server
`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down development server...');
  server.close(() => {
    console.log('✅ Server closed successfully');
    process.exit(0);
  });
}); 