// Simple server for CI testing
const http = require('http');
const fs = require('fs');
const path = require('path');

// Port can be specified via environment variable or default to 8080
const PORT = process.env.PORT || 8080;

console.log(`Starting Lighthouse CI test server on port ${PORT}`);
console.log(`Serving from: ${path.resolve(__dirname, 'dist')}`);

// Create server
const server = http.createServer((req, res) => {
    console.log(`Received request for: ${req.url}`);
    
    // Default to index.html for root and handle all other paths
    let filePath;
    if (req.url === '/' || req.url === '/index.html') {
        filePath = path.join(__dirname, 'dist', 'index.html');
    } else {
        // Remove query parameters for file lookup
        const cleanUrl = req.url.split('?')[0];
        filePath = path.join(__dirname, 'dist', cleanUrl);
    }
    
    // Get file extension to set correct content type
    const ext = path.extname(filePath);
    let contentType = 'text/html';
    
    switch (ext) {
        case '.css': contentType = 'text/css'; break;
        case '.js': contentType = 'application/javascript'; break;
        case '.json': contentType = 'application/json'; break;
        case '.png': contentType = 'image/png'; break;
        case '.jpg': case '.jpeg': contentType = 'image/jpeg'; break;
        case '.svg': contentType = 'image/svg+xml'; break;
        case '.ico': contentType = 'image/x-icon'; break;
        default: contentType = 'text/html';
    }
    
    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log(`404 for: ${filePath}`);
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            return;
        }
        
        // Read and serve the file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error(`Error reading ${filePath}:`, err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Internal Server Error');
                return;
            }
            
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`Lighthouse CI test server running at http://localhost:${PORT}/`);
    console.log(`Directory contents of dist:`);
    try {
        const files = fs.readdirSync(path.join(__dirname, 'dist'));
        files.forEach(file => console.log(` - ${file}`));
    } catch (error) {
        console.error(`Error listing directory: ${error.message}`);
    }
});

// Handle server shutdown
process.on('SIGINT', () => {
    console.log('Server shutting down');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
