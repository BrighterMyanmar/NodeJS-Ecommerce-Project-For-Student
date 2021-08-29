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
const categoryRouter = require('./routes/category');
const subcatRouter = require('./routes/subcat');
const childcatRouter = require('./routes/childcat');
const productRouter = require('./routes/products');
const orderRouter = require('./routes/order');
const apiRouter = require('./routes/api');


app.use('/users', userRouter);
app.use('/roles', roleRouter);
app.use('/permits', permitRouter);
app.use('/cats', categoryRouter);
app.use('/subcats', subcatRouter);
app.use('/childcats', childcatRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/api',apiRouter);



app.use((err,req,res,next)=>{
   err.status = err.status || 303;
   res.status(err.status).json({con:false,"msg":err.message});
})

/********* Migrations  **********/
let migrate = () => {
   let migrator = require("./migrations/migrate");
   // migrator.backup();
   // migrator.migrate();
}
// migrate()


app.listen(process.env.PORT, console.log(`Server is running at port ${process.env.PORT}`))
