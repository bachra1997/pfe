const formidable = require ("formidable");
const  _ = require("lodash");
const fs =require('fs');
const Pizza = require ('../models/pizza');
const {errorHandler} = require('../helpers/dbErrorHandler');


  
exports.pizzaById=(req,res,next,id)=> {

Pizza.findById(id)
.populate("category")
.exec((err,pizza)=>{


  if(err || !pizza){
    return res.status(400).json({
            error : "Produit non trouvé"
          });

  }
  req.pizza=pizza;
  next();

});


};
exports.read=(req,res)=> {
  req.pizza.photo = undefined;
  return res.json(req.pizza);
}

exports.create =(req,res) =>{
  let form = new formidable.IncomingForm()
     
  form.keepExtensions = true
  form.parse (req , (err,fields , files) =>{

        if (err) {
          return res.status(400).json({
            error : "image could not be uploaded"
          });

                  };

                  //check for all files
 const {nom , description , price , category , quantity , shipping}=fields
 if (!nom || ! description )
{
          return res.status(400).json({
            error : "tous les dommaines sont obligatoires"
          });

                  };
   let pizza = new Pizza (fields) ;                                   



if (files.photo) {
  //console.log("Files photo :" , files.photo);
  if (files.photo.size> 2000000){
    return res.status(400).json({
            error : " la taille de l'image doit etre inferieur a 2mb"
          });

  }

  pizza.photo.data= fs.readFileSync(files.photo.path);  
  pizza.photo.contentType= files.photo.type

}
 pizza.save((err, result) =>{
  if (err){
 return res.status(400).json({error :errorHandler(error)
 });
}
res.json(result);

});

});
};
exports.remove= (req,res) => {
  let pizza =req.pizza
  pizza.remove((err,deletedPizza) =>{
    if(err){return res.status(400).json({error :errorHandler(error)
 });

    }
    res.json({ deletedPizza, message :"pizza supprimé avec succés"

    });
  });
};




exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }

        let pizza = req.pizza;
        pizza = _.extend(pizza, fields);

       

        if (files.photo) {
            //console.log("FILES PHOTO: ", files.photo);
           
            pizza.photo.data = fs.readFileSync(files.photo.path);
            pizza.photo.contentType = files.photo.type;

          

        } 

       pizza.save((err, result) =>{
  if (err){
 return res.status(400).json({error :errorHandler(error)
 });
}
res.json(result);        });
    });
};



/**
sell /arrival
*by sell = /products?sortBy=sold&order=desc&limit=4
*by arrival = /products?sortBy=createdAt&order=desc&limit=4
*/


exports.list =(req,res)=>{

  let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Pizza.find()
  .select("-photo")
   .populate("category")
   .sort([[sortBy , order]])
   .limit (limit)
    .exec((err,pizzas)=>{
      if (err){
        return res.status(400).json({
          error : " produit non trouvé"
        });
      };
      res.json(pizzas);
    });};

    /**
      it will find the product based on the req product category
      *other products that has the same category will be returned
    */

    exports.listRelated= (req,res)=> {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6; 
    Pizza.find ( {_id: {$ne : req.pizza}, category : req.pizza.category})
    .limit (limit)
    .populate("category", "_id name")
    .exec((err,pizzas)=>{
      if (err){
        return res.status(400).json({
          error : " produit non trouvé"
        });
      };
      res.json(pizzas); 

    });

    };


exports.listCategories = (req , res)=>{
  Pizza.distinct ("category", {}, (err,categories) =>{

if (err){
        return res.status(400).json({
          error : " categorie non trouvé"
        });
      };
       res.json(categories);
  });
};






/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

// route - make sure its post
//router.post("/products/by/search", listBySearch);

exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Pizza.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err){
        return res.status(400).json({
          error : " produitnon trouvé"
        });
      };

            res.json({
                size: data.length,
                data
            });
        });
};



exports.photo = (req,res , next)=> {
  if (req.pizza.photo.data){
res.set("Content-Type", req.pizza.photo.contentType)
return res.send(req.pizza.photo.data)


  }
  next();
}