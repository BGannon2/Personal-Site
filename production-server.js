const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Handle root request - serve from dist directory (production build)
    let filePath;
    if (req.url === '/' || req.url === '/index.html') {
        filePath = path.join(__dirname, 'dist', 'index.html');
    } else {
        filePath = path.join(__dirname, 'dist', req.url);
    }
    
    // Get file extension to set correct content type
    const ext = path.extname(filePath);
    let contentType = 'text/html';
    
    switch (ext) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'application/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
        case '.ico':
            contentType = 'image/x-icon';
            break;
        case '.pdf':
            contentType = 'application/pdf';
            break;
        default:
            contentType = 'text/html';
    }
    
    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File not found, try to serve index.html for SPA routing
            if (req.url !== '/' && req.url !== '/index.html') {
                filePath = path.join(__dirname, 'dist', 'index.html');
                contentType = 'text/html';
            } else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(`
                    <html>
                        <head><title>404 Not Found</title></head>
                        <body>
                            <h1>404 - File Not Found</h1>
                            <p>The file <code>${req.url}</code> was not found.</p>
                            <p><a href="/">Return to Home</a></p>
                        </body>
                    </html>
                `);
                return;
            }
        }
        
        // Read and serve the file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end(`
                    <html>
                        <head><title>Server Error</title></head>
                        <body>
                            <h1>500 - Internal Server Error</h1>
                            <p>Error reading file: ${err.message}</p>
                        </body>
                    </html>
                `);
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            }
        });
    });
});

const PORT = 3001; // Use different port to avoid conflict with dev server
server.listen(PORT, () => {
    console.log(`🚀 Production server running at http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${path.join(__dirname, 'dist')}`);
    console.log(`⚡ This server serves the webpack production build`);
    console.log(`🛑 To stop the server, press Ctrl+C`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down production server...');
    server.close(() => {
        console.log('✅ Production server stopped');
        process.exit(0);
    });
});
