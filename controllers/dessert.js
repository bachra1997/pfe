const formidable = require ("formidable");
const  _ = require("lodash");
const fs =require('fs');
const Dessert = require ('../models/dessert');
const {errorHandler} = require('../helpers/dbErrorHandler');


  
exports.dessertById=(req,res,next,id)=> {

Dessert.findById(id)
.populate("category")
.exec((err,dessert)=>{


  if(err || !dessert){
    return res.status(400).json({
            error : "dessert non trouvé"
          });

  }
  req.dessert=dessert;
  next();

});


};
exports.read=(req,res)=> {
  req.dessert.photo = undefined;
  return res.json(req.dessert);
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
	 let dessert = new Dessert (fields) ;                                   



if (files.photo) {
	//console.log("Files photo :" , files.photo);
	if (files.photo.size> 2000000){
		return res.status(400).json({
        		error : " la taille de l'image doit etre inferieur a 2mb"
        	});

	}

	dessert.photo.data= fs.readFileSync(files.photo.path);  
	dessert.photo.contentType= files.photo.type

}
 dessert.save((err, result) =>{
 	if (err){
 return res.status(400).json({error :errorHandler(error)
 });
}
res.json(result);

});

});
};
exports.remove= (req,res) => {
  let dessert =req.dessert
  dessert.remove((err,deletedDessert) =>{
    if(err){return res.status(400).json({error :errorHandler(error)
 });

    }
    res.json({ deletedDessert, message :"dessert supprimé avec succés"

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

        let dessert = req.dessert;
        dessert = _.extend(dessert, fields);

       

        if (files.photo) {
            //console.log("FILES PHOTO: ", files.photo);
           
            dessert.photo.data = fs.readFileSync(files.photo.path);
            dessert.photo.contentType = files.photo.type;

          

        } 

       dessert.save((err, result) =>{
  if (err){
 return res.status(400).json({error :errorHandler(error)
 });
}
res.json(result);        });
    });
};



/**
sell /arrival
*by sell = /desserts?sortBy=sold&order=desc&limit=4
*by arrival = /products?sortBy=createdAt&order=desc&limit=4
*/


exports.list =(req,res)=>{

  let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Dessert.find()
  .select("-photo")
   .populate("category")
   .sort([[sortBy , order]])
   .limit (limit)
    .exec((err,desserts)=>{
      if (err){
        return res.status(400).json({
          error : " dessert non trouvé"
        });
      };
      res.json(desserts);
    });};

    /**
      it will find the dessert based on the req dessert category
      *other desserts that has the same category will be returned
    */

    exports.listRelated= (req,res)=> {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6; 
    Dessert.find ( {_id: {$ne : req.dessert}, category : req.dessert.category})
    .limit (limit)
    .populate("category", "_id name")
    .exec((err,desserts)=>{
      if (err){
        return res.status(400).json({
          error : " dessert non trouvé"
        });
      };
      res.json(desserts); 

    });

    };


exports.listCategories = (req , res)=>{
  Dessert.distinct ("category", {}, (err,categories) =>{

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

    Dessert.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err){
        return res.status(400).json({
          error : " dessert non trouvé"
        });
      };

            res.json({
                size: data.length,
                data
            });
        });
};



exports.photo = (req,res , next)=> {
  if (req.dessert.photo.data){
res.set("Content-Type", req.dessert.photo.contentType)
return res.send(req.dessert.photo.data)


  }
  next();
}