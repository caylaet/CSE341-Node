

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Welcome</title></head>');
        res.write('<body>');
        res.write('<h1>Hello and Welcome</h1>');
        res.write('<p>Please Enter Your Name:</p>')
        res.write('<form action="/create-user" method="POST"><input type="text" name="userName"><button type="submit">Send</button></form>');
        res.write('</body>')
        res.write('</html>');
        return res.end();
    }
    if (url === '/users'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Users</title></head>');
        res.write('<body>');
        res.write('<h1>List of users</h1>');
        res.write('<ul>');
        res.write('<li>User 1</li>');
        res.write('<li>User 2</li>');
        res.write('<li>User 3</li>');
        res.write('<li>User 4</li>');
        res.write('</ul>');
        res.write('</body>')
        res.write('</html>');
        return res.end();

    }
    if (url === '/create-user' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on ('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const userName = parsedBody.split('=')[1];
            console.log(userName);
        });
        res.statusCode = 302;
        res.setHeader('Location','/');
        return res.end();
    }
    //Can write a HTML reponse that says "Page Not Found"
}

exports.handle = requestHandler;