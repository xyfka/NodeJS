const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    const users = ['Adam','Sphinx','Zorro','Superman'];

    if (url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>UserNet</title></head>');
        res.write('<body>');
        res.write('<h1>Witaj na stronie <bold>UserNet</bold></h1>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send!</button></form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/users'){
        res.setHeader('Content-Type', 'text/html'); 
        res.write('<html>');   
        res.write('<head><title>UserNet - Users </title></head>');
        res.write('<body>');
        res.write('<h1>Users List</h1>');
        res.write('<ul>');
        users.map((user) =>{
            const username = `<li>${user}</li>`;
            res.write(username);
        });
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/create-user' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
        body.push(chunk);
       }); 
       return req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        const username = parsedBody.split('=')[1];
        console.log(username);
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
        
       });
    }

};
module.exports = requestHandler;