const express = require('express')
const app = express();
const bcrypt = require('brcrypt');
const user = [];

app.set('view-engine', 'ejs');

app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.render('index.ejs', {name: 'Martin'})
})
app.get('/login', (req, res) => {
    res.render('login.ejs')
})
app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        user.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch(exception) {
        res.redirect('/register')
    }
    console.log(user)
})

app.listen(3000)