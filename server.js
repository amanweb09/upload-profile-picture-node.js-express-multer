const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');


//BODY PARSING
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))

//VIEW ENGINE CONFIG
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));


//MIDDLEWARE
app.use(express.static(path.join(__dirname, './public')));
const upload = require('./middleware/multer');

//DATABASE
const connection = require('./database/connection');
const User = require('./models/user');
connection()
    .then(() => {
        console.log('db connected ...');
    })
    .catch((err) => {
        console.log(err);
    })

//ROUTES
app.get('/', (req, res) => res.render('index'));
app.post('/save-file', upload.single('profilePicture'), async (req, res) => {
    const { name, email, password } = req.body;

    const fileName = req.file.filename;
    const user = new User({ name, email, password, profilePicture: fileName })
    try {
        await user.save((err, data) => {
            if (err) {
                console.log(err);
            }
            if (data) {
                console.log('user saved successfully ...');
            }
        })
    } catch {
        err => {
            console.log(err);
        }
    }
})
app.get('/profile', async(req, res) => {
    try {
        const user = await User.find((err, users) => {
            if(err) {
                console.log(err);
            }
            if (users) {
                res.render('profile', {
                    user: users[0]
                })
            }
        })
    } catch {
        err => {
            console.log(err);
        }
    }
    
})


//SERVER LISTENING
app.listen(port, () => console.log(`Example app listening on port ${port}!`))