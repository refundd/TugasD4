const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter');

const app = express();

mongoose.connect('mongodb+srv://rifanasrar20:FLvxMTZZlPbfHCa3@be7.rql7c.mongodb.net/?retryWrites=true&w=majority&appName=BE7')
    .then(() => {
        console.log('Terhubung ke MongoDB');
    })
    .catch(err => {
        console.error('Gagal terhubung ke MongoDB', err);
    });

app.use(express.json());
app.use(session({
    secret: 'rifan', 
    resave: false,
    saveUninitialized: true
}));

app.use('/user', userRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
