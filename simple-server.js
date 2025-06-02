const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Handle root request
    let filePath;
    if (req.url === '/' || req.url === '/index.html') {
        filePath = path.join(__dirname, 'src', 'index.html');
    } else {
        filePath = path.join(__dirname, 'src', req.url);
    }
    
    // Get file extension to set correct content type
    const ext = path.extname(filePath);
    let contentType = 'text/html';
    
    switch (ext) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.ico':
            contentType = 'image/x-icon';
            break;
    }
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      fs.readFile(filePath, (err, data) => {
        if (err) {
            // Handle favicon.ico requests gracefully
            if (req.url === '/favicon.ico') {
                res.writeHead(204); // No Content
                res.end();
                return;
            }
            
            console.log('Error loading file:', filePath, err.message);
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - File not found</h1><p>Requested: ' + req.url + '</p>');
            return;
        }
        
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

const PORT = 3000;
server.listen(PORT, 'localhost', () => {
    console.log(`🚀 DevOps Portfolio Website is running!`);
    console.log(`📱 Local: http://localhost:${PORT}`);
    console.log(`🌐 Network: http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${path.join(__dirname, 'src')}`);
    console.log('\n✨ Website Features:');
    console.log('   - Responsive design for all devices');
    console.log('   - Interactive animations and effects');
    console.log('   - Professional DevOps portfolio sections');
    console.log('   - Contact form with validation');
    console.log('\n💡 Press Ctrl+C to stop the server');
});
