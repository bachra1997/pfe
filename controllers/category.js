const Category = require ('../models/category');
const {errorHandler} = require('../helpers/dbErrorHandler');



exports.categoryById =(req, res , next , id) => {

	Category.findById(id).exec((err,category) => {

		if (err || !category) {

			return res.status(400).json({
			error :"categorie inexiqtante"
		});
		}
		req.category= category;
		next();
	})
}



exports.create =(req,res)=>{
const category = new Category(req.body)
category.save((err,data)=>{
	if(err){

		return res.status(400).json({
			error :errorHandler(err)
		});
};
		res.json({data});
	});};

exports.read= (req, res) =>{
	return res.json (req.category);

}; 



exports.update = (req, res)=> {
	const category= req.category;
	category.nom = req.body.nom;
	category.save((err,data) =>{


	if(err){

		return res.status(400).json({
			error :errorHandler(err)
		});
};
		res.json({data});
	});};


exports.remove = (req, res)=> {
	const category= req.category;
	
	category.remove((err,data) =>{

		
	if(err){

		return res.status(400).json({
			error :errorHandler(err)
		});
};
		res.json({
			message : "Categorie supprimée"
		});
	});};



exports.list = (req, res)=> {


Categorie.find().exec((err, data)=> {


if(err){

		return res.status(400).json({
			error :errorHandler(err)
		});
};
		res.json({data});
	});};

















