const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const zlib = require('zlib');

const port = process.env.PORT || 3002;
const buildDir = path.join(__dirname, 'dist');

// Check if build exists
if (!fs.existsSync(buildDir)) {
  console.log('❌ Build directory not found. Please run "npm run build" first.');
  process.exit(1);
}

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
  '.eot': 'application/vnd.ms-fontobject',
  '.webm': 'video/webm',
  '.mp4': 'video/mp4'
};

// Cache for static files
const fileCache = new Map();

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;
  
  // Default to index.html
  if (pathname === '/') {
    pathname = '/index.html';
  }
  
  // Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Construct file path
  const filePath = path.join(buildDir, pathname);
  
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
          <title>404 - RAPER</title>
          <style>
            body { 
              font-family: 'Arial', sans-serif; 
              text-align: center; 
              margin-top: 50px; 
              background: linear-gradient(135deg, #000 0%, #1a1a1a 100%); 
              color: #fff; 
              min-height: 100vh;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
            h1 { color: #5fa4ff; font-size: 3rem; margin-bottom: 1rem; }
            p { font-size: 1.2rem; margin-bottom: 2rem; }
            a { 
              color: #5fa4ff; 
              text-decoration: none; 
              padding: 12px 24px; 
              border: 2px solid #5fa4ff; 
              border-radius: 8px; 
              transition: all 0.3s ease;
            }
            a:hover { 
              background: #5fa4ff; 
              color: #000; 
              transform: translateY(-2px);
            }
          </style>
        </head>
        <body>
          <h1>404 - Page Not Found</h1>
          <p>La página <code>${pathname}</code> no fue encontrada.</p>
          <a href="/">🏠 Ir al Inicio</a>
        </body>
        </html>
      `);
      return;
    }
    
    // Get file stats
    fs.stat(filePath, (err, stats) => {
      if (err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
        return;
      }
      
      // Check cache
      const cacheKey = filePath + stats.mtime.getTime();
      
      // Get file extension and MIME type
      const ext = path.extname(filePath);
      const mimeType = mimeTypes[ext] || 'application/octet-stream';
      
      // Set performance headers
      res.setHeader('Content-Type', mimeType);
      
      // Cache static assets
      if (['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2'].includes(ext)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
        res.setHeader('ETag', `"${stats.mtime.getTime()}"`);
      } else {
        res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour
      }
      
      // Check if client supports gzip
      const acceptEncoding = req.headers['accept-encoding'] || '';
      const shouldCompress = acceptEncoding.includes('gzip') && 
                            ['.html', '.css', '.js', '.json', '.svg'].includes(ext);
      
      // Read file
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end('Internal Server Error');
          return;
        }
        
        res.statusCode = 200;
        
        if (shouldCompress) {
          res.setHeader('Content-Encoding', 'gzip');
          zlib.gzip(data, (err, compressed) => {
            if (err) {
              res.end(data);
            } else {
              res.end(compressed);
            }
          });
        } else {
          res.end(data);
        }
      });
    });
  });
});

server.listen(port, () => {
  // Load build info
  const buildInfoPath = path.join(buildDir, 'build-info.json');
  let buildInfo = {};
  
  if (fs.existsSync(buildInfoPath)) {
    buildInfo = JSON.parse(fs.readFileSync(buildInfoPath, 'utf8'));
  }
  
  console.log(`
🚀 RAPER Production Server Running!
===================================
📍 Local:    http://localhost:${port}
📁 Serving:  ${buildDir}
🔧 Version:  ${buildInfo.version || 'Unknown'}
🕒 Built:    ${buildInfo.buildTime || 'Unknown'}

🎯 Production Features:
✅ Gzip compression enabled
✅ Static file caching
✅ Security headers
✅ Performance optimizations

🌐 Deploy Options:
- Local: http://localhost:${port}
- Network: http://[your-ip]:${port}

💡 To share on local network, use your IP address
Press Ctrl+C to stop the server
`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down production server...');
  server.close(() => {
    console.log('✅ Production server closed successfully');
    process.exit(0);
  });
}); 