const express = require ("express");
const mongoose = require ('mongoose');
const morgan = require ('morgan');
const bodyParser= require('body-Parser');
const cookieParser= require('cookie-Parser');
const cors = require ("cors");
const expressValidator = require('express-validator');
require("dotenv").config();
//import roots
const authRoutes = require ('./routes/auth');
const userRoutes = require ('./routes/user');
const categoryRoutes = require ('./routes/category');
const productRoutes = require ('./routes/product');

const boissonRoutes = require ('./routes/boisson');
const sandwichRoutes = require ('./routes/sandwich');
const dessertRoutes = require ('./routes/dessert');
const pizzaRoutes = require ('./routes/pizza');
const offreRoutes = require ('./routes/offre');
const orderRoutes = require ('./routes/order');



//app
const app =express();







//db connection
//mongoose.connect(process.env.DATABASE, {
  //    useNewUrlParser: true,
    //  useCreateIndex: true,
      //useUnifiedTopology: true
    //})
    //.catch(err => {
     // console.log(Error, err.message);
   // })
    //.then(() => console.log("DB Connected!"))








//db
mongoose.connect(process.env.DATABASE , {

useNewUrlParser : true ,
useUnifiedTopology: true ,
useCreateIndex : true 

}).then ( ()  => console.log ("base de données connecté"))
mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});




//middlewares 
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors()); 

//routes middlewares
app.use("/api" ,authRoutes );

app.use("/api" ,userRoutes );
app.use("/api" ,categoryRoutes );
app.use("/api" ,productRoutes);
app.use("/api" ,boissonRoutes);
app.use("/api" ,sandwichRoutes);

app.use("/api" ,dessertRoutes);
app.use("/api" ,pizzaRoutes);
app.use("/api" ,offreRoutes);
app.use("/api" ,orderRoutes);



const port  = process.env.PORT || 8000


app.listen( port ,  () => {

console.log ( `  le serveur marche sur le port ${port} `)

});