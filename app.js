const express = require('express');
const session = require('express-session');
const app = express();
const userRouter = require('./routes/userRouter');
app.use(express.json());
//ajarin ini dong jun
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
