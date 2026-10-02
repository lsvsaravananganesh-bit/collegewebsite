// Ganesh Institute of Technology - Zero-Dependency Local Dev Server
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = parseInt(process.env.PORT, 10) || 3000;
const ROOT_DIR = __dirname;
const hasSubfolder = fs.existsSync(path.join(ROOT_DIR, 'collegewebsite', 'home.html'));
const defaultPath = hasSubfolder ? '/collegewebsite/home.html' : '/home.html';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8'
};

function requestHandler(req, res) {
  try {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    let reqPath = decodeURIComponent(parsedUrl.pathname);

    // Root route redirects to home
    if (reqPath === '/' || reqPath === '') {
      res.writeHead(302, { Location: defaultPath });
      res.end();
      return;
    }

    // Security: sanitize path against directory traversal
    let safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
    if (safePath.startsWith(path.sep)) {
      safePath = safePath.slice(1);
    }
    
    let fullPath = path.join(ROOT_DIR, safePath);

    // Resolve file existence or fallback to collegewebsite subdirectory
    if (!fs.existsSync(fullPath)) {
      if (hasSubfolder) {
        const altPath = path.join(ROOT_DIR, 'collegewebsite', safePath);
        if (fs.existsSync(altPath)) {
          fullPath = altPath;
        }
      }
    }

    // If it's a directory, try index.html or home.html
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
      if (fs.existsSync(path.join(fullPath, 'index.html'))) {
        fullPath = path.join(fullPath, 'index.html');
      } else if (fs.existsSync(path.join(fullPath, 'home.html'))) {
        fullPath = path.join(fullPath, 'home.html');
      }
    }

    // Handle 404
    if (!fs.existsSync(fullPath) || fs.statSync(fullPath).isDirectory()) {
      const notFoundPage = hasSubfolder
        ? path.join(ROOT_DIR, 'collegewebsite', '404.html')
        : path.join(ROOT_DIR, '404.html');

      if (fs.existsSync(notFoundPage)) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        fs.createReadStream(notFoundPage).pipe(res);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`404 Not Found: ${reqPath}`);
      }
      return;
    }

    // Serve file with accurate MIME type and no-cache for instant dev updates
    const ext = path.extname(fullPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });

    fs.createReadStream(fullPath).pipe(res);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`Internal Server Error: ${err.message}`);
  }
}

function startServer(port, attempts = 0) {
  if (attempts > 10) {
    console.error('❌ Could not find an available port after 10 attempts.');
    process.exit(1);
  }

  const server = http.createServer(requestHandler);

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️  Port ${port} is in use, trying port ${port + 1}...`);
      startServer(port + 1, attempts + 1);
    } else {
      console.error('Server error:', err);
    }
  });

  server.listen(port, () => {
    const baseUrl = `http://localhost:${port}`;
    const mainUrl = `${baseUrl}${defaultPath}`;
    const studentUrl = `${baseUrl}${hasSubfolder ? '/collegewebsite' : ''}/student-portal.html`;
    const adminUrl = `${baseUrl}${hasSubfolder ? '/collegewebsite' : ''}/admin-portal.html`;
    const mapUrl = `${baseUrl}${hasSubfolder ? '/collegewebsite' : ''}/campus-map.html`;

    console.log('\n' + '='.repeat(64));
    console.log('  🎓 GANESH INSTITUTE OF TECHNOLOGY - LOCAL DEV SERVER');
    console.log('='.repeat(64));
    console.log(`  ➜ Local Site:     ${mainUrl}`);
    console.log(`  ➜ Student Portal: ${studentUrl}`);
    console.log(`  ➜ Admin Portal:   ${adminUrl}`);
    console.log(`  ➜ Campus Map:     ${mapUrl}`);
    console.log('='.repeat(64));
    console.log('  ⚡ Zero build required - edits reflect immediately upon refresh.');
    console.log('  🛑 Press Ctrl + C to stop the server.\n');

    // Auto open browser unless --no-open flag is present
    if (!process.argv.includes('--no-open')) {
      const openCmd = process.platform === 'win32'
        ? `start "" "${mainUrl}"`
        : process.platform === 'darwin'
        ? `open "${mainUrl}"`
        : `xdg-open "${mainUrl}"`;
      
      exec(openCmd, () => {
        // silently handled
      });
    }
  });
}

startServer(PORT);
