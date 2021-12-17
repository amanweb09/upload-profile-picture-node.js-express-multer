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


//ROUTES
app.get('/', (req, res) => res.render('index'));
app.post('/save-file', upload.single('image'), (req, res) => {
    const fileName = req.file.filename;

})


//SERVER LISTENING
app.listen(port, () => console.log(`Example app listening on port ${port}!`))