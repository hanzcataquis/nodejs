const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 8080;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let users = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/add-user', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'add-user.html'));
});

app.post('/add-user', (req, res) => {
    const user = req.body.username;
    if (user) {
        users.push(user);
    }
    res.redirect('/users');
});

app.post('/delete-user', (req, res) => {
    const index = req.body.index;
    if (index >= 0 && index < users.length) {
        users.splice(index, 1); 
    }
    res.redirect('/users');
});

app.get('/users', (req, res) => {
    res.render('users', { users: users });
});

app.listen(port, () => {
    console.log(`Server running...`);
});
