require('dotenv').config()
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    fileUpload = require('express-fileupload');

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

app.use(bodyParser.json());
app.use(fileUpload());

const userRouter = require('./routes/user')
const roleRouter = require('./routes/role');
const permitRouter = require('./routes/permit');

app.use('/users', userRouter);
app.use('/roles', roleRouter);
app.use('/permits', permitRouter);

app.listen(process.env.PORT, console.log(`Server is running at port ${process.env.PORT}`))
