const express = require('express');
const app = express();
require('dotenv').config() // loads data from .env file

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.urlencoded({
    extended: true
}));

const path = require('path');
const public = path.join(__dirname,'public');
app.use(express.static(public));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); 

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

const publicRouter = require('./routes/publicRoutes');
app.use('/', publicRouter);

const adminRouter = require('./routes/adminRoutes');
app.use('/admin', adminRouter);

const pantryRouter = require('./routes/pantryRoutes');
app.use('/pantry', pantryRouter);

const donationRouter = require('./routes/donationRoutes');
app.use('/donation', donationRouter);

const userRouter = require('./routes/userRoutes');
app.use('/user', userRouter);

// router.use(function(req, res) {
//     res.status(404);
//     res.type('text/plain');
//     res.send('404 Not found.');
// });

// router.use(function(err, req, res, next) {
//     res.status(500);
//     res.type('text/plain');
//     res.send('Internal Server Error.');
// });

app.listen(process.env.PORT ||3000, () => {
    console.log('Server started. Ctrl^c to quit.');
});