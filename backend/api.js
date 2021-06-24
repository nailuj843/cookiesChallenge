const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')

const app = express();

//cors must be set to the react app's domain, and credentials allowed in order to successfully set cookies on the browser.
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.json());
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/Link', (req, res) => {
    console.log('made it to link')
    res.send('you made it to link')
})

//todo: Return an array containing the cookies from the request. - hint: Object.entries may come in handy.
app.get('/api/cookies', (req, res) => {
    console.log(req.cookies)

    res.send(req.cookies)
});

app.get('/api/login', (req,res) => {
    console.log('login was hit')

    res.cookie('username', 'new user name')

    res.send('success')
})

app.get('/api/hello', (req, res) => {
    if(req.cookies.username){
        res.send({'response': `Hello, ${req.cookies.username}` })
    }else{
        res.send({'response': `Hello, please give us a username` })
    }

    
})

//todo: Create a cookie with a random value.
app.post('/api/cookies/random', (req, res) => {
    // response.cookie('username', username)
    

    let key = Object.keys(req.body)[0]
    let value = req.body[key]

    // console.log(key)
    // console.log(value)
    res.cookie([key],[value])

    res.send(req.cookies)
});

//todo: Update the username cookie.
app.put('/api/cookies/username', (req, res) => {
    console.log('this was hit')
    res.end('you tried to access cookies/username')
});

//example: This sets a cookie, used in the HeaderUserInfo.jsx file.
app.get('/api/cookies/username', (req, response) => {
    const username = 'A user from the cookie!'
    response.cookie('username', username)
    response.end();
});

//todo: Delete the username cookie.
app.delete('/api/cookies/username', (_, response) => {
});

const port = 5000;
app.listen(port, () => {
    console.log(`Todo app listening at http://localhost:${port}.`);
});